# Game Project Portfolio Website

HTML, 순수 CSS, 순수 바닐라 JavaScript만 사용한 게임 프로젝트 포트폴리오 정적 웹사이트입니다.

## 실행 방법

1. VS Code에서 `game_portfolio_site` 폴더를 엽니다.
2. `index.html`을 브라우저로 열거나 VS Code Live Server 확장으로 실행합니다.
3. 배포 시 전체 폴더를 Netlify, Vercel, GitHub Pages 등에 업로드하면 됩니다.

## 폴더 구조

```text
game_portfolio_site/
├─ index.html
├─ README.md
├─ assets/
│  ├─ css/
│  │  └─ style.css
│  ├─ js/
│  │  ├─ data.js      # 프로젝트 정보, 문서 이름, 유튜브 영상 ID 수정
│  │  └─ main.js      # 카드 렌더링, 필터, 모바일 메뉴, 스크롤 애니메이션
│  ├─ images/         # 프로젝트 대표 이미지
│  └─ docs/           # PDF 문서 저장 위치
│     ├─ TOM/
│     ├─ Jangsanbeom/
│     └─ NineDragon/
```

## 프로젝트 정보 수정 방법

`assets/js/data.js`에서 아래 항목을 수정합니다.

- `title`: 프로젝트명
- `type`: 개인 프로젝트 / 팀 프로젝트 구분
- `genre`: 장르 설명
- `summary`: 프로젝트 소개
- `role`: 담당 영역
- `image`: 대표 이미지 경로
- `tags`: 프로젝트 키워드
- `youtubeId`: 유튜브 영상 ID

예시:

```js
youtubeId: "유튜브_영상_ID"
```

유튜브 URL이 `https://www.youtube.com/watch?v=ABC123`이라면 `youtubeId`에는 `ABC123`만 입력합니다.

## PDF 문서 교체 방법

아래 파일명을 그대로 사용하면 버튼 경로를 수정하지 않아도 됩니다.

- 개발제안서.pdf
- 캐릭터컨셉기획서.pdf
- 배경컨셉기획서.pdf
- 게임시스템기획서.pdf
- 레벨디자인기획서.pdf
- 게임UI디자인기획서.pdf
- 게임서비스기획서.pdf

프로젝트별 저장 위치는 다음과 같습니다.

- `assets/docs/TOM/`
- `assets/docs/Jangsanbeom/`
- `assets/docs/NineDragon/`

문서명을 바꾸고 싶다면 `assets/js/data.js`의 `documents` 배열을 수정하세요.

## 추천 업데이트 순서

1. `assets/images/`의 SVG 대표 이미지를 실제 프로젝트 이미지로 교체
2. `assets/docs/`에 PDF 문서 업로드
3. `assets/js/data.js`에서 유튜브 영상 ID 교체
4. `index.html` footer의 이메일과 유튜브 채널 주소 수정
5. 필요 시 `assets/css/style.css`의 색상 변수 수정

## 최상단 Hero 배경 이미지 교체 방법

최상단 타이틀 영역의 배경은 `assets/js/data.js`의 `site.heroBackground`에서 관리합니다.

```js
site: {
  heroBackground: "assets/images/hero-background.svg"
}
```

새 이미지를 `assets/images/` 폴더에 넣은 뒤 경로만 바꾸면 됩니다.

```js
site: {
  heroBackground: "assets/images/my-hero-background.svg"
}
```

권장 크기는 `1920x1080` 또는 `2560x1440`입니다. SVG, PNG, JPG, WebP를 사용할 수 있습니다.

## PDF 열람 구역 배경 이미지 교체 방법

프로젝트 탭을 눌렀을 때 바뀌는 PDF 열람 구역 배경은 각 프로젝트의 `archiveBackground`에서 관리합니다.

```js
archiveBackground: "assets/images/project-tom.svg"
```

카드 대표 이미지는 `image`, PDF 열람 구역 배경은 `archiveBackground`, 최상단 Hero 배경은 `site.heroBackground`를 수정하면 됩니다.
