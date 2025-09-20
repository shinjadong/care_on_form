---
title: "Data Fetching: Data Fetching Patterns and Best Practices | Next.js"
source: "https://nextjs.org/docs/14/app/building-your-application/data-fetching/patterns"
author:
  - "[[Vercel]]"
published:
created: 2025-09-16
description: "Learn about common data fetching patterns in React and Next.js."
tags:
  - "clippings"
---
[애플리케이션 빌드](https://nextjs.org/docs/14/app/building-your-application) [데이터 가져오기](https://nextjs.org/docs/14/app/building-your-application/data-fetching) 데이터 가져오기 패턴 및 모범 사례

## 패턴 및 모범 사례

React 및 Next.js에서 데이터를 가져오기 위한 몇 가지 권장 패턴과 모범 사례가 있습니다. 이 페이지에서는 가장 일반적인 패턴 중 일부와 사용 방법을 살펴봅니다.

## 서버에서 데이터 가져오기

가능하면 서버 구성 요소를 사용하여 서버에서 데이터를 가져오는 것이 좋습니다. 이를 통해 다음을 수행할 수 있습니다.

- 백엔드 데이터 리소스(예: 데이터베이스)에 직접 액세스할 수 있습니다.
- 액세스 토큰 및 API 키와 같은 민감한 정보가 클라이언트에 노출되지 않도록 하여 애플리케이션을 더욱 안전하게 유지합니다.
- 동일한 환경에서 데이터를 가져오고 렌더링합니다. 이렇게 하면 클라이언트와 서버 간의 앞뒤 통신이 모두 줄어들 뿐만 아니라 [메인 스레드에서 작업](https://vercel.com/blog/how-react-18-improves-application-performance) 클라이언트에서.
- 클라이언트에서 여러 개별 요청 대신 단일 왕복으로 여러 데이터 가져오기를 수행합니다.
- 클라이언트-서버 [폭포를](https://nextjs.org/docs/14/app/building-your-application/data-fetching/#parallel-and-sequential-data-fetching) 줄입니다.
- 지역에 따라 데이터 가져오기가 데이터 원본에 더 가깝게 수행되어 대기 시간이 줄어들고 성능이 향상될 수도 있습니다.

그런 다음 [서버 작업을](https://nextjs.org/docs/14/app/building-your-application/data-fetching/server-actions-and-mutations) 사용하여 데이터를 변경하거나 업데이트할 수 있습니다.

## 필요한 곳에서 데이터 가져오기

트리의 여러 구성 요소에서 동일한 데이터(예: 현재 사용자)를 사용해야 하는 경우 전역적으로 데이터를 가져오거나 구성 요소 간에 소품을 전달할 필요가 없습니다. 대신 동일한 데이터에 대해 여러 요청을 할 때 성능에 미치는 영향에 대해 걱정하지 않고 데이터가 필요한 구성 요소에서 또는 React를 사용할 수 있습니다.`fetch` `cache`

이는 요청이 자동으로 메모화되기 때문에 가능합니다. [요청 메모화](https://nextjs.org/docs/14/app/building-your-application/caching#request-memoization) 에 대해 자세히 알아보기 `fetch`

> **알아두면 좋은 정보**: 부모 레이아웃과 자식 레이아웃 간에 데이터를 전달할 수 없기 때문에 레이아웃에도 적용됩니다.

## 스트리밍

스트리밍 및 [서 스 펜스](https://react.dev/reference/react/Suspense) 는 UI의 렌더링된 단위를 클라이언트로 점진적으로 렌더링하고 점진적으로 스트리밍할 수 있는 React 기능입니다.

서버 구성 요소 및 [중첩 레이아웃](https://nextjs.org/docs/14/app/building-your-application/routing/pages-and-layouts) 을 사용하면 특별히 데이터가 필요하지 않은 페이지 부분을 즉시 렌더링하고 데이터를 가져오는 페이지 부분에 대한 [로드 상태를](https://nextjs.org/docs/14/app/building-your-application/routing/loading-ui-and-streaming) 표시할 수 있습니다. 즉, 사용자는 상호 작용을 시작하기 전에 전체 페이지가 로드될 때까지 기다릴 필요가 없습니다.

![스트리밍을 사용한 서버 렌더링](https://nextjs.org/_next/image?url=https%3A%2F%2Fh8DxKfmAPhn8O0p3.public.blob.vercel-storage.com%2Fdocs%2Flight%2Fserver-rendering-with-streaming.png&w=1920&q=75)

스트리밍을 사용한 서버 렌더링

To learn more about Streaming and Suspense, see the [Loading UI](https://nextjs.org/docs/14/app/building-your-application/routing/loading-ui-and-streaming) and [Streaming and Suspense](https://nextjs.org/docs/14/app/building-your-application/routing/loading-ui-and-streaming#streaming-with-suspense) pages.

## Parallel and sequential data fetching

When fetching data inside React components, you need to be aware of two data fetching patterns: Parallel and Sequential.

![Sequential and Parallel Data Fetching](https://nextjs.org/_next/image?url=https%3A%2F%2Fh8DxKfmAPhn8O0p3.public.blob.vercel-storage.com%2Fdocs%2Flight%2Fsequential-parallel-data-fetching.png&w=1920&q=75)

Sequential and Parallel Data Fetching

- With **sequential data fetching**, requests in a route are dependent on each other and therefore create waterfalls. There may be cases where you want this pattern because one fetch depends on the result of the other, or you want a condition to be satisfied before the next fetch to save resources. However, this behavior can also be unintentional and lead to longer loading times.
- With **parallel data fetching**, requests in a route are eagerly initiated and will load data at the same time. This reduces client-server waterfalls and the total time it takes to load data.

### Sequential Data Fetching

If you have nested components, and each component fetches its own data, then data fetching will happen sequentially if those data requests are different (this doesn't apply to requests for the same data as they are automatically [memoized](https://nextjs.org/docs/14/app/building-your-application/caching#request-memoization)).

For example, the component will only start fetching data once the component has finished fetching data because depends on the prop:`Playlists` `Artist` `Playlists` `artistID`

app/artist/\[username\]/page.tsx

```
// ...

 

async function Playlists({ artistID }: { artistID: string }) {

  // Wait for the playlists

  const playlists = await getArtistPlaylists(artistID)

 

  return (

    <ul>

      {playlists.map((playlist) => (

        <li key={playlist.id}>{playlist.name}</li>

      ))}

    </ul>

  )

}

 

export default async function Page({

  params: { username },

}: {

  params: { username: string }

}) {

  // Wait for the artist

  const artist = await getArtist(username)

 

  return (

    <>

      <h1>{artist.name}</h1>

      <Suspense fallback={<div>Loading...</div>}>

        <Playlists artistID={artist.id} />

      </Suspense>

    </>

  )

}
```

In cases like this, you can use [`loading.js`](https://nextjs.org/docs/14/app/building-your-application/routing/loading-ui-and-streaming) (for route segments) or [React `<Suspense>`](https://nextjs.org/docs/14/app/building-your-application/routing/loading-ui-and-streaming#streaming-with-suspense) (for nested components) to show an instant loading state while React streams in the result.

This will prevent the whole route from being blocked by data fetching, and the user will be able to interact with the parts of the page that are not blocked.

> **Blocking Data Requests:**
> 
> An alternative approach to prevent waterfalls is to fetch data globally, at the root of your application, but this will block rendering for all route segments beneath it until the data has finished loading. This can be described as "all or nothing" data fetching. Either you have the entire data for your page or application, or none.
> 
> Any fetch requests with will block rendering and data fetching for the entire tree beneath it, unless they are wrapped in a boundary or is used. Another alternative is to use [parallel data fetching](https://nextjs.org/docs/14/app/building-your-application/data-fetching/#parallel-data-fetching) or the [preload pattern](https://nextjs.org/docs/14/app/building-your-application/data-fetching/#preloading-data).`await` `<Suspense>` `loading.js`

### Parallel Data Fetching

To fetch data in parallel, you can eagerly initiate requests by defining them outside the components that use the data, then calling them from inside the component. This saves time by initiating both requests in parallel, however, the user won't see the rendered result until both promises are resolved.

In the example below, the and functions are defined outside the component, then called inside the component, and we wait for both promises to resolve:`getArtist` `getArtistAlbums` `Page`

app/artist/\[username\]/page.tsx

```
import Albums from './albums'

 

async function getArtist(username: string) {

  const res = await fetch(\`https://api.example.com/artist/${username}\`)

  return res.json()

}

 

async function getArtistAlbums(username: string) {

  const res = await fetch(\`https://api.example.com/artist/${username}/albums\`)

  return res.json()

}

 

export default async function Page({

  params: { username },

}: {

  params: { username: string }

}) {

  // Initiate both requests in parallel

  const artistData = getArtist(username)

  const albumsData = getArtistAlbums(username)

 

  // Wait for the promises to resolve

  const [artist, albums] = await Promise.all([artistData, albumsData])

 

  return (

    <>

      <h1>{artist.name}</h1>

      <Albums list={albums}></Albums>

    </>

  )

}
```

To improve the user experience, you can add a [Suspense Boundary](https://nextjs.org/docs/14/app/building-your-application/routing/loading-ui-and-streaming) to break up the rendering work and show part of the result as soon as possible.

Another way to prevent waterfalls is to use the preload pattern. You can optionally create a function to further optimize parallel data fetching. With this approach, you don't have to pass promises down as props. The function can also have any name as it's a pattern, not an API.`preload` `preload`

components/Item.tsx

```
import { getItem } from '@/utils/get-item'

 

export const preload = (id: string) => {

  // void evaluates the given expression and returns undefined

  // https://developer.mozilla.org/docs/Web/JavaScript/Reference/Operators/void

  void getItem(id)

}

export default async function Item({ id }: { id: string }) {

  const result = await getItem(id)

  // ...

}
```

app/item/\[id\]/page.tsx

```
import Item, { preload, checkIsAvailable } from '@/components/Item'

 

export default async function Page({

  params: { id },

}: {

  params: { id: string }

}) {

  // starting loading item data

  preload(id)

  // perform another asynchronous task

  const isAvailable = await checkIsAvailable()

 

  return isAvailable ? <Item id={id} /> : null

}
```

### Using React,, and the Preload Patterncacheserver-only

You can combine the function, the pattern, and the package to create a data fetching utility that can be used throughout your app.`cache` `preload` `server-only`

utils/get-item.ts

```
import { cache } from 'react'

import 'server-only'

 

export const preload = (id: string) => {

  void getItem(id)

}

 

export const getItem = cache(async (id: string) => {

  // ...

})
```

With this approach, you can eagerly fetch data, cache responses, and guarantee that this data fetching [only happens on the server](https://nextjs.org/docs/14/app/building-your-application/rendering/composition-patterns#keeping-server-only-code-out-of-the-client-environment).

The exports can be used by Layouts, Pages, or other components to give them control over when an item's data is fetched.`utils/get-item`

> **Good to know:**
> 
> - We recommend using the [`server-only` package](https://nextjs.org/docs/14/app/building-your-application/rendering/composition-patterns#keeping-server-only-code-out-of-the-client-environment) to make sure server data fetching functions are never used on the client.

## Preventing sensitive data from being exposed to the client

We recommend using React's taint APIs, [`taintObjectReference`](https://react.dev/reference/react/experimental_taintObjectReference) and [`taintUniqueValue`](https://react.dev/reference/react/experimental_taintUniqueValue), to prevent whole object instances or sensitive values from being passed to the client.

To enable tainting in your application, set the Next.js Config option to :`experimental.taint` `true`

next.config.js

```
module.exports = {

  experimental: {

    taint: true,

  },

}
```

Then pass the object or value you want to taint to the or functions:`experimental_taintObjectReference` `experimental_taintUniqueValue`

app/utils.ts

```
import { queryDataFromDB } from './api'

import {

  experimental_taintObjectReference,

  experimental_taintUniqueValue,

} from 'react'

 

export async function getUserData() {

  const data = await queryDataFromDB()

  experimental_taintObjectReference(

    'Do not pass the whole user object to the client',

    data

  )

  experimental_taintUniqueValue(

    "Do not pass the user's address to the client",

    data,

    data.address

  )

  return data

}
```

app/page.tsx

```
import { getUserData } from './data'

 

export async function Page() {

  const userData = getUserData()

  return (

    <ClientComponent

      user={userData} // this will cause an error because of taintObjectReference

      address={userData.address} // this will cause an error because of taintUniqueValue

    />

  )

}
```

Learn more about [Security and Server Actions](https://nextjs.org/blog/security-nextjs-server-components-actions).