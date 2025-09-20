---
title: "Routing: Dynamic Routes | Next.js"
source: "https://nextjs.org/docs/14/app/building-your-application/routing/dynamic-routes"
author:
  - "[[Vercel]]"
published:
created: 2025-09-16
description: "Dynamic Routes can be used to programmatically generate route segments from dynamic data."
tags:
  - "clippings"
---
## 동적 경로

정확한 세그먼트 이름을 미리 알지 못하고 동적 데이터에서 경로를 생성하려는 경우 요청 시 채워지거나 빌드 시 [미리 렌더링되는](https://nextjs.org/docs/14/app/building-your-application/routing/#generating-static-params) 동적 세그먼트를 사용할 수 있습니다.

## 컨벤션

동적 세그먼트는 폴더 이름을 대괄호로 묶어 만들 수 있습니다. 예를 들어 또는.`[folderName]` `[id]` `[slug]`

동적 세그먼트는 prop으로 전달됩니다. `params` [`layout`](https://nextjs.org/docs/14/app/api-reference/file-conventions/layout), [`page`](https://nextjs.org/docs/14/app/api-reference/file-conventions/page), [`route`](https://nextjs.org/docs/14/app/building-your-application/routing/route-handlers) 그리고 [`generateMetadata`](https://nextjs.org/docs/14/app/api-reference/functions/generate-metadata#generatemetadata-function) 함수.

## 본보기

예를 들어 블로그에는 블로그 게시물에 대한 동적 세그먼트가 있는 다음 경로가 포함될 수 있습니다.`app/blog/[slug]/page.js` `[slug]`

앱/블로그/\[슬러그\]/page.tsx

```
export default function Page({ params }: { params: { slug: string } }) {

  return <div>My Post: {params.slug}</div>

}
```

| 경로 | 예제 URL | `params` |
| --- | --- | --- |
| `app/blog/[slug]/page.js` | `/blog/a` | `{ slug: 'a' }` |
| `app/blog/[slug]/page.js` | `/blog/b` | `{ slug: 'b' }` |
| `app/blog/[slug]/page.js` | `/blog/c` | `{ slug: 'c' }` |

세그먼트에 대한 매개 변수를 생성하는 방법을 알아보려면 [generateStaticParams()](https://nextjs.org/docs/14/app/building-your-application/routing/#generating-static-params) 페이지를 참조하십시오.

> **알아두면 좋은 정보**: 동적 세그먼트는 디렉터리의 [동적 경로](https://nextjs.org/docs/14/app/building-your-application/routing/dynamic-routes) 와 동일합니다.`pages`

## 정적 매개변수 생성

이 함수는 [동적 경로 세그먼트](https://nextjs.org/docs/14/app/building-your-application/routing/dynamic-routes) 와 함께 사용하여 요청 시 온디맨드 대신 빌드 시 경로를 [**정적으로 생성할**](https://nextjs.org/docs/14/app/building-your-application/rendering/server-components#static-rendering-default) 수 있습니다.`generateStaticParams`

앱/블로그/\[슬러그\]/page.tsx

```
export async function generateStaticParams() {

  const posts = await fetch('https://.../posts').then((res) => res.json())

 

  return posts.map((post) => ({

    slug: post.slug,

  }))

}
```

이 기능의 주요 이점은 데이터를 스마트하게 검색한다는 것입니다. 요청을 사용하여 함수 내에서 콘텐츠를 가져오면 요청이 [자동으로 메모화됩니다](https://nextjs.org/docs/14/app/building-your-application/caching#request-memoization). 즉, 여러 레이아웃 및 페이지에서 동일한 인수를 사용하는 요청은 한 번만 이루어지므로 빌드 시간이 단축됩니다.`generateStaticParams` `generateStaticParams` `fetch` `fetch` `generateStaticParams`

Use the [migration guide](https://nextjs.org/docs/14/app/building-your-application/upgrading/app-router-migration#dynamic-paths-getstaticpaths) if you are migrating from the directory.`pages`

See [`generateStaticParams` server function documentation](https://nextjs.org/docs/14/app/api-reference/functions/generate-static-params) for more information and advanced use cases.

## Catch-all Segments

Dynamic Segments can be extended to **catch-all** subsequent segments by adding an ellipsis inside the brackets .`[...folderName]`

For example, will match , but also , , and so on.`app/shop/[...slug]/page.js` `/shop/clothes` `/shop/clothes/tops` `/shop/clothes/tops/t-shirts`

| Route | Example URL | `params` |
| --- | --- | --- |
| `app/shop/[...slug]/page.js` | `/shop/a` | `{ slug: ['a'] }` |
| `app/shop/[...slug]/page.js` | `/shop/a/b` | `{ slug: ['a', 'b'] }` |
| `app/shop/[...slug]/page.js` | `/shop/a/b/c` | `{ slug: ['a', 'b', 'c'] }` |

## Optional Catch-all Segments

Catch-all Segments can be made **optional** by including the parameter in double square brackets: .`[[...folderName]]`

For example, will **also** match , in addition to , , .`app/shop/[[...slug]]/page.js` `/shop` `/shop/clothes` `/shop/clothes/tops` `/shop/clothes/tops/t-shirts`

The difference between **catch-all** and **optional catch-all** segments is that with optional, the route without the parameter is also matched ( in the example above).`/shop`

| Route | Example URL | `params` |
| --- | --- | --- |
| `app/shop/[[...slug]]/page.js` | `/shop` | `{}` |
| `app/shop/[[...slug]]/page.js` | `/shop/a` | `{ slug: ['a'] }` |
| `app/shop/[[...slug]]/page.js` | `/shop/a/b` | `{ slug: ['a', 'b'] }` |
| `app/shop/[[...slug]]/page.js` | `/shop/a/b/c` | `{ slug: ['a', 'b', 'c'] }` |

## TypeScript

When using TypeScript, you can add types for depending on your configured route segment.`params`

app/blog/\[slug\]/page.tsx

```
export default function Page({ params }: { params: { slug: string } }) {

  return <h1>My Page</h1>

}
```

| Route | `params` Type Definition |
| --- | --- |
| `app/blog/[slug]/page.js` | `{ slug: string }` |
| `app/shop/[...slug]/page.js` | `{ slug: string[] }` |
| `app/shop/[[...slug]]/page.js` | `{ slug?: string[] }` |
| `app/[categoryId]/[itemId]/page.js` | `{ categoryId: string, itemId: string }` |

> **Good to know**: This may be done automatically by the [TypeScript plugin](https://nextjs.org/docs/14/app/building-your-application/configuring/typescript#typescript-plugin) in the future.