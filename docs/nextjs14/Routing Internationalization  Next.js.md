---
title: "Routing: Internationalization | Next.js"
source: "https://nextjs.org/docs/14/app/building-your-application/routing/internationalization"
author:
  - "[[Vercel]]"
published:
created: 2025-09-16
description: "Add support for multiple languages with internationalized routing and localized content."
tags:
  - "clippings"
---
[애플리케이션 빌드](https://nextjs.org/docs/14/app/building-your-application) [라우팅](https://nextjs.org/docs/14/app/building-your-application/routing) 국제화

## 국제화

Next.js 사용하면 여러 언어를 지원하도록 콘텐츠의 라우팅 및 렌더링을 구성할 수 있습니다. 사이트를 다양한 로케일에 맞게 조정하려면 번역된 콘텐츠(현지화) 및 국제화된 경로가 포함됩니다.

## 용어

- **로캘:** 언어 및 서식 기본 설정 집합에 대한 식별자입니다. 여기에는 일반적으로 사용자의 기본 언어와 지리적 지역이 포함됩니다.
	- `en-US`: 미국에서 사용되는 영어
	- `nl-NL`: 네덜란드에서 사용되는 네덜란드어
	- `nl`: 네덜란드어, 특정 지역 없음

## 라우팅 개요

브라우저에서 사용자의 언어 기본 설정을 사용하여 사용할 로캘을 선택하는 것이 좋습니다. 기본 언어를 변경하면 애플리케이션에 대한 수신 헤더가 수정됩니다.`Accept-Language`

예를 들어, 다음 라이브러리를 사용하여 수신을 확인하여 지원하려는 로캘 및 기본 로캘을 기반으로 선택할 로캘을 결정할 수 있습니다.`Request` `Headers`

라우팅은 하위 경로() 또는 도메인()에 의해 국제화될 수 있습니다. 이 정보를 사용하여 이제 [미들웨어](https://nextjs.org/docs/14/app/building-your-application/routing/middleware) 내부의 로케일을 기반으로 사용자를 리디렉션할 수 있습니다.`/fr/products` `my-site.fr/products`

middleware.js

```
import { NextResponse } from "next/server";

 

let locales = ['en-US', 'nl-NL', 'nl']

 

// Get the preferred locale, similar to the above or using a library

function getLocale(request) { ... }

 

export function middleware(request) {

  // Check if there is any supported locale in the pathname

  const { pathname } = request.nextUrl

  const pathnameHasLocale = locales.some(

    (locale) => pathname.startsWith(\`/${locale}/\`) || pathname === \`/${locale}\`

  )

 

  if (pathnameHasLocale) return

 

  // Redirect if there is no locale

  const locale = getLocale(request)

  request.nextUrl.pathname = \`/${locale}${pathname}\`

  // e.g. incoming request is /products

  // The new URL is now /en-US/products

  return NextResponse.redirect(request.nextUrl)

}

 

export const config = {

  matcher: [

    // Skip all internal paths (_next)

    '/((?!_next).*)',

    // Optional: only run on root (/) URL

    // '/'

  ],

}
```

Finally, ensure all special files inside are nested under . This enables the Next.js router to dynamically handle different locales in the route, and forward the parameter to every layout and page. For example:`app/` `app/[lang]` `lang`

app/\[lang\]/page.js

```
// You now have access to the current locale

// e.g. /en-US/products -> \`lang\` is "en-US"

export default async function Page({ params: { lang } }) {

  return ...

}
```

The root layout can also be nested in the new folder (e.g. ).`app/[lang]/layout.js`

## Localization

Changing displayed content based on the user’s preferred locale, or localization, is not something specific to Next.js. The patterns described below would work the same with any web application.

Let’s assume we want to support both English and Dutch content inside our application. We might maintain two different “dictionaries”, which are objects that give us a mapping from some key to a localized string. For example:

dictionaries/en.json

```
{

  "products": {

    "cart": "Add to Cart"

  }

}
```

dictionaries/nl.json

```
{

  "products": {

    "cart": "Toevoegen aan Winkelwagen"

  }

}
```

We can then create a function to load the translations for the requested locale:`getDictionary`

app/\[lang\]/dictionaries.js

```
import 'server-only'

 

const dictionaries = {

  en: () => import('./dictionaries/en.json').then((module) => module.default),

  nl: () => import('./dictionaries/nl.json').then((module) => module.default),

}

 

export const getDictionary = async (locale) => dictionaries[locale]()
```

Given the currently selected language, we can fetch the dictionary inside of a layout or page.

app/\[lang\]/page.js

```
import { getDictionary } from './dictionaries'

 

export default async function Page({ params: { lang } }) {

  const dict = await getDictionary(lang) // en

  return <button>{dict.products.cart}</button> // Add to Cart

}
```

Because all layouts and pages in the directory default to [Server Components](https://nextjs.org/docs/14/app/building-your-application/rendering/server-components), we do not need to worry about the size of the translation files affecting our client-side JavaScript bundle size. This code will **only run on the server**, and only the resulting HTML will be sent to the browser.`app/`

## Static Generation

To generate static routes for a given set of locales, we can use with any page or layout. This can be global, for example, in the root layout:`generateStaticParams`

app/\[lang\]/layout.js

```
export async function generateStaticParams() {

  return [{ lang: 'en-US' }, { lang: 'de' }]

}

 

export default function Root({ children, params }) {

  return (

    <html lang={params.lang}>

      <body>{children}</body>

    </html>

  )

}
```

## Resources

- [Minimal i18n routing and translations](https://github.com/vercel/next.js/tree/canary/examples/app-dir-i18n-routing)
- [`next-intl`](https://next-intl-docs.vercel.app/docs/next-13)
- [`next-international`](https://github.com/QuiiBz/next-international)
- [`next-i18n-router`](https://github.com/i18nexus/next-i18n-router)