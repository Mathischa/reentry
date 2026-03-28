# ReEntry — Pick up exactly where you left off

## The Problem

Every knowledge worker knows the feeling: you come back to a project after a few hours (or days), and you're completely lost. You remember the *task*, but not where you were in your thinking — which file you were in, what was confusing you, what you'd decided, and what comes next. So you spend 15–30 minutes just reconstructing your mental state. Every. Single. Time.

Existing tools don't solve this. Note-taking apps are archives, not briefings. Project managers track tasks, not mental state. Nothing captures "the exact moment before you left" and replays it for you.

## The Solution

ReEntry is a **mental checkpoint system**. In 60 seconds before leaving a task, you drop a checkpoint:
- What you were in the middle of
- Your exact next step
- An optional brain dump

When you return, ReEntry delivers a **cinematic briefing** — context revealed piece by piece, in a ritual that actually shifts your brain back into flow state.

## What makes it different

1. **Staleness scoring algorithm** — Each checkpoint is scored Fresh → Warm → Cooling → Cold → Frozen based on time since your last return. The most neglected tasks visually pulse and float to the top. You always know what needs attention.

2. **The Reentry Briefing** — Not just showing notes. A sequential animated reveal: time away → what you were doing → your next step → brain dump. This creates a mental "shift gear" ritual.

3. **Session tracking** — Every time you return, a session is recorded. You build up a picture of how much time you've actually spent on things.

4. **Zero friction** — No accounts, no backend, no setup. Works offline. Everything in localStorage.

## How to run

```bash
npm install
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173).

## Tech stack

- React 18 + TypeScript
- Tailwind CSS v3
- Vite
- lucide-react (icons)
- localStorage (persistence)

## The algorithm

`getStaleness(checkpoint)` computes a staleness level based on milliseconds since last return (or creation if never returned):

| Level | Threshold | Visual |
|-------|-----------|--------|
| Fresh | < 1 hour | Green glow, no pulse |
| Warm | 1–6 hours | Yellow glow, no pulse |
| Cooling | 6–24 hours | Orange glow, no pulse |
| Cold | 1–3 days | Red glow, pulse animation |
| Frozen | > 3 days | Purple glow, pulse animation |

When sorted by staleness, checkpoints are ordered by oldest reference date first — surfacing what you've neglected most.
