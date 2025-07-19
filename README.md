
# 🎴 Contribution Cards

Welcome to **Contribution Cards**! This project lets you design and showcase your own profile card using HTML, CSS, and JavaScript. It's a fun way to get started with open-source, practice your frontend skills, and join a friendly community. Whether you're a beginner or a pro, your contribution is welcome! 🤍🤝

[![GitHub issues](https://img.shields.io/github/issues/narainkarthikv/contribution-cards?style=flat-square)](https://github.com/narainkarthikv/contribution-cards/issues)
[![GitHub forks](https://img.shields.io/github/forks/narainkarthikv/contribution-cards?style=flat-square)](https://github.com/narainkarthikv/contribution-cards/network)
[![GitHub stars](https://img.shields.io/github/stars/narainkarthikv/contribution-cards?style=flat-square)](https://github.com/narainkarthikv/contribution-cards/stargazers)
[![MIT License](https://img.shields.io/github/license/narainkarthikv/contribution-cards?style=flat-square)](./MIT-LICENSE.txt)

---

## 📚 Table of Contents

- [About](#about)
- [Demo](#demo)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [How to Contribute](#how-to-contribute)
- [Card Format Example](#card-format-example)
- [Project Structure](#project-structure)
- [Contributors](#contributors)
- [License](#license)

---
---

## 📝 About

**Contribution Cards** lets you:
- Add your own profile card to the project wall
- Learn and practice HTML, CSS, JavaScript, and TailwindCSS
- Practice Git & GitHub workflows
- Collaborate with a friendly open-source community

---


## 🌐 Demo

👉 **[Live Preview](https://narainkarthikv.github.io/contribution-cards/)**

---


## 🛠️ Tech Stack

- HTML5
- CSS3 & [TailwindCSS](https://tailwindcss.com/)
- JavaScript (ES6+)

---


## 🚀 Getting Started

Follow these steps to add your card:

1. **Fork** this repository (top right of this page)
2. **Clone** your fork:
   ```bash
   git clone https://github.com/<your-username>/contribution-cards.git
   cd contribution-cards
   ```
3. **Create a new branch** for your changes:
   ```bash
   git checkout -b my-profile-card
   ```
4. **Add your card details** to `data/users.json` (see below for format)
5. **Commit** and **push** your changes:
   ```bash
   git add data/users.json
   git commit -m "Add my profile card"
   git push origin my-profile-card
   ```
6. **Open a Pull Request** on GitHub

---


## ✍️ Card Format Example

Add your details to `data/users.json` as a new object:

```json
{
  "name": "Your Name",
  "title": "Your Title",
  "socialLinks": {
    "GitHub": "https://github.com/yourusername",
    "LinkedIn": "https://linkedin.com/in/yourprofile"
  },
  "description": "A short bio about you!",
  "studyLinks": {
    "freeCodeCamp": "https://www.freecodecamp.org"
  },
  "updatedOn": "Month Day, Year"
}
```

---


## 🤝 How to Contribute

We welcome all contributions! Here’s a quick guide:

1. **Fork** the repo and create your branch from `main` or `develop`.
2. **Add your card** as described above.
3. **Check your changes**: Open `index.html` in your browser to preview your card.
4. **Open a Pull Request** and fill out the PR template.

**Need help?** Open an [issue](https://github.com/narainkarthikv/contribution-cards/issues) or ask in the discussions!

---


## 📁 Project Structure

```plaintext
├── assets/
│   ├── css/
│   │   └── style.css
│   ├── favicon_io/
│   │   ├── android-chrome-192x192.png
│   │   ├── android-chrome-512x512.png
│   │   ├── apple-touch-icon.png
│   │   ├── favicon-16x16.png
│   │   ├── favicon-32x32.png
│   │   └── favicon.ico
│   └── public/
│       ├── moon.png
│       └── sun.png
├── data/
│   └── users.json
├── js/
│   ├── card.js
│   ├── index.js
│   ├── main.js
│   └── utils.js
├── index.html
├── Contributors.md
├── CODE_OF_CONDUCT.md
├── CONTRIBUTING.md
├── MIT-LICENSE.txt
└── README.md
```

---

<p align="center">
  <b>Happy Contributing! 🎉</b>
</p>

---


## Contributing
Please read [CONTRIBUTING.md](https://github.com/narainkarthikv/contribution-cards/blob/main/Contributors.md) for details on our code of conduct and the process for submitting pull requests.

## License
This project is licensed under the MIT License - see the [MIT-LICENSE.txt](https://github.com/narainkarthikv/contribution-cards/blob/main/MIT-LICENSE.txt) file for details.
