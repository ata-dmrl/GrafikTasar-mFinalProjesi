import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const topicsData = [
  // Level 0 - Root
  { slug: 'js-temelleri', title: 'JavaScript Temelleri', titleEn: 'JavaScript Fundamentals', description: 'Değişkenler, veri tipleri, fonksiyonlar ve modern JS (ES6+) sözdizimi', level: 0, parentSlug: null, lessonPoints: 10, quizPoints: 20, order: 1, icon: '🟨', color: '#F7DF1E', estimatedMin: 25 },
  // Level 1
  { slug: 'js-kontrol-akisi', title: 'JS Kontrol Akışı', titleEn: 'JS Control Flow', description: 'Koşullar, döngüler, diziler ve objelerin modern kullanımı', level: 1, parentSlug: 'js-temelleri', lessonPoints: 10, quizPoints: 20, order: 1, icon: '🔀', color: '#F0A500', estimatedMin: 25 },
  { slug: 'react-giris', title: "React'e Giriş", titleEn: 'Introduction to React', description: 'React nedir, JSX sözdizimi, component yapısı ve Virtual DOM', level: 1, parentSlug: 'js-temelleri', lessonPoints: 15, quizPoints: 25, order: 2, icon: '⚛️', color: '#61DAFB', estimatedMin: 30 },
  // Level 2
  { slug: 'props', title: 'Props', titleEn: 'Props', description: 'Component\'ler arası veri aktarımı, prop tipleri ve default props', level: 2, parentSlug: 'react-giris', lessonPoints: 15, quizPoints: 25, order: 1, icon: '📦', color: '#00D8FF', estimatedMin: 25 },
  { slug: 'state-yonetimi', title: 'State Yönetimi', titleEn: 'State Management', description: 'React\'te state kavramı, neden önemlidir ve temel kullanım prensipleri', level: 2, parentSlug: 'react-giris', lessonPoints: 15, quizPoints: 25, order: 2, icon: '🔄', color: '#7C4DFF', estimatedMin: 25 },
  // Level 3
  { slug: 'usestate', title: 'useState', titleEn: 'useState Hook', description: 'useState hook ile fonksiyonel componentlerde state yönetimi', level: 3, parentSlug: 'props', lessonPoints: 15, quizPoints: 25, order: 1, icon: '🪝', color: '#FF4081', estimatedMin: 30 },
  { slug: 'useeffect', title: 'useEffect', titleEn: 'useEffect Hook', description: 'Side effect yönetimi, dependency array ve cleanup fonksiyonları', level: 3, parentSlug: 'state-yonetimi', lessonPoints: 15, quizPoints: 25, order: 1, icon: '⚡', color: '#00E676', estimatedMin: 35 },
  { slug: 'useref', title: 'useRef', titleEn: 'useRef Hook', description: 'DOM referansları, render\'ı tetiklemeyen değer saklama', level: 3, parentSlug: 'state-yonetimi', lessonPoints: 15, quizPoints: 25, order: 2, icon: '📌', color: '#FF9100', estimatedMin: 25 },
  // Level 4
  { slug: 'usecontext', title: 'useContext', titleEn: 'useContext Hook', description: 'Context API ile global state yönetimi ve prop drilling\'den kaçınma', level: 4, parentSlug: 'usestate', lessonPoints: 20, quizPoints: 30, order: 1, icon: '🌐', color: '#69F0AE', estimatedMin: 35 },
  { slug: 'usereducer', title: 'useReducer', titleEn: 'useReducer Hook', description: 'Karmaşık state mantığı için useReducer, action ve reducer pattern', level: 4, parentSlug: 'useeffect', lessonPoints: 20, quizPoints: 30, order: 1, icon: '⚙️', color: '#40C4FF', estimatedMin: 35 },
  { slug: 'usememo-usecallback', title: 'useMemo & useCallback', titleEn: 'useMemo & useCallback', description: 'Performans optimizasyonu için memoization teknikleri', level: 4, parentSlug: 'useref', lessonPoints: 20, quizPoints: 30, order: 1, icon: '🚀', color: '#EA80FC', estimatedMin: 35 },
  // Level 5
  { slug: 'uselayouteffect', title: 'useLayoutEffect', titleEn: 'useLayoutEffect Hook', description: 'DOM mutasyonlarından önce çalışan senkron efektler', level: 5, parentSlug: 'usecontext', lessonPoints: 20, quizPoints: 30, order: 1, icon: '🖼️', color: '#FFD740', estimatedMin: 30 },
  { slug: 'useimperativehandle', title: 'useImperativeHandle', titleEn: 'useImperativeHandle Hook', description: 'forwardRef ile parent\'a açılan özel API, imperative DOM kontrolü', level: 5, parentSlug: 'usereducer', lessonPoints: 20, quizPoints: 30, order: 1, icon: '🎮', color: '#FF6E40', estimatedMin: 30 },
  { slug: 'custom-hooks', title: 'Custom Hooks', titleEn: 'Custom Hooks', description: 'Yeniden kullanılabilir logic için özel hook yazmak', level: 5, parentSlug: 'usememo-usecallback', lessonPoints: 20, quizPoints: 30, order: 1, icon: '🔧', color: '#18FFFF', estimatedMin: 35 },
  // Level 6
  { slug: 'react-router', title: 'React Router', titleEn: 'React Router', description: 'SPA routing, nested routes, URL parametreleri ve navigation', level: 6, parentSlug: 'uselayouteffect', lessonPoints: 25, quizPoints: 35, order: 1, icon: '🗺️', color: '#CA4245', estimatedMin: 40 },
  { slug: 'react-hook-form', title: 'React Hook Form', titleEn: 'React Hook Form', description: 'Performanslı form yönetimi, register, handleSubmit ve validation', level: 6, parentSlug: 'useimperativehandle', lessonPoints: 25, quizPoints: 35, order: 1, icon: '📋', color: '#EC5990', estimatedMin: 40 },
  { slug: 'yup-validasyon', title: 'Yup Validasyon', titleEn: 'Yup Validation', description: 'Schema tabanlı form doğrulama ve React Hook Form entegrasyonu', level: 6, parentSlug: 'custom-hooks', lessonPoints: 25, quizPoints: 35, order: 2, icon: '✅', color: '#4CAF50', estimatedMin: 35 },
  { slug: 'axios-veri-cekme', title: 'Axios ile Veri Çekme', titleEn: 'Data Fetching with Axios', description: 'HTTP istekleri, interceptor, hata yönetimi ve loading state', level: 6, parentSlug: 'react-router', lessonPoints: 25, quizPoints: 35, order: 2, icon: '🌐', color: '#5A29E4', estimatedMin: 40 },
  { slug: 'react-query', title: 'React Query', titleEn: 'React Query (TanStack)', description: 'Server state yönetimi, caching, refetching ve optimistic updates', level: 6, parentSlug: 'axios-veri-cekme', lessonPoints: 30, quizPoints: 40, order: 1, icon: '⚡', color: '#FF4154', estimatedMin: 45 },
  { slug: 'redux', title: 'Redux Toolkit', titleEn: 'Redux Toolkit', description: 'Global state yönetimi, slice, createAsyncThunk ve RTK Query', level: 6, parentSlug: 'useimperativehandle', lessonPoints: 30, quizPoints: 40, order: 2, icon: '🏪', color: '#764ABC', estimatedMin: 50 },
];

const quizData: Record<string, Array<{text: string; type: string; options?: string[]; answer: string; explanation: string; order: number}>> = {
  'js-temelleri': [
    { text: 'let ve const arasındaki temel fark nedir?', type: 'multiple_choice', options: ['İkisi de aynı işlevi görür', 'let yeniden atanabilir, const atandıktan sonra değiştirilemez', 'const daha hızlıdır', 'let sadece fonksiyon içinde kullanılır'], answer: 'let yeniden atanabilir, const atandıktan sonra değiştirilemez', explanation: 'const ile tanımlanan değişkene tekrar atama yapılamaz; let ile yapılabilir. İkisi de block scope\'a sahiptir.', order: 1 },
    { text: 'Arrow function sözdizimi hangisidir?', type: 'multiple_choice', options: ['function() {}', '() => {}', 'fn() {}', '=> function {}'], answer: '() => {}', explanation: 'Arrow function ES6 ile gelen kısa fonksiyon yazım şeklidir: (parametre) => { gövde }', order: 2 },
    { text: 'typeof null ifadesi ne döndürür?', type: 'multiple_choice', options: ['"null"', '"undefined"', '"object"', '"boolean"'], answer: '"object"', explanation: 'JavaScript\'te typeof null === "object" döner. Bu tarihsel bir hatadır ama geriye dönük uyumluluk için korunmaktadır.', order: 3 },
    { text: 'Template literal kullanımı doğru mu? `Merhaba ${isim}`', type: 'true_false', options: ['Doğru', 'Yanlış'], answer: 'Doğru', explanation: 'Template literal backtick (`) ile yazılır ve ${} içinde ifade kullanılabilir.', order: 4 },
    { text: 'Destructuring assignment nedir?', type: 'multiple_choice', options: ['Değişken silme', 'Dizi/obje değerlerini değişkenlere atama', 'Fonksiyon çağırma', 'Döngü oluşturma'], answer: 'Dizi/obje değerlerini değişkenlere atama', explanation: 'const { ad, yas } = obje; veya const [a, b] = dizi; şeklinde kullanılır.', order: 5 },
  ],
  'js-kontrol-akisi': [
    { text: '[] == false ifadesi ne döndürür?', type: 'multiple_choice', options: ['false', 'true', 'undefined', 'TypeError'], answer: 'true', explanation: 'Gevşek eşitlikte boş dizi false\'a dönüştürülür, bu yüzden true döner. Kesin eşitlik (===) kullanmak daha güvenlidir.', order: 1 },
    { text: 'Array.map() metodunun döndürdüğü nedir?', type: 'multiple_choice', options: ['Orijinal diziyi değiştirir', 'undefined', 'Yeni bir dizi', 'Boolean'], answer: 'Yeni bir dizi', explanation: 'map() her elemana callback uygular ve yeni bir dizi döndürür. Orijinal dizi değişmez.', order: 2 },
    { text: 'Array.filter() metodu neyi yapar?', type: 'multiple_choice', options: ['Diziyi sıralar', 'Koşulu sağlayanları yeni diziye alır', 'Elemanları dönüştürür', 'Diziyi birleştirir'], answer: 'Koşulu sağlayanları yeni diziye alır', explanation: 'filter(fn) true döndüren elemanları yeni diziye alır: [1,2,3].filter(x => x > 1) → [2,3]', order: 3 },
    { text: 'Spread operatörü (...) dizileri kopyalamak için kullanılabilir.', type: 'true_false', options: ['Doğru', 'Yanlış'], answer: 'Doğru', explanation: 'const kopya = [...orijinal]; şeklinde shallow copy oluşturulur.', order: 4 },
    { text: 'Optional chaining (?.) ne işe yarar?', type: 'multiple_choice', options: ['Şartlı atama yapar', 'null/undefined\'da hata fırlatmadan özelliğe erişir', 'Değer karşılaştırır', 'Fonksiyon çağırır'], answer: 'null/undefined\'da hata fırlatmadan özelliğe erişir', explanation: 'obj?.prop?.subProp: obj null ise undefined döner, TypeError fırlatmaz.', order: 5 },
  ],
  'react-giris': [
    { text: 'JSX nedir?', type: 'multiple_choice', options: ['Yeni bir programlama dili', 'JavaScript içinde HTML benzeri sözdizimi', 'CSS kütüphanesi', 'Veritabanı sorgu dili'], answer: 'JavaScript içinde HTML benzeri sözdizimi', explanation: 'JSX, JavaScript\'in içinde HTML benzeri yazım sağlar; Babel tarafından React.createElement() çağrılarına derlenir.', order: 1 },
    { text: 'Virtual DOM\'un amacı nedir?', type: 'multiple_choice', options: ['Gerçek DOM\'u yedeklemek', 'DOM güncellemelerini optimize etmek', 'CSS stillerini uygulamak', 'HTTP istekleri göndermek'], answer: 'DOM güncellemelerini optimize etmek', explanation: 'Virtual DOM, gerçek DOM\'dan önce değişiklikleri hesaplar; sadece farklı kısımları günceller (reconciliation).', order: 2 },
    { text: 'React component isimleri büyük harfle başlamalıdır.', type: 'true_false', options: ['Doğru', 'Yanlış'], answer: 'Doğru', explanation: 'React, büyük harfle başlayanları custom component, küçük harfle başlayanları HTML elementi olarak ayırt eder.', order: 3 },
    { text: 'Fonksiyonel component neyi döndürmelidir?', type: 'multiple_choice', options: ['String', 'JSX veya null', 'Number', 'Array zorunlu'], answer: 'JSX veya null', explanation: 'Fonksiyonel component JSX (ReactElement), null, ya da bir dizi döndürebilir.', order: 4 },
    { text: 'JSX\'te CSS class yerine hangi attribute kullanılır?', type: 'multiple_choice', options: ['class', 'className', 'cssClass', 'style'], answer: 'className', explanation: 'class JavaScript\'te reserved keyword olduğundan JSX\'te className kullanılır.', order: 5 },
  ],
  'props': [
    { text: 'Props nedir?', type: 'multiple_choice', options: ['Component\'in iç state\'i', 'Parent\'tan child\'a geçilen veriler', 'Global değişkenler', 'CSS özellikleri'], answer: 'Parent\'tan child\'a geçilen veriler', explanation: 'Props (properties), parent component\'in child component\'e dışarıdan geçtiği salt okunur verilerdir.', order: 1 },
    { text: 'Props\'lar child component içinde değiştirilebilir mi?', type: 'true_false', options: ['Doğru', 'Yanlış'], answer: 'Yanlış', explanation: 'Props immutable (değiştirilemez) dir. Child, aldığı props\'u değiştiremez; sadece kullanabilir.', order: 2 },
    { text: 'Children prop ne işe yarar?', type: 'multiple_choice', options: ['Alt component listesi', 'Açılış ve kapanış tagları arasındaki içerik', 'Event handler', 'CSS sınıfı'], answer: 'Açılış ve kapanış tagları arasındaki içerik', explanation: '<Card><p>İçerik</p></Card> kullanımında <p>İçerik</p> Card\'ın props.children\'ı olur.', order: 3 },
    { text: 'PropTypes kütüphanesi ne için kullanılır?', type: 'multiple_choice', options: ['CSS doğrulama', 'Props tip kontrolü', 'State yönetimi', 'Routing'], answer: 'Props tip kontrolü', explanation: 'PropTypes, geliştirme ortamında props\'ların beklenen tiplere uyup uymadığını kontrol eder.', order: 4 },
    { text: 'Default props nasıl tanımlanır?', type: 'multiple_choice', options: ['component.default = {}', 'component.defaultProps = {}', 'props.default = {}', 'useDefault()'], answer: 'component.defaultProps = {}', explanation: 'MyComp.defaultProps = { renk: "mavi" }; veya fonksiyon parametresinde varsayılan değer kullanılır.', order: 5 },
  ],
  'state-yonetimi': [
    { text: 'State nedir?', type: 'multiple_choice', options: ['Statik veri', 'Component\'in değişebilen iç verisi', 'URL parametresi', 'CSS değişkeni'], answer: 'Component\'in değişebilen iç verisi', explanation: 'State, component\'in zamanla değişebilen ve değiştiğinde render\'ı tetikleyen iç verisidir.', order: 1 },
    { text: 'State değiştirmek için setState/setX fonksiyonu yerine doğrudan değiştirmek ne sonuç doğurur?', type: 'multiple_choice', options: ['Hızlı güncelleme', 'Re-render tetiklenmez', 'Hata fırlatır', 'State sıfırlanır'], answer: 'Re-render tetiklenmez', explanation: 'State\'i doğrudan değiştirmek React\'in state değişikliğini fark etmesini engeller, UI güncellenmez.', order: 2 },
    { text: 'State güncellemeleri senkron mudur?', type: 'true_false', options: ['Doğru', 'Yanlış'], answer: 'Yanlış', explanation: 'React state güncellemeleri asenkron olabilir; React 18\'de batching ile gruplandırılır.', order: 3 },
    { text: 'Props ile State arasındaki fark nedir?', type: 'multiple_choice', options: ['Fark yoktur', 'Props dışarıdan gelir, State içeride yönetilir', 'State dışarıdan gelir, Props içeride yönetilir', 'İkisi de global'], answer: 'Props dışarıdan gelir, State içeride yönetilir', explanation: 'Props parent\'tan gelir ve immutable\'dır; State component içinde tanımlanır ve setter ile değiştirilir.', order: 4 },
    { text: 'Hangi durum State kullanımına örnek değildir?', type: 'multiple_choice', options: ['Form input değeri', 'Modal açık/kapalı', 'API\'dan gelen veri', 'Sabit metin içeriği'], answer: 'Sabit metin içeriği', explanation: 'Sabit metin değişmediği için state gerektirmez. State yalnızca değişecek veriler için kullanılmalıdır.', order: 5 },
  ],
  'usestate': [
    { text: 'useState\'in döndürdüğü nedir?', type: 'multiple_choice', options: ['Sadece state değeri', 'Sadece setter fonksiyon', '[state, setter] çifti', 'Obje'], answer: '[state, setter] çifti', explanation: 'const [sayi, setSayi] = useState(0); şeklinde array destructuring ile kullanılır.', order: 1 },
    { text: 'useState ile array state güncellenirken ne yapılmalıdır?', type: 'multiple_choice', options: ['push() ile ekleme', 'Yeni dizi oluşturarak set etme', 'Doğrudan indeks atama', 'splice() kullanma'], answer: 'Yeni dizi oluşturarak set etme', explanation: 'setItems([...items, yeniEleman]) gibi yeni dizi oluşturulmalıdır; push() React\'i tetiklemez.', order: 2 },
    { text: 'State güncelleme fonksiyonuna callback geçmek ne zaman gereklidir?', type: 'multiple_choice', options: ['Hiçbir zaman', 'Önceki state\'e bağlı güncellemelerde', 'Sadece string state için', 'Her zaman'], answer: 'Önceki state\'e bağlı güncellemelerde', explanation: 'setCount(prev => prev + 1) şeklinde fonksiyon geçmek, state\'in güncel değerini garantiler.', order: 3 },
    { text: 'useState\'in başlangıç değeri her render\'da yeniden hesaplanır.', type: 'true_false', options: ['Doğru', 'Yanlış'], answer: 'Yanlış', explanation: 'Başlangıç değeri yalnızca ilk render\'da kullanılır. Pahalı hesaplamalar için lazy initialization (fonksiyon geçme) kullanılır.', order: 4 },
    { text: 'Obje state güncellenirken spread kullanılmazsa ne olur?', type: 'multiple_choice', options: ['Hata verir', 'Diğer alanlar kaybolur', 'Tüm alanlar güncellenir', 'State değişmez'], answer: 'Diğer alanlar kaybolur', explanation: 'setState({ ...prev, yeniAlan: değer }) yapılmalıdır; aksi hâlde sadece yeniAlan kalır, diğerleri silinir.', order: 5 },
  ],
  'useeffect': [
    { text: 'useEffect\'in dependency array\'i boş bırakılırsa ne olur?', type: 'multiple_choice', options: ['Her render\'da çalışır', 'Hiç çalışmaz', 'Sadece ilk render\'da çalışır', 'Hata verir'], answer: 'Sadece ilk render\'da çalışır', explanation: 'useEffect(() => {}, []) dependency dizisi boş olduğunda componentDidMount gibi yalnızca bir kez çalışır.', order: 1 },
    { text: 'Cleanup fonksiyonu ne zaman çalışır?', type: 'multiple_choice', options: ['İlk render\'da', 'Component unmount olduğunda veya effect yeniden çalışmadan önce', 'Sadece unmount\'ta', 'Her state değişikliğinde'], answer: 'Component unmount olduğunda veya effect yeniden çalışmadan önce', explanation: 'return () => {} şeklinde döndürülen cleanup fonksiyonu unmount\'ta ve bir sonraki effect çalışmadan önce temizlik yapar.', order: 2 },
    { text: 'useEffect dependency array\'i olmadan kullanılırsa ne olur?', type: 'multiple_choice', options: ['Sadece bir kez çalışır', 'Her render\'dan sonra çalışır', 'Hiç çalışmaz', 'Derleme hatası'], answer: 'Her render\'dan sonra çalışır', explanation: 'Dependency dizisi belirtilmezse useEffect her render\'dan sonra çalışır.', order: 3 },
    { text: 'useEffect içinde async/await doğrudan kullanılabilir.', type: 'true_false', options: ['Doğru', 'Yanlış'], answer: 'Yanlış', explanation: 'useEffect callback\'i async olamaz. İçinde ayrı bir async fonksiyon tanımlanıp çağrılmalıdır.', order: 4 },
    { text: 'useEffect hangi lifecycle metodlarına benzer?', type: 'multiple_choice', options: ['constructor ve render', 'componentDidMount, componentDidUpdate, componentWillUnmount', 'shouldComponentUpdate', 'getDerivedStateFromProps'], answer: 'componentDidMount, componentDidUpdate, componentWillUnmount', explanation: 'useEffect, dependency array\'e göre bu üç lifecycle metodunu birleşik olarak karşılar.', order: 5 },
  ],
  'useref': [
    { text: 'useRef ne döndürür?', type: 'multiple_choice', options: ['State ve setter', 'current özelliği olan bir obje', 'DOM elementi', 'Boolean'], answer: 'current özelliği olan bir obje', explanation: 'useRef({ current: başlangıçDeğeri }) döndürür. ref.current üzerinden değere erişilir.', order: 1 },
    { text: 'ref.current değiştirildiğinde component yeniden render edilir mi?', type: 'true_false', options: ['Doğru', 'Yanlış'], answer: 'Yanlış', explanation: 'useRef güncellemeleri re-render tetiklemez. Bu, render\'ı tetiklemeden değer saklamak için idealdir.', order: 2 },
    { text: 'useRef\'in DOM erişimi için kullanımı nasıldır?', type: 'multiple_choice', options: ['document.getElementById() ile', '<div ref={myRef}> şeklinde', 'props.ref ile', 'state içinde saklanarak'], answer: '<div ref={myRef}> şeklinde', explanation: 'const ref = useRef(null); ardından <input ref={ref} /> ile DOM elementine ref bağlanır.', order: 3 },
    { text: 'useRef hangi durum için uygundur?', type: 'multiple_choice', options: ['Form state\'i tutmak', 'Timer ID veya önceki değer saklamak', 'API yanıtı saklamak', 'Context oluşturmak'], answer: 'Timer ID veya önceki değer saklamak', explanation: 'setTimeout ID\'si veya önceki prop değeri gibi render\'ı tetiklemeden saklanacak değerler için idealdir.', order: 4 },
    { text: 'forwardRef ne işe yarar?', type: 'multiple_choice', options: ['Props iletmek', 'Child component\'in DOM\'una parent\'tan ref erişimi sağlamak', 'State paylaşmak', 'Event yakalamak'], answer: 'Child component\'in DOM\'una parent\'tan ref erişimi sağlamak', explanation: 'forwardRef, parent\'ın ref.current aracılığıyla child\'ın içindeki DOM elementine erişmesini sağlar.', order: 5 },
  ],
  'usecontext': [
    { text: 'Context API\'nın çözdüğü temel sorun nedir?', type: 'multiple_choice', options: ['Asenkron işlemler', 'Prop drilling (props\'ları derinlere taşıma)', 'CSS stilleme', 'Routing'], answer: 'Prop drilling (props\'ları derinlere taşıma)', explanation: 'Context, ara component\'lere props geçmeden derin component\'lere veri iletmeyi sağlar.', order: 1 },
    { text: 'Context oluşturmak için hangi fonksiyon kullanılır?', type: 'multiple_choice', options: ['createContext()', 'newContext()', 'useContext()', 'Context()'], answer: 'createContext()', explanation: 'const MyContext = React.createContext(defaultValue); ile context oluşturulur.', order: 2 },
    { text: 'useContext hook\'u Provider olmadan çalışır ve default değeri döndürür.', type: 'true_false', options: ['Doğru', 'Yanlış'], answer: 'Doğru', explanation: 'createContext\'e verilen default değer, Provider olmadığında döner. Ancak genellikle Provider kullanılması önerilir.', order: 3 },
    { text: 'Context değeri değiştiğinde ne olur?', type: 'multiple_choice', options: ['Hiçbir şey olmaz', 'Sadece Provider yeniden render edilir', 'useContext kullanan tüm component\'ler re-render olur', 'Uygulama kapanır'], answer: 'useContext kullanan tüm component\'ler re-render olur', explanation: 'Context değeri değiştiğinde o context\'i tüketen tüm consumer\'lar otomatik olarak yeniden render edilir.', order: 4 },
    { text: 'Context ne zaman kullanılmamalıdır?', type: 'multiple_choice', options: ['Tema bilgisi için', 'Dil ayarı için', 'Sık değişen performans kritik veriler için', 'Kullanıcı bilgisi için'], answer: 'Sık değişen performans kritik veriler için', explanation: 'Sık güncellenen veriler tüm consumer\'ları re-render eder. Bu durumda Zustand/Redux gibi araçlar daha uygundur.', order: 5 },
  ],
  'usereducer': [
    { text: 'useReducer ne zaman useState\'e tercih edilir?', type: 'multiple_choice', options: ['Her zaman', 'Basit boolean state için', 'Birbiriyle ilişkili karmaşık state mantığında', 'Sadece string state için'], answer: 'Birbiriyle ilişkili karmaşık state mantığında', explanation: 'Birden fazla alt state değeri olan veya karmaşık güncelleme mantığı gerektiren durumlarda useReducer daha okunabilirdir.', order: 1 },
    { text: 'Reducer fonksiyonu ne döndürmelidir?', type: 'multiple_choice', options: ['void', 'Yeni state', 'Action objesi', 'Boolean'], answer: 'Yeni state', explanation: 'Reducer (state, action) => newState şeklindedir; mevcut state\'i mutate etmeden yeni state döndürmelidir.', order: 2 },
    { text: 'dispatch fonksiyonu neyi parametre alır?', type: 'multiple_choice', options: ['State değeri', 'Action objesi', 'Callback fonksiyon', 'Boolean'], answer: 'Action objesi', explanation: 'dispatch({ type: "ARTTIR", payload: 1 }) şeklinde action objesi gönderilir; reducer bu action\'a göre yeni state üretir.', order: 3 },
    { text: 'useReducer, Redux\'un temel mantığını paylaşır.', type: 'true_false', options: ['Doğru', 'Yanlış'], answer: 'Doğru', explanation: 'Her ikisi de reducer ve action pattern kullanır; Redux bunun üzerine middleware ve DevTools gibi özellikler ekler.', order: 4 },
    { text: 'useReducer\'ın ilk argümanı nedir?', type: 'multiple_choice', options: ['Initial state', 'Reducer fonksiyonu', 'Action', 'Dispatch'], answer: 'Reducer fonksiyonu', explanation: 'const [state, dispatch] = useReducer(reducerFn, initialState); — ilk argüman reducer fonksiyonudur.', order: 5 },
  ],
  'usememo-usecallback': [
    { text: 'useMemo ne zaman kullanılır?', type: 'multiple_choice', options: ['Her hesaplamada', 'Pahalı hesaplama sonuçlarını memoize etmek için', 'DOM güncellemelerinde', 'State tanımlamak için'], answer: 'Pahalı hesaplama sonuçlarını memoize etmek için', explanation: 'useMemo(fn, deps), deps değişmediği sürece hesaplamayı önbelleğe alır; gereksiz tekrar hesaplamayı önler.', order: 1 },
    { text: 'useCallback ne döndürür?', type: 'multiple_choice', options: ['Fonksiyonun sonucu', 'Memoize edilmiş fonksiyon referansı', 'State değeri', 'Boolean'], answer: 'Memoize edilmiş fonksiyon referansı', explanation: 'useCallback(fn, deps), deps değişmediği sürece aynı fonksiyon referansını korur; child component\'lerin gereksiz render\'ını önler.', order: 2 },
    { text: 'useMemo ve useCallback\'in farkı nedir?', type: 'multiple_choice', options: ['Fark yoktur', 'useMemo değer, useCallback fonksiyon döndürür', 'useCallback değer, useMemo fonksiyon döndürür', 'useMemo async çalışır'], answer: 'useMemo değer, useCallback fonksiyon döndürür', explanation: 'useMemo hesaplama sonucunu, useCallback fonksiyonu memoize eder. useCallback(fn, deps) === useMemo(() => fn, deps)', order: 3 },
    { text: 'Her fonksiyonu useCallback ile sarmak performansı artırır.', type: 'true_false', options: ['Doğru', 'Yanlış'], answer: 'Yanlış', explanation: 'useCallback\'in kendisi de maliyet taşır. Sadece React.memo kullanılan child\'a geçilen prop fonksiyonlarında veya useEffect dep\'lerinde gerçekten faydalıdır.', order: 4 },
    { text: 'React.memo ne işe yarar?', type: 'multiple_choice', options: ['State\'i memoize eder', 'Props değişmediğinde component\'in yeniden render\'ını önler', 'Context\'i önbelleğe alır', 'Event\'leri sıraya koyar'], answer: 'Props değişmediğinde component\'in yeniden render\'ını önler', explanation: 'React.memo ile sarılan component, props shallow equal olduğu sürece yeniden render edilmez.', order: 5 },
  ],
  'uselayouteffect': [
    { text: 'useLayoutEffect ile useEffect arasındaki temel fark nedir?', type: 'multiple_choice', options: ['useLayoutEffect asenkron çalışır', 'useLayoutEffect DOM güncellendikten hemen sonra senkron çalışır', 'useLayoutEffect sadece server\'da çalışır', 'Fark yoktur'], answer: 'useLayoutEffect DOM güncellendikten hemen sonra senkron çalışır', explanation: 'useLayoutEffect, tarayıcı ekranı boyamadan önce senkron çalışır. DOM ölçümü ve anlık düzeltmeler için kullanılır.', order: 1 },
    { text: 'useLayoutEffect ne zaman tercih edilmelidir?', type: 'multiple_choice', options: ['Her zaman useEffect yerine', 'DOM ölçümü gerektiren durumlarda', 'API istekleri için', 'State güncellemeleri için'], answer: 'DOM ölçümü gerektiren durumlarda', explanation: 'getBoundingClientRect() gibi DOM ölçümleri ve anlık stil değişiklikleri için useLayoutEffect, diğer durumlar için useEffect kullanılır.', order: 2 },
    { text: 'useLayoutEffect sunucu tarafı render (SSR) ile sorunsuz çalışır.', type: 'true_false', options: ['Doğru', 'Yanlış'], answer: 'Yanlış', explanation: 'useLayoutEffect SSR\'da uyarı verir çünkü sunucuda DOM yoktur. SSR projelerinde useEffect tercih edilmelidir.', order: 3 },
    { text: 'useLayoutEffect\'in çalışma sırası nedir?', type: 'multiple_choice', options: ['Render → useEffect → useLayoutEffect', 'Render → useLayoutEffect → Paint → useEffect', 'useLayoutEffect → Render → useEffect', 'Render → Paint → useLayoutEffect'], answer: 'Render → useLayoutEffect → Paint → useEffect', explanation: 'React render eder → DOM günceller → useLayoutEffect çalışır → tarayıcı boyar → useEffect çalışır.', order: 4 },
    { text: 'useLayoutEffect performans açısından useEffect\'ten daha mı iyidir?', type: 'multiple_choice', options: ['Evet, her zaman', 'Hayır, senkron olduğu için render\'ı bloklar', 'Aynıdır', 'Bağıma göre değişir'], answer: 'Hayır, senkron olduğu için render\'ı bloklar', explanation: 'useLayoutEffect senkron çalıştığı için tarayıcıyı bloklar. Gereksiz kullanım performans sorununa yol açar.', order: 5 },
  ],
  'useimperativehandle': [
    { text: 'useImperativeHandle ne işe yarar?', type: 'multiple_choice', options: ['Props geçişini kolaylaştırır', 'Parent\'a özel bir API açar, tam ref erişimini sınırlar', 'State yönetimi sağlar', 'DOM\'u siler'], answer: 'Parent\'a özel bir API açar, tam ref erişimini sınırlar', explanation: 'useImperativeHandle, forwardRef ile kullanılır ve parent\'ın göreceği ref.current değerini özelleştirir.', order: 1 },
    { text: 'useImperativeHandle hangi hook ile birlikte kullanılır?', type: 'multiple_choice', options: ['useState', 'useEffect', 'forwardRef', 'useContext'], answer: 'forwardRef', explanation: 'useImperativeHandle yalnızca forwardRef ile sarılmış component\'lerde anlamlıdır; ref parametresi buradan gelir.', order: 2 },
    { text: 'useImperativeHandle kullanmak her zaman önerilir.', type: 'true_false', options: ['Doğru', 'Yanlış'], answer: 'Yanlış', explanation: 'Imperative yaklaşım React\'in deklaratif felsefesine aykırıdır; yalnızca focus, scroll, animasyon gibi gerçekten gerekli durumlarda kullanılmalıdır.', order: 3 },
    { text: 'useImperativeHandle\'ın döndürdüğü obje neyi temsil eder?', type: 'multiple_choice', options: ['Component state\'ini', 'ref.current olarak parent\'a açılan API\'ı', 'DOM elementini', 'Props\'ları'], answer: 'ref.current olarak parent\'a açılan API\'ı', explanation: 'useImperativeHandle(ref, () => ({ focus, reset })) ile parent ref.current.focus() çağırabilir hale gelir.', order: 4 },
    { text: 'Hangi durum useImperativeHandle için uygun bir kullanım örneğidir?', type: 'multiple_choice', options: ['API isteği', 'Özel input component\'inde focus metodunu açmak', 'Context oluşturmak', 'State sıfırlamak'], answer: 'Özel input component\'inde focus metodunu açmak', explanation: 'Özel bir input component\'inin parent tarafından focus() edilmesi, useImperativeHandle\'ın klasik kullanım senaryosudur.', order: 5 },
  ],
  'custom-hooks': [
    { text: 'Custom hook isimlendirme kuralı nedir?', type: 'multiple_choice', options: ['hook ile başlamalı', 'use ile başlamalı', 'custom ile başlamalı', 'büyük harfle başlamalı'], answer: 'use ile başlamalı', explanation: 'Custom hook\'lar use ile başlamalıdır (örn. useFetch, useForm). Bu, React\'in hook kurallarını uygulayabilmesini sağlar.', order: 1 },
    { text: 'Custom hook\'lar başka hook\'ları çağırabilir mi?', type: 'true_false', options: ['Doğru', 'Yanlış'], answer: 'Doğru', explanation: 'Custom hook\'ların amacı hook\'ları yeniden kullanılabilir fonksiyonlara sarmalamaktır; içinde useState, useEffect vb. kullanılabilir.', order: 2 },
    { text: 'Custom hook kullanmanın temel avantajı nedir?', type: 'multiple_choice', options: ['Performans artışı', 'Stateful logic\'i component\'ler arasında yeniden kullanmak', 'Daha az kod yazmak', 'Derleme hızını artırmak'], answer: 'Stateful logic\'i component\'ler arasında yeniden kullanmak', explanation: 'Custom hook, birden fazla component\'te kullanılan state mantığını (örn. form state, fetch durumu) tek yerde toplar.', order: 3 },
    { text: 'Custom hook\'tan döndürülen state, hook\'u kullanan her component için bağımsızdır.', type: 'true_false', options: ['Doğru', 'Yanlış'], answer: 'Doğru', explanation: 'Her hook çağrısı bağımsız state oluşturur; iki component aynı hook\'u kullansa da state\'leri birbirinden ayrıdır.', order: 4 },
    { text: 'useFetch adlı custom hook neyi döndürmesi beklenir?', type: 'multiple_choice', options: ['Sadece data', 'Sadece loading', 'data, loading ve error', 'fetch fonksiyonu'], answer: 'data, loading ve error', explanation: 'Tipik bir useFetch hook\'u { data, loading, error } döndürür; çağıran component bu değerlere göre UI render eder.', order: 5 },
  ],
  'react-router': [
    { text: 'React Router\'da <BrowserRouter> ne işe yarar?', type: 'multiple_choice', options: ['API istekleri yapar', 'URL tabanlı routing için gerekli context sağlar', 'CSS stilleri ekler', 'State yönetir'], answer: 'URL tabanlı routing için gerekli context sağlar', explanation: '<BrowserRouter>, HTML5 history API kullanarak React Router\'ın çalışması için gerekli context\'i sağlar.', order: 1 },
    { text: '<Link> ile <a> tagının farkı nedir?', type: 'multiple_choice', options: ['Fark yoktur', '<Link> sayfayı yeniden yüklemeden navigasyon yapar', '<a> daha hızlıdır', '<Link> sadece iç linkler için'], answer: '<Link> sayfayı yeniden yüklemeden navigasyon yapar', explanation: '<Link>, SPA navigasyon yaparak tam sayfa yenilenmesini önler; <a> tag\'i sayfayı yeniden yükler.', order: 2 },
    { text: 'useParams hook\'u neyi döndürür?', type: 'multiple_choice', options: ['Query string parametreleri', 'URL\'deki dinamik route parametrelerini', 'Form verilerini', 'State değerini'], answer: 'URL\'deki dinamik route parametrelerini', explanation: '/urun/:id rotasında useParams().id ile dinamik id parametresine erişilir.', order: 3 },
    { text: '<Navigate> component\'i ne işe yarar?', type: 'multiple_choice', options: ['Link oluşturur', 'Programatik yönlendirme yapar', 'Route tanımlar', 'History siler'], answer: 'Programatik yönlendirme yapar', explanation: '<Navigate to="/giris" /> render edildiğinde kullanıcıyı belirtilen rotaya yönlendirir; genellikle korumalı route\'larda kullanılır.', order: 4 },
    { text: 'Nested (iç içe) route\'larda <Outlet> ne işe yarar?', type: 'multiple_choice', options: ['Route siler', 'Child route\'ların render edileceği yeri belirtir', 'Link oluşturur', 'Parametreleri okur'], answer: 'Child route\'ların render edileceği yeri belirtir', explanation: '<Outlet />, parent layout component\'ine child route\'ların nerede render edileceğini söyler.', order: 5 },
  ],
  'react-hook-form': [
    { text: 'React Hook Form\'un temel avantajı nedir?', type: 'multiple_choice', options: ['Daha fazla re-render', 'Kontrollü state ile çalışma', 'Uncontrolled input ile az re-render ve yüksek performans', 'Otomatik API entegrasyonu'], answer: 'Uncontrolled input ile az re-render ve yüksek performans', explanation: 'RHF uncontrolled input kullanarak re-render sayısını minimize eder; büyük formlarda belirgin performans avantajı sağlar.', order: 1 },
    { text: 'register fonksiyonu ne işe yarar?', type: 'multiple_choice', options: ['Formu gönderir', 'Input\'u RHF\'e kaydeder ve ref bağlar', 'Validation tanımlar', 'Error döndürür'], answer: 'Input\'u RHF\'e kaydeder ve ref bağlar', explanation: '<input {...register("email")} /> ile input, RHF\'in takip ettiği alanlara eklenir.', order: 2 },
    { text: 'handleSubmit ne zaman çağrılır?', type: 'multiple_choice', options: ['Input değiştiğinde', 'Form submit edildiğinde ve validation geçildiğinde', 'Her render\'da', 'Error oluştuğunda'], answer: 'Form submit edildiğinde ve validation geçildiğinde', explanation: '<form onSubmit={handleSubmit(onSubmit)}> şeklinde kullanılır; validation başarılı olursa onSubmit callback\'i çağrılır.', order: 3 },
    { text: 'formState.errors nedir?', type: 'multiple_choice', options: ['Network hataları', 'Validation hatalarını içeren obje', 'Console logları', 'State değerleri'], answer: 'Validation hatalarını içeren obje', explanation: '{errors.email && <span>{errors.email.message}</span>} şeklinde her alan için hata mesajlarına erişilir.', order: 4 },
    { text: 'watch fonksiyonu neyi yapar?', type: 'multiple_choice', options: ['Formu sıfırlar', 'Belirtilen alanın anlık değerini izler', 'Submit tetikler', 'Validation çalıştırır'], answer: 'Belirtilen alanın anlık değerini izler', explanation: 'const sehir = watch("sehir"); ile alanın güncel değeri takip edilir; değer değiştikçe component yeniden render edilir.', order: 5 },
  ],
  'yup-validasyon': [
    { text: 'Yup kütüphanesi ne için kullanılır?', type: 'multiple_choice', options: ['HTTP istekleri', 'Schema tabanlı veri doğrulama', 'State yönetimi', 'Routing'], answer: 'Schema tabanlı veri doğrulama', explanation: 'Yup, obje şemalarını tanımlamaya ve doğrulamaya yarayan bir JavaScript kütüphanesidir.', order: 1 },
    { text: 'yup.string().required() ne anlama gelir?', type: 'multiple_choice', options: ['String olup olmayacağını kontrol eder', 'Zorunlu string alanı tanımlar', 'Minimum uzunluğu belirler', 'Email formatı doğrular'], answer: 'Zorunlu string alanı tanımlar', explanation: '.required() alanın boş geçilemeyeceğini belirtir; .required("Bu alan zorunludur") ile özel hata mesajı eklenebilir.', order: 2 },
    { text: 'React Hook Form ile Yup entegrasyonu için ne kullanılır?', type: 'multiple_choice', options: ['yupResolver', 'zodResolver', 'joiResolver', 'validationResolver'], answer: 'yupResolver', explanation: '@hookform/resolvers paketinden import edilen yupResolver, RHF\'in useForm\'una resolver olarak verilir.', order: 3 },
    { text: 'yup.object().shape({}) neyi tanımlar?', type: 'multiple_choice', options: ['Dizi şeması', 'Obje şeması ve alanlarının validation kurallarını', 'Sadece bir alanı', 'API endpoint\'i'], answer: 'Obje şeması ve alanlarının validation kurallarını', explanation: 'yup.object().shape({ email: yup.string().email().required() }) gibi form verilerinin tüm alanlarını tanımlar.', order: 4 },
    { text: 'Yup ile async validation (örn. sunucuya benzersizlik kontrolü) yapılabilir.', type: 'true_false', options: ['Doğru', 'Yanlış'], answer: 'Doğru', explanation: 'Yup .test() metodu Promise döndüren async fonksiyonları destekler; sunucu kontrolü yapılabilir.', order: 5 },
  ],
  'axios-veri-cekme': [
    { text: 'Axios\'un fetch API\'a göre avantajı nedir?', type: 'multiple_choice', options: ['Daha yavaştır', 'Otomatik JSON parse, interceptor ve hata yönetimi', 'Sadece GET destekler', 'Tarayıcıda çalışmaz'], answer: 'Otomatik JSON parse, interceptor ve hata yönetimi', explanation: 'Axios otomatik JSON dönüşümü, request/response interceptor, timeout ve detaylı hata nesnesi sunar.', order: 1 },
    { text: 'Axios interceptor ne işe yarar?', type: 'multiple_choice', options: ['İstekleri iptal eder', 'İstek/yanıtı göndermeden/almadan önce işlem yapar', 'Cache oluşturur', 'CORS çözer'], answer: 'İstek/yanıtı göndermeden/almadan önce işlem yapar', explanation: 'axios.interceptors.request ile token ekleme, response ile hata yönetimi gibi merkezi işlemler yapılabilir.', order: 2 },
    { text: 'axios.get() başarıyla dönerse veri nerede bulunur?', type: 'multiple_choice', options: ['response.body', 'response.data', 'response.json()', 'response.result'], answer: 'response.data', explanation: 'Axios yanıtı { data, status, headers, config } içerir; API verisi response.data içindedir.', order: 3 },
    { text: 'Axios ile istek iptal etmek için ne kullanılır?', type: 'multiple_choice', options: ['axios.cancel()', 'AbortController veya CancelToken', 'clearRequest()', 'axios.stop()'], answer: 'AbortController veya CancelToken', explanation: 'Component unmount olduğunda useEffect cleanup\'ında AbortController.abort() ile devam eden istekler iptal edilir.', order: 4 },
    { text: 'axios.create() ne işe yarar?', type: 'multiple_choice', options: ['Yeni axios versiyonu kurar', 'Özelleştirilmiş axios instance\'ı oluşturur', 'Interceptor siler', 'Global config sıfırlar'], answer: 'Özelleştirilmiş axios instance\'ı oluşturur', explanation: 'axios.create({ baseURL: "...", headers: {...} }) ile proje genelinde kullanılacak özelleştirilmiş instance oluşturulur.', order: 5 },
  ],
  'react-query': [
    { text: 'React Query (TanStack Query) hangi sorunu çözer?', type: 'multiple_choice', options: ['Client state yönetimi', 'Server state yönetimi, caching ve senkronizasyon', 'CSS stilleme', 'Routing'], answer: 'Server state yönetimi, caching ve senkronizasyon', explanation: 'React Query, API verilerinin fetch edilmesi, önbellekte tutulması ve güncellenmesini yönetir; loading/error state\'ini otomatik sağlar.', order: 1 },
    { text: 'useQuery hook\'u neyi döndürür?', type: 'multiple_choice', options: ['Sadece data', 'data, isLoading, isError ve diğer durumlar', 'mutate fonksiyonu', 'cache objesi'], answer: 'data, isLoading, isError ve diğer durumlar', explanation: 'const { data, isLoading, isError, error } = useQuery({...}) şeklinde kullanılır.', order: 2 },
    { text: 'useMutation ne zaman kullanılır?', type: 'multiple_choice', options: ['Veri okumak için', 'POST/PUT/DELETE gibi veri değiştiren işlemler için', 'Cache temizlemek için', 'Sayfa yenilemek için'], answer: 'POST/PUT/DELETE gibi veri değiştiren işlemler için', explanation: 'useMutation, veri oluşturma/güncelleme/silme işlemleri için kullanılır; onSuccess callback\'i ile cache invalidate edilebilir.', order: 3 },
    { text: 'staleTime nedir?', type: 'multiple_choice', options: ['İstek timeout süresi', 'Verinin "taze" sayıldığı süre; bu süre geçince yeniden fetch edilir', 'Cache\'in silinme süresi', 'Loading süresi'], answer: 'Verinin "taze" sayıldığı süre; bu süre geçince yeniden fetch edilir', explanation: 'staleTime: 5 * 60 * 1000 ile veri 5 dakika boyunca taze sayılır ve arka planda yeniden fetch edilmez.', order: 4 },
    { text: 'queryClient.invalidateQueries() ne yapar?', type: 'multiple_choice', options: ['Query siler', 'Belirtilen query\'leri eskimiş işaretler ve yeniden fetch tetikler', 'Cache temizler', 'Hataları sıfırlar'], answer: 'Belirtilen query\'leri eskimiş işaretler ve yeniden fetch tetikler', explanation: 'mutation sonrası queryClient.invalidateQueries({ queryKey: ["todos"] }) ile ilgili veriler güncellenir.', order: 5 },
  ],
  'redux': [
    { text: 'Redux Toolkit\'te slice nedir?', type: 'multiple_choice', options: ['Bir reducer ve action\'ları bir arada tutan yapı', 'Global state', 'Middleware', 'Store'], answer: 'Bir reducer ve action\'ları bir arada tutan yapı', explanation: 'createSlice({ name, initialState, reducers }) ile reducer ve action creator\'lar otomatik oluşturulur.', order: 1 },
    { text: 'useSelector ne işe yarar?', type: 'multiple_choice', options: ['Action dispatch eder', 'Store\'dan state seçer', 'Reducer oluşturur', 'Middleware ekler'], answer: 'Store\'dan state seçer', explanation: 'const count = useSelector(state => state.counter.value); ile Redux store\'dan istenen state parçası seçilir.', order: 2 },
    { text: 'useDispatch hook\'u neyi döndürür?', type: 'multiple_choice', options: ['State değeri', 'dispatch fonksiyonu', 'Slice objesi', 'Store referansı'], answer: 'dispatch fonksiyonu', explanation: 'const dispatch = useDispatch(); ardından dispatch(increment()) şeklinde action\'lar tetiklenir.', order: 3 },
    { text: 'createAsyncThunk ne için kullanılır?', type: 'multiple_choice', options: ['Senkron action\'lar için', 'Asenkron işlemleri (API çağrısı vb.) Redux ile yönetmek için', 'Middleware yazmak için', 'Store oluşturmak için'], answer: 'Asenkron işlemleri (API çağrısı vb.) Redux ile yönetmek için', explanation: 'createAsyncThunk ile async action oluşturulur; pending/fulfilled/rejected durumları otomatik üretilir.', order: 4 },
    { text: 'Redux Toolkit\'te state immer ile doğrudan mutate edilebilir.', type: 'true_false', options: ['Doğru', 'Yanlış'], answer: 'Doğru', explanation: 'RTK, immer.js entegre eder; reducers içinde state.value++ gibi doğrudan mutasyon yazılabilir, arka planda immutable kopya üretilir.', order: 5 },
  ],
};

const challengesData = [
  {
    title: 'Todo Uygulaması',
    description: 'useState ve useEffect kullanarak localStorage\'a kaydeden tam fonksiyonel bir Todo uygulaması yap.',
    requirements: `**Görev:** React ile Todo uygulaması geliştir.

**Gereksinimler:**
- Todo ekleme, tamamlama ve silme
- useState ile state yönetimi
- useEffect ile localStorage'a kayıt
- Filter: Tümü / Aktif / Tamamlanan
- TypeScript kullanımı

**Bonus:** useReducer ile state yönetimini yeniden yaz.

**GitHub reposuna README.md ve ekran görüntüsü ekle!**`,
    difficulty: 'easy',
    type: 'coding',
    language: 'typescript',
    startDate: new Date(),
    endDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
    points: 50,
    status: 'active',
  },
  {
    title: 'useFetch Custom Hook',
    description: 'Yeniden kullanılabilir bir useFetch custom hook\'u yaz ve birden fazla component\'te kullan.',
    requirements: `**Görev:** useFetch custom hook implementasyonu.

**Gereksinimler:**
- useFetch(url) hook\'u: { data, loading, error } döndürsün
- Axios veya fetch API kullan
- AbortController ile cleanup
- Generic TypeScript desteği: useFetch<T>(url)
- Örnek: JSONPlaceholder API ile post listesi

**Test:** En az 2 farklı component'te useFetch kullan.

**README.md'e kullanım örneği ekle!**`,
    difficulty: 'medium',
    type: 'coding',
    language: 'typescript',
    startDate: new Date(),
    endDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
    points: 75,
    status: 'active',
  },
  {
    title: 'React Query + Axios Blog',
    description: 'React Query ve Axios kullanarak JSONPlaceholder API\'den veri çeken bir blog uygulaması yap.',
    requirements: `**Görev:** React Query + Axios ile blog uygulaması.

**Gereksinimler:**
- useQuery ile post listesi
- useQuery ile tek post detay sayfası
- useMutation ile yeni post oluşturma (optimistic update)
- React Router ile sayfa yönlendirme
- Loading ve error state'leri
- React Hook Form + Yup ile post formu

**Bonus:** Infinite scroll veya pagination ekle.

**README.md + ekran görüntüleri ekle!**`,
    difficulty: 'hard',
    type: 'coding',
    language: 'typescript',
    startDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    endDate: new Date(Date.now() + 17 * 24 * 60 * 60 * 1000),
    points: 150,
    status: 'upcoming',
  },
];

const homeworkData: Record<string, { title: string; description: string; difficulty: string; points: number }> = {
  'js-temelleri': {
    title: 'ES6+ Alıştırmaları',
    description: `**Ödev:** Modern JavaScript özelliklerini kullan.

**Gereksinimler:**
1. let/const ile değişken tanımlama (var kullanma!)
2. Arrow function: 5 farklı örnek (tek satır, çok satır, parametresiz)
3. Destructuring: dizi ve obje örnekleri
4. Spread/Rest operatörü: dizi birleştirme ve obje kopyalama
5. Template literal: karmaşık string oluşturma

**Bonus:** Optional chaining (?.) ve nullish coalescing (??) kullan.

GitHub'a yükle, README'ye açıklama ekle.`,
    difficulty: 'easy',
    points: 15,
  },
  'js-kontrol-akisi': {
    title: 'Dizi Metotları Uygulaması',
    description: `**Ödev:** map, filter, reduce ile veri dönüşümleri yap.

**Gereksinimler:**
Bir kullanıcı listesi oluştur (en az 10 obje: id, isim, yas, aktif):
1. map: Tüm isimleri büyük harfe çevir
2. filter: 18+ aktif kullanıcıları filtrele
3. reduce: Toplam yaş ortalamasını hesapla
4. Zincir kullanımı: filter + map + reduce ile tek satır çözüm

**Bonus:** sort() ile yaşa göre sırala; find(), findIndex() kullan.

README'ye giriş ve çıkış verilerini ekle.`,
    difficulty: 'easy',
    points: 15,
  },
  'react-giris': {
    title: 'İlk React Component\'leri',
    description: `**Ödev:** JSX ve temel component yapısını öğren.

**Gereksinimler:**
1. Header component: Logo ve nav linkleri
2. Card component: Resim, başlık, açıklama, buton
3. UserProfile component: Avatar, kullanıcı adı, bio
4. Sabit veri ile component'leri App.tsx'te kullan
5. TypeScript ile prop tipleri tanımla

**Bonus:** Fragment kullan, list render ile birden fazla Card oluştur.

Vite + React + TypeScript ile proje kur; README'ye başlatma adımlarını yaz.`,
    difficulty: 'easy',
    points: 15,
  },
  'props': {
    title: 'Props ile Component Kompozisyonu',
    description: `**Ödev:** Props geçişi ve component kompozisyonu.

**Gereksinimler:**
1. Button component: variant (primary/secondary/danger), size (sm/md/lg), disabled, onClick props
2. Alert component: type (success/error/warning), message, onClose (children ile)
3. ProductCard: image, title, price, rating, onAddToCart callback
4. Layout component: header, sidebar, children props
5. TypeScript ile tüm prop tiplerini tanımla

**Test:** Her component için en az 3 farklı prop kombinasyonu dene.`,
    difficulty: 'easy',
    points: 15,
  },
  'state-yonetimi': {
    title: 'State Kavramını Keşfet',
    description: `**Ödev:** State ile interaktif component'ler oluştur.

**Gereksinimler:**
1. Counter: artır/azalt/sıfırla, minimum 0 sınırı
2. Toggle: açık/kapalı state, farklı UI göster
3. TabPanel: 3 sekme, aktif sekme state'i
4. AccordionItem: açılıp kapanan içerik (state ile)

**Bonus:** State doğrudan değiştirilmeye çalışıldığında ne oluyor? Gözlemle ve README'ye yaz.`,
    difficulty: 'easy',
    points: 15,
  },
  'usestate': {
    title: 'useState ile Form Yönetimi',
    description: `**Ödev:** useState ile controlled form implement et.

**Gereksinimler:**
1. Kayıt formu: isim, email, şifre, şifre tekrar
2. Her input için ayrı state veya obje state
3. Gerçek zamanlı validation: email formatı, şifre min 8 karakter, şifreler eşleşmeli
4. Submit'te hata yoksa başarı mesajı göster, formu sıfırla
5. Karakter sayacı: textarea için kalan karakter sayısı

**Bonus:** useReducer ile aynı formu yeniden yaz ve karşılaştır.`,
    difficulty: 'medium',
    points: 20,
  },
  'useeffect': {
    title: 'useEffect ile API Entegrasyonu',
    description: `**Ödev:** useEffect ile veri çekme ve side effect yönetimi.

**Gereksinimler:**
1. JSONPlaceholder API'dan kullanıcılar çek (https://jsonplaceholder.typicode.com/users)
2. Loading, error ve data state'leri
3. Kullanıcıya tıklayınca postlarını göster (ayrı endpoint)
4. Cleanup: component unmount'ta isteği iptal et (AbortController)
5. Arama input'u ile useEffect + debounce ile filtrele

**Bonus:** useEffect dependency hatası yap ve neden sonsuz döngüye girdiğini açıkla.`,
    difficulty: 'medium',
    points: 20,
  },
  'useref': {
    title: 'useRef ile DOM Manipülasyonu',
    description: `**Ödev:** useRef ile DOM ve değer saklama örnekleri.

**Gereksinimler:**
1. Otomatik focus: Sayfa açıldığında arama inputu focus alsın
2. Scroll-to-section: Butona basınca ilgili bölüme scroll et
3. Stopwatch: useRef ile interval ID sakla, başlat/durdur/sıfırla
4. Önceki değer: Custom hook usePrevoiusValue(value) yaz (useRef ile)
5. Kaç kez render edildi: useRef ile render sayacı

README'ye her örneğin neden useRef kullandığını açıkla.`,
    difficulty: 'medium',
    points: 20,
  },
  'usecontext': {
    title: 'Context ile Tema Sistemi',
    description: `**Ödev:** Context API ile dark/light tema sistemi.

**Gereksinimler:**
1. ThemeContext oluştur: theme (dark/light), toggleTheme
2. ThemeProvider ile uygulamayı sar
3. En az 3 component'te useContext ile temayı kullan
4. Tema değişince tüm uygulama güncellensin
5. localStorage'a kayıt (useEffect ile)

**Bonus:** AuthContext da ekle: kullanıcı bilgisi ve login/logout; iki context'i birlikte kullan.`,
    difficulty: 'medium',
    points: 20,
  },
  'usereducer': {
    title: 'useReducer ile Alışveriş Sepeti',
    description: `**Ödev:** useReducer ile karmaşık state yönetimi.

**Gereksinimler:**
useReducer ile sepet yönet:
- ADD_ITEM: ürün ekle (zaten varsa miktarı artır)
- REMOVE_ITEM: ürünü tamamen çıkar
- UPDATE_QUANTITY: miktar güncelle
- CLEAR_CART: sepeti temizle
- Toplam fiyat hesapla (useMemo ile)

**UI:** Ürün listesi + sepet yan yana göster.

**Bonus:** Context ile sepet state'ini uygulama genelinde paylaş.`,
    difficulty: 'medium',
    points: 20,
  },
  'usememo-usecallback': {
    title: 'Performans Optimizasyonu',
    description: `**Ödev:** useMemo, useCallback ve React.memo kullan.

**Gereksinimler:**
1. Büyük liste (1000 eleman): useMemo ile filtreleme
2. React.memo ile ExpensiveChild component
3. useCallback ile callback prop geçimi (memo ile birlikte)
4. React DevTools Profiler ile öncesi/sonrası karşılaştır (ekran görüntüsü al)

**Analiz:** README'ye hangi optimizasyonun ne kadar fark yarattığını yaz.

**Bonus:** useCallback olmadan memo'nun işe yaramadığını göster.`,
    difficulty: 'hard',
    points: 25,
  },
  'uselayouteffect': {
    title: 'useLayoutEffect ile DOM Ölçümü',
    description: `**Ödev:** useLayoutEffect ile layout efektleri.

**Gereksinimler:**
1. Tooltip component: useLayoutEffect ile pozisyon hesapla (ekran taşmasını önle)
2. Resizable panel: sürükleyerek yeniden boyutlandırma
3. useEffect vs useLayoutEffect: aynı efekti ikisiyle de yaz, flaş/titreme farkını gözlemle
4. getBoundingClientRect ile element boyutlarını ölç

**README'ye:** useLayoutEffect ne zaman kullanılmalı, ne zaman kullanılmamalı? Açıkla.`,
    difficulty: 'hard',
    points: 25,
  },
  'useimperativehandle': {
    title: 'Custom Input Component',
    description: `**Ödev:** forwardRef + useImperativeHandle ile özel input.

**Gereksinimler:**
1. CustomInput component: forwardRef ile yaz
2. useImperativeHandle ile API aç: focus(), blur(), clear(), getValue()
3. Parent component'ten ref ile bu metodları çağır
4. ValidatedInput: built-in validation ile useImperativeHandle
5. TypeScript: RefHandle interface tanımla

**Test:** 3 farklı CustomInput örneği; parent butonlarıyla kontrol et.`,
    difficulty: 'hard',
    points: 25,
  },
  'custom-hooks': {
    title: 'Custom Hook Kütüphanesi',
    description: `**Ödev:** En az 4 custom hook yaz.

**Gereksinimler:**
1. useLocalStorage<T>(key, initialValue): get/set ile localStorage
2. useDebounce(value, delay): değer değişimini geciktir
3. useWindowSize(): { width, height } döndür
4. useToggle(initial): boolean toggle hook'u

**Her hook için:**
- TypeScript generic desteği
- Kullanım örneği component
- Cleanup (gerekiyorsa)

**Bonus:** useAsync(asyncFn) hook'u: { data, loading, error, execute }`,
    difficulty: 'hard',
    points: 25,
  },
  'react-router': {
    title: 'Multi-Page React Uygulaması',
    description: `**Ödev:** React Router ile tam sayfalı uygulama.

**Gereksinimler:**
1. Sayfalar: Ana Sayfa, Hakkında, Blog, Blog Detay (/blog/:id), 404
2. Layout: Navbar + Outlet ile nested route
3. useParams ile dinamik blog detay
4. useNavigate ile programatik yönlendirme
5. Korumalı route: giriş yapılmamışsa /giris'e yönlendir
6. useSearchParams ile blog arama/filtreleme

**Bonus:** Lazy loading (React.lazy + Suspense) ile sayfa bölme.`,
    difficulty: 'hard',
    points: 25,
  },
  'react-hook-form': {
    title: 'Çok Adımlı Form',
    description: `**Ödev:** React Hook Form ile multi-step form.

**Gereksinimler:**
Adım 1: Kişisel bilgiler (ad, soyad, email, telefon)
Adım 2: Adres bilgileri (şehir, ilçe, posta kodu)
Adım 3: Hesap bilgileri (kullanıcı adı, şifre, şifre tekrar)

**Her adımda:**
- register ve handleSubmit kullan
- formState.errors ile hata göster
- getValues ile önceki adım verilerini koru
- İleri/Geri butonları

**Son adımda özet göster ve "Kaydet" butonu.**`,
    difficulty: 'hard',
    points: 25,
  },
  'yup-validasyon': {
    title: 'Yup Schema Validasyonu',
    description: `**Ödev:** React Hook Form + Yup ile gelişmiş validasyon.

**Gereksinimler:**
Kayıt formu Yup schema ile:
1. email: geçerli format, zorunlu
2. password: min 8 karakter, en az 1 büyük harf, 1 rakam
3. confirmPassword: password ile eşleşmeli (yup.ref kullan)
4. phone: Türk telefon formatı (/^(05\d{9})$/)
5. birthDate: 18+ yaş kontrolü

**Tüm hata mesajları Türkçe olsun.**

**Bonus:** Async validation: kullanıcı adı benzersizlik kontrolü simüle et.`,
    difficulty: 'hard',
    points: 25,
  },
  'axios-veri-cekme': {
    title: 'Axios API Katmanı',
    description: `**Ödev:** Proje için merkezi Axios yapılandırması.

**Gereksinimler:**
1. axios.create() ile instance: baseURL, timeout, headers
2. Request interceptor: Authorization header ekle (localStorage'dan token)
3. Response interceptor: 401'de logout, hataları işle
4. API servisi: getUsers(), getUserById(id), createUser(data), updateUser(id, data), deleteUser(id)
5. Loading state yönetimi ile component'lerde kullan

**Bonus:** Retry mantığı: 5xx hatalarında 3 kez tekrar dene.

README'ye mimari kararlarını açıkla.`,
    difficulty: 'hard',
    points: 25,
  },
  'react-query': {
    title: 'React Query ile CRUD',
    description: `**Ödev:** React Query ile tam CRUD uygulaması.

**Gereksinimler:**
JSONPlaceholder API kullanarak:
1. useQuery ile post listesi (staleTime: 5dk)
2. useQuery ile post detay sayfası
3. useMutation ile yeni post oluştur (optimistic update)
4. useMutation ile post güncelle
5. useMutation ile post sil + queryClient.invalidateQueries
6. React Query DevTools ekle

**Bonus:** useInfiniteQuery ile sonsuz scroll post listesi.`,
    difficulty: 'hard',
    points: 30,
  },
  'redux': {
    title: 'Redux Toolkit ile E-Ticaret State',
    description: `**Ödev:** Redux Toolkit ile e-ticaret state yönetimi.

**Gereksinimler:**
1. counterSlice: ürün miktarı
2. cartSlice: addItem, removeItem, updateQuantity, clearCart
3. userSlice: login, logout, profil bilgisi
4. createAsyncThunk ile ürünleri API'dan çek (JSONPlaceholder /products veya mock)
5. useSelector ve useDispatch ile component'lerde kullan
6. Redux DevTools ile state takibi

**Bonus:** redux-persist ile state'i localStorage'da sakla.`,
    difficulty: 'hard',
    points: 30,
  },
};

async function main() {
  console.log('🌱 ReacType seed başlatılıyor...');
  console.log('🗑️  Eski veriler temizleniyor...');

  // Sıra önemli: bağımlı tablolar önce silinmeli
  await prisma.homeworkSubmission.deleteMany({});
  await prisma.quizResult.deleteMany({});
  await prisma.progress.deleteMany({});
  await prisma.challengeParticipant.deleteMany({});
  await prisma.question.deleteMany({});
  await prisma.quiz.deleteMany({});
  await prisma.homework.deleteMany({});
  await prisma.challenge.deleteMany({});
  await prisma.topic.deleteMany({});

  console.log('✅ Eski veriler silindi.\n📚 React konuları ekleniyor...');

  // Konuları oluştur
  const topicMap: Record<string, number> = {};
  for (const t of topicsData) {
    const { parentSlug, ...data } = t;
    const parentId = parentSlug ? topicMap[parentSlug] : undefined;
    const topic = await prisma.topic.create({
      data: { ...data, ...(parentId !== undefined && { parentId }) }
    });
    topicMap[data.slug] = topic.id;
    console.log(`  ✅ [Level ${data.level}] ${topic.title}`);
  }

  // Quizleri oluştur
  console.log('\n📝 Quizler ekleniyor...');
  for (const [slug, questions] of Object.entries(quizData)) {
    const topicId = topicMap[slug];
    if (!topicId) { console.warn(`  ⚠️  Topic bulunamadı: ${slug}`); continue; }

    const quiz = await prisma.quiz.create({ data: { topicId } });
    for (const q of questions) {
      await prisma.question.create({
        data: {
          quizId: quiz.id,
          text: q.text,
          type: q.type,
          options: q.options ? JSON.stringify(q.options) : null,
          answer: q.answer,
          explanation: q.explanation,
          order: q.order
        }
      });
    }
    console.log(`  ✅ Quiz: ${slug} (${questions.length} soru)`);
  }

  // Challenge'ları oluştur
  console.log('\n🏆 Challenge\'lar ekleniyor...');
  for (const c of challengesData) {
    await prisma.challenge.create({ data: c });
    console.log(`  ✅ Challenge: ${c.title}`);
  }

  // Ödevleri oluştur
  console.log('\n📖 Ödevler ekleniyor...');
  for (const [slug, hw] of Object.entries(homeworkData)) {
    const topicId = topicMap[slug];
    if (!topicId) { console.warn(`  ⚠️  Topic bulunamadı: ${slug}`); continue; }
    await prisma.homework.create({ data: { topicId, ...hw } });
    console.log(`  ✅ Ödev: ${hw.title}`);
  }

  console.log('\n🎉 ReacType seed tamamlandı!');
  console.log(`   📚 ${topicsData.length} konu`);
  console.log(`   📝 ${Object.keys(quizData).length} quiz (her biri 5 soru)`);
  console.log(`   🏆 ${challengesData.length} challenge`);
  console.log(`   📖 ${Object.keys(homeworkData).length} ödev`);
}

main()
  .catch(e => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
