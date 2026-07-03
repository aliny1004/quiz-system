# 練習測驗系統

這是一個單檔式 HTML 練習測驗系統，適合用來整理、匯入與練習資安證照或大型題庫，例如 EDRP、CEH、CTIA、OSCP 等。專案目前以 `quiz.html` 作為最新版主程式，直接用瀏覽器開啟即可使用，不需要後端伺服器。

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

1. 開啟 `quiz.html`
2. 從歷史題庫選擇既有題庫，或上傳 `.json`、`.csv`、`.txt` 題庫
3. 設定測驗模式與出題範圍
4. 點擊「開始測驗」
5. 完成後可查看統計、再次測驗或只重測錯題

## 檔案策略

主分支只保留：

```text
README.md
quiz.html
```

歷史版本不再以 `quiz_v2.html`、`quiz_v3.html` 這種檔案形式保留在主分支。舊版會透過 Git tag 與 GitHub Release 保存，例如：

```text
v1.0.0
v2.0.0
...
v11.0.0
```

平常只修改 `quiz.html`。

## 版本規則

- 小修正：`v11.0.1`、`v11.0.2`
- 中型功能或重要改善：`v11.1.0`
- 階段性大版本：`v12.0.0`

## 更新紀錄

### v12.1.0

- 手機版考試中題目面板改為 header 三條線控制的左側抽屜，支援點空白處收合與面板內獨立滑動
- 手機版 header、footer、首頁題庫控制列與結算區按鈕排版優化
- 桌面版與手機版結算區統一為同寬置中按鈕，僅錯題開關貼齊再次測驗左側
- header、footer 與計時器在亮色/深色模式下保持一致暗色視覺
- 統計頁套用首頁 Matrix 背景，結束作答返回首頁時重置計時器
- 深色模式新增 Mark 標記按鈕配色

建議流程：

```text
修改 quiz.html
同步更新 quiz.html 檔案最上方結構註解
同步更新 README.md
確認功能正常
commit
tag
push
建立 GitHub Release
```

## 架構圖

此架構圖會跟隨 `quiz.html` 的重大結構更新同步維護，用來快速理解畫面區塊與主要函式責任。

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
│   │       └── 可收折題庫格式說明
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

- 只要新增或修改 `quiz.html` 的功能、畫面區塊、流程或主要函式，必須同步更新 `quiz.html` 檔案最上方的結構註解
- 只要新增或修改功能、畫面區塊、流程或主要函式，必須同步更新 `README.md` 的功能說明、架構圖或維護說明
- 平常只修改 `quiz.html`，HTML 主檔只能叫 `quiz.html`
- 不在主分支新增 `quiz_v*.html`、`quiz_v12.html` 或其他版本 HTML 檔
- 版本保存交給 Git tag 與 GitHub Release
- Release 附件可放對應版本的 HTML 檔
- 使用者說「定案」時，代表目前狀態要正式上傳並更新 Git：完成檢查、commit、tag、push，並依版本規則建立 GitHub Release
