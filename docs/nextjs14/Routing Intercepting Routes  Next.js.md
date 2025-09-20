---
title: "Routing: Intercepting Routes | Next.js"
source: "https://nextjs.org/docs/14/app/building-your-application/routing/intercepting-routes"
author:
  - "[[Vercel]]"
published:
created: 2025-09-16
description: "Use intercepting routes to load a new route within the current layout while masking the browser URL, useful for advanced routing patterns such as modals."
tags:
  - "clippings"
---
## 경로 가로채기

경로를 가로채면 현재 레이아웃 내에서 애플리케이션의 다른 부분에서 경로를 로드할 수 있습니다. 이 라우팅 패러다임은 사용자가 다른 컨텍스트로 전환하지 않고 경로의 콘텐츠를 표시하려는 경우에 유용할 수 있습니다.

예를 들어 피드에서 사진을 클릭하면 피드를 오버레이하여 모달로 사진을 표시할 수 있습니다. 이 경우 Next.js 경로를 가로채고 URL을 마스킹한 다음 위에 오버레이합니다.`/photo/123` `/feed`

![경로 가로채기 소프트 내비게이션](https://nextjs.org/_next/image?url=https%3A%2F%2Fh8DxKfmAPhn8O0p3.public.blob.vercel-storage.com%2Fdocs%2Flight%2Fintercepting-routes-soft-navigate.png&w=1920&q=75)

경로 가로채기 소프트 내비게이션

그러나 공유 가능한 URL을 클릭하거나 페이지를 새로 고쳐 사진으로 이동하면 모달 대신 전체 사진 페이지가 렌더링되어야 합니다. 경로 가로채기가 발생하지 않아야 합니다.

![경로 가로채기 하드 내비게이션](https://nextjs.org/_next/image?url=https%3A%2F%2Fh8DxKfmAPhn8O0p3.public.blob.vercel-storage.com%2Fdocs%2Flight%2Fintercepting-routes-hard-navigate.png&w=1920&q=75)

경로 가로채기 하드 내비게이션

## 컨벤션

가로채는 경로는 상대 경로 규칙과 유사하지만 세그먼트에 대한 규칙으로 정의할 수 있습니다.`(..)``../`

다음을 사용할 수 있습니다.

- `(.)` **동일한 수준의** 세그먼트를 일치시키려면
- `(..)` **한 단계 위의** 세그먼트를 일치시키려면
- `(..)(..)` **두 단계 위의** 세그먼트를 일치시키려면
- `(...)` **루트** 디렉토리의 세그먼트를 일치시키려면 `app`

예를 들어 디렉터리를 만들어 세그먼트 내에서 세그먼트를 가로챌 수 있습니다.`photo` `feed` `(..)photo`

![경로 가로채기 폴더 구조](https://nextjs.org/_next/image?url=https%3A%2F%2Fh8DxKfmAPhn8O0p3.public.blob.vercel-storage.com%2Fdocs%2Flight%2Fintercepted-routes-files.png&w=1920&q=75)

경로 가로채기 폴더 구조

> 규칙은 파일 시스템이 아닌 *경로 세그먼트* 를 기반으로 합니다.`(..)`

## Examples

### Modals

Intercepting Routes can be used together with [Parallel Routes](https://nextjs.org/docs/14/app/building-your-application/routing/parallel-routes) to create modals. This allows you to solve common challenges when building modals, such as:

- Making the modal content **shareable through a URL**.
- **Preserving context** when the page is refreshed, instead of closing the modal.
- **Closing the modal on backwards navigation** rather than going to the previous route.
- **Reopening the modal on forwards navigation**.

Consider the following UI pattern, where a user can open a photo modal from a gallery using client-side navigation, or navigate to the photo page directly from a shareable URL:

![Intercepting routes modal example](https://nextjs.org/_next/image?url=https%3A%2F%2Fh8DxKfmAPhn8O0p3.public.blob.vercel-storage.com%2Fdocs%2Flight%2Fintercepted-routes-modal-example.png&w=1920&q=75)

Intercepting routes modal example

In the above example, the path to the segment can use the matcher since is a slot and **not** a segment. This means that the route is only one segment level higher, despite being two file-system levels higher.`photo` `(..)` `@modal` `photo`

See the [Parallel Routes](https://nextjs.org/docs/14/app/building-your-application/routing/parallel-routes#modals) documentation for a step-by-step example, or see our [image gallery example](https://github.com/vercel-labs/nextgram).

> **Good to know:**
> 
> - Other examples could include opening a login modal in a top navbar while also having a dedicated page, or opening a shopping cart in a side modal.`/login`