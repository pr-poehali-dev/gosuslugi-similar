import { useState } from "react";
import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";

const mockResults: Record<string, { title: string; status: string; color: string; steps: { label: string; done: boolean; date?: string }[]; desc: string }> = {
  "2024-001547": {
    title: "Загранпаспорт нового образца",
    status: "В обработке",
    color: "yellow",
    desc: "Ваше заявление принято и находится на рассмотрении. Ожидаемый срок: 30 дней.",
    steps: [
      { label: "Заявление подано", done: true, date: "15.05.2024" },
      { label: "Документы проверены", done: true, date: "17.05.2024" },
      { label: "Изготовление паспорта", done: false },
      { label: "Готово к выдаче", done: false },
    ],
  },
  "2024-001203": {
    title: "Регистрация по месту жительства",
    status: "Выполнено",
    color: "green",
    desc: "Регистрация успешно оформлена. Вы можете скачать электронный документ.",
    steps: [
      { label: "Заявление подано", done: true, date: "01.04.2024" },
      { label: "Документы проверены", done: true, date: "03.04.2024" },
      { label: "Решение принято", done: true, date: "05.04.2024" },
      { label: "Документ выдан", done: true, date: "07.04.2024" },
    ],
  },
};

const Status = () => {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState<(typeof mockResults)[string] | null>(null);
  const [notFound, setNotFound] = useState(false);

  const handleSearch = () => {
    const found = mockResults[query.trim()];
    if (found) {
      setResult(found);
      setNotFound(false);
    } else {
      setResult(null);
      setNotFound(true);
    }
  };

  const colorMap: Record<string, string> = {
    yellow: "bg-yellow-50 text-yellow-700 border border-yellow-200",
    green: "bg-green-50 text-green-700 border border-green-200",
    red: "bg-red-50 text-red-700 border border-red-200",
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-[#0d47a1] text-white py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-2 text-blue-200 text-sm mb-3">
            <Link to="/" className="hover:text-white">Главная</Link>
            <Icon name="ChevronRight" size={14} />
            <span>Статус заявлений</span>
          </div>
          <h1 className="text-3xl font-bold">Статус и история заявлений</h1>
          <p className="text-blue-100 mt-2">Отслеживайте состояние ваших обращений в режиме реального времени</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-10">
        {/* Search */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
          <h2 className="font-bold text-gray-800 mb-4">Найти заявление по номеру</h2>
          <div className="flex gap-3">
            <input
              type="text"
              placeholder="Введите номер заявления (например: 2024-001547)"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              className="flex-1 border border-gray-300 rounded px-4 py-2.5 text-sm focus:outline-none focus:border-[#0d47a1]"
            />
            <button
              onClick={handleSearch}
              className="bg-[#0d47a1] text-white px-6 py-2.5 rounded font-medium hover:bg-[#1565c0] transition-colors text-sm"
            >
              Проверить
            </button>
          </div>
          <p className="text-xs text-gray-400 mt-2">Номер заявления указан в SMS-уведомлении или в личном кабинете</p>
        </div>

        {/* Not found */}
        {notFound && !result && (
          <div className="bg-white border border-red-100 rounded-lg p-8 text-center mb-6">
            <Icon name="SearchX" size={40} className="text-red-300 mx-auto mb-3" />
            <p className="font-semibold text-gray-700 mb-1">Заявление не найдено</p>
            <p className="text-sm text-gray-400">Проверьте правильность номера. Для демонстрации введите: 2024-001547</p>
          </div>
        )}

        {/* Result */}
        {result && (
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden mb-6 animate-fade-in">
            <div className="bg-gray-50 border-b px-6 py-4 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-gray-800">{result.title}</h3>
                <p className="text-sm text-gray-500">Заявление № {query}</p>
              </div>
              <span className={`text-sm px-3 py-1.5 rounded font-medium ${colorMap[result.color]}`}>
                {result.status}
              </span>
            </div>
            <div className="p-6">
              <p className="text-sm text-gray-600 mb-6 bg-blue-50 p-3 rounded border-l-4 border-[#0d47a1]">
                {result.desc}
              </p>

              {/* Steps */}
              <h4 className="font-semibold text-gray-700 mb-4">Ход выполнения</h4>
              <div className="space-y-3">
                {result.steps.map((step, idx) => (
                  <div key={idx} className="flex items-center gap-4">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      step.done ? "bg-green-100" : "bg-gray-100"
                    }`}>
                      {step.done
                        ? <Icon name="Check" size={16} className="text-green-600" />
                        : <span className="text-gray-400 text-sm font-medium">{idx + 1}</span>
                      }
                    </div>
                    <div className="flex-1 flex items-center justify-between">
                      <span className={`text-sm ${step.done ? "text-gray-800 font-medium" : "text-gray-400"}`}>
                        {step.label}
                      </span>
                      {step.date && <span className="text-xs text-gray-400">{step.date}</span>}
                    </div>
                  </div>
                ))}
              </div>

              {result.color === "green" && (
                <button className="mt-6 flex items-center gap-2 bg-green-600 text-white px-5 py-2.5 rounded font-medium hover:bg-green-700 transition-colors text-sm">
                  <Icon name="Download" size={16} />
                  Скачать документ (PDF)
                </button>
              )}
            </div>
          </div>
        )}

        {/* History placeholder */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Icon name="History" size={18} className="text-[#0d47a1]" />
            История заявлений
          </h3>
          <div className="text-center py-8 text-gray-400">
            <Icon name="User" size={36} className="mx-auto mb-3" />
            <p className="text-sm font-medium">Войдите в личный кабинет</p>
            <p className="text-xs mt-1">Чтобы увидеть все ваши заявления</p>
            <Link
              to="/cabinet"
              className="inline-block mt-4 bg-[#0d47a1] text-white px-5 py-2 rounded text-sm font-medium hover:bg-[#1565c0] transition-colors"
            >
              Войти
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Status;
