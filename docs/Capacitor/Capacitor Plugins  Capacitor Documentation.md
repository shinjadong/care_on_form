---
title: "Capacitor 공식 플러그인 완전 가이드"
source: "https://capacitorjs.com/docs/apis"
author: "Capacitor 팀"
published:
created: 2025-09-24
description: "Capacitor 팀이 공식 지원하는 네이티브 API 플러그인 완전 목록과 사용 가이드"
tags:
  - "clippings"
  - "capacitor"
  - "공식플러그인"
  - "네이티브API"
  - "모바일개발"
  - "크로스플랫폼"
---

# Capacitor 공식 플러그인 완전 가이드
**버전: v7**

공식 플러그인은 Capacitor 팀이 유지관리하는 플러그인 세트로, 일반적으로 사용되는 네이티브 API에 대한 접근을 제공합니다.

이 플러그인들에 대한 API 문서는 아래에서 확인할 수 있습니다.

---

## 🏆 공식 플러그인 전체 목록

### 📱 사용자 인터페이스 & 상호작용

#### 🎭 액션 & 대화창
| 플러그인 | 용도 | 사용 예시 | 중요도 |
|---------|------|----------|--------|
| **[Action Sheet](https://capacitorjs.com/docs/apis/action-sheet)** | 네이티브 액션 시트 표시 | 옵션 선택, 메뉴 표시 | ⭐⭐⭐⭐ |
| **[Dialog](https://capacitorjs.com/docs/apis/dialog)** | 네이티브 대화상자 표시 | 확인/취소, 알림 메시지 | ⭐⭐⭐⭐⭐ |
| **[Toast](https://capacitorjs.com/docs/apis/toast)** | 간단한 토스트 메시지 | 성공/오류 피드백 | ⭐⭐⭐⭐ |

```typescript
// Action Sheet 사용 예시
import { ActionSheet } from '@capacitor/action-sheet';

const showActionSheet = async () => {
  const result = await ActionSheet.showActions({
    title: '옵션 선택',
    message: '원하는 작업을 선택해주세요',
    options: [
      { title: '갤러리에서 선택' },
      { title: '카메라로 촬영' },
      { title: '취소', style: 'cancel' }
    ]
  });
};
```

#### 🎨 화면 제어 & 표시
| 플러그인 | 용도 | 사용 예시 | 중요도 |
|---------|------|----------|--------|
| **[Status Bar](https://capacitorjs.com/docs/apis/status-bar)** | 상태바 스타일 제어 | 색상, 투명도 설정 | ⭐⭐⭐⭐⭐ |
| **[Splash Screen](https://capacitorjs.com/docs/apis/splash-screen)** | 스플래시 화면 제어 | 앱 시작 화면 관리 | ⭐⭐⭐⭐ |
| **[Screen Orientation](https://capacitorjs.com/docs/apis/screen-orientation)** | 화면 회전 제어 | 세로/가로 모드 고정 | ⭐⭐⭐ |
| **[Privacy Screen](https://capacitorjs.com/docs/apis/privacy-screen)** | 프라이버시 스크린 | 앱 전환 시 화면 보호 | ⭐⭐ |
| **[Text Zoom](https://capacitorjs.com/docs/apis/text-zoom)** | 텍스트 확대/축소 | 접근성 향상 | ⭐⭐ |

---

### 📷 미디어 & 센서

#### 📸 카메라 & 미디어
| 플러그인 | 용도 | 사용 예시 | 중요도 |
|---------|------|----------|--------|
| **[Camera](https://capacitorjs.com/docs/apis/camera)** | 카메라 접근, 사진 촬영 | 프로필 사진, 이미지 업로드 | ⭐⭐⭐⭐⭐ |
| **[Barcode Scanner](https://capacitorjs.com/docs/apis/barcode-scanner)** | QR/바코드 스캔 | 결제, 제품 정보 스캔 | ⭐⭐⭐⭐ |

```typescript
// Camera 사용 예시
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

const takePicture = async () => {
  const photo = await Camera.getPhoto({
    resultType: CameraResultType.Uri,
    source: CameraSource.Camera,
    quality: 90
  });
  
  console.log('사진 경로:', photo.webPath);
};
```

#### 🎯 위치 & 모션
| 플러그인 | 용도 | 사용 예시 | 중요도 |
|---------|------|----------|--------|
| **[Geolocation](https://capacitorjs.com/docs/apis/geolocation)** | GPS 위치 정보 | 지도 앱, 위치 기반 서비스 | ⭐⭐⭐⭐⭐ |
| **[Motion](https://capacitorjs.com/docs/apis/motion)** | 가속도계, 자이로스코프 | 게임, 피트니스 앱 | ⭐⭐⭐ |
| **[Haptics](https://capacitorjs.com/docs/apis/haptics)** | 햅틱 피드백 (진동) | 터치 피드백, 알림 | ⭐⭐⭐⭐ |

---

### 💾 데이터 & 저장소

#### 📁 파일 시스템
| 플러그인 | 용도 | 사용 예시 | 중요도 |
|---------|------|----------|--------|
| **[Filesystem](https://capacitorjs.com/docs/apis/filesystem)** | 파일 시스템 접근 | 파일 저장, 읽기, 삭제 | ⭐⭐⭐⭐⭐ |
| **[File Transfer](https://capacitorjs.com/docs/apis/file-transfer)** | 파일 업로드/다운로드 | 대용량 파일 전송 | ⭐⭐⭐ |
| **[File Viewer](https://capacitorjs.com/docs/apis/file-viewer)** | 파일 뷰어 | PDF, 문서 파일 보기 | ⭐⭐⭐ |

```typescript
// Filesystem 사용 예시
import { Filesystem, Directory } from '@capacitor/filesystem';

const saveFile = async () => {
  await Filesystem.writeFile({
    path: 'my-file.txt',
    data: '안녕하세요, Capacitor!',
    directory: Directory.Documents
  });
  
  console.log('파일이 저장되었습니다!');
};
```

#### 🗄️ 데이터 저장
| 플러그인 | 용도 | 사용 예시 | 중요도 |
|---------|------|----------|--------|
| **[Preferences](https://capacitorjs.com/docs/apis/preferences)** | 키-값 저장소 | 사용자 설정, 앱 상태 | ⭐⭐⭐⭐⭐ |
| **[Clipboard](https://capacitorjs.com/docs/apis/clipboard)** | 클립보드 접근 | 텍스트 복사/붙여넣기 | ⭐⭐⭐ |
| **[Cookies](https://capacitorjs.com/docs/apis/cookies)** | 쿠키 관리 | 웹뷰 쿠키 제어 | ⭐⭐ |

---

### 🌐 네트워크 & 통신

#### 📡 네트워크 & HTTP
| 플러그인 | 용도 | 사용 예시 | 중요도 |
|---------|------|----------|--------|
| **[Http](https://capacitorjs.com/docs/apis/http)** | 네이티브 HTTP 요청 | API 호출, 파일 다운로드 | ⭐⭐⭐⭐⭐ |
| **[Network](https://capacitorjs.com/docs/apis/network)** | 네트워크 상태 감지 | 온라인/오프라인 상태 | ⭐⭐⭐⭐ |

```typescript
// Http 사용 예시
import { Http } from '@capacitor/http';

const fetchData = async () => {
  const response = await Http.request({
    method: 'GET',
    url: 'https://api.example.com/data',
    headers: {
      'Content-Type': 'application/json'
    }
  });
  
  console.log('응답 데이터:', response.data);
};
```

#### 🔔 알림
| 플러그인 | 용도 | 사용 예시 | 중요도 |
|---------|------|----------|--------|
| **[Push Notifications](https://capacitorjs.com/docs/apis/push-notifications)** | 푸시 알림 | 실시간 메시지, 업데이트 알림 | ⭐⭐⭐⭐⭐ |
| **[Local Notifications](https://capacitorjs.com/docs/apis/local-notifications)** | 로컬 알림 | 리마인더, 스케줄 알림 | ⭐⭐⭐⭐ |

---

### 🔧 시스템 & 하드웨어

#### 📱 앱 & 디바이스 관리
| 플러그인 | 용도 | 사용 예시 | 중요도 |
|---------|------|----------|--------|
| **[App](https://capacitorjs.com/docs/apis/app)** | 앱 상태 관리 | 백그라운드/포그라운드 이벤트 | ⭐⭐⭐⭐⭐ |
| **[Device](https://capacitorjs.com/docs/apis/device)** | 디바이스 정보 | 모델, OS, 배터리 정보 | ⭐⭐⭐⭐ |
| **[App Launcher](https://capacitorjs.com/docs/apis/app-launcher)** | 외부 앱 실행 | 다른 앱 열기, URL 스킴 | ⭐⭐⭐ |

```typescript
// Device 정보 가져오기
import { Device } from '@capacitor/device';

const getDeviceInfo = async () => {
  const info = await Device.getInfo();
  
  console.log('디바이스 모델:', info.model);
  console.log('운영체제:', info.operatingSystem);
  console.log('앱 버전:', info.appVersion);
};
```

#### ⌨️ 입력 & 상호작용
| 플러그인 | 용도 | 사용 예시 | 중요도 |
|---------|------|----------|--------|
| **[Keyboard](https://capacitorjs.com/docs/apis/keyboard)** | 키보드 제어 | 키보드 표시/숨김, 높이 감지 | ⭐⭐⭐⭐ |
| **[Share](https://capacitorjs.com/docs/apis/share)** | 네이티브 공유 | 텍스트, 이미지, URL 공유 | ⭐⭐⭐⭐ |

---

### 🌐 웹 & 브라우저

#### 🔗 웹 브라우징
| 플러그인 | 용도 | 사용 예시 | 중요도 |
|---------|------|----------|--------|
| **[Browser](https://capacitorjs.com/docs/apis/browser)** | 인앱 브라우저 | 웹페이지를 앱 내에서 열기 | ⭐⭐⭐⭐ |
| **[InAppBrowser](https://capacitorjs.com/docs/apis/inappbrowser)** | 고급 인앱 브라우저 | OAuth, 결제 페이지 | ⭐⭐⭐ |

```typescript
// Browser 사용 예시
import { Browser } from '@capacitor/browser';

const openWebsite = async () => {
  await Browser.open({
    url: 'https://capacitorjs.com',
    presentationStyle: 'popover'
  });
};
```

---

### 🔬 고급 기능 & 실험적 기능

#### 🚀 고급 기능
| 플러그인 | 용도 | 사용 예시 | 상태 |
|---------|------|----------|------|
| **[Background Runner](https://capacitorjs.com/docs/apis/background-runner)** | 백그라운드 작업 실행 | 데이터 동기화, 백그라운드 처리 | 🟢 안정 |
| **[Google Maps](https://capacitorjs.com/docs/apis/google-maps)** | 구글 맵 통합 | 지도 표시, 마커, 경로 | 🟢 안정 |

#### 🧪 실험적 기능
| 플러그인 | 용도 | 사용 예시 | 상태 |
|---------|------|----------|------|
| **[Watch 🧪](https://capacitorjs.com/docs/apis/watch)** | Apple Watch 통합 | 워치 앱 데이터 통신 | 🟡 실험적 |

#### ♿ 접근성
| 플러그인 | 용도 | 사용 예시 | 중요도 |
|---------|------|----------|--------|
| **[Screen Reader](https://capacitorjs.com/docs/apis/screen-reader)** | 스크린 리더 지원 | 시각 장애인 지원 | ⭐⭐⭐ |

---

## 📦 플러그인 설치 가이드

### 🚀 빠른 설치

#### 1️⃣ 필수 플러그인 한번에 설치
```bash
# 가장 많이 사용되는 핵심 플러그인들
npm install @capacitor/camera @capacitor/geolocation @capacitor/filesystem @capacitor/preferences @capacitor/http @capacitor/push-notifications

# 네이티브 프로젝트 동기화
npx cap sync
```

#### 2️⃣ UI/UX 관련 플러그인
```bash
# 사용자 인터페이스 관련
npm install @capacitor/action-sheet @capacitor/dialog @capacitor/status-bar @capacitor/splash-screen

npx cap sync
```

#### 3️⃣ 시스템 관련 플러그인
```bash
# 앱 상태 및 디바이스 관리
npm install @capacitor/app @capacitor/device @capacitor/network @capacitor/keyboard

npx cap sync
```

---

## 🎯 사용 시나리오별 추천 플러그인

### 📱 소셜 미디어 앱
```bash
npm install @capacitor/camera @capacitor/share @capacitor/filesystem @capacitor/push-notifications
```
- **Camera**: 사진/비디오 촬영
- **Share**: 콘텐츠 공유
- **Filesystem**: 미디어 파일 저장
- **Push Notifications**: 실시간 알림

### 🛒 전자상거래 앱
```bash
npm install @capacitor/barcode-scanner @capacitor/browser @capacitor/push-notifications @capacitor/preferences
```
- **Barcode Scanner**: 제품 스캔
- **Browser**: 결제 페이지
- **Push Notifications**: 주문 알림
- **Preferences**: 사용자 설정

### 📍 위치 기반 앱
```bash
npm install @capacitor/geolocation @capacitor/google-maps @capacitor/network @capacitor/background-runner
```
- **Geolocation**: GPS 위치 추적
- **Google Maps**: 지도 표시
- **Network**: 연결 상태 확인
- **Background Runner**: 위치 백그라운드 업데이트

### 💬 메신저 앱
```bash
npm install @capacitor/push-notifications @capacitor/local-notifications @capacitor/filesystem @capacitor/clipboard
```
- **Push Notifications**: 메시지 알림
- **Local Notifications**: 로컬 리마인더
- **Filesystem**: 첨부 파일 저장
- **Clipboard**: 텍스트 복사/붙여넣기

---

## 🛠 개발자 리소스

### 📚 공식 문서 및 소스코드
- **[GitHub 저장소](https://github.com/ionic-team/capacitor-plugins)** - 모든 공식 플러그인의 소스코드
- **[API 문서](https://capacitorjs.com/docs/apis)** - 상세한 API 레퍼런스
- **[예제 프로젝트](https://github.com/ionic-team/capacitor-plugins/tree/main/example)** - 실제 사용 예시

### 🔧 개발 도구
```typescript
// 플러그인 사용 가능 여부 확인
import { Capacitor } from '@capacitor/core';

if (Capacitor.isPluginAvailable('Camera')) {
  // 카메라 플러그인 사용 가능
  console.log('카메라 플러그인을 사용할 수 있습니다');
}

// 플랫폼별 분기 처리
if (Capacitor.getPlatform() === 'ios') {
  // iOS 전용 코드
} else if (Capacitor.getPlatform() === 'android') {
  // Android 전용 코드
}
```

---

## 📈 플러그인 선택 가이드

### ⭐ 중요도별 분류

#### 🔴 필수 (거의 모든 앱)
- **App**: 앱 생명주기 관리
- **Device**: 디바이스 정보
- **Status Bar**: 상태바 제어
- **Preferences**: 데이터 저장

#### 🟡 매우 중요 (대부분 앱)
- **Camera**: 이미지 기능
- **Http**: 네트워크 통신
- **Push Notifications**: 사용자 참여
- **Dialog**: 사용자 피드백

#### 🟢 중요 (특정 기능)
- **Geolocation**: 위치 기반 서비스
- **Filesystem**: 파일 관리
- **Share**: 소셜 기능
- **Network**: 연결 상태 관리

#### ⚪ 선택적 (특수 용도)
- **Barcode Scanner**: 스캔 기능
- **Google Maps**: 지도 서비스
- **Haptics**: 터치 피드백
- **Background Runner**: 백그라운드 작업

---

## 🎉 마무리

Capacitor 공식 플러그인들은 네이티브 앱 개발의 복잡성을 크게 줄여주는 강력한 도구들입니다. 

### 🚀 다음 단계
1. **필요한 플러그인 식별**: 앱 기능에 맞는 플러그인 선택
2. **점진적 도입**: 핵심 기능부터 시작하여 점진적으로 확장
3. **문서 숙지**: 각 플러그인의 상세 문서 확인
4. **테스트**: 실제 디바이스에서 충분한 테스트

이제 이 강력한 플러그인들을 활용하여 놀라운 크로스 플랫폼 앱을 만들어보세요! 🎯