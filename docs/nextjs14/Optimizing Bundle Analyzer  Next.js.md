---
title: "Optimizing: Bundle Analyzer | Next.js"
source: "https://nextjs.org/docs/14/app/building-your-application/optimizing/bundle-analyzer"
author:
  - "[[Vercel]]"
published:
created: 2025-09-16
description: "Analyze the size of your JavaScript bundles using the @next/bundle-analyzer plugin."
tags:
  - "clippings"
---
## 번들 분석기

[`@next/bundle-analyzer`](https://www.npmjs.com/package/@next/bundle-analyzer) JavaScript 모듈의 크기를 관리하는 데 도움이 되는 Next.js용 플러그인입니다. 각 모듈의 크기와 해당 종속성에 대한 시각적 보고서를 생성합니다. 이 정보를 사용하여 큰 종속성을 제거하거나, 코드를 분할하거나, 필요할 때만 일부 부분만 로드하여 클라이언트로 전송되는 데이터의 양을 줄일 수 있습니다.

## 설치

다음 명령을 실행하여 플러그인을 설치합니다.

```
npm i @next/bundle-analyzer

# or

yarn add @next/bundle-analyzer

# or

pnpm add @next/bundle-analyzer
```

그런 다음 번들 분석기의 설정을.`next.config.js`

next.config.js

```
const withBundleAnalyzer = require('@next/bundle-analyzer')({

  enabled: process.env.ANALYZE === 'true',

})

 

/** @type {import('next').NextConfig} */

const nextConfig = {}

 

module.exports = withBundleAnalyzer(nextConfig)
```

## 번들 분석

다음 명령을 실행하여 번들을 분석합니다.

```
ANALYZE=true npm run build

# or

ANALYZE=true yarn build

# or

ANALYZE=true pnpm build
```

보고서는 브라우저에서 검사할 수 있는 세 개의 새 탭을 엽니다. 사이트를 개발하는 동안 및 배포하기 전에 정기적으로 이 작업을 수행하면 대규모 번들을 조기에 식별하고 응용 프로그램의 성능을 높이는 데 도움이 될 수 있습니다.

## 다음 단계

프로덕션을 위해 애플리케이션을 최적화하는 방법에 대해 자세히 알아보십시오.[소개](https://nextjs.org/docs/14/app/building-your-application/deploying/production-checklist)

[...](https://nextjs.org/docs/14/app/building-your-application/deploying/production-checklist)

[배포](https://nextjs.org/docs/14/app/building-your-application/deploying/production-checklist)

생산 체크리스트

Next.js 애플리케이션을 프로덕션으로 전환하기 전에 최상의 성능과 사용자 환경을 보장하기 위한 권장 사항입니다.

[View original](https://nextjs.org/docs/14/app/building-your-application/deploying/production-checklist)

도움이 되었나요?