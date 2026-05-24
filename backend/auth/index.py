import json
import os
import hashlib
import secrets
import psycopg2

SCHEMA = os.environ.get("MAIN_DB_SCHEMA", "t_p42150728_gosuslugi_similar")

CORS = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, X-Session-Token",
}


def get_conn():
    return psycopg2.connect(os.environ["DATABASE_URL"])


def hash_password(pwd: str) -> str:
    return hashlib.sha256(pwd.encode()).hexdigest()


def make_token() -> str:
    return secrets.token_hex(32)


def handler(event: dict, context) -> dict:
    """Аутентификация: регистрация, вход, выход, получение профиля."""
    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": CORS, "body": ""}

    method = event.get("httpMethod", "GET")
    path = event.get("path", "/")
    headers = {k.lower(): v for k, v in (event.get("headers") or {}).items()}
    session_token = headers.get("x-session-token") or headers.get("x-authorization", "").replace("Bearer ", "")

    conn = get_conn()
    cur = conn.cursor()

    try:
        # ── POST /register ──
        if method == "POST" and path.endswith("/register"):
            body = json.loads(event.get("body") or "{}")
            last_name = body.get("lastName", "").strip()
            first_name = body.get("firstName", "").strip()
            phone = body.get("phone", "").strip()
            email = body.get("email", "").strip().lower()
            snils = body.get("snils", "").strip()
            password = body.get("password", "")

            if not all([last_name, first_name, phone, email, password]):
                return {"statusCode": 400, "headers": CORS, "body": json.dumps({"error": "Заполните все обязательные поля"})}

            cur.execute(f"SELECT id FROM {SCHEMA}.users WHERE email = %s OR phone = %s", (email, phone))
            if cur.fetchone():
                return {"statusCode": 409, "headers": CORS, "body": json.dumps({"error": "Пользователь с таким email или телефоном уже зарегистрирован"})}

            pwd_hash = hash_password(password)
            cur.execute(
                f"INSERT INTO {SCHEMA}.users (last_name, first_name, phone, email, snils, password_hash) VALUES (%s,%s,%s,%s,%s,%s) RETURNING id",
                (last_name, first_name, phone, email, snils, pwd_hash)
            )
            user_id = cur.fetchone()[0]

            token = make_token()
            cur.execute(f"INSERT INTO {SCHEMA}.sessions (user_id, token) VALUES (%s,%s)", (user_id, token))
            conn.commit()

            return {
                "statusCode": 200,
                "headers": CORS,
                "body": json.dumps({
                    "token": token,
                    "user": {"id": user_id, "lastName": last_name, "firstName": first_name, "phone": phone, "email": email, "snils": snils, "gosuslugiConnected": False}
                })
            }

        # ── POST /login ──
        if method == "POST" and path.endswith("/login"):
            body = json.loads(event.get("body") or "{}")
            login = body.get("login", "").strip().lower()
            password = body.get("password", "")

            cur.execute(
                f"SELECT id, last_name, first_name, phone, email, snils, gosuslugi_connected, password_hash FROM {SCHEMA}.users WHERE email = %s OR phone = %s",
                (login, login)
            )
            row = cur.fetchone()
            if not row or row[7] != hash_password(password):
                return {"statusCode": 401, "headers": CORS, "body": json.dumps({"error": "Неверный логин или пароль"})}

            uid, last_name, first_name, phone, email, snils, gu_conn, _ = row
            token = make_token()
            cur.execute(f"INSERT INTO {SCHEMA}.sessions (user_id, token) VALUES (%s,%s)", (uid, token))
            conn.commit()

            return {
                "statusCode": 200,
                "headers": CORS,
                "body": json.dumps({
                    "token": token,
                    "user": {"id": uid, "lastName": last_name, "firstName": first_name, "phone": phone, "email": email, "snils": snils or "", "gosuslugiConnected": gu_conn}
                })
            }

        # ── GET /me ──
        if method == "GET" and path.endswith("/me"):
            if not session_token:
                return {"statusCode": 401, "headers": CORS, "body": json.dumps({"error": "Нет токена"})}
            cur.execute(
                f"SELECT u.id, u.last_name, u.first_name, u.phone, u.email, u.snils, u.gosuslugi_connected FROM {SCHEMA}.sessions s JOIN {SCHEMA}.users u ON u.id=s.user_id WHERE s.token=%s AND s.expires_at > NOW()",
                (session_token,)
            )
            row = cur.fetchone()
            if not row:
                return {"statusCode": 401, "headers": CORS, "body": json.dumps({"error": "Сессия истекла"})}
            uid, last_name, first_name, phone, email, snils, gu_conn = row
            return {
                "statusCode": 200,
                "headers": CORS,
                "body": json.dumps({"id": uid, "lastName": last_name, "firstName": first_name, "phone": phone, "email": email, "snils": snils or "", "gosuslugiConnected": gu_conn})
            }

        # ── POST /logout ──
        if method == "POST" and path.endswith("/logout"):
            if session_token:
                cur.execute(f"UPDATE {SCHEMA}.sessions SET expires_at=NOW() WHERE token=%s", (session_token,))
                conn.commit()
            return {"statusCode": 200, "headers": CORS, "body": json.dumps({"ok": True})}

        return {"statusCode": 404, "headers": CORS, "body": json.dumps({"error": "Not found"})}

    finally:
        cur.close()
        conn.close()
