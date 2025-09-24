# 케어온 고객 가입 시스템 (Care On Customer Enrollment System)

## 프로젝트 개요
케어온 사업자를 위한 9단계 고객 가입 시스템입니다. Next.js 14와 TypeScript로 구축되었으며, 한국 사업자 등록 시스템에 최적화되어 있습니다.

## ⚠️ 개발 필수 가이드

### 📚 문서 참조 필수사항
본 프로젝트의 모든 개발 작업은 **반드시** `docs/` 폴더의 관련 문서를 숙지한 후 진행해야 합니다.

#### 핵심 참조 문서
- **`docs/고객 가입 시스템(리뉴얼)/`**: 전체 시스템 설계 및 요구사항
  - `고객 가입 시스템(리뉴얼).canvas`: 전체 시스템 플로우 및 UI 설계
  - `필요서류.md`: 각 단계별 필요 서류 및 데이터 요구사항
  - `데이터베이스 설계/`: 각 단계별 상세 데이터 스키마 및 비즈니스 로직
    - `1. 기본정보입력.md`: Step 1-3 상세 명세
    - `2. 신청유형선택.md`: Step 4-5 상세 명세  
    - `3. 비대면 가맹 신청.md`: Step 6-9 상세 명세
  - `카드사 동의서/`: 각 카드사별 동의서 양식 및 필드 정보

#### 개발 시 주의사항
1. **컴포넌트 개발 전**: 해당 단계의 데이터베이스 설계 문서 숙지
2. **폼 필드 추가 시**: 필요서류.md에서 데이터 타입 및 검증 규칙 확인
3. **UI/UX 구현 시**: canvas 파일의 디자인 가이드라인 준수
4. **카드사 연동 시**: 해당 카드사 동의서 문서의 필드 매핑 정보 활용

⚠️ **문서 미참조로 인한 재작업을 방지하기 위해 반드시 관련 문서를 먼저 검토하시기 바랍니다.**

### 🛠️ MCP (Model Context Protocol) 활용 권장

본 프로젝트에서는 **MCP 도구의 적극적인 활용**을 통해 개발 효율성을 극대화하시기 바랍니다.

#### 주요 MCP 활용 시나리오

**1. 문서 분석 및 정보 추출**
```bash
# 데이터베이스 설계 문서에서 필드 정보 추출
mcp_Desktop_Commander_read_file("docs/고객 가입 시스템(리뉴얼)/데이터베이스 설계/1. 기본정보입력.md")

# 여러 카드사 동의서 비교 분석
mcp_Desktop_Commander_read_multiple_files([
  "docs/고객 가입 시스템(리뉴얼)/카드사 동의서/국민카드-동의서.md",
  "docs/고객 가입 시스템(리뉴얼)/카드사 동의서/비씨카드-동의서.md"
])
```

**2. 코드베이스 검색 및 분석**
```bash
# 특정 컴포넌트나 함수 위치 검색
mcp_Desktop_Commander_start_search("path", "CareonInput", searchType="files")

# 비즈니스 로직 패턴 검색
mcp_Desktop_Commander_start_search("path", "validation", searchType="content")
```

**3. 실시간 개발 및 테스트**
```bash
# Python을 활용한 데이터 검증 로직 테스트
mcp_Desktop_Commander_start_process("python3 -i")
mcp_Desktop_Commander_interact_with_process(pid, "import re; 사업자등록번호_패턴 = r'\d{3}-\d{2}-\d{5}'")

# Node.js를 활용한 TypeScript 타입 검증
mcp_Desktop_Commander_start_process("node -i")
```

**4. 파일 구조 최적화**
```bash
# 프로젝트 구조 분석
mcp_Desktop_Commander_directory_tree("/home/tlswk/projects/careon/care_on_form")

# 컴포넌트 파일 일괄 처리
mcp_Desktop_Commander_search_files("components/enrollment", "step-*.tsx")
```

#### MCP 활용 이점
- **문서 기반 개발**: docs/ 폴더의 모든 문서를 실시간 참조하며 개발
- **일관성 보장**: 기존 코드 패턴 분석을 통한 일관된 코드 스타일 유지
- **빠른 프로토타이핑**: 실시간 코드 테스트 및 검증
- **효율적인 디버깅**: 로그 분석 및 에러 추적

💡 **권장사항**: 새로운 기능 개발 시 MCP를 활용하여 관련 문서 검토 → 기존 코드 패턴 분석 → 프로토타입 개발 → 테스트 순서로 진행하시기 바랍니다.

### 📝 Git 워크플로우 필수사항

본 프로젝트에서는 **모든 수정 완료 시마다 즉시 GitHub 커밋**을 수행해야 합니다.

#### 필수 커밋 규칙

**1. 수정 완료 즉시 커밋**
```bash
# 수정사항 스테이징
git add .

# 커밋 메시지 작성 (한국어 사용)
git commit -m "feat: 대표자 정보 입력 컴포넌트 Progressive UI 구현"

# 원격 저장소 푸시
git push origin main
```

**2. 커밋 메시지 컨벤션**
- **feat**: 새로운 기능 추가
- **fix**: 버그 수정
- **docs**: 문서 수정
- **style**: 코드 포맷팅, 세미콜론 누락 등
- **refactor**: 코드 리팩토링
- **test**: 테스트 코드 추가/수정
- **chore**: 빌드 업무 수정, 패키지 매니저 수정

**3. 커밋 메시지 예시**
```bash
git commit -m "feat: 통신사 선택 드롭다운 컴포넌트 구현"
git commit -m "fix: 사업자등록번호 검증 로직 오류 수정"
git commit -m "docs: CLAUDE.md 개발 가이드 섹션 추가"
git commit -m "style: CareonButton 컴포넌트 Tailwind 클래스 정리"
git commit -m "refactor: 폼 검증 유틸 함수 분리 및 최적화"
```

#### 작업 단위별 커밋 원칙

**🔄 즉시 커밋해야 하는 상황:**
- [ ] 새로운 컴포넌트 완성 시
- [ ] 기존 컴포넌트 기능 수정 완료 시
- [ ] 버그 수정 완료 시
- [ ] 문서 업데이트 완료 시
- [ ] 타입 정의 추가/수정 시
- [ ] 스타일링 적용 완료 시
- [ ] API 라우트 구현 완료 시

**📦 권장 커밋 크기:**
- 한 번의 커밋은 **하나의 완성된 기능 단위**로 제한
- 파일 5개 이하의 변경사항으로 구성
- 코드 리뷰가 용이한 크기로 유지

#### GitKraken MCP 활용
```bash
# Git 상태 확인
mcp_GitKraken_git_status("./")

# 변경사항 스테이징 및 커밋
mcp_GitKraken_git_add_or_commit("./", "add")
mcp_GitKraken_git_add_or_commit("./", "commit", message="feat: 새로운 기능 구현")

# 원격 저장소 푸시
mcp_GitKraken_git_push("./")
```

⚠️ **중요**: 작업 중 임시 저장이 필요한 경우 `git stash`를 활용하되, **작업 완료 시 반드시 커밋**을 수행하여 변경 이력을 보존하시기 바랍니다.

💡 **팁**: 각 단계별 컴포넌트 개발 완료 시마다 개별 커밋을 수행하면, 문제 발생 시 해당 단계로 쉽게 롤백할 수 있습니다.

## 기술 스택
- **프레임워크**: Next.js 14.2.16 (App Router)
- **언어**: TypeScript 5
- **스타일링**: Tailwind CSS v3
- **데이터베이스**: Supabase PostgreSQL
- **상태 관리**: React useState (로컬 폼 상태)
- **주소 API**: Daum 우편번호 서비스

## 프로젝트 구조
```
care_on_form/
├── app/
│   ├── enrollment/          # 가입 프로세스 페이지
│   └── layout.tsx           # 루트 레이아웃
├── components/
│   ├── enrollment/          # 가입 단계별 컴포넌트
│   │   ├── step-1-owner-info.tsx        # 대표자 정보
│   │   ├── step-2-contact-business.tsx  # 사업자 정보
│   │   ├── step-3-store-info.tsx        # 매장 정보
│   │   ├── step-4-application-type.tsx  # 신청 유형
│   │   ├── step-5-business-type.tsx     # 업종 선택
│   │   ├── step-6-ownership-type.tsx    # 점포 소유 형태
│   │   ├── step-7-license-type.tsx      # 인허가 종류
│   │   ├── step-8-business-category.tsx # 업종 카테고리
│   │   └── step-9-confirmation.tsx      # 최종 확인
│   └── ui/                  # 재사용 가능한 UI 컴포넌트
│       ├── careon-button.tsx
│       ├── careon-container.tsx
│       ├── careon-input.tsx
│       ├── careon-bottom-sheet.tsx
│       └── careon-carrier-select.tsx
├── lib/
│   └── utils.ts            # 유틸리티 함수
└── docs/                   # 프로젝트 문서
    └── 고객 가입 시스템(리뉴얼)/
        └── 데이터베이스 설계/
```

## 주요 기능

### 1. 9단계 가입 프로세스
- **Step 1**: 대표자 본인 정보 (성명, 생년월일, 주민번호, 통신사, 휴대폰 번호)
  - Progressive field display (순차적 필드 표시)
  - 통신사 선택 UI
- **Step 2**: 사업자 정보 (상호명, 사업자등록번호)
- **Step 3**: 매장 정보 (간판명, 주소, 면적)
  - Daum 우편번호 검색 통합
  - 상호명과 동일 체크박스
- **Step 4**: 신청 유형
- **Step 5**: 업종 선택
- **Step 6**: 점포 소유 형태
- **Step 7**: 인허가 종류
- **Step 8**: 업종 카테고리
- **Step 9**: 최종 확인 및 제출

### 2. UI 컴포넌트 시스템
모든 UI 컴포넌트는 "careon-" 접두사를 사용합니다:
- `CareonButton`: 기본 버튼 컴포넌트
- `CareonContainer`: 페이지 컨테이너
- `CareonInput`: 텍스트 입력 필드
- `CareonBottomSheet`: iOS 스타일 바텀 시트
- `CareonCarrierSelect`: 통신사 선택 드롭다운

### 3. 한국 비즈니스 특화 기능
- 주민등록번호 형식 지원 (생년월일 6자리 + 성별 1자리)
- 사업자등록번호 검증 (10자리)
- 한국 통신사 선택 (SKT, KT, LG U+, 알뜰폰)
- Daum 우편번호 API 통합

## 개발 환경 설정

### 필수 요구사항
- Node.js 18.0 이상
- npm 또는 yarn

### 설치 및 실행
```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 프로덕션 빌드
npm run build

# 린트 검사
npm run lint
```

### 환경 변수
`.env` 파일에서 다음 변수를 설정하세요:
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## 코드 스타일 가이드

### TypeScript
- 명시적 타입 선언 사용
- interface를 type alias보다 선호
- Props 타입은 컴포넌트명 + Props 형식

### React
- 함수형 컴포넌트 사용
- Custom hooks는 `use` 접두사 사용
- 상태 관리는 필요시에만 Context API 사용

### 네이밍 규칙
- 컴포넌트: PascalCase
- 함수/변수: camelCase
- 상수: UPPER_SNAKE_CASE
- 파일명: kebab-case

## 데이터 구조

### FormData 타입
```typescript
type FormData = {
  // Step 1 - 대표자 정보
  ownerName: string
  birthDate: string
  birthGender: string
  phoneNumber: string

  // Step 2 - 사업자 정보
  businessName: string
  businessNumber: string

  // Step 3 - 매장 정보
  storeName: string
  storePostcode: string
  storeAddress: string
  storeArea: string

  // Step 4-9 필드들...
}
```

## 주요 개선 사항 (최근 업데이트)

### 2024년 업데이트
1. **컴포넌트 네이밍 표준화**
   - 모든 UI 컴포넌트를 `careon-` 접두사로 통일
   - Toss, iOS 등의 외부 브랜드 네이밍 제거

2. **Progressive Field Display**
   - Step 1에서 필드가 순차적으로 나타나는 UX 구현
   - 이전 필드 입력 완료 시 다음 필드 자동 표시

3. **우편번호 검색 기능**
   - Daum Postcode API 통합
   - 모달 기반 주소 검색 UI

## 테스트
```bash
# 단위 테스트 (준비 중)
npm run test

# E2E 테스트 (준비 중)
npm run test:e2e
```

## 배포
프로덕션 배포는 Vercel을 통해 자동화되어 있습니다.

## 문제 해결

### 일반적인 문제
1. **Module not found 오류**
   - `npm install` 재실행
   - `.next` 폴더 삭제 후 재빌드

2. **Tailwind CSS 관련 오류**
   - Tailwind v3 사용 확인
   - PostCSS 설정 확인

## 기여 가이드
1. Feature 브랜치 생성
2. 변경사항 커밋
3. Pull Request 생성
4. 코드 리뷰 후 병합

## 라이선스
Private - 케어온 내부 사용

## 연락처
프로젝트 관련 문의는 케어온 개발팀으로 연락주세요.

---
*이 문서는 Claude AI Assistant를 위해 작성되었으며, 프로젝트의 전반적인 이해를 돕기 위한 가이드입니다.*