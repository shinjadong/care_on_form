---
title: "Capacitor by Ionic - 웹 기술로 크로스 플랫폼 앱 개발"
source: "https://capacitorjs.com/"
author:
  - "[[Capacitor]]"
published:
created: 2025-09-24
description: "HTML, CSS, JavaScript로 iOS, Android, Progressive Web App을 구축하세요"
tags:
  - "clippings"
  - "크로스플랫폼"
  - "모바일앱"
  - "웹개발"
---

## 웹 앱을 위한 크로스 플랫폼 네이티브 런타임

Capacitor는 Web Native 앱을 구축하기 위한 오픈 소스 네이티브 런타임입니다. JavaScript, HTML, CSS를 사용하여 크로스 플랫폼 iOS, Android, Progressive Web App을 만들 수 있습니다.

[Capacitor 설치하기 →](https://capacitorjs.com/docs/getting-started) [플러그인 탐색](https://capacitorjs.com/docs/plugins)

[Cordova에서 마이그레이션 →](https://capacitorjs.com/cordova)

![multi layered phone](https://capacitorjs.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ftop-0.4b4e40aa.png&w=1200&q=75)

### 주요 기능 코드 예제

#### 1. 로컬 알림 (Local Notifications)
```typescript
import { LocalNotifications } from '@capacitor/local-notifications';

// 로컬 알림 예약하기
LocalNotifications.schedule({
  notifications: [
    {
      title: "할인 중",
      body: "위젯이 10% 할인 중입니다. 서둘러 주세요!",
      id: 1,
      schedule: { at: new Date(Date.now() + 1000 * 5) }, // 5초 후
      sound: null,
      attachments: null,
      actionTypeId: "",
      extra: null
    }
  ]
});
```

#### 2. 위치 정보 (Geolocation)
```typescript
import { Geolocation } from '@capacitor/geolocation';

// 사용자의 현재 위치 가져오기
const position = await Geolocation.getCurrentPosition();

// 위도와 경도 추출
const latitude = position.coords.latitude;
const longitude = position.coords.longitude;
```

#### 3. 카메라 기능 (Camera)
```typescript
import { Camera, CameraResultType } from '@capacitor/camera';

// 사진 촬영하거나 갤러리에서 선택
const picture = await Camera.getPicture({
  resultType: CameraResultType.Uri
});
```

#### 4. 커스텀 네이티브 플러그인 (iOS Swift)
```swift
import Foundation
import Capacitor

// 커스텀 플랫폼 코드 - Capacitor 플러그인 API를 통해 
// 웹 앱에 쉽게 노출 가능합니다. iOS, Android, 웹에서 
// 동작하는 API를 구축하세요!
@objc(MyAwesomePlugin)
public class MyAwesomePlugin: CAPPlugin {

  @objc public func doNative(_ call: CAPPluginCall) {
  let alert = UIAlertController(title: "제목", message: "옵션을 선택해주세요", preferredStyle: .actionSheet)

  // ....
  }
}
```

## 핵심 특징

### 🔥 네이티브 접근
![Cube with sphere inside icon](https://capacitorjs.com/_next/image?url=https%3A%2F%2Fimages.prismic.io%2Fionicframeworkcom%2F98f4ff08-7ae1-4284-b0d9-1ad7a765e29e_capacitor-homepage-native-1%25402x.png&w=64&q=75)

각 플랫폼의 전체 Native SDK에 접근하고, App Store와 웹에 쉽게 배포할 수 있습니다.

### 📱 네이티브 PWA
![Tripe phone stack layered icon](https://capacitorjs.com/_next/image?url=https%3A%2F%2Fimages.prismic.io%2Fionicframeworkcom%2Fbd588d01-ec62-43c8-8bb9-68ddc3eeb792_capacitor-homepage-native-2%25402x.png&w=64&q=75)

간단한 Plugin API로 커스텀 네이티브 기능을 추가하거나, 호환성 레이어를 통해 기존 Cordova 플러그인을 사용할 수 있습니다.

## 개발자들의 후기

### Austin Howard (@a_howard8)
> "Capacitor 정말 마음에 들어요 👀"

### Angular (@angular)
> "[@capacitorjs](https://twitter.com/capacitorjs)가 [#Angular](https://twitter.com/search?q=%23Angular&src=typeahead_click) 앱에 모바일 API 접근 권한과 앱 스토어 입점 기능을 제공하는 방법을 알고 계셨나요?"

### scriptkitty (@thr0wsException)
> "솔직히 정말 기대되네요. 지금까지 본 것으로는 웹 기술을 크로스 플랫폼 앱 개발의 대표적인 방법으로 자리 잡게 하는 또 다른 큰 발걸음이 될 것 같아요 ♥"

### Adeniyi Tolulope (@tolutronics)
> "[@capacitorjs](https://twitter.com/capacitorjs)는 올해 실시간 업데이트와 함께 훌륭한 동반자였습니다..."

### Guillermo Rauch (@rauchg)
> "이것이 [@vercel](https://twitter.com/vercel) Next.js + [@tailwindcss](https://twitter.com/tailwindcss) + [@capacitorjs](https://twitter.com/capacitorjs) 조합이라니 놀랍네요 🤯"

### Carlos Martinez (@cmartineztech)
> "네, 작동합니다 😱 iOS에서 딥링킹과 구글 네이티브 인증 [@capacitorjs](https://twitter.com/capacitorjs)"

### Greg Marine (@gregmarine)
> "Capacitor의 좋은 점 중 하나는 Ionic을 사용할 필요가 없다는 것입니다. 개인적으로 Ionic을 좋아하고 UI 컴포넌트로 사용하지만, Capacitor에는 필수가 아닙니다 😊"

### Jacob Clark (@imjacobclark)
> "[@BBC](https://twitter.com/bbc)에서 4개의 어린이 앱을 구축할 때 Capacitor를 어떻게 사용하는지에 대해 블로그에 작성했습니다"

### Dayana Jabif (@dayujabif)
> "[@Ionicframework](https://twitter.com/Ionicframework) 앱을 [@capacitorjs](https://twitter.com/capacitorjs)를 사용해 네이티브 iOS 앱으로 바꾸는 것이 얼마나 쉬운지 아직도 믿을 수 없어요 🤯"

### Leo (@creativiii)
> "React Native을 시도해봤지만 웹 개발에서 온 입장에서 개발 경험이 너무 아쉬워요. 앱을 만든다면 [@capacitorjs](https://twitter.com/capacitorjs)를 한번 시도해보세요 👀"

### Tim S (@tdawgpharaoh)
> "최근까지 [@capacitorjs](https://twitter.com/capacitorjs)에 대해 듣지 못했던 것이 의아해요. 정말 좋네요."

### Daniel Rodrigues (@inspire_rd)
> "안정화되자마자 [@capacitorjs](https://twitter.com/capacitorjs)를 시도해봤는데 - 놀라워요! 간단하고 직관적입니다."

---

## 커뮤니티 참여

👋 **Capacitor 커뮤니티가 성장하고 있습니다. 저희와 연결하고 인사해보세요.**

### 관련 링크
- [공식 문서](https://capacitorjs.com/docs)
- [GitHub 저장소](https://github.com/ionic-team/capacitor)
- [커뮤니티 포럼](https://forum.ionicframework.com/)
- [Discord](https://ionic.link/discord)