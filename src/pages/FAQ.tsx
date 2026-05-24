import { useState } from "react";
import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";

const faqData = [
  {
    category: "Регистрация и вход",
    items: [
      { q: "Как зарегистрироваться на портале?", a: "Нажмите кнопку «Зарегистрироваться» в верхней части страницы. Укажите email, телефон и придумайте пароль. После подтверждения номера телефона аккаунт будет создан. Для доступа к большинству услуг потребуется подтвердить личность через МФЦ или банк." },
      { q: "Забыл пароль — что делать?", a: "Нажмите «Забыли пароль?» на странице входа. Укажите email или телефон, привязанный к аккаунту. На него придёт ссылка для сброса пароля. Ссылка действительна 24 часа." },
      { q: "Как подтвердить учётную запись?", a: "Подтвердить учётную запись можно через: МФЦ (лично с паспортом), банки-партнёры (Сбербанк, ВТБ и другие), Почту России, онлайн через банковскую карту. После подтверждения станут доступны все услуги портала." },
    ],
  },
  {
    category: "Подача заявлений",
    items: [
      { q: "Как подать заявление онлайн?", a: "Найдите нужную услугу в каталоге. Нажмите «Подать заявление». Авторизуйтесь или зарегистрируйтесь. Заполните форму, прикрепите необходимые документы и нажмите «Отправить». Номер заявления придёт на email и телефон." },
      { q: "Какие документы нужно прикрепить?", a: "Список необходимых документов указан на странице каждой услуги. Как правило, это скан или фото паспорта, СНИЛС и другие специфичные для услуги документы. Фото должны быть чёткими, читаемыми." },
      { q: "Можно ли отозвать поданное заявление?", a: "Да, заявление можно отозвать в личном кабинете в разделе «Мои заявления», если оно ещё находится в статусе «Подано» или «Принято». Если заявление уже в обработке, для отзыва свяжитесь со службой поддержки." },
      { q: "Сколько времени рассматривается заявление?", a: "Срок рассмотрения зависит от конкретной услуги и указан в описании. Обычно от 1 до 30 рабочих дней. Вы получите уведомление при изменении статуса заявления." },
    ],
  },
  {
    category: "Оплата госпошлины",
    items: [
      { q: "Как оплатить госпошлину?", a: "Оплата доступна онлайн при подаче заявления: банковской картой, через СБП, электронным кошельком. При оплате через портал предоставляется скидка 30%. Чек и подтверждение оплаты направляются на email." },
      { q: "Какая скидка при оплате онлайн?", a: "При оплате госпошлины через портал Российских услуг предоставляется скидка 30% от базового тарифа. Скидка применяется автоматически при выборе онлайн-оплаты." },
    ],
  },
  {
    category: "Получение результата",
    items: [
      { q: "Как получить готовый документ?", a: "Большинство документов можно получить в электронном виде — скачать в личном кабинете. Некоторые документы выдаются лично: в МФЦ, ведомстве или по почте — способ указан в описании услуги." },
      { q: "Документ пришёл с ошибкой — что делать?", a: "Обратитесь в службу поддержки через форму на странице или по телефону 8-800-100-00-00. Укажите номер заявления и опишите ошибку. Ошибки по вине ведомства исправляются бесплатно." },
      { q: "Где хранятся мои документы?", a: "Все полученные электронные документы хранятся в личном кабинете в разделе «Мои документы». Срок хранения — не менее 5 лет. Вы можете скачать их в любой момент." },
    ],
  },
];

const FAQ = () => {
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});

  const toggle = (key: string) => {
    setOpenItems((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-[#0d47a1] text-white py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-2 text-blue-200 text-sm mb-3">
            <Link to="/" className="hover:text-white">Главная</Link>
            <Icon name="ChevronRight" size={14} />
            <span>FAQ</span>
          </div>
          <h1 className="text-3xl font-bold">Часто задаваемые вопросы</h1>
          <p className="text-blue-100 mt-2">Ответы на популярные вопросы пользователей портала</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Search */}
        <div className="bg-white border border-gray-200 rounded-lg p-5 mb-8">
          <div className="relative">
            <Icon name="Search" size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input type="text" placeholder="Поиск по вопросам..." className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded text-sm focus:outline-none focus:border-[#0d47a1]" />
          </div>
        </div>

        {/* FAQ sections */}
        <div className="space-y-6">
          {faqData.map((section) => (
            <div key={section.category} className="bg-white border border-gray-200 rounded-lg overflow-hidden">
              <div className="bg-gray-50 border-b px-6 py-4">
                <h2 className="font-bold text-gray-800 flex items-center gap-2">
                  <Icon name="HelpCircle" size={18} className="text-[#0d47a1]" />
                  {section.category}
                </h2>
              </div>
              <div className="divide-y divide-gray-100">
                {section.items.map((item, idx) => {
                  const key = `${section.category}-${idx}`;
                  const open = openItems[key];
                  return (
                    <div key={key}>
                      <button
                        onClick={() => toggle(key)}
                        className="w-full flex items-center justify-between gap-4 px-6 py-4 text-left hover:bg-gray-50 transition-colors"
                      >
                        <span className="font-medium text-gray-800 text-sm">{item.q}</span>
                        <Icon name={open ? "ChevronUp" : "ChevronDown"} size={18} className="text-gray-400 flex-shrink-0" />
                      </button>
                      {open && (
                        <div className="px-6 pb-4 animate-fade-in">
                          <div className="bg-blue-50 border-l-4 border-[#0d47a1] p-4 rounded-r text-sm text-gray-700 leading-relaxed">
                            {item.a}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Still have questions */}
        <div className="mt-8 bg-[#0d47a1] text-white rounded-lg p-8 text-center">
          <Icon name="MessageCircle" size={36} className="mx-auto mb-3 text-blue-200" />
          <h3 className="font-bold text-xl mb-2">Не нашли ответ?</h3>
          <p className="text-blue-200 text-sm mb-5">Обратитесь в нашу службу поддержки — мы обязательно поможем</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/support" className="inline-flex items-center justify-center gap-2 bg-white text-[#0d47a1] px-6 py-3 rounded font-semibold hover:bg-blue-50 transition-colors text-sm">
              <Icon name="Send" size={16} />
              Написать в поддержку
            </Link>
            <a href="tel:+78001000000" className="inline-flex items-center justify-center gap-2 border-2 border-white text-white px-6 py-3 rounded font-semibold hover:bg-blue-800 transition-colors text-sm">
              <Icon name="Phone" size={16} />
              8-800-100-00-00
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
