# 開發人員指南

本文件提供給維護者、協作者或未來換電腦接手本專案的開發人員閱讀。

一般使用者只需要閱讀 `README.md`。  
Codex / AI Agent 的工作規則請閱讀 `AGENTS.md`。

本文件按照「新電腦從零開始」的順序整理：

```text
安裝工具
登入 GitHub / Vercel / Codex
設定 Token 與環境變數
設定 Codex MCP
下載專案
安裝專案依賴
啟動 localhost
驗證線上版與本機版
修改與測試
版本 / Release / 部署
```

---

## 目錄

- [1. 專案資訊](#1-專案資訊)
- [2. 新電腦總流程](#2-新電腦總流程)
- [3. 安裝必要工具](#3-安裝必要工具)
- [4. 登入 GitHub、Vercel 與 Codex](#4-登入-githubvercel-與-codex)
- [5. 設定 Vercel Token](#5-設定-vercel-token)
- [6. 設定 Supabase URL 與 API Key](#6-設定-supabase-url-與-api-key)
- [7. 設定 Vercel Project 環境變數](#7-設定-vercel-project-環境變數)
- [8. 設定 Codex 使用 Playwright MCP](#8-設定-codex-使用-playwright-mcp)
- [9. 下載專案與檢查 Git](#9-下載專案與檢查-git)
- [10. 安裝專案依賴](#10-安裝專案依賴)
- [11. 啟動本機 localhost](#11-啟動本機-localhost)
- [12. 第一次環境驗證](#12-第一次環境驗證)
- [13. Codex 接手提示詞](#13-codex-接手提示詞)
- [14. 日常開發流程](#14-日常開發流程)
- [15. 檔案策略](#15-檔案策略)
- [16. Supabase 維護原則](#16-supabase-維護原則)
- [17. 版本規則](#17-版本規則)
- [18. 定案、Commit、Tag 與 Release](#18-定案committag-與-release)
- [19. Vercel 部署與驗收](#19-vercel-部署與驗收)
- [20. README、AGENTS 與 DEVELOPMENT 分工](#20-readmeagents-與-development-分工)
- [21. 常用指令總表](#21-常用指令總表)
- [22. 常見問題](#22-常見問題)
- [23. 參考文件](#23-參考文件)

---

## 1. 專案資訊

專案名稱：

```text
練習測驗系統 PQS
```

正式線上版：

```text
https://pqs-quiz.vercel.app
```

Vercel 專案名稱：

```text
pqs
```

正式入口檔：

```text
public/index.html
```

目前架構：

```text
單檔式前端主架構
部署平台：Vercel
資料同步：Supabase
版本保存：Git tag + GitHub Release
```

---

## 2. 新電腦總流程

換電腦或重灌後，建議照這個順序：

```text
1. 安裝 Git
2. 安裝 Node.js LTS
3. 安裝 GitHub CLI
4. 安裝 Vercel CLI
5. 安裝 Codex CLI
6. 登入 GitHub
7. 登入 Vercel
8. 登入 Codex
9. 建立 VERCEL_TOKEN
10. 用 setx 儲存 VERCEL_TOKEN
11. 設定 SUPABASE_PROJECT_URL
12. 設定 SUPABASE_ANON_API_KEY
13. 確認 Vercel Project Environment Variables
14. 設定 Codex Playwright MCP
15. git clone 專案
16. npm install
17. 確認本機啟動指令使用 `vercel dev --listen 5500 --local`
18. npm run build，產生本機 `public/env.js`
19. 執行 `vercel dev --listen 5500 --local`
20. 用 Playwright MCP 測 http://localhost:5500
21. 測 https://pqs-quiz.vercel.app
22. 開始開發
```

---

## 3. 安裝必要工具

以下指令請使用 PowerShell 執行。

### 3.1 安裝 Git

```powershell
winget install Git.Git
```

檢查：

```powershell
git --version
```

### 3.2 安裝 Node.js LTS

```powershell
winget install OpenJS.NodeJS.LTS
```

安裝完成後，請重新開啟 PowerShell / VS Code。

檢查：

```powershell
node -v
npm -v
```

### 3.3 安裝 GitHub CLI

```powershell
winget install GitHub.cli
```

檢查：

```powershell
gh --version
```

### 3.4 安裝 Vercel CLI

```powershell
npm i -g vercel
```

檢查：

```powershell
vercel --version
```

### 3.5 安裝 Codex CLI

```powershell
powershell -ExecutionPolicy ByPass -c "irm https://chatgpt.com/codex/install.ps1 | iex"
```

檢查：

```powershell
codex --version
```

---

## 4. 登入 GitHub、Vercel 與 Codex

### 4.1 登入 GitHub

```powershell
gh auth login
```

建議選項：

```text
GitHub.com
HTTPS
Login with a web browser
```

檢查登入狀態：

```powershell
gh auth status
```

### 4.2 登入 Vercel

```powershell
vercel login
```

檢查：

```powershell
vercel whoami
```

### 4.3 登入 Codex

```powershell
codex
```

依畫面指示登入帳號。

---

## 5. 設定 Vercel Token

`VERCEL_TOKEN` 用於讓 Vercel CLI 在非互動環境中執行，例如 Codex 協助 `vercel pull`、`vercel env pull` 或部署。

重要原則：

```text
不要把 token 寫進 README、AGENTS、docs、程式碼或 commit
不要把 token 直接貼給 Codex 對話
不要在終端機完整印出 token
```

### 5.1 建立 Vercel Token

到 Vercel 後台：

```text
Vercel Dashboard
→ Account Settings
→ Tokens
→ Create Token
```

建議：

```text
Token 名稱：pqs-local-codex
用途：本機 Codex / Vercel CLI
權限範圍：盡量限制在必要 scope
```

### 5.2 用 setx 儲存 Vercel Token

較安全的 PowerShell 寫法：

```powershell
$SecureVercelToken = Read-Host "請貼上 Vercel Token" -AsSecureString
$Ptr = [Runtime.InteropServices.Marshal]::SecureStringToBSTR($SecureVercelToken)
$PlainVercelToken = [Runtime.InteropServices.Marshal]::PtrToStringBSTR($Ptr)

setx VERCEL_TOKEN $PlainVercelToken

[Runtime.InteropServices.Marshal]::ZeroFreeBSTR($Ptr)
Remove-Variable SecureVercelToken, Ptr, PlainVercelToken
```

快速寫法如下，但不建議，因為 token 可能留在 PowerShell 歷史紀錄：

```powershell
setx VERCEL_TOKEN "貼上你的 Vercel Token"
```

`setx` 寫入的是未來新開的終端機。設定後請關閉並重新開啟 PowerShell / VS Code。

檢查是否存在：

```powershell
if ($env:VERCEL_TOKEN) {
  "VERCEL_TOKEN 已設定"
} else {
  "VERCEL_TOKEN 尚未設定"
}
```

不要執行：

```powershell
echo $env:VERCEL_TOKEN
```

### 5.3 Codex 使用 Vercel Token 的規則

告訴 Codex：

```text
請先檢查 VERCEL_TOKEN 是否存在，但不要輸出完整 token。
如果 VERCEL_TOKEN 存在，執行 Vercel CLI 時讓 CLI 自動讀取環境變數。
不要要求我在對話中貼 token。
除非我明確要求，否則不要執行 vercel --prod。
```

部署時仍使用：

```powershell
vercel --prod
```

不要使用：

```powershell
vercel --prod --token "..."
```

---

## 6. 設定 Supabase URL 與 API Key

本專案使用 Supabase 同步：

```text
使用者
題庫
答對紀錄
錯題紀錄
正確率歷史
每題統計
```

### 6.1 需要的 Supabase 變數

目前前端需要：

```text
SUPABASE_PROJECT_URL
SUPABASE_ANON_API_KEY
```

只有未來新增後端 API 或 Vercel Serverless Function 時，才可能需要：

```text
SUPABASE_SERVICE_ROLE_KEY
SUPABASE_SECRET_KEY
```

注意：

```text
SUPABASE_ANON_API_KEY 可用於前端低權限操作
SUPABASE_SERVICE_ROLE_KEY / SUPABASE_SECRET_KEY 絕對不能放到前端
service role / secret key 會繞過 RLS，只能放在後端或安全伺服器環境
```

### 6.2 取得 Supabase URL 與 Key

到 Supabase 後台：

```text
Supabase Dashboard
→ Project Settings
→ API
```

取得：

```text
Project URL
anon public key（寫入本專案時使用變數名 SUPABASE_ANON_API_KEY）
service_role key 或 secret key，如果未來有後端才需要
```

### 6.3 用 setx 儲存 Supabase URL

```powershell
setx SUPABASE_PROJECT_URL "https://你的-project-ref.supabase.co"
```

重新開啟 PowerShell / VS Code 後檢查：

```powershell
if ($env:SUPABASE_PROJECT_URL) {
  "SUPABASE_PROJECT_URL 已設定"
} else {
  "SUPABASE_PROJECT_URL 尚未設定"
}
```

### 6.4 用 setx 儲存 Supabase anon api key

較安全的 PowerShell 寫法：

```powershell
$SecureSupabaseAnonKey = Read-Host "請貼上 Supabase anon api key" -AsSecureString
$Ptr = [Runtime.InteropServices.Marshal]::SecureStringToBSTR($SecureSupabaseAnonKey)
$PlainSupabaseAnonKey = [Runtime.InteropServices.Marshal]::PtrToStringBSTR($Ptr)

setx SUPABASE_ANON_API_KEY $PlainSupabaseAnonKey

[Runtime.InteropServices.Marshal]::ZeroFreeBSTR($Ptr)
Remove-Variable SecureSupabaseAnonKey, Ptr, PlainSupabaseAnonKey
```

檢查是否存在：

```powershell
if ($env:SUPABASE_ANON_API_KEY) {
  "SUPABASE_ANON_API_KEY 已設定"
} else {
  "SUPABASE_ANON_API_KEY 尚未設定"
}
```

不要完整印出 Supabase key。

### 6.5 service role / secret key 規則

除非專案已經有後端 API、Vercel Serverless Function 或安全伺服器環境，否則不要設定 service role / secret key。

禁止出現在：

```text
public/index.html
README.md
AGENTS.md
docs/*.md
Git commit
前端可讀取的 env.js
瀏覽器 console
```

若未來真的需要本機設定，請使用安全輸入：

```powershell
$SecureSupabaseServiceKey = Read-Host "請貼上 Supabase service role key 或 secret key" -AsSecureString
$Ptr = [Runtime.InteropServices.Marshal]::SecureStringToBSTR($SecureSupabaseServiceKey)
$PlainSupabaseServiceKey = [Runtime.InteropServices.Marshal]::PtrToStringBSTR($Ptr)

setx SUPABASE_SERVICE_ROLE_KEY $PlainSupabaseServiceKey

[Runtime.InteropServices.Marshal]::ZeroFreeBSTR($Ptr)
Remove-Variable SecureSupabaseServiceKey, Ptr, PlainSupabaseServiceKey
```

---

## 7. 設定 Vercel Project 環境變數

本機 `setx` 不會自動同步到 Vercel production。正式部署需要把必要環境變數設定到 Vercel Project。

### 7.1 使用 Vercel Dashboard

建議對敏感值優先使用 Dashboard：

```text
Vercel Dashboard
→ Project
→ Settings
→ Environment Variables
```

加入：

```text
SUPABASE_PROJECT_URL
SUPABASE_ANON_API_KEY
```

如果未來有後端才加入：

```text
SUPABASE_SERVICE_ROLE_KEY
```

建議環境：

```text
Production
Preview
Development
```

### 7.2 使用 Vercel CLI

確認已 link 到正確專案：

```powershell
vercel link
```

加入 production 環境變數：

```powershell
vercel env add SUPABASE_PROJECT_URL production
vercel env add SUPABASE_ANON_API_KEY production
```

視需要加入 preview / development：

```powershell
vercel env add SUPABASE_PROJECT_URL preview
vercel env add SUPABASE_ANON_API_KEY preview
vercel env add SUPABASE_PROJECT_URL development
vercel env add SUPABASE_ANON_API_KEY development
```

如果未來有後端 API，才加入：

```powershell
vercel env add SUPABASE_SERVICE_ROLE_KEY production
```

### 7.3 拉取 Vercel 環境變數到本機

```powershell
vercel env pull .env.local
```

`.env.local` 必須被 `.gitignore` 排除。

`.gitignore` 至少應包含：

```gitignore
.env
.env.local
.vercel
```

---

## 8. 設定 Codex 使用 Playwright MCP

Playwright MCP 用於讓 Codex 操作瀏覽器，測試線上頁面與本機 localhost。

Codex 全域設定檔位置：

```text
C:\Users\%USERNAME%\.codex\config.toml
```

建立設定資料夾：

```powershell
mkdir $env:USERPROFILE\.codex -Force
```

開啟設定檔：

```powershell
notepad $env:USERPROFILE\.codex\config.toml
```

加入：

```toml
[mcp_servers.playwright]
command = "npx"
args = ["@playwright/mcp@latest", "--browser", "chrome", "--headed"]
```

說明：

```text
--browser chrome    使用本機已安裝的 Google Chrome 測試
--headed            開啟可視化瀏覽器視窗，方便觀察 Agent 操作
```

如果不想開啟可視化瀏覽器，可以改成：

```toml
[mcp_servers.playwright]
command = "npx"
args = ["@playwright/mcp@latest", "--browser", "chrome"]
```

設定完成後，請重新啟動 VS Code / Codex。

測試：

```text
請列出你目前可用的 MCP tools，確認是否有 Playwright 或 browser 相關工具。
```

或：

```text
請用 Playwright MCP 開啟 https://pqs-quiz.vercel.app，取得頁面 snapshot，並列出目前可見的主要按鈕與輸入框。
```

---

## 9. 下載專案與檢查 Git

### 9.1 下載專案

```powershell
git clone <你的 GitHub repo URL>
cd <專案資料夾>
code .
```

### 9.2 檢查 Git remote

```powershell
git remote -v
```

確認 remote 指向正確 GitHub repository。

### 9.3 檢查目前分支與狀態

```powershell
git branch
git status
```

---

## 10. 安裝專案依賴

在專案根目錄執行：

```powershell
npm install
```

本專案使用 Vercel dev server 做本機開發。若要固定讓 Codex / Playwright MCP 測 `localhost:5500`，直接使用：

```powershell
vercel dev --listen 5500 --local
```

說明：

```text
vercel dev              使用 Vercel 本機開發伺服器，貼近正式部署環境
--listen 5500           固定監聽 localhost:5500，方便 Codex / Playwright MCP 驗收
```

---

## 11. 啟動本機 localhost

啟動：

```powershell
vercel dev --listen 5500 --local
```

預設本機網址：

```text
http://localhost:5500
```

正式入口檔：

```text
public/index.html
```

不要把 `package.json` 的 `dev` script 設成 `vercel dev --listen 5500 --local`，Vercel CLI 會判定為遞迴呼叫。正式部署仍由 `vercel --prod` 處理，不用改輸出目錄設定。

---

## 12. 第一次環境驗證

新電腦設定完成後，依序檢查。

### 12.1 檢查工具

```powershell
node -v
npm -v
git --version
gh --version
vercel --version
codex --version
```

### 12.2 檢查登入

```powershell
gh auth status
vercel whoami
```

### 12.3 檢查環境變數

```powershell
if ($env:VERCEL_TOKEN) { "VERCEL_TOKEN 已設定" } else { "VERCEL_TOKEN 尚未設定" }
if ($env:SUPABASE_PROJECT_URL) { "SUPABASE_PROJECT_URL 已設定" } else { "SUPABASE_PROJECT_URL 尚未設定" }
if ($env:SUPABASE_ANON_API_KEY) { "SUPABASE_ANON_API_KEY 已設定" } else { "SUPABASE_ANON_API_KEY 尚未設定" }
```

### 12.4 檢查專案

```powershell
git status
npm install
vercel dev --listen 5500 --local
```

開啟：

```text
http://localhost:5500
```

### 12.5 檢查正式線上版

開啟：

```text
https://pqs-quiz.vercel.app
```

確認正式版可進入頁面。

---

## 13. Codex 接手提示詞

每次新的 Codex session 可使用：

```text
你現在是這個 VS Code 專案的 Codex coding agent。

請先閱讀 AGENTS.md 與 docs/DEVELOPMENT.md。

固定流程：
1. 先用 Playwright MCP 測線上正式網址 https://pqs-quiz.vercel.app
2. 再測 localhost http://localhost:5500
3. 修改本機 public/index.html
4. 修改後重新測 localhost
5. 本機驗證成功後等待我確認
6. 我確認後才可以 commit / push / deploy
7. 部署後再測 Vercel production URL

環境變數規則：
- 先檢查 VERCEL_TOKEN 是否存在，但不要輸出完整 token。
- 如果 VERCEL_TOKEN 存在，執行 Vercel CLI 時讓 CLI 自動讀取環境變數。
- 不要要求我在對話中貼 token。
- 不要把 token 寫進程式碼、文件或 commit。
- Supabase 前端只能使用 SUPABASE_PROJECT_URL 與 SUPABASE_ANON_API_KEY。
- 不得把 SUPABASE_SERVICE_ROLE_KEY 或 SUPABASE_SECRET_KEY 寫進 public/index.html 或任何前端可讀檔案。

請先做環境檢查，不要急著改檔案：
- 檢查 package.json 是否存在
- 檢查 `vercel dev --listen 5500 --local` 是否可用
- 檢查 public/index.html 是否存在
- 檢查 Git remote
- 檢查 Vercel 設定
- 檢查 Playwright MCP 是否可用

請全程用繁體中文回覆。
```

---

## 14. 日常開發流程

一般修改流程：

```text
1. git status 檢查目前工作區
2. 視需要用 Playwright MCP 先測線上正式版，確認 production 現況
3. 用 `vercel dev --listen 5500 --local` 啟動 localhost
4. 用 Playwright MCP 測 `http://localhost:5500`
5. 修改 public/index.html
6. 同步更新 public/index.html 檔案最上方結構註解
7. 視情況更新 README.md、docs/DEVELOPMENT.md 或 AGENTS.md
8. 用 Playwright MCP 重新測 `http://localhost:5500`
9. 確認桌面版與手機版都正常
10. 本地測試通過後，回報使用者進行本地驗收
11. 使用者說「OK 定案」、「定案」、「更新版本」或同等明確指令後，才執行 commit / tag / push / Vercel production deploy / GitHub Release
12. 部署完成後，再用 Playwright MCP 或線上請求測試 `https://pqs-quiz.vercel.app`，確認線上版與本地驗收結果沒有差異
```

涉及 UI / RWD / JS 互動時，必測：

```text
桌面尺寸：1280x720
手機尺寸：390x844
主要按鈕
開關
輸入框
滑動
footer 是否遮擋
header 是否擠壓
console 是否有錯誤
```

---

## 15. 檔案策略

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

應提交到 Git 的檔案：

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

只屬於本機環境、不要提交到 Git：

```text
.local/
.env
.env.local
.vercel/
node_modules/
public/env.js
.vercel-dev-*.log
```

用途說明：

```text
.local/              本機測試 log、暫存輸出、截圖等，可刪除、可重建
.env.local           本機環境變數，可能含 token 或 key
.vercel/             Vercel 本機 project link，可重新 vercel link
node_modules/        npm install 產生，可由 package-lock.json 重建
public/env.js        npm run build 依 SUPABASE_PROJECT_URL / SUPABASE_ANON_API_KEY 產生
package-lock.json    要提交，讓新電腦 npm install 時套件版本一致
```

平常主要修改：

```text
public/index.html
```

不要在主分支新增：

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

---

## 16. Supabase 維護原則

維護 Supabase 相關功能時必須遵守：

```text
不要破壞 LocalStorage fallback
不要讓首頁等待雲端資料才顯示
保留背景同步邏輯
不要提交 service role key
前端只能使用允許公開的 anon api key
修改 migration 前要說明影響
不要任意刪除使用者資料或題庫資料
```

本機開發若需要環境變數，請使用 `.env.local`，並確認 `.gitignore` 已排除：

```text
.env
.env.local
.vercel
.local/
node_modules/
public/env.js
```

---

## 17. 版本規則

版本號格式：

```text
v主版本.小版本.修補版本
```

範例：

```text
v13.3.2
```

### 17.1 修補版本

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

### 17.2 小版本

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

### 17.3 大版本

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

實際更新版本號、commit、tag、push、GitHub Release，一律由使用者明確下令後才執行。

---

## 18. 定案、Commit、Tag 與 Release

未經使用者明確要求，不得執行：

```powershell
git add .
git commit
git tag
git push
gh release create
vercel --prod
```

如果使用者說「OK 定案」、「定案」、「更新版本」或同等明確指令，代表目前狀態要正式上傳、更新 Git、建立版本並部署到 Vercel production。

定案流程：

```powershell
git status
git add .
git commit -m "依本次修改內容撰寫中文 commit message"
git tag vX.X.X
git push
git push origin vX.X.X
vercel --prod
```

建立 GitHub Release：

```powershell
gh release create vX.X.X --title "vX.X.X" --notes "本版本更新內容"
```

如果版本號不明確，必須先詢問使用者要使用哪個版本號。
部署完成後必須測試 `https://pqs-quiz.vercel.app`，確認線上版與本地驗收結果沒有差異。

---

## 19. Vercel 部署與驗收

部署前：

```text
1. 確認 localhost 測試通過
2. 讓使用者完成本地驗收
3. 等使用者說「OK 定案」、「定案」、「更新版本」或同等明確指令
4. 確認 git status 與修改檔案
```

正式部署：

```powershell
vercel --prod
```

部署後：

```text
1. 開啟 https://pqs-quiz.vercel.app
2. 測桌面版 1280x720
3. 測手機版 390x844
4. 測本次修改相關功能
5. 確認 production 不是 localhost 舊畫面
6. 確認線上版與本地驗收結果沒有差異
```

---

## 20. README、AGENTS 與 DEVELOPMENT 分工

### README.md

給一般使用者與 GitHub 瀏覽者閱讀。

內容應包含：

```text
專案簡介
正式網址
主要功能
使用方式
文件導覽
更新紀錄摘要
```

不要放太多 Codex / MCP / Git / Token 內部操作細節。

### AGENTS.md

給 Codex / AI Agent 讀。

內容應包含：

```text
AI 工作規則
不可自動 commit / push / deploy
Playwright MCP 測試流程
檔案策略
Supabase 注意事項
版本與定案規則
```

### docs/DEVELOPMENT.md

給開發人員讀。

內容應包含：

```text
新電腦環境安裝
登入指令
Token 與環境變數設定
本機開發
Vercel
Supabase
Git / Release
版本規則
部署驗收
```

---

## 21. 常用指令總表

檢查環境：

```powershell
node -v
npm -v
git --version
gh --version
vercel --version
codex --version
```

檢查登入：

```powershell
gh auth status
vercel whoami
```

檢查重要環境變數是否存在：

```powershell
if ($env:VERCEL_TOKEN) { "VERCEL_TOKEN 已設定" } else { "VERCEL_TOKEN 尚未設定" }
if ($env:SUPABASE_PROJECT_URL) { "SUPABASE_PROJECT_URL 已設定" } else { "SUPABASE_PROJECT_URL 尚未設定" }
if ($env:SUPABASE_ANON_API_KEY) { "SUPABASE_ANON_API_KEY 已設定" } else { "SUPABASE_ANON_API_KEY 尚未設定" }
```

安裝依賴：

```powershell
npm install
```

啟動本機：

```powershell
vercel dev --listen 5500 --local
```

查看 Git 狀態：

```powershell
git status
```

提交：

```powershell
git add .
git commit -m "修正內容"
```

推送：

```powershell
git push
```

建立 tag：

```powershell
git tag vX.X.X
git push origin vX.X.X
```

建立 GitHub Release：

```powershell
gh release create vX.X.X --title "vX.X.X" --notes "本版本更新內容"
```

部署正式版：

```powershell
vercel --prod
```

拉取 Vercel 環境變數：

```powershell
vercel env pull .env.local
```

---

## 22. 常見問題

### 22.1 localhost 打不開

先確認是否已啟動：

```powershell
vercel dev --listen 5500 --local
```

確認網址：

```text
http://localhost:5500
```

如果仍打不開，檢查 port 是否被占用。

### 22.2 修改後畫面沒變

可能是快取問題。

確認 dev server 是否已重新啟動，或重新執行：

```powershell
vercel dev --listen 5500 --local
```

再手動強制重新整理瀏覽器。

### 22.3 Codex 無法操作瀏覽器

檢查 MCP 設定：

```text
C:\Users\%USERNAME%\.codex\config.toml
```

確認內容：

```toml
[mcp_servers.playwright]
command = "npx"
args = ["@playwright/mcp@latest", "--browser", "chrome", "--headed"]
```

設定後重啟 VS Code / Codex。

### 22.4 VERCEL_TOKEN 已 setx 但 Codex 看不到

`setx` 只會影響新開啟的終端機與新啟動的程式。

請執行：

```text
1. 關閉 VS Code
2. 關閉所有 PowerShell
3. 重新開啟 VS Code
4. 重新開啟 Codex
```

再檢查：

```powershell
if ($env:VERCEL_TOKEN) { "VERCEL_TOKEN 已設定" } else { "VERCEL_TOKEN 尚未設定" }
```

### 22.5 Supabase key 設定後 Vercel 還是讀不到

本機 `setx` 只設定本機，不會自動同步到 Vercel。

請確認 Vercel Project 的 Environment Variables 已設定：

```text
SUPABASE_PROJECT_URL
SUPABASE_ANON_API_KEY
```

然後重新部署：

```powershell
vercel --prod
```

### 22.6 Vercel deploy 到錯的專案

檢查 `.vercel` 目錄與 Vercel link。

```powershell
vercel link
```

不要在未確認情況下重新建立新 project。

### 22.7 GitHub Release 版本號不確定

先不要建立 Release。

請先依版本規則判斷是修補版、小版本或大版本，再詢問使用者確認版本號。

---

## 23. 參考文件

- Vercel CLI： https://vercel.com/docs/cli
- Vercel Environment Variables： https://vercel.com/docs/environment-variables
- Vercel CLI env： https://vercel.com/docs/cli/env
- Supabase API Keys： https://supabase.com/docs/guides/getting-started/api-keys
- Supabase 資料安全： https://supabase.com/docs/guides/database/secure-data
