---
title: "Optimizing: Analytics | Next.js"
source: "https://nextjs.org/docs/14/app/building-your-application/optimizing/analytics"
author:
  - "[[Vercel]]"
published:
created: 2025-09-16
description: "Measure and track page performance using Next.js Speed Insights"
tags:
  - "clippings"
---
[애플리케이션 빌드](https://nextjs.org/docs/14/app/building-your-application) [최적화](https://nextjs.org/docs/14/app/building-your-application/optimizing) 분석

## 분석

Next.js에는 성능 메트릭 측정 및 보고를 위한 기본 제공 지원이 있습니다. 후크를 사용하여 보고를 직접 관리하거나 Vercel이 `useReportWebVitals` [관리형 서비스](https://vercel.com/analytics?utm_source=next-site&utm_medium=docs&utm_campaign=next-website) 메트릭을 자동으로 수집하고 시각화합니다.

## 나만의 구축

앱/\_components/web-vitals.js

```
'use client'

 

import { useReportWebVitals } from 'next/web-vitals'

 

export function WebVitals() {

  useReportWebVitals((metric) => {

    console.log(metric)

  })

}
```

앱/layout.js

```
import { WebVitals } from './_components/web-vitals'

 

export default function Layout({ children }) {

  return (

    <html>

      <body>

        <WebVitals />

        {children}

      </body>

    </html>

  )

}
```

> 후크에는 지시문이 필요하므로 가장 성능이 뛰어난 접근 방식은 루트 레이아웃이 가져오는 별도의 구성 요소를 만드는 것입니다. 이렇게 하면 클라이언트 경계가 구성 요소로만 제한됩니다.`useReportWebVitals` `"use client"` `WebVitals`

자세한 내용은 [API 참조를](https://nextjs.org/docs/14/app/api-reference/functions/use-report-web-vitals) 참조하십시오.

## 웹 바이탈

[웹 바이탈](https://web.dev/vitals/) 사용자를 포착하는 것을 목표로 하는 유용한 메트릭 세트입니다. 웹 페이지의 경험. 다음 웹 바이탈이 모두 포함되어 있습니다.

- [첫 번째 바이트까지의 시간](https://developer.mozilla.org/docs/Glossary/Time_to_first_byte) (TTFB)
- [첫 번째 콘텐츠 페인트](https://developer.mozilla.org/docs/Glossary/First_contentful_paint) (FCP)
- [가장 큰 콘텐츠 페인트](https://web.dev/lcp/) (LCP)
- [첫 번째 입력 지연](https://web.dev/fid/) (FID)
- [누적 레이아웃 이동](https://web.dev/cls/) (CLS)
- [다음 페인트에 대한 상호 작용](https://web.dev/inp/) (INP)

속성을 사용하여 이러한 메트릭의 모든 결과를 처리할 수 있습니다.`name`

앱/\_components/web-vitals.tsx

```
'use client'

 

import { useReportWebVitals } from 'next/web-vitals'

 

export function WebVitals() {

  useReportWebVitals((metric) => {

    switch (metric.name) {

      case 'FCP': {

        // handle FCP results

      }

      case 'LCP': {

        // handle LCP results

      }

      // ...

    }

  })

}
```

## Sending results to external systems

You can send results to any endpoint to measure and track real user performance on your site. For example:

> **Good to know**: If you use [Google Analytics](https://analytics.google.com/analytics/web/), using the value can allow you to construct metric distributions manually (to calculate percentiles, etc.) `id`

> ```
> useReportWebVitals((metric) => {
> 
>   // Use \`window.gtag\` if you initialized Google Analytics as this example:
> 
>   // https://github.com/vercel/next.js/blob/canary/examples/with-google-analytics/pages/_app.js
> 
>   window.gtag('event', metric.name, {
> 
>     value: Math.round(
> 
>       metric.name === 'CLS' ? metric.value * 1000 : metric.value
> 
>     ), // values must be integers
> 
>     event_label: metric.id, // id unique to current page load
> 
>     non_interaction: true, // avoids affecting bounce rate.
> 
>   })
> 
> })
> ```
> 
> 자세히 알아보기 [Google 애널리틱스에 결과 보내기](https://github.com/GoogleChrome/web-vitals#send-the-results-to-google-analytics).