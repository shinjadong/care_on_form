---
title: "Routing: Project Organization | Next.js"
source: "https://nextjs.org/docs/14/app/building-your-application/routing/colocation"
author:
  - "[[Vercel]]"
published:
created: 2025-09-16
description: "Learn how to organize your Next.js project and colocate files."
tags:
  - "clippings"
---
## 프로젝트 구성 및 파일 코로케이션

[라우팅 폴더 및 파일 규칙](https://nextjs.org/docs/14/getting-started/project-structure#app-routing-conventions) 외에도 Next.js 프로젝트 파일을 구성하고 공동 배치하는 방법에 대해 **의견이 없습니다**.

이 페이지에서는 프로젝트를 구성하는 데 사용할 수 있는 기본 동작 및 기능을 공유합니다.

- [기본적으로 안전한 코로케이션](https://nextjs.org/docs/14/app/building-your-application/routing/#safe-colocation-by-default)
- [프로젝트 구성 기능](https://nextjs.org/docs/14/app/building-your-application/routing/#project-organization-features)
- [프로젝트 조직 전략](https://nextjs.org/docs/14/app/building-your-application/routing/#project-organization-strategies)

## 기본적으로 안전한 코로케이션

디렉터리에서 [중첩된 폴더 계층 구조](https://nextjs.org/docs/14/app/building-your-application/routing#route-segments) 는 경로 구조를 정의합니다.`app`

각 폴더는 URL 경로의 해당 세그먼트에 매핑된 경로 세그먼트를 나타냅니다.

그러나 경로 구조가 폴더를 통해 정의되더라도 또는 파일이 경로 세그먼트에 추가될 때까지 경로에 **공개적으로 액세스할 수 없습니다**.`page.js` `route.js`

![page.js 또는 route.js 파일이 경로 세그먼트에 추가될 때까지 경로에 공개적으로 액세스할 수 없는 방법을 보여 주는 다이어그램입니다.](https://nextjs.org/_next/image?url=https%3A%2F%2Fh8DxKfmAPhn8O0p3.public.blob.vercel-storage.com%2Fdocs%2Flight%2Fproject-organization-not-routable.png&w=1920&q=75)

page.js 또는 route.js 파일이 경로 세그먼트에 추가될 때까지 경로에 공개적으로 액세스할 수 없는 방법을 보여 주는 다이어그램입니다.

그리고 경로에 공개적으로 액세스할 수 있는 경우에도 클라이언트에서 반환되거나 클라이언트로 전송되는 **콘텐츠** 만 있습니다.`page.js` `route.js`

![page.js 및 route.js 파일을 사용하여 경로를 공개적으로 액세스할 수 있도록 하는 방법을 보여 주는 다이어그램입니다.](https://nextjs.org/_next/image?url=https%3A%2F%2Fh8DxKfmAPhn8O0p3.public.blob.vercel-storage.com%2Fdocs%2Flight%2Fproject-organization-routable.png&w=1920&q=75)

page.js 및 route.js 파일을 사용하여 경로를 공개적으로 액세스할 수 있도록 하는 방법을 보여 주는 다이어그램입니다.

즉, **프로젝트 파일은** 실수로 라우팅할 수 없는 디렉터리의 경로 세그먼트 내에 **안전하게 공동 배치** 할 수 있습니다.`app`

![공동 배치된 프로젝트 파일을 보여주는 다이어그램은 세그먼트에 page.js 또는 route.js 파일이 포함되어 있는 경우에도 라우팅할 수 없습니다.](https://nextjs.org/_next/image?url=https%3A%2F%2Fh8DxKfmAPhn8O0p3.public.blob.vercel-storage.com%2Fdocs%2Flight%2Fproject-organization-colocation.png&w=1920&q=75)

공동 배치된 프로젝트 파일을 보여주는 다이어그램은 세그먼트에 page.js 또는 route.js 파일이 포함되어 있는 경우에도 라우팅할 수 없습니다.

> **알아 둘만 한**:
> 
> - 이는 모든 파일이 경로로 간주되는 디렉터리와 다릅니다.`pages` `pages`
> - While you **can** colocate your project files in you don't **have** to. If you prefer, you can `app` [keep them outside the directory `app`](https://nextjs.org/docs/14/app/building-your-application/routing/#store-project-files-outside-of-app).

## Project organization features

Next.js provides several features to help you organize your project.

### Private Folders

Private folders can be created by prefixing a folder with an underscore: `_folderName`

This indicates the folder is a private implementation detail and should not be considered by the routing system, thereby **opting the folder and all its subfolders** out of routing.

![An example folder structure using private folders](https://nextjs.org/_next/image?url=https%3A%2F%2Fh8DxKfmAPhn8O0p3.public.blob.vercel-storage.com%2Fdocs%2Flight%2Fproject-organization-private-folders.png&w=1920&q=75)

An example folder structure using private folders

Since files in the directory can be [safely colocated by default](https://nextjs.org/docs/14/app/building-your-application/routing/#safe-colocation-by-default), private folders are not required for colocation. However, they can be useful for:`app`

- Separating UI logic from routing logic.
- Consistently organizing internal files across a project and the Next.js ecosystem.
- Sorting and grouping files in code editors.
- Avoiding potential naming conflicts with future Next.js file conventions.

> **Good to know**
> 
> - While not a framework convention, you might also consider marking files outside private folders as "private" using the same underscore pattern.
> - You can create URL segments that start with an underscore by prefixing the folder name with (the URL-encoded form of an underscore): .`%5F` `%5FfolderName`
> - If you don't use private folders, it would be helpful to know Next.js [special file conventions](https://nextjs.org/docs/14/getting-started/project-structure#routing-files) to prevent unexpected naming conflicts.

### Route Groups

Route groups can be created by wrapping a folder in parenthesis: `(folderName)`

This indicates the folder is for organizational purposes and should **not be included** in the route's URL path.

![An example folder structure using route groups](https://nextjs.org/_next/image?url=https%3A%2F%2Fh8DxKfmAPhn8O0p3.public.blob.vercel-storage.com%2Fdocs%2Flight%2Fproject-organization-route-groups.png&w=1920&q=75)

An example folder structure using route groups

Route groups are useful for:

- [Organizing routes into groups](https://nextjs.org/docs/14/app/building-your-application/routing/route-groups#organize-routes-without-affecting-the-url-path) e.g. by site section, intent, or team.
- Enabling nested layouts in the same route segment level:
	- [Creating multiple nested layouts in the same segment, including multiple root layouts](https://nextjs.org/docs/14/app/building-your-application/routing/route-groups#creating-multiple-root-layouts)
	- [Adding a layout to a subset of routes in a common segment](https://nextjs.org/docs/14/app/building-your-application/routing/route-groups#opting-specific-segments-into-a-layout)

### src Directory

Next.js supports storing application code (including ) inside an optional `app` [`src` directory](https://nextjs.org/docs/14/app/building-your-application/configuring/src-directory). This separates application code from project configuration files which mostly live in the root of a project.

![An example folder structure with the `src` directory](https://nextjs.org/_next/image?url=https%3A%2F%2Fh8DxKfmAPhn8O0p3.public.blob.vercel-storage.com%2Fdocs%2Flight%2Fproject-organization-src-directory.png&w=1920&q=75)

An example folder structure with the \`src\` directory

### Module Path Aliases

Next.js supports [Module Path Aliases](https://nextjs.org/docs/14/app/building-your-application/configuring/absolute-imports-and-module-aliases) which make it easier to read and maintain imports across deeply nested project files.

app/dashboard/settings/analytics/page.js

```
// before

import { Button } from '../../../components/button'

 

// after

import { Button } from '@/components/button'
```

## Project organization strategies

There is no "right" or "wrong" way when it comes to organizing your own files and folders in a Next.js project.

The following section lists a very high-level overview of common strategies. The simplest takeaway is to choose a strategy that works for you and your team and be consistent across the project.

> **Good to know**: In our examples below, we're using and folders as generalized placeholders, their naming has no special framework significance and your projects might use other folders like , , , , etc.`components` `lib` `ui` `utils` `hooks` `styles`

### Store project files outside of app

This strategy stores all application code in shared folders in the **root of your project** and keeps the directory purely for routing purposes.`app`

![An example folder structure with project files outside of app](https://nextjs.org/_next/image?url=https%3A%2F%2Fh8DxKfmAPhn8O0p3.public.blob.vercel-storage.com%2Fdocs%2Flight%2Fproject-organization-project-root.png&w=1920&q=75)

An example folder structure with project files outside of app

### Store project files in top-level folders inside of app

This strategy stores all application code in shared folders in the **root of the directory `app`**.

![An example folder structure with project files inside app](https://nextjs.org/_next/image?url=https%3A%2F%2Fh8DxKfmAPhn8O0p3.public.blob.vercel-storage.com%2Fdocs%2Flight%2Fproject-organization-app-root.png&w=1920&q=75)

An example folder structure with project files inside app

### Split project files by feature or route

This strategy stores globally shared application code in the root directory and **splits** more specific application code into the route segments that use them.`app`

![An example folder structure with project files split by feature or route](https://nextjs.org/_next/image?url=https%3A%2F%2Fh8DxKfmAPhn8O0p3.public.blob.vercel-storage.com%2Fdocs%2Flight%2Fproject-organization-app-root-split.png&w=1920&q=75)

An example folder structure with project files split by feature or route[Introduction](https://nextjs.org/docs/14/app/building-your-application/routing/defining-routes)

[...](https://nextjs.org/docs/14/app/building-your-application/routing/defining-routes)

[Routing](https://nextjs.org/docs/14/app/building-your-application/routing/defining-routes)

Defining Routes

Learn how to create your first route in Next.js.

[View original](https://nextjs.org/docs/14/app/building-your-application/routing/defining-routes)Route Groups

Introduction

...

Routing

Route Groups can be used to partition your Next.js application into different sections.

[View original](https://nextjs.org/docs/14/app/building-your-application/routing/route-groups)src Directory

Introduction

...

Configuring

Save pages under the \`src\` directory as an alternative to the root \`pages\` directory.

[View original](https://nextjs.org/docs/14/app/building-your-application/configuring/src-directory)Absolute Imports and Module Path Aliases

Introduction

...

Configuring

Configure module path aliases that allow you to remap certain import paths.

[View original](https://nextjs.org/docs/14/app/building-your-application/configuring/absolute-imports-and-module-aliases)