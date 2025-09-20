---
title: "Styling: CSS Modules | Next.js"
source: "https://nextjs.org/docs/14/app/building-your-application/styling/css-modules"
author:
  - "[[Vercel]]"
published:
created: 2025-09-16
description: "Style your Next.js Application with CSS Modules, Global Styles, and external stylesheets."
tags:
  - "clippings"
---
## CSS 모듈 및 전역 스타일

Next.js는 다음과 같은 다양한 유형의 스타일시트를 지원합니다.

- [CSS 모듈](https://nextjs.org/docs/14/app/building-your-application/styling/#css-modules)
- [글로벌 스타일](https://nextjs.org/docs/14/app/building-your-application/styling/#global-styles)
- [외부 스타일시트](https://nextjs.org/docs/14/app/building-your-application/styling/#external-stylesheets)

## CSS 모듈

Next.js에는 확장을 사용하는 CSS 모듈에 대한 기본 제공 지원이 있습니다.`.module.css`

CSS 모듈은 고유한 클래스 이름을 자동으로 생성하여 CSS의 범위를 로컬로 지정합니다. 이를 통해 충돌에 대한 걱정 없이 다른 파일에서 동일한 클래스 이름을 사용할 수 있습니다. 이러한 동작으로 인해 CSS 모듈은 구성 요소 수준 CSS를 포함하는 이상적인 방법입니다.

## 본보기

CSS 모듈은 디렉토리 내의 모든 파일로 가져올 수 있습니다.`app`

앱/대시보드/레이아웃.tsx

```
import styles from './styles.module.css'

 

export default function DashboardLayout({

  children,

}: {

  children: React.ReactNode

}) {

  return <section className={styles.dashboard}>{children}</section>

}
```

앱/대시보드/styles.module.css

```
.dashboard {

  padding: 24px;

}
```

CSS 모듈은 **및 확장자가 있는 파일에 대해서만 활성화됩니다.`.module.css``.module.sass`**.

프로덕션 환경에서 모든 CSS 모듈 파일은 **자동으로 많은 축소 및 코드 분할** 파일로 연결됩니다. 이러한 파일은 애플리케이션의 핫 실행 경로를 나타내므로 애플리케이션이 페인팅할 수 있도록 최소한의 CSS가 로드되도록 합니다.`.css``.css`

## 글로벌 스타일

전역 스타일은 디렉토리 내의 모든 레이아웃, 페이지 또는 구성 요소로 가져올 수 있습니다.`app`

> **알아 둘만 한** 정보: 이것은 파일 내에서 전역 스타일만 가져올 수 있는 디렉토리와 다릅니다.`pages` `_app.js`

예를 들어, 다음과 같은 스타일시트를 고려하십시오.`app/global.css`

```
body {

  padding: 20px 20px 60px;

  max-width: 680px;

  margin: 0 auto;

}
```

Inside the root layout (), import the stylesheet to apply the styles to every route in your application:`app/layout.js` `global.css`

app/layout.tsx

```
// These styles apply to every route in the application

import './global.css'

 

export default function RootLayout({

  children,

}: {

  children: React.ReactNode

}) {

  return (

    <html lang="en">

      <body>{children}</body>

    </html>

  )

}
```

## External Stylesheets

Stylesheets published by external packages can be imported anywhere in the directory, including colocated components:`app`

app/layout.tsx

```
import 'bootstrap/dist/css/bootstrap.css'

 

export default function RootLayout({

  children,

}: {

  children: React.ReactNode

}) {

  return (

    <html lang="en">

      <body className="container">{children}</body>

    </html>

  )

}
```

> **Good to know**: External stylesheets must be directly imported from an npm package or downloaded and colocated with your codebase. You cannot use .`<link rel="stylesheet" />`

## Ordering and Merging

Next.js optimizes CSS during production builds by automatically chunking (merging) stylesheets. The CSS order is determined by the order in which you import the stylesheets into your application code.

For example, will be ordered before since is imported first in :`base-button.module.css` `page.module.css` `<BaseButton>` `<Page>`

base-button.tsx

```
import styles from './base-button.module.css'

 

export function BaseButton() {

  return <button className={styles.primary} />

}
```

page.ts

```
import { BaseButton } from './base-button'

import styles from './page.module.css'

 

export function Page() {

  return <BaseButton className={styles.primary} />

}
```

To maintain a predictable order, we recommend the following:

- Only import a CSS file in a single JS/TS file.
	- If using global class names, import the global styles in the same file in the order you want them to be applied.
- Prefer CSS Modules over global styles.
	- Use a consistent naming convention for your CSS modules. For example, using over .`<name>.module.css` `<name>.tsx`
- Extract shared styles into a separate shared component.
- If using [Tailwind](https://nextjs.org/docs/14/app/building-your-application/styling/tailwind-css), import the stylesheet at the top of the file, preferably in the [Root Layout](https://nextjs.org/docs/14/app/building-your-application/routing/pages-and-layouts#root-layout-required).

> **Good to know:** CSS ordering behaves differently in development mode, always ensure to check preview deployments to verify the final CSS order in your production build.

## Additional Features

Next.js includes additional features to improve the authoring experience of adding styles:

- When running locally with , local stylesheets (either global or CSS modules) will take advantage of [Fast Refresh](https://nextjs.org/docs/14/architecture/fast-refresh) to instantly reflect changes as edits are saved.`next dev`
- When building for production with , CSS files will be bundled into fewer minified files to reduce the number of network requests needed to retrieve styles.`next build``.css`
- If you disable JavaScript, styles will still be loaded in the production build (). However, JavaScript is still required for to enable [Fast Refresh](https://nextjs.org/docs/14/architecture/fast-refresh).`next start` `next dev`