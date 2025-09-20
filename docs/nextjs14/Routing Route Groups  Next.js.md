---
title: "Routing: Route Groups | Next.js"
source: "https://nextjs.org/docs/14/app/building-your-application/routing/route-groups"
author:
  - "[[Vercel]]"
published:
created: 2025-09-16
description: "Route Groups can be used to partition your Next.js application into different sections."
tags:
  - "clippings"
---
## 경로 그룹

디렉터리에서 중첩된 폴더는 일반적으로 URL 경로에 매핑됩니다. 그러나 폴더를 **경로 그룹** 으로 표시하여 폴더가 경로의 URL 경로에 포함되지 않도록 할 수 있습니다.`app`

이를 통해 URL 경로 구조에 영향을 주지 않고 경로 세그먼트 및 프로젝트 파일을 논리적 그룹으로 구성할 수 있습니다.

경로 그룹은 다음과 같은 경우에 유용합니다.

- [경로를 그룹으로 구성](https://nextjs.org/docs/14/app/building-your-application/routing/#organize-routes-without-affecting-the-url-path) 합니다(예: 사이트 섹션, 의도 또는 팀별).
- 동일한 경로 세그먼트 수준에서 [중첩된 레이아웃](https://nextjs.org/docs/14/app/building-your-application/routing/pages-and-layouts) 활성화:
	- [여러 루트 레이아웃을 포함하여 동일한 세그먼트에 여러 중첩된 레이아웃 만들기](https://nextjs.org/docs/14/app/building-your-application/routing/#creating-multiple-root-layouts)
	- [공통 세그먼트의 경로 하위 집합에 레이아웃 추가](https://nextjs.org/docs/14/app/building-your-application/routing/#opting-specific-segments-into-a-layout)

## 컨벤션

경로 그룹은 폴더 이름을 괄호로 묶어 만들 수 있습니다. `(folderName)`

## 예제

### URL 경로에 영향을 주지 않고 경로 구성

URL에 영향을 주지 않고 경로를 구성하려면 관련 경로를 함께 유지하는 그룹을 만듭니다. 괄호 안의 폴더는 URL에서 생략됩니다(예: 또는 ).`(marketing)` `(shop)`

![경로 그룹을 사용하여 경로 구성](https://nextjs.org/_next/image?url=https%3A%2F%2Fh8DxKfmAPhn8O0p3.public.blob.vercel-storage.com%2Fdocs%2Flight%2Froute-group-organisation.png&w=1920&q=75)

경로 그룹을 사용하여 경로 구성

내부의 경로가 동일한 URL 계층 구조를 공유하더라도 폴더 내에 파일을 추가하여 각 그룹에 대해 다른 레이아웃을 만들 수 있습니다.`(marketing)` `(shop)` `layout.js`

![여러 레이아웃이 있는 경로 그룹](https://nextjs.org/_next/image?url=https%3A%2F%2Fh8DxKfmAPhn8O0p3.public.blob.vercel-storage.com%2Fdocs%2Flight%2Froute-group-multiple-layouts.png&w=1920&q=75)

여러 레이아웃이 있는 경로 그룹

### 레이아웃에 특정 세그먼트 선택

특정 경로를 레이아웃에 선택하려면 새 경로 그룹(예: )을 만들고 동일한 레이아웃을 공유하는 경로를 그룹(예: 그리고 ). 그룹 외부의 경로는 레이아웃을 공유하지 않습니다(예: ).`(shop)` `account` `cart` `checkout`

![Route Groups with Opt-in Layouts](https://nextjs.org/_next/image?url=https%3A%2F%2Fh8DxKfmAPhn8O0p3.public.blob.vercel-storage.com%2Fdocs%2Flight%2Froute-group-opt-in-layouts.png&w=1920&q=75)

Route Groups with Opt-in Layouts

### Creating multiple root layouts

To create multiple [root layouts](https://nextjs.org/docs/14/app/building-your-application/routing/pages-and-layouts#root-layout-required), remove the top-level file, and add a file inside each route groups. This is useful for partitioning an application into sections that have a completely different UI or experience. The and tags need to be added to each root layout.`layout.js` `layout.js` `<html>` `<body>`

![Route Groups with Multiple Root Layouts](https://nextjs.org/_next/image?url=https%3A%2F%2Fh8DxKfmAPhn8O0p3.public.blob.vercel-storage.com%2Fdocs%2Flight%2Froute-group-multiple-root-layouts.png&w=1920&q=75)

Route Groups with Multiple Root Layouts

In the example above, both and have their own root layout.`(marketing)` `(shop)`

---

> **Good to know**:
> 
> - The naming of route groups has no special significance other than for organization. They do not affect the URL path.
> - Routes that include a route group **should not** resolve to the same URL path as other routes. For example, since route groups don't affect URL structure, and would both resolve to and cause an error.`(marketing)/about/page.js` `(shop)/about/page.js` `/about`
> - If you use multiple root layouts without a top-level file, your home file should be defined in one of the route groups, For example: .`layout.js` `page.js` `app/(marketing)/page.js`
> - Navigating **across multiple root layouts** will cause a **full page load** (as opposed to a client-side navigation). For example, navigating from that uses to that uses will cause a full page load. This **only** applies to multiple root layouts.`/cart` `app/(shop)/layout.js` `/blog` `app/(marketing)/layout.js`