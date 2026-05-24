import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Icon from "@/components/ui/icon";
import { useAuth } from "@/context/AuthContext";

const statusColor: Record<string, string> = {
  yellow: "bg-yellow-50 text-yellow-700 border-yellow-200",
  green: "bg-green-50 text-green-700 border-green-200",
  red: "bg-red-50 text-red-700 border-red-200",
};

const Cabinet = () => {
  const { user, gosuslugiConnected, applications, login, logout, connectGosuslugi, deleteApplication } = useAuth();
  const navigate = useNavigate();

  const [mode, setMode] = useState<"login" | "register">("login");

  // Login form
  const [loginForm, setLoginForm] = useState({ emailOrPhone: "", password: "" });
  const [loginError, setLoginError] = useState("");

  // Register form
  const [regForm, setRegForm] = useState({ lastName: "", firstName: "", phone: "", email: "", snils: "", password: "", password2: "" });
  const [regError, setRegError] = useState("");

  // Gosuslugi connect
  const [guForm, setGuForm] = useState({ phone: "", password: "" });
  const [guLoading, setGuLoading] = useState(false);
  const [guError, setGuError] = useState("");
  const [guSuccess, setGuSuccess] = useState(false);

  // Application modal
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginForm.emailOrPhone || !loginForm.password) {
      setLoginError("Заполните все поля");
      return;
    }
    // Demo: accept any credentials
    login({ lastName: "Петров", firstName: "Иван", phone: loginForm.emailOrPhone, email: loginForm.emailOrPhone, snils: "" });
    navigate("/cabinet");
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!regForm.lastName || !regForm.firstName || !regForm.phone || !regForm.email) {
      setRegError("Заполните обязательные поля");
      return;
    }
    if (regForm.password !== regForm.password2) {
      setRegError("Пароли не совпадают");
      return;
    }
    login({ lastName: regForm.lastName, firstName: regForm.firstName, phone: regForm.phone, email: regForm.email, snils: regForm.snils });
    navigate("/cabinet");
  };

  const handleConnectGosuslugi = async (e: React.FormEvent) => {
    e.preventDefault();
    setGuError("");
    setGuLoading(true);
    const ok = await connectGosuslugi(guForm.phone, guForm.password);
    setGuLoading(false);
    if (ok) {
      setGuSuccess(true);
    } else {
      setGuError("Аккаунт не найден. Проверьте телефон и пароль от Госуслуг.");
    }
  };

  // Not logged in
  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-[#0d47a1] text-white py-8">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center gap-2 text-blue-200 text-sm mb-3">
              <Link to="/" className="hover:text-white">Главная</Link>
              <Icon name="ChevronRight" size={14} />
              <span>Личный кабинет</span>
            </div>
            <h1 className="text-3xl font-bold">Личный кабинет</h1>
          </div>
        </div>

        <div className="max-w-md mx-auto px-4 py-10">
          {/* Security badge */}
          <div className="flex items-center gap-2 justify-center mb-5 text-sm text-green-700 bg-green-50 border border-green-200 rounded px-4 py-2">
            <Icon name="Lock" size={15} />
            <span className="font-medium">Сайт работает в защищённом режиме</span>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
            {/* Tabs */}
            <div className="flex border-b border-gray-200">
              <button
                onClick={() => setMode("login")}
                className={`flex-1 py-3.5 text-sm font-semibold transition-colors ${mode === "login" ? "bg-[#0d47a1] text-white" : "text-gray-500 hover:bg-gray-50"}`}
              >
                Войти
              </button>
              <button
                onClick={() => setMode("register")}
                className={`flex-1 py-3.5 text-sm font-semibold transition-colors ${mode === "register" ? "bg-[#0d47a1] text-white" : "text-gray-500 hover:bg-gray-50"}`}
              >
                Зарегистрироваться
              </button>
            </div>

            <div className="p-6">
              {mode === "login" ? (
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="text-center mb-2">
                    <div className="w-14 h-14 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Icon name="User" size={28} className="text-[#0d47a1]" />
                    </div>
                    <p className="text-sm text-gray-500">Войдите для доступа к государственным услугам</p>
                  </div>
                  {loginError && (
                    <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-3 py-2 rounded">{loginError}</div>
                  )}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email или телефон</label>
                    <input
                      value={loginForm.emailOrPhone}
                      onChange={(e) => setLoginForm({ ...loginForm, emailOrPhone: e.target.value })}
                      placeholder="+7 (___) ___-__-__ или email"
                      className="w-full border border-gray-300 rounded px-3 py-2.5 text-sm focus:outline-none focus:border-[#0d47a1]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Пароль</label>
                    <input
                      type="password"
                      value={loginForm.password}
                      onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                      placeholder="Введите пароль"
                      className="w-full border border-gray-300 rounded px-3 py-2.5 text-sm focus:outline-none focus:border-[#0d47a1]"
                    />
                  </div>
                  <button type="submit" className="w-full bg-[#0d47a1] text-white py-3 rounded font-semibold hover:bg-[#1565c0] transition-colors">
                    Войти
                  </button>
                  <button type="button" className="w-full text-center text-sm text-[#0d47a1] hover:underline">Забыли пароль?</button>
                </form>
              ) : (
                <form onSubmit={handleRegister} className="space-y-4">
                  <p className="text-sm text-gray-500 mb-2">Создайте аккаунт для подачи заявлений</p>
                  {regError && (
                    <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-3 py-2 rounded">{regError}</div>
                  )}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">Фамилия *</label>
                      <input
                        required
                        value={regForm.lastName}
                        onChange={(e) => setRegForm({ ...regForm, lastName: e.target.value })}
                        placeholder="Иванов"
                        className="w-full border border-gray-300 rounded px-3 py-2.5 text-sm focus:outline-none focus:border-[#0d47a1]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">Имя *</label>
                      <input
                        required
                        value={regForm.firstName}
                        onChange={(e) => setRegForm({ ...regForm, firstName: e.target.value })}
                        placeholder="Иван"
                        className="w-full border border-gray-300 rounded px-3 py-2.5 text-sm focus:outline-none focus:border-[#0d47a1]"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Телефон *</label>
                    <input
                      required
                      value={regForm.phone}
                      onChange={(e) => setRegForm({ ...regForm, phone: e.target.value })}
                      placeholder="+7 (___) ___-__-__"
                      className="w-full border border-gray-300 rounded px-3 py-2.5 text-sm focus:outline-none focus:border-[#0d47a1]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Email *</label>
                    <input
                      required
                      type="email"
                      value={regForm.email}
                      onChange={(e) => setRegForm({ ...regForm, email: e.target.value })}
                      placeholder="example@mail.ru"
                      className="w-full border border-gray-300 rounded px-3 py-2.5 text-sm focus:outline-none focus:border-[#0d47a1]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">СНИЛС (если есть)</label>
                    <input
                      value={regForm.snils}
                      onChange={(e) => setRegForm({ ...regForm, snils: e.target.value })}
                      placeholder="123-456-789 00"
                      className="w-full border border-gray-300 rounded px-3 py-2.5 text-sm focus:outline-none focus:border-[#0d47a1]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Пароль *</label>
                    <input
                      required
                      type="password"
                      value={regForm.password}
                      onChange={(e) => setRegForm({ ...regForm, password: e.target.value })}
                      placeholder="Минимум 6 символов"
                      className="w-full border border-gray-300 rounded px-3 py-2.5 text-sm focus:outline-none focus:border-[#0d47a1]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Повторите пароль *</label>
                    <input
                      required
                      type="password"
                      value={regForm.password2}
                      onChange={(e) => setRegForm({ ...regForm, password2: e.target.value })}
                      placeholder="Повторите пароль"
                      className="w-full border border-gray-300 rounded px-3 py-2.5 text-sm focus:outline-none focus:border-[#0d47a1]"
                    />
                  </div>
                  <button type="submit" className="w-full bg-[#0d47a1] text-white py-3 rounded font-semibold hover:bg-[#1565c0] transition-colors">
                    Зарегистрироваться
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Logged in
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-[#0d47a1] text-white py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-2 text-blue-200 text-sm mb-3">
            <Link to="/" className="hover:text-white">Главная</Link>
            <Icon name="ChevronRight" size={14} />
            <span>Личный кабинет</span>
          </div>
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-3xl font-bold">Добро пожаловать, {user.lastName} {user.firstName}</h1>
              <div className="flex items-center gap-3 mt-2 flex-wrap">
                <span className="text-blue-200 text-sm">{user.email} · {user.phone}</span>
                {gosuslugiConnected && (
                  <span className="flex items-center gap-1.5 text-green-300 font-semibold text-sm">
                    <Icon name="CheckCircle" size={14} />
                    Госуслуги: вход выполнен
                  </span>
                )}
              </div>
            </div>
            <button
              onClick={logout}
              className="flex items-center gap-2 border border-blue-300 text-white px-4 py-2 rounded hover:bg-blue-800 transition-colors text-sm"
            >
              <Icon name="LogOut" size={16} />
              Выйти
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">
        {/* Security */}
        <div className="flex items-center gap-2 text-sm text-green-700 bg-green-50 border border-green-200 rounded px-4 py-2 w-fit">
          <Icon name="Lock" size={15} />
          <span className="font-medium">Сайт работает в защищённом режиме</span>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-5">
          {[
            { icon: "FileText", label: "Мои заявления", value: applications.length, color: "text-blue-600" },
            { icon: "CheckCircle", label: "Выполнено", value: applications.filter(a => a.statusColor === "green").length, color: "text-green-600" },
            { icon: "Clock", label: "В обработке", value: applications.filter(a => a.statusColor === "yellow").length, color: "text-orange-500" },
          ].map((item) => (
            <div key={item.label} className="bg-white border border-gray-200 rounded-lg p-5 flex items-center gap-4">
              <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center">
                <Icon name={item.icon} size={22} className={item.color} />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-800">{item.value}</div>
                <div className="text-sm text-gray-500">{item.label}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Profile card */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Icon name="User" size={18} className="text-[#0d47a1]" />
              Мои данные
            </h3>
            <div className="space-y-3 text-sm">
              {[
                { label: "Фамилия", value: user.lastName },
                { label: "Имя", value: user.firstName },
                { label: "Телефон", value: user.phone },
                { label: "Email", value: user.email },
                { label: "СНИЛС", value: user.snils || "Не указан" },
              ].map((f) => (
                <div key={f.label} className="flex justify-between gap-2 pb-2 border-b border-gray-50 last:border-0">
                  <span className="text-gray-400">{f.label}</span>
                  <span className="font-medium text-gray-700 text-right break-all">{f.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Gosuslugi connect + Applications */}
          <div className="md:col-span-2 space-y-5">
            {/* Gosuslugi block */}
            <div className={`border rounded-lg p-6 ${gosuslugiConnected ? "bg-green-50 border-green-200" : "bg-white border-gray-200"}`}>
              <h3 className="font-bold text-gray-800 mb-1 flex items-center gap-2">
                <Icon name="Link" size={18} className={gosuslugiConnected ? "text-green-600" : "text-[#0d47a1]"} />
                Подключение Госуслуг
              </h3>

              {gosuslugiConnected ? (
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <Icon name="CheckCircle" size={22} className="text-green-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-green-700">Госуслуги: вход выполнен</div>
                    <div className="text-sm text-green-600">Ваш аккаунт успешно подтверждён. Теперь вы можете подавать заявления.</div>
                  </div>
                </div>
              ) : guSuccess ? (
                <div className="flex items-center gap-3">
                  <Icon name="CheckCircle" size={22} className="text-green-600" />
                  <span className="text-green-700 font-medium">Успешно подключено!</span>
                </div>
              ) : (
                <>
                  <p className="text-sm text-gray-500 mb-4">
                    Введите данные от вашего аккаунта на Госуслугах. Это необходимо для подачи официальных заявлений.
                  </p>
                  <form onSubmit={handleConnectGosuslugi} className="space-y-3">
                    {guError && (
                      <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-3 py-2 rounded">{guError}</div>
                    )}
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">Телефон от Госуслуг</label>
                        <input
                          required
                          value={guForm.phone}
                          onChange={(e) => setGuForm({ ...guForm, phone: e.target.value })}
                          placeholder="+7 (___) ___-__-__"
                          className="w-full border border-gray-300 rounded px-3 py-2.5 text-sm focus:outline-none focus:border-[#0d47a1]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">Пароль от Госуслуг</label>
                        <input
                          required
                          type="password"
                          value={guForm.password}
                          onChange={(e) => setGuForm({ ...guForm, password: e.target.value })}
                          placeholder="Пароль"
                          className="w-full border border-gray-300 rounded px-3 py-2.5 text-sm focus:outline-none focus:border-[#0d47a1]"
                        />
                      </div>
                    </div>
                    <button
                      type="submit"
                      disabled={guLoading}
                      className="flex items-center gap-2 bg-[#0d47a1] text-white px-5 py-2.5 rounded font-medium hover:bg-[#1565c0] transition-colors text-sm disabled:opacity-60"
                    >
                      {guLoading ? (
                        <>
                          <Icon name="Loader" size={15} className="animate-spin" />
                          Проверка аккаунта...
                        </>
                      ) : (
                        <>
                          <Icon name="Link" size={15} />
                          Подключить Госуслуги
                        </>
                      )}
                    </button>
                  </form>
                </>
              )}
            </div>

            {/* Applications list */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-gray-800 flex items-center gap-2">
                  <Icon name="FileText" size={18} className="text-[#0d47a1]" />
                  Мои заявления
                </h3>
                <Link to="/catalog" className="text-sm text-[#0d47a1] hover:underline flex items-center gap-1">
                  <Icon name="Plus" size={14} />
                  Подать новое
                </Link>
              </div>

              {applications.length === 0 ? (
                <div className="text-center py-8 text-gray-400">
                  <Icon name="FileX" size={36} className="mx-auto mb-3" />
                  <p className="text-sm font-medium">Заявлений пока нет</p>
                  <p className="text-xs mt-1">Подключите Госуслуги и перейдите в каталог</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {applications.map((app) => (
                    <div key={app.id} className="border border-gray-100 rounded-lg p-4">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-gray-800 text-sm mb-1">{app.title}</div>
                          <div className="flex items-center gap-3 text-xs text-gray-400 flex-wrap">
                            <span>№ {app.id}</span>
                            <span>{app.date}</span>
                            <span className={`px-1.5 py-0.5 rounded text-xs font-medium ${app.source === "gosuslugi" ? "bg-blue-50 text-[#0d47a1]" : "bg-gray-50 text-gray-500"}`}>
                              {app.source === "gosuslugi" ? "Госуслуги" : "Этот сайт"}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <span className={`text-xs px-2 py-1 rounded border font-medium ${statusColor[app.statusColor]}`}>
                            {app.status}
                          </span>
                          <button
                            onClick={() => setDeleteConfirm(app.id)}
                            className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded transition-colors"
                            title="Удалить заявление"
                          >
                            <Icon name="Trash2" size={15} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Delete confirm modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full shadow-xl animate-fade-in">
            <div className="text-center mb-4">
              <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-3">
                <Icon name="Trash2" size={22} className="text-red-500" />
              </div>
              <h3 className="font-bold text-gray-800">Удалить заявление?</h3>
              <p className="text-sm text-gray-500 mt-1">
                {applications.find(a => a.id === deleteConfirm)?.source === "gosuslugi"
                  ? "Заявление будет удалено с этого сайта и на Госуслугах."
                  : "Заявление будет удалено с этого сайта."}
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="flex-1 border border-gray-300 text-gray-600 py-2.5 rounded font-medium hover:bg-gray-50 transition-colors text-sm"
              >
                Отмена
              </button>
              <button
                onClick={() => { deleteApplication(deleteConfirm); setDeleteConfirm(null); }}
                className="flex-1 bg-red-600 text-white py-2.5 rounded font-medium hover:bg-red-700 transition-colors text-sm"
              >
                Удалить
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cabinet;
