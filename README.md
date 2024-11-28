# 📬 오픈프차

![openfranchise](https://github.com/user-attachments/assets/09bca0b8-4da8-4191-b287-6b2bab86c13f)

## 🎙️ 소개

공정거래위원회의 가맹사업 정보공개서를 기반으로 창업 전, 프랜차이즈 본사 정보, 브랜드의 매출, 가맹점 수, 인테리어 금액, 창업 비용 정보를 편리하게 확인할 수 있습니다.  
지속적인 개발로 커뮤니티까지 출시 계획이 예정되어 있습니다.

### [🔗 오픈프차 URL](https://openfranchise.kr)

### 🔬 주요 기능

- **프랜차이즈 브랜드 검색**
  - 카테고리별 검색
  - 이름별 검색
  - 각종 데이터순 정렬
- **프랜차이즈 브랜드 정보 확인**
  - 본사 정보
  - 인테리어 금액
  - 창업 금액
  - 매출 정보
  - 가맹점 수
- **차트를 활용한 각종 데이터 시각화**
- **데스크톱 및 모바일 디바이스 대응**

## 💻 기술스택

### [🎨 Frontend](https://github.com/LasBe-code/open-franchise-frontend)

- NextJS 14 App Router
- tailwind css
- shadcn/ui
- Recharts
- Playwright + Docker를 이용한 e2e test 환경 구축
- Vercel을 이용한 배포

### [📡 Backend](https://github.com/LasBe-code/open-franchise-backend)

- NestJS
- Prisma
- PostgreSQL
- Swagger를 이용한 API 명세서 작성
- Github Actions + Private Docker Repository를 이용한 배포 자동화
- pm2를 이용한 배포환경 구성
  - 클러스터 모드
  - 분산 서비스
  - 모니터링
