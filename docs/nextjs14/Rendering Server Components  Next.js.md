---
title: "Rendering: Server Components | Next.js"
source: "https://nextjs.org/docs/14/app/building-your-application/rendering/server-components"
author:
  - "[[Vercel]]"
published:
created: 2025-09-16
description: "Learn how you can use React Server Components to render parts of your application on the server."
tags:
  - "clippings"
---
[애플리케이션 빌드](https://nextjs.org/docs/14/app/building-your-application) [렌더링](https://nextjs.org/docs/14/app/building-your-application/rendering) 서버 구성 요소

## 서버 구성 요소

React Server Components를 사용하면 서버에서 렌더링하고 선택적으로 캐시할 수 있는 UI를 작성할 수 있습니다. Next.js에서는 렌더링 작업이 경로 세그먼트별로 추가로 분할되어 스트리밍 및 부분 렌더링을 사용할 수 있으며 세 가지 서버 렌더링 전략이 있습니다.

- [스태틱 렌더링](https://nextjs.org/docs/14/app/building-your-application/rendering/#static-rendering-default)
- [동적 렌더링](https://nextjs.org/docs/14/app/building-your-application/rendering/#dynamic-rendering)
- [스트리밍](https://nextjs.org/docs/14/app/building-your-application/rendering/#streaming)

이 페이지에서는 서버 컴포넌트의 작동 방식, 사용 시기 및 다양한 서버 렌더링 전략에 대해 설명합니다.

## 서버 렌더링의 이점

서버에서 렌더링 작업을 수행하면 다음과 같은 몇 가지 이점이 있습니다.

- **데이터 가져오기**: 서버 구성 요소를 사용하면 데이터 가져오기를 데이터 소스에 더 가까운 서버로 이동할 수 있습니다. 이렇게 하면 렌더링에 필요한 데이터를 가져오는 데 걸리는 시간과 클라이언트가 수행해야 하는 요청 수를 줄여 성능을 향상시킬 수 있습니다.
- **보안**: 서버 구성 요소를 사용하면 토큰 및 API 키와 같은 민감한 데이터 및 로직을 클라이언트에 노출할 위험 없이 서버에 보관할 수 있습니다.
- **캐싱**: 서버에서 렌더링하면 결과를 캐시하고 후속 요청 및 사용자 간에 재사용할 수 있습니다. 이렇게 하면 각 요청에서 수행되는 렌더링 및 데이터 가져오기의 양을 줄여 성능을 향상시키고 비용을 절감할 수 있습니다.
- **성능**: 서버 구성 요소는 기준선에서 성능을 최적화할 수 있는 추가 도구를 제공합니다. 예를 들어 완전히 클라이언트 구성 요소로 구성된 앱으로 시작하는 경우 UI의 비대화형 부분을 서버 구성 요소로 이동하면 필요한 클라이언트 측 JavaScript의 양을 줄일 수 있습니다. 이는 브라우저에 다운로드, 구문 분석 및 실행할 클라이언트 측 JavaScript가 적기 때문에 인터넷 속도가 느리거나 장치가 덜 강력한 사용자를 사용하는 사용자에게 유용합니다.
- **초기 페이지 로드 및 [퍼스트 콘텐츠 페인트(FCP)](https://web.dev/fcp/)**: 서버에서 HTML을 생성하여 클라이언트가 페이지를 렌더링하는 데 필요한 JavaScript를 다운로드, 구문 분석 및 실행할 때까지 기다리지 않고 사용자가 페이지를 즉시 볼 수 있도록 할 수 있습니다.
- **검색 엔진 최적화 및 소셜 네트워크 공유 가능성**: 렌더링된 HTML은 검색 엔진 봇이 페이지를 색인화하는 데 사용하고 소셜 네트워크 봇이 페이지에 대한 소셜 카드 미리보기를 생성하는 데 사용할 수 있습니다.
- **Streaming**: Server Components를 사용하면 렌더링 작업을 청크로 분할하고 준비가 되면 클라이언트로 스트리밍할 수 있습니다. 이를 통해 사용자는 전체 페이지가 서버에서 렌더링될 때까지 기다릴 필요 없이 페이지의 일부를 더 일찍 볼 수 있습니다.

## Next.js에서 서버 구성 요소 사용

기본적으로 Next.js 서버 구성 요소를 사용합니다. 이렇게 하면 추가 구성 없이 서버 렌더링을 자동으로 구현할 수 있으며 필요한 경우 클라이언트 구성 요소를 사용하도록 선택할 수 있습니다([클라이언트 구성 요소](https://nextjs.org/docs/14/app/building-your-application/rendering/client-components) 참조).

## 서버 컴포넌트는 어떻게 렌더링되나요?

서버에서 Next.js는 React의 API를 사용하여 렌더링을 오케스트레이션합니다. 렌더링 작업은 개별 경로 세그먼트와 [서스펜스 경계](https://react.dev/reference/react/Suspense).

각 청크는 두 단계로 렌더링됩니다.

1. React는 서버 구성 요소를 **RSC 페이로드(React Server Component Payload)** 라는 특수 데이터 형식으로 렌더링합니다.
2. Next.js RSC 페이로드 및 클라이언트 구성 요소 JavaScript 지침을 사용하여 서버에서 **HTML** 을 렌더링합니다.

그런 다음 클라이언트에서 다음을 수행합니다.

1. HTML은 경로의 빠른 비대화형 미리보기를 즉시 표시하는 데 사용되며 이는 초기 페이지 로드에만 사용됩니다.
2. React Server Components Payload는 클라이언트 및 서버 컴포넌트 트리를 조정하고 DOM을 업데이트하는 데 사용됩니다.
3. JavaScript 명령은 다음과 같은 용도로 사용됩니다. [수화물](https://react.dev/reference/react-dom/client/hydrateRoot) 클라이언트 구성 요소를 사용하여 응용 프로그램을 대화형으로 만듭니다.

> **RSC(React Server Component Payload)란 무엇입니까?**
> 
> RSC 페이로드는 렌더링된 React Server 컴포넌트 트리의 컴팩트한 바이너리 표현입니다. 클라이언트의 React에서 브라우저의 DOM을 업데이트하는 데 사용됩니다. RSC 페이로드에는 다음이 포함됩니다.
> 
> - 서버 구성 요소의 렌더링된 결과
> - 클라이언트 컴포넌트를 렌더링해야 하는 위치에 대한 자리 표시자 및 해당 JavaScript 파일에 대한 참조
> - 서버 컴포넌트에서 클라이언트 컴포넌트로 전달되는 모든 소품

## 서버 렌더링 전략

서버 렌더링에는 정적, 동적 및 스트리밍의 세 가지 하위 집합이 있습니다.

### 정적 렌더링(기본값)

정적 렌더링을 사용하면 경로가 **빌드 시** 또는 [데이터 재검증](https://nextjs.org/docs/14/app/building-your-application/data-fetching/fetching-caching-and-revalidating#revalidating-data) 후 백그라운드에서 렌더링됩니다. 결과는 캐시되고 [콘텐츠 전송 네트워크(CDN)](https://developer.mozilla.org/docs/Glossary/CDN). 이 최적화를 통해 사용자와 서버 요청 간에 렌더링 작업 결과를 공유할 수 있습니다.

정적 렌더링은 경로에 사용자에게 개인화되지 않고 정적 블로그 게시물 또는 제품 페이지와 같이 빌드 시 알 수 있는 데이터가 있는 경우에 유용합니다.

### 동적 렌더링

동적 렌더링을 사용하면 **요청 시** 각 사용자에 대해 경로가 렌더링됩니다.

동적 렌더링은 경로에 사용자에게 개인화된 데이터가 있거나 쿠키 또는 URL의 검색 매개변수와 같이 요청 시에만 알 수 있는 정보가 있는 경우에 유용합니다.

> **캐시된 데이터가 있는 동적 경로**
> 
> 대부분의 웹사이트에서 경로는 완전히 정적이거나 완전히 동적이지 않고 스펙트럼입니다. 예를 들어 일정 간격으로 재검증되는 캐시된 제품 데이터를 사용하지만 캐시되지 않은 개인화된 고객 데이터도 있는 전자 상거래 페이지가 있을 수 있습니다.
> 
> Next.js에서는 캐시된 데이터와 캐시되지 않은 데이터가 모두 있는 동적으로 렌더링된 경로를 가질 수 있습니다. 이는 RSC 페이로드와 데이터가 별도로 캐시되기 때문입니다. 이를 통해 요청 시 모든 데이터를 가져올 때 성능에 미치는 영향에 대해 걱정하지 않고 동적 렌더링을 선택할 수 있습니다.
> 
> [전체 경로 캐시](https://nextjs.org/docs/14/app/building-your-application/caching#full-route-cache) 및 [데이터 캐시](https://nextjs.org/docs/14/app/building-your-application/caching#data-cache) 에 대해 자세히 알아보세요.

#### 동적 렌더링으로 전환

렌더링 중에 [동적 함수](https://nextjs.org/docs/14/app/building-your-application/rendering/#dynamic-functions) 또는 [캐시되지 않은 데이터 요청](https://nextjs.org/docs/14/app/building-your-application/data-fetching/fetching-caching-and-revalidating#opting-out-of-data-caching) 이 발견되면 Next.js 전체 경로를 동적으로 렌더링하는 것으로 전환됩니다. 이 표에는 동적 함수와 데이터 캐싱이 경로가 정적으로 렌더링되는지 동적으로 렌더링되는지 여부에 미치는 영향이 요약되어 있습니다.

| 동적 함수 | 데이터 | 경로 |
| --- | --- | --- |
| 아니요 | 캐시 | 스태틱 렌더링 |
| 예 | 캐시 | 다이내믹 렌더링 |
| 아니요 | 캐시되지 않음 | 다이내믹 렌더링 |
| 예 | 캐시되지 않음 | 다이내믹 렌더링 |

위의 표에서 경로가 완전히 정적이려면 모든 데이터를 캐시해야 합니다. 그러나 캐시된 데이터 가져오기와 캐시되지 않은 데이터 가져오기를 모두 사용하는 동적으로 렌더링된 경로를 가질 수 있습니다.

개발자는 사용된 기능과 API를 기반으로 각 경로에 가장 적합한 렌더링 전략을 자동으로 선택하므로 정적 렌더링과 동적 렌더링 중에서 선택할 필요가 Next.js 없습니다. 대신 [특정 데이터를 캐시하거나 다시 검증](https://nextjs.org/docs/14/app/building-your-application/data-fetching/fetching-caching-and-revalidating) 할 시기를 선택하고 UI의 일부를 [스트리밍](https://nextjs.org/docs/14/app/building-your-application/rendering/#streaming) 하도록 선택할 수 있습니다.

#### 동적 함수

동적 함수는 사용자의 쿠키, 현재 요청 헤더 또는 URL의 검색 매개변수와 같이 요청 시에만 알 수 있는 정보에 의존합니다. Next.js에서 이러한 동적 함수는 다음과 같습니다.

- **[`cookies()`](https://nextjs.org/docs/14/app/api-reference/functions/cookies) 그리고 [`headers()`](https://nextjs.org/docs/14/app/api-reference/functions/headers)**: 서버 컴포넌트에서 이를 사용하면 요청 시 전체 경로를 동적 렌더링으로 옵트닝합니다.
- **[`searchParams`](https://nextjs.org/docs/14/app/api-reference/file-conventions/page#searchparams-optional)**: [페이지에서](https://nextjs.org/docs/14/app/api-reference/file-conventions/page) prop을 사용하면 요청 시 페이지가 동적 렌더링으로 옵트닝됩니다.`searchParams`

이러한 함수 중 하나를 사용하면 요청 시 전체 경로를 동적 렌더링으로 옵트닝합니다.

### 스트리밍

![스트리밍 중 경로 세그먼트의 병렬화를 보여주는 다이어그램으로, 개별 청크의 데이터 가져오기, 렌더링 및 하이드레이션을 보여줍니다.](https://nextjs.org/_next/image?url=https%3A%2F%2Fh8DxKfmAPhn8O0p3.public.blob.vercel-storage.com%2Fdocs%2Flight%2Fsequential-parallel-data-fetching.png&w=1920&q=75)

스트리밍 중 경로 세그먼트의 병렬화를 보여주는 다이어그램으로, 개별 청크의 데이터 가져오기, 렌더링 및 하이드레이션을 보여줍니다.

스트리밍을 사용하면 서버에서 UI를 점진적으로 렌더링할 수 있습니다. 작업은 청크로 분할되고 준비가 되면 클라이언트로 스트리밍됩니다. 이를 통해 사용자는 전체 콘텐츠 렌더링이 완료되기 전에 페이지의 일부를 즉시 볼 수 있습니다.

![클라이언트에서 부분적으로 렌더링된 페이지를 보여주는 다이어그램으로, 스트리밍 중인 청크에 대한 로딩 UI가 있습니다.](https://nextjs.org/_next/image?url=https%3A%2F%2Fh8DxKfmAPhn8O0p3.public.blob.vercel-storage.com%2Fdocs%2Flight%2Fserver-rendering-with-streaming.png&w=1920&q=75)

클라이언트에서 부분적으로 렌더링된 페이지를 보여주는 다이어그램으로, 스트리밍 중인 청크에 대한 로딩 UI가 있습니다.

스트리밍은 기본적으로 Next.js App Router에 내장되어 있습니다. 이렇게 하면 초기 페이지 로딩 성능과 전체 경로 렌더링을 차단하는 느린 데이터 가져오기에 의존하는 UI를 모두 개선하는 데 도움이 됩니다. 예를 들어 제품 페이지의 리뷰입니다.

[React Suspense](https://nextjs.org/docs/14/app/building-your-application/routing/loading-ui-and-streaming) 와 함께 UI 구성 요소를 사용하여 경로 세그먼트 스트리밍을 시작할 수 있습니다. 자세한 내용은 [UI 및 스트리밍 로드](https://nextjs.org/docs/14/app/building-your-application/routing/loading-ui-and-streaming) 섹션을 참조하세요.`loading.js`

Next.js 데이터를 캐시하는 방법과 정적 렌더링의 결과를 알아보세요.[소개](https://nextjs.org/docs/14/app/building-your-application/caching)

[...](https://nextjs.org/docs/14/app/building-your-application/caching)

[애플리케이션 빌드](https://nextjs.org/docs/14/app/building-your-application/caching)

캐싱

Next.js의 캐싱 메커니즘에 대한 개요입니다.

[View original](https://nextjs.org/docs/14/app/building-your-application/caching)