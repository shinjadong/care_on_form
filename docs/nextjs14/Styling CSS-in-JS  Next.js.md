---
title: "Styling: CSS-in-JS | Next.js"
source: "https://nextjs.org/docs/14/app/building-your-application/styling/css-in-js"
author:
  - "[[Vercel]]"
published:
created: 2025-09-16
description: "Use CSS-in-JS libraries with Next.js"
tags:
  - "clippings"
---
[애플리케이션 빌드](https://nextjs.org/docs/14/app/building-your-application) [스타일링](https://nextjs.org/docs/14/app/building-your-application/styling) CSS 인 JS

## CSS 인 JS

> **경고:** 런타임 JavaScript가 필요한 CSS-in-JS 라이브러리는 현재 서버 구성 요소에서 지원되지 않습니다. 서버 구성 요소 및 스트리밍과 같은 최신 React 기능과 함께 CSS-in-JS를 사용하려면 라이브러리 작성자가 다음을 포함한 최신 버전의 React를 지원해야 합니다. [동시 렌더링](https://react.dev/blog/2022/03/29/react-v18#what-is-concurrent-react).
> 
> 우리는 React 서버 구성 요소 및 스트리밍 아키텍처를 지원하는 CSS 및 JavaScript 자산을 처리하기 위해 업스트림 API에 대해 React 팀과 협력하고 있습니다.

다음 라이브러리는 디렉토리의 클라이언트 구성 요소에서 지원됩니다(알파벳순).`app`

- [`chakra-ui`](https://chakra-ui.com/getting-started/nextjs-app-guide)
- [`kuma-ui`](https://kuma-ui.com/)
- [`@mui/material`](https://mui.com/material-ui/guides/next-js-app-router/)
- [`@mui/joy`](https://mui.com/joy-ui/integrations/next-js-app-router/)
- [`pandacss`](https://panda-css.com/)
- [`styled-jsx`](https://nextjs.org/docs/14/app/building-your-application/styling/#styled-jsx)
- [`styled-components`](https://nextjs.org/docs/14/app/building-your-application/styling/#styled-components)
- [`stylex`](https://stylexjs.com/)
- [`tamagui`](https://tamagui.dev/docs/guides/next-js#server-components)
- [`tss-react`](https://tss-react.dev/)
- [`vanilla-extract`](https://vanilla-extract.style/)

현재 지원 작업은 다음과 같습니다.

- [`emotion`](https://github.com/emotion-js/emotion/issues/2928)

> **알아 둘만 한**: 우리는 다양한 CSS-in-JS 라이브러리를 테스트하고 있으며 React 18 기능 및/또는 디렉토리를 지원하는 라이브러리에 대한 더 많은 예제를 추가할 것입니다.`app`

서버 구성 요소의 스타일을 지정하려면 [CSS 모듈](https://nextjs.org/docs/14/app/building-your-application/styling/css-modules) 또는 PostCSS 또는 [Tailwind CSS](https://nextjs.org/docs/14/app/building-your-application/styling/tailwind-css) 와 같은 CSS 파일을 출력하는 기타 솔루션을 사용하는 것이 좋습니다.

## CSS-in-JS 구성 app

CSS-in-JS 구성은 다음을 포함하는 3단계 옵트인 프로세스입니다.

1. 렌더링에서 모든 CSS 규칙을 수집하는 **스타일 레지스트리** 입니다.
2. 규칙을 사용할 수 있는 콘텐츠 전에 규칙을 삽입하는 새 후크입니다.`useServerInsertedHTML`
3. 초기 서버 측 렌더링 중에 스타일 레지스트리로 앱을 래핑하는 클라이언트 구성 요소입니다.

### styled-jsx

클라이언트 구성 요소에서 사용하려면. 먼저 새 레지스트리를 만듭니다.`styled-jsx` `v5.1.0`

그런 다음 [루트 레이아웃](https://nextjs.org/docs/14/app/building-your-application/routing/pages-and-layouts#root-layout-required) 을 레지스트리로 래핑합니다.

앱/레이아웃.tsx

```
import StyledJsxRegistry from './registry'

 

export default function RootLayout({

  children,

}: {

  children: React.ReactNode

}) {

  return (

    <html>

      <body>

        <StyledJsxRegistry>{children}</StyledJsxRegistry>

      </body>

    </html>

  )

}
```

[여기에서 예제 보기](https://github.com/vercel/app-playground/tree/main/app/styling/styled-jsx).

### 스타일이 지정된 구성요소

다음은 구성 방법의 예입니다.`styled-components@6`

먼저 에서 스타일 구성 요소를 활성화합니다.`next.config.js`

next.config.js

```
module.exports = {

  compiler: {

    styledComponents: true,

  },

}
```

그런 다음 API를 사용하여 렌더링 중에 생성된 모든 CSS 스타일 규칙을 수집하는 전역 레지스트리 구성 요소와 해당 규칙을 반환하는 함수를 만듭니다. 그런 다음 후크를 사용하여 레지스트리에 수집된 스타일을 루트 레이아웃의 HTML 태그에 삽입합니다.`styled-components` `useServerInsertedHTML` `<head>`

스타일 레지스트리 구성 요소로 루트 레이아웃의 를 래핑합니다.`children`

앱/레이아웃.tsx

```
import StyledComponentsRegistry from './lib/registry'

 

export default function RootLayout({

  children,

}: {

  children: React.ReactNode

}) {

  return (

    <html>

      <body>

        <StyledComponentsRegistry>{children}</StyledComponentsRegistry>

      </body>

    </html>

  )

}
```

[여기에서 예제 보기](https://github.com/vercel/app-playground/tree/main/app/styling/styled-components).

> **알아 둘만 한**:
> 
> - 서버 렌더링 중에 스타일은 전역 레지스트리로 추출되고 HTML의 로 플러시됩니다. 이렇게 하면 스타일 규칙을 사용할 수 있는 콘텐츠 앞에 스타일 규칙이 배치됩니다. 앞으로는 곧 출시될 React 기능을 사용하여 스타일을 삽입할 위치를 결정할 수 있습니다.`<head>`
> - 스트리밍하는 동안 각 청크의 스타일이 수집되어 기존 스타일에 추가됩니다. 클라이언트 측 하이드레이션이 완료되면 평소와 같이 인계되어 더 많은 동적 스타일을 삽입합니다.`styled-components`
> - 특히 스타일 레지스트리의 트리 최상위 수준에서 클라이언트 구성 요소를 사용하는 것은 이러한 방식으로 CSS 규칙을 추출하는 것이 더 효율적이기 때문입니다. 후속 서버 렌더링에서 스타일을 다시 생성하지 않고 서버 구성 요소 페이로드로 스타일이 전송되지 않도록 합니다.
> - styled-components 컴파일의 개별 속성을 구성해야 하는 고급 사용 사례의 경우 [styled-components API 참조 Next.js](https://nextjs.org/docs/14/architecture/nextjs-compiler#styled-components) 참조를 읽고 자세히 알아볼 수 있습니다.