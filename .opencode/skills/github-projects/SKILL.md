---
name: github-projects
description: Use when the user wants to manage GitHub Projects (boards, fields, items, views). Use when keywords like "project board", "project view", "add to project", "project field", or "kanban" appear. This skill covers all GitHub Projects operations via the gh CLI.
---

# GitHub Projects via gh CLI

Use the `gh` CLI via the `bash` tool for all project board operations.

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

### List projects
```bash
gh project list --owner <owner>
```

### View project details
```bash
gh project view <number> --owner <owner>
```

### List items in a project
```bash
gh project item-list <number> --owner <owner>
```

### Add an issue or PR to a project
```bash
gh project item-add <number> --owner <owner> --url <issue-or-pr-url>
```

### List custom fields
```bash
gh project field-list <number> --owner <owner>
```

### Update an item's field value
```bash
gh project item-edit --project <number> --owner <owner> --id <item-id> --field-id <field-id> --text "value"
```

## Notes

- `<owner>` can be a user login or organization name
- Project numbers are shown in `gh project list`
- Item IDs can be found via `gh project item-list`
- Field IDs can be found via `gh project field-list`
- For JSON output (easier parsing), add `--format json` where supported
