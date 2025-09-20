---
title: "Routing: Linking and Navigating | Next.js"
source: "https://nextjs.org/docs/14/app/building-your-application/routing/linking-and-navigating"
author:
  - "[[Vercel]]"
published:
created: 2025-09-16
description: "Learn how navigation works in Next.js, and how to use the Link Component and `useRouter` hook."
tags:
  - "clippings"
---
[애플리케이션 빌드](https://nextjs.org/docs/14/app/building-your-application) [라우팅](https://nextjs.org/docs/14/app/building-your-application/routing) 연결 및 탐색

## 연결 및 탐색

Next.js에서 경로 사이를 탐색하는 방법에는 네 가지가 있습니다.

- 사용 [`<Link>` 구성 요소](https://nextjs.org/docs/14/app/building-your-application/routing/#link-component)
- 사용 [`useRouter` 갈고리](https://nextjs.org/docs/14/app/building-your-application/routing/#userouter-hook) ([클라이언트 구성 요소](https://nextjs.org/docs/14/app/building-your-application/rendering/client-components))
- 사용 [`redirect` 기능](https://nextjs.org/docs/14/app/building-your-application/routing/#redirect-function) ([서버 구성 요소](https://nextjs.org/docs/14/app/building-your-application/rendering/server-components))
- 네이티브 [기록 API](https://nextjs.org/docs/14/app/building-your-application/routing/#using-the-native-history-api) 사용

이 페이지에서는 이러한 각 옵션을 사용하는 방법을 살펴보고 탐색 작동 방식에 대해 자세히 설명합니다.

## <Link> 구성 요소

`<Link>` 는 경로 간 [프리페치](https://nextjs.org/docs/14/app/building-your-application/routing/#2-prefetching) 및 클라이언트 측 탐색을 제공하기 위해 HTML 태그를 확장하는 기본 제공 구성 요소입니다. Next.js에서 경로 사이를 탐색하는 기본 및 권장 방법입니다.`<a>`

에서 가져와 구성 요소에 prop을 전달하여 사용할 수 있습니다.`next/link` `href`

앱/페이지.tsx

```
import Link from 'next/link'

 

export default function Page() {

  return <Link href="/dashboard">Dashboard</Link>

}
```

에 전달할 수 있는 다른 선택적 소품이 있습니다. 자세한 내용은 [API 참조](https://nextjs.org/docs/14/app/api-reference/components/link) 를 참조하세요.`<Link>`

### 예제

#### 동적 세그먼트에 연결

[동적 세그먼트](https://nextjs.org/docs/14/app/building-your-application/routing/dynamic-routes) 에 연결할 때 [템플릿 리터럴 및 보간](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Template_literals) 을 클릭하여 링크 목록을 생성합니다. 예를 들어 블로그 게시물 목록을 생성하려면 다음을 수행합니다.

앱/블로그/PostList.js

```
import Link from 'next/link'

 

export default function PostList({ posts }) {

  return (

    <ul>

      {posts.map((post) => (

        <li key={post.id}>

          <Link href={\`/blog/${post.slug}\`}>{post.title}</Link>

        </li>

      ))}

    </ul>

  )

}
```

#### 활성 링크 확인

사용할 수 있습니다. [`usePathname()`](https://nextjs.org/docs/14/app/api-reference/functions/use-pathname) 링크를 클릭하여 링크가 활성 상태인지 확인합니다. 예를 들어 활성 링크에 클래스를 추가하려면 현재 클래스가 링크의 클래스와 일치하는지 확인할 수 있습니다.`pathname` `href`

#### Scrolling to an id

The default behavior of the Next.js App Router is to **scroll to the top of a new route or to maintain the scroll position for backwards and forwards navigation.**

If you'd like to scroll to a specific on navigation, you can append your URL with a hash link or just pass a hash link to the prop. This is possible since renders to an element.`id` `#` `href` `<Link>` `<a>`

```
<Link href="/dashboard#settings">Settings</Link>

 

// Output

<a href="/dashboard#settings">Settings</a>
```

> **Good to know**:
> 
> - Next.js will scroll to the [Page](https://nextjs.org/docs/14/app/building-your-application/routing/pages-and-layouts#pages) if it is not visible in the viewport upon navigation.

#### Disabling scroll restoration

The default behavior of the Next.js App Router is to **scroll to the top of a new route or to maintain the scroll position for backwards and forwards navigation.** If you'd like to disable this behavior, you can pass to the component, or to or .`scroll={false}` `<Link>` `scroll: false` `router.push()` `router.replace()`

```
// next/link

<Link href="/dashboard" scroll={false}>

  Dashboard

</Link>
```

## useRouter() hook

The hook allows you to programmatically change routes from [Client Components](https://nextjs.org/docs/14/app/building-your-application/rendering/client-components).`useRouter`

For a full list of methods, see the [API reference](https://nextjs.org/docs/14/app/api-reference/functions/use-router).`useRouter`

> **Recommendation:** Use the component to navigate between routes unless you have a specific requirement for using .`<Link>` `useRouter`

## redirect function

For [Server Components](https://nextjs.org/docs/14/app/building-your-application/rendering/server-components), use the function instead.`redirect`

> **Good to know**:
> 
> - `redirect` returns a 307 (Temporary Redirect) status code by default. When used in a Server Action, it returns a 303 (See Other), which is commonly used for redirecting to a success page as a result of a POST request.
> - `redirect` internally throws an error so it should be called outside of blocks.`try/catch`
> - `redirect` can be called in Client Components during the rendering process but not in event handlers. You can use the [`useRouter` hook](https://nextjs.org/docs/14/app/building-your-application/routing/#userouter-hook) instead.
> - `redirect` also accepts absolute URLs and can be used to redirect to external links.
> - If you'd like to redirect before the render process, use [`next.config.js`](https://nextjs.org/docs/14/app/building-your-application/routing/redirecting#redirects-in-nextconfigjs) or [Middleware](https://nextjs.org/docs/14/app/building-your-application/routing/redirecting#nextresponseredirect-in-middleware).

See the [`redirect` API reference](https://nextjs.org/docs/14/app/api-reference/functions/redirect) for more information.

## Using the native History API

Next.js allows you to use the native [`window.history.pushState`](https://developer.mozilla.org/en-US/docs/Web/API/History/pushState) and [`window.history.replaceState`](https://developer.mozilla.org/en-US/docs/Web/API/History/replaceState) methods to update the browser's history stack without reloading the page.

`pushState` and calls integrate into the Next.js Router, allowing you to sync with `replaceState` [`usePathname`](https://nextjs.org/docs/14/app/api-reference/functions/use-pathname) and [`useSearchParams`](https://nextjs.org/docs/14/app/api-reference/functions/use-search-params).

### window.history.pushState

Use it to add a new entry to the browser's history stack. The user can navigate back to the previous state. For example, to sort a list of products:

### window.history.replaceState

Use it to replace the current entry on the browser's history stack. The user is not able to navigate back to the previous state. For example, to switch the application's locale:

## How Routing and Navigation Works

The App Router uses a hybrid approach for routing and navigation. On the server, your application code is automatically [code-split](https://nextjs.org/docs/14/app/building-your-application/routing/#1-code-splitting) by route segments. And on the client, Next.js [prefetches](https://nextjs.org/docs/14/app/building-your-application/routing/#2-prefetching) and [caches](https://nextjs.org/docs/14/app/building-your-application/routing/#3-caching) the route segments. This means, when a user navigates to a new route, the browser doesn't reload the page, and only the route segments that change re-render - improving the navigation experience and performance.

### 1\. Code Splitting

Code splitting allows you to split your application code into smaller bundles to be downloaded and executed by the browser. This reduces the amount of data transferred and execution time for each request, leading to improved performance.

[Server Components](https://nextjs.org/docs/14/app/building-your-application/rendering/server-components) allow your application code to be automatically code-split by route segments. This means only the code needed for the current route is loaded on navigation.

### 2\. Prefetching

Prefetching is a way to preload a route in the background before the user visits it.

There are two ways routes are prefetched in Next.js:

- **`<Link>` component**: Routes are automatically prefetched as they become visible in the user's viewport. Prefetching happens when the page first loads or when it comes into view through scrolling.
- **`router.prefetch()`**: The hook can be used to prefetch routes programmatically.`useRouter`

The 's default prefetching behavior (i.e. when the prop is left unspecified or set to ) is different depending on your usage of `<Link>` `prefetch` `null` [`loading.js`](https://nextjs.org/docs/14/app/api-reference/file-conventions/loading). Only the shared layout, down the rendered "tree" of components until the first file, is prefetched and cached for . This reduces the cost of fetching an entire dynamic route, and it means you can show an [instant loading state](https://nextjs.org/docs/14/app/building-your-application/routing/loading-ui-and-streaming#instant-loading-states) for better visual feedback to users.`loading.js` `30s`

You can disable prefetching by setting the prop to . Alternatively, you can prefetch the full page data beyond the loading boundaries by setting the prop to .`prefetch` `false` `prefetch` `true`

See the [`<Link>` API reference](https://nextjs.org/docs/14/app/api-reference/components/link) for more information.

> **Good to know**:
> 
> - Prefetching is not enabled in development, only in production.

### 3\. Caching

Next.js has an **in-memory client-side cache** called the [Router Cache](https://nextjs.org/docs/14/app/building-your-application/caching#router-cache). As users navigate around the app, the React Server Component Payload of [prefetched](https://nextjs.org/docs/14/app/building-your-application/routing/#2-prefetching) route segments and visited routes are stored in the cache.

This means on navigation, the cache is reused as much as possible, instead of making a new request to the server - improving performance by reducing the number of requests and data transferred.

Learn more about how the [Router Cache](https://nextjs.org/docs/14/app/building-your-application/caching#router-cache) works and how to configure it.

### 4\. Partial Rendering

Partial rendering means only the route segments that change on navigation re-render on the client, and any shared segments are preserved.

For example, when navigating between two sibling routes, and , the and pages will be rendered, and the shared layout will be preserved.`/dashboard/settings` `/dashboard/analytics` `settings` `analytics` `dashboard`

![How partial rendering works](https://nextjs.org/_next/image?url=https%3A%2F%2Fh8DxKfmAPhn8O0p3.public.blob.vercel-storage.com%2Fdocs%2Flight%2Fpartial-rendering.png&w=1920&q=75)

How partial rendering works

Without partial rendering, each navigation would cause the full page to re-render on the client. Rendering only the segment that changes reduces the amount of data transferred and execution time, leading to improved performance.

### 5\. Soft Navigation

Browsers perform a "hard navigation" when navigating between pages. The Next.js App Router enables "soft navigation" between pages, ensuring only the route segments that have changed are re-rendered (partial rendering). This enables client React state to be preserved during navigation.

### 6\. Back and Forward Navigation

By default, Next.js will maintain the scroll position for backwards and forwards navigation, and re-use route segments in the [Router Cache](https://nextjs.org/docs/14/app/building-your-application/caching#router-cache).

### 7\. Routing between and pages/app/

When incrementally migrating from to , the Next.js router will automatically handle hard navigation between the two. To detect transitions from to , there is a client router filter that leverages probabilistic checking of app routes, which can occasionally result in false positives. By default, such occurrences should be very rare, as we configure the false positive likelihood to be 0.01%. This likelihood can be customized via the option in . It's important to note that lowering the false positive rate will increase the size of the generated filter in the client bundle.`pages/` `app/` `pages/` `app/` `experimental.clientRouterFilterAllowedRate` `next.config.js`

Alternatively, if you prefer to disable this handling completely and manage the routing between and manually, you can set to false in . When this feature is disabled, any dynamic routes in pages that overlap with app routes won't be navigated to properly by default.`pages/` `app/` `experimental.clientRouterFilter` `next.config.js`[Introduction](https://nextjs.org/docs/14/app/building-your-application/caching)

[...](https://nextjs.org/docs/14/app/building-your-application/caching)

[Building Your Application](https://nextjs.org/docs/14/app/building-your-application/caching)

Caching

An overview of caching mechanisms in Next.js.

[View original](https://nextjs.org/docs/14/app/building-your-application/caching)TypeScript

Introduction

...

Configuring

Next.js provides a TypeScript-first development experience for building your React application.

[View original](https://nextjs.org/docs/14/app/building-your-application/configuring/typescript)