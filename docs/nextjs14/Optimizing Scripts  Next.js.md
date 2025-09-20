---
title: "Optimizing: Scripts | Next.js"
source: "https://nextjs.org/docs/14/app/building-your-application/optimizing/scripts"
author:
  - "[[Vercel]]"
published:
created: 2025-09-16
description: "Optimize 3rd party scripts with the built-in Script component."
tags:
  - "clippings"
---
[애플리케이션 빌드](https://nextjs.org/docs/14/app/building-your-application) [최적화](https://nextjs.org/docs/14/app/building-your-application/optimizing) 스크립트

## 스크립트 최적화

### 레이아웃 스크립트

여러 경로에 대한 타사 스크립트를 로드하려면 스크립트를 가져와 레이아웃 구성 요소에 직접 포함합니다.`next/script`

앱/대시보드/레이아웃.tsx

```
import Script from 'next/script'

 

export default function DashboardLayout({

  children,

}: {

  children: React.ReactNode

}) {

  return (

    <>

      <section>{children}</section>

      <Script src="https://example.com/script.js" />

    </>

  )

}
```

타사 스크립트는 사용자가 폴더 경로(예: ) 또는 중첩된 경로(예: )에 액세스할 때 가져옵니다. Next.js 사용자가 동일한 레이아웃의 여러 경로 사이를 탐색하더라도 스크립트가 **한 번만 로드** 되도록 합니다.`dashboard/page.js` `dashboard/settings/page.js`

### 응용 프로그램 스크립트

모든 경로에 대한 타사 스크립트를 로드하려면 스크립트를 가져와 루트 레이아웃에 직접 포함합니다.`next/script`

앱/레이아웃.tsx

```
import Script from 'next/script'

 

export default function RootLayout({

  children,

}: {

  children: React.ReactNode

}) {

  return (

    <html lang="en">

      <body>{children}</body>

      <Script src="https://example.com/script.js" />

    </html>

  )

}
```

이 스크립트는 애플리케이션 *의 경로에* 액세스할 때 로드되고 실행됩니다. Next.js 사용자가 여러 페이지 사이를 탐색하더라도 스크립트가 **한 번만 로드** 되도록 합니다.

> **권장 사항**: 성능에 대한 불필요한 영향을 최소화하기 위해 특정 페이지 또는 레이아웃에만 타사 스크립트를 포함하는 것이 좋습니다.

### 전략

의 기본 동작을 사용하면 모든 페이지 또는 레이아웃에서 타사 스크립트를 로드할 수 있지만 다음 속성을 사용하여 로드 동작을 미세 조정할 수 있습니다.`next/script` `strategy`

- `beforeInteractive`: Next.js 코드 전과 페이지 하이드레이션이 발생하기 전에 스크립트를 로드합니다.
- `afterInteractive`: (**기본값**) 스크립트를 일찍 로드하되 페이지에서 약간의 하이드레이션이 발생한 후에 로드합니다.
- `lazyOnload`: 나중에 브라우저 유휴 시간 동안 스크립트를 로드합니다.
- `worker`: (실험적) 웹 작업자에 스크립트를로드합니다.

참조 [`next/script`](https://nextjs.org/docs/14/app/api-reference/components/script#strategy) API 참조 문서를 참조하여 각 전략 및 사용 사례에 대해 자세히 알아보세요.

> **Warning:** The strategy is not yet stable and does not yet work with the `worker` [`app`](https://nextjs.org/docs/14/app/building-your-application/routing/defining-routes) directory. Use with caution.

Scripts that use the strategy are offloaded and executed in a web worker with `worker` [Partytown](https://partytown.builder.io/). This can improve the performance of your site by dedicating the main thread to the rest of your application code.

This strategy is still experimental and can only be used if the flag is enabled in :`nextScriptWorkers` `next.config.js`

next.config.js

```
module.exports = {

  experimental: {

    nextScriptWorkers: true,

  },

}
```

Then, run (normally or ) and Next.js will guide you through the installation of the required packages to finish the setup:`next` `npm run dev` `yarn dev`

Terminal

```
npm run dev
```

You'll see instructions like these: Please install Partytown by running `npm install @builder.io/partytown`

Once setup is complete, defining will automatically instantiate Partytown in your application and offload the script to a web worker.`strategy="worker"`

pages/home.tsx

```
import Script from 'next/script'

 

export default function Home() {

  return (

    <>

      <Script src="https://example.com/script.js" strategy="worker" />

    </>

  )

}
```

There are a number of trade-offs that need to be considered when loading a third-party script in a web worker. Please see Partytown's [tradeoffs](https://partytown.builder.io/trade-offs) documentation for more information.

### Inline Scripts

Inline scripts, or scripts not loaded from an external file, are also supported by the Script component. They can be written by placing the JavaScript within curly braces:

Or by using the property:`dangerouslySetInnerHTML`

> **Warning**: An property must be assigned for inline scripts in order for Next.js to track and optimize the script.`id`

### Executing Additional Code

Event handlers can be used with the Script component to execute additional code after a certain event occurs:

- `onLoad`: Execute code after the script has finished loading.
- `onReady`: Execute code after the script has finished loading and every time the component is mounted.
- `onError`: Execute code if the script fails to load.

These handlers will only work when is imported and used inside of a [Client Component](https://nextjs.org/docs/14/app/building-your-application/rendering/client-components) where is defined as the first line of code:`next/script` `"use client"`

app/page.tsx

```
'use client'

 

import Script from 'next/script'

 

export default function Page() {

  return (

    <>

      <Script

        src="https://example.com/script.js"

        onLoad={() => {

          console.log('Script has loaded')

        }}

      />

    </>

  )

}
```

Refer to the [`next/script`](https://nextjs.org/docs/14/app/api-reference/components/script#onload) API reference to learn more about each event handler and view examples.

### Additional Attributes

There are many DOM attributes that can be assigned to a element that are not used by the Script component, like `<script>` [`nonce`](https://developer.mozilla.org/docs/Web/HTML/Global_attributes/nonce) or [custom data attributes](https://developer.mozilla.org/docs/Web/HTML/Global_attributes/data-*). Including any additional attributes will automatically forward it to the final, optimized element that is included in the HTML.`<script>`

app/page.tsx

```
import Script from 'next/script'

 

export default function Page() {

  return (

    <>

      <Script

        src="https://example.com/script.js"

        id="example-script"

        nonce="XUENAJFW"

        data-test="script"

      />

    </>

  )

}
```

## API 참조

next/script API에 대해 자세히 알아보세요.[소개](https://nextjs.org/docs/14/app/api-reference/components/script)

[...](https://nextjs.org/docs/14/app/api-reference/components/script)

[구성 요소](https://nextjs.org/docs/14/app/api-reference/components/script)

<스크립트>

내장된 'next/script' 구성 요소를 사용하여 Next.js 애플리케이션에서 타사 스크립트를 최적화합니다.

[View original](https://nextjs.org/docs/14/app/api-reference/components/script)