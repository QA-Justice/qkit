# QKit – Chrome Extension  
🧰 A modern QA toolkit for developers & content creators

![Version](https://img.shields.io/badge/Version-1.0.0-orange.svg)  
![License](https://img.shields.io/badge/License-MIT-green.svg)

---

## ✨ Features

- 🔤 Full-width / Half-width text conversion  
- 🕒 Real-time time display with multi-timezone support  
- 📊 Character & byte counter (UTF-8)  
- 📅 Date calculator (add days, difference between dates)  
- 🗒 Smart memo with live character count (max 1000)

---

## 💻 Tech Stack

- Manifest V3, Vanilla JS (ES6+), HTML5, CSS3  
- Side panel UI with ShadCN-inspired design  
- Class-based architecture with modular utilities

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


---

**Made with ❤️ for the community**  
[Buy Me a Coffee ☕](https://www.buymeacoffee.com/justice_tia)
