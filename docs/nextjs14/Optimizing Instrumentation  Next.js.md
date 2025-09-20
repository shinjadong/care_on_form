---
title: "Optimizing: Instrumentation | Next.js"
source: "https://nextjs.org/docs/14/app/building-your-application/optimizing/instrumentation"
author:
  - "[[Vercel]]"
published:
created: 2025-09-16
description: "Learn how to use instrumentation to run code at server startup in your Next.js app"
tags:
  - "clippings"
---
[애플리케이션 빌드](https://nextjs.org/docs/14/app/building-your-application) [최적화](https://nextjs.org/docs/14/app/building-your-application/optimizing) 계측

## 계측

계측은 코드를 사용하여 모니터링 및 로깅 도구를 애플리케이션에 통합하는 프로세스입니다. 이를 통해 애플리케이션의 성능 및 동작을 추적하고 프로덕션 환경에서 문제를 디버깅할 수 있습니다.

## 컨벤션

계측을 설정하려면 프로젝트의 **루트 디렉터리** (또는 `instrumentation.ts|js` [`src`](https://nextjs.org/docs/14/app/building-your-application/configuring/src-directory) 폴더를 사용하는 경우).

그런 다음 파일에서 함수를 내보냅니다. 이 함수는 새 Next.js 서버 인스턴스가 시작될 때 **한 번** 호출됩니다.`register`

예를 들어, Next.js [OpenTelemetry](https://opentelemetry.io/) 그리고 [@vercel/오텔](https://vercel.com/docs/observability/otel-overview):

참조 [OpenTelemetry 예제를 사용한 Next.js](https://github.com/vercel/next.js/tree/canary/examples/with-opentelemetry) 완전한 구현을 위해.

> **알아두면 좋은 정보**
> 
> - 이 기능은 **실험적입니다**. 이를 사용하려면 다음을 정의하여 명시적으로 옵트인해야 합니다. [`experimental.instrumentationHook = true;`](https://nextjs.org/docs/14/app/api-reference/next-config-js/instrumentationHook) 당신에.`next.config.js`
> - 파일은 또는 디렉토리 내부가 아닌 프로젝트의 루트에 있어야 합니다. 폴더를 사용하는 경우 파일을 및 와 나란히 배치합니다.`instrumentation` `app` `pages` `src` `src` `pages` `app`
> - 를 사용하는 경우 [`pageExtensions` config 옵션](https://nextjs.org/docs/14/app/api-reference/next-config-js/pageExtensions) 접미사를 추가하려면 파일 이름도 일치하도록 업데이트해야 합니다.`instrumentation`

## 예제

### 부작용이 있는 파일 가져오기

때로는 부작용이 발생하기 때문에 코드에서 파일을 가져오는 것이 유용할 수 있습니다. 예를 들어 전역 변수 집합을 정의하는 파일을 가져올 수 있지만 가져온 파일을 코드에서 명시적으로 사용하지 않을 수 있습니다. 패키지가 선언한 전역 변수에 계속 액세스할 수 있습니다.

함수 내에서 JavaScript 구문을 사용하여 파일을 가져오는 것이 좋습니다. 다음 예제에서는 함수에서 의 기본 사용법을 보여 줍니다.`import` `register` `import` `register`

> **알아 둘만 한:**
> 
> 파일 맨 위가 아닌 함수 내에서 파일을 가져오는 것이 좋습니다. 이렇게 하면 모든 부작용을 코드의 한 곳에 배치할 수 있으며 파일 맨 위에 전역적으로 가져올 때 의도하지 않은 결과를 방지할 수 있습니다.`register`

### 런타임별 코드 가져오기

Next.js 모든 환경에서 호출되므로 특정 런타임(예: [Edge](https://nextjs.org/docs/14/app/building-your-application/rendering/edge-and-nodejs-runtimes#edge-runtime) 또는 [Node.js](https://nextjs.org/docs/14/app/building-your-application/rendering/edge-and-nodejs-runtimes#nodejs-runtime))을 지원하지 않는 코드를 조건부로 가져오는 것이 중요합니다. 환경 변수를 사용하여 현재 환경을 가져올 수 있습니다.`register` `NEXT_RUNTIME`[소개](https://nextjs.org/docs/14/app/api-reference/file-conventions/instrumentation)

[...](https://nextjs.org/docs/14/app/api-reference/file-conventions/instrumentation)

[파일 규칙](https://nextjs.org/docs/14/app/api-reference/file-conventions/instrumentation)

instrumentation.js

instrumentation.js 파일에 대한 API 참조입니다.

[View original](https://nextjs.org/docs/14/app/api-reference/file-conventions/instrumentation)계측후크

소개

...

next.config.js 옵션

instrumentationHook 옵션을 사용하여 Next.js 앱에서 계측을 설정합니다.

[View original](https://nextjs.org/docs/14/app/api-reference/next-config-js/instrumentationHook)