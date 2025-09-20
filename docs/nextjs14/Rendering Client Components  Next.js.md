---
title: "Rendering: Client Components | Next.js"
source: "https://nextjs.org/docs/14/app/building-your-application/rendering/client-components"
author:
  - "[[Vercel]]"
published:
created: 2025-09-16
description: "Learn how to use Client Components to render parts of your application on the client."
tags:
  - "clippings"
---
[애플리케이션 빌드](https://nextjs.org/docs/14/app/building-your-application) [렌더링](https://nextjs.org/docs/14/app/building-your-application/rendering) 클라이언트 구성 요소

## 클라이언트 구성 요소

클라이언트 구성 요소를 사용하면 다음과 같은 대화형 UI를 작성할 수 있습니다. [서버에서 미리 렌더링됨](https://github.com/reactwg/server-components/discussions/4) 클라이언트 JavaScript를 사용하여 브라우저에서 실행할 수 있습니다.

이 페이지에서는 클라이언트 컴포넌트의 작동 방식, 렌더링 방식, 언제 사용할 수 있는지 살펴봅니다.

## 클라이언트 렌더링의 이점

클라이언트에서 렌더링 작업을 수행하면 다음과 같은 몇 가지 이점이 있습니다.

- **인터랙티브:** 클라이언트 컴포넌트는 상태, 효과 및 이벤트 리스너를 사용할 수 있으므로 사용자에게 즉각적인 피드백을 제공하고 UI를 업데이트할 수 있습니다.
- **브라우저 API**: 클라이언트 구성 요소는 다음과 같은 브라우저 API에 액세스할 수 있습니다. [지리적 위치](https://developer.mozilla.org/docs/Web/API/Geolocation_API) 또는 [로컬 스토리지](https://developer.mozilla.org/docs/Web/API/Window/localStorage).

## Next.js에서 클라이언트 구성 요소 사용

클라이언트 구성 요소를 사용하려면 React [`"use client"` 지시문](https://react.dev/reference/react/use-client) 파일 상단, 가져오기 위.

`"use client"` 서버 모듈과 클라이언트 컴포넌트 모듈 사이의 [경계](https://nextjs.org/docs/14/app/building-your-application/rendering#network-boundary) 를 선언하는 데 사용됩니다. 즉, 파일에 a를 정의하면 하위 구성 요소를 포함하여 가져온 다른 모든 모듈이 클라이언트 번들의 일부로 간주됩니다.`"use client"`

앱/카운터.tsx

```
'use client'

 

import { useState } from 'react'

 

export default function Counter() {

  const [count, setCount] = useState(0)

 

  return (

    <div>

      <p>You clicked {count} times</p>

      <button onClick={() => setCount(count + 1)}>Click me</button>

    </div>

  )

}
```

아래 다이어그램은 중첩된 구성 요소()에서 and를 사용하면 지시문이 정의되지 않은 경우 오류가 발생한다는 것을 보여줍니다. 기본적으로 App Router의 모든 구성 요소는 이러한 API를 사용할 수 없는 서버 구성 요소이기 때문입니다. 에서 지시문을 정의하면 이러한 API를 사용할 수 있는 클라이언트 경계에 들어가도록 React에 지시할 수 있습니다.`onClick` `useState` `toggle.js` `"use client"` `"use client"` `toggle.js`

![클라이언트 지시문 및 네트워크 경계 사용](https://nextjs.org/_next/image?url=https%3A%2F%2Fh8DxKfmAPhn8O0p3.public.blob.vercel-storage.com%2Fdocs%2Flight%2Fuse-client-directive.png&w=1920&q=75)

클라이언트 지시문 및 네트워크 경계 사용

> **Defining multiple entry points `use client`**:
> 
> You can define multiple "use client" entry points in your React Component tree. This allows you to split your application into multiple client bundles.
> 
> However, doesn't need to be defined in every component that needs to be rendered on the client. Once you define the boundary, all child components and modules imported into it are considered part of the client bundle.`"use client"`

## How are Client Components Rendered?

In Next.js, Client Components are rendered differently depending on whether the request is part of a full page load (an initial visit to your application or a page reload triggered by a browser refresh) or a subsequent navigation.

### Full page load

To optimize the initial page load, Next.js will use React's APIs to render a static HTML preview on the server for both Client and Server Components. This means, when the user first visits your application, they will see the content of the page immediately, without having to wait for the client to download, parse, and execute the Client Component JavaScript bundle.

On the server:

1. React renders Server Components into a special data format called the **React Server Component Payload (RSC Payload)**, which includes references to Client Components.
2. Next.js uses the RSC Payload and Client Component JavaScript instructions to render **HTML** for the route on the server.

Then, on the client:

1. The HTML is used to immediately show a fast non-interactive initial preview of the route.
2. The React Server Components Payload is used to reconcile the Client and Server Component trees, and update the DOM.
3. The JavaScript instructions are used to [hydrate](https://react.dev/reference/react-dom/client/hydrateRoot) Client Components and make their UI interactive.

> **What is hydration?**
> 
> Hydration is the process of attaching event listeners to the DOM, to make the static HTML interactive. Behind the scenes, hydration is done with the [`hydrateRoot`](https://react.dev/reference/react-dom/client/hydrateRoot) React API.

### Subsequent Navigations

On subsequent navigations, Client Components are rendered entirely on the client, without the server-rendered HTML.

This means the Client Component JavaScript bundle is downloaded and parsed. Once the bundle is ready, React will use the RSC Payload to reconcile the Client and Server Component trees, and update the DOM.

## 서버 환경으로 돌아가기

때로는 경계를 선언한 후 서버 환경으로 돌아가고 싶을 수도 있습니다. 예를 들어 클라이언트 번들 크기를 줄이거나, 서버에서 데이터를 가져오거나, 서버에서만 사용할 수 있는 API를 사용할 수 있습니다.`"use client"`

이론적으로 클라이언트 구성 요소 내에 중첩되어 있더라도 클라이언트와 서버 구성 요소 및 [서버 작업을](https://nextjs.org/docs/14/app/building-your-application/data-fetching/server-actions-and-mutations) 인터리빙하여 서버에 코드를 유지할 수 있습니다. 자세한 내용은 [컴포지션 패턴](https://nextjs.org/docs/14/app/building-your-application/rendering/composition-patterns) 페이지를 참조하십시오.