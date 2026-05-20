/**
 * usePageTitle — Sayfa Başlığı Hook'u
 *
 * Her sayfaya özel tarayıcı sekmesi başlığı atar.
 * Kullanım: usePageTitle('Ana Sayfa')  →  sekme: "ReacType | Ana Sayfa"
 * Sayfa unmount olduğunda (kullanıcı ayrıldığında) başlık sıfırlanır.
 *
 * @param page - Sekme başlığına eklenecek sayfa adı
 */
import { useEffect } from 'react'

export function usePageTitle(page: string) {
  useEffect(() => {
    // Sekme başlığını "ReacType | <sayfa>" formatında güncelle
    document.title = `ReacType | ${page}`

    // Cleanup: bileşen unmount olunca varsayılan başlığa dön
    return () => {
      document.title = 'ReacType'
    }
  }, [page])
}
