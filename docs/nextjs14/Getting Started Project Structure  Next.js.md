---
title: "Getting Started: Project Structure | Next.js"
source: "https://nextjs.org/docs/14/getting-started/project-structure"
author:
  - "[[Vercel]]"
published:
created: 2025-09-16
description: "A list of folders and files conventions in a Next.js project"
tags:
  - "clippings"
---
[소개](https://nextjs.org/docs/14) [시작](https://nextjs.org/docs/14/getting-started) 프로젝트 구조

## Next.js 프로젝트 구조

이 페이지에서는 Next.js 응용 프로그램의 프로젝트 구조에 대한 개요를 제공합니다. 이 문서에서는 및 디렉토리 내의 최상위 파일 및 폴더, 구성 파일 및 라우팅 규칙을 다룹니다.`app` `pages`

파일 및 폴더 이름을 클릭하여 각 규칙에 대해 자세히 알아봅니다.

## 최상위 폴더

최상위 폴더는 애플리케이션의 코드와 정적 자산을 구성하는 데 사용됩니다.

![경로 세그먼트로 세그먼트 라우팅](https://nextjs.org/_next/image?url=https%3A%2F%2Fh8DxKfmAPhn8O0p3.public.blob.vercel-storage.com%2Fdocs%2Flight%2Ftop-level-folders.png&w=1920&q=75)

경로 세그먼트로 세그먼트 라우팅

|  |  |
| --- | --- |
| [`app`](https://nextjs.org/docs/14/app/building-your-application/routing) | 앱 라우터 |
| [`pages`](https://nextjs.org/docs/14/pages/building-your-application/routing) | 페이지 라우터 |
| [`public`](https://nextjs.org/docs/14/app/building-your-application/optimizing/static-assets) | 제공할 정적 자산 |
| [`src`](https://nextjs.org/docs/14/app/building-your-application/configuring/src-directory) | 선택적 응용 프로그램 원본 폴더 |

## 최상위 파일

최상위 파일은 애플리케이션을 구성하고, 종속성을 관리하고, 미들웨어를 실행하고, 모니터링 도구를 통합하고, 환경 변수를 정의하는 데 사용됩니다.

|  |  |
| --- | --- |
| **Next.js** |  |
| [`next.config.js`](https://nextjs.org/docs/14/app/api-reference/next-config-js) | Next.js용 구성 파일 |
| [`package.json`](https://nextjs.org/docs/14/getting-started/installation#manual-installation) | 프로젝트 종속성 및 스크립트 |
| [`instrumentation.ts`](https://nextjs.org/docs/14/app/building-your-application/optimizing/instrumentation) | OpenTelemetry 및 계측 파일 |
| [`middleware.ts`](https://nextjs.org/docs/14/app/building-your-application/routing/middleware) | Next.js 요청 미들웨어 |
| [`.env`](https://nextjs.org/docs/14/app/building-your-application/configuring/environment-variables) | 환경 변수 |
| [`.env.local`](https://nextjs.org/docs/14/app/building-your-application/configuring/environment-variables) | 로컬 환경 변수 |
| [`.env.production`](https://nextjs.org/docs/14/app/building-your-application/configuring/environment-variables) | 프로덕션 환경 변수 |
| [`.env.development`](https://nextjs.org/docs/14/app/building-your-application/configuring/environment-variables) | 개발 환경 변수 |
| [`.eslintrc.json`](https://nextjs.org/docs/14/app/building-your-application/configuring/eslint) | ESLint용 구성 파일 |
| `.gitignore` | 무시할 Git 파일 및 폴더 |
| `next-env.d.ts` | Next.js용 TypeScript 선언 파일 |
| `tsconfig.json` | TypeScript용 구성 파일 |
| `jsconfig.json` | JavaScript용 구성 파일 |

## app 라우팅 규칙

다음 파일 규칙은 경로를 정의하고 메타데이터를 처리하는 데 사용됩니다. [`app` 라우터](https://nextjs.org/docs/14/app).

### 라우팅 파일

|  |  |  |
| --- | --- | --- |
| [`layout`](https://nextjs.org/docs/14/app/api-reference/file-conventions/layout) | `.js``.jsx``.tsx` | 레이아웃 |
| [`page`](https://nextjs.org/docs/14/app/api-reference/file-conventions/page) | `.js``.jsx``.tsx` | 페이지 |
| [`loading`](https://nextjs.org/docs/14/app/api-reference/file-conventions/loading) | `.js``.jsx``.tsx` | UI 로딩 중 |
| [`not-found`](https://nextjs.org/docs/14/app/api-reference/file-conventions/not-found) | `.js``.jsx``.tsx` | UI를 찾을 수 없음 |
| [`error`](https://nextjs.org/docs/14/app/api-reference/file-conventions/error) | `.js``.jsx``.tsx` | 오류 UI |
| [`global-error`](https://nextjs.org/docs/14/app/api-reference/file-conventions/error#global-errorjs) | `.js``.jsx``.tsx` | 전역 오류 UI |
| [`route`](https://nextjs.org/docs/14/app/api-reference/file-conventions/route) | `.js``.ts` | API 엔드포인트 |
| [`template`](https://nextjs.org/docs/14/app/api-reference/file-conventions/template) | `.js``.jsx``.tsx` | 다시 렌더링된 레이아웃 |
| [`default`](https://nextjs.org/docs/14/app/api-reference/file-conventions/default) | `.js``.jsx``.tsx` | 병렬 경로 대체 페이지 |

### 중첩된 경로

|  |  |
| --- | --- |
| [`folder`](https://nextjs.org/docs/14/app/building-your-application/routing#route-segments) | 경로 세그먼트 |
| [`folder/folder`](https://nextjs.org/docs/14/app/building-your-application/routing#nested-routes) | 중첩된 경로 세그먼트 |

### 동적 경로

|  |  |
| --- | --- |
| [`[folder]`](https://nextjs.org/docs/14/app/building-your-application/routing/dynamic-routes#convention) | 동적 경로 세그먼트 |
| [`[...folder]`](https://nextjs.org/docs/14/app/building-your-application/routing/dynamic-routes#catch-all-segments) | 포괄적 경로 세그먼트 |
| [`[[...folder]]`](https://nextjs.org/docs/14/app/building-your-application/routing/dynamic-routes#optional-catch-all-segments) | 선택적 catch-all 경로 세그먼트 |

### 경로 그룹 및 개인 폴더

|  |  |
| --- | --- |
| [`(folder)`](https://nextjs.org/docs/14/app/building-your-application/routing/route-groups#convention) | 라우팅에 영향을 주지 않고 경로 그룹화 |
| [`_folder`](https://nextjs.org/docs/14/app/building-your-application/routing/colocation#private-folders) | 폴더 및 모든 하위 세그먼트를 라우팅에서 제외 |

### 병렬 및 가로채는 경로

|  |  |
| --- | --- |
| [`@folder`](https://nextjs.org/docs/14/app/building-your-application/routing/parallel-routes#slots) | 명명된 슬롯 |
| [`(.)folder`](https://nextjs.org/docs/14/app/building-your-application/routing/intercepting-routes#convention) | 같은 레벨 가로채기 |
| [`(..)folder`](https://nextjs.org/docs/14/app/building-your-application/routing/intercepting-routes#convention) | 한 단계 위 요격 |
| [`(..)(..)folder`](https://nextjs.org/docs/14/app/building-your-application/routing/intercepting-routes#convention) | 두 단계 위 가로채기 |
| [`(...)folder`](https://nextjs.org/docs/14/app/building-your-application/routing/intercepting-routes#convention) | 루트에서 가로채기 |

#### 앱 아이콘

|  |  |  |
| --- | --- | --- |
| [`favicon`](https://nextjs.org/docs/14/app/api-reference/file-conventions/metadata/app-icons#favicon) | `.ico` | 파비콘 파일 |
| [`icon`](https://nextjs.org/docs/14/app/api-reference/file-conventions/metadata/app-icons#icon) | `.ico``.jpg``.jpeg``.png``.svg` | 앱 아이콘 파일 |
| [`icon`](https://nextjs.org/docs/14/app/api-reference/file-conventions/metadata/app-icons#generate-icons-using-code-js-ts-tsx) | `.js``.ts``.tsx` | 생성된 앱 아이콘 |
| [`apple-icon`](https://nextjs.org/docs/14/app/api-reference/file-conventions/metadata/app-icons#apple-icon) | `.jpg``.jpeg`, `.png` | Apple 앱 아이콘 파일 |
| [`apple-icon`](https://nextjs.org/docs/14/app/api-reference/file-conventions/metadata/app-icons#generate-icons-using-code-js-ts-tsx) | `.js``.ts``.tsx` | 생성된 Apple 앱 아이콘 |

|  |  |  |
| --- | --- | --- |
| [`opengraph-image`](https://nextjs.org/docs/14/app/api-reference/file-conventions/metadata/opengraph-image#opengraph-image) | `.jpg``.jpeg``.png``.gif` | 그래프 이미지 파일 열기 |
| [`opengraph-image`](https://nextjs.org/docs/14/app/api-reference/file-conventions/metadata/opengraph-image#generate-images-using-code-js-ts-tsx) | `.js``.ts``.tsx` | 생성된 오픈 그래프 이미지 |
| [`twitter-image`](https://nextjs.org/docs/14/app/api-reference/file-conventions/metadata/opengraph-image#twitter-image) | `.jpg``.jpeg``.png``.gif` | 트위터 이미지 파일 |
| [`twitter-image`](https://nextjs.org/docs/14/app/api-reference/file-conventions/metadata/opengraph-image#generate-images-using-code-js-ts-tsx) | `.js``.ts``.tsx` | 생성된 Twitter 이미지 |

#### SEO (영어)

|  |  |  |
| --- | --- | --- |
| [`sitemap`](https://nextjs.org/docs/14/app/api-reference/file-conventions/metadata/sitemap#sitemap-files-xml) | `.xml` | 사이트맵 파일 |
| [`sitemap`](https://nextjs.org/docs/14/app/api-reference/file-conventions/metadata/sitemap#generating-a-sitemap-using-code-js-ts) | `.js``.ts` | 생성된 사이트맵 |
| [`robots`](https://nextjs.org/docs/14/app/api-reference/file-conventions/metadata/robots#static-robotstxt) | `.txt` | 로봇 파일 |
| [`robots`](https://nextjs.org/docs/14/app/api-reference/file-conventions/metadata/robots#generate-a-robots-file) | `.js``.ts` | 생성된 로봇 파일 |

## pages 라우팅 규칙

다음 파일 규칙은 [`pages` 라우터](https://nextjs.org/docs/14/pages).

### 특수 파일

|  |  |  |
| --- | --- | --- |
| [`_app`](https://nextjs.org/docs/14/pages/building-your-application/routing/custom-app) | `.js``.jsx``.tsx` | 사용자 지정 앱 |
| [`_document`](https://nextjs.org/docs/14/pages/building-your-application/routing/custom-document) | `.js``.jsx``.tsx` | 사용자 지정 문서 |
| [`_error`](https://nextjs.org/docs/14/pages/building-your-application/routing/custom-error#more-advanced-error-page-customizing) | `.js``.jsx``.tsx` | 사용자 지정 오류 페이지 |
| [`404`](https://nextjs.org/docs/14/pages/building-your-application/routing/custom-error#404-page) | `.js``.jsx``.tsx` | 404 오류 페이지 |
| [`500`](https://nextjs.org/docs/14/pages/building-your-application/routing/custom-error#500-page) | `.js``.jsx``.tsx` | 500 오류 페이지 |

### 경로

|  |  |  |
| --- | --- | --- |
| **폴더 규칙** |  |  |
| [`index`](https://nextjs.org/docs/14/pages/building-your-application/routing/pages-and-layouts#index-routes) | `.js``.jsx``.tsx` | 홈페이지 |
| [`folder/index`](https://nextjs.org/docs/14/pages/building-your-application/routing/pages-and-layouts#index-routes) | `.js``.jsx``.tsx` | 중첩된 페이지 |
| **파일 규칙** |  |  |
| [`index`](https://nextjs.org/docs/14/pages/building-your-application/routing/pages-and-layouts#index-routes) | `.js``.jsx``.tsx` | 홈페이지 |
| [`file`](https://nextjs.org/docs/14/pages/building-your-application/routing/pages-and-layouts) | `.js``.jsx``.tsx` | 중첩된 페이지 |

### 동적 경로

|  |  |  |
| --- | --- | --- |
| **폴더 규칙** |  |  |
| [`[folder]/index`](https://nextjs.org/docs/14/pages/building-your-application/routing/dynamic-routes) | `.js``.jsx``.tsx` | 동적 경로 세그먼트 |
| [`[...folder]/index`](https://nextjs.org/docs/14/pages/building-your-application/routing/dynamic-routes#catch-all-segments) | `.js``.jsx``.tsx` | 포괄적 경로 세그먼트 |
| [`[[...folder]]/index`](https://nextjs.org/docs/14/pages/building-your-application/routing/dynamic-routes#optional-catch-all-segments) | `.js``.jsx``.tsx` | 선택적 catch-all 경로 세그먼트 |
| **파일 규칙** |  |  |
| [`[file]`](https://nextjs.org/docs/14/pages/building-your-application/routing/dynamic-routes) | `.js``.jsx``.tsx` | 동적 경로 세그먼트 |
| [`[...file]`](https://nextjs.org/docs/14/pages/building-your-application/routing/dynamic-routes#catch-all-segments) | `.js``.jsx``.tsx` | 포괄적 경로 세그먼트 |
| [`[[...file]]`](https://nextjs.org/docs/14/pages/building-your-application/routing/dynamic-routes#optional-catch-all-segments) | `.js``.jsx``.tsx` | 선택적 catch-all 경로 세그먼트 |