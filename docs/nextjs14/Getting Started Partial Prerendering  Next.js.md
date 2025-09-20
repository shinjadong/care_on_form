---
title: "Getting Started: Partial Prerendering | Next.js"
source: "https://nextjs.org/docs/app/getting-started/partial-prerendering"
author:
  - "[[Vercel]]"
published:
created: 2025-09-16
description: "Learn how to use Partial Prerendering and combine the benefits of static and dynamic rendering."
tags:
  - "clippings"
---
## Partial Prerendering

Partial Prerendering (PPR) is a rendering strategy that allows you to combine static and dynamic content in the same route. This improves the initial page performance while still supporting personalized, dynamic data.

![Partially Prerendered Product Page showing static nav and product information, and dynamic cart and recommended products](https://nextjs.org/_next/image?url=https%3A%2F%2Fh8DxKfmAPhn8O0p3.public.blob.vercel-storage.com%2Flearn%2Flight%2Fthinking-in-ppr.png&w=1920&q=75)

Partially Prerendered Product Page showing static nav and product information, and dynamic cart and recommended products

When a user visits a route:

- The server sends a **shell** containing the static content, ensuring a fast initial load.
- The shell leaves **holes** for the dynamic content that will load in asynchronously.
- The dynamic holes are **streamed in parallel**, reducing the overall load time of the page.

> **🎥 Watch:** Why PPR and how it works → [유튜브(10분)](https://www.youtube.com/watch?v=MTcPrTIBkpA).

## How does Partial Prerendering work?

To understand Partial Prerendering, it helps to be familiar with the rendering strategies available in Next.js.

### Static Rendering

With Static Rendering, HTML is generated ahead of time—either at build time or through [revalidation](https://nextjs.org/docs/app/guides/incremental-static-regeneration). The result is cached and shared across users and requests.

In Partial Prerendering, Next.js prerenders a **static shell** for a route. This can include the layout and any other components that don't depend on request-time data.

### Dynamic Rendering

With Dynamic Rendering, HTML is generated at **request time**. This allows you to serve personalized content based on request-time data.

A component becomes dynamic if it uses the following APIs:

- [`cookies`](https://nextjs.org/docs/app/api-reference/functions/cookies)
- [`headers`](https://nextjs.org/docs/app/api-reference/functions/headers)
- [`connection`](https://nextjs.org/docs/app/api-reference/functions/connection)
- [`draftMode`](https://nextjs.org/docs/app/api-reference/functions/draft-mode)
- [`searchParams` prop](https://nextjs.org/docs/app/api-reference/file-conventions/page#searchparams-optional)
- [`unstable_noStore`](https://nextjs.org/docs/app/api-reference/functions/unstable_noStore)
- [`fetch`](https://nextjs.org/docs/app/api-reference/functions/fetch) with `{ cache: 'no-store' }`

In Partial Prerendering, using these APIs throws a special React error that informs Next.js the component cannot be statically rendered, causing a build error. You can use a [Suspense](https://nextjs.org/docs/app/getting-started/#suspense) boundary to wrap your component to defer rendering until runtime.

### Suspense

React [Suspense](https://react.dev/reference/react/Suspense) is used to defer rendering parts of your application until some condition is met.

In Partial Prerendering, Suspense is used to mark **dynamic boundaries** in your component tree.

At build time, Next.js prerenders the static content and the UI. The dynamic content is **postponed** until the user requests the route.`fallback`

Wrapping a component in Suspense doesn't make the component itself dynamic (your API usage does), but rather Suspense is used as a boundary that encapsulates dynamic content and enable [streaming](https://nextjs.org/docs/app/getting-started/#streaming)

app/page.js

```
import { Suspense } from 'react'

import StaticComponent from './StaticComponent'

import DynamicComponent from './DynamicComponent'

import Fallback from './Fallback'

 

export const experimental_ppr = true

 

export default function Page() {

  return (

    <>

      <StaticComponent />

      <Suspense fallback={<Fallback />}>

        <DynamicComponent />

      </Suspense>

    </>

  )

}
```

### Streaming

Streaming splits the route into chunks and progressively streams them to the client as they become ready. This allows the user to see parts of the page immediately, before the entire content has finished rendering.

![Diagram showing partially rendered page on the client, with loading UI for chunks that are being streamed.](https://nextjs.org/_next/image?url=https%3A%2F%2Fh8DxKfmAPhn8O0p3.public.blob.vercel-storage.com%2Fdocs%2Flight%2Fserver-rendering-with-streaming.png&w=1920&q=75)

Diagram showing partially rendered page on the client, with loading UI for chunks that are being streamed.

In Partial Prerendering, dynamic components wrapped in Suspense start streaming from the server in parallel.

![Diagram showing parallelization of route segments during streaming, showing data fetching, rendering, and hydration of individual chunks.](https://nextjs.org/_next/image?url=https%3A%2F%2Fh8DxKfmAPhn8O0p3.public.blob.vercel-storage.com%2Fdocs%2Flight%2Fsequential-parallel-data-fetching.png&w=1920&q=75)

Diagram showing parallelization of route segments during streaming, showing data fetching, rendering, and hydration of individual chunks.

To reduce network overhead, the full response—including static HTML and streamed dynamic parts—is sent in a **single HTTP request**. This avoids extra roundtrips and improves both initial load and overall performance.

## Enabling Partial Prerendering

You can enable PPR by adding the [`ppr`](https://rc.nextjs.org/docs/app/api-reference/next-config-js/ppr) option to your file:`next.config.ts`

next.config.ts

```
import type { NextConfig } from 'next'

 

const nextConfig: NextConfig = {

  experimental: {

    ppr: 'incremental',

  },

}

 

export default nextConfig
```

The value allows you to adopt PPR for specific routes:`'incremental'`

/app/dashboard/layout.tsx

```
export const experimental_ppr = true

 

export default function Layout({ children }: { children: React.ReactNode }) {

  // ...

}
```

Routes that don't have will default to and will not be prerendered using PPR. You need to explicitly opt-in to PPR for each route.`experimental_ppr` `false`

> **Good to know**:
> 
> - `experimental_ppr` will apply to all children of the route segment, including nested layouts and pages. You don't have to add it to every file, only the top segment of a route.
> - To disable PPR for children segments, you can set to in the child segment.`experimental_ppr` `false`

## Examples

### Dynamic APIs

When using Dynamic APIs that require looking at the incoming request, Next.js will opt into dynamic rendering for the route. To continue using PPR, wrap the component with Suspense. For example, the component is dynamic because it uses the API:`<User />` `cookies`

The component will be streamed while any other content inside will be prerendered and become part of the static shell.`<User />` `<Page />`

app/page.tsx

```
import { Suspense } from 'react'

import { User, AvatarSkeleton } from './user'

 

export const experimental_ppr = true

 

export default function Page() {

  return (

    <section>

      <h1>This will be prerendered</h1>

      <Suspense fallback={<AvatarSkeleton />}>

        <User />

      </Suspense>

    </section>

  )

}
```

### Passing dynamic props

Components only opt into dynamic rendering when the value is accessed. For example, if you are reading from a component, you can forward this value to another component as a prop:`searchParams` `<Page />`

app/page.tsx

```
import { Table, TableSkeleton } from './table'

import { Suspense } from 'react'

 

export default function Page({

  searchParams,

}: {

  searchParams: Promise<{ sort: string }>

}) {

  return (

    <section>

      <h1>This will be prerendered</h1>

      <Suspense fallback={<TableSkeleton />}>

        <Table searchParams={searchParams} />

      </Suspense>

    </section>

  )

}
```

Inside of the table component, accessing the value from will make the component dynamic while the rest of the page will be prerendered.`searchParams`

app/table.tsx

```
export async function Table({

  searchParams,

}: {

  searchParams: Promise<{ sort: string }>

}) {

  const sort = (await searchParams).sort === 'true'

  return '...'

}
```

Learn more about the config option for Partial Prerendering.### [ppr](https://nextjs.org/docs/app/api-reference/config/next-config-js/ppr)

[

Learn how to enable Partial Prerendering in Next.js.

](https://nextjs.org/docs/app/api-reference/config/next-config-js/ppr)