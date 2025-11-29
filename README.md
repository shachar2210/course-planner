# Course Planner

A small browser-based tool for planning a degree based on course prerequisites.

The app lets you:

- See which courses are available to take given what you've already completed.
- Visualize a valid order of courses using a topological sort over the prerequisite graph.
- Get a rough 3-year / 6-semester plan (purely based on prerequisites, not real credit load).
- Define your own custom program with arbitrary courses and prerequisites.

> **Note:** The default example data in this repo is based on a Computer Science degree structure, but the tool is generic. You can change the course list and prerequisites in `main.js` to match any program.

---

## Features

- **Preset program mode**
  - Built-in example program with real prerequisite structure.
  - Supports “elective-required” courses:
    - Choose exactly 3 out of 6 electives.
    - At least one elective must be programming-oriented.
  - Calculates:
    - Courses you can take now.
    - A full topological order of all relevant courses.
    - A suggested 6-semester plan (up to ~5 courses per semester).

- **Custom program mode**
  - Add your own courses.
  - Define prerequisites between them.
  - Run the same logic (available courses, topological order, semester suggestion) on your custom graph.

The UI is currently in Hebrew, but the logic and code are fully generic.

---

## Tech Stack

- **HTML** – basic structure.
- **CSS** – simple, responsive layout.
- **JavaScript** – all logic:
  - DFS-based topological sort.
  - Prerequisite checks.
  - Simple semester planning heuristic.

No frameworks, no build step – just static files.

---

## Getting Started

1. Clone or download the repository.
2. Open `index.html` in a browser  
   – or use a simple static server (e.g. VS Code Live Server).
3. Choose a mode:
   - **Preset program** – use the built-in degree example.
   - **Custom program** – define your own courses and prerequisites.
4. Mark completed courses and click **“חשב קורסים זמינים וסדר תואר”** to see:
   - Available courses.
   - Full order.
   - Suggested semester plan.

---

## Customizing

To adapt this tool to another university/program:

- Edit the `programBguCs` object in `main.js`:
  - Add / remove courses.
  - Update `prereqs` arrays.
  - Optionally mark electives with:
    - `elective: true`
    - `electiveKind: "prog"` or `"theory"`

You can also completely replace the preset program and keep only the custom mode if you prefer.

---

## Disclaimer

This tool is meant as a **planning aid only** and does **not** replace official degree requirements, academic advising, or an official course catalog.
