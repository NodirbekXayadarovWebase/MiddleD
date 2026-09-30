# Bajarilgan tasklar

Vue 3 + TypeScript + Vite, naive-ui, Tailwind 4. Har bir task chap menyuda alohida bo'lim.

| # | Task | Holati | Marshrut |
| --- | --- | --- | --- |
| 1 | Foydalanuvchilar CRUD (GraphQL) | Bajarildi, `main` da | `/query/users` |
| 2 | Pinia pattern'lar va plaginlar | Bajarildi, `main` da | `/pinia` |
| 3 | Performance profiling | Bajarildi, commit qilinmagan | `/performance` |
| 4 | Bundle analysis va optimizatsiya | Bajarildi, commit qilinmagan | — |

---

## 1-task — Foydalanuvchilar CRUD (GraphQL)

GraphQL orqali to'liq CRUD: ro'yxat, yaratish, tahrirlash, o'chirish.

- Apollo Client (`@apollo/client`) — so'rovlar uchun yagona kirish nuqtasi
- `src/services/query/users.service.ts` — query/mutation'lar
- `src/pages/query/users/` — `index.vue` (jadval), `create.vue`, `edit.vue`, `UserForm.vue`, store va tiplar
- naive-ui layout: sidebar, header, marshrutlash

Fayllar: `src/pages/query/users/`, `src/services/query/`, `src/services/api.service.ts`

## 2-task — Pinia pattern'lar

Setup-store uslubi va ikkita o'z plaginim.

- `src/plugins/pinia/persist.ts` — store holatini `localStorage` ga saqlash
- `src/plugins/pinia/logger.ts` — har bir action'ni loglash
- `src/pages/pinia/store/posts.ts` — filtr, sahifalash, yuklanish holati
- `src/pages/pinia/store/settings.ts` — sahifa o'lchami kabi sozlamalar
- `src/stores/activity.ts` + `ActivityLog.vue` — loggerdan kelgan yozuvlarni ko'rsatadi
- Ma'lumot REST orqali: `src/services/rest/posts.service.ts`

Fayllar: `src/plugins/pinia/`, `src/pages/pinia/`, `src/stores/activity.ts`

## 3-task — Performance profiling

Bitta sahifada bir xil 2000 qatorli jadvalning **sekin** va **tez** variantlari. Tugma bilan almashtiriladi, render vaqti ms da ko'rsatiladi.

Uchta bottleneck va ularning yechimi:

| Muammo | Sekin variant | Tuzatish |
| --- | --- | --- |
| Barcha qatorlar DOM'da | virtual scroll yo'q | `virtual-scroll` + `max-height` |
| Har renderda qayta filtrlash | template'da `filterRows()` chaqiruvi | `computed` |
| Chuqur reaktivlik | `ref([2000 obyekt])` | `shallowRef` |

Qo'shimcha: qidiruvga `refDebounced` qo'yilgan — har harfda filtr ishlamaydi.

Profiling uchun `vite-plugin-vue-devtools` ulandi — Vue DevTools'ning timeline va component render panellari brauzerda ochiladi.

Fayllar: `src/pages/performance/` (`index.vue`, `SlowTable.vue`, `FastTable.vue`, `data.ts`, `router/`), `vite.config.ts`

## 4-task — Bundle analysis va optimizatsiya

### O'lchash

- `vite-bundle-analyzer` — `npm run analyze` → `dist/stats.html` treemap hisobot
- `npm run size` → `scripts/size-budget.mjs`, har bir chunk va umumiy JS ning gzip hajmi

### Budjet — bu nima va nega kerak

Sayt ochilganda brauzer JS fayllarni yuklab olishi kerak. Fayllar qancha og'ir bo'lsa, sayt shuncha kech ochiladi — ayniqsa sekin internetda.

Bir necha tushuncha:

- **gzip hajmi** — fayllar brauzerga siqilgan holda yuboriladi, shuning uchun diskdagi emas, aynan siqilgan hajm o'lchanadi. Foydalanuvchi shuncha megabayt yuklab oladi.
- **chunk** — Vite butun kodni bitta ulkan fayl qilmaydi, bo'laklarga ajratadi. Har bir sahifa o'z bo'lagini oladi, shunda foydalanuvchi faqat kerakli qismni yuklaydi.
- **budjet** — shu hajmlarga qo'yilgan chegara.

Chegaralar (`scripts/size-budget.mjs`):

- barcha JS jami ≤ **260 KB**
- bitta bo'lak ≤ **65 KB**

Chegaradan oshsa skript xato qaytaradi va CI qulaydi. Ya'ni kimdir bilmasdan og'ir kutubxona qo'shsa, bu PR bosqichidayoq ko'rinadi — keyin "sayt nega sekin ochiladi?" deb qidirib yurilmaydi.

Hozirgi holat: jami JS **254.08 KB**, eng katta bo'lak **64.17 KB**. Ikkalasi ham chegara ichida, lekin bo'lak chegarasiga juda yaqin.

Chegarani oshirish kerak bo'lsa — nima o'sgani va nega o'sgani PR da yozilishi shart.

### Optimizatsiyalar

| O'zgarish | Nima qilindi va nega |
| --- | --- |
| `vue({ features: { optionsAPI: false } })` | Vue'da komponent yozishning ikki uslubi bor: eski Options API va yangi Composition API. Loyiha butunlay yangisida yozilgan, shuning uchun eskisini qo'llab-quvvatlaydigan kod bundle'ga umuman qo'shilmaydi. |
| `createDiscreteApi` o'rniga `useMessage()` | Bizga faqat xabar (toast) kerak edi, lekin eski usul u bilan birga dialog, modal, notification va loading-bar'ni ham tortib kelayotgan edi — ishlatilmasa ham. O'lchandi: **10.9 KB**. Pastda batafsil. |
| `@juggle/resize-observer` shim | naive-ui ichidagi `vueuc` bu polyfill'ni juda eski brauzerlar uchun zaxira sifatida saqlaydi (`NInput`, `NMenu` orqali kodga kiradi). Barcha zamonaviy brauzerda `window.ResizeObserver` allaqachon bor, ya'ni polyfill o'lik yuk. O'lchandi: **2.84 KB**. |
| `NDialogProvider` olib tashlandi | Loyihada hech qayerda ishlatilmayotgan edi. |

#### Eng katta yutuq: `createDiscreteApi` → `useMessage()`

naive-ui da toast xabar ko'rsatishning ikki yo'li bor:

- **`useMessage()`** — provider'dan api'ni oladi, lekin faqat komponent ichida ishlaydi.
- **`createDiscreteApi(['message'])`** — o'ziga alohida Vue ilova yasab, xabarni DOM'ga o'zi ulaydi. Shuning uchun komponentdan tashqarida ham ishlaydi.

Bizga ikkinchisi kerak edi, chunki xabarlar ko'pincha komponentdan **tashqarida** chiqariladi — store va service'lardan:

| Joy | Nima uchun |
| --- | --- |
| `services/api.service.ts:15` | GraphQL so'rovi xatosi |
| `services/http.service.ts:29` | REST so'rovi xatosi |
| `pages/query/users/store/index.ts:56,66,74` | qo'shildi / yangilandi / o'chirildi |
| `pages/pinia/store/posts.ts:50` | o'chirildi |

**Muammo:** `createDiscreteApi` universal — undan `message`, `dialog`, `notification`, `loadingBar`, `modal` dan istalganini so'rash mumkin. Lekin qaysi birini so'raganingizni u **ishga tushganda** biladi, kod yig'ilayotganda esa bilmaydi. Shuning uchun bundler ehtiyot yuzasidan hammasini bundle'ga qo'shadi — biz faqat `'message'` deb yozgan bo'lsak ham.

**Yechim:** api'ni provider'dan bir marta olib, modul o'zgaruvchisiga saqlash.

```ts
// src/utils/message.ts
export let message: MessageApi
export function setMessage(api: MessageApi): void {
  message = api
}
```

```ts
// src/layouts/MainLayout.vue — NMessageProvider ichida joylashgan
setMessage(useMessage())
```

Shundan keyin store va service'lar oddiygina `import { message }` qiladi.

**O'lchov natijasi:**

| | jami JS | eng katta bo'lak |
| --- | ---: | ---: |
| `createDiscreteApi` | 264.98 KB ❌ | 75.2 KB ❌ |
| `useMessage` | 254.08 KB ✅ | 64.17 KB ✅ |

Farq **10.9 KB** gzip. Muhimi: `createDiscreteApi` bilan budjetning **ikkalasi ham** buziladi (265 > 260 va 75.2 > 65). Ya'ni bu optimizatsiya bezak emas — budjet aynan shunga tayanadi.

**Ma'lum cheklov:** `message` `MainLayout` yuklanmaguncha bo'sh turadi. 404 sahifasi shu layout'dan tashqarida, shuning uchun u yerda `message` ishlatilmasligi kerak.

### CI

`.github/workflows/bundle-size.yml` — `main` ga push va har bir PR da:

1. build qiladi
2. `npm run size` — budjetdan oshsa job qulaydi, jadval run summary sahifasida chiqadi
3. `npm run analyze` — `stats.html` artifact sifatida yuklanadi (budjet buzilganda ham, nima o'sganini ko'rish uchun)

Fayllar: `vite.config.ts`, `scripts/size-budget.mjs`, `.github/workflows/bundle-size.yml`, `src/shims/resize-observer.ts`, `src/utils/message.ts`, `src/App.vue`, `src/layouts/MainLayout.vue`

---

## Ishga tushirish

```bash
npm install
npm run dev      # dasturchi rejimi
npm run build    # vue-tsc + vite build
npm run size     # bundle budjetini tekshirish
npm run analyze  # dist/stats.html treemap
```
