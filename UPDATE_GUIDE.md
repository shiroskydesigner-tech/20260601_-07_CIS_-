# MIO7 · CIS 網站更新指南

> 給設計師自己看的 ── 怎麼更新這個網站。

---

## 1. 檔案結構（你只需要關心 ★ 標記的檔案）

```
20260515_07澪柒_CIS_系統網站/
├── index.html              ← 網站骨架（不用動）
├── cis-site.css            ← 樣式（不用動，除非要改設計）
├── cis-app.js              ← 互動邏輯（不用動）
├── colors_and_type.css     ← 品牌設計變數（不用動）
│
├── data.json          ★    ← 所有內容資料 — 編輯這個就會更新整個網站
├── UPDATE_GUIDE.md    ★    ← 你正在讀的這份
│
├── fonts/                  ← 字型檔
├── assets/
│   ├── logos/              ← Logo SVG（替換這裡的檔案即可換 Logo）
│   └── graphics/           ← 輔助圖形 SVG
└── uploads/                ← 原始 PDF 與 SVG 源檔
```

---

## 2. 啟動網站

### 方法 A — VS Code Live Server（最推薦）

1. 用 VS Code 打開這個資料夾
2. 安裝擴充：`Live Server`（作者 Ritwick Dey）
3. 在 `index.html` 上右鍵 → **Open with Live Server**
4. 瀏覽器會自動打開 `http://127.0.0.1:5500/`

### 方法 B — Python 內建伺服器

打開 PowerShell / 終端機，cd 到網站資料夾後：

```powershell
python -m http.server 8000
```

打開瀏覽器訪問 `http://localhost:8000`

### 為什麼不能直接點兩下 index.html？

瀏覽器的 CORS 安全政策禁止 `file://` 協定載入 `data.json`，必須透過 HTTP 伺服器。

---

## 3. 如何更新內容（最常用情境）

### 3.1 改文字 — 全部都在 `data.json`

打開 `data.json`，找到對應區塊，改字串。**只改引號 `"..."` 裡的內容，不要動 key 名稱。**

#### 改 Slogan
```json
"brand": {
  "sloganZh": "想喝的時候，就會想到",       ← 改這
  "sloganEn": "ALWAYS ON YOUR MIND"        ← 或這
}
```

#### 改某一支茶
```json
"teas": [
  {
    "no": "壹",
    "nameZh": "初雪冬片",                  ← 改中文茶名
    "nameEn": "FIRST FROST",               ← 改英文茶名
    "base": "冬片四季春",                  ← 改茶基
    "desc": "高冷山頭、凍葉清香...",       ← 改中文描述
    "descEn": "Highland leaves..."         ← 改英文描述
  }
]
```

#### 改某個顏色
```json
"colors": [
  {
    "tokenZh": "霧銀紫",
    "hex": "#B8B4C6",                      ← 改 HEX 就會改網站上的色塊
    "cmyk": "C30 M28 Y15 K0",
    "pantone": "5295 C"
  }
]
```

> ⚠️ 如果要把品牌主色完全換掉（影響整站視覺），你還要去改 `colors_and_type.css` 裡的 `--mio-misty-purple`。

---

### 3.2 新增一項資源下載

在 `data.json` 的 `resources` 陣列尾端加一筆：

```json
"resources": [
  ... 現有資源 ...,
  {
    "name": "New Item Name",
    "nameZh": "新項目中文名",
    "type": "PDF · 12 頁",
    "file": "uploads/your-new-file.pdf",
    "desc": "資源說明文字",
    "size": "2.4 MB"
  }
]
```

**注意逗號**：每個物件後面要有 `,` 除非是最後一個。

---

### 3.3 替換「標誌系統」區塊那 4 張展示卡的 Logo

**所有展示卡的 logo 圖片，現在統一放在 [`assets/logos/showcase/`](assets/logos/showcase/) 資料夾。**
你想換哪張卡片的 logo，**直接覆蓋對應檔案**就好，不用動 `data.json`。

| 卡片位置 | 檔案名（固定，不可改）| 對應卡片名稱 |
|---------|---------------------|---------|
| 第 1 張 | `01-primary.svg` | 主標組合 |
| 第 2 張 | `02-inverse.svg` | 反白主標 |
| 第 3 張 | `03-mark.svg`    | 品牌印章 |
| 第 4 張 | `04-square.svg`  | 正方主標 |

**步驟**：
1. 把新 logo 改名成上表的固定檔名
2. 拖到 `assets/logos/showcase/` 覆蓋舊檔
3. 重新整理瀏覽器

> ⚠️ **必須保持檔名一致**，且建議用 SVG 格式（向量、可縮放、檔案小）。
> 想用 PNG/JPG 的話，副檔名要跟著改，並同步修改 `data.json` 中對應 `file` 欄位。

詳見 [`assets/logos/showcase/README.md`](assets/logos/showcase/README.md)。

---

### 3.3.b 替換「資源下載中心」的 Logo 原始檔

下載中心提供給客戶的**官方原始檔**放在 `assets/logos/`（沒有 showcase 子資料夾）：

- `logo_lockup.svg` · `logo_lockup_inverse.svg` · `logo_mark.svg` · `logo_full_square.svg`

這些是「客戶下載用」的版本，跟展示卡的圖片**互相獨立**。
換展示卡用 `showcase/`、換下載原檔用上面這些 ── 互不影響。

---

### 3.4 增加 / 刪除一個章節

進階操作 — 需要同時改 `data.json` 與 `index.html`。
如不確定，請聯絡開發者或保留現有結構。

---

## 4. data.json 語法常見錯誤

| 錯誤寫法                  | 正確寫法                  | 說明                  |
|--------------------------|--------------------------|----------------------|
| `'sloganZh': '想喝...'`  | `"sloganZh": "想喝..."`  | JSON 一律雙引號      |
| `"size": 2.4MB`          | `"size": "2.4 MB"`       | 文字必須加引號       |
| `"a": 1, "b": 2,`        | `"a": 1, "b": 2`         | 最後一項不能有逗號   |
| `// 註解`                 | （刪掉）                 | JSON 不支援註解      |

**驗證 JSON 是否正確**：把整個 `data.json` 內容貼到 https://jsonlint.com 檢查。

---

## 5. 部署網站給客戶看

### 選項 A · 把整個資料夾交付（最簡單）

把整個資料夾打包成 zip，傳給客戶。客戶需要：
1. 解壓縮
2. 用 VS Code + Live Server，或 Python http.server 啟動

### 選項 B · 部署到靜態託管（推薦正式給客戶）

整個專案是純靜態網站，可以免費部署到：

- **Netlify Drop** — 拖整個資料夾到 https://app.netlify.com/drop ，立即取得網址
- **Vercel** — `npm i -g vercel` 然後在資料夾內執行 `vercel`
- **GitHub Pages** — push 到 GitHub repo，設定 Pages 即可
- **Cloudflare Pages** — 連 GitHub repo 自動部署

### 選項 C · 直接給 PDF / 截圖

若客戶只需要靜態提案，可以用 Chrome 的「列印 → 儲存為 PDF」匯出整頁。

---

## 6. 常見問題

**Q: 改了 data.json 但瀏覽器看不到變化？**
A: 按 Ctrl + Shift + R 強制重新整理（清快取）。

**Q: 中文顯示為亂碼 / 方塊？**
A: 用 UTF-8 編碼儲存 data.json。VS Code 右下角會顯示編碼，點擊可切換。

**Q: 想改字型？**
A: 把新字型 .ttf / .otf 放進 `fonts/` 資料夾，然後在 `colors_and_type.css` 找到 `@font-face` 區塊新增定義。

**Q: 整體深色不喜歡，想要淺色版？**
A: 找 `cis-site.css` 最上面的 `:root` 區塊，把 `--bg-deep`、`--bg-surface`、`--bg-elev`、`--fg-bright`、`--fg-default`、`--fg-muted` 改成淺色值即可（不用動其他地方）。

**Q: 想要新增動畫？**
A: HTML 元素加 `class="reveal"`，要延遲就加 `data-delay="1"` 到 `5`。

---

## 7. 緊急聯絡

- **CSS 變數總表**：見 `colors_and_type.css` 的 `:root` 區塊
- **品牌完整指南**：見 `README.md`
- **原始檔案**：見 `uploads/`

最後更新：2026.05.28
