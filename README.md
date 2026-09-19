# Practice Management Data-Entry Assistant

A small Chrome extension I built to speed up a repetitive part of my job as a billing 
and insurance coordinator at a mental health practice: manually retyping a patient's 
date of birth every time it needs to be entered into a different system (insurance 
portals, claim forms, verification tools).

Press a keyboard shortcut while viewing a patient's chart, and the DOB is pulled 
straight from the page and copied to your clipboard — no more re-reading and re-typing 
the same date multiple times per patient, per day.

## Why

Billing and insurance coordination involves constantly moving the same patient details 
between systems that don't talk to each other — the practice management system, payer 
portals, verification tools, spreadsheets. Small repetitive tasks like this add up to 
real time across dozens of patients a day, and manual re-typing is also where typos 
creep in.

## How it works

- Registers a keyboard shortcut (`Ctrl+Shift+D`) using Chrome's Commands API
- On trigger, scans the active tab's DOM for the DOB field
- Extracts the date using a regex match (`MM/DD/YYYY` format)
- Copies it directly to the clipboard via the Clipboard API

## Technical notes

- Built as a Manifest V3 Chrome extension (the current Chrome extension standard)
- Uses `chrome.scripting.executeScript` to run the extraction in the context of the 
  active page, avoiding the need for a persistent content script
- Scoped with `host_permissions` to only run on the specific practice management 
  domain it was built for — it does not run on arbitrary websites
- Selector logic is intentionally simple and defensive (falls back to a clear error 
  via `alert()` if the expected field isn't found, rather than silently failing or 
  grabbing the wrong data)

## Privacy note

This tool only reads data already visible on-screen to an authorized, logged-in user 
(the same information a person would otherwise read and re-type by hand) and copies 
it to the local clipboard. It does not transmit, store, or log any patient data — 
everything happens locally in the browser and nothing leaves the machine.

## Stack

Vanilla JavaScript, Chrome Extensions API (Manifest V3)
