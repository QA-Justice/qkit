# QKit – Chrome Extension

🧰 A Chrome extension for QA.  
Tools I use to test faster and leave solid evidence.  
Made for myself, with all the little features I kept Googling during testing.

---

QA를 위한 크롬 확장앱입니다!
일할 때마다 크롬에서 반복적으로 검색했던 기능들을 모아서.. 제가 직접 쓰려고 만들었어요.

---

![Version](https://img.shields.io/badge/Version-1.0.0-orange.svg)  
![License](https://img.shields.io/badge/License-MIT-green.svg)

---

## ✨ Features

- 🔤 **Full-width / Half-width text conversion**  
  전각/반각 문자 변환 기능

- 🕒 **Real-time time display with multi-timezone support**  
  여러 시간대를 지원하는 실시간 시간 표시 (evidence 남기기 용도)

- 🗒 **Smart memo with live character count (max 1000)**  
  글자 수 카운팅이 되는 메모장 (evidence 남기기 용도)

- 📊 **Character & byte counter (UTF-8)**  
  UTF-8 기준 바이트/글자 수 계산

- 📅 **Date calculator (add days, difference between dates)**  
  날짜 간 차이 계산 및 일 수 더하기 기능


---

## 🔧 Tech Stack

- **HTML5**: Markup structure
- **CSS3**: Styling and responsive layout
- **Vanilla JavaScript**: JSON processing and DOM manipulation
- **Chrome Extension API**: Browser integration

---

## 🚀 Installation

1. Go to `chrome://extensions`  
2. Enable **Developer Mode** (top right)  
3. Click **Load unpacked** → select `qkit/` folder  
4. Click the QKit icon → side panel opens

---

## 📁 File Overview

| File             | Description                        |
|------------------|------------------------------------|
| `manifest.json`  | Extension config & entry points    |
| `sidepanel.html` | UI layout                          |
| `sidepanel.js`   | Feature logic (class-based)        |
| `sidepanel.css`  | Styling with design tokens         |
| `utils.js`       | Utility functions (text, date etc) |
| `background.js`  | Side panel setup service worker    |


## 📝 License

Distributed under the MIT License.

---
## ☕ Support

If you find this project useful, you can support me here 😋

<p align="left">
  <a href="https://buymeacoffee.com/justice_tia" target="_blank">
    <img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me a Coffee" width="120" />
  </a>
</p>

