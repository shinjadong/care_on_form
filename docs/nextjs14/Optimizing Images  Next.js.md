---
title: "Optimizing: Images | Next.js"
source: "https://nextjs.org/docs/14/app/building-your-application/optimizing/images"
author:
  - "[[Vercel]]"
published:
created: 2025-09-16
description: "Optimize your images with the built-in `next/image` component."
tags:
  - "clippings"
---
[애플리케이션 빌드](https://nextjs.org/docs/14/app/building-your-application) [최적화](https://nextjs.org/docs/14/app/building-your-application/optimizing) 이미지

## 이미지 최적화

예제
- [이미지 구성 요소](https://github.com/vercel/next.js/tree/canary/examples/image-component)

에 따르면 [웹 연감](https://almanac.httparchive.org/), 이미지는 일반적인 웹사이트의 큰 부분을 차지합니다. [페이지 두께](https://almanac.httparchive.org/en/2022/page-weight#content-type-and-file-formats) 웹사이트의 [LCP 성능](https://almanac.httparchive.org/en/2022/performance#lcp-image-optimization).

Next.js Image 구성 요소는 자동 이미지 최적화를 위한 기능으로 HTML 요소를 확장합니다.`<img>`

- **크기 최적화:** WebP 및 AVIF와 같은 최신 이미지 형식을 사용하여 각 장치에 대해 올바른 크기의 이미지를 자동으로 제공합니다.
- **시각적 안정성:** 이미지를 로드할 때 [레이아웃이 자동으로 이동](https://nextjs.org/learn/seo/web-performance/cls) 하지 않도록 합니다.
- **더 빠른 페이지 로드:** 이미지는 기본 브라우저 지연 로딩을 사용하여 뷰포트에 들어갈 때만 로드되며 선택적 흐림 자리 표시자가 있습니다.
- **자산 유연성:** 원격 서버에 저장된 이미지의 경우에도 주문형 이미지 크기 조정

> **🎥 시계:** → 사용 방법에 대해 자세히 알아보기 `next/image` [유튜브(9분)](https://youtu.be/IU_qq_c_lKA).

## 사용법

```
import Image from 'next/image'
```

그런 다음 이미지(로컬 또는 원격)에 대해 정의할 수 있습니다.`src`

### 로컬 이미지

로컬 이미지를 사용하려면,, 또는 이미지 파일을 사용합니다.`import``.jpg``.png``.webp`

Next.js 가져온 파일을 기반으로 이미지의 and를 [자동으로 결정](https://nextjs.org/docs/14/app/building-your-application/optimizing/#image-sizing) 합니다. 이러한 값은 `width` `height` [누적 레이아웃 이동](https://nextjs.org/learn/seo/web-performance/cls) 이미지가 로드되는 동안.

앱/page.js

```
import Image from 'next/image'

import profilePic from './me.png'

 

export default function Page() {

  return (

    <Image

      src={profilePic}

      alt="Picture of the author"

      // width={500} automatically provided

      // height={500} automatically provided

      // blurDataURL="data:..." automatically provided

      // placeholder="blur" // Optional blur-up while loading

    />

  )

}
```

> **경고:** 동적 또는 지원되지 *않습니다*. 빌드 시 분석할 수 있도록 정적이어야 합니다.`await import()` `require()` `import`

선택적으로 특정 이미지를 허용하고 다른 모든 이미지를 차단하기 위해 파일에서 구성할 수 있습니다.`localPatterns` `next.config.js`

next.config.js

```
module.exports = {

  images: {

    localPatterns: [

      {

        pathname: '/assets/images/**',

        search: '',

      },

    ],

  },

}
```

### 원격 이미지

원격 이미지를 사용하려면 속성이 URL 문자열이어야 합니다.`src`

Next.js는 빌드 프로세스 중에 원격 파일에 액세스할 수 없으므로 [`width`](https://nextjs.org/docs/14/app/api-reference/components/image#width), [`height`](https://nextjs.org/docs/14/app/api-reference/components/image#height) 및 선택 사항 [`blurDataURL`](https://nextjs.org/docs/14/app/api-reference/components/image#blurdataurl) props를 수동으로 사용합니다.

and 속성은 이미지의 올바른 종횡비를 유추하고 로드되는 이미지에서 레이아웃 이동을 방지하는 데 사용됩니다. 이미지 파일의 렌더링된 크기를 결정 *하지 않습니다*. [이미지 크기 조정](https://nextjs.org/docs/14/app/building-your-application/optimizing/#image-sizing) 에 대해 자세히 알아보세요.`width` `height` `width` `height`

앱/page.js

```
import Image from 'next/image'

 

export default function Page() {

  return (

    <Image

      src="https://s3.amazonaws.com/my-bucket/profile.png"

      alt="Picture of the author"

      width={500}

      height={500}

    />

  )

}
```

이미지 최적화를 안전하게 허용하려면 에서 지원되는 URL 패턴 목록을 정의합니다. 악의적인 사용을 방지하기 위해 가능한 한 구체적으로 작성하십시오. 예를 들어 다음 구성은 특정 AWS S3 버킷의 이미지만 허용합니다.`next.config.js`

next.config.js

```
module.exports = {

  images: {

    remotePatterns: [

      {

        protocol: 'https',

        hostname: 's3.amazonaws.com',

        port: '',

        pathname: '/my-bucket/**',

        search: '',

      },

    ],

  },

}
```

자세히 알아보기 [`remotePatterns`](https://nextjs.org/docs/14/app/api-reference/components/image#remotepatterns) 구성. 이미지에 상대 URL을 사용하려면 `src` [`loader`](https://nextjs.org/docs/14/app/api-reference/components/image#loader).

### 도메인

때로는 원격 이미지를 최적화하고 싶지만 기본 제공 Next.js 이미지 최적화 API를 계속 사용할 수 있습니다. 이렇게 하려면 기본 설정을 그대로 두고 Image prop에 대한 절대 URL을 입력합니다.`loader` `src`

악의적인 사용자로부터 애플리케이션을 보호하려면 구성 요소와 함께 사용할 원격 호스트 이름 목록을 정의해야 합니다.`next/image`

> 자세히 알아보기 [`remotePatterns`](https://nextjs.org/docs/14/app/api-reference/components/image#remotepatterns) 구성.

### 로더

[앞의 예](https://nextjs.org/docs/14/app/building-your-application/optimizing/#local-images) 에서는 로컬 이미지에 대해 부분 URL()이 제공됩니다. 이는 로더 아키텍처 때문에 가능합니다.`"/me.png"`

로더는 이미지의 URL을 생성하는 함수입니다. 제공된 를 수정하고 여러 URL을 생성하여 다양한 크기의 이미지를 요청합니다. 이러한 여러 URL은 자동 `src` [srcset](https://developer.mozilla.org/docs/Web/API/HTMLImageElement/srcset) 생성하여 사이트 방문자에게 뷰포트에 적합한 크기의 이미지가 제공되도록 합니다.

Next.js 애플리케이션의 기본 로더는 내장된 이미지 최적화 API를 사용하여 웹의 어느 곳에서나 이미지를 최적화한 다음 Next.js 웹 서버에서 직접 제공합니다. CDN 또는 이미지 서버에서 직접 이미지를 제공하려면 몇 줄의 JavaScript를 사용하여 자체 로더 함수를 작성할 수 있습니다.

이미지를 사용하여 이미지당 로더를 정의할 수 있습니다. [`loader` 소품](https://nextjs.org/docs/14/app/api-reference/components/image#loader) 또는 애플리케이션 수준에서 [`loaderFile` 구성](https://nextjs.org/docs/14/app/api-reference/components/image#loaderfile).

## 우선권

이미지에 속성을 추가해야 합니다. `priority` [LCP(Largest Contentful Paint) 요소](https://web.dev/lcp/#what-elements-are-considered) 각 페이지에 대해. 이렇게 하면 Next.js 로드할 이미지의 우선 순위를 특별히 지정(예: 사전 로드 태그 또는 우선 순위 힌트를 통해) LCP를 의미 있게 향상시킬 수 있습니다.

LCP 요소는 일반적으로 페이지의 뷰포트 내에 표시되는 가장 큰 이미지 또는 텍스트 블록입니다. 를 실행할 때 LCP 요소가 속성이 없는 경우 콘솔 경고가 표시됩니다.`next dev` `<Image>` `priority`

LCP 이미지를 식별했으면 다음과 같이 속성을 추가할 수 있습니다.

앱/page.js

```
import Image from 'next/image'

import profilePic from '../public/me.png'

 

export default function Page() {

  return <Image src={profilePic} alt="Picture of the author" priority />

}
```

우선 순위에 대한 자세한 내용은 [`next/image` 구성 요소 문서](https://nextjs.org/docs/14/app/api-reference/components/image#priority).

## 이미지 크기 조정

이미지가 성능을 가장 일반적으로 저하시키는 방법 중 하나는 이미지가 로드될 때 페이지의 다른 요소를 푸시하는 레이아웃 *이동* 을 통해서입니다. 이 성능 문제는 사용자에게 너무 성가신 일이므로 자체 Core Web Vital이 있습니다. [누적 레이아웃 이동](https://web.dev/cls/). 이미지 기반 레이아웃 이동을 피하는 방법은 [항상 이미지 크기 조정](https://web.dev/optimize-cls/#images-without-dimensions). 이를 통해 브라우저는 이미지가 로드되기 전에 이미지를 위한 충분한 공간을 정확하게 예약할 수 있습니다.

는 우수한 성능 결과를 보장하도록 설계되었기 때문에 레이아웃 이동에 기여하는 방식으로 사용할 수 없으며 다음 세 가지 방법 중 하나로 크기를 조정 **해야 합니다**.`next/image`

1. [정적 가져오기](https://nextjs.org/docs/14/app/building-your-application/optimizing/#local-images) 를 사용하여 자동으로
2. 명시적으로 [`width`](https://nextjs.org/docs/14/app/api-reference/components/image#width) 그리고 [`height`](https://nextjs.org/docs/14/app/api-reference/components/image#height) 재산
3. 암시적으로 [fill](https://nextjs.org/docs/14/app/api-reference/components/image#fill) 을 사용하여 이미지가 상위 요소를 채우도록 확장됩니다.

> **내 이미지의 크기를 모르면 어떻게 합니까?**
> 
> 이미지 크기를 알지 못한 채 소스의 이미지에 액세스하는 경우 다음과 같은 몇 가지 작업을 수행할 수 있습니다.
> 
> **쓰다 `fill`**
> 
> 이 [`fill`](https://nextjs.org/docs/14/app/api-reference/components/image#fill) prop을 사용하면 이미지 크기를 부모 요소로 조정할 수 있습니다. CSS를 사용하여 페이지에 이미지의 상위 요소 공간을 제공하는 것을 고려하십시오. [`sizes`](https://nextjs.org/docs/14/app/api-reference/components/image#sizes) prop을 사용하여 모든 미디어 쿼리 중단점과 일치시킵니다. 당신은 또한 사용할 수 있습니다 [`object-fit`](https://developer.mozilla.org/docs/Web/CSS/object-fit),, 또는, 및 `fill` `contain` `cover` [`object-position`](https://developer.mozilla.org/docs/Web/CSS/object-position) 이미지를 사용하여 이미지가 해당 공간을 차지하는 방법을 정의합니다.
> 
> **이미지 정규화**
> 
> 제어하는 원본에서 이미지를 제공하는 경우 이미지를 특정 크기로 정규화하도록 이미지 파이프라인을 수정하는 것이 좋습니다.
> 
> **API 호출 수정**
> 
> 애플리케이션이 API 호출(예: CMS)을 사용하여 이미지 URL을 검색하는 경우 API 호출을 수정하여 URL과 함께 이미지 크기를 반환할 수 있습니다.

제안된 방법 중 어느 것도 이미지 크기를 조정하는 데 효과가 없는 경우 구성 요소는 표준 요소와 함께 페이지에서 잘 작동하도록 설계되었습니다.`next/image` `<img>`

## 스타일링

이미지 구성 요소 스타일 지정은 일반 요소 스타일 지정과 유사하지만 명심해야 할 몇 가지 지침이 있습니다.`<img>`

- Use or , not .`className` `style` `styled-jsx`
	- In most cases, we recommend using the prop. This can be an imported [CSS Module](https://nextjs.org/docs/14/app/building-your-application/styling/css-modules), a [global stylesheet](https://nextjs.org/docs/14/app/building-your-application/styling/css-modules#global-styles), etc.`className`
	- You can also use the prop to assign inline styles.`style`
	- You cannot use [styled-jsx](https://nextjs.org/docs/14/app/building-your-application/styling/css-in-js) because it's scoped to the current component (unless you mark the style as ).`global`
- When using , the parent element must have `fill` `position: relative`
	- This is necessary for the proper rendering of the image element in that layout mode.
- When using , the parent element must have `fill` `display: block`
	- This is the default for elements but should be specified otherwise.`<div>`

## Examples

### Responsive

![Responsive image filling the width and height of its parent container](https://nextjs.org/_next/image?url=https%3A%2F%2Fh8DxKfmAPhn8O0p3.public.blob.vercel-storage.com%2Fdocs%2Flight%2Fresponsive-image.png&w=1920&q=75)

Responsive image filling the width and height of its parent container

```
import Image from 'next/image'

import mountains from '../public/mountains.jpg'

 

export default function Responsive() {

  return (

    <div style={{ display: 'flex', flexDirection: 'column' }}>

      <Image

        alt="Mountains"

        // Importing an image will

        // automatically set the width and height

        src={mountains}

        sizes="100vw"

        // Make the image display full width

        style={{

          width: '100%',

          height: 'auto',

        }}

      />

    </div>

  )

}
```

### Fill Container

![Grid of images filling parent container width](https://nextjs.org/_next/image?url=https%3A%2F%2Fh8DxKfmAPhn8O0p3.public.blob.vercel-storage.com%2Fdocs%2Flight%2Ffill-container.png&w=1920&q=75)

Grid of images filling parent container width

```
import Image from 'next/image'

import mountains from '../public/mountains.jpg'

 

export default function Fill() {

  return (

    <div

      style={{

        display: 'grid',

        gridGap: '8px',

        gridTemplateColumns: 'repeat(auto-fit, minmax(400px, auto))',

      }}

    >

      <div style={{ position: 'relative', height: '400px' }}>

        <Image

          alt="Mountains"

          src={mountains}

          fill

          sizes="(min-width: 808px) 50vw, 100vw"

          style={{

            objectFit: 'cover', // cover, contain, none

          }}

        />

      </div>

      {/* And more images in the grid... */}

    </div>

  )

}
```

### Background Image

![Background image taking full width and height of page](https://nextjs.org/_next/image?url=https%3A%2F%2Fh8DxKfmAPhn8O0p3.public.blob.vercel-storage.com%2Fdocs%2Flight%2Fbackground-image.png&w=1920&q=75)

Background image taking full width and height of page

```
import Image from 'next/image'

import mountains from '../public/mountains.jpg'

 

export default function Background() {

  return (

    <Image

      alt="Mountains"

      src={mountains}

      placeholder="blur"

      quality={100}

      fill

      sizes="100vw"

      style={{

        objectFit: 'cover',

      }}

    />

  )

}
```

For examples of the Image component used with the various styles, see the [Image Component Demo](https://image-component.nextjs.gallery/).

## Other Properties

[**View all properties available to the component.`next/image`**](https://nextjs.org/docs/14/app/api-reference/components/image)

## Configuration

The component and Next.js Image Optimization API can be configured in the `next/image` [`next.config.js` file](https://nextjs.org/docs/14/app/api-reference/next-config-js). These configurations allow you to [enable remote images](https://nextjs.org/docs/14/app/api-reference/components/image#remotepatterns), [define custom image breakpoints](https://nextjs.org/docs/14/app/api-reference/components/image#devicesizes), [change caching behavior](https://nextjs.org/docs/14/app/api-reference/components/image#caching-behavior) and more.

[**Read the full image configuration documentation for more information.**](https://nextjs.org/docs/14/app/api-reference/components/image#configuration-options)

## API 참조

next/image API에 대해 자세히 알아보세요.[소개](https://nextjs.org/docs/14/app/api-reference/components/image)

[...](https://nextjs.org/docs/14/app/api-reference/components/image)

[구성 요소](https://nextjs.org/docs/14/app/api-reference/components/image)

<이미지>

내장된 'next/image' 구성 요소를 사용하여 Next.js 애플리케이션에서 이미지를 최적화합니다.

[View original](https://nextjs.org/docs/14/app/api-reference/components/image)