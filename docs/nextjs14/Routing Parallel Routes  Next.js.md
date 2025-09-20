---
title: "Routing: Parallel Routes | Next.js"
source: "https://nextjs.org/docs/14/app/building-your-application/routing/parallel-routes"
author:
  - "[[Vercel]]"
published:
created: 2025-09-16
description: "Simultaneously render one or more pages in the same view that can be navigated independently. A pattern for highly dynamic applications."
tags:
  - "clippings"
---
## 병렬 경로

병렬 경로를 사용하면 동일한 레이아웃 내에서 하나 이상의 페이지를 동시에 또는 조건부로 렌더링할 수 있습니다. 소셜 사이트의 대시보드 및 피드와 같은 앱의 매우 동적인 섹션에 유용합니다.

예를 들어 대시보드를 고려하면 병렬 경로를 사용하여 및 페이지를 동시에 렌더링할 수 있습니다.`team` `analytics`

![병렬 경로 다이어그램](https://nextjs.org/_next/image?url=https%3A%2F%2Fh8DxKfmAPhn8O0p3.public.blob.vercel-storage.com%2Fdocs%2Flight%2Fparallel-routes.png&w=1920&q=75)

병렬 경로 다이어그램

## 슬롯

병렬 경로는 명명된 **슬롯을 사용하여 생성됩니다.** 슬롯은 규칙에 따라 정의됩니다. 예를 들어, 다음 파일 구조는 두 개의 슬롯을 정의합니다.`@folder` `@analytics` `@team`

![병렬 경로 파일 시스템 구조](https://nextjs.org/_next/image?url=https%3A%2F%2Fh8DxKfmAPhn8O0p3.public.blob.vercel-storage.com%2Fdocs%2Flight%2Fparallel-routes-file-system.png&w=1920&q=75)

병렬 경로 파일 시스템 구조

슬롯은 공유 상위 레이아웃에 props로 전달됩니다. 위의 예에서 의 구성 요소는 이제 및 slots 소품을 수락하고 소품과 함께 병렬로 렌더링할 수 있습니다.`app/layout.js` `@analytics` `@team` `children`

앱/레이아웃.tsx

```
export default function Layout({

  children,

  team,

  analytics,

}: {

  children: React.ReactNode

  analytics: React.ReactNode

  team: React.ReactNode

}) {

  return (

    <>

      {children}

      {team}

      {analytics}

    </>

  )

}
```

그러나 슬롯은 [경로 세그먼트](https://nextjs.org/docs/14/app/building-your-application/routing#route-segments) 가 **아니** 며 URL 구조에 영향을 주지 않습니다. 예를 들어 의 경우 URL은 슬롯이므로 됩니다.`/@analytics/views` `/views` `@analytics`

> **Good to know**:
> 
> - The prop is an implicit slot that does not need to be mapped to a folder. This means is equivalent to .`children` `app/page.js` `app/@children/page.js`

## Active state and navigation

By default, Next.js keeps track of the active *state* (or subpage) for each slot. However, the content rendered within a slot will depend on the type of navigation:

- [**Soft Navigation**](https://nextjs.org/docs/14/app/building-your-application/routing/linking-and-navigating#5-soft-navigation): During client-side navigation, Next.js will perform a [partial render](https://nextjs.org/docs/14/app/building-your-application/routing/linking-and-navigating#4-partial-rendering), changing the subpage within the slot, while maintaining the other slot's active subpages, even if they don't match the current URL.
- **Hard Navigation**: After a full-page load (browser refresh), Next.js cannot determine the active state for the slots that don't match the current URL. Instead, it will render a [`default.js`](https://nextjs.org/docs/14/app/building-your-application/routing/#defaultjs) file for the unmatched slots, or if doesn't exist.`404` `default.js`

> **Good to know**:
> 
> - The for unmatched routes helps ensure that you don't accidentally render a parallel route on a page that it was not intended for.`404`

### default.js

You can define a file to render as a fallback for unmatched slots during the initial load or full-page reload.`default.js`

Consider the following folder structure. The slot has a page, but does not.`@team` `/settings` `@analytics`

![Parallel Routes unmatched routes](https://nextjs.org/_next/image?url=https%3A%2F%2Fh8DxKfmAPhn8O0p3.public.blob.vercel-storage.com%2Fdocs%2Flight%2Fparallel-routes-unmatched-routes.png&w=1920&q=75)

Parallel Routes unmatched routes

When navigating to , the slot will render the page while maintaining the currently active page for the slot.`/settings` `@team` `/settings` `@analytics`

On refresh, Next.js will render a for . If doesn't exist, a is rendered instead.`default.js` `@analytics` `default.js` `404`

Additionally, since is an implicit slot, you also need to create a file to render a fallback for when Next.js cannot recover the active state of the parent page.`children` `default.js` `children`

### useSelectedLayoutSegment(s)

Both [`useSelectedLayoutSegment`](https://nextjs.org/docs/14/app/api-reference/functions/use-selected-layout-segment) and [`useSelectedLayoutSegments`](https://nextjs.org/docs/14/app/api-reference/functions/use-selected-layout-segments) accept a parameter, which allows you to read the active route segment within a slot.`parallelRoutesKey`

When a user navigates to (or in the URL bar), will be equal to the string .`app/@auth/login` `/login` `loginSegment` `"login"`

## Examples

### Conditional Routes

You can use Parallel Routes to conditionally render routes based on certain conditions, such as user role. For example, to render a different dashboard page for the or roles:`/admin` `/user`

![Conditional routes diagram](https://nextjs.org/_next/image?url=https%3A%2F%2Fh8DxKfmAPhn8O0p3.public.blob.vercel-storage.com%2Fdocs%2Flight%2Fconditional-routes-ui.png&w=1920&q=75)

Conditional routes diagram

app/dashboard/layout.tsx

```
import { checkUserRole } from '@/lib/auth'

 

export default function Layout({

  user,

  admin,

}: {

  user: React.ReactNode

  admin: React.ReactNode

}) {

  const role = checkUserRole()

  return <>{role === 'admin' ? admin : user}</>

}
```

### Tab Groups

You can add a inside a slot to allow users to navigate the slot independently. This is useful for creating tabs.`layout`

For example, the slot has two subpages: and .`@analytics` `/page-views` `/visitors`

![Analytics slot with two subpages and a layout](https://nextjs.org/_next/image?url=https%3A%2F%2Fh8DxKfmAPhn8O0p3.public.blob.vercel-storage.com%2Fdocs%2Flight%2Fparallel-routes-tab-groups.png&w=1920&q=75)

Analytics slot with two subpages and a layout

Within , create a `@analytics` [`layout`](https://nextjs.org/docs/14/app/building-your-application/routing/pages-and-layouts) file to share the tabs between the two pages:

### Modals

Parallel Routes can be used together with [Intercepting Routes](https://nextjs.org/docs/14/app/building-your-application/routing/intercepting-routes) to create modals. This allows you to solve common challenges when building modals, such as:

- Making the modal content **shareable through a URL**.
- **Preserving context** when the page is refreshed, instead of closing the modal.
- **Closing the modal on backwards navigation** rather than going to the previous route.
- **Reopening the modal on forwards navigation**.

Consider the following UI pattern, where a user can open a login modal from a layout using client-side navigation, or access a separate page:`/login`

![Parallel Routes Diagram](https://nextjs.org/_next/image?url=https%3A%2F%2Fh8DxKfmAPhn8O0p3.public.blob.vercel-storage.com%2Fdocs%2Flight%2Fparallel-routes-auth-modal.png&w=1920&q=75)

Parallel Routes Diagram

To implement this pattern, start by creating a route that renders your **main** login page.`/login`

![Parallel Routes Diagram](https://nextjs.org/_next/image?url=https%3A%2F%2Fh8DxKfmAPhn8O0p3.public.blob.vercel-storage.com%2Fdocs%2Flight%2Fparallel-routes-modal-login-page.png&w=1920&q=75)

Parallel Routes Diagram

Then, inside the slot, add `@auth` [`default.js`](https://nextjs.org/docs/14/app/api-reference/file-conventions/default) file that returns . This ensures that the modal is not rendered when it's not active.`null`

app/@auth/default.tsx

```
export default function Default() {

  return null

}
```

Inside your slot, intercept the route by updating the folder. Import the component and its children into the file:`@auth` `/login` `/(.)login` `<Modal>` `/(.)login/page.tsx`

> **Good to know:**
> 
> - The convention used to intercept the route, e.g. , depends on your file-system structure. See [Intercepting Routes convention](https://nextjs.org/docs/14/app/building-your-application/routing/intercepting-routes#convention).`(.)`
> - By separating the functionality from the modal content (), you can ensure any content inside the modal, e.g. [forms](https://nextjs.org/docs/14/app/building-your-application/data-fetching/server-actions-and-mutations#forms), are Server Components. See [Interleaving Client and Server Components](https://nextjs.org/docs/14/app/building-your-application/rendering/composition-patterns#supported-pattern-passing-server-components-to-client-components-as-props) for more information.`<Modal>` `<Login>`

Now, you can leverage the Next.js router to open and close the modal. This ensures the URL is correctly updated when the modal is open, and when navigating backwards and forwards.

To open the modal, pass the slot as a prop to the parent layout and render it alongside the prop.`@auth` `children`

When the user clicks the , the modal will open instead of navigating to the page. However, on refresh or initial load, navigating to will take the user to the main login page.`<Link>` `/login` `/login`

You can close the modal by calling or by using the component.`router.back()` `Link`

When using the component to navigate away from a page that shouldn't render the slot anymore, we use a catch-all route that returns .`Link` `@auth` `null`

app/ui/modal.tsx

```
import Link from 'next/link'

 

export function Modal({ children }: { children: React.ReactNode }) {

  return (

    <>

      <Link href="/">Close modal</Link>

      <div>{children}</div>

    </>

  )

}
```

app/@auth/\[...catchAll\]/page.tsx

```
export default function CatchAll() {

  return null

}
```

> **Good to know:**
> 
> - We use a catch-all route in our slot to close the modal because of the behavior described in [Active state and navigation](https://nextjs.org/docs/14/app/building-your-application/routing/#active-state-and-navigation). Since client-side navigations to a route that no longer match the slot will remain visible, we need to match the slot to a route that returns to close the modal.`@auth` `null`
> - Other examples could include opening a photo modal in a gallery while also having a dedicated page, or opening a shopping cart in a side modal.`/photo/[id]`
> - [View an example](https://github.com/vercel-labs/nextgram) of modals with Intercepted and Parallel Routes.

Parallel Routes can be streamed independently, allowing you to define independent error and loading states for each route:

![Parallel routes enable custom error and loading states](https://nextjs.org/_next/image?url=https%3A%2F%2Fh8DxKfmAPhn8O0p3.public.blob.vercel-storage.com%2Fdocs%2Flight%2Fparallel-routes-cinematic-universe.png&w=1920&q=75)

Parallel routes enable custom error and loading states

See the [Loading UI](https://nextjs.org/docs/14/app/building-your-application/routing/loading-ui-and-streaming) and [Error Handling](https://nextjs.org/docs/14/app/building-your-application/routing/error-handling) documentation for more information.[Introduction](https://nextjs.org/docs/14/app/api-reference/file-conventions/default)

[...](https://nextjs.org/docs/14/app/api-reference/file-conventions/default)

[File Conventions](https://nextjs.org/docs/14/app/api-reference/file-conventions/default)

default.js

API Reference for the default.js file.

[View original](https://nextjs.org/docs/14/app/api-reference/file-conventions/default)