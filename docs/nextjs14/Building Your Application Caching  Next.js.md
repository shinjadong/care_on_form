---
title: "Building Your Application: Caching | Next.js"
source: "https://nextjs.org/docs/14/app/building-your-application/caching"
author:
  - "[[Vercel]]"
published:
created: 2025-09-16
description: "An overview of caching mechanisms in Next.js."
tags:
  - "clippings"
---
## Next.js에서 캐싱

Next.js 렌더링 작업 및 데이터 요청을 캐싱하여 애플리케이션의 성능을 개선하고 비용을 절감합니다. 이 페이지에서는 Next.js 캐싱 메커니즘, 이를 구성하는 데 사용할 수 있는 API 및 서로 상호 작용하는 방법에 대해 자세히 설명합니다.

> **알아두면 좋은 정보**: 이 페이지는 Next.js 내부적으로 작동하는 방식을 이해하는 데 도움이 되지만 Next.js 생산성을 높이는 데 필수적인 지식 **은 아닙니다**. 대부분의 Next.js 캐싱 휴리스틱은 API 사용량에 따라 결정되며 구성이 없거나 최소한으로 최상의 성능을 발휘할 수 있는 기본값이 있습니다.

## 개요

다음은 다양한 캐싱 메커니즘과 그 목적에 대한 개략적인 개요입니다.

| 기구 | 무엇 | 어디 | 목적 | 기간 |
| --- | --- | --- | --- | --- |
| [메모화 요청](https://nextjs.org/docs/14/app/building-your-application/#request-memoization) | 함수의 반환 값 | 서버 | React 구성 요소 트리에서 데이터 재사용 | 요청별 수명 주기 |
| [데이터 캐시](https://nextjs.org/docs/14/app/building-your-application/#data-cache) | 데이터 | 서버 | 사용자 요청 및 배포 전반에 걸쳐 데이터 저장 | 영구(재검증 가능) |
| [전체 경로 캐시](https://nextjs.org/docs/14/app/building-your-application/#full-route-cache) | HTML 및 RSC 페이로드 | 서버 | 렌더링 비용 절감 및 성능 향상 | 영구(재검증 가능) |
| [라우터 캐시](https://nextjs.org/docs/14/app/building-your-application/#router-cache) | RSC 페이로드 | 클라이언트 | 탐색 시 서버 요청 감소 | 사용자 세션 또는 시간 기반 |

기본적으로 Next.js 성능을 개선하고 비용을 절감하기 위해 가능한 한 많이 캐시합니다. 즉, 경로는 **정적으로 렌더링** 되고 옵트아웃하지 않는 한 데이터 요청이 **캐시됩니다**. 아래 다이어그램은 빌드 시 경로가 정적으로 렌더링되는 경우와 정적 경로를 처음 방문하는 경우의 기본 캐싱 동작을 보여줍니다.

![빌드 시 및 경로를 처음 방문할 때 HIT, MISS 및 SET를 사용하는 네 가지 메커니즘에 대한 기본 캐싱 동작을 Next.js 보여주는 다이어그램입니다.](https://nextjs.org/_next/image?url=https%3A%2F%2Fh8DxKfmAPhn8O0p3.public.blob.vercel-storage.com%2Fdocs%2Flight%2Fcaching-overview.png&w=1920&q=75)

빌드 시 및 경로를 처음 방문할 때 HIT, MISS 및 SET를 사용하는 네 가지 메커니즘에 대한 기본 캐싱 동작을 Next.js 보여주는 다이어그램입니다.

캐싱 동작은 경로가 정적으로 렌더링되는지 또는 동적으로 렌더링되는지, 데이터가 캐시되는지 또는 캐시되지 않는지, 요청이 초기 방문 또는 후속 탐색의 일부인지 여부에 따라 변경됩니다. 사용 사례에 따라 개별 경로 및 데이터 요청에 대한 캐싱 동작을 구성할 수 있습니다.

## 메모화 요청

React는 [`fetch` API](https://nextjs.org/docs/14/app/building-your-application/#fetch) URL과 옵션이 동일한 요청을 자동으로 **메모합니다**. 즉, React 컴포넌트 트리의 여러 위치에서 동일한 데이터에 대해 한 번만 실행하면서 fetch 함수를 호출할 수 있습니다.

![중복 제거된 가져오기 요청](https://nextjs.org/_next/image?url=https%3A%2F%2Fh8DxKfmAPhn8O0p3.public.blob.vercel-storage.com%2Fdocs%2Flight%2Fdeduplicated-fetch-requests.png&w=1920&q=75)

중복 제거된 가져오기 요청

예를 들어, 경로(예: 레이아웃, 페이지 및 여러 구성 요소)에서 동일한 데이터를 사용해야 하는 경우 트리 맨 위에 있는 데이터를 가져오고 구성 요소 간에 props를 전달할 필요가 없습니다. 대신 동일한 데이터에 대해 네트워크를 통해 여러 요청을 수행할 때 성능에 미치는 영향에 대해 걱정할 필요 없이 필요한 구성 요소에서 데이터를 가져올 수 있습니다.

app/example.tsx

```
async function getItem() {

  // The \`fetch\` function is automatically memoized and the result

  // is cached

  const res = await fetch('https://.../item/1')

  return res.json()

}

 

// This function is called twice, but only executed the first time

const item = await getItem() // cache MISS

 

// The second call could be anywhere in your route

const item = await getItem() // cache HIT
```

**How Request Memoization Works**

![Diagram showing how fetch memoization works during React rendering.](https://nextjs.org/_next/image?url=https%3A%2F%2Fh8DxKfmAPhn8O0p3.public.blob.vercel-storage.com%2Fdocs%2Flight%2Frequest-memoization.png&w=1920&q=75)

Diagram showing how fetch memoization works during React rendering.

- While rendering a route, the first time a particular request is called, its result will not be in memory and it'll be a cache .`MISS`
- Therefore, the function will be executed, and the data will be fetched from the external source, and the result will be stored in memory.
- Subsequent function calls of the request in the same render pass will be a cache , and the data will be returned from memory without executing the function.`HIT`
- Once the route has been rendered and the rendering pass is complete, memory is "reset" and all request memoization entries are cleared.

> **Good to know**:
> 
> - Request memoization is a React feature, not a Next.js feature. It's included here to show how it interacts with the other caching mechanisms.
> - Memoization only applies to the method in requests.`GET` `fetch`
> - Memoization only applies to the React Component tree, this means:
> 	- It applies to requests in , , Layouts, Pages, and other Server Components.`fetch` `generateMetadata` `generateStaticParams`
> 	- It doesn't apply to requests in Route Handlers as they are not a part of the React component tree.`fetch`
> - For cases where is not suitable (e.g. some database clients, CMS clients, or GraphQL clients), you can use the `fetch` [React function `cache`](https://nextjs.org/docs/14/app/building-your-application/#react-cache-function) to memoize functions.

### Duration

캐시는 React 컴포넌트 트리가 렌더링을 완료할 때까지 서버 요청의 수명 동안 지속됩니다.

### 재검증

메모화는 서버 요청 간에 공유되지 않고 렌더링 중에만 적용되므로 다시 검증할 필요가 없습니다.

### 옵트아웃

메모화는 요청의 메서드에만 적용되며 와 같은 다른 메서드는 메모화되지 않습니다. 이 기본 동작은 React 최적화이며 옵트아웃하지 않는 것이 좋습니다.`GET` `fetch` `POST` `DELETE`

개별 요청을 관리하려면 [`signal`](https://developer.mozilla.org/en-US/docs/Web/API/AbortController/signal) 속성 시작 [`AbortController`](https://developer.mozilla.org/en-US/docs/Web/API/AbortController). 그러나 이렇게 하면 메모화에서 요청을 옵트아웃하는 것이 아니라 진행 중 요청을 중단합니다.

앱/example.js

```
const { signal } = new AbortController()

fetch(url, { signal })
```

## 데이터 캐시

Next.js에는 들어오는 **서버 요청** 및 배포에서 데이터 가져오기 결과를 **유지하는** 기본 제공 데이터 캐시 **가** 있습니다. 이는 서버의 각 요청이 자체 영구 캐싱 의미 체계를 설정할 수 있도록 Next.js 네이티브 API를 확장하기 때문에 가능합니다.`fetch`

> **알아두면 좋은 정보**: 브라우저에서 의 옵션은 요청이 브라우저의 HTTP 캐시와 상호 작용하는 방식을 나타내고, Next.js 경우 옵션은 서버 측 요청이 서버의 데이터 캐시와 상호 작용하는 방식을 나타냅니다.`cache` `fetch` `cache`

기본적으로 를 사용하는 데이터 요청은 **캐시됩니다**. `fetch` [`cache`](https://nextjs.org/docs/14/app/building-your-application/#fetch-optionscache) 그리고 [`next.revalidate`](https://nextjs.org/docs/14/app/building-your-application/#fetch-optionsnextrevalidate) 의 옵션을 사용하여 캐싱 동작을 구성할 수 있습니다.`fetch`

**데이터 캐시 작동 방식**

![캐시된 가져오기 요청과 캐시되지 않은 가져오기 요청이 데이터 캐시와 상호 작용하는 방식을 보여주는 다이어그램입니다. 캐시된 요청은 데이터 캐시에 저장되며, 캐시되지 않은 메모된 요청은 데이터 캐시에 저장되지 않고 데이터 소스에서 가져와 메모됩니다.](https://nextjs.org/_next/image?url=https%3A%2F%2Fh8DxKfmAPhn8O0p3.public.blob.vercel-storage.com%2Fdocs%2Flight%2Fdata-cache.png&w=1920&q=75)

캐시된 가져오기 요청과 캐시되지 않은 가져오기 요청이 데이터 캐시와 상호 작용하는 방식을 보여주는 다이어그램입니다. 캐시된 요청은 데이터 캐시에 저장되며, 캐시되지 않은 메모된 요청은 데이터 캐시에 저장되지 않고 데이터 소스에서 가져와 메모됩니다.

- 렌더링 중에 요청이 처음 호출되면 Next.js 데이터 캐시에서 캐시된 응답을 확인합니다.`fetch`
- 캐시된 응답이 발견되면 즉시 반환되고 [메모됩니다](https://nextjs.org/docs/14/app/building-your-application/#request-memoization).
- 캐시된 응답을 찾을 수 없는 경우 데이터 원본에 요청이 이루어지고 결과가 데이터 캐시에 저장되고 메모화됩니다.
- 캐시되지 않은 데이터 (예: )의 경우 결과는 항상 데이터 소스에서 가져와 메모 처리됩니다.`{ cache: 'no-store' }`
- 데이터가 캐시되었든 캐시되지 않았든 React 렌더 패스 중에 동일한 데이터에 대한 중복 요청을 하지 않도록 요청은 항상 메모됩니다.

> **데이터 캐시와 요청 메모화의 차이점**
> 
> 두 캐싱 메커니즘 모두 캐시된 데이터를 재사용하여 성능을 향상시키는 데 도움이 되지만 데이터 캐시는 들어오는 요청 및 배포에서 지속되는 반면 메모화는 요청의 수명 동안만 지속됩니다.
> 
> 메모화를 사용하면 렌더링 서버에서 데이터 캐시 서버(예: CDN 또는 에지 네트워크) 또는 데이터 소스(예: 데이터베이스 또는 CMS)로 네트워크 경계를 넘어야 하는 동일한 렌더 패스의 **중복** 요청 수를 줄일 수 있습니다. 데이터 캐시를 사용하면 원본 데이터 소스에 대한 요청 수를 줄일 수 있습니다.

### 기간

데이터 캐시는 재검증하거나 옵트아웃하지 않는 한 들어오는 요청 및 배포에서 지속됩니다.

### 재검증

캐시된 데이터는 다음과 같은 두 가지 방법으로 다시 유효성을 검사할 수 있습니다.

- **시간 기반 재검증**: 일정 시간이 경과하고 새 요청이 이루어진 후 데이터의 유효성을 재검증합니다. 이는 자주 변경되지 않고 새로 고침이 중요하지 않은 데이터에 유용합니다.
- **주문형 재검증:** 이벤트(예: 양식 제출)를 기반으로 데이터의 유효성을 다시 검사합니다. 온디맨드 재검증은 태그 기반 또는 경로 기반 접근 방식을 사용하여 데이터 그룹을 한 번에 재검증할 수 있습니다. 이는 가능한 한 빨리 최신 데이터를 표시하려는 경우(예: 헤드리스 CMS의 콘텐츠가 업데이트되는 경우)에 유용합니다.

#### 시간 기반 재검증

시간 간격으로 데이터의 유효성을 다시 검사하려면 옵션을 사용하여 리소스의 캐시 수명(초)을 설정할 수 있습니다.`next.revalidate` `fetch`

```
// Revalidate at most every hour

fetch('https://...', { next: { revalidate: 3600 } })
```

또는 [Route Segment Config 옵션을](https://nextjs.org/docs/14/app/building-your-application/#segment-config-options) 사용하여 세그먼트의 모든 요청을 구성하거나 사용할 수 없는 경우에 사용할 수 있습니다.`fetch` `fetch`

**시간 기반 재검증의 작동 방식**

![시간 기반 재유효성 검사가 작동하는 방식을 보여주는 다이어그램으로, 재유효성 검사 기간 후에 첫 번째 요청에 대해 부실 데이터가 반환된 다음 데이터가 다시 유효성이 검사됩니다.](https://nextjs.org/_next/image?url=https%3A%2F%2Fh8DxKfmAPhn8O0p3.public.blob.vercel-storage.com%2Fdocs%2Flight%2Ftime-based-revalidation.png&w=1920&q=75)

시간 기반 재유효성 검사가 작동하는 방식을 보여주는 다이어그램으로, 재유효성 검사 기간 후에 첫 번째 요청에 대해 부실 데이터가 반환된 다음 데이터가 다시 유효성이 검사됩니다.

- 가져오기 요청이 처음 호출되면 외부 데이터 소스에서 데이터를 가져와 데이터 캐시에 저장합니다.`revalidate`
- 지정된 기간(예: 60초) 내에 호출된 모든 요청은 캐시된 데이터를 반환합니다.
- 기간이 지난 후에도 다음 요청은 여전히 캐시된(현재 부실한) 데이터를 반환합니다.
	- Next.js 백그라운드에서 데이터의 재유효성 검사를 트리거합니다.
	- 데이터를 성공적으로 가져오면 Next.js 새 데이터로 데이터 캐시를 업데이트합니다.
	- 백그라운드 재검증이 실패하면 이전 데이터는 변경되지 않은 상태로 유지됩니다.

이것은 다음과 유사합니다. [**부실 재검증**](https://web.dev/stale-while-revalidate/) 행동.

#### 온디맨드 재검증

데이터는 경로([`revalidatePath`](https://nextjs.org/docs/14/app/building-your-application/#revalidatepath)) 또는 캐시 태그([`revalidateTag`](https://nextjs.org/docs/14/app/building-your-application/#fetch-optionsnexttags-and-revalidatetag)).

**온디맨드 재검증 작동 방식**

![주문형 재검증이 작동하는 방식을 보여주는 다이어그램으로, 데이터 캐시는 재검증 요청 후 새로운 데이터로 업데이트됩니다.](https://nextjs.org/_next/image?url=https%3A%2F%2Fh8DxKfmAPhn8O0p3.public.blob.vercel-storage.com%2Fdocs%2Flight%2Fon-demand-revalidation.png&w=1920&q=75)

주문형 재검증이 작동하는 방식을 보여주는 다이어그램으로, 데이터 캐시는 재검증 요청 후 새로운 데이터로 업데이트됩니다.

- 요청이 처음 호출되면 외부 데이터 원본에서 데이터를 가져와 데이터 캐시에 저장합니다.`fetch`
- When an on-demand revalidation is triggered, the appropriate cache entries will be purged from the cache.
	- 이는 새 데이터를 가져올 때까지 오래된 데이터를 캐시에 보관하는 시간 기반 재검증과 다릅니다.
- 다음에 요청이 이루어지면 다시 캐시가 되고 데이터는 외부 데이터 소스에서 가져와 데이터 캐시에 저장됩니다.`MISS`

### 옵트아웃

개별 데이터 가져오기의 경우 [`cache`](https://nextjs.org/docs/14/app/building-your-application/#fetch-optionscache) 옵션을 에 추가합니다. 이는 호출될 때마다 데이터를 가져오는 것을 의미합니다.`no-store` `fetch`

```
// Opt out of caching for an individual \`fetch\` request

fetch(\`https://...\`, { cache: 'no-store' })
```

또는 [경로 세그먼트 구성 옵션을](https://nextjs.org/docs/14/app/building-your-application/#segment-config-options) 사용하여 특정 경로 세그먼트에 대한 캐싱을 옵트아웃할 수도 있습니다. 이는 타사 라이브러리를 포함하여 경로 세그먼트의 모든 데이터 요청에 영향을 미칩니다.

```
// Opt out of caching for all data requests in the route segment

export const dynamic = 'force-dynamic'
```

> **참고**: 데이터 캐시는 현재 미들웨어가 아닌 페이지/경로에서만 사용할 수 있습니다. 미들웨어 내부에서 수행된 모든 가져오기는 기본적으로 캐시 해제됩니다.

> **Vercel 데이터 캐시**
> 
> Next.js 애플리케이션이 Vercel에 배포된 경우 [Vercel 데이터 캐시](https://vercel.com/docs/infrastructure/data-cache) Vercel 특정 기능을 더 잘 이해하기 위한 문서입니다.

## 전체 경로 캐시

> **관련 용어**:
> 
> **자동 정적 최적화**, **정적 사이트 생성** 또는 **정적 렌더링** 이라는 용어는 빌드 시 애플리케이션의 렌더링 및 캐싱 경로를 나타내는 프로세스를 의미하기 위해 같은 의미로 사용되는 것을 볼 수 있습니다.

Next.js 빌드 시 경로를 자동으로 렌더링하고 캐시합니다. 이는 모든 요청에 대해 서버에서 렌더링하는 대신 캐시된 경로를 제공하여 페이지 로드 속도를 높일 수 있는 최적화입니다.

전체 경로 캐시가 어떻게 작동하는지 이해하려면 React가 렌더링을 처리하는 방법과 Next.js 결과를 캐시하는 방법을 살펴보는 것이 도움이 됩니다.

### 1\. 서버에서 React 렌더링

서버에서 Next.js는 React의 API를 사용하여 렌더링을 오케스트레이션합니다. 렌더링 작업은 개별 경로 세그먼트 및 서스펜스 경계에 따라 청크로 분할됩니다.

각 청크는 두 단계로 렌더링됩니다.

1. React는 서버 구성 요소를 **React Server Component Payload** 라고 하는 스트리밍에 최적화된 특수 데이터 형식으로 렌더링합니다.
2. Next.js React Server Component Payload 및 Client Component JavaScript 지침을 사용하여 서버에서 **HTML** 을 렌더링합니다.

즉, 작업을 캐싱하거나 응답을 보내기 전에 모든 것이 렌더링될 때까지 기다릴 필요가 없습니다. 대신 작업이 완료되면 응답을 스트리밍할 수 있습니다.

> **React 서버 구성 요소 페이로드란 무엇입니까?**
> 
> React Server Component Payload는 렌더링된 React Server Components 트리의 간결한 바이너리 표현입니다. 클라이언트의 React에서 브라우저의 DOM을 업데이트하는 데 사용됩니다. React Server Component 페이로드에는 다음이 포함됩니다.
> 
> - 서버 구성 요소의 렌더링된 결과
> - 클라이언트 컴포넌트를 렌더링해야 하는 위치에 대한 자리 표시자 및 해당 JavaScript 파일에 대한 참조
> - 서버 컴포넌트에서 클라이언트 컴포넌트로 전달되는 모든 소품
> 
> 자세한 내용은 [서버 구성 요소](https://nextjs.org/docs/14/app/building-your-application/rendering/server-components) 설명서를 참조하십시오.

### 2\. 서버에서 Next.js 캐싱(전체 경로 캐시)

![정적으로 렌더링된 경로를 위해 React Server Component Payload 및 HTML이 서버에 캐시되는 방법을 보여주는 Full Route Cache의 기본 동작입니다.](https://nextjs.org/_next/image?url=https%3A%2F%2Fh8DxKfmAPhn8O0p3.public.blob.vercel-storage.com%2Fdocs%2Flight%2Ffull-route-cache.png&w=1920&q=75)

정적으로 렌더링된 경로를 위해 React Server Component Payload 및 HTML이 서버에 캐시되는 방법을 보여주는 Full Route Cache의 기본 동작입니다.

The default behavior of Next.js is to cache the rendered result (React Server Component Payload and HTML) of a route on the server. This applies to statically rendered routes at build time, or during revalidation.

### 3\. React Hydration and Reconciliation on the Client

At request time, on the client:

1. The HTML is used to immediately show a fast non-interactive initial preview of the Client and Server Components.
2. The React Server Components Payload is used to reconcile the Client and rendered Server Component trees, and update the DOM.
3. The JavaScript instructions are used to [hydrate](https://react.dev/reference/react-dom/client/hydrateRoot) Client Components and make the application interactive.

### 4\. Next.js Caching on the Client (Router Cache)

The React Server Component Payload is stored in the client-side [Router Cache](https://nextjs.org/docs/14/app/building-your-application/#router-cache) - a separate in-memory cache, split by individual route segment. This Router Cache is used to improve the navigation experience by storing previously visited routes and prefetching future routes.

### 5\. Subsequent Navigations

On subsequent navigations or during prefetching, Next.js will check if the React Server Components Payload is stored in the Router Cache. If so, it will skip sending a new request to the server.

If the route segments are not in the cache, Next.js will fetch the React Server Components Payload from the server, and populate the Router Cache on the client.

### Static and Dynamic Rendering

Whether a route is cached or not at build time depends on whether it's statically or dynamically rendered. Static routes are cached by default, whereas dynamic routes are rendered at request time, and not cached.

This diagram shows the difference between statically and dynamically rendered routes, with cached and uncached data:

![How static and dynamic rendering affects the Full Route Cache. Static routes are cached at build time or after data revalidation, whereas dynamic routes are never cached](https://nextjs.org/_next/image?url=https%3A%2F%2Fh8DxKfmAPhn8O0p3.public.blob.vercel-storage.com%2Fdocs%2Flight%2Fstatic-and-dynamic-routes.png&w=1920&q=75)

How static and dynamic rendering affects the Full Route Cache. Static routes are cached at build time or after data revalidation, whereas dynamic routes are never cached

Learn more about [static and dynamic rendering](https://nextjs.org/docs/14/app/building-your-application/rendering/server-components#server-rendering-strategies).

### Duration

By default, the Full Route Cache is persistent. This means that the render output is cached across user requests.

### Invalidation

There are two ways you can invalidate the Full Route Cache:

- **[Revalidating Data](https://nextjs.org/docs/14/app/building-your-application/caching#revalidating)**: Revalidating the [Data Cache](https://nextjs.org/docs/14/app/building-your-application/#data-cache), will in turn invalidate the Router Cache by re-rendering components on the server and caching the new render output.
- **Redeploying**: Unlike the Data Cache, which persists across deployments, the Full Route Cache is cleared on new deployments.

### Opting out

You can opt out of the Full Route Cache, or in other words, dynamically render components for every incoming request, by:

- **Using a [Dynamic Function](https://nextjs.org/docs/14/app/building-your-application/#dynamic-functions)**: This will opt the route out from the Full Route Cache and dynamically render it at request time. The Data Cache can still be used.
- **Using the or route segment config options `dynamic = 'force-dynamic'` `revalidate = 0`**: This will skip the Full Route Cache and the Data Cache. Meaning components will be rendered and data fetched on every incoming request to the server. The Router Cache will still apply as it's a client-side cache.
- **Opting out of the [Data Cache](https://nextjs.org/docs/14/app/building-your-application/#data-cache)**: If a route has a request that is not cached, this will opt the route out of the Full Route Cache. The data for the specific request will be fetched for every incoming request. Other requests that do not opt out of caching will still be cached in the Data Cache. This allows for a hybrid of cached and uncached data.`fetch` `fetch` `fetch`

## Router Cache

> **Related Terms:**
> 
> You may see the Router Cache being referred to as **Client-side Cache** or **Prefetch Cache**. While **Prefetch Cache** refers to the prefetched route segments, **Client-side Cache** refers to the whole Router cache, which includes both visited and prefetched segments. This cache specifically applies to Next.js and Server Components, and is different to the browser's [bfcache](https://web.dev/bfcache/), though it has a similar result.

Next.js has an in-memory client-side cache that stores the React Server Component Payload, split by individual route segments, for the duration of a user session. This is called the Router Cache.

**How the Router Cache Works**

![How the Router cache works for static and dynamic routes, showing MISS and HIT for initial and subsequent navigations.](https://nextjs.org/_next/image?url=https%3A%2F%2Fh8DxKfmAPhn8O0p3.public.blob.vercel-storage.com%2Fdocs%2Flight%2Frouter-cache.png&w=1920&q=75)

How the Router cache works for static and dynamic routes, showing MISS and HIT for initial and subsequent navigations.

As a user navigates between routes, Next.js caches visited route segments and [prefetches](https://nextjs.org/docs/14/app/building-your-application/routing/linking-and-navigating#2-prefetching) the routes the user is likely to navigate to (based on components in their viewport).`<Link>`

This results in an improved navigation experience for the user:

- Instant backward/forward navigation because visited routes are cached and fast navigation to new routes because of prefetching and [partial rendering](https://nextjs.org/docs/14/app/building-your-application/routing/linking-and-navigating#4-partial-rendering).
- No full-page reload between navigations, and React state and browser state are preserved.

> **Difference between the Router Cache and Full Route Cache**:
> 
> The Router Cache temporarily stores the React Server Component Payload in the browser for the duration of a user session, whereas the Full Route Cache persistently stores the React Server Component Payload and HTML on the server across multiple user requests.
> 
> While the Full Route Cache only caches statically rendered routes, the Router Cache applies to both statically and dynamically rendered routes.

### 기간

캐시는 브라우저의 임시 메모리에 저장됩니다. 라우터 캐시가 지속되는 기간을 결정하는 두 가지 요소:

- **세션**: 캐시는 탐색 전반에 걸쳐 유지됩니다. 그러나 페이지 새로 고침 시 지워집니다.
- **자동 무효화 기간**: 레이아웃 및 로드 상태의 캐시는 특정 시간이 지나면 자동으로 무효화됩니다. 기간은 리소스가 [미리 가져온](https://nextjs.org/docs/14/app/api-reference/components/link#prefetch) 방법과 리소스가 [정적으로 생성](https://nextjs.org/docs/14/app/building-your-application/rendering/server-components#static-rendering-default) 되었는지 여부에 따라 다릅니다.
	- **기본 프리페치** ( 또는 지정되지 않음): 동적 페이지의 경우 캐시되지 않음, 정적 페이지의 경우 5분.`prefetch={null}`
	- **전체 프리페치** ( 또는 ): 정적 및 동적 페이지 모두에 대해 5분.`prefetch={true}` `router.prefetch`

페이지를 새로 고치면 캐시된 **모든** 세그먼트가 지워지지만 자동 무효화 기간은 프리페치 시점의 개별 세그먼트에만 영향을 미칩니다.

> **알아두면 좋은 정보**: 실험적인 [`staleTimes`](https://nextjs.org/docs/14/app/api-reference/next-config-js/staleTimes) config 옵션을 사용하여 위에서 언급한 자동 무효화 시간을 조정할 수 있습니다.

### 무효로 함

라우터 캐시를 무효화할 수 있는 두 가지 방법이 있습니다.

- **서버 작업** 에서:
	- ([`revalidatePath`](https://nextjs.org/docs/14/app/api-reference/functions/revalidatePath)) 또는 캐시 태그([`revalidateTag`](https://nextjs.org/docs/14/app/api-reference/functions/revalidateTag))
	- 사용 [`cookies.set`](https://nextjs.org/docs/14/app/api-reference/functions/cookies#cookiessetname-value-options) 또는 [`cookies.delete`](https://nextjs.org/docs/14/app/api-reference/functions/cookies#deleting-cookies) 쿠키를 사용하는 경로가 부실해지는 것을 방지하기 위해 라우터 캐시를 무효화합니다(예: 인증).
- 부름 [`router.refresh`](https://nextjs.org/docs/14/app/api-reference/functions/use-router) 라우터 캐시를 무효화하고 현재 경로에 대해 서버에 새 요청을 합니다.

### 옵트아웃

라우터 캐시를 옵트아웃할 수 없습니다. 그러나 [`router.refresh`](https://nextjs.org/docs/14/app/api-reference/functions/use-router), [`revalidatePath`](https://nextjs.org/docs/14/app/api-reference/functions/revalidatePath) 또는 [`revalidateTag`](https://nextjs.org/docs/14/app/api-reference/functions/revalidateTag) (위 참조). 이렇게 하면 캐시가 지워지고 서버에 새 요청이 이루어지므로 최신 데이터가 표시됩니다.

구성 요소의 prop을 로 설정하여 **프리페치** 를 옵트아웃할 수도 있습니다. 그러나 탭 표시줄과 같은 중첩된 세그먼트 간에 즉각적인 탐색을 허용하기 위해 30초 동안 경로 세그먼트를 일시적으로 저장하거나 앞뒤로 탐색할 수 있습니다. 방문한 경로는 계속 캐시됩니다.`prefetch` `<Link>` `false`

다양한 캐싱 메커니즘을 구성할 때 서로 상호 작용하는 방식을 이해하는 것이 중요합니다.

### 데이터 캐시 및 전체 경로 캐시

- 데이터 캐시의 유효성을 다시 검증하거나 옵트아웃하면 렌더 출력이 데이터에 따라 달라지므로 전체 경로 캐시가 무효화됩니다.
- 전체 경로 캐시를 무효화하거나 옵트아웃해도 데이터 캐시에는 영향을 **주지 않습니다**. 캐시된 데이터와 캐시되지 않은 데이터가 모두 있는 경로를 동적으로 렌더링할 수 있습니다. 이는 대부분의 페이지에서 캐시된 데이터를 사용하지만 요청 시 가져와야 하는 데이터에 의존하는 몇 가지 구성 요소가 있는 경우에 유용합니다. 모든 데이터를 다시 가져올 때 성능에 미치는 영향에 대해 걱정하지 않고 동적으로 렌더링할 수 있습니다.

### 데이터 캐시 및 클라이언트 측 라우터 캐시

- [경로 처리기](https://nextjs.org/docs/14/app/building-your-application/routing/route-handlers) 에서 데이터 캐시의 유효성을 다시 검사해도 경로 처리기가 특정 경로에 연결되어 있지 않으므로 라우터 캐시가 즉시 무효화 **되지 않습니다**. 즉, 라우터 캐시는 하드 새로 고침 또는 자동 무효화 기간이 경과할 때까지 이전 페이로드를 계속 제공합니다.
- 데이터 캐시 및 라우터 캐시를 즉시 무효화하려면 [`revalidatePath`](https://nextjs.org/docs/14/app/building-your-application/#revalidatepath) 또는 [`revalidateTag`](https://nextjs.org/docs/14/app/building-your-application/#fetch-optionsnexttags-and-revalidatetag) [서버 작업](https://nextjs.org/docs/14/app/building-your-application/data-fetching/server-actions-and-mutations) 에서.

## APIs

The following table provides an overview of how different Next.js APIs affect caching:

### <Link>

By default, the component automatically prefetches routes from the Full Route Cache and adds the React Server Component Payload to the Router Cache.`<Link>`

To disable prefetching, you can set the prop to . But this will not skip the cache permanently, the route segment will still be cached client-side when the user visits the route.`prefetch` `false`

Learn more about the [`<Link>` component](https://nextjs.org/docs/14/app/api-reference/components/link).

### router.prefetch

The option of the hook can be used to manually prefetch a route. This adds the React Server Component Payload to the Router Cache.`prefetch` `useRouter`

See the [`useRouter` hook](https://nextjs.org/docs/14/app/api-reference/functions/use-router) API reference.

### router.refresh

The option of the hook can be used to manually refresh a route. This completely clears the Router Cache, and makes a new request to the server for the current route. does not affect the Data or Full Route Cache.`refresh` `useRouter` `refresh`

The rendered result will be reconciled on the client while preserving React state and browser state.

See the [`useRouter` hook](https://nextjs.org/docs/14/app/api-reference/functions/use-router) API reference.

### fetch

Data returned from is automatically cached in the Data Cache.`fetch`

```
// Cached by default. \`force-cache\` is the default option and can be omitted.

fetch(\`https://...\`, { cache: 'force-cache' })
```

See the [`fetch` API Reference](https://nextjs.org/docs/14/app/api-reference/functions/fetch) for more options.

### fetch options.cache

You can opt out individual requests of data caching by setting the option to :`fetch` `cache` `no-store`

```
// Opt out of caching

fetch(\`https://...\`, { cache: 'no-store' })
```

Since the render output depends on data, using will also skip the Full Route Cache for the route where the request is used. That is, the route will be dynamically rendered every request, but you can still have other cached data requests in the same route.`cache: 'no-store'` `fetch`

See the [`fetch` API Reference](https://nextjs.org/docs/14/app/api-reference/functions/fetch) for more options.

### fetch options.next.revalidate

You can use the option of to set the revalidation period (in seconds) of an individual request. This will revalidate the Data Cache, which in turn will revalidate the Full Route Cache. Fresh data will be fetched, and components will be re-rendered on the server.`next.revalidate` `fetch` `fetch`

```
// Revalidate at most after 1 hour

fetch(\`https://...\`, { next: { revalidate: 3600 } })
```

See the [`fetch` API reference](https://nextjs.org/docs/14/app/api-reference/functions/fetch) for more options.

### fetch options.next.tags and revalidateTag

Next.js has a cache tagging system for fine-grained data caching and revalidation.

1. When using or `fetch` [`unstable_cache`](https://nextjs.org/docs/14/app/api-reference/functions/unstable_cache), you have the option to tag cache entries with one or more tags.
2. Then, you can call to purge the cache entries associated with that tag.`revalidateTag`

For example, you can set a tag when fetching data:

```
// Cache data with a tag

fetch(\`https://...\`, { next: { tags: ['a', 'b', 'c'] } })
```

Then, call with a tag to purge the cache entry:`revalidateTag`

```
// Revalidate entries with a specific tag

revalidateTag('a')
```

There are two places you can use , depending on what you're trying to achieve:`revalidateTag`

1. [Route Handlers](https://nextjs.org/docs/14/app/building-your-application/routing/route-handlers) - to revalidate data in response of a third party event (e.g. webhook). This will not invalidate the Router Cache immediately as the Router Handler isn't tied to a specific route.
2. [Server Actions](https://nextjs.org/docs/14/app/building-your-application/data-fetching/server-actions-and-mutations) - to revalidate data after a user action (e.g. form submission). This will invalidate the Router Cache for the associated route.

### revalidatePath

`revalidatePath` allows you manually revalidate data **and** re-render the route segments below a specific path in a single operation. Calling the method revalidates the Data Cache, which in turn invalidates the Full Route Cache.`revalidatePath`

```
revalidatePath('/')
```

There are two places you can use , depending on what you're trying to achieve:`revalidatePath`

1. [Route Handlers](https://nextjs.org/docs/14/app/building-your-application/routing/route-handlers) - to revalidate data in response to a third party event (e.g. webhook).
2. [Server Actions](https://nextjs.org/docs/14/app/building-your-application/data-fetching/server-actions-and-mutations) - to revalidate data after a user interaction (e.g. form submission, clicking a button).

See the [`revalidatePath` API reference](https://nextjs.org/docs/14/app/api-reference/functions/revalidatePath) for more information.

> **`revalidatePath`** vs. **`router.refresh`**:
> 
> Calling will clear the Router cache, and re-render route segments on the server without invalidating the Data Cache or the Full Route Cache.`router.refresh`
> 
> The difference is that purges the Data Cache and Full Route Cache, whereas does not change the Data Cache and Full Route Cache, as it is a client-side API.`revalidatePath` `router.refresh()`

### Dynamic Functions

Dynamic functions like and , and the prop in Pages depend on runtime incoming request information. Using them will opt a route out of the Full Route Cache, in other words, the route will be dynamically rendered.`cookies` `headers` `searchParams`

#### cookies

Using or in a Server Action invalidates the Router Cache to prevent routes that use cookies from becoming stale (e.g. to reflect authentication changes).`cookies.set` `cookies.delete`

See the [`cookies`](https://nextjs.org/docs/14/app/api-reference/functions/cookies) API reference.

### Segment Config Options

경로 세그먼트 구성 옵션을 사용하여 경로 세그먼트 기본값을 재정의하거나 API(예: 데이터베이스 클라이언트 또는 타사 라이브러리)를 사용할 수 없는 경우에 사용할 수 있습니다.`fetch`

다음 경로 세그먼트 구성 옵션은 데이터 캐시 및 전체 경로 캐시를 옵트아웃합니다.

- `const dynamic = 'force-dynamic'`
- `const revalidate = 0`

자세한 옵션은 [경로 세그먼트 구성](https://nextjs.org/docs/14/app/api-reference/file-conventions/route-segment-config) 설명서를 참조하십시오.

### generateStaticParams

[동적 세그먼트](https://nextjs.org/docs/14/app/building-your-application/routing/dynamic-routes) (예: )의 경우 에서 제공하는 경로는 빌드 시 전체 경로 캐시에 캐시됩니다. 요청 시 Next.js 처음 방문할 때 빌드 시 알려지지 않은 경로도 캐시합니다.`app/blog/[slug]/page.js` `generateStaticParams`

경로 세그먼트에서 옵션을 사용하여 요청 시 캐싱을 비활성화할 수 있습니다. 이 구성 옵션을 사용하면 에서 제공하는 경로만 제공되고 다른 경로는 404 또는 일치합니다([포괄적 경로](https://nextjs.org/docs/14/app/building-your-application/routing/dynamic-routes#catch-all-segments) 의 경우).`export const dynamicParams = false` `generateStaticParams`

참조 [`generateStaticParams` API 참조](https://nextjs.org/docs/14/app/api-reference/functions/generate-static-params).

### React 함수cache

React 함수를 사용하면 함수의 반환 값을 메모할 수 있으므로 동일한 함수를 한 번만 실행하면서 여러 번 호출할 수 있습니다.`cache`

요청은 자동으로 메모화되므로 React로 래핑할 필요가 없습니다. 그러나 API가 적합하지 않은 경우 사용 사례에 대한 데이터 요청을 수동으로 메모하는 데 사용할 수 있습니다. 예를 들어 일부 데이터베이스 클라이언트, CMS 클라이언트 또는 GraphQL 클라이언트가 있습니다.`fetch` `cache` `cache` `fetch`

유틸리티/get-item.ts

```
import { cache } from 'react'

import db from '@/lib/db'

 

export const getItem = cache(async (id: string) => {

  const item = await db.item.findUnique({ id })

  return item

})
```