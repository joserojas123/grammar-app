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

## Instructions

1. Read the current state above and build a clear summary for the user:
   - Which branch they are on
   - What files changed (staged and unstaged)
   - How many commits will be pushed
   - Any risks you notice (e.g. untracked env files, broken build config)

2. Present the summary to the user and ask:
   **"Do you want to proceed with the push? (yes / no)"**
   Wait for their answer before doing anything else.

3. If the user says **no** — stop. Do not push. Tell them nothing was pushed.

4. If the user says **yes** — proceed:
   a. Run `npm run build` and stop if it fails.
   b. Stage any unstaged changes the user confirmed they want included.
   c. Commit if there are staged changes (ask for a commit message if one wasn't provided).
   d. Push to the remote branch.
   e. Confirm success with the commit hash and remote URL.
