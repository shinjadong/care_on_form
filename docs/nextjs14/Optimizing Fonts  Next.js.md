---
title: "Optimizing: Fonts | Next.js"
source: "https://nextjs.org/docs/14/app/building-your-application/optimizing/fonts"
author:
  - "[[Vercel]]"
published:
created: 2025-09-16
description: "Optimize your application's web fonts with the built-in `next/font` loaders."
tags:
  - "clippings"
---
[애플리케이션 빌드](https://nextjs.org/docs/14/app/building-your-application) [최적화](https://nextjs.org/docs/14/app/building-your-application/optimizing) 글꼴

## 글꼴 최적화

[**`next/font`**](https://nextjs.org/docs/14/app/api-reference/components/font) 는 자동으로 글꼴(사용자 정의 글꼴 포함)을 최적화하고 개인 정보 보호 및 성능 향상을 위해 외부 네트워크 요청을 제거합니다.

> **🎥 시계:** → 사용에 대해 자세히 알아보기 `next/font` [유튜브(6분)](https://www.youtube.com/watch?v=L8_98i_bMMA).

`next/font` *모든* 글꼴 파일에 대한 **자동 자체 호스팅이 내장** 되어 있습니다. 즉, 사용된 기본 CSS 속성 덕분에 레이아웃 이동 없이 웹 글꼴을 최적으로 로드할 수 있습니다.`size-adjust`

또한 이 새로운 글꼴 시스템을 사용하면 성능과 개인 정보 보호를 염두에 두고 모든 Google 글꼴을 편리하게 사용할 수 있습니다. CSS 및 글꼴 파일은 빌드 시 다운로드되고 나머지 정적 자산과 함께 자체 호스팅됩니다. **브라우저에서 Google에 요청을 보내지 않습니다.**

## 구글 글꼴

모든 Google 글꼴을 자동으로 자체 호스팅합니다. 글꼴은 배포에 포함되며 배포와 동일한 도메인에서 제공됩니다. **브라우저에서 Google에 요청을 보내지 않습니다.**

함수로 사용하려는 글꼴을 가져와 시작하십시오. 다음을 사용하는 것이 좋습니다. `next/font/google` [가변 글꼴](https://fonts.google.com/variablefonts) 최고의 성능과 유연성을 위해.

앱/레이아웃.tsx

```
import { Inter } from 'next/font/google'

 

// If loading a variable font, you don't need to specify the font weight

const inter = Inter({

  subsets: ['latin'],

  display: 'swap',

})

 

export default function RootLayout({

  children,

}: {

  children: React.ReactNode

}) {

  return (

    <html lang="en" className={inter.className}>

      <body>{children}</body>

    </html>

  )

}
```

가변 글꼴을 사용할 수 없는 경우 **두께를 지정해야 합니다**.

앱/레이아웃.tsx

```
import { Roboto } from 'next/font/google'

 

const roboto = Roboto({

  weight: '400',

  subsets: ['latin'],

  display: 'swap',

})

 

export default function RootLayout({

  children,

}: {

  children: React.ReactNode

}) {

  return (

    <html lang="en" className={roboto.className}>

      <body>{children}</body>

    </html>

  )

}
```

배열을 사용하여 여러 가중치 및/또는 스타일을 지정할 수 있습니다.

앱/layout.js

```
const roboto = Roboto({

  weight: ['400', '700'],

  style: ['normal', 'italic'],

  subsets: ['latin'],

  display: 'swap',

})
```

> **Good to know**: Use an underscore (\_) for font names with multiple words. E.g. should be imported as .`Roboto Mono` `Roboto_Mono`

### Specifying a subset

Google Fonts are automatically [subset](https://fonts.google.com/knowledge/glossary/subsetting). This reduces the size of the font file and improves performance. You'll need to define which of these subsets you want to preload. Failing to specify any subsets while [`preload`](https://nextjs.org/docs/14/app/api-reference/components/font#preload) is will result in a warning.`true`

This can be done by adding it to the function call:

app/layout.tsx

```
const inter = Inter({ subsets: ['latin'] })
```

View the [Font API Reference](https://nextjs.org/docs/14/app/api-reference/components/font) for more information.

### Using Multiple Fonts

You can import and use multiple fonts in your application. There are two approaches you can take.

The first approach is to create a utility function that exports a font, imports it, and applies its where needed. This ensures the font is preloaded only when it's rendered:`className`

app/fonts.ts

```
import { Inter, Roboto_Mono } from 'next/font/google'

 

export const inter = Inter({

  subsets: ['latin'],

  display: 'swap',

})

 

export const roboto_mono = Roboto_Mono({

  subsets: ['latin'],

  display: 'swap',

})
```

app/layout.tsx

```
import { inter } from './fonts'

 

export default function Layout({ children }: { children: React.ReactNode }) {

  return (

    <html lang="en" className={inter.className}>

      <body>

        <div>{children}</div>

      </body>

    </html>

  )

}
```

app/page.tsx

```
import { roboto_mono } from './fonts'

 

export default function Page() {

  return (

    <>

      <h1 className={roboto_mono.className}>My page</h1>

    </>

  )

}
```

In the example above, will be applied globally, and can be imported and applied as needed.`Inter` `Roboto Mono`

Alternatively, you can create a [CSS variable](https://nextjs.org/docs/14/app/api-reference/components/font#variable) and use it with your preferred CSS solution:

app/layout.tsx

```
import { Inter, Roboto_Mono } from 'next/font/google'

import styles from './global.css'

 

const inter = Inter({

  subsets: ['latin'],

  variable: '--font-inter',

  display: 'swap',

})

 

const roboto_mono = Roboto_Mono({

  subsets: ['latin'],

  variable: '--font-roboto-mono',

  display: 'swap',

})

 

export default function RootLayout({

  children,

}: {

  children: React.ReactNode

}) {

  return (

    <html lang="en" className={\`${inter.variable} ${roboto_mono.variable}\`}>

      <body>

        <h1>My App</h1>

        <div>{children}</div>

      </body>

    </html>

  )

}
```

app/global.css

```
html {

  font-family: var(--font-inter);

}

 

h1 {

  font-family: var(--font-roboto-mono);

}
```

In the example above, will be applied globally, and any tags will be styled with .`Inter` `<h1>` `Roboto Mono`

> **Recommendation**: Use multiple fonts conservatively since each new font is an additional resource the client has to download.

## Local Fonts

Import and specify the of your local font file. We recommend using `next/font/local` `src` [variable fonts](https://fonts.google.com/variablefonts) for the best performance and flexibility.

app/layout.tsx

```
import localFont from 'next/font/local'

 

// Font files can be colocated inside of \`app\`

const myFont = localFont({

  src: './my-font.woff2',

  display: 'swap',

})

 

export default function RootLayout({

  children,

}: {

  children: React.ReactNode

}) {

  return (

    <html lang="en" className={myFont.className}>

      <body>{children}</body>

    </html>

  )

}
```

If you want to use multiple files for a single font family, can be an array:`src`

```
const roboto = localFont({

  src: [

    {

      path: './Roboto-Regular.woff2',

      weight: '400',

      style: 'normal',

    },

    {

      path: './Roboto-Italic.woff2',

      weight: '400',

      style: 'italic',

    },

    {

      path: './Roboto-Bold.woff2',

      weight: '700',

      style: 'normal',

    },

    {

      path: './Roboto-BoldItalic.woff2',

      weight: '700',

      style: 'italic',

    },

  ],

})
```

View the [Font API Reference](https://nextjs.org/docs/14/app/api-reference/components/font) for more information.

## With Tailwind CSS

`next/font` can be used with [Tailwind CSS](https://tailwindcss.com/) through a [CSS variable](https://nextjs.org/docs/14/app/api-reference/components/font#css-variables).

In the example below, we use the font from (you can use any font from Google or Local Fonts). Load your font with the option to define your CSS variable name and assign it to . Then, use to add the CSS variable to your HTML document.`Inter` `next/font/google` `variable` `inter` `inter.variable`

app/layout.tsx

```
import { Inter, Roboto_Mono } from 'next/font/google'

 

const inter = Inter({

  subsets: ['latin'],

  display: 'swap',

  variable: '--font-inter',

})

 

const roboto_mono = Roboto_Mono({

  subsets: ['latin'],

  display: 'swap',

  variable: '--font-roboto-mono',

})

 

export default function RootLayout({

  children,

}: {

  children: React.ReactNode

}) {

  return (

    <html lang="en" className={\`${inter.variable} ${roboto_mono.variable}\`}>

      <body>{children}</body>

    </html>

  )

}
```

Finally, add the CSS variable to your [Tailwind CSS config](https://nextjs.org/docs/14/app/building-your-application/styling/tailwind-css#configuring-tailwind):

tailwind.config.js

```
/** @type {import('tailwindcss').Config} */

module.exports = {

  content: [

    './pages/**/*.{js,ts,jsx,tsx}',

    './components/**/*.{js,ts,jsx,tsx}',

    './app/**/*.{js,ts,jsx,tsx}',

  ],

  theme: {

    extend: {

      fontFamily: {

        sans: ['var(--font-inter)'],

        mono: ['var(--font-roboto-mono)'],

      },

    },

  },

  plugins: [],

}
```

You can now use the and utility classes to apply the font to your elements.`font-sans` `font-mono`

When a font function is called on a page of your site, it is not globally available and preloaded on all routes. Rather, the font is only preloaded on the related routes based on the type of file where it is used:

- If it's a [unique page](https://nextjs.org/docs/14/app/building-your-application/routing/pages-and-layouts#pages), it is preloaded on the unique route for that page.
- If it's a [layout](https://nextjs.org/docs/14/app/building-your-application/routing/pages-and-layouts#layouts), it is preloaded on all the routes wrapped by the layout.
- If it's the [root layout](https://nextjs.org/docs/14/app/building-your-application/routing/pages-and-layouts#root-layout-required), it is preloaded on all routes.

## Reusing fonts

Every time you call the or Google font function, that font is hosted as one instance in your application. Therefore, if you load the same font function in multiple files, multiple instances of the same font are hosted. In this situation, it is recommended to do the following:`localFont`

- Call the font loader function in one shared file
- Export it as a constant
- Import the constant in each file where you would like to use this font

## API 참조

next/font API에 대해 자세히 알아보세요.[소개](https://nextjs.org/docs/14/app/api-reference/components/font)

[...](https://nextjs.org/docs/14/app/api-reference/components/font)

[구성 요소](https://nextjs.org/docs/14/app/api-reference/components/font)

글꼴

내장된 'next/font' 로더를 사용하여 웹 글꼴 로드를 최적화합니다.

[View original](https://nextjs.org/docs/14/app/api-reference/components/font)