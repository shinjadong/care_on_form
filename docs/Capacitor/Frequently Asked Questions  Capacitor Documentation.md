---
title: "Capacitor 자주 묻는 질문 (FAQ)"
source: "https://capacitorjs.com/docs/getting-started/faqs"
author: "Capacitor 팀"
published:
created: 2025-09-24
description: "Capacitor에 대한 일반적인 질문들과 답변 모음"
tags:
  - "clippings"
  - "capacitor"
  - "FAQ"
  - "자주묻는질문"
  - "트러블슈팅"
  - "가이드"
---
x
# Capacitor 자주 묻는 질문 (FAQ)
**버전: v7**

아래는 Capacitor에 대해 자주 묻는 질문들의 목록입니다. 여기에서 답변을 찾지 못하셨다면, [공식 포럼](https://forum.ionicframework.com/)이나 [Discord](https://ionic.link/discord)를 확인해보세요. 사이드바에서 더 많은 FAQ 목록을 확인할 수 있습니다 👉

---

## 🎯 Capacitor는 어떤 플랫폼을 지원하나요?

Capacitor는 공식 플랫폼과 커뮤니티 플랫폼을 통해 사실상 모든 디바이스를 타겟으로 할 수 있습니다.

### 📱 공식 지원 플랫폼

Capacitor가 공식적으로 지원하는 플랫폼은 다음과 같습니다:

#### 모바일 플랫폼
- **iOS 14+** 🍎
- **Android 6+** 🤖
  - Chrome WebView 60+ 필요

#### 웹 브라우저 플랫폼
- **Chrome** 🌐
- **Firefox** 🦊  
- **Safari** 🧭
- **Edge** 🔷

### 🌍 커뮤니티 플랫폼

Capacitor는 크로스 플랫폼 데스크톱 프레임워크를 타겟으로 하는 커뮤니티 플랫폼도 제공합니다.

#### 데스크톱 플랫폼
- **Electron** ⚡
  - 저장소: [capacitor-community/electron](https://github.com/capacitor-community/electron)
  - Windows, macOS, Linux 데스크톱 앱 개발 가능

> 💡 **팁**: 커뮤니티 플랫폼은 활발히 개발되고 있으며, 향후 더 많은 플랫폼이 추가될 예정입니다.

---

## 🤔 Capacitor와 함께 Ionic Framework를 꼭 사용해야 하나요?

**아니요! 전혀 필요하지 않습니다!** 

### ✨ 핵심 사실

- Capacitor는 Ionic 도구로 만든 앱뿐만 아니라 **모든 웹 애플리케이션**과 함께 작동합니다
- 특별한 룩앤필을 원하고 Ionic Framework가 적합한 UI 툴킷이 아니라면 사용을 강요받을 필요가 없습니다
- 앱 스토어에는 Capacitor를 사용하지만 Ionic Framework를 사용하지 않는 앱들이 많이 있습니다

### 🎨 UI 프레임워크 선택의 자유

| 사용 가능한 옵션 | 설명 |
|----------------|------|
| **Ionic Framework** | 모바일 최적화 UI 컴포넌트 제공 |
| **React/Vue/Angular 순수** | 각 프레임워크의 기본 컴포넌트 사용 |
| **Tailwind CSS** | 유틸리티 우선 CSS 프레임워크 |
| **Material UI, Ant Design** | 써드파티 UI 라이브러리 |
| **커스텀 CSS/UI** | 완전히 자체 제작한 디자인 |

---

## 🔍 Capacitor 프로젝트용 플러그인은 어디서 찾을 수 있나요?

플러그인을 찾을 때는 다음 순서로 확인하는 것이 좋습니다.

### 1️⃣ Capacitor Community GitHub ⚡
**우선 추천 - 첫 번째 검색처**

[Capacitor Community GitHub](https://github.com/capacitor-community)에는 우수한 개발자 커뮤니티가 만든 플러그인들이 나열되어 있습니다.

#### 특징
- **Capacitor 전용** 플러그인
- **활발한 개발** 및 유지보수
- **Capacitor 3+** 프로젝트에서 작동 보장
- 플러그인이 필요할 때 가장 먼저 찾아볼 곳

### 2️⃣ Awesome Capacitor 😎
**커뮤니티 큐레이션 목록**

다른 많은 [Awesome 목록](https://github.com/sindresorhus/awesome)처럼, [Awesome Capacitor](https://github.com/riderx/awesome-capacitor)는 훌륭한 Capacitor 플러그인들의 커뮤니티 큐레이션 목록입니다.

#### 언제 사용하나요?
- 공식이나 커뮤니티 플러그인을 찾을 수 없을 때
- 누군가 이미 필요한 플러그인을 만들었을 가능성이 높은 곳

### 3️⃣ Project Fugu 🐡
**미래의 웹 API**

[Project Fugu](https://www.chromium.org/teams/web-capabilities-fugu/)는 Chromium 팀의 웹 API [트래커](https://fugu-tracker.web.app/#shipped)로, Chromium 브라우저에 추가된 웹 API를 추적합니다.

#### 주요 활용법
일부 기능은 Android와 iOS 모두에서 지원되지 않을 수 있지만, 다음과 같은 기능들이 기존 플러그인을 대체할 수 있습니다:

| 웹 API | 대체 가능한 플러그인 | 지원 플랫폼 |
|--------|-------------------|-----------|
| [Web Share](https://developer.mozilla.org/en-US/docs/Web/API/Web_Share_API) | `@capacitor/share` | Android, iOS |
| [ContactsManager](https://developer.mozilla.org/en-US/docs/Web/API/ContactsManager) | `@capacitor-community/contacts` | Android만 |

> 💡 **체크 도구**: [Can I Use](https://caniuse.com/)에서 네이티브 플러그인 없이 Android와 iOS에서 이러한 기능을 사용할 수 있는지 확인할 수 있습니다.

### 4️⃣ Cordova 플러그인 🔌
**기존 Cordova 자산 활용**

**알고 계셨나요?** Capacitor는 Cordova 플러그인을 지원합니다!

#### 언제 유용한가요?
- Cordova에서 마이그레이션하는 경우
- Capacitor 동등 버전이 없는 Cordova 플러그인이 있는 경우
- 대부분의 Cordova 플러그인을 Capacitor에서 직접 사용 가능

#### 📚 가이드
[Capacitor에서 Cordova 플러그인 사용하기](https://capacitorjs.com/docs/plugins/cordova) 가이드를 참고하세요.

---

## 🍎 Mac 없이 Capacitor로 iOS 앱을 빌드할 수 있나요?

### 📱 짧은 답변
**아니요.**

### 🔍 자세한 답변

[Ionic AppFlow](https://ionic.io/appflow)와 같은 클라우드 서비스를 사용할 수 있지만, 디바이스나 시뮬레이터에서 애플리케이션을 테스트할 수 없습니다.

#### ⚠️ 중요한 권장사항
- **물리적 디바이스에서 테스트**는 필수입니다
- Apple 제품 사용자들이 실제로 사용할 수 있는지 확인해야 합니다
- 클라우드 빌드만으로는 완전한 테스트가 불가능합니다

#### 🔄 대안 방법들

| 방법 | 장점 | 단점 |
|------|------|------|
| **Mac 구매/렌트** | 완전한 개발 환경 | 비용 부담 |
| **클라우드 빌드** | Mac 없이 빌드 가능 | 테스트 제한적 |
| **Mac 대여 서비스** | 임시 사용 가능 | 일시적 해결책 |

---

## 🤖 Android 에뮬레이터에서 실행 시 빈 화면이 나타나는 이유는?

### 🔍 원인 분석

Capacitor는 다음 요구사항을 만족해야 합니다:
- **Android 6** 이상
- **WebView 버전 60** 이상

### ⚠️ 문제 상황

Android 6이나 7 에뮬레이터를 생성하면:
- 최신 버전의 WebView가 설치되지 않음
- 결과적으로 **빈 화면(흰 화면)** 표시

### 💡 해결 방법

#### 1️⃣ 최신 Android 에뮬레이터 사용 (권장)
```bash
# Android Studio AVD Manager에서
# Android 10 (API 29) 이상의 에뮬레이터 생성
```

#### 2️⃣ WebView 수동 업데이트
- Google Play Store에서 "Android System WebView" 업데이트
- Chrome 브라우저 업데이트

#### 3️⃣ 권장 에뮬레이터 설정

| Android 버전 | API 레벨 | WebView 상태 | 권장도 |
|--------------|----------|--------------|--------|
| Android 15 | API 35 | ✅ 최신 | ⭐⭐⭐⭐⭐ |
| Android 14 | API 34 | ✅ 최신 | ⭐⭐⭐⭐⭐ |
| Android 13 | API 33 | ✅ 최신 | ⭐⭐⭐⭐ |
| Android 10 | API 29 | ✅ 양호 | ⭐⭐⭐ |
| Android 6-7 | API 23-25 | ❌ 구버전 | ⭐ |

---

## 🆘 추가 도움이 필요하신가요?

### 🌐 커뮤니티 지원

| 플랫폼 | 용도 | 링크 |
|--------|------|------|
| **공식 포럼** | 상세한 기술적 질문 | [forum.ionicframework.com](https://forum.ionicframework.com/) |
| **Discord** | 실시간 채팅 지원 | [ionic.link/discord](https://ionic.link/discord) |
| **GitHub Issues** | 버그 리포트, 기능 요청 | [github.com/ionic-team/capacitor](https://github.com/ionic-team/capacitor) |
| **Stack Overflow** | 개발 관련 Q&A | `capacitor` 태그 검색 |

### 📚 추가 학습 자료

- **[공식 문서](https://capacitorjs.com/docs)** - 완전한 API 레퍼런스
- **[플러그인 가이드](https://capacitorjs.com/docs/plugins)** - 네이티브 기능 사용법
- **[커뮤니티 가이드](https://capacitorjs.com/docs/community)** - 커뮤니티 참여 방법

---

## 🎉 요약

Capacitor는 유연하고 강력한 크로스 플랫폼 개발 도구입니다. 이 FAQ를 통해 일반적인 질문들에 대한 답변을 얻으셨기를 바랍니다. 

**기억하세요**: Capacitor 커뮤니티는 언제나 도움을 줄 준비가 되어 있습니다! 🚀