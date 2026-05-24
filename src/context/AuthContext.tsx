import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import {
  apiRegister, apiLogin, apiLogout, apiMe,
  apiConnectGosuslugi, apiGetApplications,
  apiCreateApplication, apiDeleteApplication,
  UserAPI, ApplicationAPI
} from "@/api";

export type UserProfile = UserAPI;
export type Application = ApplicationAPI;

interface AuthContextType {
  user: UserProfile | null;
  gosuslugiConnected: boolean;
  applications: Application[];
  loading: boolean;
  login: (loginStr: string, password: string) => Promise<void>;
  register: (data: { lastName: string; firstName: string; phone: string; email: string; snils: string; password: string }) => Promise<void>;
  logout: () => Promise<void>;
  connectGosuslugi: (phone: string, password: string) => Promise<void>;
  addApplication: (title: string, source?: "site" | "gosuslugi") => Promise<void>;
  deleteApplication: (id: string) => Promise<void>;
  reloadApplications: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);

  const gosuslugiConnected = user?.gosuslugiConnected ?? false;

  useEffect(() => {
    const token = localStorage.getItem("ru_session_token");
    if (!token) { setLoading(false); return; }
    apiMe().then((u) => {
      if (u) {
        setUser(u);
        apiGetApplications().then(setApplications);
      } else {
        localStorage.removeItem("ru_session_token");
      }
    }).finally(() => setLoading(false));
  }, []);

  const login = async (loginStr: string, password: string) => {
    const { token, user: u } = await apiLogin(loginStr, password);
    localStorage.setItem("ru_session_token", token);
    setUser(u);
    const apps = await apiGetApplications();
    setApplications(apps);
  };

  const register = async (data: { lastName: string; firstName: string; phone: string; email: string; snils: string; password: string }) => {
    const { token, user: u } = await apiRegister(data);
    localStorage.setItem("ru_session_token", token);
    setUser(u);
    setApplications([]);
  };

  const logout = async () => {
    await apiLogout();
    setUser(null);
    setApplications([]);
  };

  const connectGosuslugi = async (phone: string, password: string) => {
    await apiConnectGosuslugi(phone, password);
    const updated = await apiMe();
    if (updated) setUser(updated);
    const apps = await apiGetApplications();
    setApplications(apps);
  };

  const addApplication = async (title: string, source: "site" | "gosuslugi" = "gosuslugi") => {
    const app = await apiCreateApplication(title, source);
    setApplications((prev) => [app, ...prev]);
  };

  const deleteApplication = async (id: string) => {
    await apiDeleteApplication(id);
    setApplications((prev) =>
      prev.map((a) => a.id === id ? { ...a, status: "Отозвано", statusColor: "red" as const } : a)
    );
  };

  const reloadApplications = async () => {
    const apps = await apiGetApplications();
    setApplications(apps);
  };

  return (
    <AuthContext.Provider value={{
      user, gosuslugiConnected, applications, loading,
      login, register, logout, connectGosuslugi,
      addApplication, deleteApplication, reloadApplications
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be inside AuthProvider");
  return ctx;
};
