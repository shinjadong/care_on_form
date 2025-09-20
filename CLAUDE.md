# 케어온 고객 가입 시스템 (Care On Customer Enrollment System)

## 프로젝트 개요
케어온 사업자를 위한 9단계 고객 가입 시스템입니다. Next.js 14와 TypeScript로 구축되었으며, 한국 사업자 등록 시스템에 최적화되어 있습니다.

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