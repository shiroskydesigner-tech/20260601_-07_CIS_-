# 📁 Logo 展示卡 · 替換資料夾

> 這個資料夾**只服務 1 件事**：網站「標誌系統」區塊那 4 張展示卡的 logo 圖片。
> 你想要換哪一張，就把對應檔案**直接覆蓋**即可。

---

## 🎯 4 個固定槽位

| 卡片位置 | 檔案名（**不可改名**） | 對應卡片 |
|---------|----------------------|---------|
| 第 1 張 | `01-primary.svg` | 主標組合 (Primary Lockup) |
| 第 2 張 | `02-inverse.svg` | 反白主標 (Inverse Lockup) |
| 第 3 張 | `03-mark.svg`    | 品牌印章 (Mark) |
| 第 4 張 | `04-square.svg`  | 正方主標 (Square Lockup) |

---

## ✅ 替換步驟

1. 把你要替換的新檔案，**改名成上表的固定檔名**（例如 `01-primary.svg`）
2. **直接覆蓋**這個資料夾裡的舊檔案
3. 重新整理瀏覽器（Ctrl + Shift + R）

就這樣。**不用動 `data.json`**。

---

## 📎 支援的檔案格式

雖然預設是 `.svg`（向量、無限縮放），如果你想用 PNG / JPG：

1. 把新檔案改名為 `01-primary.png`（副檔名跟著新檔走）
2. **同時修改 `data.json`** 對應這項的 `file` 路徑：
   ```json
   "file": "assets/logos/showcase/01-primary.png"
   ```

如果用 SVG 不用改 data.json，**最省事**。

---

## ⚠️ 注意事項

- **不要改檔名**（除非你也改 data.json）
- **不要刪檔**（會導致該卡片顯示破圖）
- 建議圖片尺寸：**至少 600×600 px**（卡片實際顯示約 220×180，但高解析度看起來更利）
- SVG 內若有顏色，避免用「黑色」── 在淺色展示卡上看不出霧光感
- 想恢復原始 logo？對應位置原始檔在 `../`（上一層）：
  - `01-primary.svg` ← `../logo_lockup.svg`
  - `02-inverse.svg` ← `../logo_lockup_inverse.svg`
  - `03-mark.svg` ← `../logo_mark.svg`
  - `04-square.svg` ← `../logo_full_square.svg`
  把對應的原始檔複製過來覆蓋即可

---

## 🎨 卡片展示底色

所有 4 張卡片現在使用**統一的近白霧粉漸層**作為展示底
（`linear-gradient(135deg, #FFFFFF, #F6F7F9, #EFE4F1)`），
讓 logo 自身的顏色完整呈現，不被卡片底色干擾。
