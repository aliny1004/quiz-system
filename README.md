# 練習測驗系統

這是一個單檔式 HTML 練習測驗系統，適合用來整理、匯入與練習資安證照或大型題庫，例如 EDRP、CEH、CTIA、OSCP 等。專案自 `v13.0.0` 起以 `index.html` 作為 Vercel 線上版入口，目前主頁已移至 `public/index.html`，並先接入 Supabase 題庫與學習統計同步；使用者進入首頁前需輸入名稱，以便題庫、錯題與學習紀錄依使用者分流。後續再依版本迭代拆分多個 HTML / JS / API 結構。

**正式線上版：[`https://pqs-quiz.vercel.app`](https://pqs-quiz.vercel.app)**

## 主要功能

- 使用者名稱訪問頁，讓題庫與學習紀錄可依使用者分流
- 題庫匯入支援 `.json`、`.csv`、`.txt`，並自動分辨選擇題與填空題
- 題庫可保存於本機並同步至 Supabase，換設備後可回補題庫與學習資料
- 測驗模式支援打亂題目、答案提示、打亂選項、錯題模式、隱藏已答對題目與隱藏作答計時器
- 出題設定支援全部題目、指定題數與指定題號範圍
- 測驗中支援作答計時、題目導覽、Mark 標記、自動捲動與本次錯題再次測驗
- 學習統計支援正確率歷史、每題作答次數、答對率、最後作答日期與重置該題庫統計
- 支援明暗模式、手機與桌面自適應排版
- 支援 Git tag / GitHub Release 版本管理

## 使用方式

1. 開啟 `public/index.html`，或使用 Vercel 部署後的線上網址
2. 輸入使用者名稱進入題庫控制台
3. 從歷史題庫選擇既有題庫，或上傳 `.json`、`.csv`、`.txt` 題庫
4. 設定測驗模式與出題範圍
5. 點擊「開始測驗」
6. 完成後可查看統計、再次測驗或只重測錯題

## 檔案策略

主分支只保留：

```text
README.md
.gitignore
public/index.html
scripts/generate-env.js
supabase/migrations/
package.json
vercel.json
```

`v13.0.0` 起正式改為線上版入口檔 `index.html`；`v13.2.0` 起配合 Vercel 靜態輸出目錄，正式入口檔放在 `public/index.html`。歷史版本不再以 `quiz_v2.html`、`quiz_v3.html` 這種檔案形式保留在主分支。舊版會透過 Git tag 與 GitHub Release 保存，例如：

```text
v1.0.0
v2.0.0
...
v13.0.0
```

平常只修改 `public/index.html`。後續若使用者明確要求拆分多個 HTML / JS / API 檔案，再依新架構同步更新此檔案策略。

## 線上版部署規劃

- Vercel 專案名稱：`pqs`
- 正式 Vercel 網域：`pqs-quiz.vercel.app`（`pqs.vercel.app` 已被占用）
- 專案縮寫：`PQS`
- 目前狀態：單檔 `public/index.html` 靜態前端，已完成 GitHub + Vercel 線上版基礎，並接入 Supabase 題庫與學習統計同步
- 後續狀態：使用者明確下令後，再拆分為多個 HTML / JS / API 檔案

目前與未來結構規劃：

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

目前 `public/index.html` 作為訪問頁、首頁與測驗主頁，Supabase 先由前端 REST API 進行使用者、題庫與統計同步；未來拆分後，考試頁預計使用 `/quiz` 路由，`api/index.js` 作為 Vercel Serverless Function，負責連接 Supabase 與處理後端邏輯。

## 版本規則

- 版本號規則固定如下，但實際更新版本、commit、tag、push 與 GitHub Release 一律由使用者明確下令後才執行。
- 修補版本更新：修改第三個數字，例如 `v1.0.0` -> `v1.0.1`；用於 Bug 修正與優化，不影響舊功能，後面沒有其他數字。
- 小版本更新：修改第二個數字，第三個數字歸零，例如 `v1.0.0` -> `v1.1.0`；用於新增功能且舊功能正常、可相容。
- 大版本更新：修改第一個數字，第二、三個數字都歸零，例如 `v1.0.0` -> `v2.0.0`；用於重大改版，舊版可能不相容。

## 更新紀錄

### v13.3.1

- 將刪除題庫按鈕改為 SVG icon，避免 iPhone 將 emoji 垃圾桶渲染成彩色圖示
- 題庫下拉選單預設置中顯示，只有目前文字超出可視寬度時才改為左對齊
- 手機版 header 標題先縮為「練習測驗系統(PQS)」，更窄時才縮為 `PQS`
- 精簡 README 主要功能清單，移除偏實作細節的描述
- 優化測驗模式排列：桌面版採三欄分組，手機版維持單欄優先順序
- 首頁 header 新增使用者頭像與使用者選單，並在已記住使用者時直接進入首頁
- 首頁隱藏作答計時器，切換到測驗時才顯示計時資訊
- 修正頭像選單被 header 裁切而看不到的問題，並微調頭像文字置中
- 手機版 header 標題新增「練習測驗系統」中間縮寫階段，最窄時才顯示 `PQS`
- 手機版 header 標題再新增「測驗系統」縮寫階段，讓寬度不足時過渡更自然
- 將頭像縮寫字體改為較圓潤的字體序列
- Header 標題改為依實際可用寬度動態選擇最長可顯示文字，避免過早縮成 `PQS`
- 題庫下拉選單改為 layout 完成後重新計算置中狀態，修正剛載入時未置中的問題
- 修正桌面版 header 標題量測寬度過窄，導致明明空間足夠卻只顯示 `PQS` 的問題
- 測驗模式選項改為桌面三欄分組排序、手機單欄操作順序排序
- 進入首頁時先顯示本機資料，再背景同步 Supabase，避免等待雲端回補造成首頁延遲
- 首頁面板顯示提前到本機題庫初始化前，並避免每次重刷都重寫內建題庫，減少進首頁時的主執行緒卡頓
- 保留「正在載入雲端資料...」狀態提示，同時讓首頁面板先顯示，雲端回補完成後再清除提示

### v13.3.0

- 新增使用者名稱訪問頁與 Supabase 使用者資料表規劃；啟動時依使用者回補題庫、統計、錯題與答對紀錄
- 題庫選單預設文字簡化為「請選擇題庫」，刪除工具提示改為「刪除題庫」
- 手機首頁寬度不足時隱藏 header 作答時間，避免明暗模式開關擠到中央
- 學習統計新增重置統計按鈕，可清除該題庫的正確率歷史、每題統計與錯題紀錄，並同步刪除 Supabase 統計資料
- 尚未有考試紀錄的題庫仍可進入學習統計頁，並顯示空白統計狀態

### v13.2.0

- 將正式入口檔移至 `public/index.html`，配合 Vercel 靜態輸出目錄
- 新增 Supabase migration，建立題庫、答對紀錄、錯題歷史、正確率歷史與每題統計資料表
- 新增 `scripts/generate-env.js`，部署時產生前端可讀取的 Supabase 環境設定
- 題庫上傳、刪除、答對紀錄、錯題紀錄與學習統計會在保留 LocalStorage 的同時背景同步至 Supabase

### v13.1.0

- 將 Vercel 專案正式命名為 `pqs`
- 新增 `package.json` 與 `vercel.json`，建立線上版部署基礎設定
- 新增 `.gitignore`，避免提交 Vercel 本機連結與環境變數檔案
- 正式 Vercel 網域設定為 `pqs-quiz.vercel.app`（`pqs.vercel.app` 已被占用）
- 補充 GitHub + Vercel + Supabase 未來拆分結構規劃

### v13.0.0

- 將正式線上版入口由 `quiz.html` 改為 `index.html`，以符合 Vercel 靜態網站預設入口
- 目前維持單檔前端架構，先完成 GitHub + Vercel 線上版部署基礎
- Supabase 資料庫串接、多檔 HTML / JS / API 拆分與更完整後端結構保留至後續版本迭代

### v12.1.1

- 調整首頁提示區塊 summary 箭頭位置，桌面版與手機版皆保留左側內距，避免箭頭貼齊邊框

### v12.1.0

- 手機版考試中題目面板改為 header 三條線控制的左側抽屜，支援點空白處收合與面板內獨立滑動
- 手機版 header、footer、首頁題庫控制列與結算區按鈕排版優化
- 桌面版與手機版結算區統一為同寬置中按鈕，僅錯題開關貼齊再次測驗左側
- header、footer 與計時器在亮色/深色模式下保持一致暗色視覺
- 統計頁套用首頁 Matrix 背景，結束作答返回首頁時重置計時器
- 深色模式新增 Mark 標記按鈕配色

建議流程：

```text
修改 public/index.html
同步更新 public/index.html 檔案最上方結構註解
同步更新 README.md
確認功能正常
commit
tag
push
建立 GitHub Release
```

## 架構圖

此架構圖會跟隨 `public/index.html` 的重大結構更新同步維護，用來快速理解畫面區塊與主要函式責任。

```text
練習測驗系統
├── Head
│   └── 內建 CSS
│       ├── 全域版面與明暗模式
│       ├── 首頁控制台樣式
│       ├── 測驗雙欄版面
│       ├── 學習統計頁
│       ├── 動態 header / footer
│       └── 手機 RWD 版面
│
├── Body
│   ├── .exam-header
│   │   ├── 系統名稱 / 返回首頁，手機窄寬度自動縮為 PQS
│   │   ├── 手機考試中三條線題目面板開關，面板開啟時固定顯示 header/footer
│   │   ├── 明暗模式切換器
│   │   └── 作答計時器 #examTimer
│   │
│   ├── #themeTransitionOverlay
│   │   └── 明暗模式切換過渡遮罩
│   │
│   ├── #managementSection
│   │   ├── 首頁標題與說明
│   │   ├── .history-card
│   │   │   ├── 題庫下拉選單，手機版上傳/刪除 icon 固定在右側同列
│   │   │   ├── 上傳題庫 icon
│   │   │   ├── 刪除題庫 icon
│   │   │   ├── 開始測驗
│   │   │   ├── 學習統計
│   │   │   ├── 測驗模式 checkbox grid
│   │   │   └── 出題範圍 question-scope-panel
│   │   └── .file-hint
│   │       └── 可收折題庫格式說明，summary 箭頭保留左側內距
│   │
│   ├── #statsSection
│   │   ├── 共用首頁 Matrix 背景
│   │   ├── 正確率歷史圖表
│   │   ├── 最近測驗紀錄
│   │   └── 題庫學習統計摘要
│   │
│   ├── #quizSection
│   │   └── .quiz-active-layout
│   │       ├── .exam-left-panel
│   │       │   ├── #summaryBox，結算按鈕同寬置中，僅錯題開關貼齊再次測驗左側
│   │       │   └── #quizContainer
│   │       └── .exam-right-panel
│   │           ├── 手機版由 header 三條線控制的左側收合題目面板
│   │           ├── #examNavGrid
│   │           └── 狀態圖例
│   │
│   └── .exam-footer
│       ├── 左側作答提示，手機版保留桌面式提醒文字且最多兩行，寬度不足時從逗號後換行
│       └── 右側完成作答按鈕 #submitBtn
│
└── Script
    ├── 全域狀態與資料模型
    │   ├── sourceQuizBank
    │   ├── quizBank
    │   ├── markedQuestions
    │   ├── correctlyAnsweredQuestions
    │   ├── examTimerInterval
    │   └── totalSeconds
    │
    ├── 系統初始化與設定保存
    │   ├── window.onload
    │   ├── getQuizSettings()
    │   ├── loadQuizSettings()
    │   ├── saveQuizSettings()
    │   ├── bindSettingsControls()
    │   ├── bindTooltipControls()
    │   ├── applyThemeMode()
    │   ├── startThemeTransitionOverlay()
    │   ├── bindThemeModeControl()
    │   ├── initializeHomeMatrixBackground()
    │   └── showHomeSection()
    │
    ├── 題庫快取與管理
    │   ├── initializeBuiltinQuizBanks()
    │   ├── updateHistoryDropdown()
    │   └── safeDeleteHistory()
    │
    ├── 檔案上傳與解析
    │   ├── handleFileUpload()
    │   ├── cleanAndParsePythonFormat()
    │   ├── parseCSV()
    │   └── processRowData()
    │
    ├── 測驗 session 建立
    │   ├── setSourceQuizBank()
    │   ├── getQuestionId()
    │   ├── normalizeQuestion()
    │   ├── applyQuestionScope()
    │   ├── buildQuizSession()
    │   ├── resetExamTimer()
    │   ├── startExamTimer()
    │   ├── loadSavedQuiz()
    │   └── customStartQuiz()
    │
    ├── 考題渲染與互動
    │   ├── renderQuizQuestions()
    │   ├── buildNavigationGrid()
    │   ├── updateNavStatus()
    │   ├── toggleMobileExamPanel()
    │   ├── toggleMark()，Mark 標記按鈕支援亮色/深色模式配色
    │   ├── checkQuestionHasAnswer()
    │   ├── showAnswerHint()
    │   ├── scrollToNextQuestion()
    │   ├── recordFirstChoiceAttempt()
    │   ├── buildWrongRetryQuestions()
    │   └── getDisplayAnswer()
    │
    └── 結算、錯題與學習統計
        ├── recordCorrectAnswer()
        ├── recordWrongQuestionHistory()
        ├── recordLearningStats()
        ├── startWrongRetryQuiz()
        └── checkAnswers()
```

## 維護規則

- 只要新增或修改 `public/index.html` 的功能、畫面區塊、流程或主要函式，必須同步更新 `public/index.html` 檔案最上方的結構註解
- 只要新增或修改功能、畫面區塊、流程或主要函式，必須同步更新 `README.md` 的功能說明、架構圖或維護說明
- `v13.0.0` 起線上入口 HTML 主檔只能叫 `index.html`；`v13.2.0` 起入口檔路徑為 `public/index.html`
- 不在主分支新增 `quiz_v*.html`、`quiz_v12.html` 或其他版本 HTML 檔；只有在使用者明確要求串接資料庫或拆分多檔架構時，才新增 HTML / JS / API 等結構檔
- 版本保存交給 Git tag 與 GitHub Release
- Release 附件可放對應版本的 HTML 檔
- 使用者說「定案」時，代表目前狀態要正式上傳並更新 Git：完成檢查、commit、tag、push，並依版本規則建立 GitHub Release

