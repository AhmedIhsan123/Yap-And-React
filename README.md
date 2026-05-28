# 💬 Yap-And-React — Real-Time Messaging App

A simple real-time chat app built with **React** and **Supabase**. Anyone with the link can send text messages and emoji reactions that appear live for every connected user — no page refresh needed.

Built as a demo to showcase real-time web technology.

---

## What it does

- Send text messages that appear instantly for everyone
- React to messages with emoji that float up the screen
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
│   │   ├── MessageBubble.jsx ← Single message bubble (text or emoji)
│   │   ├── EmojiBar.jsx      ← Row of quick-send emoji buttons
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
| `content` | text | The message text or emoji |
| `type` | text | Either `"text"` or `"emoji"` |
| `sender_id` | text | Random ID stored in the browser to identify the sender |
| `created_at` | timestamptz | Auto-set to the current time |

Row Level Security (RLS) is enabled with two policies:
- **Anyone can read** messages
- **Anyone can insert** messages

---

## Environment variables

Create a `.env` file in the project root:

```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-public-key
```

Find these in your Supabase dashboard under **Settings → API**.

> Never commit your `.env` file. Add it to `.gitignore`.

---

## Getting started

### Prerequisites
- Node.js installed (v18 or later recommended)
- A free Supabase account at [supabase.com](https://supabase.com)

### Steps

1. **Clone the repo**
   ```bash
   git clone https://github.com/your-username/yap-and-react.git
   cd yap-and-react
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Supabase**
   - Create a new project at supabase.com
   - Run the SQL in the **SQL Editor** to create the messages table
   - Go to **Database → Replication** and enable Realtime on the `messages` table
   - Copy your Project URL and anon key

4. **Add your environment variables**
   ```bash
   cp .env.example .env
   # then fill in your Supabase URL and key
   ```

5. **Run the app locally**
   ```bash
   npm run dev
   ```
   Open [http://localhost:5173](http://localhost:5173) in two browser tabs to test real-time updates.

---

## Deployment

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) and import your repo
3. Add your environment variables in the Vercel project settings
4. Deploy — Vercel gives you a public URL to share

---

## Future ideas

- User avatars or profile colors
- Multiple chat rooms
- Message reactions (like/heart on individual messages)
- Typing indicators ("EpicOtter is typing…")
- Read receipts

---

## Authors

Built by [Your Name] and [Partner's Name] as a real-time web demo.
