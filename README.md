# 💬 Yap-And-React — Real-Time Messaging App

A simple real-time chat app built with **React** and **Supabase**. Anyone with the link can send messages — including emojis — that appear live for every connected user, no page refresh needed.

Built as a demo to showcase real-time web technology.

---

## What it does

- Send messages (text, emojis, or both) that appear instantly for everyone
- Auto-assigned random username (e.g. "EpicOtter") that you can change
- Anonymous option if no name is entered
- Messages persist — new users see recent chat history on join

---

## Tech stack

| Layer | Tool | Why |
|---|---|---|
| Frontend | React + Vite | Fast, modern UI |
| Backend / Database | Supabase | Free hosted Postgres + real-time built in |
| Real-time transport | Supabase Realtime (WebSockets) | Broadcasts new messages to all users instantly |
| Deployment | Vercel | Free, connects to GitHub |

---

## How real-time works

```
User A types a message and hits Send
        ↓
React writes the message to the Supabase database
        ↓
Supabase detects the new row and broadcasts it
        ↓
Every connected user's app receives the broadcast
        ↓
React updates the screen — message appears live
```

The key is Supabase Realtime. When the app loads, it opens a persistent WebSocket connection to Supabase and subscribes to any new rows inserted into the `messages` table. No polling, no refreshing — it just listens.

---

## Project structure

```
yap-and-react/
├── src/
│   ├── App.jsx            ← Main component: chat layout, send logic
│   ├── supabaseClient.js  ← Creates and exports the Supabase connection
│   ├── components/
│   │   ├── MessageList.jsx   ← Renders the list of messages
│   │   ├── MessageBubble.jsx ← Single message bubble
│   │   └── UsernameBar.jsx   ← Displays and edits the current username
│   └── main.jsx           ← Entry point, mounts the React app
├── .env                   ← Your Supabase keys (never commit this)
├── .env.example           ← Safe template showing which keys are needed
├── index.html
└── package.json
```

---

## Database setup

One table in Supabase is all you need.

**Table name:** `messages`

| Column | Type | Notes |
|---|---|---|
| `id` | uuid | Auto-generated primary key |
| `username` | text | Sender's display name |
| `content` | text | The message content (text, emojis, or both) |
| `sender_id` | text | Random ID stored in the browser to identify the sender |
| `created_at` | timestamptz | Auto-set to the current time |

Row Level Security (RLS) is enabled with two policies:
- **Anyone can read** messages
- **Anyone can insert** messages

---

## Authors

Built by Ahmed Ihsab and Elvin Hrytsyuk as a real-time web demo.
