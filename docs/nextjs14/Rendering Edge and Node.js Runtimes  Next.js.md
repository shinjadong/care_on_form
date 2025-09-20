---
title: "Rendering: Edge and Node.js Runtimes | Next.js"
source: "https://nextjs.org/docs/14/app/building-your-application/rendering/edge-and-nodejs-runtimes"
author:
  - "[[Vercel]]"
published:
created: 2025-09-16
description: "Learn about the switchable runtimes (Edge and Node.js) in Next.js."
tags:
  - "clippings"
---
[애플리케이션 빌드](https://nextjs.org/docs/14/app/building-your-application) [렌더링](https://nextjs.org/docs/14/app/building-your-application/rendering) Edge 및 Node.js 런타임

## Edge 및 Node.js 런타임

Next.js의 맥락에서 런타임은 실행 중에 코드에서 사용할 수 있는 라이브러리, API 및 일반 기능 집합을 나타냅니다.

서버에는 애플리케이션 코드의 일부를 렌더링할 수 있는 두 개의 런타임이 있습니다.

- **Node.js 런타임** (기본값)은 에코시스템의 모든 Node.js API 및 호환 패키지에 액세스할 수 있습니다.
- **Edge 런타임** 은 [Web API를 기반으로 합니다.](https://nextjs.org/docs/14/app/api-reference/edge)

## 런타임 차이점

런타임을 선택할 때 고려해야 할 사항이 많습니다. 이 표는 주요 차이점을 한 눈에 보여줍니다. 차이점에 대한 보다 심층적인 분석을 원하시면 아래 섹션을 확인하세요.

|  | 노드 | 서버리스 | 가장자리 |
| --- | --- | --- | --- |
| 콜드 부트 | / | 보통 | 낮다 |
| [HTTP 스트리밍](https://nextjs.org/docs/14/app/building-your-application/routing/loading-ui-and-streaming) | 예 | 예 | 예 |
| 아이오 | 모두 | 모두 | `fetch` |
| 확장성 | / | 높다 | 최고 |
| 안전 | 보통 | 높다 | 높다 |
| 숨어 있음 | 보통 | 낮다 | 최저 |
| npm 패키지 | 모두 | 모두 | 더 작은 하위 집합 |
| [스태틱 렌더링](https://nextjs.org/docs/14/app/building-your-application/rendering/server-components#static-rendering-default) | 예 | 예 | 아니요 |
| [동적 렌더링](https://nextjs.org/docs/14/app/building-your-application/rendering/server-components#dynamic-rendering) | 예 | 예 | 예 |
| [데이터 재검증 w/ `fetch`](https://nextjs.org/docs/14/app/building-your-application/data-fetching/fetching-caching-and-revalidating#revalidating-data) | 예 | 예 | 예 |

### Edge 런타임

Next.js에서 경량 Edge 런타임은 사용 가능한 Node.js API의 하위 집합입니다.

Edge 런타임은 작고 간단한 기능을 사용하여 짧은 대기 시간으로 동적이고 개인화된 콘텐츠를 제공해야 하는 경우에 이상적입니다. Edge 런타임의 속도는 리소스를 최소한으로 사용하므로 많은 시나리오에서 제한될 수 있습니다.

예를 들어 Edge 런타임에서 실행된 코드 [Vercel에서는 1MB에서 4MB 사이를 초과할 수 없습니다.](https://vercel.com/docs/concepts/limits/overview#edge-middleware-and-edge-functions-size)이 제한에는 가져온 패키지, 글꼴 및 파일이 포함되며 배포 인프라에 따라 달라집니다. 또한 Edge 런타임은 모든 Node.js API를 지원하지 않으므로 일부 패키지가 작동하지 않을 수 있습니다. 예를 들어 "모듈을 찾을 수 없음: 'fs'를 해결할 수 없습니다" 또는 유사한 오류가 있습니다. 이러한 API 또는 패키지를 사용해야 하는 경우 Node.js 런타임을 사용하는 것이 좋습니다.`npm`

### Node.js 런타임

Node.js 런타임을 사용하면 모든 Node.js API와 API에 의존하는 모든 npm 패키지에 액세스할 수 있습니다. 그러나 Edge 런타임을 사용하여 경로만큼 빠르게 시작하지 않습니다.

Next.js 애플리케이션을 Node.js 서버에 배포하려면 인프라를 관리, 확장 및 구성해야 합니다. 또는 Next.js 애플리케이션을 Vercel과 같은 서버리스 플랫폼에 배포하는 것을 고려할 수 있습니다.

### 서버리스 Node.js

서버리스는 Edge 런타임보다 더 복잡한 계산 부하를 처리할 수 있는 확장 가능한 솔루션이 필요한 경우에 이상적입니다. 예를 들어 Vercel의 Serverless Functions를 사용하면 전체 코드 크기가 [50메가바이트](https://vercel.com/docs/concepts/limits/overview#serverless-function-size) 가져온 패키지, 글꼴 및 파일을 포함합니다.

를 사용하는 경로에 비해 단점은 [가장자리](https://vercel.com/docs/concepts/functions/edge-functions) Serverless Functions가 요청 처리를 시작하기 전에 부팅하는 데 수백 밀리초가 걸릴 수 있습니다. 사이트에서 수신하는 트래픽의 양에 따라 기능이 자주 "웜"되지 않기 때문에 이러한 현상이 자주 발생할 수 있습니다.

## 예제

### 세그먼트 런타임 옵션

Next.js 애플리케이션에서 개별 경로 세그먼트에 대한 런타임을 지정할 수 있습니다. 그렇게 하려면 [라는 변수를 선언하고 내보냅니다.`runtime`](https://nextjs.org/docs/14/app/api-reference/file-conventions/route-segment-config). 변수는 문자열이어야 하며 값이 런타임이어야 합니다.`'nodejs'` `'edge'`

다음 예제에서는 값이 다음과 같은 값을 내보내는 페이지 경로 세그먼트를 보여줍니다.`runtime` `'edge'`

앱/페이지.tsx

```
export const runtime = 'edge' // 'nodejs' (default) | 'edge'
```

레이아웃 수준에서 정의하여 레이아웃 아래의 모든 경로를 에지 런타임에서 실행하도록 할 수도 있습니다.`runtime`

앱/레이아웃.tsx

```
export const runtime = 'edge' // 'nodejs' (default) | 'edge'
```

세그먼트 런타임이 설정 *되지 않은* 경우 기본 런타임이 사용됩니다. Node.js 런타임에서 변경하지 않으려는 경우 이 옵션을 사용할 필요가 없습니다.`nodejs` `runtime`

> 를 참조하십시오. [Node.js 문서](https://nodejs.org/docs/latest/api/) 및 [Edge Docs](https://nextjs.org/docs/14/app/api-reference/edge) 사용 가능한 API의 전체 목록을 확인하세요. 두 런타임 모두 배포 인프라에 따라 [스트리밍](https://nextjs.org/docs/14/app/building-your-application/routing/loading-ui-and-streaming) 을 지원할 수도 있습니다.