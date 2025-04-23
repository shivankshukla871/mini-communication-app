<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Mini Communication App</title>
</head>
<body>
  <h1>Mini Communication App (Slack-style Clone)</h1>

  <h2>📦 Tech Stack</h2>
  <ul>
    <li>Angular 19 (Standalone Components + Signals)</li>
    <li>Tailwind CSS</li>
    <li>JSON Server (mock API)</li>
    <li>RxJS, HttpClient</li>
  </ul>

  <h2>📂 Folder Structure</h2>
  <pre>
/src
  /api
  /auth
  /chat
  /conversations
  app.routes.ts
  app.component.ts
main.ts
db.json
  </pre>

  <h2>✨ Features</h2>
  <ul>
    <li>Mock login (with hardcoded user)</li>
    <li>View list of conversations</li>
    <li>Chat inside conversations</li>
    <li>Message drafts (saved separately for each conversation)</li>
    <li>Persist drafts across page reloads (LocalStorage)</li>
    <li>Logged-in user displayed</li>
    <li>Logout button</li>
    <li>Clean Tailwind UI</li>
  </ul>

  <h2>🔥 Key Architectural Decisions</h2>
  <ul>
    <li>Standalone Components + Signals (no NgModules)</li>
    <li>Signal-based auth store for lightweight state management</li>
    <li>ApiService in db.json</li>
    <li>Tailwind CSS for fast styling</li>
    <li>Optimized Draft Saving (using LocalStorage)</li>
    <li>Components = only presentational</li>
    <li>Services = business logic</li>
    <li>OnPush Change Detection enabled everywhere</li>
  </ul>

  <h2>🛠 State Management Explanation</h2>
  <p>Authentication state is stored via <code>signal()</code>.<br>
  No heavy state libraries used like NgRx to keep app lightweight.<br>
  Message drafts are saved per conversation id into LocalStorage.</p>

  <h2>⚡ Draft Handling Strategy</h2>
  <p>When user types a draft but navigates away, it is saved in LocalStorage.<br>
  Draft is restored automatically when revisiting the conversation.<br>
  Draft is cleared when message is successfully sent.</p>

  <h2>🛠 How to Run Locally</h2>
  <ol>
    <li><strong>Install dependencies:</strong><br><code>npm install</code></li>
    <li><strong>Start JSON server:</strong><br><code>npx json-server --watch db.json --port 3000</code></li>
    <li><strong>Start Angular App:</strong><br><code>npm run dev</code></li>
  </ol>

  <h2>⚖️ Tradeoffs and Assumptions</h2>
  <ul>
    <li>Assumes only 1
