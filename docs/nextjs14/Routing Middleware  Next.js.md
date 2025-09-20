---
title: "Routing: Middleware | Next.js"
source: "https://nextjs.org/docs/14/app/building-your-application/routing/middleware"
author:
  - "[[Vercel]]"
published:
created: 2025-09-16
description: "Learn how to use Middleware to run code before a request is completed."
tags:
  - "clippings"
---
[애플리케이션 빌드](https://nextjs.org/docs/14/app/building-your-application) [라우팅](https://nextjs.org/docs/14/app/building-your-application/routing) 미들웨어

## 미들웨어

미들웨어를 사용하면 요청이 완료되기 전에 코드를 실행할 수 있습니다. 그런 다음 들어오는 요청에 따라 다시 작성, 경로 재지정, 요청 또는 응답 헤더 수정 또는 직접 응답하여 응답을 수정할 수 있습니다.

미들웨어는 캐시된 콘텐츠와 경로가 일치하기 전에 실행됩니다. 자세한 내용은 [일치하는 경로를](https://nextjs.org/docs/14/app/building-your-application/routing/#matching-paths) 참조하십시오.

## 고객 사례

미들웨어를 애플리케이션에 통합하면 성능, 보안 및 사용자 경험이 크게 향상될 수 있습니다. 미들웨어가 특히 효과적인 몇 가지 일반적인 시나리오는 다음과 같습니다.

- 인증 및 권한 부여: 특정 페이지나 API 경로에 대한 액세스 권한을 부여하기 전에 사용자 신원을 확인하고 세션 쿠키를 확인하세요.
- 서버 측 리디렉션: 특정 조건(예: 로케일, 사용자 역할)에 따라 서버 수준에서 사용자를 리디렉션합니다.
- 경로 재작성: 요청 속성을 기반으로 API 경로 또는 페이지에 대한 경로를 동적으로 다시 작성하여 A/B 테스트, 기능 출시 또는 레거시 경로를 지원합니다.
- 봇 탐지: 봇 트래픽을 탐지하고 차단하여 리소스를 보호합니다.
- 로깅 및 분석: 페이지 또는 API에서 처리하기 전에 통찰력을 얻기 위해 요청 데이터를 캡처하고 분석합니다.
- 기능 플래그: 원활한 기능 출시 또는 테스트를 위해 기능을 동적으로 활성화하거나 비활성화합니다.

미들웨어가 최적의 접근 방식이 아닐 수 있는 상황을 인식하는 것도 마찬가지로 중요합니다. 다음은 염두에 두어야 할 몇 가지 시나리오입니다.

- 복잡한 데이터 가져오기 및 조작: 미들웨어는 직접 데이터 가져오기 또는 조작을 위해 설계되지 않았으므로 대신 경로 처리기 또는 서버 측 유틸리티 내에서 수행해야 합니다.
- 무거운 계산 작업: 미들웨어는 가볍고 빠르게 응답해야 하며 그렇지 않으면 페이지 로드가 지연될 수 있습니다. 무거운 계산 작업이나 장기 실행 프로세스는 전용 경로 처리기 내에서 수행해야 합니다.
- 광범위한 세션 관리: 미들웨어는 기본 세션 작업을 관리할 수 있지만 광범위한 세션 관리는 전용 인증 서비스 또는 경로 처리기 내에서 관리해야 합니다.
- 직접 데이터베이스 작업: 미들웨어 내에서 직접 데이터베이스 작업을 수행하는 것은 권장되지 않습니다. 데이터베이스 상호 작용은 경로 처리기 또는 서버 측 유틸리티 내에서 수행되어야 합니다.

## 컨벤션

프로젝트 루트에 있는 파일(또는 )을 사용하여 미들웨어를 정의합니다. 예를 들어 또는 와 동일한 수준에서 또는 해당되는 경우 내부입니다.`middleware.ts``.js` `pages` `app` `src`

> **참고**: 프로젝트당 하나의 파일만 지원되지만 미들웨어 로직을 모듈식으로 구성할 수 있습니다. 미들웨어 기능을 별도의 또는 파일로 나누고 기본 파일로 가져옵니다. 이를 통해 중앙 집중식 제어를 위해 집계된 경로별 미들웨어를 보다 깔끔하게 관리할 수 있습니다. 단일 미들웨어 파일을 적용함으로써 구성을 단순화하고 잠재적인 충돌을 방지하며 여러 미들웨어 계층을 피하여 성능을 최적화합니다.`middleware.ts``.ts``.js` `middleware.ts` `middleware.ts`

## 본보기

middleware.ts

```
import { NextResponse } from 'next/server'

import type { NextRequest } from 'next/server'

 

// This function can be marked \`async\` if using \`await\` inside

export function middleware(request: NextRequest) {

  return NextResponse.redirect(new URL('/home', request.url))

}

 

// See "Matching Paths" below to learn more

export const config = {

  matcher: '/about/:path*',

}
```

## Matching Paths

Middleware will be invoked for **every route in your project**. Given this, it's crucial to use matchers to precisely target or exclude specific routes. The following is the execution order:

1. `headers` from `next.config.js`
2. `redirects` from `next.config.js`
3. Middleware (, , etc.) `rewrites` `redirects`
4. `beforeFiles` (`rewrites`) from `next.config.js`
5. Filesystem routes (, , , , etc.) `public/` `_next/static/` `pages/` `app/`
6. `afterFiles` (`rewrites`) from `next.config.js`
7. Dynamic Routes (`/blog/[slug]`)
8. `fallback` (`rewrites`) from `next.config.js`

There are two ways to define which paths Middleware will run on:

1. [Custom matcher config](https://nextjs.org/docs/14/app/building-your-application/routing/#matcher)
2. [Conditional statements](https://nextjs.org/docs/14/app/building-your-application/routing/#conditional-statements)

### Matcher

`matcher` allows you to filter Middleware to run on specific paths.

middleware.js

```
export const config = {

  matcher: '/about/:path*',

}
```

You can match a single path or multiple paths with an array syntax:

middleware.js

```
export const config = {

  matcher: ['/about/:path*', '/dashboard/:path*'],

}
```

The config allows full regex so matching like negative lookaheads or character matching is supported. An example of a negative lookahead to match all except specific paths can be seen here:`matcher`

middleware.js

```
export const config = {

  matcher: [

    /*

     * Match all request paths except for the ones starting with:

     * - api (API routes)

     * - _next/static (static files)

     * - _next/image (image optimization files)

     * - favicon.ico (favicon file)

     */

    '/((?!api|_next/static|_next/image|favicon.ico).*)',

  ],

}
```

You can also bypass Middleware for certain requests by using the or arrays, or a combination of both:`missing` `has`

middleware.js

```
export const config = {

  matcher: [

    /*

     * Match all request paths except for the ones starting with:

     * - api (API routes)

     * - _next/static (static files)

     * - _next/image (image optimization files)

     * - favicon.ico (favicon file)

     */

    {

      source: '/((?!api|_next/static|_next/image|favicon.ico).*)',

      missing: [

        { type: 'header', key: 'next-router-prefetch' },

        { type: 'header', key: 'purpose', value: 'prefetch' },

      ],

    },

 

    {

      source: '/((?!api|_next/static|_next/image|favicon.ico).*)',

      has: [

        { type: 'header', key: 'next-router-prefetch' },

        { type: 'header', key: 'purpose', value: 'prefetch' },

      ],

    },

 

    {

      source: '/((?!api|_next/static|_next/image|favicon.ico).*)',

      has: [{ type: 'header', key: 'x-present' }],

      missing: [{ type: 'header', key: 'x-missing', value: 'prefetch' }],

    },

  ],

}
```

> **Good to know**: The values need to be constants so they can be statically analyzed at build-time. Dynamic values such as variables will be ignored.`matcher`

Configured matchers:

1. MUST start with `/`
2. Can include named parameters: matches and but not `/about/:path` `/about/a` `/about/b` `/about/a/c`
3. Can have modifiers on named parameters (starting with ): matches because is *zero or more*. is *zero or one* and *one or more*`:``/about/:path*` `/about/a/b/c` `*``?``+`
4. Can use regular expression enclosed in parenthesis: is the same as `/about/(.*)` `/about/:path*`

Read more details on [path-to-regexp](https://github.com/pillarjs/path-to-regexp#path-to-regexp-1) documentation.

> **Good to know**: For backward compatibility, Next.js always considers as . Therefore, a matcher of will match.`/public` `/public/index` `/public/:path`

### Conditional Statements

middleware.ts

```
import { NextResponse } from 'next/server'

import type { NextRequest } from 'next/server'

 

export function middleware(request: NextRequest) {

  if (request.nextUrl.pathname.startsWith('/about')) {

    return NextResponse.rewrite(new URL('/about-2', request.url))

  }

 

  if (request.nextUrl.pathname.startsWith('/dashboard')) {

    return NextResponse.rewrite(new URL('/dashboard/user', request.url))

  }

}
```

## NextResponse

The API allows you to:`NextResponse`

- `redirect` the incoming request to a different URL
- `rewrite` the response by displaying a given URL
- Set request headers for API Routes, , and destinations `getServerSideProps` `rewrite`
- Set response cookies
- Set response headers

To produce a response from Middleware, you can:

1. `rewrite` to a route ([Page](https://nextjs.org/docs/14/app/building-your-application/routing/pages-and-layouts) or [Route Handler](https://nextjs.org/docs/14/app/building-your-application/routing/route-handlers)) that produces a response
2. return a directly. See [Producing a Response](https://nextjs.org/docs/14/app/building-your-application/routing/#producing-a-response) `NextResponse`

## Using Cookies

Cookies are regular headers. On a , they are stored in the header. On a they are in the header. Next.js provides a convenient way to access and manipulate these cookies through the extension on and .`Request` `Cookie` `Response` `Set-Cookie` `cookies` `NextRequest` `NextResponse`

1. For incoming requests, comes with the following methods: , , , and cookies. You can check for the existence of a cookie with or remove all cookies with .`cookies` `get` `getAll` `set` `delete` `has` `clear`
2. For outgoing responses, have the following methods , , , and .`cookies` `get` `getAll` `set` `delete`

middleware.ts

```
import { NextResponse } from 'next/server'

import type { NextRequest } from 'next/server'

 

export function middleware(request: NextRequest) {

  // Assume a "Cookie:nextjs=fast" header to be present on the incoming request

  // Getting cookies from the request using the \`RequestCookies\` API

  let cookie = request.cookies.get('nextjs')

  console.log(cookie) // => { name: 'nextjs', value: 'fast', Path: '/' }

  const allCookies = request.cookies.getAll()

  console.log(allCookies) // => [{ name: 'nextjs', value: 'fast' }]

 

  request.cookies.has('nextjs') // => true

  request.cookies.delete('nextjs')

  request.cookies.has('nextjs') // => false

 

  // Setting cookies on the response using the \`ResponseCookies\` API

  const response = NextResponse.next()

  response.cookies.set('vercel', 'fast')

  response.cookies.set({

    name: 'vercel',

    value: 'fast',

    path: '/',

  })

  cookie = response.cookies.get('vercel')

  console.log(cookie) // => { name: 'vercel', value: 'fast', Path: '/' }

  // The outgoing response will have a \`Set-Cookie:vercel=fast;path=/\` header.

 

  return response

}
```

## Setting Headers

You can set request and response headers using the API (setting *request* headers is available since Next.js v13.0.0).`NextResponse`

> **Good to know**: Avoid setting large headers as it might cause [431 Request Header Fields Too Large](https://developer.mozilla.org/docs/Web/HTTP/Status/431) error depending on your backend web server configuration.

### CORS

You can set CORS headers in Middleware to allow cross-origin requests, including [simple](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS#simple_requests) and [preflighted](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS#preflighted_requests) requests.

middleware.ts

```
import { NextRequest, NextResponse } from 'next/server'

 

const allowedOrigins = ['https://acme.com', 'https://my-app.org']

 

const corsOptions = {

  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',

  'Access-Control-Allow-Headers': 'Content-Type, Authorization',

}

 

export function middleware(request: NextRequest) {

  // Check the origin from the request

  const origin = request.headers.get('origin') ?? ''

  const isAllowedOrigin = allowedOrigins.includes(origin)

 

  // Handle preflighted requests

  const isPreflight = request.method === 'OPTIONS'

 

  if (isPreflight) {

    const preflightHeaders = {

      ...(isAllowedOrigin && { 'Access-Control-Allow-Origin': origin }),

      ...corsOptions,

    }

    return NextResponse.json({}, { headers: preflightHeaders })

  }

 

  // Handle simple requests

  const response = NextResponse.next()

 

  if (isAllowedOrigin) {

    response.headers.set('Access-Control-Allow-Origin', origin)

  }

 

  Object.entries(corsOptions).forEach(([key, value]) => {

    response.headers.set(key, value)

  })

 

  return response

}

 

export const config = {

  matcher: '/api/:path*',

}
```

> **Good to know:** You can configure CORS headers for individual routes in [Route Handlers](https://nextjs.org/docs/14/app/building-your-application/routing/route-handlers#cors).

## Producing a Response

You can respond from Middleware directly by returning a or instance. (This is available since `Response` `NextResponse` [Next.js v13.1.0](https://nextjs.org/blog/next-13-1#nextjs-advanced-middleware))

middleware.ts

```
import { NextRequest } from 'next/server'

import { isAuthenticated } from '@lib/auth'

 

// Limit the middleware to paths starting with \`/api/\`

export const config = {

  matcher: '/api/:function*',

}

 

export function middleware(request: NextRequest) {

  // Call our authentication function to check the request

  if (!isAuthenticated(request)) {

    // Respond with JSON indicating an error message

    return Response.json(

      { success: false, message: 'authentication failed' },

      { status: 401 }

    )

  }

}
```

### waitUntil and NextFetchEvent

The object extends the native `NextFetchEvent` [`FetchEvent`](https://developer.mozilla.org/docs/Web/API/FetchEvent) object, and includes the [`waitUntil()`](https://developer.mozilla.org/docs/Web/API/ExtendableEvent/waitUntil) method.

The method takes a promise as an argument, and extends the lifetime of the Middleware until the promise settles. This is useful for performing work in the background.`waitUntil()`

middleware.ts

```
import { NextResponse } from 'next/server'

import type { NextFetchEvent, NextRequest } from 'next/server'

 

export function middleware(req: NextRequest, event: NextFetchEvent) {

  event.waitUntil(

    fetch('https://my-analytics-platform.com', {

      method: 'POST',

      body: JSON.stringify({ pathname: req.nextUrl.pathname }),

    })

  )

 

  return NextResponse.next()

}
```

## Advanced Middleware Flags

In of Next.js two additional flags were introduced for middleware, and to handle advanced use cases.`v13.1` `skipMiddlewareUrlNormalize` `skipTrailingSlashRedirect`

`skipTrailingSlashRedirect` disables Next.js redirects for adding or removing trailing slashes. This allows custom handling inside middleware to maintain the trailing slash for some paths but not others, which can make incremental migrations easier.

next.config.js

```
module.exports = {

  skipTrailingSlashRedirect: true,

}
```

middleware.js

```
const legacyPrefixes = ['/docs', '/blog']

 

export default async function middleware(req) {

  const { pathname } = req.nextUrl

 

  if (legacyPrefixes.some((prefix) => pathname.startsWith(prefix))) {

    return NextResponse.next()

  }

 

  // apply trailing slash handling

  if (

    !pathname.endsWith('/') &&

    !pathname.match(/((?!\.well-known(?:\/.*)?)(?:[^/]+\/)*[^/]+\.\w+)/)

  ) {

    req.nextUrl.pathname += '/'

    return NextResponse.redirect(req.nextUrl)

  }

}
```

`skipMiddlewareUrlNormalize` allows for disabling the URL normalization in Next.js to make handling direct visits and client-transitions the same. In some advanced cases, this option provides full control by using the original URL.

next.config.js

```
module.exports = {

  skipMiddlewareUrlNormalize: true,

}
```

middleware.js

```
export default async function middleware(req) {

  const { pathname } = req.nextUrl

 

  // GET /_next/data/build-id/hello.json

 

  console.log(pathname)

  // with the flag this now /_next/data/build-id/hello.json

  // without the flag this would be normalized to /hello

}
```

## Runtime

Middleware currently only supports the [Edge runtime](https://nextjs.org/docs/14/app/building-your-application/rendering/edge-and-nodejs-runtimes). The Node.js runtime can not be used.