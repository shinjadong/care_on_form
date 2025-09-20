---
title: "Claude Code + SuperClaude 조합 : SuperClaude 설치 방법 (/sc: 커맨드로 개발 효율성 올리기)"
source: "https://goddaehee.tistory.com/387"
author:
  - "[[갓대희]]"
published: 2025-08-11
created: 2025-09-15
description: "안녕하세요! 갓대희 입니다. :- )오늘은 슈퍼 클로드에 대해 쓰려고 한다. 몇일에 한개씩 글을 쓰려고 하니 n8n잠깐 갔다가, gemini갔다가, langh flow갔다가.. 슈퍼 클로드는 쓰려고한지 벌써 한달은 다되어 가는것 같다. 더이상 미룰 수 없어, 이미 작성해 뒀던 대본을 다시 끄집어내 작성해 보려고 한다. Claude Code를 그냥 사용하다보면 다음과 같은 아쉬운 점들이 생길것이다.코딩에서 분명 강력한 AI이지만 뭔가 범용적이고, 매번 같은 설명을 반복해야 하고, 프로젝트 컨텍스트를 잃어버리는 일이 잦았다. 이런 고민을 해결해줄 프레임워크가 SuperClaude이다. Claude Code를 마치 우리 팀의 시니어 개발자처럼 움직이게해줄 도구라고 할 수 있다. 공식문서를 자주 보게 될 것 이.."
tags:
  - "clippings"
---
안녕하세요! 갓대희 입니다.:- )

오늘은 슈퍼 클로드에 대해 쓰려고 한다.

![](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdna%2FbfvhSk%2FbtsPOIagkIa%2FAAAAAAAAAAAAAAAAAAAAAAGTqmcKtk2a5dwsdz3I--_tvgr4zxS0lDc1peE_CwKJ%2Fimg.png%3Fcredential%3DyqXZFxpELC7KVnFOS48ylbz2pIh7yKj8%26expires%3D1759244399%26allow_ip%3D%26allow_referer%3D%26signature%3DllcQMe2DbNqeLaAhbTf%252B7bH5lks%253D)

몇일에 한개씩 글을 쓰려고 하니 n8n잠깐 갔다가, gemini갔다가, langh flow갔다가..

슈퍼 클로드는 쓰려고한지 벌써 한달은 다되어 가는것 같다.

더이상 미룰 수 없어, 이미 작성해 뒀던 대본을 다시 끄집어내 작성해 보려고 한다.

Claude Code를 그냥 사용하다보면 다음과 같은 아쉬운 점들이 생길것이다.

코딩에서 분명 강력한 AI이지만 뭔가 범용적이고, 매번 같은 설명을 반복해야 하고, 프로젝트 컨텍스트를 잃어버리는 일이 잦았다. 이런 고민을 해결해줄 프레임워크가 SuperClaude이다. Claude Code를 마치 우리 팀의 시니어 개발자처럼 움직이게해줄 도구라고 할 수 있다.

공식문서를 자주 보게 될 것 이다.

[https://github.com/SuperClaude-Org/SuperClaude\_Framework](https://github.com/SuperClaude-Org/SuperClaude_Framework)

혹시 SuperGemini에 관심이 있으신분은 이 글을 보면 될 것 같다.

[2025.08.11 - \[AI/Gemini\] - Gemini CLI + SuperGemini 조합: SuperGemini 설치 방법 (/sg: 커맨드로 개발 효율성 올리기)](https://goddaehee.tistory.com/388)

### SuperClaude란 무엇인가?

SuperClaude는 Claude Code를 위한 설정 프레임워크다.

쉽게 말해 Claude Code의 "두뇌 업그레이드"라고 보면 된다.

별도의 코드나 외부 도구 설치 없이, 순수 설정 파일만으로 Claude Code를 전문적인 개발 어시스턴트로 탈바꿈시킨다.

커스텀 커맨드, 페르소나, 자동 트리거 기능 등을 제공하여 복잡한 프롬프트 작성 없이도 고품질의 결과물을 얻을 수 있도록 도와준다. 이를 통해 개발자는 더욱 명확하고 완성도 높은 코드를 작성할 수 있게 될 것이다.

### SuperClaude Framework 핵심 기능

- **16개 커스텀 커맨드**: \`/sc:\` 접두사로 개발 라이프사이클 전 영역 커버
- **11개 페르소나**: 역할별 맞춤 작업, 별도 입력 없이 자동 선택
- **자동 MCP 트리거**: 컨텍스트, 시퀀셜, 매직 등 자동 실행
- **플랜 기능**: 작업 계획 수립 후 검토 및 수정 가능
- **서브에이전트 제어**: 여러 에이전트 동시 관리 및 오케스트레이션

### 슈퍼 클로드 설치 방법

먼저 현재 버전과 설치 방법을 확인해보자.

( 공식 github url: [https://github.com/SuperClaude-Org/SuperClaude\_Framework](https://github.com/SuperClaude-Org/SuperClaude_Framework) )

**1\. 해당 튜토리얼을 진행하려면 UV가 설치 되어 있어야 한다고 되어있다. (파이썬만 설치되어 있어도 가능하지만, 공식문서에 최대한 충실하기위해 하기 uv 설치 방법을 남겨 두었다. uv 설치하기 싫다면 다음 단계로 넘거 가도 무방하다.)**

\- 난 이미 설치되어있어서 간단하게 설치 명령어들을 남겨 놓는데, 안되면 다른글을 참고 부탁 드립니다... ㅠ

ex) windows - powershell - 관리자 권한

```bash
powershell -ExecutionPolicy ByPass -c "irm https://astral.sh/uv/install.ps1 | iex"
```

ex) 파이썬이 설치되어있다면 pip도 설치 되어있을 것이다.

```bash
pip install uv
```
![](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdna%2Fzod2F%2FbtsPNmZNNyM%2FAAAAAAAAAAAAAAAAAAAAAEZVRJFqEuhOY8GnMYFNH7zgnFx1UzUYP5d025N3mU6N%2Fimg.png%3Fcredential%3DyqXZFxpELC7KVnFOS48ylbz2pIh7yKj8%26expires%3D1759244399%26allow_ip%3D%26allow_referer%3D%26signature%3DsFJLxmZ141q3cN6xNxkPbnSVw6U%253D)

ex) mac os라면 curl or wget or homebrew

```bash
curl -LsSf https://astral.sh/uv/install.sh | sh
```
```bash
wget -qO- https://astral.sh/uv/install.sh | sh
```
```bash
brew install uv
```

**2\. 2가지 옵션을 선택할 수 있다.**

1) 옵션 A: PyPI에서 (권장) >> **난 빠르게 3번방법으로 진행 하였다.**

\- 하기 uv add의 경우 Python 프로젝트 컨텍스트 내에서만 유효하니 아무데서나 그냥 실행하면 오류가 발생할 것이다. 그래서 걍... 공식 문서 무시하고 편하게 3번 방법을 썼다.

```bash
uv add SuperClaude
```

2) 옵션 B: git Clone을 통해 해당 소스로 설치 하는 방법

```bash
git clone https://github.com/SuperClaude-Org/SuperClaude_Framework.git
cd SuperClaude_Framework
uv sync
```

**3) uv가 문제가 있다면 pip으로도 설치 가능하다.**

```bash
pip install SuperClaude
SuperClaude install
```

ex) windows

![](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdna%2FbwCSxa%2FbtsPLJobVR6%2FAAAAAAAAAAAAAAAAAAAAAJFhQT9PW816g4vLIrR1Nwf8HoyLpcpv5gSc3jLL_mWB%2Fimg.png%3Fcredential%3DyqXZFxpELC7KVnFOS48ylbz2pIh7yKj8%26expires%3D1759244399%26allow_ip%3D%26allow_referer%3D%26signature%3D3jNU2kA8dmGCgXfT5ZVOHphZgPw%253D)

\- 1번을 클릭해서 빠르게 진행하자. 쭉 넘어가면 설치가 완료 될 것이다.

ex) 간단 설명

1\. Quick Installation: 일반 사용자 / 빠른 설정 원할 때, 설치 단계를 최소화하면서 기본 기능을 빠르게 활용 가능  
2\. Minimal Installation: 최소한의 기능으로 경량 환경 유지하고 싶을 때, 공간 절약, 복잡도 낮춤을 원하는 경우 유리  
3\. Custom Selection: 내 환경에 맞게 세밀하게 구성하고 싶을 때 활용

4) 설치 확인

```bash
# 설치 확인
ls ~/.claude/commands/  # /sc: 명령어 파일들 확인
```
![](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdna%2FcBywzl%2FbtsPPkGWSZ1%2FAAAAAAAAAAAAAAAAAAAAAD5UCnN7TMKp6RiDLF6X3D3r5sB4iobqJBlxt55sP256%2Fimg.png%3Fcredential%3DyqXZFxpELC7KVnFOS48ylbz2pIh7yKj8%26expires%3D1759244399%26allow_ip%3D%26allow_referer%3D%26signature%3DRrLdILvUI4jATSUHen%252BagQYLC30%253D)

\- 또는 claude code 접속하여 sc 까지 작성해보자. 잘 설치가 된걸 볼 수 있다.

![](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdna%2Fcnfal0%2FbtsPLNjQDfP%2FAAAAAAAAAAAAAAAAAAAAAIZWEXPZo26a5orw5tGl3u72dD0OP01Iio9EguSPeRAz%2Fimg.png%3Fcredential%3DyqXZFxpELC7KVnFOS48ylbz2pIh7yKj8%26expires%3D1759244399%26allow_ip%3D%26allow_referer%3D%26signature%3D6jPzseP91TRq2yIe9%252BqB%252BGUlSKM%253D)

ex) mac

![](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdna%2FdpWrm9%2FbtsPPlsFlUb%2FAAAAAAAAAAAAAAAAAAAAALGkeoDxi8YSptlpKZre9t7ct0BtO92vk0T84pa4hNBI%2Fimg.png%3Fcredential%3DyqXZFxpELC7KVnFOS48ylbz2pIh7yKj8%26expires%3D1759244399%26allow_ip%3D%26allow_referer%3D%26signature%3Db5OKOgReeSpPdh5Qvs%252BvCCdTH2E%253D)

\- 위 경고 문구를 해석 하면

1\. Defaulting to user installation because normal site-packages is not writeable  
현재 site-packages(전역 Python 패키지 경로)에 쓰기 권한이 없어서, 사용자 홈 디렉토리(~/.local 또는 ~/Library/Python/...)에 설치했다고 한다.  
  
2\. WARNING: The scripts SuperClaude and superclaude are installed in '/Users/lf/Library/Python/3.9/bin' which is not on PATH.  
superclaude 실행 파일이 설치된 경로가 PATH 환경 변수에 등록되지 않아서 터미널에서 명령어를 바로 실행할 수 없다고 한다.

\- windows와같이 바로 SuperClaude Install을 사용할 수 없는데 직접 해당 경로세서 수행 하거나 다음과 같이 해결 가능하다.

ex) 현재 쉘이 셸이 zsh인 경우

```bash
echo 'export PATH="$HOME/Library/Python/3.9/bin:$PATH"' >> ~/.zshrc
source ~/.zshrc
```

ex) bash인 경우

```bash
echo 'export PATH="$HOME/Library/Python/3.9/bin:$PATH"' >> ~/.bash_profile
source ~/.bash_profile
```

\- 이후 설치해보자. 위 windows와 동일하게 1번 클릭 및 모두 동의하면 설치가 완료 된다.

```bash
SuperClaude install
```

### /SC: 슈퍼 클로드 사용해보기

슈퍼 클로드를 활용하면 어드민 페이지 제작부터 API 설계, 아키텍처 설계까지 전반적인 개발 작업을 빠르게 수행할 수 있다.

특히 페르소나 기능을 활용하면 프론트엔드 개발자, 백엔드 개발자 등 역할별 맞춤 작업이 가능하기 때문에 생산성이 확연히 올라가는것을 볼 수 있다.

// SuperClaude Framework 핵심 명령어들

```bash
# 프로젝트 설계 시작
/sc:design --plan

# UI 컴포넌트 설계 및 구현
/sc:implement --react --magic

# 종합적인 프로젝트 분석
/sc:analyze --architecture --sequential
```

**플랜 기능의 활용**  
`--plan` 플래그를 넣으면 작업 계획을 세우고, 멈춰서 질문하는 단계까지 진행한다.  
계획이 잘 나오면 폴더 구조, UI 컴포넌트 등 상세 설계도 검토하고 수정할 수 있어서 실수를 미리 방지할 수 있다.

### 페르소나 시스템: 역할별 전문성

SuperClaude의 가장 큰 장점은 자동 페르소나 선택인 것 같다.

11개의 페르소나가 무료로 제공되며 별도 입력 없이 컨텍스트에 맞게 자동으로 활성화된다.

각 페르소나는 특정 역할에 맞게 최적화되어 있어서 더욱 전문적이고 정확한 결과를 얻을 수 있다.

| **페르소나** | **전문 분야** | **자동 활성화 조건** | **수동 플래그** |
| --- | --- | --- | --- |
| **🏗️ architect** | 시스템 설계, 아키텍처 | 설계 관련 키워드, 시스템 분석 | \--persona-architect |
| **🎨 frontend** | UI/UX, 프론트엔드 | .tsx,.jsx 파일, UI 관련 작업 | \--persona-frontend |
| **⚙️ backend** | 서버, API, 데이터베이스 | API, 서버 코드, 백엔드 로직 | \--persona-backend |
| **🔒 security** | 보안, 취약점 분석 | 보안 관련 키워드, 인증 시스템 | \--persona-security |
| **🔍 analyzer** | 코드 분석, 품질 검토 | 버그, 에러 관련 작업 | \--persona-analyzer |
| **🧪 qa** | 테스트, 품질 보증 | 테스트 관련 작업 | \--persona-qa |
| **⚡ performance** | 성능 최적화 | 느린 코드, 최적화 필요 | \--persona-performance |
| **📚 mentor** | 학습, 교육, 가이드 | 설명, 학습 요청 | \--persona-mentor |
| **✍️ scribe** | 문서화, 기술 작성 | 문서 작성 요청 | \--persona-scribe |

ex) 자동 동작 흐름

```bash
# 시스템 설계 관련 작업 → architect 자동 활성화
/sc:design --plan

# UI 작업 → frontend 자동 활성화  
/sc:implement --react --component

# 데이터베이스 작업 → backend 자동 활성화
/sc:build --database --api

# 보안 검토 → security 자동 활성화
/sc:analyze --security --vulnerability
```

ex) 수동으로 동작하게 하는 예시

```bash
# 특별히 다른 관점이 필요할 때만
/sc:design --plan --persona-frontend  # 프론트엔드 관점에서 설계
/sc:analyze --api --persona-security  # 보안 관점에서 API 분석
```

## 16개 핵심 커맨드 활용법

SuperClaude Framework는 \`/sc:\` 접두사를 사용하여 16개의 전문화된 커맨드를 제공합니다. 각 커맨드는 개발 라이프사이클의 특정 단계에 최적화되어 있습니다.

| **구분** | **커맨드** | **주요기능** | **문법** |
| --- | --- | --- | --- |
| 개발 | /sc:implement | 기능 구현 및 컴포넌트 개발 (v3에서 /build 대체) | /sc:implement \[target\] \[flags\] |
| 개발 | /sc:build | 프로젝트 빌드, 컴파일 및 패키징 | /sc:build \[target\] \[flags\] |
| 개발 | /sc:design | 시스템 아키텍처 및 UI/UX 설계 | /sc:design \[concept\] \[flags\] |
| 분석 | /sc:analyze | 코드 분석, 성능 진단 및 아키텍처 검토 | /sc:analyze \[target\] \[flags\] |
| 분석 | /sc:troubleshoot | 문제 해결, 디버깅 및 에러 분석 | /sc:troubleshoot \[symptoms\] \[flags\] |
| 분석 | /sc:explain | 코드 설명 및 개념 해설 | /sc:explain \[concept\] \[flags\] |
| 품질 | /sc:improve | 코드 개선, 최적화 및 리팩토링 | /sc:improve \[target\] \[flags\] |
| 품질 | /sc:test | 테스트 코드 작성 및 커버리지 분석 | /sc:test \[target\] \[flags\] |
| 품질 | /sc:cleanup | 코드 정리, 불필요한 파일 제거 | /sc:cleanup \[scope\] \[flags\] |
| 관리 | /sc:document | 문서 작성 및 자동 생성 | /sc:document \[content\] \[flags\] |
| 관리 | /sc:git | Git 작업 및 버전 관리 | /sc:git \[operation\] \[flags\] |
| 관리 | /sc:estimate | 작업 시간 및 비용 추정 | /sc:estimate \[task\] \[flags\] |
| 관리 | /sc:task | 작업 관리 및 스케줄링 | /sc:task \[operation\] \[flags\] |
| 관리 | /sc:index | 프로젝트 인덱싱 및 컨텍스트 로드 | /sc:index \[scope\] \[flags\] |
| 관리 | /sc:load | 설정 및 프로젝트 데이터 로드 | /sc:load \[source\] \[flags\] |
| 관리 | /sc:spawn | 서브 프로세스 생성 및 관리 | /sc:spwan \[process\] \[flags\] |
| 관리 | /sc:workflow | 요구사항 분석 및 구현 워크플로우 생성 (v3 신규) | /sc:workflow \[prd-file\] \[flags\] |

## flag 요약

\- MCP 통합 플래그 ( 아직 mcp는 다루지 않았으니 참고 )

| **플래그** | **설명** | **자동 활성화 조건** |
| --- | --- | --- |
| \--c7 | Context7 활성화 (공식 문서 조회) | 외부 라이브러리, 프레임워크 작업 |
| \--seq | Sequential 활성화 (복합 단계 분석) | 복잡한 디버깅, 시스템 설계 |
| \--magic | Magic 활성화 (UI 컴포넌트 생성) | UI 컴포넌트 요청, 프론트엔드 페르소나 |
| \--play | Playwright 활성화 (브라우저 자동화) | E2E 테스트, QA 페르소나 |

\- 사고 및 분석 플래그

| **플래그** | **설명** | **사용 시기** |
| --- | --- | --- |
| \--think | 멀티파일 분석 (~4K 토큰) | 복잡한 문제, 5+ 파일 분석 |
| \--think-hard | 깊은 아키텍처 분석 (~10K 토큰) | 시스템 전반, 3+ 모듈 분석 |
| \--ultrathink | 최대 깊이 분석 (~32K 토큰) | 중요 시스템 재설계, 레거시 현대화 |
| \--validate | 검증 및 안전성 확인 | 중요한 변경사항 적용 시 |
| \--preview | 변경사항 미리보기 | 실제 적용 전 확인 |
| \--plan | 실행 계획 미리보기 | 실행 전 단계 확인 |

\- 안전 모드 플래그

| **플래그** | **설명** | **권장 사용처** |
| --- | --- | --- |
| \--safe-mode | 안전한 변경만 적용 | 프로덕션 코드 수정 |
| \--dry-run | 실행 시뮬레이션만 | 위험한 작업 전 테스트 |
| \--backup | 백업 생성 후 진행 | 중요한 파일 수정 시 |

\- 출력 및 형식 플래그

| **플래그** | **설명** | **용도** |
| --- | --- | --- |
| \--verbose | 자세한 출력 | 학습, 디버깅 목적 |
| \--summary | 요약 출력 | 빠른 개요 확인 |
| \--format \[type\] | 출력 형식 지정 | 특정 형태 결과물 |
| \--coverage | 커버리지 포함 | 테스트 결과 |

\- 특수 작업 플래그 (1)

| **플래그** | **설명** | **활용 예시** |
| --- | --- | --- |
| \--focus \[area\] | 특정 영역 집중 분석 | \--focus security, --focus performance |
| \--type \[type\] | 작업 유형 지정 | \--type component, --type api |
| \--framework \[name\] | 프레임워크 지정 | \--framework react, --framework vue |
| \--strategy \[type\] | 실행 전략 | \--strategy systematic, --strategy mvp |

\- 특수 작업 플래그 (2)

| 플래그 | 설명 | 자동 활성화 조건 |
| --- | --- | --- |
| \--delegate \[mode\] | 서브 에이전트 위임 (auto/manual) | \>7 디렉토리 또는 >50 파일 |
| \--wave-mode \[type\] | 멀티 스테이지 실행 (auto/force) | 복잡도 >0.7 + 파일 >20 + 작업유형 >2 |
| \--all-mcp | 모든 MCP 서버 활성화 | 수동 지정 시만 |
| \--concurrency \[n\] | 동시 실행 에이전트 수 제한 (1-15) | delegate와 함께 사용 |
| \--loop | 반복적 개선 모드 | polish, refine, enhance 키워드 |
| \--scope \[area\] | 분석 범위 제한 | 리소스 절약 필요시 |

\- 성능 최적화 플래그

| **플래그** | **설명** | **효과** |
| --- | --- | --- |
| \--uc | Ultra Compression (70% 토큰 절약) | 대용량 프로젝트 처리 |
| \--no-mcp | MCP 서버 비활성화 | 빠른 실행, 기본 기능만 |
| \--introspect | SuperClaude 내부 분석 | 프레임워크 디버깅 |

## 카테고리별 주요 특징

### 🛠️ 개발 (3개)

핵심 개발 워크플로우를 담당하는 커맨드들. 설계부터 구현, 빌드까지 전체 개발 과정을 커버합니다.

### 🔍 분석 (3개)

코드 품질 분석과 문제 해결에 특화된 커맨드들. 복잡한 문제도 체계적으로 접근합니다.

### ✅ 품질 (3개)

코드 품질 향상과 테스트에 집중하는 커맨드들. 안정성과 유지보수성을 보장합니다.

### 📋 관리 (7개)

프로젝트 관리와 협업에 필요한 다양한 도구들. 문서화부터 버전 관리까지 포괄적으로 지원합니다.

### 실제 프로젝트 적용 사례

어드민 페이지 프로젝트를 SuperClaude Framework로 진행해본 전체 과정을 공유한다. 설계부터 데이터 연동까지 단계별로 어떻게 활용했는지 살펴보자.

### 대시 보드 페이지(React) 개발 워크플로우

**1\. 설계** - `/sc:design --plan` 로 전체 구조 계획

![](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdna%2FbZA8MY%2FbtsPOq1Jc8y%2FAAAAAAAAAAAAAAAAAAAAADCzOWwA-yV1hO57lKOCKPAVTa2phjwVCNoWFkFKoZ7E%2Fimg.png%3Fcredential%3DyqXZFxpELC7KVnFOS48ylbz2pIh7yKj8%26expires%3D1759244399%26allow_ip%3D%26allow_referer%3D%26signature%3DJgKbWo0dRfWRhSyDtop4ioqvSxI%253D)

![](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdna%2FuiyQI%2FbtsPMV2xR0w%2FAAAAAAAAAAAAAAAAAAAAAMh1VVgDbKQfUGJj4oAW3_S-ZWQ36_8F11VLlcwkcyos%2Fimg.png%3Fcredential%3DyqXZFxpELC7KVnFOS48ylbz2pIh7yKj8%26expires%3D1759244399%26allow_ip%3D%26allow_referer%3D%26signature%3DD4K3ZM%252FDd3LjFcA82DD2Go4mzT4%253D)

![](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdna%2F6ahRG%2FbtsPNGxgzHo%2FAAAAAAAAAAAAAAAAAAAAADPhQkDziAnTtA_HsZ7LVzfXt6YG2JPTvhf8oisVwAtN%2Fimg.png%3Fcredential%3DyqXZFxpELC7KVnFOS48ylbz2pIh7yKj8%26expires%3D1759244399%26allow_ip%3D%26allow_referer%3D%26signature%3D3D7PaFwlnxiIps7tC1a8DzhYdMI%253D)

![](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdna%2FclklRI%2FbtsPLMkSG7R%2FAAAAAAAAAAAAAAAAAAAAAJd9o9Xgww6sEukPkKBDLpPuqoTxq2eYEnt66UETO6WK%2Fimg.png%3Fcredential%3DyqXZFxpELC7KVnFOS48ylbz2pIh7yKj8%26expires%3D1759244399%26allow_ip%3D%26allow_referer%3D%26signature%3DTklFdLySr4OhTYlWBL2b%252FVcJ%252FaI%253D)

![](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdna%2FbFO7TY%2FbtsPLQU9j6l%2FAAAAAAAAAAAAAAAAAAAAAMue_5_bPR5WCVVn76jxq0QUpx4sQBIbuqiNBnr4VKQ1%2Fimg.png%3Fcredential%3DyqXZFxpELC7KVnFOS48ylbz2pIh7yKj8%26expires%3D1759244399%26allow_ip%3D%26allow_referer%3D%26signature%3DN%252F7nhIGFOJg1WvluOZRDiWS1JkA%253D)

\- 빨간색 테두리의 예시가 React로 대시 보드를 만드는 Design 설계 인데 하기에 각각의 요소에 대해 잠깐 기술하고 넘어가자.

**2\. /sc:design** : /sc:design \[대상\] --type \[타입\] --format \[출력형식\] \[추가옵션\]

1) --type 옵션 (설계 유형)

```bash
--type architecture    # 시스템 아키텍처
--type api            # API 설계
--type component      # UI 컴포넌트
--type database       # 데이터베이스
--type workflow       # 워크플로우
--type ui             # 사용자 인터페이스
--type microservice   # 마이크로서비스
```

2) --format 옵션 (출력 형식)

```bash
--format diagram      # 다이어그램/차트
--format spec         # 스펙 문서
--format code         # 실제 코드
--format markdown     # 마크다운 문서
--format json         # JSON 형태
--format yaml         # YAML 형태
```

3) 추가 유용한 옵션들

```bash
--plan               # 실행 전 계획 수립
--iterative          # 반복적 개선 모드
--detailed           # 상세한 설명 포함
--minimal            # 최소한의 구조만
--scalable           # 확장성 고려
--secure             # 보안 요소 포함
```

\- 프로젝트 초기 설계시에 유용한 기능이다.

ex) 모바일 앱 설계

ex) 어드민 시스템 설계

```bash
# 전체 시스템 구조
/sc:design admin-system --type architecture --format diagram --scalable

# 사용자 관리 API
/sc:design user-management-api --type api --format spec --crud

# 권한 관리 컴포넌트
/sc:design permission-component --type component --format code --secure

# 대시보드 UI 설계
/sc:design admin-dashboard --type ui --format wireframe --detailed
```

ex) /sc:design dashboard-component --type component --format code

![](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdna%2FbFO7TY%2FbtsPLQU9j6l%2FAAAAAAAAAAAAAAAAAAAAAMue_5_bPR5WCVVn76jxq0QUpx4sQBIbuqiNBnr4VKQ1%2Fimg.png%3Fcredential%3DyqXZFxpELC7KVnFOS48ylbz2pIh7yKj8%26expires%3D1759244399%26allow_ip%3D%26allow_referer%3D%26signature%3DN%252F7nhIGFOJg1WvluOZRDiWS1JkA%253D)

ex) 위에서 빨간 네모박스를 까먹었을법 한데... 난 대시보드를 구성하려는 예시를 따라 가보고 있다. 진행해보자.

![](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdna%2FdA1McX%2FbtsPOIVA8dx%2FAAAAAAAAAAAAAAAAAAAAAP0-2Og2g3PfgvAj1J_Z5gNypINwOJGfescQfqguRLJh%2Fimg.png%3Fcredential%3DyqXZFxpELC7KVnFOS48ylbz2pIh7yKj8%26expires%3D1759244399%26allow_ip%3D%26allow_referer%3D%26signature%3D2GL94LfYp5y8lW6O9m8Hna25hPc%253D)

![](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdna%2FAigXT%2FbtsPMKfTbYe%2FAAAAAAAAAAAAAAAAAAAAACZE7dRkEdBV7jor8RAOqk6hbcrjPp7MZI_9ZNSiQ4-W%2Fimg.png%3Fcredential%3DyqXZFxpELC7KVnFOS48ylbz2pIh7yKj8%26expires%3D1759244399%26allow_ip%3D%26allow_referer%3D%26signature%3DpSuHqtjsheexENl3nxSiyvGQcHk%253D)

\- 쭉쭉 개발까지 진행한다.

![](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdna%2FchnKcz%2FbtsPOFLlwWX%2FAAAAAAAAAAAAAAAAAAAAAF5JD3YlUEoGPsbpzVwLhBpOZ9RilaEqT3NoQXQeeXmK%2Fimg.png%3Fcredential%3DyqXZFxpELC7KVnFOS48ylbz2pIh7yKj8%26expires%3D1759244399%26allow_ip%3D%26allow_referer%3D%26signature%3Dpu1kp1dleRsaVnYyr9m5ZNNYYi8%253D)

\- reademe.md 파일 생성 및 마무리 까지

![](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdna%2Fq5S5t%2FbtsPNkAXbdt%2FAAAAAAAAAAAAAAAAAAAAAMiiKsmYsOBtfFLWksf-1JhQWucGdVx6_mz8gOoHzKWH%2Fimg.png%3Fcredential%3DyqXZFxpELC7KVnFOS48ylbz2pIh7yKj8%26expires%3D1759244399%26allow_ip%3D%26allow_referer%3D%26signature%3DXjCC9u0G5yp2DBFnhTsZxFYOQ6I%253D)

![](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdna%2FGzxTP%2FbtsPOncRYKH%2FAAAAAAAAAAAAAAAAAAAAAP49j-orh1Pwlt0HTho7UQulDRs6H7UGq8B92iP9vTlD%2Fimg.png%3Fcredential%3DyqXZFxpELC7KVnFOS48ylbz2pIh7yKj8%26expires%3D1759244399%26allow_ip%3D%26allow_referer%3D%26signature%3DjPeM0lC4oHBt7e8m7Htt0tpTy1A%253D)

\- 모두 한 5분? 걸린것 같다. 프로젝트를 처음 시작한다고 가정했을때, 매우 유용할것 같지 않나?

\- 결과물도 확인

![](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdna%2Fn8K2B%2FbtsPM3faRWh%2FAAAAAAAAAAAAAAAAAAAAAOpmaTzQdA_e9QmLAJr6CR9T2I4wxIco_iLBCCNBS1Cc%2Fimg.png%3Fcredential%3DyqXZFxpELC7KVnFOS48ylbz2pIh7yKj8%26expires%3D1759244399%26allow_ip%3D%26allow_referer%3D%26signature%3Dhmax2ankt%252BzTxNambBlijP8sY4s%253D)

![](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdna%2FdmqPdo%2FbtsPNIO8CJm%2FAAAAAAAAAAAAAAAAAAAAAOsCPPmTPUgsOCNxx0VU2tMutgRdXZSxh8ikB2REdWDn%2Fimg.png%3Fcredential%3DyqXZFxpELC7KVnFOS48ylbz2pIh7yKj8%26expires%3D1759244399%26allow_ip%3D%26allow_referer%3D%26signature%3DhMnS7LhcgIx5Af0IjM6q%252FdnigmU%253D)

![](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdna%2FrsW2x%2FbtsPNf7tscx%2FAAAAAAAAAAAAAAAAAAAAAMJLD1j_8wazFeVqvggpvRor8XC7t0Z-gbzdmqf8y0Jb%2Fimg.png%3Fcredential%3DyqXZFxpELC7KVnFOS48ylbz2pIh7yKj8%26expires%3D1759244399%26allow_ip%3D%26allow_referer%3D%26signature%3DwLck9UqI9kUX%252BGi6tuld0WnqXYA%253D)

\- Fake Data이지만 아직 Backend를 연동하지 않았기 때문일 뿐, 바로 이어서 상기 튜토리얼의 Backend, Database 설계까지 쭉 이어 나간다면 아마 초기설정이 매우 편하게 되는것을 볼 수 있을 것 이다.

\- 그리고 나중에 살펴보겠지만, 보통 이정도의 결과물을 만들다가 토큰 사용량을 다 쓰는 일이 비일 비재한데, 완성후에도 아직 토큰이 다 소진 되지 않을 것으로 보아, context를 잘 관리하고 있어 token 사용량도 오히려 아낄 수 있지 않았을까??

![](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdna%2FbeU5V7%2FbtsPOqtTppP%2FAAAAAAAAAAAAAAAAAAAAAKNPE5qgCBBL9_yy6dSmOAz4H15eIQXp3R_ioOg0s9nv%2Fimg.png%3Fcredential%3DyqXZFxpELC7KVnFOS48ylbz2pIh7yKj8%26expires%3D1759244399%26allow_ip%3D%26allow_referer%3D%26signature%3Dp2yS824e%252B7IVZEEMr84H5IZxDo8%253D)

\- 그리고 이외에도 써보면 좋은 도구들이 많은데 너무 내용도 길어지기도 하거니와 직접 해보는것도 추천한다.

\- 마지막으로 cleanup 사용 예시

![](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdna%2Fb3Ihzy%2FbtsPO27odSz%2FAAAAAAAAAAAAAAAAAAAAAAL9GAHae2c8n_2je34vWlwaIoAVLZuCFXfJskRCaQkn%2Fimg.png%3Fcredential%3DyqXZFxpELC7KVnFOS48ylbz2pIh7yKj8%26expires%3D1759244399%26allow_ip%3D%26allow_referer%3D%26signature%3DNxdl6Z8Uea1nRljX8OKx3GgHWjI%253D)

![](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdna%2Fdb4phR%2FbtsPN7BkykT%2FAAAAAAAAAAAAAAAAAAAAAOzOISFD7nbJ2cwj-AXwDsbBhc78IwBN8Z9YST2YQshy%2Fimg.png%3Fcredential%3DyqXZFxpELC7KVnFOS48ylbz2pIh7yKj8%26expires%3D1759244399%26allow_ip%3D%26allow_referer%3D%26signature%3DHsIR5tEMDmeYeQqaIe5yTMUCAOE%253D)

![](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdna%2FdysK2p%2FbtsPNDNZMLT%2FAAAAAAAAAAAAAAAAAAAAAAh7yEoRmGa1O5NNhibTx-CsTeQqokVTi6fvKKsdD8g9%2Fimg.png%3Fcredential%3DyqXZFxpELC7KVnFOS48ylbz2pIh7yKj8%26expires%3D1759244399%26allow_ip%3D%26allow_referer%3D%26signature%3Dogb%252BKPN6YZ38r5nDOH9L7XWrCYI%253D)

ex)clean up 옵션

\- 정리 범위 옵션

\- 분석 수준 옵션

```bash
--deep              # 깊은 분석 (시간이 오래 걸리지만 정확)
--quick             # 빠른 정리 (기본적인 정리만)
--aggressive        # 공격적 정리 (더 많이 제거)
--safe              # 안전한 정리 (확실한 것만 제거)
```

\- 실행 방식 옵

```bash
--dry-run           # 실제 변경 없이 미리보기만
--interactive       # 하나씩 확인하며 정리
--auto              # 자동으로 모든 정리 실행
--backup            # 정리 전 백업 생성
```

\- 대상 지정 옵션

```bash
--directory [path]  # 특정 디렉토리만
--file [filename]   # 특정 파일만
--extension [ext]   # 특정 확장자만 (.js, .ts 등)
--exclude [pattern] # 제외할 패턴 지정
```

ex) 기본 정리 방법

ex) 특정 영역 정리

```bash
# src 폴더만 정리
/sc:cleanup --code --directory src

# TypeScript 파일만 정리
/sc:cleanup --code --extension .ts

# 특정 파일만 정리
/sc:cleanup --code --file UserComponent.tsx

# node_modules 제외하고 정리
/sc:cleanup --all --exclude node_modules
```

ex) 리액트 프로젝트 정리

```bash
# React 컴포넌트 정리
/sc:cleanup --code --imports --directory src/components

# 사용하지 않는 스타일 정리
/sc:cleanup --files --extension .css --extension .scss

# 전체 React 프로젝트 정리
/sc:cleanup --all --safe --exclude node_modules --exclude build
```

### 고급 기능: 파라미터 조절과 최적화

'대시 대시' 옵션으로 페르소나, 시퀀셜, 플랜 등을 상세하게 조절할 수 있다.

효율 컨트롤, MCP 강제 사용, 오케스트레이션 등 다양한 고급 기능도 제공한다.

#### 고급 파라미터 활용법

```makefile
# 상세 플랜 수립 및 검토
/sc:design --plan --persona-architect --sequential

# 울트라 압축 모드로 효율성 극대화
/sc:implement --ultracompressed --magic

# MCP 강제 사용으로 정확도 향상
/sc:analyze --force-mcp --context7

# 여러 서브에이전트 동시 제어
/sc:orchestrate --multi-agent --parallel
```

**Ultra Compressed 모드 활용**  
`--ultracompressed` 플래그를 사용하면 토큰 사용량을 크게 줄이면서도 핵심 기능은 유지할 수 있다.  
특히 대용량 프로젝트나 반복 작업에서 비용 효율성이 뛰어나다.

\- 이번 글에서는 너무 길어질 수 있어 단편적인 예시를 작성 할 수 밖에 없었다. 어떻게 추가 글을 작성하면 이해도를 높일 수 있을까 하여 다음글을 작성하였으니 참고 부탁 드립니다.

[2025.08.12 - \[AI/Claude\] - Claude Code + SuperClaude 조합(2): SuperClaude 사용 예시 (React 프로젝트 화면 버그 수정)](https://goddaehee.tistory.com/389)

### 사용 팁

초기 적응 단계

- 기본 명령어만 사용: /sc:analyze, /sc:implement, /sc:improve
- 자동 활성화를 신뢰하고 플래그는 필요시에만 추가
- \--preview와 --safe-mode를 적극 활용

익숙해진 이후 딥 하게 파보고 싶을때

- \--introspect로 SuperClaude 동작 이해
- 페르소나 조합으로 다각도 분석
- \--focus로 특정 영역 타겟팅
- MCP 플래그들을 상황에 맞게 조합

팀 작업용 커맨드들도 활용

- \--document로 작업 과정 문서화
- \--git으로 일관된 커밋 메시지
- \--validate로 코드 품질 보장

### 내용 정리

- **플랜 기능 활용**: 작업 전 반드시 `--plan` 플래그로 계획 수립 및 검토
- **페르소나 자동 선택**: 별도 입력 없이 컨텍스트에 맞게 자동 활성화
- **MCP 자동 트리거**: 컨텍스트, 시퀀셜, 매직 등이 상황에 맞게 자동 실행
- **울트라 압축 모드**: 반복 작업이나 대용량 프로젝트에서 비용 효율성 극대화
- **서브에이전트 활용**: 여러 작업을 동시에 진행할 때 오케스트레이션 기능 활용
- **점진적 적용**: 간단한 명령어부터 시작해서 고급 기능으로 확장

### 자주 묻는 질문 ❓

Q: SuperClaude Framework는 정말 무료인가요?

A: 네, 완전 무료입니다. 오픈소스로 제공되며 11개 페르소나와 16개 커스텀 커맨드를 모두 무료로 사용할 수 있습니다. Claude Code 자체는 Claude Pro/Max 플랜이 필요하지만 SuperClaude Framework 추가 비용은 없습니다.

Q: 자동 트리거 기능이 어떻게 작동하나요?

A: 모든 MCP(명령어 프롬프트)가 자동으로 트리거되도록 미리 설정되어 있습니다. 컨텍스트, 시퀀셜, 매직 등이 상황에 맞게 자동 실행되며, 필요시 수동으로 강제 트리거도 가능합니다.

Q: 페르소나는 어떻게 선택되나요?

A: 11개 페르소나가 별도 입력 없이 작업 컨텍스트에 맞게 자동으로 선택됩니다. 물론 `--persona-frontend` 같은 플래그로 수동 지정도 가능합니다.

Q: 기존 Claude Code 설정에 영향을 주나요?

A: 아닙니다. ~/.claude/ 디렉토리에 추가 설정만 하므로 기존 설정과 충돌하지 않습니다. 언제든지 제거 가능합니다.

Q: 어떤 프로젝트에 가장 효과적인가요?

A: 어드민 페이지, 웹 애플리케이션, API 개발 등 풀스택 개발 프로젝트에서 특히 효과적입니다. UI 설계부터 데이터베이스 연동까지 전 과정을 커버할 수 있습니다.

### 🚀 SuperClaude Framework의 미래

오픈소스 커뮤니티 기반으로 지속적인 발전이 기대되는 영역들:

- **추가 페르소나**: DevOps, 모바일, 데이터 사이언스 등 전문 영역 확장
- **커스텀 워크플로우**: 팀별, 프로젝트별 맞춤 명령어 세트
- **IDE 통합**: VS Code, Cursor 등 주요 IDE 플러그인
- **프로젝트 템플릿**: 자주 사용하는 프로젝트 구조 자동 생성
- **성능 모니터링**: 개발 효율성 측정 및 최적화 제안

## 주요 업데이트 히스토리

### 버전별 주요 변경사항

- **v3.0:**16개 커맨드로 통합, \`/sc:implement\` 도입 (기존 \`/build\` 대체)
- **v2.0:**페르소나 시스템 강화, 9개 인지 페르소나 통합
- **v1.0:**초기 릴리즈, 기본 커맨드 체계 구축

### SuperClaude Framework 핵심 가치

- **개발 효율성 극대화:**16개 전문 커맨드로 모든 개발 단계 커버
- **지능적 자동화:**11개 페르소나가 상황에 맞게 자동 활성화
- **품질 보장:**증거 기반 방법론으로 신뢰성 확보
- **토큰 최적화:**70% 토큰 절약으로 비용 효율성 달성
- **무료 오픈소스:**MIT 라이선스로 자유로운 사용

[저작자표시 비영리 변경금지 (새창열림)](https://creativecommons.org/licenses/by-nc-nd/4.0/deed.ko)

#### ' > ' 카테고리의 다른 글

| [Claude Code GUI로 사용해보기 - Gooey(구이) 설치 및 사용방법\[(구)Claudia(클로디아)](https://goddaehee.tistory.com/396) (5) | 2025.08.29 |
| --- | --- |
| [Claude Code + SuperClaude 조합(2): SuperClaude 사용 예시 (React 프로젝트 화면 버그 수정)](https://goddaehee.tistory.com/389) (13) | 2025.08.12 |
| [Claude Code CLI (2) - 기본 사용 방법 (클로드 코드 - 고급 CLI 명령어 사용 방법)](https://goddaehee.tistory.com/380) (9) | 2025.08.01 |
| [Claude Code CLI (1) - 기본 사용 방법 (클로드 코드 기초 - 기본 명령어 사용 방법)](https://goddaehee.tistory.com/372) (11) | 2025.07.21 |
| [Claude Code 사용방법(설치방법) - Claude Code 시작하기 (Windows 환경\[wsl 미사용\] - 클로드 코드 사용방법(설치방법))](https://goddaehee.tistory.com/370) (10) | 2025.07.07 |

### TAG

, , , , , , , , ,[PREV](https://goddaehee.tistory.com/389)

[

### Claude Code + SuperClaude 조합(2): SuperClaude 사용 예시 (React 프로젝트 화면 버그 수정)

](https://goddaehee.tistory.com/389)

[댓글 14](https://goddaehee.tistory.com/#0)

- ![프로필사진](https://i1.daumcdn.net/thumb/C100x100/?fname=https://img1.daumcdn.net/thumb/C100x100/?scode=mtistory2&fname=https%3A%2F%2Ftistory1.daumcdn.net%2Ftistory%2F6725836%2Fattach%2F474123f4d3b94585940c1ab8ca36399e)
	[꽃단청](https://flowerdancheong.com/)
	갓대희님 잘 보고 갑니다! 공감❤!  
	오늘도 화이팅입니다!
- ![프로필사진](https://i1.daumcdn.net/thumb/C100x100/?fname=https://img1.daumcdn.net/thumb/C100x100/?scode=mtistory2&fname=https%3A%2F%2Ftistory1.daumcdn.net%2Ftistory%2F8134713%2Fattach%2F9e26173299c0469988d2b6a6d99d7f52)
	[zemorae](https://turntable.tistory.com/)
	갓대희님 정성 담긴 포스팅 잘 보고 갑니다^^
- ![프로필사진](https://i1.daumcdn.net/thumb/C100x100/?fname=https://img1.daumcdn.net/thumb/C100x100/?scode=mtistory2&fname=https%3A%2F%2Ftistory1.daumcdn.net%2Ftistory%2F5941241%2Fattach%2F26a1367668f74ae29371f1086cea6ed0)
	[초롱불잡화점](https://choronglight.com/)
	안녕하세요 갓대희님 좋은 가이드 올려주셔서 감사합니다.  
	질문이 한 가지 있는데요,  
	/sc 커멘드를 보니 되게 단편적인 프롬프트가 들어가는데( 'XX 컴포넌트', '대시보드')  
	실제 현업에서 쓰려면 좀더 구체적으로 프롬프트가 나와야 할텐데요.  
	이런 복잡한 요구사항도 대응하려면 어떻게 커멘드를 작성하면 좋을까요?
	- ㄴ
		![프로필사진](https://i1.daumcdn.net/thumb/C100x100/?fname=https://img1.daumcdn.net/thumb/C100x100/?scode=mtistory2&fname=https%3A%2F%2Ftistory1.daumcdn.net%2Ftistory%2F1994430%2Fattach%2F8b53fab4a06a48c9af35626f50806b94)
		이번에 쓴건 정말 예시이다 보니 단편적인 프롬프트만 썼었네요. 혹시나 도움이 될까해서 아주 간단한 예시 만들어 봤습니다.  
		  
		https://goddaehee.tistory.com/389  
		의도하신 내용을 잘 이해하고, 대답드린게 맞을지 모르겠네요.. ㅎㅎㅎ
		[수정/삭제](https://goddaehee.tistory.com/#)
	- ㄴ
		![프로필사진](https://i1.daumcdn.net/thumb/C100x100/?fname=https://img1.daumcdn.net/thumb/C100x100/?scode=mtistory2&fname=https%3A%2F%2Ftistory1.daumcdn.net%2Ftistory%2F5941241%2Fattach%2F26a1367668f74ae29371f1086cea6ed0)
		확인이 늦었네요 답변 감사드립니다 ^^
		[수정/삭제](https://goddaehee.tistory.com/#)
- ![프로필사진](https://i1.daumcdn.net/thumb/C100x100/?fname=https://img1.daumcdn.net/thumb/C100x100/?scode=mtistory2&fname=https%3A%2F%2Ftistory1.daumcdn.net%2Ftistory%2F6933052%2Fattach%2Fb4f4a28948f741d0be4320b012177183)
	[\_한스](https://setplist.tistory.com/)
	갓대희님 포스팅 잘 보고 갑니다. 입추가 지나서 그런지 약간 선선해진것 같네요.  
	좋은 하루 보내세요! ^^
- ![프로필사진](https://i1.daumcdn.net/thumb/C100x100/?fname=https://img1.daumcdn.net/thumb/C100x100/?scode=mtistory2&fname=https%3A%2F%2Ftistory1.daumcdn.net%2Ftistory%2F8166545%2Fattach%2F56e7d781293f4d439ac51e15fb18f750)
	[짱아빠~](https://infobox08964.tistory.com/)
	짱 잘봤습니다
- ![프로필사진](https://i1.daumcdn.net/thumb/C100x100/?fname=https://t1.daumcdn.net/tistory_admin/blog/admin/profile_default_04.png)
	알 수 없는 사용자
	잘 보고 갑니다!
- ![프로필사진](https://i1.daumcdn.net/thumb/C100x100/?fname=https://img1.daumcdn.net/thumb/C100x100/?scode=mtistory2&fname=https%3A%2F%2Ft1.daumcdn.net%2Ftistory_admin%2Fstatic%2Fmanage%2Fimages%2Fr3%2Fdefault_L.png)
	[욜로와요](https://yolo8484.tistory.com/)
	잘 보고갑니다~
- ![프로필사진](https://i1.daumcdn.net/thumb/C100x100/?fname=https://img1.daumcdn.net/thumb/C100x100/?scode=mtistory2&fname=https%3A%2F%2Ft1.daumcdn.net%2Ftistory_admin%2Fstatic%2Fmanage%2Fimages%2Fr3%2Fdefault_L.png)
	[한달동안](https://memo05034.tistory.com/)
	잘 보고갑니다~
- ![프로필사진](https://i1.daumcdn.net/thumb/C100x100/?fname=https://img1.daumcdn.net/thumb/C100x100/?scode=mtistory2&fname=https%3A%2F%2Ft1.daumcdn.net%2Ftistory_admin%2Fstatic%2Fmanage%2Fimages%2Fr3%2Fdefault_L.png)
	[정보왕창](https://moneypang3.tistory.com/)
	잘 보고갑니다~
- ![프로필사진](https://i1.daumcdn.net/thumb/C100x100/?fname=https://img1.daumcdn.net/thumb/C100x100/?scode=mtistory2&fname=https%3A%2F%2Ft1.daumcdn.net%2Ftistory_admin%2Fstatic%2Fmanage%2Fimages%2Fr3%2Fdefault_L.png)
	[인포info](https://info.pluscode.co.kr/)
	왔다 갑니다.
- ![프로필사진](https://i1.daumcdn.net/thumb/C100x100/?fname=https://img1.daumcdn.net/thumb/C100x100/?scode=mtistory2&fname=https%3A%2F%2Ft1.daumcdn.net%2Ftistory_admin%2Fstatic%2Fmanage%2Fimages%2Fr3%2Fdefault_L.png)
	[하이효이](https://hi.pluscode.co.kr/)
	방문 도장 꾹 찍고 갑니다~
- ![프로필사진](https://i1.daumcdn.net/thumb/C100x100/?fname=https://img1.daumcdn.net/thumb/C100x100/?scode=mtistory2&fname=https%3A%2F%2Ft1.daumcdn.net%2Ftistory_admin%2Fstatic%2Fmanage%2Fimages%2Fr3%2Fdefault_L.png)
	[문자life](https://life.pluscode.co.kr/)
	들렸다 갑니다~

**소중한 공감 감사합니다**

💡 AI 관련 질문이 있나요? 눌러보세요!