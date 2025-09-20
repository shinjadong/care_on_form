---
title: "Styling: Sass | Next.js"
source: "https://nextjs.org/docs/14/app/building-your-application/styling/sass"
author:
  - "[[Vercel]]"
published:
created: 2025-09-16
description: "Style your Next.js application using Sass."
tags:
  - "clippings"
---
[애플리케이션 빌드](https://nextjs.org/docs/14/app/building-your-application) [스타일링](https://nextjs.org/docs/14/app/building-your-application/styling) 사스

## 사스

Next.js에는 및 확장을 모두 사용하여 패키지를 설치한 후 Sass와 통합하기 위한 기본 제공 지원이 있습니다. CSS 모듈 및 또는 확장을 통해 구성 요소 수준 Sass를 사용할 수 있습니다.`.scss``.sass``.module.scss``.module.sass`

먼저 설치 [`sass`](https://github.com/sass/sass):

터미널

```
npm install --save-dev sass
```

> **알아 둘만 한**:
> 
> Sass 지원 [두 가지 다른 구문](https://sass-lang.com/documentation/syntax), 각각 고유한 확장자가 있습니다. 확장을 사용하려면 `.scss` [SCSS 구문](https://sass-lang.com/documentation/syntax#scss), 확장을 사용하려면 `.sass` [들여쓰기된 구문("Sass")](https://sass-lang.com/documentation/syntax#the-indented-syntax).
> 
> 어떤 것을 선택해야 할지 잘 모르겠다면 CSS의 상위 집합인 확장으로 시작하고 들여쓰기된 구문("Sass").`.scss`

### Sass 옵션 사용자 정의

Sass 컴파일러를 구성하려면 에서.`sassOptions` `next.config.js`

next.config.js

```
const path = require('path')

 

module.exports = {

  sassOptions: {

    includePaths: [path.join(__dirname, 'styles')],

  },

}
```

### Sass 변수

Next.js CSS 모듈 파일에서 내보낸 Sass 변수를 지원합니다.

예를 들어, 내보낸 Sass 변수를 사용합니다.`primaryColor`

app/variables.module.scss

```
$primary-color: #64ff00;

 

:export {

  primaryColor: $primary-color;

}
```

앱/page.js

```
// maps to root \`/\` URL

 

import variables from './variables.module.scss'

 

export default function Page() {

  return <h1 style={{ color: variables.primaryColor }}>Hello, Next.js!</h1>

}
```

도움이 되었나요?