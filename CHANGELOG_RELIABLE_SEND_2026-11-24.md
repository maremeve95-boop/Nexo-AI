# Nexo AI — Reliable Send Update (2026-11-24)

- Fixed Puter chat calls that pass message arrays: options are supplied in the documented third argument (`chat(messages, false, options)`).
- Enabled Puter provider fallback for the same requested model so an upstream provider failure is less likely to discard the turn. Claude refusal fallback remains disabled.
- Kept the composer locked through attachment/link preparation and model-catalogue resolution, preventing duplicate submissions during catalogue loading.
- Preserved partial streamed output when a connection fails.
- Added a user-controlled retry action for retryable transport/stream failures. No automatic retry is performed, avoiding duplicate requests when a provider may already have processed the first one.
- Retained user messages and status metadata across local-storage quota fallback.
- Bumped the service-worker cache version so deployed clients refresh the application shell.

## Validation

Syntax checks, HTML ID uniqueness, CSS parsing, Puter-call signature assertions, and ZIP integrity were run during release preparation. A live authenticated Puter session is not available in the build environment.
