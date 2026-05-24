import json
import os
import uuid
import psycopg2

SCHEMA = os.environ.get("MAIN_DB_SCHEMA", "t_p42150728_gosuslugi_similar")

CORS = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, X-Session-Token",
}


def get_conn():
    return psycopg2.connect(os.environ["DATABASE_URL"])


def get_user_id(cur, token: str):
    cur.execute(
        f"SELECT u.id FROM {SCHEMA}.sessions s JOIN {SCHEMA}.users u ON u.id=s.user_id WHERE s.token=%s AND s.expires_at > NOW()",
        (token,)
    )
    row = cur.fetchone()
    return row[0] if row else None


def handler(event: dict, context) -> dict:
    """CRUD для заявлений пользователя."""
    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": CORS, "body": ""}

    method = event.get("httpMethod", "GET")
    path = event.get("path", "/")
    headers = {k.lower(): v for k, v in (event.get("headers") or {}).items()}
    session_token = headers.get("x-session-token") or headers.get("x-authorization", "").replace("Bearer ", "")

    if not session_token:
        return {"statusCode": 401, "headers": CORS, "body": json.dumps({"error": "Не авторизован"})}

    conn = get_conn()
    cur = conn.cursor()
    try:
        user_id = get_user_id(cur, session_token)
        if not user_id:
            return {"statusCode": 401, "headers": CORS, "body": json.dumps({"error": "Сессия истекла"})}

        # ── GET / → список заявлений ──
        if method == "GET":
            cur.execute(
                f"SELECT app_uid, title, status, status_color, source, created_at FROM {SCHEMA}.applications WHERE user_id=%s ORDER BY created_at DESC",
                (user_id,)
            )
            rows = cur.fetchall()
            apps = [
                {
                    "id": r[0],
                    "title": r[1],
                    "status": r[2],
                    "statusColor": r[3],
                    "source": r[4],
                    "date": r[5].strftime("%d %B %Y") if r[5] else "",
                }
                for r in rows
            ]
            return {"statusCode": 200, "headers": CORS, "body": json.dumps(apps, ensure_ascii=False)}

        # ── POST / → создать заявление ──
        if method == "POST" and not any(path.endswith(s) for s in ["/delete"]):
            body = json.loads(event.get("body") or "{}")
            title = body.get("title", "").strip()
            source = body.get("source", "site")
            if not title:
                return {"statusCode": 400, "headers": CORS, "body": json.dumps({"error": "Укажите название услуги"})}

            # Проверяем подключение Госуслуг если source=gosuslugi
            if source == "gosuslugi":
                cur.execute(f"SELECT gosuslugi_connected FROM {SCHEMA}.users WHERE id=%s", (user_id,))
                row = cur.fetchone()
                if not row or not row[0]:
                    return {"statusCode": 403, "headers": CORS, "body": json.dumps({"error": "Сначала подключите Госуслуги"})}

            prefix = "GU" if source == "gosuslugi" else "RU"
            app_uid = f"{prefix}-{uuid.uuid4().hex[:10].upper()}"
            cur.execute(
                f"INSERT INTO {SCHEMA}.applications (user_id, app_uid, title, status, status_color, source) VALUES (%s,%s,%s,%s,%s,%s) RETURNING app_uid, created_at",
                (user_id, app_uid, title, "Принято", "yellow", source)
            )
            row = cur.fetchone()
            conn.commit()
            return {
                "statusCode": 200,
                "headers": CORS,
                "body": json.dumps({
                    "id": row[0],
                    "title": title,
                    "status": "Принято",
                    "statusColor": "yellow",
                    "source": source,
                    "date": row[1].strftime("%d %B %Y") if row[1] else "",
                }, ensure_ascii=False)
            }

        # ── POST /delete → удалить заявление ──
        if method == "POST" and path.endswith("/delete"):
            body = json.loads(event.get("body") or "{}")
            app_uid = body.get("id", "")
            cur.execute(
                f"SELECT id FROM {SCHEMA}.applications WHERE app_uid=%s AND user_id=%s",
                (app_uid, user_id)
            )
            if not cur.fetchone():
                return {"statusCode": 404, "headers": CORS, "body": json.dumps({"error": "Заявление не найдено"})}
            cur.execute(f"UPDATE {SCHEMA}.applications SET status='Отозвано', status_color='red' WHERE app_uid=%s AND user_id=%s", (app_uid, user_id))
            conn.commit()
            return {"statusCode": 200, "headers": CORS, "body": json.dumps({"ok": True})}

        return {"statusCode": 404, "headers": CORS, "body": json.dumps({"error": "Not found"})}

    finally:
        cur.close()
        conn.close()
