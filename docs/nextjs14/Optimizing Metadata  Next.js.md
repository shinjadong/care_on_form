---
title: "Optimizing: Metadata | Next.js"
source: "https://nextjs.org/docs/14/app/building-your-application/optimizing/metadata"
author:
  - "[[Vercel]]"
published:
created: 2025-09-16
description: "Use the Metadata API to define metadata in any layout or page."
tags:
  - "clippings"
---
[애플리케이션 빌드](https://nextjs.org/docs/14/app/building-your-application) [최적화](https://nextjs.org/docs/14/app/building-your-application/optimizing) 메타데이터

## 메타데이터

Next.js에는 애플리케이션 메타데이터(예: 및 HTML 요소 내부의 태그)를 정의하는 데 사용할 수 있는 메타데이터 API가 있어 SEO 및 웹 공유 가능성을 향상시킵니다.`meta` `link` `head`

애플리케이션에 메타데이터를 추가할 수 있는 방법에는 두 가지가 있습니다.

- **구성 기반 메타데이터**: 내보내기 [정적 객체 `metadata`](https://nextjs.org/docs/14/app/api-reference/functions/generate-metadata#metadata-object) 또는 동적 [`generateMetadata` 기능](https://nextjs.org/docs/14/app/api-reference/functions/generate-metadata#generatemetadata-function) 또는 파일에서.`layout.js` `page.js`
- **파일 기반 메타데이터**: 정적 또는 동적으로 생성된 특수 파일을 추가하여 세그먼트를 라우팅합니다.

이 두 가지 옵션을 모두 사용하면 Next.js 페이지에 대한 관련 요소를 자동으로 생성합니다. 다음을 사용하여 동적 OG 이미지를 만들 수도 있습니다.`<head>` [`ImageResponse`](https://nextjs.org/docs/14/app/api-reference/functions/image-response) 생성자.

정적 메타데이터를 정의하려면 [`Metadata` 객체](https://nextjs.org/docs/14/app/api-reference/functions/generate-metadata#metadata-object) 또는 정적 파일에서.`layout.js` `page.js`

```
import type { Metadata } from 'next'

 

export const metadata: Metadata = {

  title: '...',

  description: '...',

}

 

export default function Page() {}
```

사용 가능한 모든 옵션은 [API 참조를](https://nextjs.org/docs/14/app/api-reference/functions/generate-metadata) 참조하십시오.

동적 값이 필요한 메타데이터에 함수를 사용할 수 있습니다.`generateMetadata` `fetch`

앱/제품/\[ID\]/page.tsx

```
import type { Metadata, ResolvingMetadata } from 'next'

 

type Props = {

  params: { id: string }

  searchParams: { [key: string]: string | string[] | undefined }

}

 

export async function generateMetadata(

  { params, searchParams }: Props,

  parent: ResolvingMetadata

): Promise<Metadata> {

  // read route params

  const id = params.id

 

  // fetch data

  const product = await fetch(\`https://.../${id}\`).then((res) => res.json())

 

  // optionally access and extend (rather than replace) parent metadata

  const previousImages = (await parent).openGraph?.images || []

 

  return {

    title: product.title,

    openGraph: {

      images: ['/some-specific-page-image.jpg', ...previousImages],

    },

  }

}

 

export default function Page({ params, searchParams }: Props) {}
```

For all the available params, see the [API Reference](https://nextjs.org/docs/14/app/api-reference/functions/generate-metadata).

> **Good to know**:
> 
> - Both static and dynamic metadata through are **only supported in Server Components**.`generateMetadata`
> - `fetch` requests are automatically [memoized](https://nextjs.org/docs/14/app/building-your-application/caching#request-memoization) for the same data across , , Layouts, Pages, and Server Components. React `generateMetadata` `generateStaticParams` [`cache` can be used](https://nextjs.org/docs/14/app/building-your-application/caching#request-memoization) if is unavailable.`fetch`
> - Next.js will wait for data fetching inside to complete before streaming UI to the client. This guarantees the first part of a [streamed response](https://nextjs.org/docs/14/app/building-your-application/routing/loading-ui-and-streaming) includes tags.`generateMetadata` `<head>`

These special files are available for metadata:

- [favicon.ico, apple-icon.jpg, and icon.jpg](https://nextjs.org/docs/14/app/api-reference/file-conventions/metadata/app-icons)
- [opengraph-image.jpg and twitter-image.jpg](https://nextjs.org/docs/14/app/api-reference/file-conventions/metadata/opengraph-image)
- [robots.txt](https://nextjs.org/docs/14/app/api-reference/file-conventions/metadata/robots)
- [sitemap.xml](https://nextjs.org/docs/14/app/api-reference/file-conventions/metadata/sitemap)

You can use these for static metadata, or you can programmatically generate these files with code.

For implementation and examples, see the [Metadata Files](https://nextjs.org/docs/14/app/api-reference/file-conventions/metadata) API Reference and [Dynamic Image Generation](https://nextjs.org/docs/14/app/building-your-application/optimizing/#dynamic-image-generation).

## Behavior

File-based metadata has the higher priority and will override any config-based metadata.

### Default Fields

There are two default tags that are always added even if a route doesn't define metadata:`meta`

- The [meta charset tag](https://developer.mozilla.org/docs/Web/HTML/Element/meta#attr-charset) sets the character encoding for the website.
- The [meta viewport tag](https://developer.mozilla.org/docs/Web/HTML/Viewport_meta_tag) sets the viewport width and scale for the website to adjust for different devices.

```
<meta charset="utf-8" />

<meta name="viewport" content="width=device-width, initial-scale=1" />
```

> **Good to know**: You can overwrite the default [`viewport`](https://nextjs.org/docs/14/app/api-reference/functions/generate-metadata#viewport) meta tag.

### Ordering

Metadata is evaluated in order, starting from the root segment down to the segment closest to the final segment. For example:`page.js`

1. `app/layout.tsx` (Root Layout)
2. `app/blog/layout.tsx` (Nested Blog Layout)
3. `app/blog/[slug]/page.tsx` (Blog Page)

### Merging

Following the [evaluation order](https://nextjs.org/docs/14/app/building-your-application/optimizing/#ordering), Metadata objects exported from multiple segments in the same route are **shallowly** merged together to form the final metadata output of a route. Duplicate keys are **replaced** based on their ordering.

This means metadata with nested fields such as [`openGraph`](https://nextjs.org/docs/14/app/api-reference/functions/generate-metadata#opengraph) and [`robots`](https://nextjs.org/docs/14/app/api-reference/functions/generate-metadata#robots) that are defined in an earlier segment are **overwritten** by the last segment to define them.

#### Overwriting fields

app/layout.js

```
export const metadata = {

  title: 'Acme',

  openGraph: {

    title: 'Acme',

    description: 'Acme is a...',

  },

}
```

app/blog/page.js

```
export const metadata = {

  title: 'Blog',

  openGraph: {

    title: 'Blog',

  },

}

 

// Output:

// <title>Blog</title>

// <meta property="og:title" content="Blog" />
```

In the example above:

- `title` from is **replaced** by in .`app/layout.js` `title` `app/blog/page.js`
- All fields from are **replaced** in because sets metadata. Note the absence of .`openGraph` `app/layout.js` `app/blog/page.js` `app/blog/page.js` `openGraph` `openGraph.description`

If you'd like to share some nested fields between segments while overwriting others, you can pull them out into a separate variable:

In the example above, the OG image is shared between and while the titles are different.`app/layout.js` `app/about/page.js`

#### Inheriting fields

app/layout.js

```
export const metadata = {

  title: 'Acme',

  openGraph: {

    title: 'Acme',

    description: 'Acme is a...',

  },

}
```

app/about/page.js

```
export const metadata = {

  title: 'About',

}

 

// Output:

// <title>About</title>

// <meta property="og:title" content="Acme" />

// <meta property="og:description" content="Acme is a..." />
```

**Notes**

- `title` from is **replaced** by in .`app/layout.js` `title` `app/about/page.js`
- All fields from are **inherited** in because doesn't set metadata.`openGraph` `app/layout.js` `app/about/page.js` `app/about/page.js` `openGraph`

## Dynamic Image Generation

The constructor allows you to generate dynamic images using JSX and CSS. This is useful for creating social media images such as Open Graph images, Twitter cards, and more.`ImageResponse`

`ImageResponse` uses the [Edge Runtime](https://nextjs.org/docs/14/app/building-your-application/rendering/edge-and-nodejs-runtimes#edge-runtime), and Next.js automatically adds the correct headers to cached images at the edge, helping improve performance and reducing recomputation.

To use it, you can import from :`ImageResponse` `next/og`

app/about/route.js

```
import { ImageResponse } from 'next/og'

 

export const runtime = 'edge'

 

export async function GET() {

  return new ImageResponse(

    (

      <div

        style={{

          fontSize: 128,

          background: 'white',

          width: '100%',

          height: '100%',

          display: 'flex',

          textAlign: 'center',

          alignItems: 'center',

          justifyContent: 'center',

        }}

      >

        Hello world!

      </div>

    ),

    {

      width: 1200,

      height: 600,

    }

  )

}
```

`ImageResponse` integrates well with other Next.js APIs, including [Route Handlers](https://nextjs.org/docs/14/app/building-your-application/routing/route-handlers) and file-based Metadata. For example, you can use in a file to generate Open Graph images at build time or dynamically at request time.`ImageResponse` `opengraph-image.tsx`

`ImageResponse` supports common CSS properties including flexbox and absolute positioning, custom fonts, text wrapping, centering, and nested images. [See the full list of supported CSS properties](https://nextjs.org/docs/14/app/api-reference/functions/image-response).

> **Good to know**:
> 
> - Examples are available in the [Vercel OG Playground](https://og-playground.vercel.app/).
> - `ImageResponse` uses [@vercel/og](https://vercel.com/docs/concepts/functions/edge-functions/og-image-generation), [Satori](https://github.com/vercel/satori), and Resvg to convert HTML and CSS into PNG.
> - Only the Edge Runtime is supported. The default Node.js runtime will not work.
> - Only flexbox and a subset of CSS properties are supported. Advanced layouts (e.g. ) will not work.`display: grid`
> - Maximum bundle size of . The bundle size includes your JSX, CSS, fonts, images, and any other assets. If you exceed the limit, consider reducing the size of any assets or fetching at runtime.`500KB`
> - Only , , and font formats are supported. To maximize the font parsing speed, or are preferred over .`ttf` `otf` `woff` `ttf` `otf` `woff`

## JSON-LD

[JSON-LD](https://json-ld.org/) is a format for structured data that can be used by search engines to understand your content. For example, you can use it to describe a person, an event, an organization, a movie, a book, a recipe, and many other types of entities.

Our current recommendation for JSON-LD is to render structured data as a tag in your or components. For example:`<script>` `layout.js` `page.js`

app/products/\[id\]/page.tsx

```
export default async function Page({ params }) {

  const product = await getProduct(params.id)

 

  const jsonLd = {

    '@context': 'https://schema.org',

    '@type': 'Product',

    name: product.name,

    image: product.image,

    description: product.description,

  }

 

  return (

    <section>

      {/* Add JSON-LD to your page */}

      <script

        type="application/ld+json"

        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}

      />

      {/* ... */}

    </section>

  )

}
```

You can validate and test your structured data with the [Rich Results Test](https://search.google.com/test/rich-results) for Google or the generic [Schema Markup Validator](https://validator.schema.org/).

You can type your JSON-LD with TypeScript using community packages like [`schema-dts`](https://www.npmjs.com/package/schema-dts):

```
import { Product, WithContext } from 'schema-dts'

 

const jsonLd: WithContext<Product> = {

  '@context': 'https://schema.org',

  '@type': 'Product',

  name: 'Next.js Sticker',

  image: 'https://nextjs.org/imgs/sticker.png',

  description: 'Dynamic at the speed of static.',

}
```

View all the Metadata API options.[Introduction](https://nextjs.org/docs/14/app/api-reference/functions/generate-metadata)

[...](https://nextjs.org/docs/14/app/api-reference/functions/generate-metadata)

[Functions](https://nextjs.org/docs/14/app/api-reference/functions/generate-metadata)

generateMetadata

검색 엔진 최적화(SEO) 및 웹 공유 가능성을 개선하기 위해 Next.js 애플리케이션에 메타데이터를 추가하는 방법을 알아보세요.

[View original](https://nextjs.org/docs/14/app/api-reference/functions/generate-metadata)Metadata Files

Introduction

...

File Conventions

메타데이터 파일 규칙에 대한 API 설명서입니다.

[View original](https://nextjs.org/docs/14/app/api-reference/file-conventions/metadata)generateViewport

소개

...

함수

generateViewport 함수에 대한 API 참조입니다.

[View original](https://nextjs.org/docs/14/app/api-reference/functions/generate-viewport)