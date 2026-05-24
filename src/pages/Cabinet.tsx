import { useState } from "react";
import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";

const mockApplications = [
  { id: "2024-001547", title: "Загранпаспорт нового образца", status: "В обработке", date: "15 мая 2024", color: "yellow" },
  { id: "2024-001203", title: "Регистрация по месту жительства", status: "Выполнено", date: "2 апреля 2024", color: "green" },
  { id: "2024-000891", title: "Запись к врачу — терапевт", status: "Выполнено", date: "18 марта 2024", color: "green" },
];

const statusColor: Record<string, string> = {
  yellow: "bg-yellow-50 text-yellow-700 border-yellow-200",
  green: "bg-green-50 text-green-700 border-green-200",
  red: "bg-red-50 text-red-700 border-red-200",
};

const Cabinet = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });

  if (!isLoggedIn) {
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

        <div className="max-w-md mx-auto px-4 py-12">
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-8">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="User" size={32} className="text-[#0d47a1]" />
              </div>
              <h2 className="text-xl font-bold text-gray-800">Вход в систему</h2>
              <p className="text-sm text-gray-500 mt-1">Войдите для доступа к услугам</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email или СНИЛС</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="example@mail.ru"
                  className="w-full border border-gray-300 rounded px-3 py-2.5 text-sm focus:outline-none focus:border-[#0d47a1]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Пароль</label>
                <input
                  type="password"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  placeholder="Введите пароль"
                  className="w-full border border-gray-300 rounded px-3 py-2.5 text-sm focus:outline-none focus:border-[#0d47a1]"
                />
              </div>
              <button
                onClick={() => setIsLoggedIn(true)}
                className="w-full bg-[#0d47a1] text-white py-3 rounded font-semibold hover:bg-[#1565c0] transition-colors"
              >
                Войти
              </button>
            </div>

            <div className="mt-4 flex items-center gap-4 text-sm text-center">
              <button className="flex-1 text-[#0d47a1] hover:underline">Забыли пароль?</button>
              <span className="text-gray-300">|</span>
              <button
                onClick={() => setIsLoggedIn(true)}
                className="flex-1 text-[#0d47a1] hover:underline"
              >
                Зарегистрироваться
              </button>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-100">
              <p className="text-xs text-center text-gray-400 mb-3">Войти через</p>
              <div className="flex gap-3">
                <button className="flex-1 flex items-center justify-center gap-2 border border-gray-300 rounded py-2.5 text-sm text-gray-600 hover:bg-gray-50 transition-colors">
                  <Icon name="Smartphone" size={16} />
                  Госключ
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 border border-gray-300 rounded py-2.5 text-sm text-gray-600 hover:bg-gray-50 transition-colors">
                  <Icon name="CreditCard" size={16} />
                  ЭЦП
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-[#0d47a1] text-white py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-2 text-blue-200 text-sm mb-3">
            <Link to="/" className="hover:text-white">Главная</Link>
            <Icon name="ChevronRight" size={14} />
            <span>Личный кабинет</span>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Добро пожаловать, Иван Петрович</h1>
              <p className="text-blue-200 mt-1">Последний вход: сегодня, 10:23</p>
            </div>
            <button
              onClick={() => setIsLoggedIn(false)}
              className="flex items-center gap-2 border border-blue-300 text-white px-4 py-2 rounded hover:bg-blue-800 transition-colors text-sm"
            >
              <Icon name="LogOut" size={16} />
              Выйти
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {[
            { icon: "FileText", label: "Мои заявления", value: "3", desc: "Активных", color: "text-blue-600" },
            { icon: "CheckCircle", label: "Выполнено", value: "2", desc: "Завершённых", color: "text-green-600" },
            { icon: "Bell", label: "Уведомления", value: "1", desc: "Непрочитанных", color: "text-orange-500" },
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
          {/* Profile */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Icon name="User" size={18} className="text-[#0d47a1]" />
              Мои данные
            </h3>
            <div className="space-y-3 text-sm">
              {[
                { label: "ФИО", value: "Петров Иван Петрович" },
                { label: "СНИЛС", value: "123-456-789 00" },
                { label: "ИНН", value: "770123456789" },
                { label: "Паспорт", value: "45 12 123456" },
                { label: "Email", value: "petrov@mail.ru" },
              ].map((field) => (
                <div key={field.label} className="flex justify-between gap-2">
                  <span className="text-gray-400">{field.label}</span>
                  <span className="font-medium text-gray-700 text-right">{field.value}</span>
                </div>
              ))}
            </div>
            <button className="mt-4 w-full border border-gray-300 text-gray-600 py-2 rounded text-sm hover:bg-gray-50 transition-colors">
              Редактировать
            </button>
          </div>

          {/* Applications */}
          <div className="md:col-span-2 bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Icon name="FileText" size={18} className="text-[#0d47a1]" />
              Мои заявления
            </h3>
            <div className="space-y-3">
              {mockApplications.map((app) => (
                <div key={app.id} className="border border-gray-100 rounded-lg p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="font-medium text-gray-800 text-sm mb-1">{app.title}</div>
                      <div className="text-xs text-gray-400">№ {app.id} · {app.date}</div>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded border font-medium whitespace-nowrap ${statusColor[app.color]}`}>
                      {app.status}
                    </span>
                  </div>
                  <div className="flex gap-2 mt-3">
                    <Link to="/status" className="text-xs text-[#0d47a1] hover:underline">Подробнее</Link>
                    {app.color === "green" && (
                      <button className="text-xs text-green-600 hover:underline flex items-center gap-1">
                        <Icon name="Download" size={12} />
                        Скачать документ
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <Link
              to="/catalog"
              className="mt-4 w-full flex items-center justify-center gap-2 bg-[#0d47a1] text-white py-2.5 rounded text-sm font-medium hover:bg-[#1565c0] transition-colors"
            >
              <Icon name="Plus" size={16} />
              Подать новое заявление
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cabinet;
