# Contributing to Git & GitHub — Zero to Hero

Thank you for considering a contribution to this beginner's guide! This project is designed to help new developers understand Git and GitHub through a clean, minimalist interface.

## 🎨 Design Principles
We follow a specific aesthetic to keep the learning experience focused:
- **Typography**: Primary use of 'DM Sans' for body and 'Syne' for headings.
- **Visuals**: High use of white space, clean UI/UX, and specific accent colors (e.g., #a3e635 for success/accents).
- **Simplicity**: Explanations should be brief, high-impact, and jargon-free.

## 🛠️ How to Contribute

### 1. Proposing New Chapters
Before writing a new chapter, please open an **Issue** to discuss the topic. We want to ensure the curriculum follows a logical flow from "Foundations" to "Advanced Workflows."
You can see the 'Open' Issues and choose any of them to work on.

### 2. Technical Instructions
To add a new chapter to the website:
1. **HTML**: Create a new `div` with a unique ID (e.g., `id="ch17"`) inside the `.content-scroll` container.
2. **Navigation**: Add a corresponding `nav-item` in the `<aside>` element. Ensure the `data-i` attribute matches the index.
3. **JavaScript Updates**: Update the constants at the top of the `<script>` tag:
   - Increment `CHAPTERS`.
   - Add the section name to the `SECTIONS` array.
   - Add the chapter title to the `TITLES` array.

### 3. The Workflow
We use the **Forking Workflow**:
1. **Fork** the repository to your own account.
2. **Clone** your fork locally.
3. **Create a branch** for your feature: `git checkout -b feature/new-chapter-name`.
4. **Commit** your changes with clear messages (e.g., `Add chapter on SSH keys`).
5. **Push** to your fork and open a **Pull Request** against our `main` branch.

## 📜 Code of Conduct
- Be respectful and helpful to other learners.
- Ensure all code examples are tested and accurate.
- Do not include any sensitive information or API keys.

## ⚖️ License
By contributing, you agree that your contributions will be licensed under the project's **CC0-1.0 license**.