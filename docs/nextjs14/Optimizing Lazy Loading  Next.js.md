---
title: "Optimizing: Lazy Loading | Next.js"
source: "https://nextjs.org/docs/14/app/building-your-application/optimizing/lazy-loading"
author:
  - "[[Vercel]]"
published:
created: 2025-09-16
description: "Lazy load imported libraries and React Components to improve your application's loading performance."
tags:
  - "clippings"
---
## 지연 로딩

[지연 로딩](https://developer.mozilla.org/docs/Web/Performance/Lazy_loading) Next.js 경로를 렌더링하는 데 필요한 JavaScript의 양을 줄여 애플리케이션의 초기 로딩 성능을 향상시키는 데 도움이 됩니다.

이를 통해 **클라이언트 구성 요소** 및 가져온 라이브러리의 로드를 연기하고 필요할 때만 클라이언트 번들에 포함할 수 있습니다. 예를 들어 사용자가 클릭하여 열 때까지 모달 로드를 연기할 수 있습니다.

Next.js에서 지연 로딩을 구현할 수 있는 두 가지 방법이 있습니다.

1. 동적 [가져오기](https://nextjs.org/docs/14/app/building-your-application/optimizing/#nextdynamic) 사용 `next/dynamic`
2. 사용 [`React.lazy()`](https://react.dev/reference/react/lazy) 와 [서 스 펜스](https://react.dev/reference/react/Suspense)

기본적으로 서버 구성 요소는 자동으로 [코드 분할](https://developer.mozilla.org/docs/Glossary/Code_splitting) 를 사용하여 [서버에서](https://nextjs.org/docs/14/app/building-your-application/routing/loading-ui-and-streaming) 클라이언트로 UI 조각을 점진적으로 보낼 수 있습니다. 지연 로딩은 클라이언트 구성 요소에 적용됩니다.

## next/dynamic

`next/dynamic` 의 합성물입니다. [`React.lazy()`](https://react.dev/reference/react/lazy) 그리고 [서 스 펜스](https://react.dev/reference/react/Suspense). 증분 마이그레이션을 허용하기 위해 및 디렉터리에서 동일한 방식으로 동작합니다.`app` `pages`

## 예제

### 클라이언트 구성 요소 가져오기

앱/page.js

```
'use client'

 

import { useState } from 'react'

import dynamic from 'next/dynamic'

 

// Client Components:

const ComponentA = dynamic(() => import('../components/A'))

const ComponentB = dynamic(() => import('../components/B'))

const ComponentC = dynamic(() => import('../components/C'), { ssr: false })

 

export default function ClientComponentExample() {

  const [showMore, setShowMore] = useState(false)

 

  return (

    <div>

      {/* Load immediately, but in a separate client bundle */}

      <ComponentA />

 

      {/* Load on demand, only when/if the condition is met */}

      {showMore && <ComponentB />}

      <button onClick={() => setShowMore(!showMore)}>Toggle</button>

 

      {/* Load only on the client side */}

      <ComponentC />

    </div>

  )

}
```

### SSR 건너뛰기

및 Suspense를 사용할 때 클라이언트 컴포넌트는 기본적으로 사전 렌더링(SSR)됩니다.`React.lazy()`

클라이언트 구성 요소에 대한 사전 렌더링을 비활성화하려면 다음으로 설정된 옵션을 사용할 수 있습니다.`ssr` `false`

```
const ComponentC = dynamic(() => import('../components/C'), { ssr: false })
```

### 서버 구성 요소 가져오기

서버 컴포넌트를 동적으로 임포트하는 경우, 서버 컴포넌트 자체가 아닌 서버 컴포넌트의 자손인 클라이언트 컴포넌트만 지연 로드됩니다.

앱/page.js

```
import dynamic from 'next/dynamic'

 

// Server Component:

const ServerComponent = dynamic(() => import('../components/ServerComponent'))

 

export default function ServerComponentExample() {

  return (

    <div>

      <ServerComponent />

    </div>

  )

}
```

외부 라이브러리는 다음을 사용하여 요청 시 로드할 수 있습니다. [`import()`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Operators/import) 기능. 이 예제에서는 퍼지 검색에 외부 라이브러리를 사용합니다. 모듈은 사용자가 검색 입력을 입력한 후에만 클라이언트에 로드됩니다.`fuse.js`

앱/page.js

```
'use client'

 

import { useState } from 'react'

 

const names = ['Tim', 'Joe', 'Bel', 'Lee']

 

export default function Page() {

  const [results, setResults] = useState()

 

  return (

    <div>

      <input

        type="text"

        placeholder="Search"

        onChange={async (e) => {

          const { value } = e.currentTarget

          // Dynamically load fuse.js

          const Fuse = (await import('fuse.js')).default

          const fuse = new Fuse(names)

 

          setResults(fuse.search(value))

        }}

      />

      <pre>Results: {JSON.stringify(results, null, 2)}</pre>

    </div>

  )

}
```

앱/page.js

```
import dynamic from 'next/dynamic'

 

const WithCustomLoading = dynamic(

  () => import('../components/WithCustomLoading'),

  {

    loading: () => <p>Loading...</p>,

  }

)

 

export default function Page() {

  return (

    <div>

      {/* The loading component will be rendered while  <WithCustomLoading/> is loading */}

      <WithCustomLoading />

    </div>

  )

}
```

### Importing Named Exports

To dynamically import a named export, you can return it from the Promise returned by [`import()`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Operators/import) function:

components/hello.js

```
'use client'

 

export function Hello() {

  return <p>Hello!</p>

}
```

앱/page.js

```
import dynamic from 'next/dynamic'

 

const ClientComponent = dynamic(() =>

  import('../components/hello').then((mod) => mod.Hello)

)
```