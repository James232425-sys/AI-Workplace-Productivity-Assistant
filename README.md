# Smart Work Assistant

Build a modern, responsive SaaS web application called AI Workplace Productivity Assistant.

The application is an AI-powered workplace productivity tool that helps professionals automate everyday tasks such as writing emails, summarizing meeting notes, and getting assistance from an AI workplace chatbot.

CORE REQUIREMENTS

Build a fully functional MVP, not just a static frontend. The application must have a working backend/API integration for the AI functionality.

Important constraints:

No login.

No registration.

No user accounts.

Users should be able to use the application immediately.

Keep the architecture simple and lightweight.

Avoid unnecessary paid services or complex infrastructure.

Design the project to work well within a free Lovable account.

Do not add subscription, payment, or authentication features.

1. DASHBOARD

Create a modern SaaS-style dashboard with:

Left sidebar navigation.

Application logo/name: AI Workplace Productivity Assistant.

Navigation items:

Dashboard

Smart Email Generator

Meeting Notes Summarizer

AI Workplace Chat

Main dashboard showing three feature cards:

Smart Email Generator

Meeting Notes Summarizer

AI Workplace Chat

Each card should contain a short description and a clear action button.

Add a simple productivity/welcome section at the top.

2. SMART EMAIL GENERATOR

Create a dedicated email-generation page.

Inputs:

Email purpose/topic

Recipient

Key points or information to include

Tone selector:

Formal

Friendly

Persuasive

Optional controls:

Email length: Short / Medium / Detailed

Functionality:

Send the structured prompt to the AI backend.

Generate a professional email.

Display the generated email in an editable text area/editor.

Allow the user to:

Edit

Copy

Regenerate

Clear

Show appropriate loading, success, and error states.

3. MEETING NOTES SUMMARIZER

Create a dedicated meeting-notes page.

Allow the user to paste lengthy meeting notes into a large text area.

Generate:

Meeting Summary

Concise overview of the discussion.

Key Decisions

Important decisions made during the meeting.

Action Items

Tasks that need to be completed.

Deadlines

Dates or deadlines mentioned in the notes.

The AI output must be editable.

Add buttons:

Summarize

Copy

Regenerate

Clear

If no deadlines are identified, clearly state that no deadlines were detected.

4. AI WORKPLACE CHAT

Create an interactive chatbot interface.

Features:

Chat-style conversation layout.

User message and AI response bubbles.

Text input at the bottom.

Send button.

Loading/typing indicator.

Clear conversation button.

The assistant should focus on professional workplace tasks such as:

Writing and improving documents.

Brainstorming ideas.

Workplace communication.

Task planning.

Creating professional responses.

Explaining workplace concepts.

Summarizing information.

Use structured system instructions so the AI behaves as a professional workplace productivity assistant.

5. BACKEND / AI INTEGRATION

Implement a simple backend/API layer for the AI features.

Create separate structured prompts for:

Email generation.

Meeting summarization.

Workplace chatbot.

Do not expose secret API keys in the frontend.

Use environment variables/secrets for API credentials.

If an AI API is not configured yet, create a clean integration structure and display a helpful configuration message rather than breaking the application.

Handle:

Empty inputs.

API errors.

Network failures.

Loading states.

Unexpected AI responses.

6. DESIGN SYSTEM

Use a clean green and transparent/glassmorphism-inspired theme.

Design characteristics:

Professional SaaS appearance.

Green as the primary accent.

Transparent/glass-style cards.

Soft backgrounds.

Subtle borders.

Rounded corners.

Subtle shadows.

Modern typography.

Plenty of whitespace.

Professional icons.

Smooth hover and transition effects.

The interface should look premium but remain simple and uncluttered.

Make sure text has sufficient contrast and the interface remains accessible.

7. RESPONSIVE DESIGN

The application must work properly on:

Desktop

Laptop

Tablet

Mobile

On smaller screens:

Collapse the sidebar into a mobile navigation/menu.

Make cards stack vertically.

Ensure forms and AI outputs fit the screen.

Keep buttons accessible and easy to tap.

8. EDITABLE AI OUTPUTS

All generated AI content must be editable before the user uses it.

Provide:

Edit

Copy

Regenerate

Clear

Do not make AI-generated content read-only.

9. RESPONSIBLE AI

Add a visible but unobtrusive disclaimer throughout the application:

"AI-generated content may contain errors. Always review and verify AI outputs before using them for professional, business, legal, financial, or other important decisions."

Do not present AI outputs as guaranteed facts.

10. USER EXPERIENCE

Make the application simple enough that a first-time user can understand it immediately.

Include:

Helpful placeholders.

Clear labels.

Input validation.

Loading indicators.

Empty states.

Error states.

Success notifications.

Copy-to-clipboard feedback.

Avoid unnecessary features that increase complexity or require paid services.

FINAL GOAL

Create a polished, functional AI Workplace Productivity Assistant MVP that feels like a professional SaaS product.

The three core features must be clearly accessible from the sidebar and dashboard:

Smart Email Generator → Meeting Notes Summarizer → AI Workplace Chat

Prioritize:

Functional AI features

Simple backend integration

No authentication

Responsive design

Green transparent/glass-style UI

Editable AI outputs

Responsible AI messaging

Compatibility with a free Lovable account

Do not build unnecessary authentication, payment, subscription, analytics, or user-management functionality.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/08ad832f-2170-4099-9126-cbc2189eac6d).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
