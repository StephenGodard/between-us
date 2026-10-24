#!/usr/bin/env python3
"""Validate the active repository scaffold and local Markdown references."""

from pathlib import Path
from urllib.parse import unquote, urlsplit
import re
import sys

ROOT = Path(__file__).resolve().parents[1]
AGENTS = ROOT / ".agents"
errors: list[str] = []

required_files = [
    ROOT / "AGENTS.md",
    ROOT / "README.md",
    ROOT / "docs/README.md",
    ROOT / "docs/context/README.md",
    ROOT / "docs/adr/README.md",
    ROOT / "docs/features/README.md",
    ROOT / "docs/prds/README.md",
    ROOT / "docs/user-stories/README.md",
    AGENTS / "README.md",
    AGENTS / "config.yaml",
    ROOT / "docs/context/product-context/README.md",
    ROOT / "docs/context/product-context/product-context.md",
    ROOT / "docs/context/hackathon-kickoff.md",
    ROOT / "docs/context/DevDay-Paris-Hackathon-Kickoff.pdf",
    ROOT / "docs/context/technical-context/README.md",
    ROOT / "docs/context/technical-context/technical-context.md",
    ROOT / "docs/context/technical-context/constraints.md",
    ROOT / "docs/context/technical-context/stack.md",
    ROOT / "docs/context/technical-context/guidelines/README.md",
    ROOT / "tools/README.md",
    ROOT / "src/README.md",
    ROOT / "tests/README.md",
]
for path in required_files:
    if not path.is_file():
        errors.append(f"missing: {path.relative_to(ROOT)}")

if (ROOT / ".agent").exists():
    errors.append("obsolete active directory: .agent")
if (ROOT / "archive").exists():
    errors.append("inactive agent archive remains in project")

roles = sorted((AGENTS / "agents").glob("*-agent.md"))
skills = sorted((AGENTS / "skills").glob("*/SKILL.md"))
if {p.stem for p in roles} != {"ba-agent", "po-agent", "architect-agent"}:
    errors.append("active roles differ from BA, PO, architect")
if {p.parent.name for p in skills} != {"scaffold-project", "create-prd", "shape-architecture"}:
    errors.append("active skills differ from discovery, PRD, architecture")

for path, expected in [(p, p.stem) for p in roles] + [(p, p.parent.name) for p in skills]:
    content = path.read_text(encoding="utf-8")
    match = re.match(r"\A---\n(.*?)\n---\n", content, re.S)
    if not match:
        errors.append(f"invalid frontmatter: {path.relative_to(ROOT)}")
        continue
    metadata = match.group(1)
    if not re.search(rf"(?m)^name:\s*{re.escape(expected)}\s*$", metadata):
        errors.append(f"name differs from path: {path.relative_to(ROOT)}")
    if not re.search(r"(?m)^description:\s*\S", metadata):
        errors.append(f"missing description: {path.relative_to(ROOT)}")

active_markdown = [ROOT / "AGENTS.md", ROOT / "README.md"]
for directory in (AGENTS, ROOT / "docs", ROOT / "prototype", ROOT / "src", ROOT / "tests", ROOT / "tools"):
    active_markdown.extend(directory.rglob("*.md"))

markdown_link = re.compile(r"(?<!!)\[[^\]]*\]\(([^)]+)\)")
repo_path = re.compile(r"(?<![\w/])\.agents/(?:agents|skills|rules|checklists|templates)/[\w./-]+\.(?:md|yaml)")
inline_repo_path = re.compile(r"`((?:docs|prototype|src|tests|tools|\.agents)/[^`]+)`")
for path in sorted(set(active_markdown)):
    if not path.is_file():
        continue
    content = path.read_text(encoding="utf-8")
    relative = path.relative_to(ROOT)
    if re.search(r"(?<![\w.])\.agent/", content):
        errors.append(f"obsolete .agent reference: {relative}")
    if any(marker in content.lower() for marker in ("quantalia", "qtl-", "sse mvp", "palo it")):
        errors.append(f"legacy product context in active file: {relative}")
    for ref in set(repo_path.findall(content)):
        if not (ROOT / ref).is_file():
            errors.append(f"broken agent reference in {relative}: {ref}")
    for ref in set(inline_repo_path.findall(content)):
        candidate = ref.rstrip(".,;:")
        if "<" not in candidate and not (ROOT / candidate).exists():
            errors.append(f"broken inline path in {relative}: {candidate}")
    for raw in markdown_link.findall(content):
        target = raw.strip().split(' "', 1)[0].strip("<>")
        parsed = urlsplit(target)
        if parsed.scheme or parsed.netloc or not parsed.path or "<" in target:
            continue
        local = (path.parent / unquote(parsed.path)).resolve()
        if not local.exists():
            errors.append(f"broken Markdown link in {relative}: {target}")

if errors:
    for error in sorted(set(errors)):
        print(f"ERROR {error}")
    sys.exit(1)

print(f"OK: {len(roles)} active roles, {len(skills)} discoverable skills, local links resolved")
