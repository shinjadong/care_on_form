---
title: "Routing: Error Handling | Next.js"
source: "https://nextjs.org/docs/14/app/building-your-application/routing/error-handling"
author:
  - "[[Vercel]]"
published:
created: 2025-09-16
description: "Handle runtime errors by automatically wrapping route segments and their nested children in a React Error Boundary."
tags:
  - "clippings"
---
## 오류 처리

파일 규칙을 사용하면 [중첩된 경로](https://nextjs.org/docs/14/app/building-your-application/routing#nested-routes) 에서 예기치 않은 런타임 오류를 정상적으로 처리할 수 있습니다.`error.js`

- 경로 세그먼트와 중첩된 하위 세그먼트를 [React 오류 경계](https://react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary).
- 파일 시스템 계층 구조를 사용하여 특정 세그먼트에 맞는 오류 UI를 만들어 세분성을 조정합니다.
- 영향을 받는 세그먼트에 대한 오류를 격리하고 나머지 애플리케이션의 기능을 유지합니다.
- 전체 페이지를 다시 로드하지 않고 오류로부터 복구를 시도하는 기능을 추가합니다.

경로 세그먼트 내에 파일을 추가하고 React 구성 요소를 내보내 오류 UI를 만듭니다.`error.js`

![error.js 특수 파일](https://nextjs.org/_next/image?url=https%3A%2F%2Fh8DxKfmAPhn8O0p3.public.blob.vercel-storage.com%2Fdocs%2Flight%2Ferror-special-file.png&w=1920&q=75)

error.js 특수 파일

앱/대시보드/오류.tsx

```
'use client' // Error components must be Client Components

 

import { useEffect } from 'react'

 

export default function Error({

  error,

  reset,

}: {

  error: Error & { digest?: string }

  reset: () => void

}) {

  useEffect(() => {

    // Log the error to an error reporting service

    console.error(error)

  }, [error])

 

  return (

    <div>

      <h2>Something went wrong!</h2>

      <button

        onClick={

          // Attempt to recover by trying to re-render the segment

          () => reset()

        }

      >

        Try again

      </button>

    </div>

  )

}
```

![error.js 작동 방식](https://nextjs.org/_next/image?url=https%3A%2F%2Fh8DxKfmAPhn8O0p3.public.blob.vercel-storage.com%2Fdocs%2Flight%2Ferror-overview.png&w=1920&q=75)

error.js 작동 방식

- `error.js` automatically creates a [React Error Boundary](https://react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary) that **wraps** a nested child segment or component.`page.js`
- The React component exported from the file is used as the **fallback** component.`error.js`
- If an error is thrown within the error boundary, the error is **contained**, and the fallback component is **rendered**.
- When the fallback error component is active, layouts **above** the error boundary **maintain** their state and **remain** interactive, and the error component can display functionality to recover from the error.

The cause of an error can sometimes be temporary. In these cases, simply trying again might resolve the issue.

An error component can use the function to prompt the user to attempt to recover from the error. When executed, the function will try to re-render the Error boundary's contents. If successful, the fallback error component is replaced with the result of the re-render.`reset()`

app/dashboard/error.tsx

```
'use client'

 

export default function Error({

  error,

  reset,

}: {

  error: Error & { digest?: string }

  reset: () => void

}) {

  return (

    <div>

      <h2>Something went wrong!</h2>

      <button onClick={() => reset()}>Try again</button>

    </div>

  )

}
```

### Nested Routes

React components created through [special files](https://nextjs.org/docs/14/app/building-your-application/routing#file-conventions) are rendered in a [specific nested hierarchy](https://nextjs.org/docs/14/app/building-your-application/routing#component-hierarchy).

For example, a nested route with two segments that both include and files are rendered in the following *simplified* component hierarchy:`layout.js` `error.js`

![Nested Error Component Hierarchy](https://nextjs.org/_next/image?url=https%3A%2F%2Fh8DxKfmAPhn8O0p3.public.blob.vercel-storage.com%2Fdocs%2Flight%2Fnested-error-component-hierarchy.png&w=1920&q=75)

Nested Error Component Hierarchy

The nested component hierarchy has implications for the behavior of files across a nested route:`error.js`

- Errors bubble up to the nearest parent error boundary. This means an file will handle errors for all its nested child segments. More or less granular error UI can be achieved by placing files at different levels in the nested folders of a route.`error.js` `error.js`
- An boundary will **not** handle errors thrown in a component in the **same** segment because the error boundary is nested **inside** that layout's component.`error.js` `layout.js`

`error.js` boundaries do **not** catch errors thrown in or components of the **same segment**. This [intentional hierarchy](https://nextjs.org/docs/14/app/building-your-application/routing/#nested-routes) keeps important UI that is shared between sibling routes (such as navigation) visible and functional when an error occurs.`layout.js` `template.js`

To handle errors within a specific layout or template, place an file in the layout's parent segment.`error.js`

To handle errors within the root layout or template, use a variation of called .`error.js` `global-error.js`

The root boundary does **not** catch errors thrown in the root or component.`app/error.js` `app/layout.js` `app/template.js`

To specifically handle errors in these root components, use a variation of called located in the root directory.`error.js` `app/global-error.js` `app`

Unlike the root , the error boundary wraps the **entire** application, and its fallback component replaces the root layout when active. Because of this, it is important to note that **must** define its own and tags.`error.js` `global-error.js` `global-error.js` `<html>` `<body>`

`global-error.js` is the least granular error UI and can be considered "catch-all" error handling for the whole application. It is unlikely to be triggered often as root components are typically less dynamic, and other boundaries will catch most errors.`error.js`

Even if a is defined, it is still recommended to define a root whose fallback component will be rendered **within** the root layout, which includes globally shared UI and branding.`global-error.js` `error.js`

app/global-error.tsx

```
'use client'

 

export default function GlobalError({

  error,

  reset,

}: {

  error: Error & { digest?: string }

  reset: () => void

}) {

  return (

    <html>

      <body>

        <h2>Something went wrong!</h2>

        <button onClick={() => reset()}>Try again</button>

      </body>

    </html>

  )

}
```

> **Good to know**:
> 
> - `global-error.js` is only enabled in production. In development, our error overlay will show instead.

If an error is thrown inside a Server Component, Next.js will forward an object (stripped of sensitive error information in production) to the nearest file as the prop.`Error` `error.js` `error`

During production, the object forwarded to the client only includes a generic and property.`Error` `message` `digest`

This is a security precaution to avoid leaking potentially sensitive details included in the error to the client.

The property contains a generic message about the error and the property contains an automatically generated hash of the error that can be used to match the corresponding error in server-side logs.`message` `digest`

During development, the object forwarded to the client will be serialized and include the of the original error for easier debugging.`Error` `message`[Introduction](https://nextjs.org/docs/14/app/api-reference/file-conventions/error)

[...](https://nextjs.org/docs/14/app/api-reference/file-conventions/error)

[File Conventions](https://nextjs.org/docs/14/app/api-reference/file-conventions/error)

error.js

API reference for the error.js special file.

[View original](https://nextjs.org/docs/14/app/api-reference/file-conventions/error)