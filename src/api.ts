const AUTH_URL = "https://functions.poehali.dev/38431bd7-5ea2-4b8c-b891-ca26aa86150c";
const APPS_URL = "https://functions.poehali.dev/0b7cd2e4-0bb8-4339-8cd3-e2ae6ee4eeb3";
const GU_URL = "https://functions.poehali.dev/338f4c51-1c1c-47bf-8d91-1a84d9060d57";

function getToken() {
  return localStorage.getItem("ru_session_token") || "";
}

function authHeaders() {
  return { "Content-Type": "application/json", "X-Session-Token": getToken() };
}

export async function apiRegister(data: {
  lastName: string; firstName: string; phone: string; email: string; snils: string; password: string;
}) {
  const res = await fetch(`${AUTH_URL}/register`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
  const json = await res.json();
  if (!res.ok) throw new Error(json.error || "Ошибка регистрации");
  return json as { token: string; user: UserAPI };
}

export async function apiLogin(login: string, password: string) {
  const res = await fetch(`${AUTH_URL}/login`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ login, password }) });
  const json = await res.json();
  if (!res.ok) throw new Error(json.error || "Ошибка входа");
  return json as { token: string; user: UserAPI };
}

export async function apiMe() {
  const res = await fetch(`${AUTH_URL}/me`, { headers: authHeaders() });
  if (!res.ok) return null;
  return await res.json() as UserAPI;
}

export async function apiLogout() {
  await fetch(`${AUTH_URL}/logout`, { method: "POST", headers: authHeaders() });
  localStorage.removeItem("ru_session_token");
}

export async function apiConnectGosuslugi(phone: string, password: string) {
  const res = await fetch(GU_URL, { method: "POST", headers: authHeaders(), body: JSON.stringify({ phone, password }) });
  const json = await res.json();
  if (!res.ok) throw new Error(json.error || "Аккаунт не найден");
  return json;
}

export async function apiGetApplications() {
  const res = await fetch(APPS_URL, { headers: authHeaders() });
  if (!res.ok) return [];
  return await res.json() as ApplicationAPI[];
}

export async function apiCreateApplication(title: string, source: "site" | "gosuslugi") {
  const res = await fetch(APPS_URL, { method: "POST", headers: authHeaders(), body: JSON.stringify({ title, source }) });
  const json = await res.json();
  if (!res.ok) throw new Error(json.error || "Ошибка создания заявления");
  return json as ApplicationAPI;
}

export async function apiDeleteApplication(id: string) {
  const res = await fetch(`${APPS_URL}/delete`, { method: "POST", headers: authHeaders(), body: JSON.stringify({ id }) });
  if (!res.ok) { const j = await res.json(); throw new Error(j.error || "Ошибка"); }
}

export interface UserAPI {
  id: number;
  lastName: string;
  firstName: string;
  phone: string;
  email: string;
  snils: string;
  gosuslugiConnected: boolean;
}

export interface ApplicationAPI {
  id: string;
  title: string;
  status: string;
  statusColor: "yellow" | "green" | "red";
  source: "site" | "gosuslugi";
  date: string;
}
