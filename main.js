// ===== BGU CS Program (required + elective-required courses) =====
const programBguCs = {
    id: "bgu_cs",
    name: "מדעי המחשב - אוניברסיטת בן-גוריון",
    description:
        "תואר במדעי המחשב בבן-גוריון: קורסי חובה + 6 קורסי בחירה חובה. בפועל צריך לבחור 3 מתוכם (לפחות אחד תכנותי). הכלי הוא עזר תכנוני בלבד ולא מחליף ייעוץ אקדמי.",
    courses: {
        "מערכות ספרתיות": {
            prereqs: []
        },
        "מבוא למחשבים": {
            prereqs: ["מערכות ספרתיות"]
        },
        'חדו״א 1': {
            prereqs: []
        },
        "מבוא ללוגיקה ותורת הקבוצות": {
            prereqs: []
        },
        "מבוא למדעי המחשב": {
            prereqs: []
        },
        "יישומים מתמטיים במדעי המחשב": {
            prereqs: []
        },
        "אלגברה 1": {
            prereqs: []
        },
        "אלגברה 2": {
            prereqs: ["אלגברה 1"]
        },
        'חדו״א 2': {
            prereqs: ['חדו״א 1']
        },
        "מבנים בדידים וקומבינטוריקה": {
            prereqs: ["מבוא ללוגיקה ותורת הקבוצות"]
        },
        "מבני נתונים": {
            prereqs: ["מבוא למדעי המחשב"]
        },
        "מבוא לאלגוריתמים: יסודות ההסתברות": {
            prereqs: []
        },
        "תכנון אלגוריתמים": {
            prereqs: [
                "מבנים בדידים וקומבינטוריקה",
                "מבני נתונים",
                "מבוא לאלגוריתמים: יסודות ההסתברות"
            ]
        },
        "מבוא להסתברות": {
            prereqs: ['חדו״א 2', "מבנים בדידים וקומבינטוריקה"]
        },
        "הסתברות וסטטיסטיקה": {
            prereqs: ['חדו״א 2', "מבוא להסתברות"]
        },
        "מודלים חישוביים": {
            prereqs: ["תכנון אלגוריתמים"]
        },
        "תכנות מערכות": {
            prereqs: ["יישומים מתמטיים במדעי המחשב"]
        },
        "עקרונות שפות תכנות": {
            prereqs: ["מבני נתונים", "תכנות מערכות"]
        },
        "מעבדה מורחבת בתכנות מערכות": {
            prereqs: ["תכנות מערכות"]
        },

        // ---- Elective-required courses: need 3 total, at least 1 programming-oriented ----
        "מבוא ללמידה חישובית": {
            prereqs: ["אלגברה 2", "הסתברות וסטטיסטיקה", "מודלים חישוביים"],
            elective: true,
            electiveKind: "theory"
        },
        "עקרונות מדעי המחשב": {
            prereqs: ["מודלים חישוביים"],
            elective: true,
            electiveKind: "theory"
        },
        "מבוא לאנליזה נומרית": {
            prereqs: ["מבוא למדעי המחשב", 'חדו״א 2'],
            elective: true,
            electiveKind: "theory"
        },
        "תכנות קצה": {
            prereqs: ["עקרונות שפות תכנות", "תכנות מערכות"],
            elective: true,
            electiveKind: "prog"
        },
        "עקרונות הקומפילציה": {
            prereqs: ["עקרונות שפות תכנות", "מעבדה מורחבת בתכנות מערכות"],
            elective: true,
            electiveKind: "prog"
        },
        "מערכות הפעלה": {
            prereqs: ["תכנות מערכות", "מעבדה מורחבת בתכנות מערכות"],
            elective: true,
            electiveKind: "prog"
        }
    }
};

// Names of elective-required courses
const ELECTIVE_COURSES = [
    "מבוא ללמידה חישובית",
    "עקרונות מדעי המחשב",
    "מבוא לאנליזה נומרית",
    "תכנות קצה",
    "עקרונות הקומפילציה",
    "מערכות הפעלה"
];

const PROGRAMMING_ELECTIVES = ELECTIVE_COURSES.filter(
    (name) => programBguCs.courses[name].electiveKind === "prog"
);

// Default selection: the three programming-oriented electives
let selectedElectives = new Set([
    "תכנות קצה",
    "עקרונות הקומפילציה",
    "מערכות הפעלה"
]);

// Custom program definition (user-defined graph)
const customProgram = {
    id: "custom",
    name: "תכנית מותאמת אישית",
    description:
        "הגדר קורסים ותנאי קדם בעצמך, והרץ עליהם את אותו מנגנון.",
    courses: {}
};

// App modes
const MODE_PRESET = "preset";
const MODE_CUSTOM = "custom";

// Basic semester planning parameters
const MAX_COURSES_PER_SEMESTER = 5;
const NUM_SEMESTERS = 6; // 3 years * 2

let currentMode = MODE_PRESET;
let currentProgram = programBguCs;
let currentCourses = currentProgram.courses;

document.addEventListener("DOMContentLoaded", () => {
    // Core UI elements
    const coursesContainer = document.getElementById("courses-container");
    const calcButton = document.getElementById("calc-available-btn");
    const resetButton = document.getElementById("reset-btn");
    const availableList = document.getElementById("available-courses-list");
    const fullOrderList = document.getElementById("full-order-list");
    const cycleWarning = document.getElementById("cycle-warning");

    const programNameEl = document.getElementById("program-name");
    const programDescEl = document.getElementById("program-description");

    const presetModeBtn = document.getElementById("preset-mode-btn");
    const customModeBtn = document.getElementById("custom-mode-btn");
    const customBuilderSection = document.getElementById("custom-builder");

    const customCourseNameInput = document.getElementById("custom-course-name");
    const customCoursePrereqsSelect = document.getElementById("custom-course-prereqs");
    const addCustomCourseBtn = document.getElementById("add-custom-course-btn");
    const customErrorEl = document.getElementById("custom-error");
    const customCourseList = document.getElementById("custom-course-list");

    const electivesSection = document.getElementById("electives-section");
    const electivesContainer = document.getElementById("electives-container");
    const electivesWarning = document.getElementById("electives-warning");

    const semesterPlanContainer = document.getElementById("semester-plan-container");
    const semesterPlanWarning = document.getElementById("semester-plan-warning");

    // Switch between preset program and custom program
    function setMode(mode) {
        currentMode = mode;

        if (mode === MODE_PRESET) {
            currentProgram = programBguCs;
            currentCourses = currentProgram.courses;

            presetModeBtn.classList.add("active");
            customModeBtn.classList.remove("active");
            customBuilderSection.classList.add("hidden");

            electivesSection.classList.remove("hidden");
            renderElectivesSelection(electivesContainer);
            electivesWarning.textContent = "";
        } else {
            currentProgram = customProgram;
            currentCourses = currentProgram.courses;

            presetModeBtn.classList.remove("active");
            customModeBtn.classList.add("active");
            customBuilderSection.classList.remove("hidden");

            electivesSection.classList.add("hidden");
            electivesWarning.textContent = "";
        }

        programNameEl.textContent = currentProgram.name;
        programDescEl.textContent = currentProgram.description;

        renderCoursesCheckboxes(currentCourses, coursesContainer);
        clearResults(availableList, fullOrderList, cycleWarning, semesterPlanContainer, semesterPlanWarning);

        if (mode === MODE_CUSTOM) {
            updateCustomPrereqSelect(customCoursePrereqsSelect, customProgram.courses);
            renderCustomCourseList(customProgram.courses, customCourseList);
        }
    }

    // Mode buttons
    presetModeBtn.addEventListener("click", () => setMode(MODE_PRESET));
    customModeBtn.addEventListener("click", () => setMode(MODE_CUSTOM));

    // Add course in custom mode
    addCustomCourseBtn.addEventListener("click", () => {
        const name = customCourseNameInput.value.trim();
        const selectedPrereqs = Array.from(customCoursePrereqsSelect.options)
            .filter((opt) => opt.selected)
            .map((opt) => opt.value);

        if (!name) {
            customErrorEl.textContent = "Course name is required.";
            return;
        }

        if (customProgram.courses[name]) {
            customErrorEl.textContent = "A course with this name already exists.";
            return;
        }

        customProgram.courses[name] = {
            prereqs: selectedPrereqs
        };

        customErrorEl.textContent = "";
        customCourseNameInput.value = "";
        customCoursePrereqsSelect.selectedIndex = -1;

        renderCustomCourseList(customProgram.courses, customCourseList);
        updateCustomPrereqSelect(customCoursePrereqsSelect, customProgram.courses);
        renderCoursesCheckboxes(currentCourses, coursesContainer);
        clearResults(availableList, fullOrderList, cycleWarning, semesterPlanContainer, semesterPlanWarning);
    });

    // Main "calculate" button
    calcButton.addEventListener("click", () => {
        if (Object.keys(currentCourses).length === 0) {
            alert("אין קורסים בתכנית הנוכחית. במצב מותאם אישית – הוסף קורס אחד לפחות.");
            return;
        }

        let effectiveCourses = currentCourses;

        if (currentMode === MODE_PRESET) {
            const err = validateElectiveSelection();
            if (err) {
                electivesWarning.textContent = err;
                return;
            } else {
                electivesWarning.textContent = "";
            }

            // Only keep the three elective courses that are selected
            effectiveCourses = filterCoursesByElectiveSelection(currentCourses);
        }

        // 1. Courses the user marked as completed
        const completedCourses = getCompletedCourses(coursesContainer);

        // 2. Courses available to take now
        const available = getAvailableCourses(effectiveCourses, completedCourses);
        renderAvailableCourses(available, availableList);

        // 3. Topological sort of all courses (DFS)
        const topoResult = topologicalSortDFS(effectiveCourses);

        // 4. Render full order with status
        const availableSet = new Set(available);
        renderFullOrder(
            topoResult.order,
            topoResult.hasCycle,
            completedCourses,
            availableSet,
            fullOrderList,
            cycleWarning
        );

        // 5. Suggested plan for 6 semesters
        const plan = computeSemesterPlan(
            effectiveCourses,
            completedCourses,
            MAX_COURSES_PER_SEMESTER,
            NUM_SEMESTERS
        );
        renderSemesterPlan(plan, semesterPlanContainer, semesterPlanWarning);
    });

    // Reset button: clears selections and results
    resetButton.addEventListener("click", () => {
        clearCheckboxes(coursesContainer);
        clearResults(availableList, fullOrderList, cycleWarning, semesterPlanContainer, semesterPlanWarning);
    });

    // Initial mode
    setMode(MODE_PRESET);
});

// Clear calculated results and semester plan
function clearResults(availableList, fullOrderList, warningEl, semesterContainer, semesterWarning) {
    availableList.innerHTML = "";
    fullOrderList.innerHTML = "";
    warningEl.textContent = "";

    if (semesterContainer && semesterWarning) {
        semesterContainer.innerHTML = "";
        semesterWarning.textContent = "";
    }
}

// Render course checkboxes for the current program
function renderCoursesCheckboxes(courses, container) {
    container.innerHTML = "";

    if (!courses || Object.keys(courses).length === 0) {
        const msg = document.createElement("p");
        msg.textContent = "אין קורסים מוגדרים בתכנית הנוכחית.";
        container.appendChild(msg);
        return;
    }

    for (const [courseName, courseData] of Object.entries(courses)) {
        const wrapper = document.createElement("div");
        wrapper.className = "course-item";

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.id = `course-${courseName}`;
        checkbox.value = courseName;

        const label = document.createElement("label");
        label.htmlFor = checkbox.id;
        label.textContent = courseName;

        const prereqs = courseData.prereqs || [];
        const prereqDiv = document.createElement("div");
        prereqDiv.className = "course-prereqs";

        if (prereqs.length === 0) {
            prereqDiv.textContent = "ללא תנאי קדם";
        } else {
            prereqDiv.textContent = "תנאי קדם: " + prereqs.join(", ");
        }

        wrapper.appendChild(checkbox);
        wrapper.appendChild(label);
        wrapper.appendChild(prereqDiv);
        container.appendChild(wrapper);
    }
}

// Get set of completed courses from checkboxes
function getCompletedCourses(container) {
    const completed = new Set();
    const checkboxes = container.querySelectorAll("input[type='checkbox']");

    checkboxes.forEach((cb) => {
        if (cb.checked) {
            completed.add(cb.value);
        }
    });

    return completed;
}

// Get all courses that are available to take now (all prereqs completed)
function getAvailableCourses(courses, completed) {
    const available = [];

    for (const [courseName, courseData] of Object.entries(courses)) {
        if (completed.has(courseName)) continue;

        const prereqs = courseData.prereqs || [];
        const allDone = prereqs.every((pr) => completed.has(pr));

        if (allDone) {
            available.push(courseName);
        }
    }

    return available;
}

// Render the "available now" list
function renderAvailableCourses(available, listElement) {
    listElement.innerHTML = "";

    if (available.length === 0) {
        const li = document.createElement("li");
        li.textContent = "כרגע אין קורסים חדשים זמינים לפי מה שסימנת.";
        listElement.appendChild(li);
        return;
    }

    available.forEach((courseName) => {
        const li = document.createElement("li");
        li.textContent = courseName;
        listElement.appendChild(li);
    });
}

// Topological sort using DFS. Returns { order: string[], hasCycle: boolean }
function topologicalSortDFS(courses) {
    const state = {}; // 0 = unvisited, 1 = visiting, 2 = done
    const order = [];
    let hasCycle = false;

    function dfs(courseName) {
        if (hasCycle) return;

        const s = state[courseName] || 0;
        if (s === 1) {
            // Back edge -> cycle
            hasCycle = true;
            return;
        }
        if (s === 2) {
            // Already processed
            return;
        }

        state[courseName] = 1;

        const prereqs = courses[courseName].prereqs || [];
        for (const pr of prereqs) {
            if (!courses[pr]) {
                console.warn(
                    `Prerequisite "${pr}" of course "${courseName}" was not found in the course list.`
                );
                continue;
            }
            dfs(pr);
        }

        state[courseName] = 2;
        order.push(courseName);
    }

    for (const courseName of Object.keys(courses)) {
        if (!state[courseName]) {
            dfs(courseName);
        }
    }

    return { order, hasCycle };
}

// Render full topological order with status icons
function renderFullOrder(order, hasCycle, completed, availableNowSet, listElement, warningElement) {
    listElement.innerHTML = "";

    if (hasCycle) {
        warningElement.textContent =
            "אזהרה: נמצא מעגל בתנאי הקדם – ייתכן שההגדרה של התכנית שגויה.";
    } else {
        warningElement.textContent = "";
    }

    if (!order || order.length === 0) {
        const li = document.createElement("li");
        li.textContent = "לא נמצא סדר טופולוגי (אולי אין קורסים?).";
        listElement.appendChild(li);
        return;
    }

    order.forEach((courseName) => {
        const li = document.createElement("li");

        let prefix = "🔒";
        let cssClass = "course-locked";

        if (completed.has(courseName)) {
            prefix = "✅";
            cssClass = "course-done";
        } else if (availableNowSet.has(courseName)) {
            prefix = "🟡";
            cssClass = "course-available";
        }

        li.textContent = `${prefix} ${courseName}`;
        li.className = cssClass;
        listElement.appendChild(li);
    });
}

// Update <select> of possible prerequisites in custom mode
function updateCustomPrereqSelect(selectEl, courses) {
    selectEl.innerHTML = "";

    const courseNames = Object.keys(courses);
    if (courseNames.length === 0) {
        const opt = document.createElement("option");
        opt.disabled = true;
        opt.textContent = "אין עדיין קורסים - הוסף קורס ראשון בלי תנאי קדם.";
        selectEl.appendChild(opt);
        return;
    }

    courseNames.forEach((name) => {
        const opt = document.createElement("option");
        opt.value = name;
        opt.textContent = name;
        selectEl.appendChild(opt);
    });
}

// Render the list of custom courses (name + prereqs) with delete buttons
function renderCustomCourseList(courses, listEl) {
    listEl.innerHTML = "";

    const courseNames = Object.keys(courses);
    if (courseNames.length === 0) {
        const li = document.createElement("li");
        li.textContent = "עוד לא הוגדרו קורסים.";
        listEl.appendChild(li);
        return;
    }

    courseNames.forEach((name) => {
        const data = courses[name];
        const prereqs = data.prereqs || [];

        const li = document.createElement("li");

        const textSpan = document.createElement("span");
        if (prereqs.length === 0) {
            textSpan.textContent = `${name} (ללא תנאי קדם)`;
        } else {
            textSpan.textContent = `${name} (תנאי קדם: ${prereqs.join(", ")})`;
        }

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "מחק";
        deleteBtn.className = "delete-course-btn";
        deleteBtn.addEventListener("click", () => {
            deleteCourseFromCustom(name, courses, listEl);
        });

        li.appendChild(textSpan);
        li.appendChild(deleteBtn);
        listEl.appendChild(li);
    });
}

// Delete a custom course and update all views
function deleteCourseFromCustom(name, courses, listEl) {
    delete courses[name];

    // Remove this course from other courses' prerequisites
    for (const [courseName, data] of Object.entries(courses)) {
        if (data.prereqs && Array.isArray(data.prereqs)) {
            data.prereqs = data.prereqs.filter((pr) => pr !== name);
        }
    }

    const prereqSelect = document.getElementById("custom-course-prereqs");
    const coursesContainer = document.getElementById("courses-container");
    const availableList = document.getElementById("available-courses-list");
    const fullOrderList = document.getElementById("full-order-list");
    const cycleWarning = document.getElementById("cycle-warning");
    const semesterPlanContainer = document.getElementById("semester-plan-container");
    const semesterPlanWarning = document.getElementById("semester-plan-warning");

    renderCustomCourseList(courses, listEl);
    updateCustomPrereqSelect(prereqSelect, courses);
    renderCoursesCheckboxes(courses, coursesContainer);
    clearResults(availableList, fullOrderList, cycleWarning, semesterPlanContainer, semesterPlanWarning);
}

// Render the elective-required selection UI
function renderElectivesSelection(container) {
    container.innerHTML = "";

    ELECTIVE_COURSES.forEach((name) => {
        const data = programBguCs.courses[name];
        const kind = data.electiveKind === "prog" ? "תכנותי ⚙" : "תאורטי";

        const wrap = document.createElement("div");
        wrap.className = "elective-item";

        const cb = document.createElement("input");
        cb.type = "checkbox";
        cb.value = name;
        cb.id = `elective-${name}`;
        cb.checked = selectedElectives.has(name);

        cb.addEventListener("change", () => {
            if (cb.checked) {
                selectedElectives.add(name);
            } else {
                selectedElectives.delete(name);
            }
        });

        const label = document.createElement("label");
        label.htmlFor = cb.id;
        label.textContent = name;

        const kindSpan = document.createElement("span");
        kindSpan.className = "elective-kind-tag";
        kindSpan.textContent = `(${kind})`;

        wrap.appendChild(cb);
        wrap.appendChild(label);
        wrap.appendChild(kindSpan);

        container.appendChild(wrap);
    });
}

// Validate that exactly 3 electives are chosen and at least one is programming-oriented
function validateElectiveSelection() {
    const count = selectedElectives.size;
    if (count !== 3) {
        return "יש לבחור בדיוק 3 קורסי בחירה חובה.";
    }
    const hasProg = PROGRAMMING_ELECTIVES.some((name) => selectedElectives.has(name));
    if (!hasProg) {
        return "לפחות אחד מקורסי הבחירה החובה חייב להיות קורס תכנותי (⚙).";
    }
    return "";
}

// Filter course list to only include the chosen electives
function filterCoursesByElectiveSelection(courses) {
    const result = {};
    for (const [name, data] of Object.entries(courses)) {
        if (data.elective) {
            if (!selectedElectives.has(name)) continue;
        }
        result[name] = data;
    }
    return result;
}

// Compute a rough semester plan based on prerequisites only
function computeSemesterPlan(courses, completed, maxPerSemester, numSemesters) {
    const allNames = Object.keys(courses);
    const unscheduled = new Set(allNames.filter((name) => !completed.has(name)));
    const takenOrDone = new Set(completed);

    const semesters = [];

    for (let s = 0; s < numSemesters && unscheduled.size > 0; s++) {
        const availableNow = [];

        for (const name of unscheduled) {
            const prereqs = courses[name].prereqs || [];
            const allDone = prereqs.every((pr) => takenOrDone.has(pr));
            if (allDone) {
                availableNow.push(name);
            }
        }

        if (availableNow.length === 0) {
            break;
        }

        availableNow.sort();
        const chosen = availableNow.slice(0, maxPerSemester);

        semesters.push(chosen);
        chosen.forEach((name) => {
            unscheduled.delete(name);
            takenOrDone.add(name);
        });
    }

    const leftover = Array.from(unscheduled);
    return { semesters, leftover };
}

// Render the semester plan grid
function renderSemesterPlan(plan, container, warningEl) {
    container.innerHTML = "";
    warningEl.textContent = "";

    if (!plan || !plan.semesters || plan.semesters.length === 0) {
        warningEl.textContent =
            "לא הצלחנו לבנות חלוקה לסמסטרים. ייתכן שחסרים תנאי קדם או שיש מעגל.";
        return;
    }

    plan.semesters.forEach((coursesInSem, index) => {
        const semDiv = document.createElement("div");
        semDiv.className = "semester-column";

        const year = Math.floor(index / 2) + 1;
        const semName = index % 2 === 0 ? "א׳" : "ב׳";

        const title = document.createElement("h4");
        title.textContent = `שנה ${year}, סמסטר ${semName}`;
        semDiv.appendChild(title);

        if (coursesInSem.length === 0) {
            const p = document.createElement("p");
            p.textContent = "לא שובצו קורסים.";
            semDiv.appendChild(p);
        } else {
            const ul = document.createElement("ul");
            coursesInSem.forEach((name) => {
                const li = document.createElement("li");
                li.textContent = name;
                ul.appendChild(li);
            });
            semDiv.appendChild(ul);
        }

        container.appendChild(semDiv);
    });

    if (plan.leftover && plan.leftover.length > 0) {
        const p = document.createElement("p");
        p.className = "warning";
        p.textContent =
            "נשארו קורסים שלא שובצו אוטומטית: " +
            plan.leftover.join(", ") +
            ". אפשר למקם אותם ידנית.";
        container.appendChild(p);
    }
}

// Clear all completed checkboxes
function clearCheckboxes(container) {
    const checkboxes = container.querySelectorAll("input[type='checkbox']");
    checkboxes.forEach((cb) => (cb.checked = false));
}
