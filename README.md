# 練習測驗系統

這是一個單檔式 HTML 練習測驗系統，適合用來整理、匯入與練習資安證照或大型題庫，例如 EDRP、CEH、CTIA、OSCP 等。專案自 `v13.0.0` 起以 `index.html` 作為 Vercel 線上版入口，目前仍維持單檔前端架構，後續再依版本迭代串接 Supabase 與拆分多檔結構。

## 主要功能

- 支援 `.json`、`.csv`、`.txt` 題庫匯入
- 自動分辨選擇題與填空題
- 歷史題庫保存在 LocalStorage，可從下拉選單重新載入
- 支援打亂題目、打亂選項、隱藏已答對題目
- 支援錯題模式：只考近五次測驗中答錯過的題目
- 支援答案提示模式：點選選項後短暫提示正確答案
- 支援指定出題數量與指定題號範圍
- 支援作答計時器顯示/隱藏
- 支援明暗模式切換，並以短暫過渡遮罩降低切換跳格感
- 支援首頁動態 Matrix 背景，明暗切換時使用 canvas 內部補間降低跳色感
- 支援自動捲動到下一題
- 支援本次錯題再次測驗
- 支援學習統計：正確率歷史、每題作答次數、答對率、最後作答日期
- 支援手機與桌面自適應排版
- 支援 Git tag / GitHub release 版本管理

## 使用方式

1. 開啟 `index.html`，或使用 Vercel 部署後的線上網址
2. 從歷史題庫選擇既有題庫，或上傳 `.json`、`.csv`、`.txt` 題庫
3. 設定測驗模式與出題範圍
4. 點擊「開始測驗」
5. 完成後可查看統計、再次測驗或只重測錯題

## 檔案策略

主分支只保留：

```text
README.md
.gitignore
index.html
package.json
vercel.json
```

`v13.0.0` 起正式改為線上版入口檔 `index.html`。歷史版本不再以 `quiz_v2.html`、`quiz_v3.html` 這種檔案形式保留在主分支。舊版會透過 Git tag 與 GitHub Release 保存，例如：

```text
v1.0.0
v2.0.0
...
v13.0.0
```

平常只修改 `index.html`。後續若使用者明確要求串接 Supabase 或拆分多個 HTML / JS / API 檔案，再依新架構同步更新此檔案策略。

## 線上版部署規劃

- Vercel 專案名稱：`pqs`
- 正式 Vercel 網域：`pqs-quiz.vercel.app`（`pqs.vercel.app` 已被占用）
- 專案縮寫：`PQS`
- 目前狀態：單檔 `index.html` 靜態前端，先完成 GitHub + Vercel 線上版基礎
- 後續狀態：使用者明確下令後，再串接 Supabase，並拆分為多個 HTML / JS / API 檔案

未來結構規劃：

```text
quiz-system/
├── public/
│   ├── index.html
│   ├── 其他各種頁.html
│   └── quiz.html
├── api/
│   └── index.js
├── package.json
└── vercel.json
```

未來拆分後，`public/index.html` 作為首頁，考試頁預計使用 `/quiz` 路由；`api/index.js` 作為 Vercel Serverless Function，負責連接 Supabase 與處理後端邏輯。

## 版本規則

- 小修正：`v11.0.1`、`v11.0.2`
- 中型功能或重要改善：`v11.1.0`
- 階段性大版本：`v12.0.0`、`v13.0.0`
- 線上版設定與部署改善：`v13.1.0`

## 更新紀錄

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
修改 index.html
同步更新 index.html 檔案最上方結構註解
同步更新 README.md
確認功能正常
commit
tag
push
建立 GitHub Release
```

## 架構圖

此架構圖會跟隨 `index.html` 的重大結構更新同步維護，用來快速理解畫面區塊與主要函式責任。

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

- 只要新增或修改 `index.html` 的功能、畫面區塊、流程或主要函式，必須同步更新 `index.html` 檔案最上方的結構註解
- 只要新增或修改功能、畫面區塊、流程或主要函式，必須同步更新 `README.md` 的功能說明、架構圖或維護說明
- `v13.0.0` 起平常只修改 `index.html`，線上入口 HTML 主檔只能叫 `index.html`
- 不在主分支新增 `quiz_v*.html`、`quiz_v12.html` 或其他版本 HTML 檔；只有在使用者明確要求串接資料庫或拆分多檔架構時，才新增 HTML / JS / API 等結構檔
- 版本保存交給 Git tag 與 GitHub Release
- Release 附件可放對應版本的 HTML 檔
- 使用者說「定案」時，代表目前狀態要正式上傳並更新 Git：完成檢查、commit、tag、push，並依版本規則建立 GitHub Release
