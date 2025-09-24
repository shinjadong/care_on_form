---
title: "Capacitor 커뮤니티 플러그인 완전 가이드 - 62개 플러그인 총정리"
source: "https://capacitorjs.com/docs/plugins/community"
author: "Capacitor Community 팀 + Capawesome 팀"
published:
created: 2025-09-24
description: "Capacitor Community와 Capawesome에서 제공하는 모든 커뮤니티 플러그인 가이드"
tags:
  - "clippings"
  - "capacitor"
  - "커뮤니티플러그인"
  - "capacitor-community"
  - "capawesome"
  - "크로스플랫폼"
---

# Capacitor 커뮤니티 플러그인 완전 가이드
**버전: v7** | **총 62개 플러그인**

커뮤니티에서는 앱에 기능을 추가하기 위해 수많은 Capacitor 플러그인을 구축했습니다.

커뮤니티 플러그인을 찾는 여러 가지 방법: 웹이나 npm에서 게시된 플러그인을 검색하거나, 공식 [Capacitor Community](https://github.com/capacitor-community) GitHub 조직과 [npm 스코프](https://npmjs.com/~capacitor-community)에서 엄선된 고품질 커뮤니티 지원 Capacitor 플러그인을 탐색해보세요.

---

## 🏆 커뮤니티 생태계 개요

### 📊 주요 통계 (2024년 9월 기준)

| 조직 | 플러그인 수 | 팔로워 | 특징 |
|------|-------------|---------|------|
| **[Capacitor Community](https://github.com/capacitor-community)** | 62개 | 843명 | 공식 커뮤니티 조직, 다양한 기능 |
| **[Capawesome](https://github.com/capawesome-team)** | 32개 | 384명 | 엔터프라이즈급 솔루션, Firebase/ML 특화 |

### ⭐ 인기도별 분류

#### 🏆 최고 인기 (⭐500+)
- **SQLite** (591⭐) - 네이티브 & 전자 SQLite 데이터베이스
- **Firebase (Capawesome)** (488⭐) - Firebase 플러그인 모음
- **Barcode Scanner** (443⭐) - 빠른 QR/바코드 스캐너

#### 🥇 높은 인기 (⭐200-499)
- **Capawesome 플러그인 모음** (388⭐) - 커뮤니티 플러그인
- **Electron** (376⭐) - 데스크톱 앱 배포
- **Bluetooth LE** (332⭐) - 블루투스 저전력 통신

---

## 📱 Capacitor Community 플러그인 (62개)

### 🔧 시스템 & 하드웨어

#### 📱 디바이스 관리
| 플러그인 | 설명 | 인기도 | 사용 시나리오 |
|---------|------|--------|-------------|
| **[Safe Area](https://github.com/capacitor-community/safe-area)** | iOS/Android 안전 영역 정보 | ⭐142 | 노치 대응, UI 레이아웃 |
| **[Keep Awake](https://github.com/capacitor-community/keep-awake)** | 화면 꺼짐/잠금 방지 | ⭐159 | 동영상 앱, 게임, 프레젠테이션 |
| **[Device](https://github.com/capacitor-community/device)** | 확장된 디바이스 정보 | ⭐0 | 디스크 용량, 자세한 하드웨어 정보 |
| **[Volume Buttons](https://github.com/capacitor-community/volume-buttons)** | 볼륨 버튼 이벤트 감지 | ⭐16 | 카메라 앱, 게임 컨트롤 |
| **[Screen Brightness](https://github.com/capacitor-community/screen-brightness)** | 화면 밝기 제어 | ⭐28 | 자동 밝기 조절, 읽기 앱 |

```typescript
// Safe Area 사용 예시
import { SafeArea } from '@capacitor-community/safe-area';

const getSafeAreaInsets = async () => {
  const { insets } = await SafeArea.getSafeAreaInsets();
  console.log('Safe area:', insets);
  
  // CSS 변수로 설정
  document.documentElement.style.setProperty('--safe-area-inset-top', `${insets.top}px`);
};
```

#### 🔒 보안 & 프라이버시
| 플러그인 | 설명 | 인기도 | 사용 시나리오 |
|---------|------|--------|-------------|
| **[Privacy Screen](https://github.com/capacitor-community/privacy-screen)** | 앱 전환 시 화면 보호 | ⭐94 | 금융 앱, 개인정보 보호 |
| **[Device Security Detect](https://github.com/capacitor-community/device-security-detect)** | 루팅/탈옥 감지 | ⭐13 | 보안 앱, 결제 시스템 |
| **[Tap Jacking](https://github.com/capacitor-community/tap-jacking)** | 탭 재킹 방지 (Android) | ⭐5 | 보안 강화, 악성 앱 방지 |
| **[Device Check](https://github.com/capacitor-community/device-check)** | Apple DeviceCheck API | ⭐3 | 디바이스 무결성 검증 |
| **[Play Integrity](https://github.com/capacitor-community/play-integrity)** | Play Integrity API | ⭐6 | Android 앱 무결성 검증 |

```typescript
// Privacy Screen 사용 예시
import { PrivacyScreen } from '@capacitor-community/privacy-screen';

const enablePrivacyScreen = async () => {
  await PrivacyScreen.enable();
  console.log('프라이버시 스크린 활성화됨');
};

// 앱이 백그라운드로 갈 때 자동으로 화면을 가림
```

### 💾 데이터 & 저장소

#### 🗄️ 데이터베이스 & 파일
| 플러그인 | 설명 | 인기도 | 사용 시나리오 |
|---------|------|--------|-------------|
| **[SQLite](https://github.com/capacitor-community/sqlite)** | 네이티브 & 전자 SQLite | ⭐591 | 오프라인 앱, 대용량 데이터 |
| **[File Opener](https://github.com/capacitor-community/file-opener)** | 파일 MIME 타입별 열기 | ⭐77 | 문서 뷰어, 파일 관리자 |
| **[Media](https://github.com/capacitor-community/media)** | 사진/비디오 관리, 앨범 | ⭐125 | 갤러리 앱, 미디어 관리 |
| **[Exif](https://github.com/capacitor-community/exif)** | 이미지 EXIF 메타데이터 | ⭐2 | 사진 관리, 위치 정보 추출 |

```typescript
// SQLite 사용 예시
import { CapacitorSQLite } from '@capacitor-community/sqlite';

const openDatabase = async () => {
  const db = await CapacitorSQLite.createConnection({
    database: 'myapp.db',
    version: 1,
    encrypted: false,
    mode: 'secret'
  });
  
  await db.open();
  
  // 테이블 생성
  await db.execute(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT UNIQUE
    );
  `);
};
```

### 📷 미디어 & 카메라

#### 📸 카메라 & 이미지
| 플러그인 | 설명 | 인기도 | 사용 시나리오 |
|---------|------|--------|-------------|
| **[Camera Preview](https://github.com/capacitor-community/camera-preview)** | HTML에서 카메라 제어 | ⭐211 | 커스텀 카메라 UI, AR 앱 |
| **[Video Recorder](https://github.com/capacitor-community/video-recorder)** | 비디오 녹화 플러그인 | ⭐14 | 비디오 콘텐츠 앱, 교육 앱 |
| **[Image Manipulator](https://github.com/capacitor-community/image-manipulator)** | 이미지 조작 (크기, 자르기) | ⭐7 | 사진 편집, 이미지 최적화 |
| **[Image to Text](https://github.com/capacitor-community/image-to-text)** | OCR (광학 문자 인식) | ⭐41 | 문서 스캔, 텍스트 추출 |
| **[PhotoViewer](https://github.com/capacitor-community/photoviewer)** | 전체화면 이미지 뷰어 | ⭐64 | 이미지 갤러리, 확대/축소 |

```typescript
// Camera Preview 사용 예시
import { CameraPreview } from '@capacitor-community/camera-preview';

const startCameraPreview = async () => {
  const options = {
    position: 'rear',
    parent: 'cameraPreview',
    className: 'cameraPreview',
    width: window.screen.width,
    height: window.screen.height
  };
  
  await CameraPreview.start(options);
};

const takePicture = async () => {
  const result = await CameraPreview.captureSample({
    quality: 90
  });
  
  console.log('사진 데이터:', result.value);
};
```

#### 🎵 오디오 & 음성
| 플러그인 | 설명 | 인기도 | 사용 시나리오 |
|---------|------|--------|-------------|
| **[Native Audio](https://github.com/capacitor-community/native-audio)** | 네이티브 오디오 재생 | ⭐141 | 게임 효과음, 백그라운드 음악 |
| **[Text to Speech](https://github.com/capacitor-community/text-to-speech)** | 텍스트 음성 변환 | ⭐114 | 접근성 향상, 읽기 보조 |
| **[Speech Recognition](https://github.com/capacitor-community/speech-recognition)** | 음성 인식 | ⭐111 | 음성 명령, 받아쓰기 |

```typescript
// Text to Speech 사용 예시
import { TextToSpeech } from '@capacitor-community/text-to-speech';

const speakText = async () => {
  await TextToSpeech.speak({
    text: '안녕하세요, Capacitor입니다!',
    lang: 'ko-KR',
    rate: 1.0,
    pitch: 1.0,
    volume: 1.0
  });
};
```

### 🔄 스캔 & 인식

#### 📱 바코드 & QR
| 플러그인 | 설명 | 인기도 | 사용 시나리오 |
|---------|------|--------|-------------|
| **[Barcode Scanner](https://github.com/capacitor-community/barcode-scanner)** | 빠른 QR/바코드 스캐너 | ⭐443 | 결제 앱, 재고 관리 |

```typescript
// Barcode Scanner 사용 예시 (아카이브되어 공식 플러그인 사용 권장)
import { BarcodeScanner } from '@capacitor/barcode-scanner';

const scanBarcode = async () => {
  const result = await BarcodeScanner.scan();
  
  if (result.hasContent) {
    console.log('스캔 결과:', result.content);
  }
};
```

### 🌐 네트워크 & 통신

#### 🔔 알림 & 메시징
| 플러그인 | 설명 | 인기도 | 사용 시나리오 |
|---------|------|--------|-------------|
| **[FCM](https://github.com/capacitor-community/fcm)** | Firebase Cloud Messaging | ⭐261 | 푸시 알림, 실시간 메시징 |

```typescript
// FCM 사용 예시
import { FCM } from '@capacitor-community/fcm';

const initializeFCM = async () => {
  // FCM 토큰 가져오기
  const { token } = await FCM.getToken();
  console.log('FCM 토큰:', token);
  
  // 토큰 새로고침 리스너
  FCM.addListener('tokenRefresh', (result) => {
    console.log('새로운 FCM 토큰:', result.token);
  });
  
  // 메시지 수신 리스너
  FCM.addListener('pushNotificationReceived', (notification) => {
    console.log('알림 수신:', notification);
  });
};
```

#### 📡 연결성
| 플러그인 | 설명 | 인기도 | 사용 시나리오 |
|---------|------|--------|-------------|
| **[Bluetooth LE](https://github.com/capacitor-community/bluetooth-le)** | 블루투스 저전력 통신 | ⭐332 | IoT 디바이스, 헬스케어 |

```typescript
// Bluetooth LE 사용 예시
import { BleClient } from '@capacitor-community/bluetooth-le';

const scanForDevices = async () => {
  await BleClient.initialize();
  
  await BleClient.requestLEScan(
    {
      services: ['battery_service']
    },
    (result) => {
      console.log('발견된 디바이스:', result);
    }
  );
  
  // 10초 후 스캔 중지
  setTimeout(async () => {
    await BleClient.stopLEScan();
  }, 10000);
};
```

### 🔐 인증 & 소셜

#### 🔑 로그인 & 인증
| 플러그인 | 설명 | 인기도 | 사용 시나리오 |
|---------|------|--------|-------------|
| **[Generic OAuth2](https://github.com/capacitor-community/generic-oauth2)** | 범용 OAuth 2.0 클라이언트 | ⭐264 | 소셜 로그인, API 인증 |
| **[Apple Sign In](https://github.com/capacitor-community/apple-sign-in)** | Apple로 로그인 | ⭐162 | iOS 앱 필수 로그인 |
| **[Facebook Login](https://github.com/capacitor-community/facebook-login)** | Facebook 로그인 | ⭐112 | 소셜 미디어 앱 |

```typescript
// Generic OAuth2 사용 예시
import { OAuth2Client } from '@capacitor-community/generic-oauth2';

const loginWithGoogle = async () => {
  const oauth2Client = new OAuth2Client({
    authorizationBaseUrl: 'https://accounts.google.com/oauth/authorize',
    accessTokenEndpoint: 'https://oauth2.googleapis.com/token',
    scope: 'openid profile email',
    additionalParameters: {},
    android: {
      appId: 'YOUR_ANDROID_CLIENT_ID',
      responseType: 'code',
      customScheme: 'com.yourapp.oauth'
    },
    ios: {
      appId: 'YOUR_IOS_CLIENT_ID',
      responseType: 'code',
      customScheme: 'com.yourapp.oauth'
    }
  });
  
  try {
    const result = await oauth2Client.authenticate();
    console.log('인증 성공:', result.accessToken);
  } catch (error) {
    console.error('인증 실패:', error);
  }
};
```

### 💰 수익화 & 분석

#### 💳 광고 & 결제
| 플러그인 | 설명 | 인기도 | 사용 시나리오 |
|---------|------|--------|-------------|
| **[AdMob](https://github.com/capacitor-community/admob)** | Google AdMob 광고 | ⭐259 | 앱 수익화, 배너/전면 광고 |
| **[Stripe](https://github.com/capacitor-community/stripe)** | Stripe 결제 시스템 | ⭐225 | 온라인 결제, 구독 서비스 |

```typescript
// AdMob 사용 예시
import { AdMob } from '@capacitor-community/admob';

const showBannerAd = async () => {
  await AdMob.showBanner({
    adId: 'ca-app-pub-3940256099942544/6300978111', // 테스트 광고 ID
    adSize: 'BANNER',
    position: 'BOTTOM_CENTER',
    margin: 0
  });
};

const showInterstitialAd = async () => {
  await AdMob.prepareInterstitial({
    adId: 'ca-app-pub-3940256099942544/1033173712'
  });
  
  await AdMob.showInterstitial();
};
```

#### 📊 분석 & 추적
| 플러그인 | 설명 | 인기도 | 사용 시나리오 |
|---------|------|--------|-------------|
| **[Firebase Analytics](https://github.com/capacitor-community/firebase-analytics)** | Firebase 분석 | ⭐170 | 사용자 행동 분석 |
| **[Firebase Crashlytics](https://github.com/capacitor-community/firebase-crashlytics)** | 크래시 보고 | ⭐74 | 안정성 모니터링 |
| **[Advertising ID](https://github.com/capacitor-community/advertising-id)** | IDFA/AAID 접근 | ⭐10 | 광고 추적, 분석 |

### 🎨 사용자 경험

#### 🖼️ UI 향상
| 플러그인 | 설명 | 인기도 | 사용 시나리오 |
|---------|------|--------|-------------|
| **[Date Picker](https://github.com/capacitor-community/date-picker)** | 네이티브 날짜/시간 선택 | ⭐93 | 일정 앱, 예약 시스템 |
| **[App Icon](https://github.com/capacitor-community/app-icon)** | 프로그래밍 방식 아이콘 변경 | ⭐91 | 테마 변경, 시즌 이벤트 |
| **[In-App Review](https://github.com/capacitor-community/in-app-review)** | 네이티브 리뷰 대화상자 | ⭐202 | 앱 평점 요청 |
| **[Native Market](https://github.com/capacitor-community/native-market)** | 앱 스토어 열기 | ⭐30 | 앱 업데이트 유도 |

```typescript
// Date Picker 사용 예시
import { DatePicker } from '@capacitor-community/date-picker';

const showDatePicker = async () => {
  const result = await DatePicker.present({
    mode: 'date',
    locale: 'ko_KR',
    date: '2024-01-01T00:00:00.000Z',
    format: 'yyyy-MM-dd',
    theme: 'dark'
  });
  
  console.log('선택된 날짜:', result.value);
};
```

### 📞 연락처 & 통신

#### 👥 연락처 관리
| 플러그인 | 설명 | 인기도 | 사용 시나리오 |
|---------|------|--------|-------------|
| **[Contacts](https://github.com/capacitor-community/contacts)** | 연락처 플러그인 | ⭐142 | 연락처 앱, 주소록 동기화 |

```typescript
// Contacts 사용 예시
import { Contacts } from '@capacitor-community/contacts';

const getContacts = async () => {
  const permission = await Contacts.requestPermissions();
  
  if (permission.contacts === 'granted') {
    const result = await Contacts.getContacts({
      projection: {
        name: true,
        phones: true,
        emails: true
      }
    });
    
    console.log('연락처:', result.contacts);
  }
};
```

### 🖥️ 데스크톱 & 플랫폼

#### 💻 크로스 플랫폼
| 플러그인 | 설명 | 인기도 | 사용 시나리오 |
|---------|------|--------|-------------|
| **[Electron](https://github.com/capacitor-community/electron)** | Linux, Mac, Windows 데스크톱 | ⭐376 | 데스크톱 앱 배포 |
| **[React Hooks](https://github.com/capacitor-community/react-hooks)** | React용 Capacitor 훅 | ⭐261 | React 앱 개발 |
| **[Vue CLI Plugin](https://github.com/capacitor-community/vue-cli-plugin-capacitor)** | Vue CLI 3/4 플러그인 | ⭐133 | Vue.js 프로젝트 |

```typescript
// React Hooks 사용 예시
import { useCamera } from '@capacitor-community/react-hooks/camera';
import { useGeolocation } from '@capacitor-community/react-hooks/geolocation';

const MyComponent = () => {
  const { photo, getPhoto } = useCamera();
  const { position, getCurrentPosition } = useGeolocation();
  
  const handleTakePhoto = async () => {
    await getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.Uri
    });
  };
  
  return (
    <div>
      <button onClick={handleTakePhoto}>사진 촬영</button>
      {photo && <img src={photo.webPath} alt="촬영된 사진" />}
    </div>
  );
};
```

### 🔧 개발 도구 & 유틸리티

#### 🛠️ 개발 지원
| 플러그인 | 설명 | 인기도 | 사용 시나리오 |
|---------|------|--------|-------------|
| **[Background Geolocation](https://github.com/capacitor-community/background-geolocation)** | 백그라운드 위치 추적 | ⭐228 | 배달 앱, 피트니스 트래킹 |
| **[Intercom](https://github.com/capacitor-community/intercom)** | Intercom 고객 지원 | ⭐69 | 고객 상담, 라이브 채팅 |
| **[MDM AppConfig](https://github.com/capacitor-community/mdm-appconfig)** | MDM 앱 설정 읽기 | ⭐3 | 기업용 앱, MDM 환경 |

---

## 🚀 Capawesome 플러그인 (32개)

### 🔥 Firebase 생태계

#### 🔥 Firebase 플러그인 모음
**[Capacitor Firebase](https://github.com/capawesome-team/capacitor-firebase)** (⭐488)
- **Authentication**: 사용자 인증
- **Firestore**: 실시간 데이터베이스  
- **Storage**: 파일 저장소
- **Analytics**: 사용자 분석
- **Crashlytics**: 충돌 보고
- **Cloud Messaging**: 푸시 알림
- **Performance**: 성능 모니터링
- **Remote Config**: 원격 설정

```typescript
// Firebase Authentication 사용 예시
import { FirebaseAuthentication } from '@capawesome/capacitor-firebase-authentication';

const signInWithGoogle = async () => {
  const result = await FirebaseAuthentication.signInWithGoogle();
  console.log('로그인 사용자:', result.user);
};

const signOut = async () => {
  await FirebaseAuthentication.signOut();
};
```

### 🤖 머신러닝 & AI

#### 🧠 ML Kit 플러그인
**[Capacitor ML Kit](https://github.com/capawesome-team/capacitor-mlkit)** (⭐182)
- **Barcode Scanning**: 바코드 스캔
- **Face Detection**: 얼굴 감지
- **Text Recognition**: 텍스트 인식
- **Image Labeling**: 이미지 라벨링
- **Object Detection**: 객체 감지
- **Pose Detection**: 자세 감지

```typescript
// ML Kit Barcode Scanning 사용 예시
import { BarcodeScanner } from '@capawesome/capacitor-mlkit/barcode-scanning';

const scanBarcode = async () => {
  const { barcodes } = await BarcodeScanner.scan();
  
  for (const barcode of barcodes) {
    console.log('바코드 값:', barcode.rawValue);
    console.log('바코드 타입:', barcode.format);
  }
};
```

### 🔧 Capawesome 플러그인 모음

#### ⚡ 커뮤니티 플러그인 컬렉션
**[Capacitor Plugins](https://github.com/capawesome-team/capacitor-plugins)** (⭐388)
- **Badge**: 앱 배지 관리
- **Clipboard**: 클립보드 관리
- **File Picker**: 파일 선택
- **Photo Editor**: 사진 편집
- **Screen Recorder**: 화면 녹화
- **Share Target**: 공유 대상 처리

```typescript
// Badge 사용 예시
import { Badge } from '@capawesome/capacitor-badge';

const setBadgeCount = async () => {
  await Badge.set({ count: 42 });
};

const clearBadge = async () => {
  await Badge.clear();
};
```

### ☁️ 클라우드 서비스

#### 🌩️ Capawesome Cloud
- **Live Updates**: 실시간 앱 업데이트
- **SOC 2 Type 2 준수**: 엔터프라이즈 보안
- **CLI 도구**: 명령줄 인터페이스

---

## 🎯 시나리오별 플러그인 조합

### 📱 소셜 미디어 앱
```bash
npm install @capacitor-community/camera-preview
npm install @capacitor-community/media
npm install @capacitor-community/fcm
npm install @capacitor-community/generic-oauth2
npm install @capacitor-community/admob
```

**주요 기능**:
- 커스텀 카메라 UI로 사진/비디오 촬영
- 미디어 파일 관리 및 앨범 생성  
- 푸시 알림으로 실시간 소통
- 소셜 로그인 (Google, Facebook 등)
- 광고 수익화

### 🛒 전자상거래 앱
```bash
npm install @capawesome/capacitor-mlkit/barcode-scanning
npm install @capacitor-community/stripe
npm install @capawesome/capacitor-firebase
npm install @capacitor-community/in-app-review
```

**주요 기능**:
- QR/바코드로 제품 스캔
- Stripe 결제 시스템 통합
- Firebase로 제품 데이터 관리
- 네이티브 리뷰 요청

### 🏥 헬스케어 앱
```bash
npm install @capacitor-community/bluetooth-le
npm install @capacitor-community/background-geolocation
npm install @capacitor-community/privacy-screen
npm install @capacitor-community/sqlite
npm install @capacitor-community/device-security-detect
```

**주요 기능**:
- 블루투스 의료기기 연동
- 백그라운드 위치 추적 (운동, 응급상황)
- 민감한 의료 정보 화면 보호
- 로컬 데이터베이스로 오프라인