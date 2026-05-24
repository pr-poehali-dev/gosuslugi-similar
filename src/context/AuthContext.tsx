import { createContext, useContext, useState, ReactNode } from "react";

export interface UserProfile {
  lastName: string;
  firstName: string;
  phone: string;
  email: string;
  snils: string;
}

export interface Application {
  id: string;
  title: string;
  status: string;
  statusColor: "yellow" | "green" | "red";
  date: string;
  source: "site" | "gosuslugi";
}

interface AuthContextType {
  user: UserProfile | null;
  gosuslugiConnected: boolean;
  applications: Application[];
  login: (profile: UserProfile) => void;
  logout: () => void;
  connectGosuslugi: (phone: string, password: string) => Promise<boolean>;
  addApplication: (title: string) => void;
  deleteApplication: (id: string) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [gosuslugiConnected, setGosuslugiConnected] = useState(false);
  const [applications, setApplications] = useState<Application[]>([]);

  const login = (profile: UserProfile) => {
    setUser(profile);
  };

  const logout = () => {
    setUser(null);
    setGosuslugiConnected(false);
    setApplications([]);
  };

  const connectGosuslugi = async (phone: string, password: string): Promise<boolean> => {
    await new Promise((r) => setTimeout(r, 1800));
    if (phone.length >= 10 && password.length >= 4) {
      setGosuslugiConnected(true);
      setApplications([
        { id: "GU-2024-003812", title: "Загранпаспорт нового образца", status: "В обработке", statusColor: "yellow", date: "15 мая 2024", source: "gosuslugi" },
        { id: "GU-2024-002210", title: "Регистрация по месту жительства", status: "Выполнено", statusColor: "green", date: "2 апреля 2024", source: "gosuslugi" },
      ]);
      return true;
    }
    return false;
  };

  const addApplication = (title: string) => {
    const newApp: Application = {
      id: `RU-${Date.now()}`,
      title,
      status: "Принято",
      statusColor: "yellow",
      date: new Date().toLocaleDateString("ru-RU", { day: "numeric", month: "long", year: "numeric" }),
      source: "site",
    };
    setApplications((prev) => [newApp, ...prev]);
  };

  const deleteApplication = (id: string) => {
    setApplications((prev) => prev.filter((a) => a.id !== id));
  };

  return (
    <AuthContext.Provider value={{ user, gosuslugiConnected, applications, login, logout, connectGosuslugi, addApplication, deleteApplication }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be inside AuthProvider");
  return ctx;
};
