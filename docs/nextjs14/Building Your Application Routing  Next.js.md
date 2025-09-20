---
title: "Building Your Application: Routing | Next.js"
source: "https://nextjs.org/docs/14/app/building-your-application/routing"
author:
  - "[[Vercel]]"
published:
created: 2025-09-16
description: "Learn the fundamentals of routing for front-end applications."
tags:
  - "clippings"
---
## 라우팅 기초

모든 애플리케이션의 골격은 라우팅입니다. 이 페이지에서는 웹용 라우팅의 **기본 개념** 과 Next.js에서 라우팅을 처리하는 방법을 소개합니다.

## 용어

먼저 문서 전체에서 이러한 용어가 사용되는 것을 볼 수 있습니다. 다음은 빠른 참조입니다.

![구성 요소 트리에 대한 용어](https://nextjs.org/_next/image?url=https%3A%2F%2Fh8DxKfmAPhn8O0p3.public.blob.vercel-storage.com%2Fdocs%2Flight%2Fterminology-component-tree.png&w=1920&q=75)

구성 요소 트리에 대한 용어

- **나무:** 계층 구조를 시각화하기 위한 규칙입니다. 예를 들어, 부모 및 자식 구성 요소가 있는 구성 요소 트리, 폴더 구조 등이 있습니다.
- **하위 트리:** 새로운 뿌리(첫 번째)에서 시작하여 잎(마지막)에서 끝나는 나무의 일부입니다.
- **루트**: 루트 레이아웃과 같은 트리 또는 하위 트리의 첫 번째 노드입니다.
- **잎:** 하위 트리에서 하위 항목이 없는 노드(예: URL 경로의 마지막 세그먼트)입니다.
![URL 해부학 용어](https://nextjs.org/_next/image?url=https%3A%2F%2Fh8DxKfmAPhn8O0p3.public.blob.vercel-storage.com%2Fdocs%2Flight%2Fterminology-url-anatomy.png&w=1920&q=75)

URL 해부학 용어

- **URL 세그먼트:** 슬래시로 구분된 URL 경로의 일부입니다.
- **URL 경로:** 도메인 뒤에 오는 URL의 일부(세그먼트로 구성됨).

## 라우터app

버전 13에서 Next.js 공유 레이아웃, 중첩 라우팅, 로딩 상태, 오류 처리 등을 지원하는 [React Server Components](https://nextjs.org/docs/14/app/building-your-application/rendering/server-components) 를 기반으로 구축된 새로운 **App Router** 를 도입했습니다.

App Router는 라는 새 디렉터리에서 작동합니다. 디렉터리는 디렉터리와 함께 작동하여 증분 채택을 허용합니다. 이렇게 하면 애플리케이션의 일부 경로를 새 동작으로 선택하고 이전 동작에 대해 디렉터리에 다른 경로를 유지할 수 있습니다. 애플리케이션에서 디렉토리를 사용하는 경우 [Pages Router](https://nextjs.org/docs/14/pages/building-your-application/routing) 설명서도 참조하십시오.`app` `app` `pages` `pages` `pages`

> **알아두면 좋은 정보**: 앱 라우터가 페이지 라우터보다 우선합니다. 디렉터리 간 경로는 동일한 URL 경로로 확인되어서는 안 되며 충돌을 방지하기 위해 빌드 시간 오류가 발생합니다.

![Next.js 앱 디렉토리](https://nextjs.org/_next/image?url=https%3A%2F%2Fh8DxKfmAPhn8O0p3.public.blob.vercel-storage.com%2Fdocs%2Flight%2Fnext-router-directories.png&w=1920&q=75)

Next.js 앱 디렉토리

By default, components inside are [React Server Components](https://nextjs.org/docs/14/app/building-your-application/rendering/server-components). This is a performance optimization and allows you to easily adopt them, and you can also use [Client Components](https://nextjs.org/docs/14/app/building-your-application/rendering/client-components).`app`

> **Recommendation:** Check out the [Server](https://nextjs.org/docs/14/app/building-your-application/rendering/server-components) page if you're new to Server Components.

## Roles of Folders and Files

Next.js uses a file-system based router where:

- **Folders** are used to define routes. A route is a single path of nested folders, following the file-system hierarchy from the **root folder** down to a final **leaf folder** that includes a file. See [Defining Routes](https://nextjs.org/docs/14/app/building-your-application/routing/defining-routes).`page.js`
- **Files** are used to create UI that is shown for a route segment. See [special files](https://nextjs.org/docs/14/app/building-your-application/#file-conventions).

## Route Segments

Each folder in a route represents a **route segment**. Each route segment is mapped to a corresponding **segment** in a **URL path**.

![How Route Segments Map to URL Segments](https://nextjs.org/_next/image?url=https%3A%2F%2Fh8DxKfmAPhn8O0p3.public.blob.vercel-storage.com%2Fdocs%2Flight%2Froute-segments-to-path-segments.png&w=1920&q=75)

How Route Segments Map to URL Segments

## Nested Routes

To create a nested route, you can nest folders inside each other. For example, you can add a new route by nesting two new folders in the directory.`/dashboard/settings` `app`

The route is composed of three segments:`/dashboard/settings`

- `/` (Root segment)
- `dashboard` (Segment)
- `settings` (Leaf segment)

## File Conventions

Next.js provides a set of special files to create UI with specific behavior in nested routes:

> **Good to know**: , , or file extensions can be used for special files.`.js``.jsx``.tsx`

## Component Hierarchy

The React components defined in special files of a route segment are rendered in a specific hierarchy:

- `layout.js`
- `template.js`
- `error.js` (React error boundary)
- `loading.js` (React suspense boundary)
- `not-found.js` (React error boundary)
- `page.js` or nested `layout.js`
![Component Hierarchy for File Conventions](https://nextjs.org/_next/image?url=https%3A%2F%2Fh8DxKfmAPhn8O0p3.public.blob.vercel-storage.com%2Fdocs%2Flight%2Ffile-conventions-component-hierarchy.png&w=1920&q=75)

Component Hierarchy for File Conventions

In a nested route, the components of a segment will be nested **inside** the components of its parent segment.

![Nested File Conventions Component Hierarchy](https://nextjs.org/_next/image?url=https%3A%2F%2Fh8DxKfmAPhn8O0p3.public.blob.vercel-storage.com%2Fdocs%2Flight%2Fnested-file-conventions-component-hierarchy.png&w=1920&q=75)

Nested File Conventions Component Hierarchy

## Colocation

In addition to special files, you have the option to colocate your own files (e.g. components, styles, tests, etc) inside folders in the directory.`app`

This is because while folders define routes, only the contents returned by or are publicly addressable.`page.js` `route.js`

![An example folder structure with colocated files](https://nextjs.org/_next/image?url=https%3A%2F%2Fh8DxKfmAPhn8O0p3.public.blob.vercel-storage.com%2Fdocs%2Flight%2Fproject-organization-colocation.png&w=1920&q=75)

An example folder structure with colocated files

Learn more about [Project Organization and Colocation](https://nextjs.org/docs/14/app/building-your-application/routing/colocation).

## Advanced Routing Patterns

The App Router also provides a set of conventions to help you implement more advanced routing patterns. These include:

- [Parallel Routes](https://nextjs.org/docs/14/app/building-your-application/routing/parallel-routes): Allow you to simultaneously show two or more pages in the same view that can be navigated independently. You can use them for split views that have their own sub-navigation. E.g. Dashboards.
- [Intercepting Routes](https://nextjs.org/docs/14/app/building-your-application/routing/intercepting-routes): Allow you to intercept a route and show it in the context of another route. You can use these when keeping the context for the current page is important. E.g. Seeing all tasks while editing one task or expanding a photo in a feed.

These patterns allow you to build richer and more complex UIs, democratizing features that were historically complex for small teams and individual developers to implement.

Now that you understand the fundamentals of routing in Next.js, follow the links below to create your first routes:### [Defining Routes](https://nextjs.org/docs/14/app/building-your-application/routing/defining-routes)

[

Learn how to create your first route in Next.js.

](https://nextjs.org/docs/14/app/building-your-application/routing/defining-routes)Pages and Layouts

Create your first page and shared layout with the App Router.

[View original](https://nextjs.org/docs/14/app/building-your-application/routing/pages-and-layouts)Linking and Navigating

Learn how navigation works in Next.js, and how to use the Link Component and \`useRouter\` hook.

[View original](https://nextjs.org/docs/14/app/building-your-application/routing/linking-and-navigating)Loading UI and Streaming

Built on top of Suspense, Loading UI allows you to create a fallback for specific route segments, and automatically stream content as it becomes ready.

[View original](https://nextjs.org/docs/14/app/building-your-application/routing/loading-ui-and-streaming)Error Handling

Handle runtime errors by automatically wrapping route segments and their nested children in a React Error Boundary.

[View original](https://nextjs.org/docs/14/app/building-your-application/routing/error-handling)Redirecting

Learn the different ways to handle redirects in Next.js.

[View original](https://nextjs.org/docs/14/app/building-your-application/routing/redirecting)Route Groups

Route Groups can be used to partition your Next.js application into different sections.

[View original](https://nextjs.org/docs/14/app/building-your-application/routing/route-groups)Project Organization

Learn how to organize your Next.js project and colocate files.

[View original](https://nextjs.org/docs/14/app/building-your-application/routing/colocation)Dynamic Routes

Dynamic Routes can be used to programmatically generate route segments from dynamic data.

[View original](https://nextjs.org/docs/14/app/building-your-application/routing/dynamic-routes)Parallel Routes

Simultaneously render one or more pages in the same view that can be navigated independently. A pattern for highly dynamic applications.

[View original](https://nextjs.org/docs/14/app/building-your-application/routing/parallel-routes)Intercepting Routes

Use intercepting routes to load a new route within the current layout while masking the browser URL, useful for advanced routing patterns such as modals.

[View original](https://nextjs.org/docs/14/app/building-your-application/routing/intercepting-routes)Route Handlers

Create custom request handlers for a given route using the Web's Request and Response APIs.

[View original](https://nextjs.org/docs/14/app/building-your-application/routing/route-handlers)Middleware

Learn how to use Middleware to run code before a request is completed.

[View original](https://nextjs.org/docs/14/app/building-your-application/routing/middleware)Internationalization

Add support for multiple languages with internationalized routing and localized content.

[View original](https://nextjs.org/docs/14/app/building-your-application/routing/internationalization)