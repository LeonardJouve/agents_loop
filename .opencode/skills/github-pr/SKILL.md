---
name: github-pr
description: Use when the user wants to work with GitHub pull requests. Use when keywords like "checkout PR", "PR diff locally", "view PR checks", "PR review", "merge PR locally", "PR status", "create PR", or "list PRs" appear. This skill covers all PR operations via the gh CLI.
---

# GitHub PRs via gh CLI

Use the `gh` CLI via the `bash` tool for all PR operations.

## Prerequisites

Always verify `gh` is authenticated before running commands:

```bash
gh auth status
```

If not authenticated, prompt the user to run:

```bash
gh auth login
```

Or use the existing `GITHUB_TOKEN`:

```bash
$env:GITHUB_TOKEN | gh auth login --with-token
```

## Common commands

### List PRs
```bash
gh pr list --repo <owner>/<repo>
```

### View PR details
```bash
gh pr view <number> --repo <owner>/<repo>
```

### Checkout a PR locally
```bash
gh pr checkout <number>
```

### View PR diff
```bash
gh pr diff <number>
```

### View PR checks/status
```bash
gh pr checks <number>
```

### Review a PR
```bash
gh pr review <number> --approve --body "LGTM"
```

### Merge a PR locally
```bash
gh pr merge <number> --squash --delete-branch
```

### Create a PR from current branch
```bash
gh pr create --title "..." --body "..."
```

### View PR comments/reviews
```bash
gh pr view <number> --comments
```

## Notes

- Omit `--repo` when running inside a git repo with a GitHub remote
- `gh pr checkout` creates a local branch and sets up tracking automatically
- `gh pr create` opens a PR from the current branch to the default branch
- For JSON output (easier parsing), add `--json field1,field2` where supported (e.g., `gh pr list --json number,title,state`)
- Combine with `git` commands for advanced workflows (rebase, squash locally, etc.)
