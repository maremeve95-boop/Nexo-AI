# Nexo AI — Live Knowledge & 2D Game Update (2026-11-24)

- Added release metadata (v1.2.0, updated 24 November 2026) and a local answer for questions about the update date.
- Added cached Puter model catalogue with a 10-minute refresh interval, 36-hour stale-cache ceiling, request deduplication and 6.5-second timeout.
- Strengthened 2D HTML game instructions: visible first frame, Canvas 2D, requestAnimationFrame, delta time, input, HUD, objective and restart.
- Added static diagnostics and a sandboxed iframe preview (scripts only, no same-origin access), with JavaScript and Canvas draw status.
- Added manual attach-to-repair action; it never performs an automatic second AI call.
- Bumped service-worker cache key.

Static HTML ID, inline JavaScript syntax, API, service-worker, CSS parse and ZIP checks passed locally. Live authenticated Puter generation and interactive browser visual testing were unavailable.
