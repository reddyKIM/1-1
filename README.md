# SK에너지 홍보 웹사이트

Astro 4.x와 React Islands 아키텍처를 활용해 구축한 SK에너지 브랜드 홍보용 정적 웹사이트입니다. Tailwind CSS, 타입스크립트, 접근성 우선 설계를 기반으로 ESG 대시보드와 인터랙티브 챗봇 임베드 포인트를 포함합니다.

## 주요 특징

- ⚡ **SSG + 고성능**: Astro 정적 빌드, 이미지 최적화(astro:assets 활용), 프리페치 활성화.
- ♿ **접근성 우선**: WCAG 2.1 AA 준수 지향, 시맨틱 마크업, 스킵 링크, 포커스 스타일, 명확한 색 대비.
- 🌗 **다크 모드**: 시스템 선호 감지 + 토글, CSS 변수 기반 테마 토큰.
- 📊 **ESG 대시보드**: React Island 기반 SVG 차트, KPI 카드, CSV 다운로드.
- 📰 **미디어 센터**: 태그 필터링 가능한 뉴스 카드, 마크다운 상세 페이지.
- 🤖 **Botpress WebChat**: 레이아웃 하단에 임베드 포인트(TODO 주석) 제공.
- 🚀 **CI/CD**: GitHub Actions → GitHub Pages 자동 배포(workflow_dispatch + main 브랜치 push 트리거).

## 시작하기

### 사전 준비

- Node.js 18 이상(권장 20)
- npm 9 이상

### 설치

```bash
npm install
```

> 네트워크 정책으로 인해 설치가 차단될 경우, 사내 레지스트리 사용 또는 npm proxy 설정을 확인하세요.

### 로컬 개발 서버

```bash
npm run dev
```

- 기본 포트: `http://localhost:4321`
- 수정 시 HMR로 즉시 반영됩니다.

### 정적 빌드

```bash
npm run build
```

### 미리보기

```bash
npm run preview
```

## 코드 품질 도구

- `npm run lint`: ESLint (Astro + React + a11y 규칙 포함)
- `npm run format`: Prettier (Astro 포맷 플러그인 포함)

## 프로젝트 구조

```
├── astro.config.mjs
├── data
│   ├── esg-kpi.json
│   ├── media.json
│   └── timeline.json
├── public
│   ├── logo.svg
│   └── robots.txt
├── src
│   ├── components
│   │   ├── Chart.jsx
│   │   ├── Footer.astro
│   │   ├── Hero.astro
│   │   ├── KpiCard.astro
│   │   ├── Navbar.astro
│   │   ├── TagFilter.jsx
│   │   ├── ThemeToggle.jsx
│   │   └── Timeline.astro
│   ├── layouts
│   │   └── BaseLayout.astro
│   └── pages
│       ├── about.astro
│       ├── business.astro
│       ├── careers.astro
│       ├── contact.astro
│       ├── esg.astro
│       ├── index.astro
│       └── media
│           ├── [slug].astro
│           └── index.astro
├── styles
│   ├── globals.css
│   └── tokens.css
└── .github/workflows/deploy.yml
```

## 접근성 & WCAG 체크리스트

- [x] 스킵 링크 제공
- [x] 시맨틱 Landmark(nav/main/footer)
- [x] 폼 라벨 및 aria 속성 제공
- [x] 키보드 포커스 스타일 커스터마이즈
- [x] 컬러 대비 4.5:1 이상 유지(테마 토큰 기반)

## SEO & 성능

- 메타/OG 태그, JSON-LD 조직 스키마(홈) 기본 제공
- `@astrojs/sitemap` + `robots.txt`
- 폰트 프리로드 및 프리커넥트 설정
- Astro prefetch 활성화, React Islands `client:visible/idle` 적용

## GitHub Pages 배포

1. GitHub 저장소 **Settings → Pages → Build and deployment**에서 Source를 `GitHub Actions`로 설정합니다.
2. `main` 브랜치에 push하면 `.github/workflows/deploy.yml`이 실행되어 자동으로 빌드 후 Pages에 배포합니다.
3. Actions 최초 실행 시 GitHub Pages 권한(권장: Organization → Settings → Pages)에 `Read and write` 권한이 있는지 확인하세요.
4. 맞춤 도메인을 사용하려면 `Settings → Pages → Custom domain`에서 도메인을 등록하고, DNS `CNAME`을 GitHub Pages 주소로 지정합니다. 이후 `public/CNAME` 파일에 도메인을 추가하면 고정됩니다.

## Botpress WebChat 연동

- `src/layouts/BaseLayout.astro` 하단의 `<!-- Botpress WebChat embed here -->` 주석 위치에 Botpress에서 발급받은 스니펫을 추가하세요.
- 필요한 환경 변수가 있다면 `public/env.example.json` 등을 생성해 팀과 공유하세요.

## 참고

- 옵션: Next.js 정적 내보내기 대안 브랜치(`nextjs-static`)를 구성하여 동일한 GitHub Pages 워크플로를 사용할 수 있습니다.
- Lighthouse(모바일) 90+를 목표로 성능/접근성/SEO를 튜닝했습니다. 추가 최적화가 필요하면 `astro build --verbose`로 분석하세요.
