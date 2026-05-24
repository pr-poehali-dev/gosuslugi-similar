import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Icon from "@/components/ui/icon";
import { useAuth } from "@/context/AuthContext";

const allServices = [
  { id: 1, icon: "FileText", title: "Оформление загранпаспорта", desc: "Заявление на получение или замену загранпаспорта нового или старого образца", category: "Документы", time: "30 дней", price: "5 000 ₽", popular: true,
    fields: [
      { label: "Тип паспорта", type: "select", options: ["Новый (10 лет)", "Старый (5 лет)"] },
      { label: "Серия и номер паспорта РФ", type: "text", placeholder: "45 12 123456" },
      { label: "Дата рождения", type: "date" },
      { label: "Место рождения", type: "text", placeholder: "г. Москва" },
      { label: "Цель получения", type: "select", options: ["Первичное получение", "Замена", "Истёк срок действия"] },
    ]
  },
  { id: 2, icon: "Car", title: "Регистрация транспортного средства", desc: "Постановка автомобиля на учёт в ГИБДД при покупке", category: "Транспорт", time: "1 день", price: "2 850 ₽", popular: true,
    fields: [
      { label: "VIN-номер автомобиля", type: "text", placeholder: "XWEBB81440H000001" },
      { label: "Государственный номер (если есть)", type: "text", placeholder: "А123БВ 77" },
      { label: "Марка и модель", type: "text", placeholder: "Toyota Camry" },
      { label: "Год выпуска", type: "text", placeholder: "2020" },
      { label: "Тип документа на ТС", type: "select", options: ["ПТС", "ЭПТС"] },
    ]
  },
  { id: 3, icon: "Home", title: "Регистрация по месту жительства", desc: "Постоянная прописка по месту фактического проживания", category: "Регистрация", time: "7 дней", price: "Бесплатно", popular: true,
    fields: [
      { label: "Адрес регистрации", type: "text", placeholder: "г. Москва, ул. Ленина, д. 1, кв. 5" },
      { label: "Основание для проживания", type: "select", options: ["Собственность", "Договор найма", "Согласие собственника"] },
      { label: "Дата заселения", type: "date" },
    ]
  },
  { id: 4, icon: "Baby", title: "Свидетельство о рождении", desc: "Получение первичного или повторного свидетельства о рождении", category: "ЗАГС", time: "5 дней", price: "350 ₽", popular: false,
    fields: [
      { label: "ФИО ребёнка", type: "text", placeholder: "Иванов Иван Иванович" },
      { label: "Дата рождения ребёнка", type: "date" },
      { label: "Место рождения", type: "text", placeholder: "г. Москва" },
      { label: "ФИО матери", type: "text", placeholder: "Иванова Мария Петровна" },
      { label: "ФИО отца", type: "text", placeholder: "Иванов Пётр Сергеевич" },
    ]
  },
  { id: 5, icon: "GraduationCap", title: "Запись в школу / детский сад", desc: "Подача заявления на зачисление ребёнка в образовательное учреждение", category: "Образование", time: "5 дней", price: "Бесплатно", popular: true,
    fields: [
      { label: "ФИО ребёнка", type: "text", placeholder: "Иванов Иван Иванович" },
      { label: "Дата рождения ребёнка", type: "date" },
      { label: "Тип учреждения", type: "select", options: ["Детский сад", "Школа"] },
      { label: "Адрес проживания", type: "text", placeholder: "г. Москва, ул. Ленина, д. 1" },
    ]
  },
  { id: 6, icon: "Stethoscope", title: "Запись к врачу", desc: "Онлайн запись на приём в поликлинику по полису ОМС", category: "Здравоохранение", time: "Сразу", price: "Бесплатно", popular: true,
    fields: [
      { label: "Специальность врача", type: "select", options: ["Терапевт", "Педиатр", "Кардиолог", "Невролог", "Хирург"] },
      { label: "Номер полиса ОМС", type: "text", placeholder: "1234567890123456" },
      { label: "Желаемая дата", type: "date" },
      { label: "Жалобы / причина обращения", type: "textarea", placeholder: "Опишите симптомы" },
    ]
  },
  { id: 7, icon: "Building2", title: "Получение ИНН", desc: "Оформление идентификационного номера налогоплательщика", category: "Налоги", time: "5 дней", price: "Бесплатно", popular: false,
    fields: [
      { label: "Серия и номер паспорта", type: "text", placeholder: "45 12 123456" },
      { label: "Дата выдачи паспорта", type: "date" },
      { label: "Адрес регистрации", type: "text", placeholder: "г. Москва, ул. Ленина, д. 1" },
    ]
  },
  { id: 8, icon: "Shield", title: "Оформление полиса ОМС", desc: "Получение полиса обязательного медицинского страхования", category: "Здравоохранение", time: "30 дней", price: "Бесплатно", popular: false,
    fields: [
      { label: "СНИЛС", type: "text", placeholder: "123-456-789 00" },
      { label: "Страховая компания", type: "select", options: ["СОГАЗ-Мед", "ВТБ МС", "Ингосстрах-М", "АльфаСтрахование-ОМС"] },
      { label: "Способ получения", type: "select", options: ["Электронный полис", "Пластиковая карта"] },
    ]
  },
  { id: 9, icon: "CreditCard", title: "Оформление СНИЛС", desc: "Получение страхового номера индивидуального лицевого счёта", category: "Пенсия", time: "5 дней", price: "Бесплатно", popular: false,
    fields: [
      { label: "Серия и номер паспорта", type: "text", placeholder: "45 12 123456" },
      { label: "Дата рождения", type: "date" },
      { label: "Гражданство", type: "select", options: ["Российская Федерация", "Другое"] },
    ]
  },
  { id: 10, icon: "Landmark", title: "Льготы и субсидии ЖКХ", desc: "Оформление субсидии на оплату жилищно-коммунальных услуг", category: "ЖКХ", time: "10 дней", price: "Бесплатно", popular: false,
    fields: [
      { label: "Адрес жилья", type: "text", placeholder: "г. Москва, ул. Ленина, д. 1, кв. 5" },
      { label: "Ежемесячный доход семьи (руб.)", type: "text", placeholder: "50000" },
      { label: "Размер жилой площади (м²)", type: "text", placeholder: "52" },
      { label: "Состав семьи (чел.)", type: "text", placeholder: "3" },
    ]
  },
  { id: 11, icon: "MapPin", title: "Замена водительского удостоверения", desc: "Замена прав при истечении срока или смене данных", category: "Транспорт", time: "7 дней", price: "3 000 ₽", popular: false,
    fields: [
      { label: "Серия и номер действующих прав", type: "text", placeholder: "77 12 123456" },
      { label: "Причина замены", type: "select", options: ["Истёк срок действия", "Смена фамилии", "Непригодность", "Утеря"] },
      { label: "Категории ТС", type: "select", options: ["A", "B", "C", "D", "AB", "BC"] },
    ]
  },
  { id: 12, icon: "FileCheck", title: "Справка об отсутствии судимости", desc: "Получение официальной справки для предоставления по месту требования", category: "Документы", time: "30 дней", price: "Бесплатно", popular: false,
    fields: [
      { label: "Цель получения справки", type: "select", options: ["Трудоустройство", "Усыновление", "Выезд за рубеж", "Другое"] },
      { label: "Место требования", type: "text", placeholder: "Название организации" },
    ]
  },
  { id: 13, icon: "Briefcase", title: "Регистрация ИП", desc: "Государственная регистрация индивидуального предпринимателя", category: "Бизнес", time: "3 дня", price: "Бесплатно", popular: false,
    fields: [
      { label: "Коды ОКВЭД (основной)", type: "text", placeholder: "62.01" },
      { label: "Система налогообложения", type: "select", options: ["УСН 6%", "УСН 15%", "ОСНО", "Патент"] },
      { label: "Адрес регистрации ИП", type: "text", placeholder: "г. Москва, ул. Ленина, д. 1" },
    ]
  },
  { id: 14, icon: "Heart", title: "Пособие по беременности", desc: "Оформление единовременного пособия при рождении ребёнка", category: "Семья", time: "10 дней", price: "Бесплатно", popular: false,
    fields: [
      { label: "Дата рождения ребёнка", type: "date" },
      { label: "Работодатель / ФСС", type: "select", options: ["Через работодателя", "Напрямую в ФСС"] },
      { label: "Номер банковского счёта", type: "text", placeholder: "40817810000000000000" },
    ]
  },
  { id: 15, icon: "Home", title: "Временная регистрация", desc: "Постановка на учёт по месту пребывания на срок до 5 лет", category: "Регистрация", time: "3 дня", price: "Бесплатно", popular: false,
    fields: [
      { label: "Адрес временного проживания", type: "text", placeholder: "г. Санкт-Петербург, ул. Невская, д. 5, кв. 12" },
      { label: "Срок временной регистрации", type: "select", options: ["3 месяца", "6 месяцев", "1 год", "3 года", "5 лет"] },
      { label: "Основание", type: "select", options: ["Согласие собственника", "Договор найма"] },
    ]
  },
  { id: 16, icon: "FileText", title: "Оформление паспорта РФ", desc: "Получение или замена внутреннего паспорта гражданина России", category: "Документы", time: "10 дней", price: "300 ₽", popular: true,
    fields: [
      { label: "Причина обращения", type: "select", options: ["Первичное получение (14 лет)", "Замена в 20 лет", "Замена в 45 лет", "Смена фамилии", "Утеря/кража", "Повреждение"] },
      { label: "Дата рождения", type: "date" },
      { label: "Место рождения", type: "text", placeholder: "г. Москва" },
    ]
  },
];

const categories = ["Все", "Документы", "Транспорт", "Регистрация", "ЗАГС", "Образование", "Здравоохранение", "Налоги", "Пенсия", "ЖКХ", "Бизнес", "Семья"];

type Field = { label: string; type: string; placeholder?: string; options?: string[] };
type Service = typeof allServices[0];

const ApplicationModal = ({
  service,
  onClose,
  onSubmit,
}: {
  service: Service;
  onClose: () => void;
  onSubmit: (title: string) => void;
}) => {
  const { user, gosuslugiConnected } = useAuth();
  const [step, setStep] = useState<"form" | "checking" | "done" | "nogu">(
    !user ? "nogu" : !gosuslugiConnected ? "nogu" : "form"
  );
  const [formData, setFormData] = useState<Record<string, string>>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStep("checking");
    await new Promise((r) => setTimeout(r, 2000));
    setStep("done");
    onSubmit(service.title);
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div
        className="bg-white rounded-lg shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto animate-fade-in"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-[#0d47a1] text-white p-5 rounded-t-lg flex items-start justify-between">
          <div>
            <h2 className="font-bold text-lg">{service.title}</h2>
            <p className="text-blue-200 text-sm mt-0.5">{service.category} · {service.time} · {service.price}</p>
          </div>
          <button onClick={onClose} className="text-white hover:opacity-70 transition-opacity ml-4">
            <Icon name="X" size={20} />
          </button>
        </div>

        <div className="p-6">
          {step === "nogu" && (
            <div className="text-center py-4">
              <div className="w-14 h-14 bg-orange-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="AlertTriangle" size={28} className="text-orange-500" />
              </div>
              <h3 className="font-bold text-gray-800 mb-2">
                {!user ? "Требуется авторизация" : "Требуется подключение Госуслуг"}
              </h3>
              <p className="text-sm text-gray-500 mb-5">
                {!user
                  ? "Войдите или зарегистрируйтесь, чтобы подать заявление."
                  : "Подключите Госуслуги в личном кабинете для подачи официального заявления."}
              </p>
              <Link
                to="/cabinet"
                onClick={onClose}
                className="inline-flex items-center gap-2 bg-[#0d47a1] text-white px-5 py-2.5 rounded font-semibold hover:bg-[#1565c0] transition-colors text-sm"
              >
                <Icon name="User" size={15} />
                {!user ? "Войти / Зарегистрироваться" : "Перейти в кабинет"}
              </Link>
            </div>
          )}

          {step === "form" && (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="bg-green-50 border border-green-200 rounded p-3 flex items-center gap-2 text-sm text-green-700">
                <Icon name="CheckCircle" size={15} />
                <span>Госуслуги подключены — данные будут проверены автоматически</span>
              </div>
              {service.fields.map((field: Field) => (
                <div key={field.label}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{field.label}</label>
                  {field.type === "select" ? (
                    <select
                      required
                      value={formData[field.label] || ""}
                      onChange={(e) => setFormData({ ...formData, [field.label]: e.target.value })}
                      className="w-full border border-gray-300 rounded px-3 py-2.5 text-sm focus:outline-none focus:border-[#0d47a1] bg-white"
                    >
                      <option value="">Выберите...</option>
                      {field.options?.map((o) => <option key={o}>{o}</option>)}
                    </select>
                  ) : field.type === "textarea" ? (
                    <textarea
                      rows={3}
                      value={formData[field.label] || ""}
                      onChange={(e) => setFormData({ ...formData, [field.label]: e.target.value })}
                      placeholder={field.placeholder}
                      className="w-full border border-gray-300 rounded px-3 py-2.5 text-sm focus:outline-none focus:border-[#0d47a1] resize-none"
                    />
                  ) : (
                    <input
                      required
                      type={field.type}
                      value={formData[field.label] || ""}
                      onChange={(e) => setFormData({ ...formData, [field.label]: e.target.value })}
                      placeholder={field.placeholder}
                      className="w-full border border-gray-300 rounded px-3 py-2.5 text-sm focus:outline-none focus:border-[#0d47a1]"
                    />
                  )}
                </div>
              ))}
              <button
                type="submit"
                className="w-full bg-[#0d47a1] text-white py-3 rounded font-semibold hover:bg-[#1565c0] transition-colors flex items-center justify-center gap-2"
              >
                <Icon name="Send" size={16} />
                Отправить заявление через Госуслуги
              </button>
            </form>
          )}

          {step === "checking" && (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="Loader" size={30} className="text-[#0d47a1] animate-spin" />
              </div>
              <h3 className="font-bold text-gray-800 mb-2">Госуслуги проверяют данные...</h3>
              <p className="text-sm text-gray-500">Проверяем аккаунт и отправляем заявление. Пожалуйста, подождите.</p>
            </div>
          )}

          {step === "done" && (
            <div className="text-center py-4 animate-fade-in">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="CheckCircle" size={32} className="text-green-600" />
              </div>
              <h3 className="font-bold text-gray-800 text-lg mb-2">Заявление подано!</h3>
              <p className="text-sm text-gray-500 mb-2">
                Ваше заявление успешно отправлено через Госуслуги. Номер заявления сохранён в личном кабинете.
              </p>
              <p className="text-xs text-gray-400 mb-5">Уведомление придёт на телефон и email.</p>
              <div className="flex gap-3 justify-center">
                <button
                  onClick={onClose}
                  className="border border-gray-300 text-gray-600 px-4 py-2 rounded text-sm hover:bg-gray-50 transition-colors"
                >
                  Закрыть
                </button>
                <Link
                  to="/cabinet"
                  onClick={onClose}
                  className="bg-[#0d47a1] text-white px-4 py-2 rounded text-sm font-medium hover:bg-[#1565c0] transition-colors"
                >
                  Мои заявления
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const Catalog = () => {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("Все");
  const [sortBy, setSortBy] = useState("popular");
  const [activeService, setActiveService] = useState<Service | null>(null);
  const { addApplication } = useAuth();
  const navigate = useNavigate();

  const filtered = allServices.filter((s) => {
    const matchCat = activeCategory === "Все" || s.category === activeCategory;
    const matchSearch = s.title.toLowerCase().includes(search.toLowerCase()) || s.desc.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === "popular") return (b.popular ? 1 : 0) - (a.popular ? 1 : 0);
    return a.title.localeCompare(b.title);
  });

  const handleApplicationSubmit = (title: string) => {
    addApplication(title);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-[#0d47a1] text-white py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-2 text-blue-200 text-sm mb-3">
            <Link to="/" className="hover:text-white">Главная</Link>
            <Icon name="ChevronRight" size={14} />
            <span>Каталог заявлений и услуг</span>
          </div>
          <h1 className="text-3xl font-bold mb-2">Каталог заявлений и услуг</h1>
          <p className="text-blue-100">Более 350 государственных услуг в электронном виде</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white border border-gray-200 rounded-lg p-5 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Icon name="Search" size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Поиск по названию или описанию..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded text-sm focus:outline-none focus:border-[#0d47a1]"
              />
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border border-gray-300 rounded px-3 py-2.5 text-sm focus:outline-none focus:border-[#0d47a1] bg-white"
            >
              <option value="popular">По популярности</option>
              <option value="alpha">По алфавиту</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          <aside className="md:w-56 flex-shrink-0">
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
              <div className="px-4 py-3 bg-[#0d47a1] text-white text-sm font-semibold">Категории</div>
              <ul>
                {categories.map((cat) => (
                  <li key={cat}>
                    <button
                      onClick={() => setActiveCategory(cat)}
                      className={`w-full text-left px-4 py-3 text-sm border-b border-gray-100 last:border-0 transition-colors ${
                        activeCategory === cat
                          ? "bg-blue-50 text-[#0d47a1] font-semibold border-l-2 border-l-[#0d47a1]"
                          : "text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      {cat}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          <div className="flex-1">
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-gray-500">Найдено: <span className="font-semibold text-gray-800">{sorted.length}</span> услуг</p>
            </div>
            <div className="space-y-3">
              {sorted.map((service) => (
                <div key={service.id} className="bg-white border border-gray-200 rounded-lg p-5 hover-card-lift">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-blue-50 rounded flex items-center justify-center flex-shrink-0">
                      <Icon name={service.icon} size={22} className="text-[#0d47a1]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-start gap-2 mb-1">
                        <h3 className="font-semibold text-gray-800 text-base">{service.title}</h3>
                        {service.popular && (
                          <span className="text-xs bg-orange-50 text-orange-600 border border-orange-200 px-2 py-0.5 rounded font-medium">
                            Популярное
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-500 mb-3">{service.desc}</p>
                      <div className="flex flex-wrap items-center gap-4 text-sm">
                        <span className="text-xs bg-blue-50 text-[#0d47a1] px-2 py-1 rounded font-medium">{service.category}</span>
                        <span className="flex items-center gap-1 text-gray-500">
                          <Icon name="Clock" size={14} />
                          {service.time}
                        </span>
                        <span className="flex items-center gap-1 font-medium text-gray-700">
                          <Icon name="Banknote" size={14} className="text-gray-400" />
                          {service.price}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2 flex-shrink-0">
                      <button
                        onClick={() => setActiveService(service)}
                        className="bg-[#0d47a1] text-white px-4 py-2 rounded text-sm font-medium hover:bg-[#1565c0] transition-colors whitespace-nowrap"
                      >
                        Подать заявление
                      </button>
                      <Link
                        to="/documents"
                        className="border border-gray-300 text-gray-600 px-4 py-2 rounded text-sm hover:bg-gray-50 transition-colors text-center"
                      >
                        Подробнее
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
              {sorted.length === 0 && (
                <div className="text-center py-16 text-gray-400">
                  <Icon name="SearchX" size={48} className="mx-auto mb-3" />
                  <p className="text-lg font-medium">Ничего не найдено</p>
                  <p className="text-sm">Попробуйте изменить запрос или выбрать другую категорию</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {activeService && (
        <ApplicationModal
          service={activeService}
          onClose={() => setActiveService(null)}
          onSubmit={(title) => {
            handleApplicationSubmit(title);
          }}
        />
      )}
    </div>
  );
};

export default Catalog;
