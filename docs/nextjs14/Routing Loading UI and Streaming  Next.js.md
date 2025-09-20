---
title: "Routing: Loading UI and Streaming | Next.js"
source: "https://nextjs.org/docs/14/app/building-your-application/routing/loading-ui-and-streaming"
author:
  - "[[Vercel]]"
published:
created: 2025-09-16
description: "Built on top of Suspense, Loading UI allows you to create a fallback for specific route segments, and automatically stream content as it becomes ready."
tags:
  - "clippings"
---
[애플리케이션 빌드](https://nextjs.org/docs/14/app/building-your-application) [라우팅](https://nextjs.org/docs/14/app/building-your-application/routing) UI 로딩 및 스트리밍

## UI 로딩 및 스트리밍

특수 파일은 의미 있는 로딩 UI를 만드는 데 도움이 됩니다. `loading.js` [반응 서스펜스](https://react.dev/reference/react/Suspense). 이 규칙을 사용하면 경로 세그먼트의 콘텐츠가 로드되는 동안 서버에서 [즉시 로드 상태를](https://nextjs.org/docs/14/app/building-your-application/routing/#instant-loading-states) 표시할 수 있습니다. 렌더링이 완료되면 새 콘텐츠가 자동으로 교체됩니다.

![UI 로딩 중](https://nextjs.org/_next/image?url=https%3A%2F%2Fh8DxKfmAPhn8O0p3.public.blob.vercel-storage.com%2Fdocs%2Flight%2Floading-ui.png&w=1920&q=75)

인스턴트 로드 상태는 탐색 시 즉시 표시되는 대체 UI입니다. 스켈레톤 및 스피너와 같은 로딩 표시기 또는 표지 사진, 제목 등과 같은 향후 화면의 작지만 의미 있는 부분을 미리 렌더링할 수 있습니다. 이를 통해 사용자는 앱이 응답하고 있음을 이해하고 더 나은 사용자 경험을 제공할 수 있습니다.

폴더 안에 파일을 추가하여 로드 상태를 만듭니다.`loading.js`

![loading.js 특수 파일](https://nextjs.org/_next/image?url=https%3A%2F%2Fh8DxKfmAPhn8O0p3.public.blob.vercel-storage.com%2Fdocs%2Flight%2Floading-special-file.png&w=1920&q=75)

loading.js 특수 파일

앱/대시보드/loading.tsx

```
export default function Loading() {

  // You can add any UI inside Loading, including a Skeleton.

  return <LoadingSkeleton />

}
```

같은 폴더에서. 파일과 아래의 모든 자식을 경계로 자동으로 래핑합니다.`loading.js` `layout.js` `page.js` `<Suspense>`

![loading.js 개요](https://nextjs.org/_next/image?url=https%3A%2F%2Fh8DxKfmAPhn8O0p3.public.blob.vercel-storage.com%2Fdocs%2Flight%2Floading-overview.png&w=1920&q=75)

loading.js 개요

> **알아 둘만 한**:
> 
> - [서버 중심 라우팅](https://nextjs.org/docs/14/app/building-your-application/routing/linking-and-navigating#how-routing-and-navigation-works) 을 사용하더라도 탐색이 즉각적입니다.
> - 내비게이션은 중단 가능하므로 경로를 변경할 때 다른 경로로 이동하기 전에 경로의 내용이 완전히 로드될 때까지 기다릴 필요가 없습니다.
> - Shared layouts remain interactive while new route segments load.

> **Recommendation:** Use the convention for route segments (layouts and pages) as Next.js optimizes this functionality.`loading.js`

## Streaming with Suspense

In addition to , you can also manually create Suspense Boundaries for your own UI components. The App Router supports streaming with `loading.js` [Suspense](https://react.dev/reference/react/Suspense) for both [Node.js and Edge runtimes](https://nextjs.org/docs/14/app/building-your-application/rendering/edge-and-nodejs-runtimes).

> **Good to know**:
> 
> - [Some browsers](https://bugs.webkit.org/show_bug.cgi?id=252413) buffer a streaming response. You may not see the streamed response until the exceeds 1024 bytes. This typically only affects “hello world” applications, but not real applications.

### What is Streaming?

To learn how Streaming works in React and Next.js, it's helpful to understand **Server-Side Rendering (SSR)** and its limitations.

With SSR, there's a series of steps that need to be completed before a user can see and interact with a page:

1. First, all data for a given page is fetched on the server.
2. The server then renders the HTML for the page.
3. The HTML, CSS, and JavaScript for the page are sent to the client.
4. A non-interactive user interface is shown using the generated HTML, and CSS.
5. Finally, React [hydrates](https://react.dev/reference/react-dom/client/hydrateRoot#hydrating-server-rendered-html) the user interface to make it interactive.
![Chart showing Server Rendering without Streaming](https://nextjs.org/_next/image?url=https%3A%2F%2Fh8DxKfmAPhn8O0p3.public.blob.vercel-storage.com%2Fdocs%2Flight%2Fserver-rendering-without-streaming-chart.png&w=1920&q=75)

Chart showing Server Rendering without Streaming

These steps are sequential and blocking, meaning the server can only render the HTML for a page once all the data has been fetched. And, on the client, React can only hydrate the UI once the code for all components in the page has been downloaded.

SSR with React and Next.js helps improve the perceived loading performance by showing a non-interactive page to the user as soon as possible.

![Server Rendering without Streaming](https://nextjs.org/_next/image?url=https%3A%2F%2Fh8DxKfmAPhn8O0p3.public.blob.vercel-storage.com%2Fdocs%2Flight%2Fserver-rendering-without-streaming.png&w=1920&q=75)

Server Rendering without Streaming

However, it can still be slow as all data fetching on server needs to be completed before the page can be shown to the user.

**Streaming** allows you to break down the page's HTML into smaller chunks and progressively send those chunks from the server to the client.

![How Server Rendering with Streaming Works](https://nextjs.org/_next/image?url=https%3A%2F%2Fh8DxKfmAPhn8O0p3.public.blob.vercel-storage.com%2Fdocs%2Flight%2Fserver-rendering-with-streaming.png&w=1920&q=75)

How Server Rendering with Streaming Works

This enables parts of the page to be displayed sooner, without waiting for all the data to load before any UI can be rendered.

Streaming works well with React's component model because each component can be considered a chunk. Components that have higher priority (e.g. product information) or that don't rely on data can be sent first (e.g. layout), and React can start hydration earlier. Components that have lower priority (e.g. reviews, related products) can be sent in the same server request after their data has been fetched.

![Chart showing Server Rendering with Streaming](https://nextjs.org/_next/image?url=https%3A%2F%2Fh8DxKfmAPhn8O0p3.public.blob.vercel-storage.com%2Fdocs%2Flight%2Fserver-rendering-with-streaming-chart.png&w=1920&q=75)

Chart showing Server Rendering with Streaming

Streaming is particularly beneficial when you want to prevent long data requests from blocking the page from rendering as it can reduce the [Time To First Byte (TTFB)](https://web.dev/ttfb/) and [First Contentful Paint (FCP)](https://web.dev/first-contentful-paint/). It also helps improve [Time to Interactive (TTI)](https://developer.chrome.com/en/docs/lighthouse/performance/interactive/), especially on slower devices.

### Example

`<Suspense>` works by wrapping a component that performs an asynchronous action (e.g. fetch data), showing fallback UI (e.g. skeleton, spinner) while it's happening, and then swapping in your component once the action completes.

app/dashboard/page.tsx

```
import { Suspense } from 'react'

import { PostFeed, Weather } from './Components'

 

export default function Posts() {

  return (

    <section>

      <Suspense fallback={<p>Loading feed...</p>}>

        <PostFeed />

      </Suspense>

      <Suspense fallback={<p>Loading weather...</p>}>

        <Weather />

      </Suspense>

    </section>

  )

}
```

By using Suspense, you get the benefits of:

1. **Streaming Server Rendering** - Progressively rendering HTML from the server to the client.
2. **Selective Hydration** - React prioritizes what components to make interactive first based on user interaction.

For more Suspense examples and use cases, please see the [React Documentation](https://react.dev/reference/react/Suspense).

### SEO

- Next.js will wait for data fetching inside [`generateMetadata`](https://nextjs.org/docs/14/app/api-reference/functions/generate-metadata) to complete before streaming UI to the client. This guarantees the first part of a streamed response includes tags.`<head>`
- Since streaming is server-rendered, it does not impact SEO. You can use the [Rich Results Test](https://search.google.com/test/rich-results) tool from Google to see how your page appears to Google's web crawlers and view the serialized HTML ([source](https://web.dev/rendering-on-the-web/#seo-considerations)).

### Status Codes

When streaming, a status code will be returned to signal that the request was successful.`200`

The server can still communicate errors or issues to the client within the streamed content itself, for example, when using [`redirect`](https://nextjs.org/docs/14/app/api-reference/functions/redirect) or [`notFound`](https://nextjs.org/docs/14/app/api-reference/functions/not-found). Since the response headers have already been sent to the client, the status code of the response cannot be updated. This does not affect SEO.