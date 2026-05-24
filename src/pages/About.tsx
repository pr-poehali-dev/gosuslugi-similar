import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-[#0d47a1] text-white py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-2 text-blue-200 text-sm mb-3">
            <Link to="/" className="hover:text-white">Главная</Link>
            <Icon name="ChevronRight" size={14} />
            <span>О портале</span>
          </div>
          <h1 className="text-3xl font-bold">Информация о портале</h1>
          <p className="text-blue-100 mt-2">Российские услуги — государственные онлайн-услуги</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            {/* About */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h2 className="font-bold text-gray-800 text-xl mb-4 flex items-center gap-2">
                <Icon name="Info" size={18} className="text-[#0d47a1]" />
                О портале «Российские услуги»
              </h2>
              <div className="prose text-sm text-gray-600 space-y-3 leading-relaxed">
                <p>
                  Портал «Российские услуги» — это государственная информационная система, предназначенная для предоставления государственных и муниципальных услуг в электронном виде гражданам Российской Федерации, иностранным гражданам и организациям.
                </p>
                <p>
                  На портале представлено более 350 федеральных, региональных и муниципальных услуг. Большинство из них доступны полностью в электронном виде — от подачи заявления до получения готового документа.
                </p>
                <p>
                  Портал создан в целях реализации государственной политики в сфере перевода государственных услуг в электронный вид, снижения административной нагрузки на граждан и организации.
                </p>
              </div>
            </div>

            {/* Mission */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h2 className="font-bold text-gray-800 text-xl mb-4 flex items-center gap-2">
                <Icon name="Target" size={18} className="text-[#0d47a1]" />
                Миссия и цели
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { icon: "Clock", title: "Экономия времени", desc: "Получайте услуги без очередей и ненужных визитов в офис" },
                  { icon: "Shield", title: "Безопасность", desc: "Защита персональных данных и документов по высшим стандартам" },
                  { icon: "Globe", title: "Доступность", desc: "Услуги доступны 24/7 из любой точки России и мира" },
                  { icon: "Users", title: "Для всех", desc: "Простой и понятный интерфейс для граждан любого возраста" },
                ].map((item) => (
                  <div key={item.title} className="flex items-start gap-3 p-4 bg-gray-50 rounded">
                    <Icon name={item.icon} size={20} className="text-[#0d47a1] flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-gray-800 text-sm mb-1">{item.title}</div>
                      <div className="text-xs text-gray-500">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Legal */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h2 className="font-bold text-gray-800 text-xl mb-4 flex items-center gap-2">
                <Icon name="Scale" size={18} className="text-[#0d47a1]" />
                Нормативная база
              </h2>
              <div className="space-y-3">
                {[
                  "Федеральный закон № 210-ФЗ «Об организации предоставления государственных и муниципальных услуг»",
                  "Федеральный закон № 149-ФЗ «Об информации, информационных технологиях и о защите информации»",
                  "Федеральный закон № 63-ФЗ «Об электронной подписи»",
                  "Федеральный закон № 152-ФЗ «О персональных данных»",
                  "Постановление Правительства РФ № 1203 «О федеральной государственной информационной системе»",
                ].map((law) => (
                  <div key={law} className="flex items-start gap-2 text-sm text-gray-600">
                    <Icon name="FileText" size={16} className="text-[#0d47a1] flex-shrink-0 mt-0.5" />
                    {law}
                  </div>
                ))}
              </div>
            </div>

            {/* Privacy */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h2 className="font-bold text-gray-800 text-xl mb-4 flex items-center gap-2">
                <Icon name="Lock" size={18} className="text-[#0d47a1]" />
                Политика конфиденциальности
              </h2>
              <div className="text-sm text-gray-600 space-y-3 leading-relaxed">
                <p>Портал обрабатывает персональные данные пользователей исключительно в целях предоставления государственных услуг. Данные хранятся на серверах, расположенных на территории Российской Федерации.</p>
                <p>Передача данных третьим лицам осуществляется только в рамках межведомственного взаимодействия и в случаях, предусмотренных законодательством.</p>
                <p>Пользователь вправе запросить сведения о хранимых данных, потребовать их исправления или удаления, обратившись в службу поддержки.</p>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="font-bold text-gray-800 mb-4">Создатель портала</h3>
              <div className="space-y-3 text-sm">
                {[
                  { label: "Разработчик", value: "zaharkonenkin308@gmail.com" },
                  { label: "Версия", value: "1.0.0" },
                  { label: "Дата запуска", value: "2024" },
                  { label: "Технологии", value: "React, TypeScript" },
                ].map((row) => (
                  <div key={row.label} className="flex flex-col gap-0.5">
                    <span className="text-gray-400 text-xs">{row.label}</span>
                    <span className="text-gray-700 font-medium break-all">{row.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Icon name="BarChart2" size={16} className="text-[#0d47a1]" />
                Статистика портала
              </h3>
              <div className="space-y-4">
                {[
                  { label: "Доступных услуг", value: "350+" },
                  { label: "Пользователей", value: "2.4 млн" },
                  { label: "Заявлений в день", value: "~15 000" },
                  { label: "Регионов охвата", value: "89" },
                  { label: "Ведомств-партнёров", value: "47" },
                ].map((stat) => (
                  <div key={stat.label} className="flex justify-between items-center text-sm border-b border-gray-100 pb-3 last:border-0">
                    <span className="text-gray-500">{stat.label}</span>
                    <span className="font-bold text-[#0d47a1]">{stat.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#0d47a1] text-white rounded-lg p-6">
              <h3 className="font-bold mb-2">Обратная связь</h3>
              <p className="text-blue-200 text-sm mb-4">Ваши предложения по улучшению портала помогают нам стать лучше</p>
              <Link to="/support" className="block text-center bg-white text-[#0d47a1] py-2.5 rounded font-semibold text-sm hover:bg-blue-50 transition-colors">
                Написать нам
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
