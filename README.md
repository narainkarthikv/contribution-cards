# Contribution Cards

Contribution Cards is a fun and interactive project where you get to design and customize HTML cards. This project is a fantastic way to learn about open-source contributions, improve your HTML, CSS, JS, Git skills, and showcase your creativity. Whether you're a beginner or an experienced developer, there's something for you here! 🤍🤝

## Table of Contents

- [Getting Started](#getting-started)
- [How to Contribute](#how-to-contribute)
  - [Fork the Repository](#fork-the-repository)
  - [Clone the Repository](#clone-the-repository)
  - [Create a Branch](#create-a-branch)
  - [Make Your Changes](#make-your-changes)
  - [Commit Your Changes](#commit-your-changes)
  - [Push to GitHub](#push-to-github)
  - [Create a Pull Request](#create-a-pull-request)
- [Project Structure](#project-structure)
- [Contributors](#contributors)
- [License](#license)

## Getting Started

To get started with Contribution Cards, follow these steps:

1.  **Fork this repository**: Click the 'Fork' button at the top right of this page.
2.  **Clone your forked repository**:
    ```bash
    git clone https://github.com/your-username/contribution-cards.git
    ```
3.  **Navigate into the project directory**:
    ```bash
    cd contribution-cards
    ```
4.  **Open `index.html` in your browser to see the project in action and add the data at the end of `index.html` in root directory** (change the code at end of each card for better understanding of codebase structure)
    <br>
    Here's an example (edit with your details)

    ```HTML
    <!--John Doe's Card Start-->
      <div class="cards john-doe">
          <div class="card-head">
              <h5 class="card-title">John Doe</h5>
              <ul class="card-social-links">
                  <li><a href="https://www.linkedin.com/in/johndoe" class="card-link" data-toggle="tooltip" title="LinkedIn"><i class="bi bi-linkedin"></i></a></li>
                  <li><a href="https://github.com/johndoe" class="card-link" data-toggle="tooltip" title="GitHub"><i class="bi bi-github"></i></a></li>
                  <li><a href="https://johndoe.com" class="card-link" data-toggle="tooltip" title="Portfolio"><i class="bi bi-globe"></i></a></li>
              </ul>
          </div>
          <p class="card-text">John is a software developer with a passion for open-source projects and community engagement.</p>
          <ul class="card-study-links">
              <li><a href="https://www.freecodecamp.org" target="_blank" class="study-link" data-toggle="tooltip" title="FreeCodeCamp"><i class="bi bi-book"></i></a></li>
              <li><a href="https://www.w3schools.com" target="_blank" class="study-link" data-toggle="tooltip" title="W3Schools"><i class="bi bi-mortarboard"></i></a></li>
              <li><a href="https://docs.github.com" target="_blank" class="study-link" data-toggle="tooltip" title="GitHub Docs"><i class="bi bi-file-code"></i></a></li>
          </ul>
          <h6 class="card-subtitle mb-2 text-muted card-date">Updated on: July 22, 2024</h6>
      </div>
    <!--John Doe's Card End-->
    ```

5.  **Open `users.css` in `css` directory to update your card background color and color** (add at the end for better coding structure)
    <br>

```css
.john-doe {
  background-color: #ff6b6b;
  color: white;
}
```

6.  **Open `users.json` in `data` directory to update your card details for `auto-merge.yml` updation** (add at the end for better coding structure)
```JSON
  {
    "name": "John Doe",
    "title": "Software Developer",
    "socialLinks": {
      "linkedin": "https://www.linkedin.com/in/johndoe",
      "github": "https://github.com/johndoe",
      "portfolio": "https://johndoe.com"
    },
    "description": "John is a software developer with a passion for open-source projects and community engagement.",
    "studyLinks": {
      "freeCodeCamp": "https://www.freecodecamp.org",
      "w3Schools": "https://www.w3schools.com",
      "githubDocs": "https://docs.github.com"
    },
    "updatedOn": "July 22, 2024"
  },
```

## How to Contribute

We welcome contributions from everyone. Here are the steps to contribute:

### Fork the Repository

1. Click on the 'Fork' button at the top right corner of the repository page.

### Clone the Repository

2. Clone your forked repository to your local machine:
   ```bash
   git clone https://github.com/your-username/contribution-cards.git
   ```

### Create a Branch

3. Create a new branch for your changes:
   ```bash
   git switch -c "your-branch-name"
   ```

### Make Your Changes

4. Make your changes to the project. This might include editing HTML, CSS, or JavaScript files.

### Commit Your Changes

5. Add and commit your changes with a meaningful commit message:
   ```bash
   git add .
   git commit -m "Add a meaningful commit message"
   ```

### Push to GitHub

6. Push your changes to your forked repository:
   ```bash
   git push origin your-branch-name
   ```

### Create a Pull Request

7. Create a pull request from your forked repository to the original repository. Click the 'New Pull Request' button on the original repository's page and follow the instructions.

## Project Structure

Here's a brief overview of the project structure:

```plaintext
├── assets
├── CODE_OF_CONDUCT.md
├── Contributors.md
├── css
│   ├── styles.css
│   └── users.css
├── data
│   └── users.json
├── index.html
├── js
│   └── main.js
├── MIT-LICENSE.txt
└── README.md
```

## Contributors

We appreciate the contributions of the following individuals: [Contributors](https://github.com/narainkarthikv/contribution-cards/blob/main/Contributors.md)

This is just the beginning! I look forward to making more meaningful contributions and collaborating with this amazing community. Let's build something great together and make Sticky-Memo the best it can be! ❤️🤝

## License

This project is licensed under the MIT License. See the [LICENSE](https://github.com/narainkarthikv/contribution-cards/blob/main/MIT-LICENSE.txt) file for details.
