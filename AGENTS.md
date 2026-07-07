# AGENTS.md

## 1. 角色

你是這個 VS Code 專案的 Codex coding agent。

此專案是「練習測驗系統 PQS」，目前主要為單檔式 HTML 練習測驗系統。

正式線上版：

```text
https://pqs-quiz.vercel.app
```

正式入口檔：

```text
public/index.html
```

本機預設測試網址：

```text
http://localhost:5500
```

請全程使用繁體中文回覆。

---

## 2. 必讀文件

接手專案後，請先閱讀：

```text
README.md
docs/DEVELOPMENT.md
AGENTS.md
```

文件分工：

```text
README.md              給一般使用者與 GitHub 瀏覽者閱讀
docs/DEVELOPMENT.md    給開發人員閱讀，包含環境安裝、Token、版本與部署流程
AGENTS.md              給 Codex / AI Agent 閱讀，包含工作規則與禁止事項
```

---

## 3. 固定工作流

本專案標準工作流程：

```text
1. 視需求先測線上正式網址，確認 production 現況
2. 啟動 localhost:5500，重現或確認本機狀態
3. 修改本機專案檔案
4. 修改後重新測 http://localhost:5500
5. 本機驗證成功後，回報使用者進行本地驗收
6. 使用者說「OK 定案」、「定案」、「更新版本」或同等明確指令後，才 commit / tag / push / deploy / GitHub Release
7. 部署後再測 Vercel production 網址，確認線上版與本地驗收結果沒有差異
```

不得跳過本機驗證；定案部署後也不得跳過線上確認。

---

## 4. 新環境接手檢查

每次接手新電腦、新專案資料夾或新 session，請先檢查：

```powershell
node -v
npm -v
git --version
gh --version
vercel --version
codex --version
```

並檢查：

```text
AGENTS.md 是否存在
README.md 是否存在
docs/DEVELOPMENT.md 是否存在
package.json 是否存在
package.json 是否有 build / deploy script
public/index.html 是否存在
vercel.json 是否存在
.git 是否存在
Git remote 是否存在
.vercel 是否存在
```

如果缺少檔案，先回報缺少什麼，再提出建議。不要直接大量建立或覆蓋。

---

## 5. 環境變數與 Token 規則

不得要求使用者在對話中貼出 token、API key 或 secret。

可以檢查環境變數是否存在，但不得輸出完整值：

```powershell
if ($env:VERCEL_TOKEN) { "VERCEL_TOKEN 已設定" } else { "VERCEL_TOKEN 尚未設定" }
if ($env:SUPABASE_PROJECT_URL) { "SUPABASE_PROJECT_URL 已設定" } else { "SUPABASE_PROJECT_URL 尚未設定" }
if ($env:SUPABASE_ANON_API_KEY) { "SUPABASE_ANON_API_KEY 已設定" } else { "SUPABASE_ANON_API_KEY 尚未設定" }
```

不得執行：

```powershell
echo $env:VERCEL_TOKEN
echo $env:SUPABASE_ANON_API_KEY
echo $env:SUPABASE_SERVICE_ROLE_KEY
echo $env:SUPABASE_SECRET_KEY
```

Vercel CLI 若需要 token，應讓 CLI 自動讀取 `VERCEL_TOKEN` 環境變數。

部署時仍使用：

```powershell
vercel --prod
```

不要把 token 寫成：

```powershell
vercel --prod --token "..."
```

---

## 6. Supabase 安全規則

前端可以使用：

```text
SUPABASE_PROJECT_URL
SUPABASE_ANON_API_KEY
```

前端絕對不能使用：

```text
SUPABASE_SERVICE_ROLE_KEY
SUPABASE_SECRET_KEY
```

禁止將 service role / secret key 寫入：

```text
public/index.html
README.md
AGENTS.md
docs/*.md
Git commit
前端可讀取的 env.js
瀏覽器 console
```

維護 Supabase 相關功能時必須遵守：

```text
不要破壞 LocalStorage fallback
不要讓首頁等待雲端資料才顯示
保留背景同步邏輯
不要提交 service role key
修改 migration 前要說明影響
不要任意刪除使用者資料或題庫資料
```

---

## 7. Playwright MCP 使用規則

只要涉及 UI、版面、RWD、按鈕、開關、表單、滑動、點擊、JavaScript 互動，都應優先使用 Playwright MCP 測試。

處理 UI 或互動問題時，請依序：

```text
1. 開啟正式線上網址
2. 取得 accessibility snapshot
3. 必要時截圖
4. 測試桌面尺寸
5. 測試手機尺寸
6. 模擬點擊、輸入、滑動、切換開關
7. 找出問題
8. 修改本機檔案
9. 開啟 localhost
10. 重新測試同一流程
11. 回報驗證結果
```

建議測試尺寸：

```text
桌面：1280x720
手機：390x844
```

涉及手機版排版時，必須測試 390px 左右寬度。

---

## 8. 本機開發規則

本機預設網址：

```text
http://localhost:5500
```

如果 localhost 尚未啟動，請提醒使用者執行：

```powershell
vercel dev --listen 5500 --local
```

如果尚未安裝依賴，提醒使用者執行：

```powershell
npm install
vercel dev --listen 5500 --local
```

如果 localhost 無法連線，先回報，不要直接改程式。

---

## 9. 檔案策略

主分支只保留目前正式開發所需檔案。

目前核心檔案：

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

這些核心檔案應該提交到 Git，讓新電腦 clone 後可以重建同一套專案與工具版本。

只屬於本機環境、不得提交到 Git：

```text
.local/
.env
.env.local
.vercel/
node_modules/
public/env.js
.vercel-dev-*.log
```

說明：

```text
.local/              本機測試 log、暫存輸出、截圖等，只給目前電腦使用
.env.local           本機環境變數，可能含 token 或 key
.vercel/             Vercel 本機 project link
node_modules/        npm install 產生，可由 package-lock.json 重建
public/env.js        npm run build 依環境變數產生的前端設定檔
package-lock.json    需要提交，用來鎖定套件版本
```

平常只修改：

```text
public/index.html
```

除非使用者明確要求，否則不要新增：

```text
quiz_v*.html
quiz_v12.html
quiz_v13.html
舊版備份 HTML
其他版本型 HTML 檔
```

歷史版本保存方式：

```text
Git tag
GitHub Release
Release 附件
```

不得用主分支新增舊版 HTML 檔案來保存版本。

---

## 10. 入口檔規則

自 v13.0.0 起：

```text
線上入口 HTML 主檔只能叫 index.html
```

自 v13.2.0 起：

```text
正式入口檔路徑為 public/index.html
```

不得把正式入口改回：

```text
quiz.html
quiz_v*.html
```

除非使用者明確要求架構重整。

---

## 11. UI 維護重點

修改 UI 時，請特別檢查：

```text
header 標題是否過早縮成 PQS
header 是否擠壓明暗模式開關
使用者頭像選單是否被裁切
題庫下拉選單是否置中
題庫名稱過長時是否能改為左對齊
上傳 / 刪除 icon 是否在手機版正常排列
測驗模式 checkbox 是否符合桌面三欄、手機單欄邏輯
手機版 footer 是否遮擋內容
結算按鈕與錯題開關是否重疊
題目面板抽屜是否能開關
點擊空白處是否能收合手機題目面板
深色模式配色是否正常
Matrix 背景是否影響閱讀或效能
```

---

## 12. 程式修改規則

修改時必須遵守：

```text
不要重寫整個 public/index.html
優先做小範圍、目標明確的修改
不要修改無關功能
不要移除現有功能
不要破壞 Supabase 同步
不要破壞 LocalStorage
不要破壞使用者名稱分流
不要任意改變版本號
不要任意 commit
不要任意 push
不要任意 deploy
不要任意建立 GitHub Release
```

若需要大改，必須先提出計畫，等待使用者確認。

---

## 13. 文件同步規則

只要新增或修改 `public/index.html` 的功能、畫面區塊、流程或主要函式，必須同步檢查：

```text
public/index.html 檔案最上方的結構註解
README.md
docs/DEVELOPMENT.md
AGENTS.md
```

README 給一般使用者閱讀，不要放太多 Codex、MCP、Git、Token 內部操作細節。

版本規則、Git 流程、部署流程與「定案」規則應放在：

```text
docs/DEVELOPMENT.md
AGENTS.md
```

---

## 14. 版本規則

版本號格式：

```text
v主版本.小版本.修補版本
```

範例：

```text
v13.3.2
```

### 14.1 修補版本

修改第三個數字。

範例：

```text
v1.0.0 -> v1.0.1
```

用途：

```text
Bug 修正
細節優化
不影響舊功能
```

### 14.2 小版本

修改第二個數字，第三個數字歸零。

範例：

```text
v1.0.0 -> v1.1.0
```

用途：

```text
新增功能
舊功能正常
可相容
```

### 14.3 大版本

修改第一個數字，第二、三個數字都歸零。

範例：

```text
v1.0.0 -> v2.0.0
```

用途：

```text
重大改版
架構大改
舊版可能不相容
```

實際更新版本號、commit、tag、push、GitHub Release，一律等使用者明確下令後才執行。

---

## 15. 使用者說「定案」時的含義

當使用者說：

```text
定案
```

代表目前狀態要正式上傳並更新 Git。

此時才可以依序執行或協助使用者執行：

```powershell
git status
git add .
git commit -m "依本次修改內容撰寫中文 commit message"
git tag vX.X.X
git push
git push origin vX.X.X
```

並依版本規則建立 GitHub Release。

如果版本號不明確，必須先詢問使用者要使用哪個版本號。

---

## 16. Git 與部署規則

未經使用者明確要求，不得執行：

```powershell
git add .
git commit
git tag
git push
gh release create
vercel --prod
```

部署前必須先：

```text
1. 使用 Playwright MCP 完成本機驗證
2. 顯示修改過的檔案
3. 說明修改原因
4. 等待使用者確認
```

使用者確認可以部署後，才可執行：

```powershell
git status
git add .
git commit -m "修正 UI 問題"
git push
vercel --prod
```

部署後必須：

```text
1. 使用 Playwright MCP 開啟 Vercel production 網址
2. 重新測試同一個使用者操作流程
3. 回報 production 是否與 localhost 驗證結果一致
```

---

## 17. Vercel 規則

Vercel 專案名稱：

```text
pqs
```

正式 Vercel 網域：

```text
pqs-quiz.vercel.app
```

`pqs.vercel.app` 已被占用，不要嘗試改成該網域。

如果 `.vercel` 目錄不存在，表示本機可能尚未 link Vercel project，請先提醒使用者，不要亂建新專案。

---

## 18. 回覆格式

處理問題時，請使用：

```text
檢查結果：
- 問題：
- 原因：
- 修改：
- 測試：
- 尚未確認：
```

如果只是提出計畫，請使用：

```text
處理計畫：
1.
2.
3.
```

如果需要使用者執行指令，請明確列出指令與用途。

---

## 19. 禁止事項

除非使用者明確要求，否則禁止：

```text
重寫整個專案
拆分多檔架構
新增版本備份 HTML
刪除 Supabase 資料
移除 LocalStorage fallback
改變正式入口路徑
改變 Vercel 專案名稱
自動 commit
自動 tag
自動 push
自動 deploy
自動建立 GitHub Release
任意安裝新套件
任意更改 package.json scripts
輸出完整 token 或 secret
```

---

## 20. 完整架構圖

此架構圖來自專案原始完整維護說明，供 Codex 在修改 `public/index.html` 時對照畫面區塊與主要函式責任。

只要新增或修改 `public/index.html` 的功能、畫面區塊、流程或主要函式，必須同步檢查此架構圖是否需要更新。

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
│   │   ├── 使用者頭像與使用者選單
│   │   └── 作答計時器 #examTimer，首頁隱藏、測驗中顯示
│   │
│   ├── #themeTransitionOverlay
│   │   └── 明暗模式切換過渡遮罩
│   │
│   ├── #accessSection
│   │   └── 使用者訪問頁：輸入使用者名稱後寫入 Supabase，並回補該使用者雲端資料
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

---

## 21. 優先順序

遇到衝突時，依下列優先順序處理：

```text
1. 使用者當前明確指令
2. AGENTS.md 規則
3. docs/DEVELOPMENT.md 開發規則
4. README.md 專案說明
5. 現有程式碼行為
6. 一般最佳實務
```

如果使用者指令可能破壞資料、部署、版本或主分支策略，必須先提醒風險並等待確認。
