# React Bilibili Comment UI

A fully styled **Bilibili-style comment section** built using **React + SCSS**.  
This project focuses on **replicating the visual layout** of Bilibili’s comment area, including:

- Navigation bar (最新 / 最热)
- Comment input box
- Avatar system
- Comment list layout
- Like count, delete actions
- Clean Bilibili-style UI using SCSS Nested Rules

> **Note:**  
> This project currently focuses on the **UI layout**, while the comment publishing logic can be expanded later with `useState` or API integration.

---

## 📸 Preview

下面是你实现的 UI 效果示意图：

<img src="./preview.png" width="800">

---

## 🚀 Features

- ⚡️ React functional components
- 🎨 SCSS（Nested + BEM-like structure）
- 🧱 Bilibili-style UI layout
- 👤 Avatar support (local images or remote URLs)
- 🧵 Comment list rendering
- 🖊 Input textarea auto height change on focus
- 📦 Easy to extend (like / delete / sort…)

---

## 🛠 Tech Stack

| 技术 | 用途 |
|------|------|
| **React 18** | 构建页面组件 |
| **SCSS (Sass)** | 编写层级结构清晰的样式 |
| **Vite / CRA** | 项目开发环境（取决于你的项目结构） |

---

## 📁 Project Structure

```bash
react-bilibili-comment/
├── public/
├── src/
│   ├── images/
│   │   └── avatar.png
│   ├── App.js
│   ├── App.scss
│   ├── index.js
│   └── ...
└── package.json

### ✨ How to Run
1. Install dependencies
```npm install```


