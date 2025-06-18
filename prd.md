# Recortes – Product Requirements Document (PRD)

*Last updated: 2025‑06‑17*

## 1. Product Overview

* **Problem**: Mid‑career adults like Jerry feel stagnant and disconnected from meaningful leisure. Existing hobby apps are either too shallow (random lists) or too heavy (niche master‑class style). There is no lightweight, personalised companion that removes friction and guides them from curiosity → confident practice.
* **Solution**: Recortes curates hobby ideas aligned to personal interests, walks users through a short onboarding Q\&A to tailor an actionable beginner plan, then tracks progress with satisfying micro‑milestones and optional photo journaling.
* **Product Goal (MVP)**: Validate that a simple 3‑tab mobile experience can (a) spark interest in at least one new hobby within a week and (b) keep users engaged long enough to mark ≥1 milestone.

## 2. Target Persona – “Jerry”

* 48‑year‑old government defence analyst in Ottawa
* Feels trapped in routine; craves novelty & creative fulfilment
* Enjoys classic rock guitar, history books, family dinners
* Tech‑comfortable but not tech‑savvy; prefers simple, friendly UI
* Motivation: reignite passion outside work, share small wins with family

## 3. Value Proposition

* **Discover**: AI‑suggested hobby ideas that feel hand‑picked for you
* **Guided Plan**: Bite‑sized journeys so you always know the very next step
* **Progress Feedback**: Visual completion bars & streaks keep momentum
* **Memory Lane**: Optional photo log to celebrate milestones & share later

## 4. MVP Scope & Feature Set

### 4.1 Navigation Skeleton

* Bottom nav with 3 icons (Discover • Hobbies • Profile)

### 4.2 Discover Tab

* **Feed of Hobby Cards**

  * Card includes emoji icon + hobby name (e.g. 🪝 Fishing)
  * Cards sourced from user interest vectors
* **Tap Card → Hobby Onboarding Flow**

  * Series of 3–5 adaptive questions (experience level, available time, budget)
  * Single‑select buttons for each answer (Never / A few times / I’m a pro)
  * Final loading state: “Sit tight while we create your journey!”
* **Output**: Personalised Hobby Plan saved to “My Hobbies”

### 4.3 My Hobbies Tab

* **Hobby Summary Cards**

  * Emoji + Hobby name + progress bar + % complete
* **Tap Card → Hobby Detail Screen**

  * Header progress bar
  * Section: “Initial steps” (list of tasks)
  * Each task has • icon + short label + ✅ checkbox
  * When user taps ✅ → ask “Would you like to share a picture?”

    * Options: Upload photo / Skip
    * Upon upload, photo saved to gallery & progress recalculated

### 4.4 Profile Tab

* Avatar + display name
* Button: “Edit Interests” → multi‑select chips (music, outdoors, DIY…)
* Gallery grid of shared photos (chronological)

---

*End of v0.1 – ready for feedback & refinement.*
