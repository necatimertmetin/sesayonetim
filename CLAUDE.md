# Sesa Yönetim — Kurumsal Web Sitesi

Amazon satıcıları için danışmanlık şirketi (SARPER CELEBI LLC) tanıtım sitesi.
React 19 + TypeScript + Vite 8 + MUI 7 + framer-motion + react-i18next. SPA, `base: /sesayonetim/` (GitHub Pages; build sonrası `dist/404.html` kopyalanır).

## Komutlar

- `npm run dev` — Vite dev server
- `npm run build` — `tsc -b && vite build` (+404.html copy)
- `npm run lint` — eslint

## Tasarım Sistemi (2026-07 redesign)

Kimlik, `src/assets/SesaYonetim.png` logosundan türetildi: fırçalanmış çelik "S",
turuncu globe detayı, koyu antrasit gölgeler. **Endüstriyel / metalik / premium** dil:

- **Accent (primary):** turuncu `#F08C1A` (dark), `#D97706`-benzeri koyu ton (light). Sadece vurgu: CTA, aktif nav, sayaçlar.
- **Secondary:** çelik grisi (dark: `#AEB6C2`, light: `#5B6672`). Eski turkuaz tamamen kaldırıldı; gradient'ler artık turuncu→çelik.
- **Zemin:** dark `#0C0D0F` / paper `#141619`; light `#EEF0F3` (gümüş) / paper `#fff`.
- **Metalik başlık efekti:** çelik dikey gradient text-clip (bkz. Hero'daki `steelText`).
- **Fontlar:** başlıklar Space Grotesk, gövde Inter (index.html'de Google Fonts yüklü; theme.ts'te variant bazlı).
- Köşeler nispeten keskin (borderRadius 2), ince 1px çelik border'lar, uppercase + letterspacing'li küçük etiketler.

Tüm bölümler renkleri `theme.palette.primary/secondary` üzerinden alır — palet değişince site geneli otomatik uyar. Hardcoded renk ekleme.

## Yapı (önemli dosyalar)

- `src/theme.ts` — Light/Dark MUI temaları (tek kaynak; palet + tipografi + bileşen override'ları)
- `src/components/layout/PageLayout.tsx` — Header/Footer + `NoiseBackground` (canvas topografik kontur animasyonu, marching squares)
- `src/components/layout/header/Header.tsx` — sticky blur header, `ThemeToggle`, `LanguageSwitch`
- `src/pages/Landing/Landing.tsx` — bölüm sırası + `DotGrid` (canvas partikül arka planı)
- `src/pages/Landing/components/` — Hero, LogoBar, WhyUs, Stats, Services, AboutPreview, Testimonial, CtaSection
- `src/pages/{About,Contact,Services,error}/` — alt sayfalar
- `src/router/Routes.tsx` — route tanımları (`visibleOnHeader/visibleOnFooter` bayrakları)
- `src/providers/` — ColorMode (dark/light), Localization; `useTranslation` özel hook (prefix'li çeviri)
- `src/localization/i18n.ts` — i18next + http-backend; çeviriler `public/locales/{tr,en}/common.json`

## Kurallar / notlar

- Çeviri: her metin **hem** `tr` **hem** `en` common.json'a eklenir; key yapısı `pages.<sayfa>.<bölüm>.<alan>`.
- Logo: `src/assets/SesaYonetim.png` (güncel). `Sesa.png` ve `logo.png` eski, kullanma.
- Hero2–Hero6 deneysel varyantlardı, redesign'da silindi; tek Hero var.
- MUI `sx` + framer-motion kalıbı; ayrı CSS dosyası yok.
- TypeScript strict; `tsc -b` build'in parçası — tip hatası build'i kırar.
