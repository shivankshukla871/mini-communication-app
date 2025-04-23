Mini Communication App (Slack-style Clone)

📦 Tech Stack
Angular 19 (Standalone Components + Signals)

Tailwind CSS

JSON Server (mock API)

RxJS, HttpClient

📂 Folder Structure
/src
  /api
  /auth
  /chat
  /conversations
  app.routes.ts
  app.component.ts
main.ts
db.json

✨ Features
Mock login (with hardcoded user)

View list of conversations

Chat inside conversations

Message drafts (saved separately for each conversation)

Persist drafts across page reloads (LocalStorage)

Logged-in user displayed

Logout button

Clean Tailwind UI

🔥 Key Architectural Decisions
Standalone Components + Signals (no NgModules)

Signal-based auth store for lightweight state management

ApiService in db.json

Tailwind CSS for fast styling

Optimized Draft Saving (using LocalStorage)

Components = only presentational

Services = business logic

OnPush Change Detection enabled everywhere

🛠 State Management Explanation
Authentication state is stored via signal().

No heavy state libraries used like NgRx to keep app lightweight.

Message drafts are saved per conversation id into LocalStorage.

⚡ Draft Handling Strategy
When user types a draft but navigates away, it is saved in LocalStorage.

Draft is restored automatically when revisiting the conversation.

Draft is cleared when message is successfully sent.

🛠 How to Run Locally
# Install deps
npm install

# Start JSON server
npx json-server --watch db.json --port 3000

# Start Angular App
npm run dev

⚖️ Tradeoffs and Assumptions
Assumes only 1 user logged in at a time.

Optimized for small/medium chat use cases.

No real-time WebSocket syncing (would add later).