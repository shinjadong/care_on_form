---
title: "Routing: Pages and Layouts | Next.js"
source: "https://nextjs.org/docs/14/app/building-your-application/routing/pages-and-layouts"
author:
  - "[[Vercel]]"
published:
created: 2025-09-16
description: "Create your first page and shared layout with the App Router."
tags:
  - "clippings"
---
[애플리케이션 빌드](https://nextjs.org/docs/14/app/building-your-application) [라우팅](https://nextjs.org/docs/14/app/building-your-application/routing) 페이지 및 레이아웃

## 페이지 및 레이아웃

> 계속하기 전에 [라우팅 기본 사항](https://nextjs.org/docs/14/app/building-your-application/routing) 및 [경로 정의](https://nextjs.org/docs/14/app/building-your-application/routing/defining-routes) 페이지를 읽어 보는 것이 좋습니다.

특수 파일 [layout.js](https://nextjs.org/docs/14/app/building-your-application/routing/#layouts), [page.js](https://nextjs.org/docs/14/app/building-your-application/routing/#pages) 및 [template.js](https://nextjs.org/docs/14/app/building-your-application/routing/#templates) 를 사용하면 [경로](https://nextjs.org/docs/14/app/building-your-application/routing/defining-routes#creating-routes) 에 대한 UI를 만들 수 있습니다. 이 페이지에서는 이러한 특수 파일을 사용하는 방법과 시기를 안내합니다.

## 페이지

페이지는 경로에 **고유한** UI입니다. 기본적으로 파일에서 구성 요소를 내보내는 페이지를 정의할 수 있습니다.`page.js`

예를 들어 페이지를 만들려면 디렉터리 내에 파일을 추가합니다.`index` `page.js` `app`

![page.js 특수 파일](https://nextjs.org/_next/image?url=https%3A%2F%2Fh8DxKfmAPhn8O0p3.public.blob.vercel-storage.com%2Fdocs%2Flight%2Fpage-special-file.png&w=1920&q=75)

page.js 특수 파일

앱/페이지.tsx

```
// \`app/page.tsx\` is the UI for the \`/\` URL

export default function Page() {

  return <h1>Hello, Home page!</h1>

}
```

그런 다음 추가 페이지를 만들려면 새 폴더를 만들고 그 안에 파일을 추가합니다. 예를 들어 경로에 대한 페이지를 만들려면 라는 새 폴더를 만들고 그 안에 파일을 추가합니다.`page.js` `/dashboard` `dashboard` `page.js`

앱/대시보드/페이지.tsx

```
// \`app/dashboard/page.tsx\` is the UI for the \`/dashboard\` URL

export default function Page() {

  return <h1>Hello, Dashboard Page!</h1>

}
```

> **알아 둘만 한**:
> 
> - ,, 또는 파일 확장자는 Pages에 사용할 수 있습니다.`.js``.jsx``.tsx`
> - 페이지는 항상 [경로 하위 트리](https://nextjs.org/docs/14/app/building-your-application/routing#terminology) 의 [리프](https://nextjs.org/docs/14/app/building-your-application/routing#terminology) 입니다.
> - 경로 세그먼트에 공개적으로 액세스할 수 있도록 하려면 파일이 필요합니다.`page.js`
> - 페이지는 기본적으로 [서버 구성 요소](https://nextjs.org/docs/14/app/building-your-application/rendering/server-components) 이지만 [클라이언트 구성 요소](https://nextjs.org/docs/14/app/building-your-application/rendering/client-components) 로 설정할 수 있습니다.
> - 페이지는 데이터를 가져올 수 있습니다. 자세한 내용은 [데이터 가져오기](https://nextjs.org/docs/14/app/building-your-application/data-fetching) 섹션을 참조하십시오.

## 레이아웃

레이아웃은 여러 경로 간에 **공유** 되는 UI입니다. 탐색 시 레이아웃은 상태를 유지하고 대화형 상태를 유지하며 다시 렌더링하지 않습니다. 레이아웃을 [중첩](https://nextjs.org/docs/14/app/building-your-application/routing/#nesting-layouts) 할 수도 있습니다.

기본적으로 파일에서 React 구성 요소를 내보내는 레이아웃을 정의할 수 있습니다. 컴포넌트는 렌더링 중에 하위 레이아웃(있는 경우) 또는 페이지로 채워질 소품을 허용해야 합니다.`layout.js` `children`

예를 들어 레이아웃은 및 페이지와 공유됩니다.`/dashboard` `/dashboard/settings`

![layout.js 특수 파일](https://nextjs.org/_next/image?url=https%3A%2F%2Fh8DxKfmAPhn8O0p3.public.blob.vercel-storage.com%2Fdocs%2Flight%2Flayout-special-file.png&w=1920&q=75)

layout.js 특수 파일

### Root Layout (Required)

The root layout is defined at the top level of the directory and applies to all routes. This layout is **required** and must contain and tags, allowing you to modify the initial HTML returned from the server.`app` `html` `body`

app/layout.tsx

```
export default function RootLayout({

  children,

}: {

  children: React.ReactNode

}) {

  return (

    <html lang="en">

      <body>

        {/* Layout UI */}

        <main>{children}</main>

      </body>

    </html>

  )

}
```

### Nesting Layouts

By default, layouts in the folder hierarchy are **nested**, which means they wrap child layouts via their prop. You can nest layouts by adding inside specific route segments (folders).`children` `layout.js`

For example, to create a layout for the route, add a new file inside the folder:`/dashboard` `layout.js` `dashboard`

![Nested Layout](https://nextjs.org/_next/image?url=https%3A%2F%2Fh8DxKfmAPhn8O0p3.public.blob.vercel-storage.com%2Fdocs%2Flight%2Fnested-layout.png&w=1920&q=75)

Nested Layout

app/dashboard/layout.tsx

```
export default function DashboardLayout({

  children,

}: {

  children: React.ReactNode

}) {

  return <section>{children}</section>

}
```

If you were to combine the two layouts above, the root layout () would wrap the dashboard layout (), which would wrap route segments inside .`app/layout.js` `app/dashboard/layout.js` `app/dashboard/*`

The two layouts would be nested as such:

![Nested Layouts](https://nextjs.org/_next/image?url=https%3A%2F%2Fh8DxKfmAPhn8O0p3.public.blob.vercel-storage.com%2Fdocs%2Flight%2Fnested-layouts-ui.png&w=1920&q=75)

Nested Layouts

> **Good to know**:
> 
> - `.js`, , or file extensions can be used for Layouts.`.jsx``.tsx`
> - Only the root layout can contain and tags.`<html>` `<body>`
> - When a and file are defined in the same folder, the layout will wrap the page.`layout.js` `page.js`
> - Layouts are [Server Components](https://nextjs.org/docs/14/app/building-your-application/rendering/server-components) by default but can be set to a [Client Component](https://nextjs.org/docs/14/app/building-your-application/rendering/client-components).
> - Layouts can fetch data. View the [Data Fetching](https://nextjs.org/docs/14/app/building-your-application/data-fetching) section for more information.
> - Passing data between a parent layout and its children is not possible. However, you can fetch the same data in a route more than once, and React will [automatically dedupe the requests](https://nextjs.org/docs/14/app/building-your-application/caching#request-memoization) without affecting performance.
> - Layouts do not have access to the route segments below itself. To access all route segments, you can use [`useSelectedLayoutSegment`](https://nextjs.org/docs/14/app/api-reference/functions/use-selected-layout-segment) or [`useSelectedLayoutSegments`](https://nextjs.org/docs/14/app/api-reference/functions/use-selected-layout-segments) in a Client Component.
> - You can use [Route Groups](https://nextjs.org/docs/14/app/building-your-application/routing/route-groups) to opt specific route segments in and out of shared layouts.
> - You can use [Route Groups](https://nextjs.org/docs/14/app/building-your-application/routing/route-groups) to create multiple root layouts. See an [example here](https://nextjs.org/docs/14/app/building-your-application/routing/route-groups#creating-multiple-root-layouts).
> - **Migrating from the directory:`pages`** The root layout replaces the [`_app.js`](https://nextjs.org/docs/14/pages/building-your-application/routing/custom-app) and [`_document.js`](https://nextjs.org/docs/14/pages/building-your-application/routing/custom-document) files. [View the migration guide](https://nextjs.org/docs/14/app/building-your-application/upgrading/app-router-migration#migrating-_documentjs-and-_appjs).

## Templates

Templates are similar to layouts in that they wrap each child layout or page. Unlike layouts that persist across routes and maintain state, templates create a new instance for each of their children on navigation. This means that when a user navigates between routes that share a template, a new instance of the component is mounted, DOM elements are recreated, state is **not** preserved, and effects are re-synchronized.

There may be cases where you need those specific behaviors, and templates would be a more suitable option than layouts. For example:

- Features that rely on (e.g logging page views) and (e.g a per-page feedback form).`useEffect` `useState`
- To change the default framework behavior. For example, Suspense Boundaries inside layouts only show the fallback the first time the Layout is loaded and not when switching pages. For templates, the fallback is shown on each navigation.

A template can be defined by exporting a default React component from a file. The component should accept a prop.`template.js` `children`

![template.js special file](https://nextjs.org/_next/image?url=https%3A%2F%2Fh8DxKfmAPhn8O0p3.public.blob.vercel-storage.com%2Fdocs%2Flight%2Ftemplate-special-file.png&w=1920&q=75)

template.js special file

app/template.tsx

```
export default function Template({ children }: { children: React.ReactNode }) {

  return <div>{children}</div>

}
```

In terms of nesting, is rendered between a layout and its children. Here's a simplified output:`template.js`

Output

```
<Layout>

  {/* Note that the template is given a unique key. */}

  <Template key={routeParam}>{children}</Template>

</Layout>
```

In the directory, you can modify the HTML elements such as and using the [Metadata APIs](https://nextjs.org/docs/14/app/building-your-application/optimizing/metadata).`app` `<head>` `title` `meta`

Metadata can be defined by exporting a [`metadata` object](https://nextjs.org/docs/14/app/api-reference/functions/generate-metadata#the-metadata-object) or [`generateMetadata` function](https://nextjs.org/docs/14/app/api-reference/functions/generate-metadata#generatemetadata-function) in a [`layout.js`](https://nextjs.org/docs/14/app/api-reference/file-conventions/layout) or [`page.js`](https://nextjs.org/docs/14/app/api-reference/file-conventions/page) file.

app/page.tsx

```
import { Metadata } from 'next'

 

export const metadata: Metadata = {

  title: 'Next.js',

}

 

export default function Page() {

  return '...'

}
```

> **Good to know**: You should **not** manually add tags such as and to root layouts. Instead, you should use the [Metadata API](https://nextjs.org/docs/14/app/api-reference/functions/generate-metadata) which automatically handles advanced requirements such as streaming and de-duplicating elements.`<head>` `<title>` `<meta>` `<head>`

Learn more about available metadata options in the [API reference](https://nextjs.org/docs/14/app/api-reference/functions/generate-metadata)