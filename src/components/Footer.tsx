import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";

const Footer = () => {
  return (
    <footer className="bg-[#1a2744] text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-white rounded flex items-center justify-center flex-shrink-0">
                <span className="text-[#0d47a1] font-bold text-base">РУ</span>
              </div>
              <div>
                <div className="font-bold text-base leading-tight">Российские услуги</div>
                <div className="text-blue-300 text-xs">государственные онлайн-услуги</div>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Официальный портал для получения государственных услуг в электронном виде.
            </p>
          </div>

          {/* Услуги */}
          <div>
            <h4 className="font-semibold text-sm mb-4 text-blue-200 uppercase tracking-wide">Услуги</h4>
            <ul className="space-y-2">
              {[
                { to: "/catalog", label: "Каталог заявлений" },
                { to: "/documents", label: "Справки и документы" },
                { to: "/status", label: "Статус заявлений" },
                { to: "/cabinet", label: "Личный кабинет" },
              ].map((item) => (
                <li key={item.to}>
                  <Link to={item.to} className="text-gray-300 text-sm hover:text-white transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Помощь */}
          <div>
            <h4 className="font-semibold text-sm mb-4 text-blue-200 uppercase tracking-wide">Помощь</h4>
            <ul className="space-y-2">
              {[
                { to: "/faq", label: "Часто задаваемые вопросы" },
                { to: "/support", label: "Служба поддержки" },
                { to: "/about", label: "О портале" },
              ].map((item) => (
                <li key={item.to}>
                  <Link to={item.to} className="text-gray-300 text-sm hover:text-white transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Контакты */}
          <div>
            <h4 className="font-semibold text-sm mb-4 text-blue-200 uppercase tracking-wide">Контакты</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm text-gray-300">
                <Icon name="Phone" size={16} className="text-blue-300 mt-0.5 flex-shrink-0" />
                <div>
                  <div className="font-medium text-white">8-800-100-00-00</div>
                  <div className="text-xs text-gray-400">Бесплатно по России</div>
                </div>
              </li>
              <li className="flex items-start gap-2 text-sm text-gray-300">
                <Icon name="Mail" size={16} className="text-blue-300 mt-0.5 flex-shrink-0" />
                <div>
                  <a href="mailto:zaharkonenkin308@gmail.com" className="hover:text-white transition-colors break-all">
                    zaharkonenkin308@gmail.com
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-2 text-sm text-gray-300">
                <Icon name="Clock" size={16} className="text-blue-300 mt-0.5 flex-shrink-0" />
                <div>Пн–Пт: 9:00–18:00</div>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-600 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-400 text-sm">
            © 2024 Российские услуги. Государственный информационный портал.
          </p>
          <div className="flex items-center gap-6 text-sm text-gray-400">
            <Link to="/about" className="hover:text-white transition-colors">Политика конфиденциальности</Link>
            <Link to="/about" className="hover:text-white transition-colors">Пользовательское соглашение</Link>
            <Link to="/about" className="hover:text-white transition-colors">Доступность</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
