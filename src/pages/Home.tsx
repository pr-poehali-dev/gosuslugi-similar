import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";

const popularServices = [
  { icon: "FileText", title: "Загранпаспорт", desc: "Оформление и замена", category: "Документы", href: "/catalog" },
  { icon: "Car", title: "Регистрация автомобиля", desc: "Постановка на учёт в ГИБДД", category: "Транспорт", href: "/catalog" },
  { icon: "Home", title: "Регистрация по месту жительства", desc: "Постоянная и временная прописка", category: "Регистрация", href: "/catalog" },
  { icon: "Baby", title: "Свидетельство о рождении", desc: "Получение и восстановление", category: "ЗАГС", href: "/catalog" },
  { icon: "GraduationCap", title: "Запись в школу", desc: "Подача заявления в ОУ", category: "Образование", href: "/catalog" },
  { icon: "Stethoscope", title: "Запись к врачу", desc: "Онлайн запись в поликлинику", category: "Здравоохранение", href: "/catalog" },
  { icon: "Building2", title: "ИНН физического лица", desc: "Получение и восстановление", category: "Налоги", href: "/catalog" },
  { icon: "Shield", title: "Полис ОМС", desc: "Оформление медицинского полиса", category: "Здравоохранение", href: "/catalog" },
];

const categories = [
  { icon: "FileText", label: "Документы и паспорта", count: 42, href: "/catalog" },
  { icon: "Car", label: "Транспорт и вождение", count: 28, href: "/catalog" },
  { icon: "Home", label: "Жильё и ЖКХ", count: 35, href: "/catalog" },
  { icon: "GraduationCap", label: "Образование", count: 19, href: "/catalog" },
  { icon: "Briefcase", label: "Бизнес и предпринимательство", count: 56, href: "/catalog" },
  { icon: "Heart", label: "Семья и дети", count: 31, href: "/catalog" },
  { icon: "Stethoscope", label: "Здравоохранение", count: 24, href: "/catalog" },
  { icon: "Landmark", label: "Налоги и финансы", count: 47, href: "/catalog" },
];

const news = [
  { date: "22 мая 2024", title: "Новый способ подачи заявления на субсидию ЖКХ онлайн", tag: "Обновление" },
  { date: "18 мая 2024", title: "Расширен перечень услуг для самозанятых граждан", tag: "Новое" },
  { date: "15 мая 2024", title: "Упрощён порядок получения справки о несудимости", tag: "Изменения" },
];

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero banner */}
      <div className="bg-gradient-to-r from-[#0d47a1] to-[#1565c0] text-white">
        <div className="max-w-7xl mx-auto px-4 py-12 md:py-16">
          <div className="max-w-2xl animate-fade-in">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
              Государственные услуги — быстро и удобно
            </h1>
            <p className="text-blue-100 text-lg mb-8">
              Подавайте заявления, получайте справки и документы онлайн. Без очередей и лишних визитов в офис.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/catalog"
                className="inline-flex items-center justify-center gap-2 bg-white text-[#0d47a1] px-6 py-3 rounded font-semibold hover:bg-blue-50 transition-colors"
              >
                <Icon name="Search" size={18} />
                Найти услугу
              </Link>
              <Link
                to="/cabinet"
                className="inline-flex items-center justify-center gap-2 border-2 border-white text-white px-6 py-3 rounded font-semibold hover:bg-white hover:text-[#0d47a1] transition-colors"
              >
                <Icon name="User" size={18} />
                Войти в личный кабинет
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Stats bar */}
      <div className="bg-[#1a3a6b] text-white">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { value: "350+", label: "Услуг доступно" },
              { value: "2.4 млн", label: "Пользователей" },
              { value: "98%", label: "Довольных граждан" },
              { value: "24/7", label: "Работаем без перерывов" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-2xl font-bold text-blue-200">{stat.value}</div>
                <div className="text-xs text-gray-300 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-10">
        {/* Search */}
        <div className="mb-10 bg-white rounded-lg border border-gray-200 shadow-sm p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Найти государственную услугу</h2>
          <div className="flex gap-3">
            <div className="relative flex-1">
              <Icon name="Search" size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Например: загранпаспорт, регистрация автомобиля, справка..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-[#0d47a1] text-sm"
              />
            </div>
            <button className="bg-[#0d47a1] text-white px-6 py-3 rounded font-medium hover:bg-[#1565c0] transition-colors text-sm">
              Найти
            </button>
          </div>
        </div>

        {/* Categories */}
        <section className="mb-10">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-2xl font-bold text-gray-800">Категории услуг</h2>
            <Link to="/catalog" className="text-[#0d47a1] text-sm font-medium hover:underline flex items-center gap-1">
              Все категории <Icon name="ChevronRight" size={16} />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((cat) => (
              <Link
                key={cat.label}
                to={cat.href}
                className="bg-white border border-gray-200 rounded-lg p-5 hover-card-lift flex flex-col items-start gap-3 group"
              >
                <div className="w-10 h-10 bg-blue-50 rounded flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                  <Icon name={cat.icon} size={20} className="text-[#0d47a1]" />
                </div>
                <div>
                  <div className="font-semibold text-sm text-gray-800 leading-tight mb-1">{cat.label}</div>
                  <div className="text-xs text-gray-400">{cat.count} услуг</div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Popular services */}
        <section className="mb-10">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-2xl font-bold text-gray-800">Популярные услуги</h2>
            <Link to="/catalog" className="text-[#0d47a1] text-sm font-medium hover:underline flex items-center gap-1">
              Смотреть все <Icon name="ChevronRight" size={16} />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {popularServices.map((service) => (
              <Link
                key={service.title}
                to={service.href}
                className="bg-white border border-gray-200 rounded-lg p-5 hover-card-lift group"
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-blue-50 rounded flex items-center justify-center flex-shrink-0 group-hover:bg-blue-100 transition-colors">
                    <Icon name={service.icon} size={20} className="text-[#0d47a1]" />
                  </div>
                  <div>
                    <span className="inline-block text-xs bg-blue-50 text-[#0d47a1] px-2 py-0.5 rounded mb-1 font-medium">
                      {service.category}
                    </span>
                    <div className="font-semibold text-sm text-gray-800 leading-tight mb-1">{service.title}</div>
                    <div className="text-xs text-gray-500">{service.desc}</div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <div className="grid md:grid-cols-3 gap-6 mb-10">
          {/* Status check */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="font-bold text-gray-800 mb-2 flex items-center gap-2">
              <Icon name="Search" size={18} className="text-[#0d47a1]" />
              Проверить статус заявления
            </h3>
            <p className="text-sm text-gray-500 mb-4">Введите номер заявления для отслеживания</p>
            <input
              type="text"
              placeholder="Номер заявления"
              className="w-full border border-gray-300 rounded px-3 py-2.5 text-sm mb-3 focus:outline-none focus:border-[#0d47a1]"
            />
            <Link
              to="/status"
              className="w-full block text-center bg-[#0d47a1] text-white py-2.5 rounded text-sm font-medium hover:bg-[#1565c0] transition-colors"
            >
              Проверить
            </Link>
          </div>

          {/* Cabinet */}
          <div className="bg-[#0d47a1] text-white rounded-lg p-6">
            <h3 className="font-bold mb-2 flex items-center gap-2">
              <Icon name="User" size={18} />
              Личный кабинет
            </h3>
            <p className="text-sm text-blue-200 mb-4">Все ваши заявления и документы в одном месте</p>
            <ul className="text-sm text-blue-100 space-y-2 mb-5">
              {["История заявлений", "Сохранённые документы", "Уведомления", "Профиль"].map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <Icon name="Check" size={14} className="text-green-300" />
                  {item}
                </li>
              ))}
            </ul>
            <Link
              to="/cabinet"
              className="block text-center bg-white text-[#0d47a1] py-2.5 rounded text-sm font-semibold hover:bg-blue-50 transition-colors"
            >
              Войти
            </Link>
          </div>

          {/* News */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Icon name="Bell" size={18} className="text-[#0d47a1]" />
              Новости и обновления
            </h3>
            <div className="space-y-4">
              {news.map((item) => (
                <div key={item.title} className="pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs bg-blue-50 text-[#0d47a1] px-2 py-0.5 rounded font-medium">{item.tag}</span>
                    <span className="text-xs text-gray-400">{item.date}</span>
                  </div>
                  <p className="text-sm text-gray-700 leading-snug">{item.title}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* How it works */}
        <section className="bg-white border border-gray-200 rounded-lg p-8 mb-10">
          <h2 className="text-2xl font-bold text-gray-800 text-center mb-8">Как получить услугу</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { step: "1", icon: "User", title: "Войдите в кабинет", desc: "Зарегистрируйтесь или войдите в личный кабинет" },
              { step: "2", icon: "Search", title: "Найдите услугу", desc: "Выберите нужную услугу из каталога" },
              { step: "3", icon: "FileText", title: "Заполните форму", desc: "Внесите необходимые данные и прикрепите документы" },
              { step: "4", icon: "Download", title: "Получите результат", desc: "Скачайте готовый документ или получите его лично" },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="relative inline-block mb-4">
                  <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto">
                    <Icon name={item.icon} size={24} className="text-[#0d47a1]" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-6 h-6 bg-[#0d47a1] text-white rounded-full text-xs font-bold flex items-center justify-center">
                    {item.step}
                  </div>
                </div>
                <h4 className="font-semibold text-gray-800 mb-2">{item.title}</h4>
                <p className="text-sm text-gray-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;