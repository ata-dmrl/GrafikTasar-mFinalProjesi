/**
 * Logo — ReacType Marka Logosu
 *
 * Kullanıcının verdiği logo görselini artık doğrudan /logo.png olarak
 * gösteriyoruz. Bu bileşen eski SVG yedeği olarak tutulmaktadır;
 * aktif kullanım <img src="/logo.png"> ile yapılmaktadır.
 *
 * Props:
 *   size    - Piksel cinsinden genişlik ve yükseklik (varsayılan: 40)
 *   withBg  - true ise logonun arkasına koyu daire arka plan eklenir
 *             (Giriş / Kayıt sayfaları için kullanılır)
 */
interface LogoProps {
  size?: number
  withBg?: boolean
}

export default function Logo({ size = 40, withBg = false }: LogoProps) {
  const s = size
  return (
    <svg
      width={s}
      height={s}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Cyan'dan maviye geçiş — devre çizgisi için */}
        <linearGradient id="routeGrad" x1="50" y1="10" x2="83" y2="88" gradientUnits="userSpaceOnUse">
          <stop offset="0%"   stopColor="#00D4FF" />
          <stop offset="55%"  stopColor="#00B8FF" />
          <stop offset="100%" stopColor="#1756FF" />
        </linearGradient>
      </defs>

      {/* İsteğe bağlı koyu daire arka plan */}
      {withBg && <circle cx="50" cy="50" r="50" fill="#050D1A" />}

      {/*
       * Beyaz A harfi — evenodd dolgu kuralıyla çizilir
       * Dış polygon: A'nın tam silüeti
       * İç üçgen: A'nın ortasındaki boşluk (şeffaf kalır)
       */}
      <path
        fillRule="evenodd"
        fill="white"
        d="M50 8 L93 91 L74 91 L62 57 L38 57 L26 91 L7 91 Z
           M50 24 L70 53 L30 53 Z"
      />

      {/*
       * Devre / Rota çizgisi
       * A'nın tepesinden başlar, sağ kenara doğru kıvrılarak
       * sağ alt köşede son bulur — "algoritma rotası" metaforunu görselleştirir
       */}
      <path
        d="M50 15 C56 30 68 38 74 52 C80 66 81 77 83 87"
        stroke="url(#routeGrad)"
        strokeWidth="3.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Ara düğüm — crossbar hizasında, sağ tarafta */}
      <circle cx="72" cy="44" r="4.5" fill="#00B8FF" />

      {/* Başlangıç düğümü — A'nın tepesinde cyan daire */}
      <circle cx="50" cy="8" r="7" fill="#00D4FF" />

      {/* Bitiş düğümü — sağ altta koyu mavi daire */}
      <circle cx="83" cy="87" r="6.5" fill="#1756FF" />
    </svg>
  )
}
