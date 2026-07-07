# 練習測驗系統 PQS

這是一個單檔式 HTML 練習測驗系統，適合用來整理、匯入與練習資安證照或大型題庫，例如 EDRP、CEH、CTIA、OSCP 等。

目前正式入口檔為 `public/index.html`，部署於 Vercel，並接入 Supabase 題庫與學習統計同步。使用者進入首頁前需輸入名稱，以便題庫、錯題與學習紀錄依使用者分流。

正式線上版：

```text
https://pqs-quiz.vercel.app
```

---

## 文件導覽

- [開發人員指南](docs/DEVELOPMENT.md)
- [Codex Agent 專案規則](AGENTS.md)

---

## 主要功能

- 使用者名稱訪問頁，讓題庫、錯題與學習紀錄可依使用者分流
- 題庫匯入支援 `.json`、`.csv`、`.txt`
- 可自動分辨選擇題與填空題
- 題庫可保存於本機，並同步至 Supabase
- 換設備後可透過 Supabase 回補題庫與學習資料
- 測驗模式支援打亂題目、打亂選項、答案提示、錯題模式、隱藏已答對題目與隱藏作答計時器
- 出題設定支援全部題目、指定題數與指定題號範圍
- 測驗中支援作答計時、題目導覽、Mark 標記、自動捲動與本次錯題再次測驗
- 學習統計支援正確率歷史、每題作答次數、答對率、最後作答日期與重置該題庫統計
- 支援明暗模式
- 支援手機與桌面自適應排版

---

## 使用方式

### 線上使用

開啟正式線上版：

```text
https://pqs-quiz.vercel.app
```

使用流程：

1. 輸入使用者名稱
2. 進入題庫控制台
3. 從歷史題庫選擇既有題庫，或上傳 `.json`、`.csv`、`.txt` 題庫
4. 設定測驗模式與出題範圍
5. 點擊「開始測驗」
6. 完成後查看統計、再次測驗或只重測錯題

### 本機開發

本機開發、環境安裝、Vercel / Supabase 設定、版本規則與部署流程，請閱讀：

```text
docs/DEVELOPMENT.md
```

---

## 目前狀態

```text
專案名稱：練習測驗系統 PQS
Vercel 專案名稱：pqs
正式網域：pqs-quiz.vercel.app
正式入口檔：public/index.html
目前架構：單檔前端主架構
資料同步：Supabase
部署平台：Vercel
```

目前 `public/index.html` 同時作為訪問頁、首頁、測驗主頁與統計頁。

後續若需要拆分多個 HTML / JS / API 檔案，會依版本迭代調整。

---

## 目前與未來結構規劃

目前 `public/index.html` 同時作為訪問頁、首頁、測驗主頁與統計頁。

Supabase 目前先由前端 REST API 進行使用者、題庫與統計同步。

未來若使用者明確要求拆分架構，考試頁預計使用 `/quiz` 路由，`api/index.js` 作為 Vercel Serverless Function，負責連接 Supabase 與處理後端邏輯。

規劃結構如下：

```text
quiz-system/
├── public/
│   ├── index.html
│   ├── 其他各種頁.html
│   └── quiz.html
├── api/
│   └── index.js
├── scripts/
│   └── generate-env.js
├── supabase/
│   └── migrations/
├── package.json
└── vercel.json
```

後續拆分原則：

```text
1. 使用者明確要求後才拆分
2. 拆分前先確認現有 public/index.html 功能完整
3. 拆分後同步更新 README.md、AGENTS.md 與 docs/DEVELOPMENT.md
4. 拆分後仍需保留 Vercel production 驗收流程
5. Supabase service role / secret key 只能放在後端或安全環境，不可暴露在前端
```

---

## 檔案策略摘要

目前主分支核心檔案：

```text
README.md
AGENTS.md
docs/DEVELOPMENT.md
.gitignore
public/index.html
scripts/generate-env.js
supabase/migrations/
package.json
package-lock.json
vercel.json
```

以下是本機產物或敏感設定，不提交到 Git：

```text
.local/
.env.local
.vercel/
node_modules/
public/env.js
.vercel-dev-*.log
```

平常主要修改：

```text
public/index.html
```

歷史版本不再以 `quiz_v*.html`、`quiz_v12.html` 等版本備份檔保留在主分支。  
版本保存交給 Git tag 與 GitHub Release。

詳細開發與版本規則請閱讀：

```text
docs/DEVELOPMENT.md
AGENTS.md
```

---

## 架構圖摘要

此架構圖用來快速理解目前 `public/index.html` 的主要畫面區塊與程式責任。更完整、給 Codex 維護用的架構細節請閱讀 `AGENTS.md`。

```text
練習測驗系統
├── public/index.html
│   ├── Head
│   │   └── 內建 CSS
│   │       ├── 全域版面與明暗模式
│   │       ├── 首頁控制台樣式
│   │       ├── 測驗雙欄版面
│   │       ├── 學習統計頁
│   │       ├── 動態 header / footer
│   │       └── 手機 RWD 版面
│   │
│   ├── Body
│   │   ├── .exam-header
│   │   │   ├── 系統名稱 / 返回首頁
│   │   │   ├── 手機考試中三條線題目面板開關
│   │   │   ├── 明暗模式切換器
│   │   │   ├── 使用者頭像與使用者選單
│   │   │   └── 作答計時器 #examTimer，首頁隱藏、測驗中顯示
│   │   │
│   │   ├── #accessSection
│   │   │   └── 使用者名稱訪問頁，進入首頁前設定目前使用者
│   │   │
│   │   ├── #managementSection
│   │   │   ├── 首頁標題與說明
│   │   │   ├── 題庫控制台
│   │   │   ├── 測驗模式設定
│   │   │   └── 出題範圍設定
│   │   │
│   │   ├── #statsSection
│   │   │   ├── 共用首頁 Matrix 背景
│   │   │   ├── 正確率歷史
│   │   │   ├── 最近測驗紀錄
│   │   │   └── 題庫學習統計摘要
│   │   │
│   │   ├── #quizSection
│   │   │   ├── 題目區
│   │   │   ├── 結算區
│   │   │   └── 題目導覽區
│   │   │
│   │   └── .exam-footer
│   │       ├── 作答提示
│   │       └── 完成作答按鈕
│   │
│   └── Script
│       ├── 系統初始化與設定保存
│       ├── 題庫快取與管理
│       ├── 檔案上傳與解析
│       ├── 測驗 session 建立
│       ├── 考題渲染與互動
│       └── 結算、錯題與學習統計
│
├── scripts/generate-env.js
├── supabase/migrations/
├── package.json
└── vercel.json
```

---

## 更新紀錄摘要

### v13.3.2

- 拆分並整理專案文件：新增 `AGENTS.md` 與 `docs/DEVELOPMENT.md`
- 補充新環境架設、本機 `localhost:5500` 驗收、Playwright MCP 與 Vercel production 驗收流程
- 新增 Playwright 測試套件與 `package-lock.json`，讓新電腦可用 `npm install` 重建一致環境
- 補充本機產物與敏感設定的 Git 規則，明確排除 `.local/`、`.env.local`、`.vercel/`、`node_modules/` 與 `public/env.js`

### v13.3.1

- 將刪除題庫按鈕改為 SVG icon，避免 iPhone 將 emoji 垃圾桶渲染成彩色圖示
- 題庫下拉選單預設置中顯示，只有目前文字超出可視寬度時才改為左對齊
- 手機版 header 標題改為依可用寬度動態縮寫
- 首頁 header 新增使用者頭像與使用者選單
- 首頁隱藏作答計時器，切換到測驗時才顯示計時資訊
- 修正頭像選單被 header 裁切的問題
- 優化測驗模式排列，桌面版採三欄分組，手機版維持單欄操作順序
- 進入首頁時先顯示本機資料，再背景同步 Supabase，降低首頁等待時間
- 保留「正在載入雲端資料...」狀態提示，同時讓首頁面板先顯示，雲端回補完成後再清除提示

### v13.3.0

- 新增使用者名稱訪問頁與 Supabase 使用者資料表規劃
- 啟動時依使用者回補題庫、統計、錯題與答對紀錄
- 學習統計新增重置統計按鈕
- 尚未有考試紀錄的題庫仍可進入學習統計頁

### v13.2.0

- 將正式入口檔移至 `public/index.html`
- 新增 Supabase migration
- 新增 `scripts/generate-env.js`
- 題庫、錯題與學習統計在保留 LocalStorage 的同時背景同步至 Supabase

### v13.1.0

- 將 Vercel 專案正式命名為 `pqs`
- 新增 `package.json`、`vercel.json` 與 `.gitignore`
- 正式 Vercel 網域設定為 `pqs-quiz.vercel.app`

### v13.0.0

- 將正式線上版入口由 `quiz.html` 改為 `index.html`
- 先完成 GitHub + Vercel 線上版部署基礎

### v12.1.1

- 調整首頁提示區塊 summary 箭頭位置，桌面版與手機版皆保留左側內距，避免箭頭貼齊邊框

### v12.1.0

- 手機版考試中題目面板改為 header 三條線控制的左側抽屜，支援點空白處收合與面板內獨立滑動
- 手機版 header、footer、首頁題庫控制列與結算區按鈕排版優化
- 桌面版與手機版結算區統一為同寬置中按鈕，僅錯題開關貼齊再次測驗左側
- header、footer 與計時器在亮色/深色模式下保持一致暗色視覺
- 統計頁套用首頁 Matrix 背景，結束作答返回首頁時重置計時器
- 深色模式新增 Mark 標記按鈕配色
