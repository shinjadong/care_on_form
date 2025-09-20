---
title: "Routing: Redirecting | Next.js"
source: "https://nextjs.org/docs/14/app/building-your-application/routing/redirecting"
author:
  - "[[Vercel]]"
published:
created: 2025-09-16
description: "Learn the different ways to handle redirects in Next.js."
tags:
  - "clippings"
---
[애플리케이션 빌드](https://nextjs.org/docs/14/app/building-your-application) [라우팅](https://nextjs.org/docs/14/app/building-your-application/routing) 리디렉션

## 리디렉션

Next.js에서 리디렉션을 처리할 수 있는 몇 가지 방법이 있습니다. 이 페이지에서는 사용 가능한 각 옵션, 사용 사례 및 많은 수의 리디렉션을 관리하는 방법을 살펴봅니다.

| API | 목적 | 어디 | 상태 코드 |
| --- | --- | --- | --- |
| [`redirect`](https://nextjs.org/docs/14/app/building-your-application/routing/#redirect-function) | 변형 또는 이벤트 후 사용자 리디렉션 | 서버 구성 요소, 서버 작업, 경로 처리기 | 307(임시) 또는 303(서버 작업) |
| [`permanentRedirect`](https://nextjs.org/docs/14/app/building-your-application/routing/#permanentredirect-function) | 변형 또는 이벤트 후 사용자 리디렉션 | 서버 구성 요소, 서버 작업, 경로 처리기 | 308 (영구) |
| [`useRouter`](https://nextjs.org/docs/14/app/building-your-application/routing/#userouter-hook) | 클라이언트 쪽 탐색 수행 | 클라이언트 구성 요소의 이벤트 처리기 | 해당 사항 없음 |
| [`redirects` 안으로 `next.config.js`](https://nextjs.org/docs/14/app/building-your-application/routing/#redirects-in-nextconfigjs) | 경로를 기반으로 들어오는 요청 리디렉션 | `next.config.js` 파일 | 307(임시) 또는 308(영구) |
| [`NextResponse.redirect`](https://nextjs.org/docs/14/app/building-your-application/routing/#nextresponseredirect-in-middleware) | 조건에 따라 들어오는 요청 리디렉션 | 미들웨어 | 어떤 |

## redirect 기능

이 함수를 사용하면 사용자를 다른 URL로 리디렉션할 수 있습니다. [서버 구성 요소](https://nextjs.org/docs/14/app/building-your-application/rendering/server-components), [경로 처리기](https://nextjs.org/docs/14/app/building-your-application/routing/route-handlers) 및 [서버 작업을](https://nextjs.org/docs/14/app/building-your-application/data-fetching/server-actions-and-mutations) 호출할 수 있습니다.`redirect` `redirect`

`redirect` 돌연변이 또는 이벤트 후에 자주 사용됩니다. 예를 들어 게시물을 만드는 것은 다음과 같습니다.

> **알아 둘만 한**:
> 
> - `redirect` 기본적으로 307(임시 리디렉션) 상태 코드를 반환합니다. 서버 작업에서 사용하면 POST 요청의 결과로 성공 페이지로 리디렉션하는 데 일반적으로 사용되는 303(기타 참조)을 반환합니다.
> - `redirect` 내부적으로 오류를 발생시키므로 블록 외부에서 호출해야 합니다.`try/catch`
> - `redirect` 렌더링 프로세스 중에 클라이언트 컴포넌트에서 호출할 수 있지만 이벤트 핸들러에서는 호출할 수 없습니다.[`useRouter` 갈고리](https://nextjs.org/docs/14/app/building-your-application/routing/#userouter-hook) 대신에.
> - `redirect` 또한 절대 URL을 허용하며 외부 링크로 리디렉션하는 데 사용할 수 있습니다.
> - 렌더링 프로세스 전에 리디렉션하려면 [`next.config.js`](https://nextjs.org/docs/14/app/building-your-application/routing/#redirects-in-nextconfigjs) 또는 [미들웨어.](https://nextjs.org/docs/14/app/building-your-application/routing/#nextresponseredirect-in-middleware)

참조 [`redirect` API 참조](https://nextjs.org/docs/14/app/api-reference/functions/redirect) 자세한 내용은.

## permanentRedirect 기능

이 함수를 사용하면 사용자를 다른 URL로 **영구적으로** 리디렉션할 수 있습니다. [서버 구성 요소](https://nextjs.org/docs/14/app/building-your-application/rendering/server-components), [경로 처리기](https://nextjs.org/docs/14/app/building-your-application/routing/route-handlers) 및 [서버 작업을](https://nextjs.org/docs/14/app/building-your-application/data-fetching/server-actions-and-mutations) 호출할 수 있습니다.`permanentRedirect` `permanentRedirect`

`permanentRedirect` is often used after a mutation or event that changes an entity's canonical URL, such as updating a user's profile URL after they change their username:

> **Good to know**:
> 
> - `permanentRedirect` returns a 308 (permanent redirect) status code by default.
> - `permanentRedirect` also accepts absolute URLs and can be used to redirect to external links.
> - If you'd like to redirect before the render process, use [`next.config.js`](https://nextjs.org/docs/14/app/building-your-application/routing/#redirects-in-nextconfigjs) or [Middleware](https://nextjs.org/docs/14/app/building-your-application/routing/#nextresponseredirect-in-middleware).

See the [`permanentRedirect` API reference](https://nextjs.org/docs/14/app/api-reference/functions/permanentRedirect) for more information.

## useRouter() hook

If you need to redirect inside an event handler in a Client Component, you can use the method from the hook. For example:`push` `useRouter`

> **Good to know**:
> 
> - If you don't need to programmatically navigate a user, you should use a [`<Link>`](https://nextjs.org/docs/14/app/api-reference/components/link) component.

See the [`useRouter` API reference](https://nextjs.org/docs/14/app/api-reference/functions/use-router) for more information.

## redirects in next.config.js

The option in the file allows you to redirect an incoming request path to a different destination path. This is useful when you change the URL structure of pages or have a list of redirects that are known ahead of time.`redirects` `next.config.js`

`redirects` supports [path](https://nextjs.org/docs/14/app/api-reference/next-config-js/redirects#path-matching), [header, cookie, and query matching](https://nextjs.org/docs/14/app/api-reference/next-config-js/redirects#header-cookie-and-query-matching), giving you the flexibility to redirect users based on an incoming request.

To use , add the option to your file:`redirects` `next.config.js`

next.config.js

```
module.exports = {

  async redirects() {

    return [

      // Basic redirect

      {

        source: '/about',

        destination: '/',

        permanent: true,

      },

      // Wildcard path matching

      {

        source: '/blog/:slug',

        destination: '/news/:slug',

        permanent: true,

      },

    ]

  },

}
```

See the [`redirects` API reference](https://nextjs.org/docs/14/app/api-reference/next-config-js/redirects) for more information.

> **Good to know**:
> 
> - `redirects` can return a 307 (Temporary Redirect) or 308 (Permanent Redirect) status code with the option.`permanent`
> - `redirects` may have a limit on platforms. For example, on Vercel, there's a limit of 1,024 redirects. To manage a large number of redirects (1000+), consider creating a custom solution using [Middleware](https://nextjs.org/docs/14/app/building-your-application/routing/middleware). See [managing redirects at scale](https://nextjs.org/docs/14/app/building-your-application/routing/#managing-redirects-at-scale-advanced) for more.
> - `redirects` runs **before** Middleware.

## NextResponse.redirect in Middleware

Middleware allows you to run code before a request is completed. Then, based on the incoming request, redirect to a different URL using . This is useful if you want to redirect users based on a condition (e.g. authentication, session management, etc) or have [a large number of redirects](https://nextjs.org/docs/14/app/building-your-application/routing/#managing-redirects-at-scale-advanced).`NextResponse.redirect`

For example, to redirect the user to a page if they are not authenticated:`/login`

> **Good to know**:
> 
> - Middleware runs **after** in and **before** rendering.`redirects` `next.config.js`

See the [Middleware](https://nextjs.org/docs/14/app/building-your-application/routing/middleware) documentation for more information.

## Managing redirects at scale (advanced)

To manage a large number of redirects (1000+), you may consider creating a custom solution using Middleware. This allows you to handle redirects programmatically without having to redeploy your application.

To do this, you'll need to consider:

1. Creating and storing a redirect map.
2. Optimizing data lookup performance.

> **Next.js Example**: See our [Middleware with Bloom filter](https://redirects-bloom-filter.vercel.app/) example for an implementation of the recommendations below.

### 1\. Creating and storing a redirect map

A redirect map is a list of redirects that you can store in a database (usually a key-value store) or JSON file.

Consider the following data structure:

```
{

  "/old": {

    "destination": "/new",

    "permanent": true

  },

  "/blog/post-old": {

    "destination": "/blog/post-new",

    "permanent": true

  }

}
```

In [Middleware](https://nextjs.org/docs/14/app/building-your-application/routing/middleware), you can read from a database such as Vercel's [Edge Config](https://vercel.com/docs/storage/edge-config/get-started?utm_source=next-site&utm_medium=docs&utm_campaign=next-website) or [Redis](https://vercel.com/docs/storage/vercel-kv?utm_source=next-site&utm_medium=docs&utm_campaign=next-website), and redirect the user based on the incoming request:

middleware.ts

```
import { NextResponse, NextRequest } from 'next/server'

import { get } from '@vercel/edge-config'

 

type RedirectEntry = {

  destination: string

  permanent: boolean

}

 

export async function middleware(request: NextRequest) {

  const pathname = request.nextUrl.pathname

  const redirectData = await get(pathname)

 

  if (redirectData && typeof redirectData === 'string') {

    const redirectEntry: RedirectEntry = JSON.parse(redirectData)

    const statusCode = redirectEntry.permanent ? 308 : 307

    return NextResponse.redirect(redirectEntry.destination, statusCode)

  }

 

  // No redirect found, continue without redirecting

  return NextResponse.next()

}
```

### 2\. Optimizing data lookup performance

Reading a large dataset for every incoming request can be slow and expensive. There are two ways you can optimize data lookup performance:

- Use a database that is optimized for fast reads, such as [Vercel Edge Config](https://vercel.com/docs/storage/edge-config/get-started?utm_source=next-site&utm_medium=docs&utm_campaign=next-website) or [Redis](https://vercel.com/docs/storage/vercel-kv?utm_source=next-site&utm_medium=docs&utm_campaign=next-website).
- Use a data lookup strategy such as a [Bloom filter](https://en.wikipedia.org/wiki/Bloom_filter) to efficiently check if a redirect exists **before** reading the larger redirects file or database.

Considering the previous example, you can import a generated bloom filter file into Middleware, then, check if the incoming request pathname exists in the bloom filter.

If it does, forward the request to a [Route Handler](https://nextjs.org/docs/14/app/building-your-application/routing/route-handlers) which will check the actual file and redirect the user to the appropriate URL. This avoids importing a large redirects file into Middleware, which can slow down every incoming request.

middleware.ts

```
import { NextResponse, NextRequest } from 'next/server'

import { ScalableBloomFilter } from 'bloom-filters'

import GeneratedBloomFilter from './redirects/bloom-filter.json'

 

type RedirectEntry = {

  destination: string

  permanent: boolean

}

 

// Initialize bloom filter from a generated JSON file

const bloomFilter = ScalableBloomFilter.fromJSON(GeneratedBloomFilter as any)

 

export async function middleware(request: NextRequest) {

  // Get the path for the incoming request

  const pathname = request.nextUrl.pathname

 

  // Check if the path is in the bloom filter

  if (bloomFilter.has(pathname)) {

    // Forward the pathname to the Route Handler

    const api = new URL(

      \`/api/redirects?pathname=${encodeURIComponent(request.nextUrl.pathname)}\`,

      request.nextUrl.origin

    )

 

    try {

      // Fetch redirect data from the Route Handler

      const redirectData = await fetch(api)

 

      if (redirectData.ok) {

        const redirectEntry: RedirectEntry | undefined =

          await redirectData.json()

 

        if (redirectEntry) {

          // Determine the status code

          const statusCode = redirectEntry.permanent ? 308 : 307

 

          // Redirect to the destination

          return NextResponse.redirect(redirectEntry.destination, statusCode)

        }

      }

    } catch (error) {

      console.error(error)

    }

  }

 

  // No redirect found, continue the request without redirecting

  return NextResponse.next()

}
```

Then, in the Route Handler:

app/redirects/route.ts

```
import { NextRequest, NextResponse } from 'next/server'

import redirects from '@/app/redirects/redirects.json'

 

type RedirectEntry = {

  destination: string

  permanent: boolean

}

 

export function GET(request: NextRequest) {

  const pathname = request.nextUrl.searchParams.get('pathname')

  if (!pathname) {

    return new Response('Bad Request', { status: 400 })

  }

 

  // Get the redirect entry from the redirects.json file

  const redirect = (redirects as Record<string, RedirectEntry>)[pathname]

 

  // Account for bloom filter false positives

  if (!redirect) {

    return new Response('No redirect', { status: 400 })

  }

 

  // Return the redirect entry

  return NextResponse.json(redirect)

}
```

> **Good to know:**
> 
> - To generate a bloom filter, you can use a library like [`bloom-filters`](https://www.npmjs.com/package/bloom-filters).
> - You should validate requests made to your Route Handler to prevent malicious requests.[Introduction](https://nextjs.org/docs/14/app/api-reference/functions/redirect)

[...](https://nextjs.org/docs/14/app/api-reference/functions/redirect)

[Functions](https://nextjs.org/docs/14/app/api-reference/functions/redirect)

redirect

API Reference for the redirect function.

[View original](https://nextjs.org/docs/14/app/api-reference/functions/redirect)permanentRedirect

Introduction

...

Functions

API Reference for the permanentRedirect function.

[View original](https://nextjs.org/docs/14/app/api-reference/functions/permanentRedirect)Middleware

Introduction

...

Routing

Learn how to use Middleware to run code before a request is completed.

[View original](https://nextjs.org/docs/14/app/building-your-application/routing/middleware)redirects

Introduction

...

next.config.js Options

Add redirects to your Next.js app.

[View original](https://nextjs.org/docs/14/app/api-reference/next-config-js/redirects)