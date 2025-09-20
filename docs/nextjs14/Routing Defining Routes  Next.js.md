---
title: "Routing: Defining Routes | Next.js"
source: "https://nextjs.org/docs/14/app/building-your-application/routing/defining-routes"
author:
  - "[[Vercel]]"
published:
created: 2025-09-16
description: "Learn how to create your first route in Next.js."
tags:
  - "clippings"
---
## 경로 정의

> 계속하기 전에 [라우팅 기본 사항](https://nextjs.org/docs/14/app/building-your-application/routing) 페이지를 읽어 보는 것이 좋습니다.

이 페이지에서는 Next.js 애플리케이션에서 경로를 정의하고 구성하는 방법을 안내합니다.

## 경로 생성

Next.js 폴더가 경로를 정의하는 데 **사용되는 파일 시스템** 기반 라우터를 사용합니다.

각 폴더는 **URL** 세그먼트에 매핑되는 [**경로** 세그먼트](https://nextjs.org/docs/14/app/building-your-application/routing#route-segments) 를 나타냅니다. [중첩된 경로를](https://nextjs.org/docs/14/app/building-your-application/routing#nested-routes) 만들려면 폴더를 서로 중첩할 수 있습니다.

![경로 세그먼트로 세그먼트 라우팅](https://nextjs.org/_next/image?url=https%3A%2F%2Fh8DxKfmAPhn8O0p3.public.blob.vercel-storage.com%2Fdocs%2Flight%2Froute-segments-to-path-segments.png&w=1920&q=75)

경로 세그먼트로 세그먼트 라우팅

특별한 [`page.js` 파일](https://nextjs.org/docs/14/app/building-your-application/routing/pages-and-layouts#pages) 경로 세그먼트에 공개적으로 액세스할 수 있도록 하는 데 사용됩니다.

![경로 정의](https://nextjs.org/_next/image?url=https%3A%2F%2Fh8DxKfmAPhn8O0p3.public.blob.vercel-storage.com%2Fdocs%2Flight%2Fdefining-routes.png&w=1920&q=75)

이 예제에서 URL 경로는 해당 파일이 없기 때문에 공개적으로 액세스할 *수 없습니다*. 이 폴더는 구성 요소, 스타일시트, 이미지 또는 기타 공동 배치된 파일을 저장하는 데 사용할 수 있습니다.`/dashboard/analytics` `page.js`

> **알아두면 좋은 정보**:,, 또는 파일 확장자는 특수 파일에 사용할 수 있습니다.`.js``.jsx``.tsx`

## UI 만들기

[특수 파일 규칙은](https://nextjs.org/docs/14/app/building-your-application/routing#file-conventions) 각 경로 세그먼트에 대한 UI를 만드는 데 사용됩니다. 가장 일반적인 것은 경로에 고유한 UI를 표시하는 [페이지](https://nextjs.org/docs/14/app/building-your-application/routing/pages-and-layouts#pages) 와 여러 경로에서 공유되는 UI를 표시하는 [레이아웃](https://nextjs.org/docs/14/app/building-your-application/routing/pages-and-layouts#layouts) 입니다.

예를 들어 첫 번째 페이지를 만들려면 디렉터리 내에 파일을 추가하고 React 구성 요소를 내보냅니다.`page.js` `app`

앱/페이지.tsx

```
export default function Page() {

  return <h1>Hello, Next.js!</h1>

}
```

Was this helpful?