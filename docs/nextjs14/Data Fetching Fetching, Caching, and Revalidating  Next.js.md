---
title: "Data Fetching: Fetching, Caching, and Revalidating | Next.js"
source: "https://nextjs.org/docs/14/app/building-your-application/data-fetching/fetching-caching-and-revalidating"
author:
  - "[[Vercel]]"
published:
created: 2025-09-16
description: "Learn how to fetch, cache, and revalidate data in your Next.js application."
tags:
  - "clippings"
---
[애플리케이션 빌드](https://nextjs.org/docs/14/app/building-your-application) [데이터 가져오기](https://nextjs.org/docs/14/app/building-your-application/data-fetching) 가져오기, 캐싱 및 재검증

## 데이터 가져오기, 캐싱 및 재검증

데이터 가져오기는 모든 애플리케이션의 핵심 부분입니다. 이 페이지에서는 React 및 Next.js에서 데이터를 가져오고, 캐시하고, 다시 검증하는 방법을 살펴봅니다.

데이터를 가져올 수 있는 네 가지 방법이 있습니다.

1. [서버에서 `fetch`](https://nextjs.org/docs/14/app/building-your-application/data-fetching/#fetching-data-on-the-server-with-fetch)
2. [서버에서 타사 라이브러리 사용](https://nextjs.org/docs/14/app/building-your-application/data-fetching/#fetching-data-on-the-server-with-third-party-libraries)
3. [클라이언트에서 경로 처리기를 통해](https://nextjs.org/docs/14/app/building-your-application/data-fetching/#fetching-data-on-the-client-with-route-handlers)
4. [클라이언트에서 타사 라이브러리를 사용합니다](https://nextjs.org/docs/14/app/building-your-application/data-fetching/#fetching-data-on-the-client-with-route-handlers).

## 서버에서 데이터 가져오기 fetch

Next.js 네이티브 [`fetch` 웹 API](https://developer.mozilla.org/docs/Web/API/Fetch_API) 서버의 각 가져오기 요청에 대한 [캐싱](https://nextjs.org/docs/14/app/building-your-application/data-fetching/#caching-data) 및 [재검증](https://nextjs.org/docs/14/app/building-your-application/data-fetching/#revalidating-data) 동작을 구성할 수 있습니다. React는 React 구성 요소 트리를 렌더링하는 동안 가져오기 요청을 자동으로 [메모화](https://nextjs.org/docs/14/app/building-your-application/data-fetching/patterns#fetching-data-where-its-needed) 하도록 확장됩니다.`fetch`

서버 구성 요소, [경로 처리기](https://nextjs.org/docs/14/app/building-your-application/routing/route-handlers) 및 [서버 작업](https://nextjs.org/docs/14/app/building-your-application/data-fetching/server-actions-and-mutations) 에서 /와 함께 사용할 수 있습니다.`fetch` `async` `await`

예를 들어:

앱/페이지.tsx

```
async function getData() {

  const res = await fetch('https://api.example.com/...')

  // The return value is *not* serialized

  // You can return Date, Map, Set, etc.

 

  if (!res.ok) {

    // This will activate the closest \`error.js\` Error Boundary

    throw new Error('Failed to fetch data')

  }

 

  return res.json()

}

 

export default async function Page() {

  const data = await getData()

 

  return <main></main>

}
```

> **알아 둘만 한**:
> 
> - Next.js 서버 컴포넌트에서 데이터를 가져올 때 필요할 수 있는 유용한 기능을 제공합니다. [`cookies`](https://nextjs.org/docs/14/app/api-reference/functions/cookies) 그리고 [`headers`](https://nextjs.org/docs/14/app/api-reference/functions/headers). 이로 인해 요청 시간 정보에 의존하므로 경로가 동적으로 렌더링됩니다.
> - 경로 처리기에서 경로 처리기는 React 구성 요소 트리의 일부가 아니기 때문에 요청이 메모화되지 않습니다.`fetch`
> - [서버 작업](https://nextjs.org/docs/14/app/building-your-application/data-fetching/server-actions-and-mutations) 에서 요청은 캐시되지 않습니다(기본값).`fetch` `cache: no-store`
> - TypeScript와 함께 서버 구성 요소에서 /를 사용하려면 TypeScript 이상을 사용해야 합니다.`async` `await` `5.1.3` `@types/react` `18.2.8`

### 데이터 캐싱

캐싱은 데이터를 저장하므로 모든 요청에서 데이터 원본에서 다시 가져올 필요가 없습니다.

기본적으로 Next.js 서버의 [데이터 캐시](https://nextjs.org/docs/14/app/building-your-application/caching#data-cache) 에 반환된 값을 자동으로 캐시합니다. 즉, 빌드 시 또는 요청 시 데이터를 가져오고, 캐시하고, 각 데이터 요청에서 재사용할 수 있습니다.`fetch`

```
// 'force-cache' is the default, and can be omitted

fetch('https://...', { cache: 'force-cache' })
```

그러나 예외가 있으며 다음과 같은 경우 요청이 캐시되지 않습니다.`fetch`

- Used inside a [Server Action](https://nextjs.org/docs/14/app/building-your-application/data-fetching/server-actions-and-mutations).
- Used inside a [Route Handler](https://nextjs.org/docs/14/app/building-your-application/routing/route-handlers) that uses the method.`POST`

> **What is the Data Cache?**
> 
> The Data Cache is a persistent [HTTP cache](https://developer.mozilla.org/docs/Web/HTTP/Caching). Depending on your platform, the cache can scale automatically and be [shared across multiple regions](https://vercel.com/docs/infrastructure/data-cache).
> 
> Learn more about the [Data Cache](https://nextjs.org/docs/14/app/building-your-application/caching#data-cache).

### Revalidating Data

Revalidation is the process of purging the Data Cache and re-fetching the latest data. This is useful when your data changes and you want to ensure you show the latest information.

Cached data can be revalidated in two ways:

- **Time-based revalidation**: Automatically revalidate data after a certain amount of time has passed. This is useful for data that changes infrequently and freshness is not as critical.
- **On-demand revalidation**: Manually revalidate data based on an event (e.g. form submission). On-demand revalidation can use a tag-based or path-based approach to revalidate groups of data at once. This is useful when you want to ensure the latest data is shown as soon as possible (e.g. when content from your headless CMS is updated).

#### Time-based Revalidation

To revalidate data at a timed interval, you can use the option of to set the cache lifetime of a resource (in seconds).`next.revalidate` `fetch`

```
fetch('https://...', { next: { revalidate: 3600 } })
```

Alternatively, to revalidate all requests in a route segment, you can use the [Segment Config Options](https://nextjs.org/docs/14/app/api-reference/file-conventions/route-segment-config).`fetch`

```
export const revalidate = 3600 // revalidate at most every hour
```

If you have multiple fetch requests in a statically rendered route, and each has a different revalidation frequency. The lowest time will be used for all requests. For dynamically rendered routes, each request will be revalidated independently.`fetch`

Learn more about [time-based revalidation](https://nextjs.org/docs/14/app/building-your-application/caching#time-based-revalidation).

#### On-demand Revalidation

Data can be revalidated on-demand by path ([`revalidatePath`](https://nextjs.org/docs/14/app/api-reference/functions/revalidatePath)) or by cache tag ([`revalidateTag`](https://nextjs.org/docs/14/app/api-reference/functions/revalidateTag)) inside a [Server Action](https://nextjs.org/docs/14/app/building-your-application/data-fetching/server-actions-and-mutations) or [Route Handler](https://nextjs.org/docs/14/app/building-your-application/routing/route-handlers).

Next.js has a cache tagging system for invalidating requests across routes.`fetch`

1. When using , you have the option to tag cache entries with one or more tags.`fetch`
2. Then, you can call to revalidate all entries associated with that tag.`revalidateTag`

For example, the following request adds the cache tag :`fetch` `collection`

app/page.tsx

```
export default async function Page() {

  const res = await fetch('https://...', { next: { tags: ['collection'] } })

  const data = await res.json()

  // ...

}
```

You can then revalidate this call tagged with by calling in a Server Action:`fetch` `collection` `revalidateTag`

app/actions.ts

```
'use server'

 

import { revalidateTag } from 'next/cache'

 

export default async function action() {

  revalidateTag('collection')

}
```

Learn more about [on-demand revalidation](https://nextjs.org/docs/14/app/building-your-application/caching#on-demand-revalidation).

If an error is thrown while attempting to revalidate data, the last successfully generated data will continue to be served from the cache. On the next subsequent request, Next.js will retry revalidating the data.

### Opting out of Data Caching

`fetch` requests are **not** cached if:

- The is added to requests.`cache: 'no-store'` `fetch`
- The option is added to individual requests.`revalidate: 0` `fetch`
- The request is inside a Router Handler that uses the method.`fetch` `POST`
- The request comes after the usage of or .`fetch` `headers` `cookies`
- The route segment option is used.`const dynamic = 'force-dynamic'`
- The route segment option is configured to skip cache by default.`fetchCache`
- The request uses or headers and there's an uncached request above it in the component tree.`fetch` `Authorization` `Cookie`

#### Individual Requestsfetch

To opt out of caching for individual requests, you can set the option in to . This will fetch data dynamically, on every request.`fetch` `cache` `fetch` `'no-store'`

```
fetch('https://...', { cache: 'no-store' })
```

View all the available options in the `cache` [`fetch` API reference](https://nextjs.org/docs/14/app/api-reference/functions/fetch).

#### Multiple Requestsfetch

If you have multiple requests in a route segment (e.g. a Layout or Page), you can configure the caching behavior of all data requests in the segment using the [Segment Config Options](https://nextjs.org/docs/14/app/api-reference/file-conventions/route-segment-config).`fetch`

However, we recommend configuring the caching behavior of each request individually. This gives you more granular control over the caching behavior.`fetch`

## Fetching data on the Server with third-party libraries

In cases where you're using a third-party library that doesn't support or expose (for example, a database, CMS, or ORM client), you can configure the caching and revalidating behavior of those requests using the [Route Segment Config Option](https://nextjs.org/docs/14/app/api-reference/file-conventions/route-segment-config) and React's function.`fetch` `cache`

Whether the data is cached or not will depend on whether the route segment is [statically or dynamically rendered](https://nextjs.org/docs/14/app/building-your-application/rendering/server-components#server-rendering-strategies). If the segment is static (default), the output of the request will be cached and revalidated as part of the route segment. If the segment is dynamic, the output of the request will *not* be cached and will be re-fetched on every request when the segment is rendered.

You can also use the experimental [`unstable_cache` API](https://nextjs.org/docs/14/app/api-reference/functions/unstable_cache).

### Example

In the example below:

- The React function is used to [memoize](https://nextjs.org/docs/14/app/building-your-application/caching#request-memoization) data requests.`cache`
- The option is set to in the Layout and Page segments, meaning the data will be cached and revalidated at most every hour.`revalidate` `3600`

app/utils.ts

```
import { cache } from 'react'

 

export const getItem = cache(async (id: string) => {

  const item = await db.item.findUnique({ id })

  return item

})
```

Although the function is called twice, only one query will be made to the database.`getItem`

app/item/\[id\]/layout.tsx

```
import { getItem } from '@/utils/get-item'

 

export const revalidate = 3600 // revalidate the data at most every hour

 

export default async function Layout({

  params: { id },

}: {

  params: { id: string }

}) {

  const item = await getItem(id)

  // ...

}
```

app/item/\[id\]/page.tsx

```
import { getItem } from '@/utils/get-item'

 

export const revalidate = 3600 // revalidate the data at most every hour

 

export default async function Page({

  params: { id },

}: {

  params: { id: string }

}) {

  const item = await getItem(id)

  // ...

}
```

## Fetching Data on the Client with Route Handlers

If you need to fetch data in a client component, you can call a [Route Handler](https://nextjs.org/docs/14/app/building-your-application/routing/route-handlers) from the client. Route Handlers execute on the server and return the data to the client. This is useful when you don't want to expose sensitive information to the client, such as API tokens.

See the [Route Handler](https://nextjs.org/docs/14/app/building-your-application/routing/route-handlers) documentation for examples.

> **Server Components and Route Handlers**
> 
> Since Server Components render on the server, you don't need to call a Route Handler from a Server Component to fetch data. Instead, you can fetch the data directly inside the Server Component.

## Fetching Data on the Client with third-party libraries

You can also fetch data on the client using a third-party library such as [SWR](https://swr.vercel.app/) or [TanStack Query](https://tanstack.com/query/latest). These libraries provide their own APIs for memoizing requests, caching, revalidating, and mutating data.

> **Future APIs**:
> 
> `use` is a React function that **accepts and handles a promise** returned by a function. Wrapping in is currently **not** recommended in Client Components and may trigger multiple re-renders. Learn more about in the `fetch` `use` `use` [React docs](https://react.dev/reference/react/use).