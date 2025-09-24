---
title: "Ionic Framework와 Capacitor 통합 가이드"
source: "https://capacitorjs.com/docs/getting-started/with-ionic"
author: "Capacitor 팀"
published:
created: 2025-09-24
description: "Ionic Framework와 Capacitor를 함께 사용하는 완벽한 가이드"
tags:
  - "clippings"
  - "capacitor"
  - "ionic"
  - "크로스플랫폼"
  - "모바일앱"
  - "통합가이드"
---

# Ionic Framework와 Capacitor 통합 가이드
**버전: v7**

Capacitor는 앱을 구축하기 위해 Ionic Framework가 반드시 필요하지는 않습니다. 하지만 개발자들은 고품질 앱을 구축하기 위해 Ionic의 [풍부한 UI 컴포넌트 컬렉션](https://ionicframework.com/docs/components)이 매우 유용하다는 것을 알게 될 것입니다.
Capacitor는 [Ionic CLI](https://ionicframework.com/docs/cli)를 사용하여 새로운 Ionic 앱이나 기존 Ionic 앱에 빠르게 설치할 수 있습니다.

---

## 🚀 새로운 Ionic 프로젝트에서 Capacitor 설치하기

### ✨ 좋은 소식!

**새로운 Ionic 프로젝트에는 Capacitor가 이미 기본적으로 설치되어 있습니다!** 새 프로젝트를 시작하기만 하면 됩니다.

### 새 Ionic 프로젝트 생성

```bash
ionic start
```

> 💡 **첫 번째 앱 튜토리얼**: Capacitor 기반 Ionic 앱을 구축하는 튜토리얼을 원한다면, Ionic Framework 팀의 [이 튜토리얼](https://ionicframework.com/docs/intro/next)을 확인해보세요.

---
## 🔧 기존 Ionic 프로젝트에 Capacitor 설치하기
Capacitor가 활성화되지 않은 기존 Ionic 프로젝트가 있다면, 다음 명령어로 Capacitor를 활성화할 수 있습니다.

```bash
ionic integrations enable capacitor
```

### 📦 Capacitor 플러그인 종속성 설치
Ionic Framework는 다음 Capacitor 플러그인의 API를 사용합니다:
#### 필수 플러그인 목록

| 플러그인 | 용도 | 문서 링크 |
|---------|------|-----------|
| `@capacitor/app` | 앱 상태 관리 | [📖 문서](https://capacitorjs.com/docs/apis/app) |
| `@capacitor/haptics` | 햅틱 피드백 (진동) | [📖 문서](https://capacitorjs.com/docs/apis/haptics) |
| `@capacitor/keyboard` | 키보드 제어 | [📖 문서](https://capacitorjs.com/docs/apis/keyboard) |
| `@capacitor/status-bar` | 상태 표시줄 제어 | [📖 문서](https://capacitorjs.com/docs/apis/status-bar) |

### 🎯 중요한 권장사항

앱에서 직접 import하지 않더라도 **최상의 사용자 경험**을 위해 이 플러그인들을 설치해야 합니다.

### 설치 명령어

프로젝트 루트에서 다음 명령어를 실행하세요:

```bash
npm i @capacitor/app @capacitor/haptics @capacitor/keyboard @capacitor/status-bar
```

### 📱 플랫폼 추가하기
Capacitor와 플러그인 설치가 완료되면, 앱에 모바일 플랫폼을 추가할 수 있습니다:

```bash
# Android 플랫폼 추가
ionic capacitor add android

# iOS 플랫폼 추가  
ionic capacitor add ios
```

> ⚠️ **중요**: 이 명령어는 프로젝트 루트에 해당 네이티브 플랫폼을 위한 새 디렉터리를 생성합니다. 이 디렉터리는 소스 아티팩트로 간주되어야 하는 네이티브 프로젝트입니다. [네이티브 프로젝트 관리](https://capacitorjs.com/docs/cordova#native-project-management)에 대해 자세히 알아보세요.

---

## 🛠 Ionic CLI Capacitor 명령어

Ionic CLI는 편의를 위해 Capacitor CLI를 래핑하는 다양한 고수준 명령어를 제공합니다. 

### 주요 명령어 목록

| 명령어 | 용도 | 문서 링크 |
|--------|------|-----------|
| `ionic capacitor add` | 플랫폼 추가 | [📖 문서](https://ionicframework.com/docs/cli/commands/capacitor-add) |
| `ionic capacitor build` | 빌드 실행 | [📖 문서](https://ionicframework.com/docs/cli/commands/capacitor-build) |
| `ionic capacitor run` | 앱 실행 | [📖 문서](https://ionicframework.com/docs/cli/commands/capacitor-run) |
| `ionic capacitor sync` | 동기화 | [📖 문서](https://ionicframework.com/docs/cli/commands/capacitor-sync) |
| `ionic capacitor open` | 네이티브 IDE 열기 | [📖 문서](https://ionicframework.com/docs/cli/commands/capacitor-open) |

### 💡 도움말 사용법

각 명령어 뒤에 `--help` 플래그를 사용하면 도움말 출력을 볼 수 있습니다.

```bash
ionic capacitor build --help
```

---

## 📚 상세 워크플로우 예제

### 🆕 완전히 새로운 프로젝트 시작하기

```bash
# 1. 새 Ionic 프로젝트 생성
ionic start myApp tabs --type=react

# 2. 프로젝트 디렉터리로 이동
cd myApp

# 3. 필수 플러그인 설치 (선택사항, 이미 포함됨)
npm i @capacitor/app @capacitor/haptics @capacitor/keyboard @capacitor/status-bar

# 4. 플랫폼 추가
ionic capacitor add ios
ionic capacitor add android

# 5. 빌드 및 동기화
ionic capacitor build

# 6. 네이티브 IDE에서 실행
ionic capacitor open ios
ionic capacitor open android
```

### 🔄 기존 프로젝트에 Capacitor 추가하기

```bash
# 1. 기존 프로젝트에 Capacitor 활성화
ionic integrations enable capacitor

# 2. 필수 플러그인 설치
npm i @capacitor/app @capacitor/haptics @capacitor/keyboard @capacitor/status-bar

# 3. 플랫폼 추가
ionic capacitor add ios
ionic capacitor add android

# 4. 첫 빌드
ionic capacitor build

# 5. 네이티브 프로젝트 열기
ionic capacitor open ios
```

---

## 🎯 개발 워크플로우 팁

### 일반적인 개발 사이클

1. **코드 변경**: 웹 앱 코드 수정
2. **빌드**: `ionic capacitor build` 실행
3. **동기화**: 변경사항을 네이티브 프로젝트에 동기화
4. **테스트**: 디바이스나 에뮬레이터에서 테스트

### 🚀 빠른 개발을 위한 라이브 리로드

```bash
# iOS에서 라이브 리로드로 실행
ionic capacitor run ios --livereload

# Android에서 라이브 리로드로 실행  
ionic capacitor run android --livereload
```

---

## 🔗 추가 리소스

### 공식 문서
- **[Ionic CLI 전체 문서](https://ionicframework.com/docs/cli)** - Ionic CLI와 Capacitor 사용법
- **[Ionic Framework 컴포넌트](https://ionicframework.com/docs/components)** - 사용 가능한 UI 컴포넌트들
- **[Capacitor 플러그인](https://capacitorjs.com/docs/plugins)** - 네이티브 기능 플러그인들

### 커뮤니티
- **[Ionic 포럼](https://forum.ionicframework.com/)** - 커뮤니티 지원
- **[GitHub](https://github.com/ionic-team/capacitor)** - 이슈 및 기여

---

## ✅ 체크리스트

새 프로젝트 설정을 완료하기 전에 다음을 확인하세요:

- [ ] Node.js 20+ 설치됨
- [ ] Ionic CLI 설치됨 (`npm install -g @ionic/cli`)
- [ ] 필수 Capacitor 플러그인 설치됨
- [ ] 타겟 플랫폼 추가됨 (iOS/Android)
- [ ] 첫 빌드 성공적으로 완료됨
- [ ] 네이티브 IDE에서 프로젝트 열림 확인

이제 Ionic Framework와 Capacitor의 강력한 조합으로 훌륭한 크로스 플랫폼 앱을 만들 준비가 완료되었습니다! 🎉