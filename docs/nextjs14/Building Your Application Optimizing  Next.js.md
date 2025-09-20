---
title: "Building Your Application: Optimizing | Next.js"
source: "https://nextjs.org/docs/14/app/building-your-application/optimizing"
author:
  - "[[Vercel]]"
published:
created: 2025-09-16
description: "Optimize your Next.js application for best performance and user experience."
tags:
  - "clippings"
---
## 최적화

Next.js에는 애플리케이션의 속도를 향상시키도록 설계된 다양한 최적화 기능이 내장되어 있습니다. [핵심 웹 바이탈](https://web.dev/vitals/). 이 가이드에서는 사용자 경험을 향상시키는 데 활용할 수 있는 최적화를 다룹니다.

## 내장 구성 요소

기본 제공 구성 요소는 일반적인 UI 최적화 구현의 복잡성을 추상화합니다. 이러한 구성 요소는 다음과 같습니다.

- **이미지**: 기본 요소를 기반으로 합니다. 이미지 구성 요소는 장치 크기에 따라 이미지를 지연 로드하고 자동으로 크기를 조정하여 이미지 성능을 최적화합니다.`<img>`
- **링크**: 기본 태그를 기반으로 합니다. 링크 구성 요소는 더 빠르고 부드러운 페이지 전환을 위해 백그라운드에서 페이지를 미리 가져옵니다.`<a>`
- **스크립트**: 네이티브 태그를 기반으로 합니다. 스크립트 구성 요소를 사용하면 타사 스크립트의 로드 및 실행을 제어할 수 있습니다.`<script>`

메타데이터는 검색 엔진이 콘텐츠를 더 잘 이해하는 데 도움이 되며(더 나은 SEO로 이어질 수 있음) 소셜 미디어에 콘텐츠가 표시되는 방식을 사용자 정의할 수 있으므로 다양한 플랫폼에서 보다 매력적이고 일관된 사용자 경험을 만들 수 있습니다.

Next.js의 메타데이터 API를 사용하면 페이지의 요소를 수정할 수 있습니다. 다음 두 가지 방법으로 메타데이터를 구성할 수 있습니다.`<head>`

- **구성 기반 메타데이터**: 내보내기 [정적 객체 `metadata`](https://nextjs.org/docs/14/app/api-reference/functions/generate-metadata#metadata-object) 또는 동적 [`generateMetadata` 기능](https://nextjs.org/docs/14/app/api-reference/functions/generate-metadata#generatemetadata-function) 또는 파일에서.`layout.js` `page.js`
- **파일 기반 메타데이터**: 정적 또는 동적으로 생성된 특수 파일을 추가하여 세그먼트를 라우팅합니다.

또한 [imageResponse](https://nextjs.org/docs/14/app/api-reference/functions/image-response) 생성자와 함께 JSX 및 CSS를 사용하여 동적 Open Graph 이미지를 만들 수 있습니다.

## 스태틱 에셋

Next.js 폴더는 이미지, 글꼴 및 기타 파일과 같은 정적 자산을 제공하는 데 사용할 수 있습니다. 내부 파일은 CDN 공급자가 캐시하여 효율적으로 전달할 수도 있습니다.`/public` `/public`

## 분석 및 모니터링

대규모 애플리케이션의 경우 Next.js는 널리 사용되는 분석 및 모니터링 도구와 통합되어 애플리케이션의 성능을 이해하는 데 도움이 됩니다. [OpenTelemetry](https://nextjs.org/docs/14/pages/building-your-application/optimizing/open-telemetry) 및 [계측](https://nextjs.org/docs/14/pages/building-your-application/optimizing/instrumentation) 가이드에서 자세히 알아보세요.### [이미지](https://nextjs.org/docs/14/app/building-your-application/optimizing/images)

[

내장된 'next/image' 구성 요소로 이미지를 최적화하세요.

](https://nextjs.org/docs/14/app/building-your-application/optimizing/images)동영상

Next.js 애플리케이션에서 비디오를 최적화하기 위한 권장 사항 및 모범 사례입니다.

[View original](https://nextjs.org/docs/14/app/building-your-application/optimizing/videos)글꼴

내장된 'next/font' 로더를 사용하여 애플리케이션의 웹 글꼴을 최적화하세요.

[View original](https://nextjs.org/docs/14/app/building-your-application/optimizing/fonts)메타데이터

메타데이터 API를 사용하여 레이아웃 또는 페이지에서 메타데이터를 정의합니다.

[View original](https://nextjs.org/docs/14/app/building-your-application/optimizing/metadata)스크립트

내장된 스크립트 구성 요소를 사용하여 제3자 스크립트를 최적화합니다.

[View original](https://nextjs.org/docs/14/app/building-your-application/optimizing/scripts)번들 분석기

@next/bundle-analyzer 플러그인을 사용하여 JavaScript 번들의 크기를 분석합니다.

[View original](https://nextjs.org/docs/14/app/building-your-application/optimizing/bundle-analyzer)지연 로딩

가져온 라이브러리와 React 구성 요소를 지연 로드하여 애플리케이션의 로딩 성능을 향상시킵니다.

[View original](https://nextjs.org/docs/14/app/building-your-application/optimizing/lazy-loading)분석

Next.js Speed Insights를 사용하여 페이지 성능 측정 및 추적

[View original](https://nextjs.org/docs/14/app/building-your-application/optimizing/analytics)계측

계측을 사용하여 Next.js 앱에서 서버 시작 시 코드를 실행하는 방법 알아보기

[View original](https://nextjs.org/docs/14/app/building-your-application/optimizing/instrumentation)OpenTelemetry

OpenTelemetry를 사용하여 Next.js 앱을 계측하는 방법을 알아보세요.

[View original](https://nextjs.org/docs/14/app/building-your-application/optimizing/open-telemetry)스태틱 에셋

Next.js 사용하면 이미지와 같은 정적 파일을 공개 디렉터리에 제공할 수 있습니다. 여기에서 작동 방식을 배울 수 있습니다.

[View original](https://nextjs.org/docs/14/app/building-your-application/optimizing/static-assets)타사 라이브러리

'@next/third-party' 패키지를 사용하여 애플리케이션에서 타사 라이브러리의 성능을 최적화합니다.

[View original](https://nextjs.org/docs/14/app/building-your-application/optimizing/third-party-libraries)메모리 사용량

개발 및 프로덕션에서 애플리케이션에서 사용하는 메모리를 최적화합니다.

[View original](https://nextjs.org/docs/14/app/building-your-application/optimizing/memory-usage)