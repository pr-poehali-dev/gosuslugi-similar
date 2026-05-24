import { useState } from "react";
import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";

const Support = () => {
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-[#0d47a1] text-white py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-2 text-blue-200 text-sm mb-3">
            <Link to="/" className="hover:text-white">Главная</Link>
            <Icon name="ChevronRight" size={14} />
            <span>Служба поддержки</span>
          </div>
          <h1 className="text-3xl font-bold">Служба поддержки и контакты</h1>
          <p className="text-blue-100 mt-2">Мы готовы помочь вам в любой рабочий день</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Contact cards */}
        <div className="grid md:grid-cols-3 gap-5 mb-8">
          {[
            { icon: "Phone", title: "Телефон", lines: ["8-800-100-00-00", "Бесплатно по России", "Пн–Пт: 9:00–18:00"], color: "text-blue-600", bg: "bg-blue-50" },
            { icon: "Mail", title: "Электронная почта", lines: ["zaharkonenkin308@gmail.com", "Ответ в течение 2 рабочих дней"], color: "text-green-600", bg: "bg-green-50" },
            { icon: "MessageSquare", title: "Онлайн-чат", lines: ["Доступен на сайте", "Пн–Пт: 9:00–21:00", "Сб: 10:00–18:00"], color: "text-purple-600", bg: "bg-purple-50" },
          ].map((c) => (
            <div key={c.title} className="bg-white border border-gray-200 rounded-lg p-6 text-center">
              <div className={`w-14 h-14 ${c.bg} rounded-full flex items-center justify-center mx-auto mb-4`}>
                <Icon name={c.icon} size={26} className={c.color} />
              </div>
              <h3 className="font-bold text-gray-800 mb-3">{c.title}</h3>
              {c.lines.map((line, i) => (
                <p key={i} className={`text-sm ${i === 0 ? "font-semibold text-gray-800" : "text-gray-500"}`}>{line}</p>
              ))}
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Form */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h2 className="font-bold text-gray-800 text-xl mb-5 flex items-center gap-2">
              <Icon name="Send" size={18} className="text-[#0d47a1]" />
              Написать обращение
            </h2>

            {sent ? (
              <div className="text-center py-10 animate-fade-in">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="CheckCircle" size={32} className="text-green-600" />
                </div>
                <h3 className="font-bold text-gray-800 text-lg mb-2">Обращение отправлено!</h3>
                <p className="text-sm text-gray-500 mb-4">Мы свяжемся с вами в течение 2 рабочих дней.</p>
                <button onClick={() => setSent(false)} className="text-[#0d47a1] text-sm hover:underline">
                  Отправить ещё одно
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Имя *</label>
                    <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full border border-gray-300 rounded px-3 py-2.5 text-sm focus:outline-none focus:border-[#0d47a1]" placeholder="Иван Петров" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Телефон</label>
                    <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="w-full border border-gray-300 rounded px-3 py-2.5 text-sm focus:outline-none focus:border-[#0d47a1]" placeholder="+7 (___) ___-__-__" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                  <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full border border-gray-300 rounded px-3 py-2.5 text-sm focus:outline-none focus:border-[#0d47a1]" placeholder="example@mail.ru" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Тема обращения *</label>
                  <select required value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} className="w-full border border-gray-300 rounded px-3 py-2.5 text-sm focus:outline-none focus:border-[#0d47a1] bg-white">
                    <option value="">Выберите тему</option>
                    <option>Технические проблемы</option>
                    <option>Статус заявления</option>
                    <option>Вопрос по услуге</option>
                    <option>Ошибка в данных</option>
                    <option>Другое</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Сообщение *</label>
                  <textarea required value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} rows={5} className="w-full border border-gray-300 rounded px-3 py-2.5 text-sm focus:outline-none focus:border-[#0d47a1] resize-none" placeholder="Опишите вашу проблему или вопрос подробно..." />
                </div>
                <button type="submit" className="w-full bg-[#0d47a1] text-white py-3 rounded font-semibold hover:bg-[#1565c0] transition-colors flex items-center justify-center gap-2">
                  <Icon name="Send" size={16} />
                  Отправить обращение
                </button>
              </form>
            )}
          </div>

          {/* Map + offices */}
          <div className="space-y-5">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Icon name="MapPin" size={18} className="text-[#0d47a1]" />
                МФЦ «Мои документы»
              </h3>
              <div className="space-y-4">
                {[
                  { city: "Москва", addr: "ул. Арбат, 24, тел. 8 (495) 777-77-77", hours: "Пн–Пт: 8:00–20:00" },
                  { city: "Санкт-Петербург", addr: "Невский пр., 88, тел. 8 (812) 444-44-44", hours: "Пн–Пт: 9:00–19:00" },
                  { city: "Екатеринбург", addr: "ул. Ленина, 50, тел. 8 (343) 333-33-33", hours: "Пн–Пт: 9:00–18:00" },
                  { city: "Новосибирск", addr: "Красный пр., 10, тел. 8 (383) 222-22-22", hours: "Пн–Пт: 9:00–18:00" },
                ].map((office) => (
                  <div key={office.city} className="flex items-start gap-3 pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                    <Icon name="Building" size={18} className="text-[#0d47a1] flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-sm text-gray-800">{office.city}</div>
                      <div className="text-xs text-gray-500 mt-0.5">{office.addr}</div>
                      <div className="text-xs text-gray-400 mt-0.5 flex items-center gap-1">
                        <Icon name="Clock" size={11} />
                        {office.hours}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#0d47a1] text-white rounded-lg p-6">
              <h3 className="font-bold mb-2 flex items-center gap-2">
                <Icon name="HelpCircle" size={18} />
                Нашли ответ в FAQ?
              </h3>
              <p className="text-blue-200 text-sm mb-4">
                Возможно, ваш вопрос уже есть в разделе часто задаваемых вопросов.
              </p>
              <Link to="/faq" className="block text-center bg-white text-[#0d47a1] py-2.5 rounded font-semibold text-sm hover:bg-blue-50 transition-colors">
                Перейти в FAQ
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Support;
