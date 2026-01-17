# Author Dashboard

React + TypeScript ile geliştirilmiş, yazarları ve yazılarını görüntülemeyi sağlayan bir panel uygulaması. Favori yazarlar ve yazılar yönetilebilir, dark/light modu destekler ve yeni post ekleme/silme işlevselliği vardır.

---

## Özellikler

* Yazar listesi ve arama özelliği
* Her yazarın postlarını görüntüleme
* Yeni post ekleme ve silme (localStorage’a kaydedilir)
* Favori yazar ve post ekleme
* Favoriler sayfasında tüm favori yazarlar ve postlar gösterilir
* Dark / Light mod desteği
* Mobil uyumlu tasarım
* Hover ve geçiş efektleri ile modern arayüz
* LocalStorage ile state persistansı

---

## Teknolojiler

* React 18 + TypeScript
* Tailwind CSS
* Vite
* React Router
* LocalStorage (favori ve eklenen postlar için)
* JSONPlaceholder API (mock data)

---

## Kurulum

1. Depoyu klonla:

```bash
git clone https://github.com/kullaniciadi/author-dashboard.git
cd author-dashboard
```

2. Bağımlılıkları yükle:

```bash
npm install
```

3. Geliştirme sunucusunu başlat:

```bash
npm run dev
```

4. Tarayıcıda aç: `http://localhost:5173`

---

## Proje Yapısı

```
src/
 ├─ api/           # API işlemleri
 ├─ context/       # Favori ve tema contextleri
 ├─ pages/         # Users, UserDetail, FavoritesPage
 ├─ types/         # TypeScript tip tanımları
 └─ App.tsx        # Uygulamanın ana rotaları
```

---

## Dark / Light Mod

Tema değiştirici ile dark ve light modlar arasında geçiş yapılabilir:

* Kartlar, yazılar ve arka plan renkleri otomatik değişir
* Favori göstergeleri tema ile uyumlu olarak değişir

---

## Favoriler Sayfası

* Favori yazarlar ve postlar ayrı ayrı listelenir
* Favori yazarların üzerine tıklayarak detay sayfasına geçiş yapılabilir
* Favori postlar başlık ve gövde bilgisi ile listelenir

---


## Notlar

* Favori yazarlar ve postlar localStorage’a kaydedilir, sayfa yenilense de korunur.
* Manuel eklenen postlar da localStorage üzerinden saklanır.
* Dark/Light mod kart ve yazı renkleri ile uyumludur.

---

## Lisans

MIT Lisansı
