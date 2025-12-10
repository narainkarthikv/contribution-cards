# 🎴 Contribution Cards

> **Showcase your profile with beautifully designed contributor cards**

Welcome to **Contribution Cards**! This project lets you design and showcase your own profile card using HTML, CSS, and JavaScript. It's a fun way to get started with open-source, practice your frontend skills, and join a friendly community. Whether you're a beginner or a pro, your contribution is welcome! 🤍🤝

[![GitHub issues](https://img.shields.io/github/issues/narainkarthikv/contribution-cards?style=flat-square)](https://github.com/narainkarthikv/contribution-cards/issues)
[![GitHub forks](https://img.shields.io/github/forks/narainkarthikv/contribution-cards?style=flat-square)](https://github.com/narainkarthikv/contribution-cards/network)
[![GitHub stars](https://img.shields.io/github/stars/narainkarthikv/contribution-cards?style=flat-square)](https://github.com/narainkarthikv/contribution-cards/stargazers)
[![MIT License](https://img.shields.io/github/license/narainkarthikv/contribution-cards?style=flat-square)](./MIT-LICENSE.txt)

---

## 🌟 Why Contribution Cards?

**Contribution Cards** is a lightweight, beginner-friendly project designed to help you **learn web development**, **contribute to open-source**, and **build your portfolio**. It provides a welcoming environment for developers of all skill levels to practice HTML, CSS, JavaScript, and Git workflows while creating beautiful profile cards.

✨ **Key Features:**

- 👤 **Create Your Profile Card** — Add your details, social links, and bio
- 🎨 **Beautiful Design** — Responsive, modern UI with TailwindCSS
- 🌓 **Dark & Light Themes** — Toggle between themes with smooth transitions
- 🔗 **Social Links** — Showcase GitHub, LinkedIn, portfolio, and more
- 📱 **Fully Responsive** — Perfect on desktop, tablet, and mobile devices
- 💡 **Learning Friendly** — Great for beginners learning HTML, CSS, and JavaScript
- 🚀 **Easy Setup** — Clone, add your card, and submit a PR
- 🎓 **Study Resources** — Links to freeCodeCamp, W3Schools, and GitHub Docs

---

## 📑 Table of Contents

- [Why Contribution Cards?](#-why-contribution-cards)
- [Live Demo](#-live-demo)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running Locally](#running-locally)
- [How to Contribute](#-how-to-contribute)
- [Card Format Example](#-card-format-example)
- [Project Structure](#-project-structure)
- [Development Standards](#-development-standards)
- [Troubleshooting](#-troubleshooting)
- [Contributors](#-contributors)
- [Support](#-support)
- [License](#-license)

---

## 🌐 Live Demo

👉 **[Live Preview](https://narainkarthikv.github.io/contribution-cards/)**

Visit the live site and see all contributor profiles in action!

---

## 🛠️ Tech Stack

| Layer        | Technologies                    |
| ------------ | ------------------------------- |
| **Frontend** | HTML5, CSS3, JavaScript (ES6+) |
| **Styling**  | TailwindCSS                     |
| **Icons**    | Font Awesome                    |
| **Hosting**  | GitHub Pages                    |

<p align="center">
  <img src="https://skillicons.dev/icons?i=html,css,javascript,tailwind" />
</p>

---

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- **Git** — [Download here](https://git-scm.com/)
- **A code editor** — [VS Code](https://code.visualstudio.com/), [Sublime](https://www.sublimetext.com/), or your favorite editor
- **A modern web browser** — Chrome, Firefox, Safari, or Edge

### Installation

1. **Fork the repository**

   Click the **Fork** button on the top-right corner of the [GitHub repository](https://github.com/narainkarthikv/contribution-cards).

2. **Clone your fork**

   ```bash
   git clone https://github.com/<your-username>/contribution-cards.git
   cd contribution-cards
   ```

3. **Open in your editor**

   ```bash
   # Using VS Code
   code .
   ```

### Running Locally

Simply open `index.html` in your web browser:

- **Option 1:** Double-click `index.html` in your file explorer
- **Option 2:** Right-click `index.html` → "Open with" → Select your browser
- **Option 3:** Use VS Code's Live Server extension:
  1. Install "Live Server" extension in VS Code
  2. Right-click `index.html`
  3. Select "Open with Live Server"

The app will be available at **[http://localhost:5500](http://localhost:5500)** (or the port shown by your server)

---

---

## ✍️ Card Format Example

Add your details to `data/users.json` as a new object:

```json
{
  "name": "Your Name",
  "title": "Your Job Title / Role",
  "socialLinks": {
    "github": "https://github.com/yourusername",
    "linkedin": "https://linkedin.com/in/yourprofile",
    "portfolio": "https://yourportfolio.com"
  },
  "description": "A short bio about you and your interests!",
  "studyLinks": {
    "freeCodeCamp": "https://www.freecodecamp.org",
    "w3Schools": "https://www.w3schools.com",
    "githubDocs": "https://docs.github.com"
  },
  "updatedOn": "Month Day, Year"
}
```

**Field Descriptions:**
- **name** — Your full name
- **title** — Your role/title (e.g., "Frontend Developer", "Student", "Designer")
- **socialLinks** — Object with platform names as keys and profile URLs as values (optional platforms: github, linkedin, twitter, portfolio, etc.)
- **description** — A 1-2 sentence bio about yourself
- **studyLinks** — Links to resources you recommend or are learning from
- **updatedOn** — The date you last updated your card

---

---

## 🤝 How to Contribute

We welcome all contributions! Here's a step-by-step guide:

1. **Fork** the repository (click the Fork button on GitHub)

2. **Clone your fork:**

   ```bash
   git clone https://github.com/<your-username>/contribution-cards.git
   cd contribution-cards
   ```

3. **Create a feature branch:**

   ```bash
   git checkout -b feature/add-my-card
   ```

4. **Add your card details** to `data/users.json` (see format above)

5. **Test your changes:**
   - Open `index.html` in your browser
   - Scroll through the cards and verify your card displays correctly
   - Test on mobile devices using browser DevTools (F12 → Toggle device toolbar)

6. **Stage and commit** your changes:

   ```bash
   git add data/users.json
   git commit -m "feat: add my profile card"
   ```

7. **Push to your fork:**

   ```bash
   git push origin feature/add-my-card
   ```

8. **Open a Pull Request:**
   - Go to the [original repository](https://github.com/narainkarthikv/contribution-cards)
   - Click "New Pull Request"
   - Select your branch
   - Fill out the PR template with:
     - A clear description of your card
     - Your name and role
     - Any social links you'd like highlighted
   - Click "Create Pull Request"

**Need help?** Open an [issue](https://github.com/narainkarthikv/contribution-cards/issues) or check our [Contributing Guide](./CONTRIBUTING.md)!

---

---

## 📁 Project Structure

```plaintext
contribution-cards/
├── assets/
│   ├── css/
│   │   └── style.css              # Main styles with TailwindCSS
│   ├── favicon_io/
│   │   ├── android-chrome-192x192.png
│   │   ├── android-chrome-512x512.png
│   │   ├── apple-touch-icon.png
│   │   ├── favicon-16x16.png
│   │   ├── favicon-32x32.png
│   │   └── favicon.ico
│   └── public/
│       ├── moon.png              # Dark theme icon
│       └── sun.png               # Light theme icon
├── data/
│   └── users.json                # Contributor profile data
├── js/
│   ├── card.js                   # Card component class
│   ├── index.js                  # DOM rendering logic
│   ├── main.js                   # Theme toggle and main logic
│   └── utils.js                  # Utility functions
├── index.html                    # Main HTML file
├── CODE_OF_CONDUCT.md            # Community guidelines
├── CONTRIBUTING.md               # Contribution guidelines
├── Contributors.md               # List of contributors
├── MIT-LICENSE.txt               # License information
└── README.md                     # This file
```

---

## 🔧 Development Standards

### Code Style

- **Formatting & Linting:**
  - Consistent 2-space indentation
  - Max line length: 100 characters
  - Use semicolons in JavaScript
  - Prettier configuration in `.prettierrc`

- **JavaScript Best Practices:**
  - Use ES6+ syntax (arrow functions, template literals, const/let)
  - Keep functions small and focused
  - Add JSDoc comments for complex functions
  - Use meaningful variable names

- **HTML & CSS:**
  - Semantic HTML5 elements
  - TailwindCSS for styling
  - Mobile-first responsive design
  - Proper accessibility attributes (alt text, aria labels)

- **Documentation:**
  - Comments for complex logic
  - Keep README updated
  - Document new features in CONTRIBUTING.md

### Git Workflow

- **Branch Naming:**
  - Features: `feature/description` (e.g., `feature/add-my-card`)
  - Bug fixes: `fix/description` (e.g., `fix/card-styling-bug`)
  - Docs: `docs/description` (e.g., `docs/update-readme`)

- **Commits:**
  - Use conventional commit format: `type: description`
  - Examples:
    - `feat: add my profile card`
    - `fix: correct card layout on mobile`
    - `docs: update card format instructions`
    - `style: format code with prettier`

- **Pull Requests:**
  - Keep PRs focused on one feature or fix
  - Reference related issues using `Closes #123`
  - Provide clear descriptions
  - Ensure all changes work on desktop and mobile

### Code Review Checklist

Before submitting a PR, ensure:

- [ ] Card data is valid JSON in `data/users.json`
- [ ] All required fields are filled (name, title, description)
- [ ] Social links are valid URLs
- [ ] No sensitive personal information is included
- [ ] Changes tested in multiple browsers
- [ ] Card displays properly on mobile devices
- [ ] No breaking changes to existing functionality
- [ ] Comments are clear and helpful

---

## 🐛 Troubleshooting

### Page Not Loading

- Ensure `index.html` is in the project root
- Check browser console (F12) for JavaScript errors
- Clear browser cache (Ctrl+Shift+Delete)

### Card Not Appearing

- Verify your JSON is valid: Use [JSONLint.com](https://jsonlint.com/)
- Check that all required fields are present
- Ensure the `data/users.json` file is properly formatted
- Look for console errors (F12 → Console tab)

### Styling Issues

- Clear browser cache
- Ensure TailwindCSS is properly linked in `index.html`
- Check that CSS classes are correctly applied
- Test in a different browser

### Git Issues

```bash
# If you need to update your fork with latest changes
git fetch upstream
git merge upstream/develop
git push origin develop

# If you accidentally committed to wrong branch
git branch feature/my-new-branch
git reset --hard origin/develop
git checkout feature/my-new-branch
```

### JSON Formatting Help

Use an online JSON formatter:
- [JSONFormatter.org](https://www.jsonformatter.org/)
- [JSONLint.com](https://jsonlint.com/)

---

## 👥 Contributors

Thanks to everyone who has contributed to **Contribution Cards**! 💪

<a href="https://github.com/narainkarthikv/contribution-cards/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=narainkarthikv/contribution-cards" />
</a>

See the [Contributors Page](https://github.com/narainkarthikv/contribution-cards/blob/main/Contributors.md) for the full list.

### How to Add Yourself

When your PR is merged:

1. Your card will automatically appear on the live site
2. Add yourself to `Contributors.md` following the format in that file
3. Your profile will be featured in our community

---

## 🙏 Support

If you find **Contribution Cards** helpful:

- ⭐ **Star the repository** on GitHub
- 🐛 **Report bugs** through [Issues](https://github.com/narainkarthikv/contribution-cards/issues)
- 💡 **Suggest features** in [Discussions](https://github.com/narainkarthikv/contribution-cards/discussions)
- 📢 **Share** Contribution Cards with your network
- 💬 **Participate** in community discussions
- 📖 **Improve documentation** with feedback or corrections

---

## 📜 License

This project is licensed under the **MIT License**.

See the [MIT-LICENSE.txt](https://github.com/narainkarthikv/contribution-cards/blob/main/MIT-LICENSE.txt) file for full details.

**Summary:** You are free to use, modify, and distribute this software for any purpose, including commercial use.

---

## 🔗 Quick Links

- **Website:** [narainkarthikv.github.io/contribution-cards](https://narainkarthikv.github.io/contribution-cards/)
- **GitHub Repository:** [narainkarthikv/contribution-cards](https://github.com/narainkarthikv/contribution-cards)
- **Issues:** [Report a bug or request a feature](https://github.com/narainkarthikv/contribution-cards/issues)
- **Discussions:** [Join the community](https://github.com/narainkarthikv/contribution-cards/discussions)
- **Contributing Guide:** [CONTRIBUTING.md](./CONTRIBUTING.md)
- **Code of Conduct:** [CODE_OF_CONDUCT.md](./CODE_OF_CONDUCT.md)

---

## 💡 Final Thoughts

**Contribution Cards** is a welcoming space for developers of all skill levels to learn, practice, and contribute to open-source. Your profile card tells your story and showcases your unique talents to the community.

Whether you're adding your first card, fixing a bug, improving the design, or helping others — **every contribution matters!** 🏗️💚

Let's build an amazing community of contributors together! 🚀

---

<p align="center">
  <strong>Made with ❤️ by the Contribution Cards community</strong>
</p>

---
