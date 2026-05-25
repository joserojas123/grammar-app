---
description: Deploy the grammar app — build, commit, and push to remote
disable-model-invocation: true
allowed-tools: Bash(git *) Bash(npm *)
---

## Current state

- **Branch:** !`git branch --show-current`
- **Uncommitted changes:** !`git status --short`
- **Commits ahead of remote:** !`git log @{u}.. --oneline 2>/dev/null || echo "(no upstream set)"`
- **Staged diff:** !`git diff --cached --stat`
- **Unstaged diff:** !`git diff --stat`
- **Full staged diff:** !`git diff --cached`
- **Full unstaged diff:** !`git diff`

## Instructions

1. Read the current state above and present the user a clear summary in this format:

   ---
   **Deploy Summary**
   - **Branch:** <branch>
   - **Files changed:**
     - `file1` — added / modified / deleted
     - `file2` — ...
   - **Commits to push:** <N commit(s)>
     - `<hash> <message>`
   - **Risks:** <list any concerns, or "None detected">
   ---

2. Below the summary, show the full diff of the changes (staged and unstaged) so the user can review exactly what will be pushed.

3. After showing the summary and diff, ask:
   **"Do you want to proceed with the push? (yes / no)"**
   Wait for their answer before doing anything else.

3. If the user says **no** — stop. Do not push. Tell them nothing was pushed.

4. If the user says **yes** — proceed:
   a. Run `npm run build` and stop if it fails.
   b. Stage any unstaged changes the user confirmed they want included.
   c. Commit if there are staged changes (ask for a commit message if one wasn't provided).
   d. Push to the remote branch.
   e. Confirm success with the commit hash and remote URL.
