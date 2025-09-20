---
title: "Routing: Route Handlers | Next.js"
source: "https://nextjs.org/docs/14/app/building-your-application/routing/route-handlers"
author:
  - "[[Vercel]]"
published:
created: 2025-09-16
description: "Create custom request handlers for a given route using the Web's Request and Response APIs."
tags:
  - "clippings"
---
## 경로 처리기

경로 처리기를 사용하면 웹을 사용하여 지정된 경로에 대한 사용자 지정 요청 처리기를 만들 수 있습니다. [요청](https://developer.mozilla.org/docs/Web/API/Request) 그리고 [응답](https://developer.mozilla.org/docs/Web/API/Response) API를 사용합니다.

![Route.js 특수 파일](https://nextjs.org/_next/image?url=https%3A%2F%2Fh8DxKfmAPhn8O0p3.public.blob.vercel-storage.com%2Fdocs%2Flight%2Froute-special-file.png&w=1920&q=75)

Route.js 특수 파일

> **알아두면 좋은 정보**: 경로 처리기는 디렉토리 내에서만 사용할 수 있습니다. 디렉터리 내의 [API 경로](https://nextjs.org/docs/14/pages/building-your-application/routing/api-routes) 와 동일하므로 API 경로와 경로 처리기를 함께 사용할 필요가 **없습니다**.`app` `pages`

## 컨벤션

경로 핸들러는 [`route.js|ts` 파일](https://nextjs.org/docs/14/app/api-reference/file-conventions/route) 디렉토리 내부:`app`

앱/API/route.ts

```
export const dynamic = 'force-dynamic' // defaults to auto

export async function GET(request: Request) {}
```

경로 처리기는 및 와 유사하게 디렉터리 내에 중첩될 수 있습니다. 그러나 와 동일한 경로 세그먼트 수준에는 파일이 있을 **수 없습니다**.`app` `page.js` `layout.js` `route.js` `page.js`

### 지원되는 HTTP 메서드

다음 [HTTP 메서드](https://developer.mozilla.org/docs/Web/HTTP/Methods) 지원됩니다:,,,,,, 및. 지원되지 않는 메서드가 호출되면 응답Next.js 반환합니다.`GET` `POST` `PUT` `PATCH` `DELETE` `HEAD` `OPTIONS` `405 Method Not Allowed`

### 확장 및 APINextRequestNextResponse

네이티브 지원 외에도 [요청](https://developer.mozilla.org/docs/Web/API/Request) 그리고 [응답](https://developer.mozilla.org/docs/Web/API/Response). Next.js 다음과 같이 확장합니다. [`NextRequest`](https://nextjs.org/docs/14/app/api-reference/functions/next-request) 그리고 [`NextResponse`](https://nextjs.org/docs/14/app/api-reference/functions/next-response) 고급 사용 사례에 편리한 도우미를 제공합니다.

## 행동

### 캐싱

경로 처리기는 개체와 함께 메서드를 사용할 때 기본적으로 캐시됩니다.`GET` `Response`

> **TypeScript 경고:** TypeScript 5.2에서만 유효합니다. 더 낮은 TypeScript 버전을 사용하는 경우 `Response.json()` [`NextResponse.json()`](https://nextjs.org/docs/14/app/api-reference/functions/next-response#json) 대신 입력된 응답의 경우.

### 캐싱 옵트아웃

You can opt out of caching by:

- Using the object with the method.`Request` `GET`
- Using any of the other HTTP methods.
- Using [Dynamic Functions](https://nextjs.org/docs/14/app/building-your-application/routing/#dynamic-functions) like and .`cookies` `headers`
- The [Segment Config Options](https://nextjs.org/docs/14/app/building-your-application/routing/#segment-config-options) manually specifies dynamic mode.

For example:

Similarly, the method will cause the Route Handler to be evaluated dynamically.`POST`

> **Good to know**: Like API Routes, Route Handlers can be used for cases like handling form submissions. A new abstraction for [handling forms and mutations](https://nextjs.org/docs/14/app/building-your-application/data-fetching/server-actions-and-mutations) that integrates deeply with React is being worked on.

### Route Resolution

You can consider a the lowest level routing primitive.`route`

- They **do not** participate in layouts or client-side navigations like .`page`
- There **cannot** be a file at the same route as .`route.js` `page.js`

| Page | Route | Result |
| --- | --- | --- |
| `app/page.js` | `app/route.js` | Conflict |
| `app/page.js` | `app/api/route.js` | Valid |
| `app/[user]/page.js` | `app/api/route.js` | Valid |

Each or file takes over all HTTP verbs for that route.`route.js` `page.js`

app/page.js

```
export default function Page() {

  return <h1>Hello, Next.js!</h1>

}

 

// ❌ Conflict

// \`app/route.js\`

export async function POST(request) {}
```

## Examples

The following examples show how to combine Route Handlers with other Next.js APIs and features.

### Revalidating Cached Data

You can [revalidate cached data](https://nextjs.org/docs/14/app/building-your-application/data-fetching/fetching-caching-and-revalidating#revalidating-data) using the [`next.revalidate`](https://nextjs.org/docs/14/app/building-your-application/data-fetching/fetching-caching-and-revalidating#revalidating-data) option:

app/items/route.ts

```
export async function GET() {

  const res = await fetch('https://data.mongodb-api.com/...', {

    next: { revalidate: 60 }, // Revalidate every 60 seconds

  })

  const data = await res.json()

 

  return Response.json(data)

}
```

Alternatively, you can use the [`revalidate` segment config option](https://nextjs.org/docs/14/app/api-reference/file-conventions/route-segment-config#revalidate):

```
export const revalidate = 60
```

### Dynamic Functions

Route Handlers can be used with dynamic functions from Next.js, like [`cookies`](https://nextjs.org/docs/14/app/api-reference/functions/cookies) and [`headers`](https://nextjs.org/docs/14/app/api-reference/functions/headers).

#### Cookies

You can read or set cookies with [`cookies`](https://nextjs.org/docs/14/app/api-reference/functions/cookies) from . This server function can be called directly in a Route Handler, or nested inside of another function.`next/headers`

Alternatively, you can return a new using the `Response` [`Set-Cookie`](https://developer.mozilla.org/docs/Web/HTTP/Headers/Set-Cookie) header.

You can also use the underlying Web APIs to read cookies from the request ([`NextRequest`](https://nextjs.org/docs/14/app/api-reference/functions/next-request)):

#### Headers

You can read headers with [`headers`](https://nextjs.org/docs/14/app/api-reference/functions/headers) from . This server function can be called directly in a Route Handler, or nested inside of another function.`next/headers`

This instance is read-only. To set headers, you need to return a new with new .`headers` `Response` `headers`

You can also use the underlying Web APIs to read headers from the request ([`NextRequest`](https://nextjs.org/docs/14/app/api-reference/functions/next-request)):

### Redirects

### Dynamic Route Segments

> We recommend reading the [Defining Routes](https://nextjs.org/docs/14/app/building-your-application/routing/defining-routes) page before continuing.

Route Handlers can use [Dynamic Segments](https://nextjs.org/docs/14/app/building-your-application/routing/dynamic-routes) to create request handlers from dynamic data.

app/items/\[slug\]/route.ts

```
export async function GET(

  request: Request,

  { params }: { params: { slug: string } }

) {

  const slug = params.slug // 'a', 'b', or 'c'

}
```

| Route | Example URL | `params` |
| --- | --- | --- |
| `app/items/[slug]/route.js` | `/items/a` | `{ slug: 'a' }` |
| `app/items/[slug]/route.js` | `/items/b` | `{ slug: 'b' }` |
| `app/items/[slug]/route.js` | `/items/c` | `{ slug: 'c' }` |

### URL Query Parameters

The request object passed to the Route Handler is a instance, which has [some additional convenience methods](https://nextjs.org/docs/14/app/api-reference/functions/next-request#nexturl), including for more easily handling query parameters.`NextRequest`

app/api/search/route.ts

```
import { type NextRequest } from 'next/server'

 

export function GET(request: NextRequest) {

  const searchParams = request.nextUrl.searchParams

  const query = searchParams.get('query')

  // query is "hello" for /api/search?query=hello

}
```

### Streaming

Streaming is commonly used in combination with Large Language Models (LLMs), such as OpenAI, for AI-generated content. Learn more about the [AI SDK](https://sdk.vercel.ai/docs).

app/api/chat/route.ts

```
import OpenAI from 'openai'

import { OpenAIStream, StreamingTextResponse } from 'ai'

 

const openai = new OpenAI({

  apiKey: process.env.OPENAI_API_KEY,

})

 

export const runtime = 'edge'

 

export async function POST(req: Request) {

  const { messages } = await req.json()

  const response = await openai.chat.completions.create({

    model: 'gpt-3.5-turbo',

    stream: true,

    messages,

  })

 

  const stream = OpenAIStream(response)

 

  return new StreamingTextResponse(stream)

}
```

These abstractions use the Web APIs to create a stream. You can also use the underlying Web APIs directly.

app/api/route.ts

```
// https://developer.mozilla.org/docs/Web/API/ReadableStream#convert_async_iterator_to_stream

function iteratorToStream(iterator: any) {

  return new ReadableStream({

    async pull(controller) {

      const { value, done } = await iterator.next()

 

      if (done) {

        controller.close()

      } else {

        controller.enqueue(value)

      }

    },

  })

}

 

function sleep(time: number) {

  return new Promise((resolve) => {

    setTimeout(resolve, time)

  })

}

 

const encoder = new TextEncoder()

 

async function* makeIterator() {

  yield encoder.encode('<p>One</p>')

  await sleep(200)

  yield encoder.encode('<p>Two</p>')

  await sleep(200)

  yield encoder.encode('<p>Three</p>')

}

 

export async function GET() {

  const iterator = makeIterator()

  const stream = iteratorToStream(iterator)

 

  return new Response(stream)

}
```

### Request Body

You can read the body using the standard Web API methods:`Request`

app/items/route.ts

```
export async function POST(request: Request) {

  const res = await request.json()

  return Response.json({ res })

}
```

### Request Body FormData

You can read the using the function:`FormData` `request.formData()`

app/items/route.ts

```
export async function POST(request: Request) {

  const formData = await request.formData()

  const name = formData.get('name')

  const email = formData.get('email')

  return Response.json({ name, email })

}
```

Since data are all strings, you may want to use `formData` [`zod-form-data`](https://www.npmjs.com/zod-form-data) to validate the request and retrieve data in the format you prefer (e.g. ).`number`

### CORS

You can set CORS headers for a specific Route Handler using the standard Web API methods:

> **Good to know**:
> 
> - To add CORS headers to multiple Route Handlers, you can use [Middleware](https://nextjs.org/docs/14/app/building-your-application/routing/middleware#cors) or the [`next.config.js` file](https://nextjs.org/docs/14/app/api-reference/next-config-js/headers#cors).
> - Alternatively, see our [CORS example](https://github.com/vercel/examples/blob/main/edge-functions/cors/lib/cors.ts) package.

### Webhooks

You can use a Route Handler to receive webhooks from third-party services:

app/api/route.ts

```
export async function POST(request: Request) {

  try {

    const text = await request.text()

    // Process the webhook payload

  } catch (error) {

    return new Response(\`Webhook error: ${error.message}\`, {

      status: 400,

    })

  }

 

  return new Response('Success!', {

    status: 200,

  })

}
```

Notably, unlike API Routes with the Pages Router, you do not need to use to use any additional configuration.`bodyParser`

### Edge and Node.js Runtimes

Route Handlers have an isomorphic Web API to support both Edge and Node.js runtimes seamlessly, including support for streaming. Since Route Handlers use the same [route segment configuration](https://nextjs.org/docs/14/app/api-reference/file-conventions/route-segment-config) as Pages and Layouts, they support long-awaited features like general-purpose [statically regenerated](https://nextjs.org/docs/14/app/building-your-application/data-fetching/fetching-caching-and-revalidating#revalidating-data) Route Handlers.

You can use the segment config option to specify the runtime:`runtime`

```
export const runtime = 'edge' // 'nodejs' is the default
```

### Non-UI Responses

You can use Route Handlers to return non-UI content. Note that [`sitemap.xml`](https://nextjs.org/docs/14/app/api-reference/file-conventions/metadata/sitemap#generating-a-sitemap-using-code-js-ts), [`robots.txt`](https://nextjs.org/docs/14/app/api-reference/file-conventions/metadata/robots#generate-a-robots-file), [`app icons`](https://nextjs.org/docs/14/app/api-reference/file-conventions/metadata/app-icons#generate-icons-using-code-js-ts-tsx), and [open graph images](https://nextjs.org/docs/14/app/api-reference/file-conventions/metadata/opengraph-image) all have built-in support.

### Segment Config Options

Route Handlers use the same [route segment configuration](https://nextjs.org/docs/14/app/api-reference/file-conventions/route-segment-config) as pages and layouts.

app/items/route.ts

```
export const dynamic = 'auto'

export const dynamicParams = true

export const revalidate = false

export const fetchCache = 'auto'

export const runtime = 'nodejs'

export const preferredRegion = 'auto'
```

See the [API reference](https://nextjs.org/docs/14/app/api-reference/file-conventions/route-segment-config) for more details.

## API Reference

Learn more about the route.js file.[Introduction](https://nextjs.org/docs/14/app/api-reference/file-conventions/route)

[...](https://nextjs.org/docs/14/app/api-reference/file-conventions/route)

[File Conventions](https://nextjs.org/docs/14/app/api-reference/file-conventions/route)

route.js

API reference for the route.js special file.

[View original](https://nextjs.org/docs/14/app/api-reference/file-conventions/route)