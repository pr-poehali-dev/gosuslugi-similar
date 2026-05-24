import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Icon from "@/components/ui/icon";
import { useAuth } from "@/context/AuthContext";

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const location = useLocation();
  const { user, gosuslugiConnected, logout } = useAuth();

  const navLinks = [
    { href: "/catalog", label: "Каталог услуг" },
    { href: "/cabinet", label: "Личный кабинет" },
    { href: "/status", label: "Статус заявлений" },
    { href: "/documents", label: "Справки и документы" },
    { href: "/support", label: "Поддержка" },
    { href: "/faq", label: "FAQ" },
    { href: "/about", label: "О портале" },
  ];

  const isActive = (href: string) => location.pathname === href;

  return (
    <header className="w-full">
      {/* Top bar */}
      <div className="bg-[#0d47a1] text-white">
        <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between text-sm">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 opacity-90">
              <Icon name="Globe" size={14} />
              Официальный портал государственных услуг
            </span>
            <span className="flex items-center gap-1.5 text-green-300 font-medium text-xs">
              <Icon name="Lock" size={12} />
              Защищённый режим
            </span>
          </div>
          <div className="flex items-center gap-4">
            <a href="tel:+78001000000" className="flex items-center gap-1.5 hover:opacity-80 transition-opacity">
              <Icon name="Phone" size={14} />
              8-800-100-00-00
            </a>
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center gap-2 hover:opacity-80 transition-opacity"
                >
                  <div className="w-6 h-6 bg-white text-[#0d47a1] rounded-full flex items-center justify-center text-xs font-bold">
                    {user.lastName[0]}{user.firstName[0]}
                  </div>
                  <span className="font-medium">{user.lastName} {user.firstName}</span>
                  <Icon name="ChevronDown" size={14} />
                </button>

                {profileOpen && (
                  <div className="absolute right-0 top-8 w-72 bg-white text-gray-800 rounded-lg shadow-xl border border-gray-200 z-50 animate-fade-in">
                    <div className="p-4 border-b border-gray-100">
                      <div className="font-bold text-sm">{user.lastName} {user.firstName}</div>
                      <div className="text-xs text-gray-500 mt-0.5">{user.email}</div>
                      <div className="text-xs text-gray-500">{user.phone}</div>
                      {user.snils && <div className="text-xs text-gray-400 mt-0.5">СНИЛС: {user.snils}</div>}
                      {gosuslugiConnected && (
                        <div className="mt-2 flex items-center gap-1.5 text-green-600 text-xs font-semibold">
                          <Icon name="CheckCircle" size={13} />
                          Госуслуги: вход выполнен
                        </div>
                      )}
                    </div>
                    <div className="p-2">
                      <Link
                        to="/cabinet"
                        onClick={() => setProfileOpen(false)}
                        className="flex items-center gap-2 px-3 py-2 rounded text-sm hover:bg-gray-50 transition-colors"
                      >
                        <Icon name="User" size={15} className="text-[#0d47a1]" />
                        Личный кабинет
                      </Link>
                      <button
                        onClick={() => { logout(); setProfileOpen(false); }}
                        className="w-full flex items-center gap-2 px-3 py-2 rounded text-sm hover:bg-red-50 text-red-600 transition-colors"
                      >
                        <Icon name="LogOut" size={15} />
                        Выйти
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/cabinet" className="flex items-center gap-1.5 hover:opacity-80 transition-opacity">
                <Icon name="User" size={14} />
                Войти
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="bg-white border-b-2 border-[#0d47a1] shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-12 h-12 bg-[#0d47a1] rounded flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold text-lg leading-none">РУ</span>
              </div>
              <div>
                <div className="font-bold text-[#0d47a1] text-xl leading-tight">Российские услуги</div>
                <div className="text-gray-500 text-xs">государственные онлайн-услуги</div>
              </div>
            </Link>

            {/* Search */}
            <div className="hidden md:flex flex-1 max-w-lg mx-8">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Поиск услуг и информации..."
                  className="w-full border border-gray-300 rounded-l px-4 py-2.5 text-sm focus:outline-none focus:border-[#0d47a1]"
                />
                <button className="absolute right-0 top-0 h-full px-4 bg-[#0d47a1] text-white rounded-r hover:bg-[#1565c0] transition-colors">
                  <Icon name="Search" size={18} />
                </button>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {user ? (
                <div className="hidden md:flex flex-col items-end gap-0.5">
                  <span className="text-sm font-semibold text-gray-800">{user.lastName} {user.firstName}</span>
                  {gosuslugiConnected && (
                    <span className="text-xs text-green-600 font-semibold flex items-center gap-1">
                      <Icon name="CheckCircle" size={11} />
                      Госуслуги: вход выполнен
                    </span>
                  )}
                </div>
              ) : (
                <Link
                  to="/cabinet"
                  className="hidden md:flex items-center gap-2 bg-[#0d47a1] text-white px-4 py-2.5 rounded text-sm font-medium hover:bg-[#1565c0] transition-colors"
                >
                  <Icon name="LogIn" size={16} />
                  Войти / Зарегистрироваться
                </Link>
              )}
              <button
                className="md:hidden p-2 text-[#0d47a1]"
                onClick={() => setMobileOpen(!mobileOpen)}
              >
                <Icon name={mobileOpen ? "X" : "Menu"} size={24} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="bg-[#1a3a6b] hidden md:block">
        <div className="max-w-7xl mx-auto px-4">
          <ul className="flex items-center gap-0">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  to={link.href}
                  className={`block px-4 py-3 text-sm font-medium transition-colors ${
                    isActive(link.href)
                      ? "bg-white text-[#0d47a1]"
                      : "text-white hover:bg-[#0d47a1]"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-b shadow-lg animate-fade-in">
          <div className="px-4 py-3">
            <div className="relative mb-3">
              <input
                type="text"
                placeholder="Поиск услуг..."
                className="w-full border border-gray-300 rounded px-4 py-2.5 text-sm focus:outline-none focus:border-[#0d47a1]"
              />
            </div>
            {user && (
              <div className="bg-blue-50 rounded p-3 mb-3 text-sm">
                <div className="font-semibold text-gray-800">{user.lastName} {user.firstName}</div>
                <div className="text-gray-500 text-xs">{user.email}</div>
                {gosuslugiConnected && (
                  <div className="text-green-600 text-xs font-semibold mt-1 flex items-center gap-1">
                    <Icon name="CheckCircle" size={11} /> Госуслуги: вход выполнен
                  </div>
                )}
              </div>
            )}
            <ul className="space-y-1">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className={`block px-3 py-2.5 rounded text-sm font-medium ${
                      isActive(link.href)
                        ? "bg-[#0d47a1] text-white"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
