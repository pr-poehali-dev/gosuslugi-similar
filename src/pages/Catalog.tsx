import { useState } from "react";
import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";

const allServices = [
  { id: 1, icon: "FileText", title: "Оформление загранпаспорта", desc: "Заявление на получение или замену загранпаспорта нового или старого образца", category: "Документы", time: "30 дней", price: "5 000 ₽", popular: true },
  { id: 2, icon: "Car", title: "Регистрация транспортного средства", desc: "Постановка автомобиля на учёт в ГИБДД при покупке", category: "Транспорт", time: "1 день", price: "2 850 ₽", popular: true },
  { id: 3, icon: "Home", title: "Регистрация по месту жительства", desc: "Постоянная прописка по месту фактического проживания", category: "Регистрация", time: "7 дней", price: "Бесплатно", popular: true },
  { id: 4, icon: "Baby", title: "Свидетельство о рождении", desc: "Получение первичного или повторного свидетельства о рождении", category: "ЗАГС", time: "5 дней", price: "350 ₽", popular: false },
  { id: 5, icon: "GraduationCap", title: "Запись в школу / детский сад", desc: "Подача заявления на зачисление ребёнка в образовательное учреждение", category: "Образование", time: "5 дней", price: "Бесплатно", popular: true },
  { id: 6, icon: "Stethoscope", title: "Запись к врачу", desc: "Онлайн запись на приём в поликлинику по полису ОМС", category: "Здравоохранение", time: "Сразу", price: "Бесплатно", popular: true },
  { id: 7, icon: "Building2", title: "Получение ИНН", desc: "Оформление идентификационного номера налогоплательщика", category: "Налоги", time: "5 дней", price: "Бесплатно", popular: false },
  { id: 8, icon: "Shield", title: "Оформление полиса ОМС", desc: "Получение полиса обязательного медицинского страхования", category: "Здравоохранение", time: "30 дней", price: "Бесплатно", popular: false },
  { id: 9, icon: "CreditCard", title: "Оформление СНИЛС", desc: "Получение страхового номера индивидуального лицевого счёта", category: "Пенсия", time: "5 дней", price: "Бесплатно", popular: false },
  { id: 10, icon: "Landmark", title: "Льготы и субсидии ЖКХ", desc: "Оформление субсидии на оплату жилищно-коммунальных услуг", category: "ЖКХ", time: "10 дней", price: "Бесплатно", popular: false },
  { id: 11, icon: "MapPin", title: "Замена водительского удостоверения", desc: "Замена прав при истечении срока или смене данных", category: "Транспорт", time: "7 дней", price: "3 000 ₽", popular: false },
  { id: 12, icon: "FileCheck", title: "Справка об отсутствии судимости", desc: "Получение официальной справки для предоставления по месту требования", category: "Документы", time: "30 дней", price: "Бесплатно", popular: false },
  { id: 13, icon: "Briefcase", title: "Регистрация ИП", desc: "Государственная регистрация индивидуального предпринимателя", category: "Бизнес", time: "3 дня", price: "Бесплатно", popular: false },
  { id: 14, icon: "Heart", title: "Пособие по беременности", desc: "Оформление единовременного пособия при рождении ребёнка", category: "Семья", time: "10 дней", price: "Бесплатно", popular: false },
  { id: 15, icon: "Home", title: "Временная регистрация", desc: "Постановка на учёт по месту пребывания на срок до 5 лет", category: "Регистрация", time: "3 дня", price: "Бесплатно", popular: false },
  { id: 16, icon: "Passport", title: "Оформление паспорта РФ", desc: "Получение или замена внутреннего паспорта гражданина России", category: "Документы", time: "10 дней", price: "300 ₽", popular: true },
];

const categories = ["Все", "Документы", "Транспорт", "Регистрация", "ЗАГС", "Образование", "Здравоохранение", "Налоги", "Пенсия", "ЖКХ", "Бизнес", "Семья"];

const Catalog = () => {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("Все");
  const [sortBy, setSortBy] = useState("popular");

  const filtered = allServices.filter((s) => {
    const matchCat = activeCategory === "Все" || s.category === activeCategory;
    const matchSearch = s.title.toLowerCase().includes(search.toLowerCase()) || s.desc.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === "popular") return (b.popular ? 1 : 0) - (a.popular ? 1 : 0);
    return a.title.localeCompare(b.title);
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page header */}
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
        {/* Search and filters */}
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
          {/* Sidebar categories */}
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

          {/* Services list */}
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
                      <Link
                        to="/cabinet"
                        className="bg-[#0d47a1] text-white px-4 py-2 rounded text-sm font-medium hover:bg-[#1565c0] transition-colors whitespace-nowrap"
                      >
                        Подать заявление
                      </Link>
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
    </div>
  );
};

export default Catalog;
