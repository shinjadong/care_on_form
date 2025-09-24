---
title: "Capacitor 개발 환경 설정 가이드"
source: "https://capacitorjs.com/docs/getting-started/environment-setup"
author: "Capacitor 팀"
published: 
created: 2025-09-24
description: "Capacitor 크로스 플랫폼 앱 개발을 위한 완벽한 환경 설정 가이드"
tags:
  - "clippings"
  - "capacitor"
  - "개발환경"
  - "환경설정"
  - "ios"
  - "android"
  - "크로스플랫폼"
---

# Capacitor 개발 환경 설정 가이드
**버전: v7**

Capacitor는 **Android**, **iOS**, **Web** 이렇게 3개의 공식 지원 플랫폼을 제공합니다. 세 플랫폼 모두에서 애플리케이션을 개발하려면 아래의 모든 종속성을 설치해야 합니다. 특정 네이티브 모바일 플랫폼을 타겟으로 하지 않는다면 해당 섹션은 건너뛸 수 있습니다.

## 🔧 기본 필수 요구사항

Capacitor로 어떤 애플리케이션이든 개발하려면 **Node.js 20 이상**이 설치되어 있어야 합니다. Node.js는 다음 방법들 중 하나로 설치할 수 있습니다:

- [Node.js 공식 웹사이트](https://nodejs.org/) 인스톨러 사용
- [Volta](https://volta.sh/) 사용 (JavaScript 도구 관리자)
- 패키지 관리자 사용: [Homebrew](https://brew.sh/) 또는 [Chocolatey](https://chocolatey.org/)

### Node.js 설치 확인

Node.js 설치 후, 터미널을 열고 다음 명령어를 입력하여 제대로 설치되었는지 확인하세요:

```bash
node --version
# 출력 예: v20.9.0
```

Node.js가 설치되면 Capacitor로 **Progressive Web Application (PWA)** 개발을 시작할 수 있습니다.

---

## 📱 iOS 개발 요구사항

iOS 앱을 빌드하려면 **macOS**가 필요합니다. Mac이 없는 경우 [Ionic Appflow](http://ionicframework.com/appflow)와 같은 클라우드 빌드 솔루션을 사용할 수 있지만, Capacitor 애플리케이션을 제대로 테스트하려면 로컬에서 도구를 사용할 수 있는 것이 강력히 권장됩니다.

### 🍎 iOS 개발에 필요한 4가지 도구

1. **Xcode**
2. **Xcode Command Line Tools**
3. **Homebrew**
4. **CocoaPods**

모든 도구를 설치하면 iOS 애플리케이션과 PWA를 모두 만들 수 있습니다.

### Xcode

Xcode는 Apple의 공식 IDE로 네이티브 macOS, iOS, iPadOS 애플리케이션을 만들 때 사용합니다. 

**설치 방법:**
- Mac의 [Apple App Store](https://apps.apple.com/us/app/xcode/id497799835?mt=12)에서 설치

> ⚠️ **중요**: Capacitor 7은 최소 **Xcode 16.0** 이상이 필요합니다.

### Xcode Command Line Tools

Xcode 커맨드 라인 도구는 Xcode 핵심에 포함되지 않은 추가 도구로, 애플리케이션 빌드와 테스트에 필요합니다.

**설치 방법:**
```bash
xcode-select --install
```

**설치 확인:**
```bash
xcode-select -p
# 출력: /Applications/Xcode.app/Contents/Developer
```

### Homebrew

Homebrew는 macOS용 패키지 관리자입니다. Intel Mac과 Apple Silicon Mac 모두에서 CocoaPods를 설치하는 데 필요합니다.

**설치 방법:**
```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

> 💡 Homebrew를 설치하지 않으려면 아래의 대안 방법을 참고하세요 (권장하지 않음).

### CocoaPods

CocoaPods는 Capacitor가 iOS 프로젝트의 네이티브 종속성을 설치하고 관리하는 데 사용하는 iOS 종속성 관리자입니다.

**설치 방법:**
```bash
brew install cocoapods
```

**설치 확인:**
```bash
pod --version
# 출력 예: 1.12.1
```

#### Homebrew 없이 CocoaPods 설치하기

Ruby Gem을 사용하여 CocoaPods를 직접 설치할 수도 있습니다:

```bash
sudo gem install cocoapods
```

> 💡 sudo 없이 실행하려면 [CocoaPods sudo-less 설치 문서](https://guides.cocoapods.org/using/getting-started.html#sudo-less-installation)를 참고하세요.

---

## 🤖 Android 개발 요구사항

Capacitor로 Android 애플리케이션을 개발하려면 다음 2가지가 추가로 필요합니다:

1. **Android Studio**
2. **Android SDK**

기본 요구사항과 Android Studio, Android SDK를 모두 설치하면 Android 애플리케이션과 PWA를 모두 만들 수 있습니다.

### Android Studio

Android Studio는 Google의 공식 IDE로 네이티브 Android 애플리케이션 개발에 사용됩니다.

**설치 방법:**
- [Android Studio 다운로드 페이지](https://developer.android.com/studio)에서 다운로드

> ⚠️ **중요**: Capacitor 7은 최소 **Android Studio 2024.2.1** 이상이 필요합니다.

### Android SDK

Android Studio 설치 후 Android SDK 패키지를 설치해야 합니다.

**필수 설치 항목:**
- Android SDK Tools
- API 23 이상의 Android SDK Platforms

**설치 과정:**

1. Android Studio에서 **Tools → SDK Manager** 메뉴 열기
2. **SDK Platforms** 탭에서 테스트하고 싶은 플랫폼 버전 설치

![SDK Platforms](https://capacitorjs.com/docs/assets/images/sdk-platforms-73ec4b5bd3b71287e102621393e95d02.png)

> 💡 **시작 팁**: 처음에는 하나의 API 버전만 설치해도 충분합니다. 위 이미지에서는 Android 9 (API 28)와 Android 10 (API 29)이 설치되어 있습니다. 최신 안정 버전은 **Android 15 (API 35)**입니다.

---

## 🎯 다음 단계

환경 설정이 완료되었다면:

1. **웹 전용 개발**: Node.js만 있으면 PWA 개발 가능
2. **iOS 개발**: macOS + Xcode + Command Line Tools + Homebrew + CocoaPods
3. **Android 개발**: Node.js + Android Studio + Android SDK

모든 플랫폼을 지원하는 크로스 플랫폼 앱을 개발할 준비가 완료되었습니다! 🚀

### 관련 문서
- [Capacitor 시작하기](https://capacitorjs.com/docs/getting-started)
- [첫 번째 앱 만들기](https://capacitorjs.com/docs/getting-started/with-ionic)
- [플러그인 가이드](https://capacitorjs.com/docs/plugins)