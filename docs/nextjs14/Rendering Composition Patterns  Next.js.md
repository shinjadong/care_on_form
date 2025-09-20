---
title: "Rendering: Composition Patterns | Next.js"
source: "https://nextjs.org/docs/14/app/building-your-application/rendering/composition-patterns"
author:
  - "[[Vercel]]"
published:
created: 2025-09-16
description: "Recommended patterns for using Server and Client Components."
tags:
  - "clippings"
---
## 서버 및 클라이언트 컴포지션 패턴

React 애플리케이션을 빌드할 때 애플리케이션의 어떤 부분이 서버나 클라이언트에서 렌더링되어야 하는지 고려해야 합니다. 이 페이지에서는 서버 및 클라이언트 구성 요소를 사용할 때 권장되는 몇 가지 구성 패턴에 대해 설명합니다.

## 서버 및 클라이언트 구성 요소를 언제 사용해야 합니까?

다음은 서버 및 클라이언트 구성 요소의 다양한 사용 사례에 대한 간략한 요약입니다.

| 어떻게 해야 합니까? | 서버 구성 요소 | 클라이언트 구성 요소 |
| --- | --- | --- |
| 데이터 가져오기 |  |  |
| 백엔드 리소스에 액세스(직접) |  |  |
| 서버에 민감한 정보(액세스 토큰, API 키 등)를 보관합니다. |  |  |
| 서버에 대한 큰 종속성 유지 / 클라이언트 측 JavaScript 감소 |  |  |
| 상호 작용 및 이벤트 리스너 추가(,, 등) `onClick()` `onChange()` |  |  |
| 상태 및 수명 주기 효과 사용(,,, 등) `useState()` `useReducer()` `useEffect()` |  |  |
| 브라우저 전용 API 사용 |  |  |
| 상태, 효과 또는 브라우저 전용 API에 의존하는 사용자 지정 후크 사용 |  |  |
| 쓰다 [React 클래스 구성 요소](https://react.dev/reference/react/Component) |  |  |

## 서버 구성 요소 패턴

클라이언트 측 렌더링을 선택하기 전에 서버에서 데이터 가져오기, 데이터베이스 또는 백엔드 서비스 액세스와 같은 몇 가지 작업을 수행할 수 있습니다.

다음은 서버 구성 요소로 작업할 때 몇 가지 일반적인 패턴입니다.

### 구성 요소 간 데이터 공유

서버에서 데이터를 가져올 때 여러 구성 요소 간에 데이터를 공유해야 하는 경우가 있을 수 있습니다. 예를 들어 동일한 데이터에 의존하는 레이아웃과 페이지가 있을 수 있습니다.

대신 [반응 컨텍스트](https://react.dev/learn/passing-data-deeply-with-context) (서버에서 사용할 수 없음) 또는 데이터를 소품으로 전달하는 경우 [`fetch`](https://nextjs.org/docs/14/app/building-your-application/data-fetching/fetching-caching-and-revalidating#fetching-data-on-the-server-with-fetch) 또는 동일한 데이터에 대한 중복 요청에 대한 걱정 없이 필요한 구성 요소에서 동일한 데이터를 가져오는 React의 함수입니다. 이는 React가 데이터 요청을 자동으로 메모화하도록 확장되고 사용할 수 없을 때 함수를 사용할 수 있기 때문입니다.`cache` `fetch` `cache` `fetch`

React의 [메모화](https://nextjs.org/docs/14/app/building-your-application/caching#request-memoization) 에 대해 자세히 알아보세요.

### 클라이언트 환경에서 서버 전용 코드 제거

JavaScript 모듈은 서버 및 클라이언트 구성 요소 모듈 간에 공유할 수 있으므로 서버에서만 실행되도록 의도된 코드가 클라이언트로 몰래 들어갈 수 있습니다.

예를 들어 다음 데이터 가져오기 함수를 사용합니다.

At first glance, it appears that works on both the server and the client. However, this function contains an , written with the intention that it would only ever be executed on the server.`getData` `API_KEY`

Since the environment variable is not prefixed with , it's a private variable that can only be accessed on the server. To prevent your environment variables from being leaked to the client, Next.js replaces private environment variables with an empty string.`API_KEY` `NEXT_PUBLIC`

As a result, even though can be imported and executed on the client, it won't work as expected. And while making the variable public would make the function work on the client, you may not want to expose sensitive information to the client.`getData()`

To prevent this sort of unintended client usage of server code, we can use the package to give other developers a build-time error if they ever accidentally import one of these modules into a Client Component.`server-only`

To use , first install the package:`server-only`

Terminal

```
npm install server-only
```

Then import the package into any module that contains server-only code:

Now, any Client Component that imports will receive a build-time error explaining that this module can only be used on the server.`getData()`

The corresponding package can be used to mark modules that contain client-only code – for example, code that accesses the object.`client-only` `window`

### Using Third-party Packages and Providers

Since Server Components are a new React feature, third-party packages and providers in the ecosystem are just beginning to add the directive to components that use client-only features like , , and .`"use client"` `useState` `useEffect` `createContext`

Today, many components from packages that use client-only features do not yet have the directive. These third-party components will work as expected within Client Components since they have the directive, but they won't work within Server Components.`npm` `"use client"`

For example, let's say you've installed the hypothetical package which has a component. This component uses , but it doesn't yet have the directive.`acme-carousel` `<Carousel />` `useState` `"use client"`

If you use within a Client Component, it will work as expected:`<Carousel />`

app/gallery.tsx

```
'use client'

 

import { useState } from 'react'

import { Carousel } from 'acme-carousel'

 

export default function Gallery() {

  let [isOpen, setIsOpen] = useState(false)

 

  return (

    <div>

      <button onClick={() => setIsOpen(true)}>View pictures</button>

 

      {/* Works, since Carousel is used within a Client Component */}

      {isOpen && <Carousel />}

    </div>

  )

}
```

However, if you try to use it directly within a Server Component, you'll see an error:

app/page.tsx

```
import { Carousel } from 'acme-carousel'

 

export default function Page() {

  return (

    <div>

      <p>View pictures</p>

 

      {/* Error: \`useState\` can not be used within Server Components */}

      <Carousel />

    </div>

  )

}
```

This is because Next.js doesn't know is using client-only features.`<Carousel />`

To fix this, you can wrap third-party components that rely on client-only features in your own Client Components:

app/carousel.tsx

```
'use client'

 

import { Carousel } from 'acme-carousel'

 

export default Carousel
```

Now, you can use directly within a Server Component:`<Carousel />`

app/page.tsx

```
import Carousel from './carousel'

 

export default function Page() {

  return (

    <div>

      <p>View pictures</p>

 

      {/*  Works, since Carousel is a Client Component */}

      <Carousel />

    </div>

  )

}
```

We don't expect you to need to wrap most third-party components since it's likely you'll be using them within Client Components. However, one exception is providers, since they rely on React state and context, and are typically needed at the root of an application. [Learn more about third-party context providers below](https://nextjs.org/docs/14/app/building-your-application/rendering/#using-context-providers).

#### Using Context Providers

Context providers are typically rendered near the root of an application to share global concerns, like the current theme. Since [React context](https://react.dev/learn/passing-data-deeply-with-context) is not supported in Server Components, trying to create a context at the root of your application will cause an error:

app/layout.tsx

```
import { createContext } from 'react'

 

//  createContext is not supported in Server Components

export const ThemeContext = createContext({})

 

export default function RootLayout({ children }) {

  return (

    <html>

      <body>

        <ThemeContext.Provider value="dark">{children}</ThemeContext.Provider>

      </body>

    </html>

  )

}
```

이 문제를 해결하려면 컨텍스트를 생성하고 클라이언트 컴포넌트 내에서 해당 공급자를 렌더링합니다.

앱/테마 제공자.tsx

```
'use client'

 

import { createContext } from 'react'

 

export const ThemeContext = createContext({})

 

export default function ThemeProvider({

  children,

}: {

  children: React.ReactNode

}) {

  return <ThemeContext.Provider value="dark">{children}</ThemeContext.Provider>

}
```

이제 서버 컴포넌트가 클라이언트 컴포넌트로 표시되었으므로 프로바이더를 직접 렌더링할 수 있습니다.

앱/레이아웃.tsx

```
import ThemeProvider from './theme-provider'

 

export default function RootLayout({

  children,

}: {

  children: React.ReactNode

}) {

  return (

    <html>

      <body>

        <ThemeProvider>{children}</ThemeProvider>

      </body>

    </html>

  )

}
```

공급자가 루트에서 렌더링되면 앱 전체의 다른 모든 클라이언트 구성 요소가 이 컨텍스트를 사용할 수 있습니다.

> **알아 둘만 한:** 공급자를 트리에서 가능한 한 깊이 렌더링해야 합니다 – 전체 문서 대신 래핑만 하는 방법에 유의하십시오. 이렇게 하면 Next.js 서버 컴포넌트의 정적 부분을 더 쉽게 최적화할 수 있습니다.`ThemeProvider` `{children}` `<html>`

비슷한 방식으로 다른 개발자가 사용할 패키지를 만드는 라이브러리 작성자는 지시문을 사용하여 패키지의 클라이언트 진입점을 표시할 수 있습니다. 이를 통해 패키지 사용자는 랩핑 경계를 만들지 않고도 패키지 구성 요소를 서버 구성 요소로 직접 가져올 수 있습니다.`"use client"`

[트리 더 깊은 곳에서 'use client'를](https://nextjs.org/docs/14/app/building-your-application/rendering/#moving-client-components-down-the-tree) 사용하여 패키지를 최적화하여 가져온 모듈이 서버 구성 요소 모듈 그래프의 일부가 되도록 할 수 있습니다.

일부 번들러는 지시문을 제거할 수 있다는 점은 주목할 가치가 있습니다. 지시문을 포함하도록 esbuild를 구성하는 방법의 예를 찾을 수 있습니다. `"use client"` `"use client"` [React 랩 밸런서](https://github.com/shuding/react-wrap-balancer/blob/main/tsup.config.ts#L10-L13) 그리고 [Vercel 분석](https://github.com/vercel/analytics/blob/main/packages/web/tsup.config.js#L26-L30) 저장소.

## 클라이언트 구성 요소

### 클라이언트 구성 요소를 트리 아래로 이동

클라이언트 JavaScript 번들 크기를 줄이려면 클라이언트 구성 요소를 구성 요소 트리 아래로 이동하는 것이 좋습니다.

예를 들어 정적 요소(예: 로고, 링크 등)가 있는 레이아웃과 상태를 사용하는 대화형 검색 창이 있을 수 있습니다.

전체 레이아웃을 클라이언트 컴포넌트로 만드는 대신 인터랙티브 로직을 클라이언트 컴포넌트(예: )로 이동하고 레이아웃을 서버 컴포넌트로 유지합니다. 즉, 레이아웃의 모든 구성 요소 Javascript를 클라이언트에 보낼 필요가 없습니다.`<SearchBar />`

### 서버에서 클라이언트 컴포넌트로 소품 전달(직렬화)

서버 컴포넌트에서 데이터를 가져오는 경우, 데이터를 클라이언트 컴포넌트에 소품으로 전달할 수 있습니다. 서버에서 클라이언트 컴포넌트로 전달되는 소품은 [직렬화](https://react.dev/reference/react/use-server#serializable-parameters-and-return-values) 에 의해 반응.

클라이언트 컴포넌트가 직렬화할 수 없는 데이터에 의존하는 경우, [서드파티 라이브러리를 사용하여 클라이언트에서 데이터를 가져오](https://nextjs.org/docs/14/app/building-your-application/data-fetching/fetching-caching-and-revalidating#fetching-data-on-the-client-with-third-party-libraries) 거나 [라우트 핸들러](https://nextjs.org/docs/14/app/building-your-application/routing/route-handlers) 를 통해 서버에서 데이터를 가져올 수 있습니다.

## 서버 및 클라이언트 구성 요소 인터리빙

클라이언트 및 서버 컴포넌트를 인터리빙할 때 UI를 컴포넌트 트리로 시각화하는 것이 도움이 될 수 있습니다. 서버 컴포넌트인 [루트 레이아웃](https://nextjs.org/docs/14/app/building-your-application/routing/pages-and-layouts#root-layout-required) 부터 시작하여 지시문을 추가하여 클라이언트에서 컴포넌트의 특정 하위 트리를 렌더링할 수 있습니다.`"use client"`

이러한 클라이언트 서브트리 내에서 서버 컴포넌트를 중첩하거나 서버 액션을 호출할 수 있지만, 몇 가지 유의해야 할 사항이 있습니다.

- 요청-응답 수명 주기 동안 코드는 서버에서 클라이언트로 이동합니다. 클라이언트에 있는 동안 서버의 데이터 또는 리소스에 액세스해야 하는 경우 앞뒤로 전환하지 않고 서버에 **새** 요청을 하게 됩니다.
- 서버에 새 요청이 이루어지면 클라이언트 컴포넌트 내부에 중첩된 컴포넌트를 포함하여 모든 서버 컴포넌트가 먼저 렌더링됩니다. 렌더링된 결과(RSC 페이로드)에는 클라이언트 컴포넌트의 위치에 대한 참조가 포함됩니다. 그런 다음 클라이언트에서 React는 RSC 페이로드를 사용하여 서버 및 클라이언트 컴포넌트를 단일 트리로 조정합니다.
- 클라이언트 컴포넌트는 서버 컴포넌트 이후에 렌더링되기 때문에 서버 컴포넌트를 클라이언트 컴포넌트 모듈로 임포트할 수 없습니다(서버에 다시 새 요청이 필요하기 때문에). 대신 서버 컴포넌트를 클라이언트 컴포넌트로 전달할 수 있습니다. 아래의 [지원되지 않는 패턴](https://nextjs.org/docs/14/app/building-your-application/rendering/#unsupported-pattern-importing-server-components-into-client-components) 및 [지원되는 패턴](https://nextjs.org/docs/14/app/building-your-application/rendering/#supported-pattern-passing-server-components-to-client-components-as-props) 섹션을 참조하십시오.`props`

### 지원되지 않는 패턴: 서버 구성 요소를 클라이언트 구성 요소로 가져오기

다음 패턴은 지원되지 않습니다. 서버 구성 요소를 클라이언트 구성 요소로 가져올 수 없습니다.

```
'use client'

 

// You cannot import a Server Component into a Client Component.

import ServerComponent from './Server-Component'

 

export default function ClientComponent({

  children,

}: {

  children: React.ReactNode

}) {

  const [count, setCount] = useState(0)

 

  return (

    <>

      <button onClick={() => setCount(count + 1)}>{count}</button>

 

      <ServerComponent />

    </>

  )

}
```

### 지원되는 패턴: 서버 구성 요소를 클라이언트 구성 요소에 props로 전달

다음 패턴이 지원됩니다. 서버 컴포넌트를 클라이언트 컴포넌트에 소품으로 전달할 수 있습니다.

A common pattern is to use the React prop to create a *"slot"* in your Client Component.`children`

In the example below, accepts a prop:`<ClientComponent>` `children`

app/client-component.tsx

```
'use client'

 

import { useState } from 'react'

 

export default function ClientComponent({

  children,

}: {

  children: React.ReactNode

}) {

  const [count, setCount] = useState(0)

 

  return (

    <>

      <button onClick={() => setCount(count + 1)}>{count}</button>

      {children}

    </>

  )

}
```

`<ClientComponent>` doesn't know that will eventually be filled in by the result of a Server Component. The only responsibility has is to decide **where** will eventually be placed.`children` `<ClientComponent>` `children`

In a parent Server Component, you can import both the and and pass as a child of :`<ClientComponent>` `<ServerComponent>` `<ServerComponent>` `<ClientComponent>`

app/page.tsx

```
// This pattern works:

// You can pass a Server Component as a child or prop of a

// Client Component.

import ClientComponent from './client-component'

import ServerComponent from './server-component'

 

// Pages in Next.js are Server Components by default

export default function Page() {

  return (

    <ClientComponent>

      <ServerComponent />

    </ClientComponent>

  )

}
```

With this approach, and are decoupled and can be rendered independently. In this case, the child can be rendered on the server, well before is rendered on the client.`<ClientComponent>` `<ServerComponent>` `<ServerComponent>` `<ClientComponent>`

> **Good to know:**
> 
> - The pattern of "lifting content up" has been used to avoid re-rendering a nested child component when a parent component re-renders.
> - You're not limited to the prop. You can use any prop to pass JSX.`children`