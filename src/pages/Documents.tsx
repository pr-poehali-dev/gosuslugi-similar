import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";

const documents = [
  {
    id: 1,
    title: "Справка о регистрации по месту жительства",
    desc: "Форма 9. Подтверждение постоянной прописки по адресу",
    category: "Регистрация",
    format: "PDF",
    free: true,
  },
  {
    id: 2,
    title: "Выписка из домовой книги",
    desc: "Сведения о лицах, зарегистрированных по адресу",
    category: "Регистрация",
    format: "PDF",
    free: true,
  },
  {
    id: 3,
    title: "Справка об отсутствии судимости",
    desc: "Официальная справка из МВД для предъявления по месту требования",
    category: "Документы МВД",
    format: "PDF",
    free: true,
  },
  {
    id: 4,
    title: "Справка о составе семьи",
    desc: "Сведения о всех членах семьи, проживающих совместно",
    category: "Семья",
    format: "PDF",
    free: true,
  },
  {
    id: 5,
    title: "Выписка из ЕГРП (право собственности)",
    desc: "Сведения о правах на недвижимое имущество",
    category: "Недвижимость",
    format: "PDF",
    free: false,
  },
  {
    id: 6,
    title: "Справка о доходах (2-НДФЛ)",
    desc: "Официальная справка о доходах физического лица",
    category: "Налоги",
    format: "PDF",
    free: true,
  },
  {
    id: 7,
    title: "Справка из пенсионного фонда",
    desc: "Сведения о пенсионных накоплениях и размере пенсии",
    category: "Пенсия",
    format: "PDF",
    free: true,
  },
  {
    id: 8,
    title: "Свидетельство о рождении (копия)",
    desc: "Заверенная электронная копия свидетельства о рождении",
    category: "ЗАГС",
    format: "PDF",
    free: false,
  },
];

const generatePDF = (title: string) => {
  const content = `
%PDF-1.4
1 0 obj
<< /Type /Catalog /Pages 2 0 R >>
endobj
2 0 obj
<< /Type /Pages /Kids [3 0 R] /Count 1 >>
endobj
3 0 obj
<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842]
/Contents 4 0 R /Resources << /Font << /F1 5 0 R >> >> >>
endobj
4 0 obj
<< /Length 200 >>
stream
BT
/F1 16 Tf
50 800 Td
(Российские услуги) Tj
/F1 12 Tf
0 -30 Td
(${title}) Tj
0 -20 Td
(Дата выдачи: ${new Date().toLocaleDateString("ru-RU")}) Tj
0 -20 Td
(Документ сформирован в электронном виде) Tj
0 -20 Td
(Портал государственных услуг rossuslugi.ru) Tj
ET
endstream
endobj
5 0 obj
<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>
endobj
xref
0 6
0000000000 65535 f 
trailer
<< /Size 6 /Root 1 0 R >>
startxref
%%EOF`;

  const blob = new Blob([content], { type: "application/pdf" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${title.replace(/\s+/g, "_")}.pdf`;
  a.click();
  URL.revokeObjectURL(url);
};

const Documents = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-[#0d47a1] text-white py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-2 text-blue-200 text-sm mb-3">
            <Link to="/" className="hover:text-white">Главная</Link>
            <Icon name="ChevronRight" size={14} />
            <span>Справки и документы</span>
          </div>
          <h1 className="text-3xl font-bold">Справки и документы</h1>
          <p className="text-blue-100 mt-2">Получайте официальные справки в электронном виде (PDF)</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Info banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 flex items-start gap-3">
          <Icon name="Info" size={20} className="text-[#0d47a1] flex-shrink-0 mt-0.5" />
          <div className="text-sm text-blue-800">
            <span className="font-semibold">Электронные документы</span> имеют юридическую силу и принимаются
            государственными органами наравне с бумажными. Для получения некоторых справок требуется авторизация.
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {documents.map((doc) => (
            <div key={doc.id} className="bg-white border border-gray-200 rounded-lg p-5 hover-card-lift">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-red-50 rounded flex items-center justify-center flex-shrink-0">
                  <Icon name="FileText" size={22} className="text-red-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-start gap-2 mb-1">
                    <h3 className="font-semibold text-gray-800 text-sm leading-tight">{doc.title}</h3>
                    <span className="text-xs bg-red-50 text-red-500 border border-red-200 px-1.5 py-0.5 rounded font-medium">
                      {doc.format}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mb-3">{doc.desc}</p>
                  <div className="flex items-center gap-3">
                    <span className="text-xs bg-blue-50 text-[#0d47a1] px-2 py-0.5 rounded">{doc.category}</span>
                    <span className={`text-xs font-medium ${doc.free ? "text-green-600" : "text-gray-500"}`}>
                      {doc.free ? "Бесплатно" : "Платно"}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => generatePDF(doc.title)}
                  className="flex items-center gap-2 bg-[#0d47a1] text-white px-4 py-2 rounded text-sm font-medium hover:bg-[#1565c0] transition-colors"
                >
                  <Icon name="Download" size={14} />
                  Скачать PDF
                </button>
                <Link
                  to="/cabinet"
                  className="flex items-center gap-2 border border-gray-300 text-gray-600 px-4 py-2 rounded text-sm hover:bg-gray-50 transition-colors"
                >
                  <Icon name="Eye" size={14} />
                  Просмотр
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Digital signature info */}
        <div className="mt-8 bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Icon name="Shield" size={18} className="text-[#0d47a1]" />
            Юридическая сила электронных документов
          </h3>
          <div className="grid md:grid-cols-3 gap-6 text-sm">
            {[
              { icon: "CheckCircle", title: "Квалифицированная ЭЦП", desc: "Все документы подписываются квалифицированной электронной подписью уполномоченного органа" },
              { icon: "Scale", title: "Равнозначность с бумажными", desc: "Согласно ФЗ-63, электронные документы имеют ту же юридическую силу, что и бумажные" },
              { icon: "Lock", title: "Защита от подделки", desc: "Документы защищены криптографической подписью и проверяются онлайн" },
            ].map((item) => (
              <div key={item.title} className="flex items-start gap-3">
                <Icon name={item.icon} size={20} className="text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-gray-800 mb-1">{item.title}</div>
                  <div className="text-gray-500">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Documents;
