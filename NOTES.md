# NOTES.md

## Overview

In this assignment, I analyzed the full-stack application (React + Spring Boot) and focused on identifying high-impact issues affecting functionality, usability, and code quality. I prioritized fixing core features like search, filtering, and task creation, along with improving overall architecture and user experience.

---

## Bug 1: Frontend not starting with npm start

* Issue:
  The frontend did not start using `npm start`.

* How I found:
  Running `npm start` resulted in "Missing script: start".

* Fix:
  Used `npm run dev` instead.

* Why:
  The project uses Vite instead of Create React App, which uses `dev` script.

---

## Bug 2: Search functionality not working

* Issue:
  Search input did not filter tasks correctly.

* How I found:
  Typing keywords like "done" or "validation" did not change results.

* Fix:
  Updated API query parameter from `q` to `query` in `api.js`.

* Why:
  Backend expects a different parameter name, so incorrect parameter caused search failure.

---

## Bug 3: Status filter not working

* Issue:
  Changing the status dropdown did not filter tasks correctly.

* How I found:
  Selecting different statuses showed incorrect or empty results.

* Fix:
  Handled "ALL" case properly in `useTasks.js` and ensured correct enum values in `StatusFilter.jsx`.

* Why:
  Backend does not recognize "ALL", and incorrect values caused mismatch.

---


## Bug 5: Missing task creation feature

* Issue:
  The application had no UI to create new tasks.

* How I found:
  Explored UI and found no input form or button.

* Fix:
  Added input field and button in `App.jsx` and integrated POST API.

* Why:
  Task creation is a core feature of a task management system.

---

## Bug 6: Full page reload after task creation

* Issue:
  Application used `window.location.reload()` after creating a task.

* How I found:
  Observed full page refresh after adding a task.

* Fix:
  Replaced with state-based update (`setPage(1)`).

* Why:
  Improves performance and follows React best practices.

---


## Assumptions

* Backend expects `query` as search parameter.
* Status values are enums: `OPEN`, `IN_PROGRESS`, `DONE`.
* Pagination is handled server-side.

---

## Conclusion

This exercise helped identify critical integration issues between frontend and backend, improve application usability, and refactor code for better maintainability. The focus was on delivering correct functionality while following clean coding practices.
