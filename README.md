# 🖥️ Windows XP Portfolio

A personal portfolio website styled as a fully interactive **Windows XP desktop experience** — built with React and TypeScript. Visitors are greeted with an authentic login screen before landing on a simulated XP desktop, complete with draggable windows, a taskbar, desktop shortcuts, and a shutdown sequence.

---

## ✨ Features

- **Windows XP Login Screen** — Personalized user card with avatar, unread message count, and a working "Turn off computer" button
- **Shutdown Sequence** — Faithful XP-style shutdown animation triggered from both the login screen and the desktop toolbar
- **Interactive Desktop** — Draggable, minimizable, and closeable application windows with correct z-index stacking
- **Taskbar & Window Management** — Toggle minimize/restore, track active windows, and manage focus order
- **Desktop Shortcuts** — Double-click shortcuts to launch applications
- **Showcase Explorer** — A file-explorer-style window presenting portfolio projects
- **Credits** — An application window for acknowledgements
- **Windows XP Wallpaper** — The iconic Bliss background image

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18 |
| Language | TypeScript |
| Styling | Inline React styles (`React.CSSProperties`) |
| Bundler | Vite / Create React App |
| Assets | PNG icons, WEBP wallpaper, JPG portrait |

---

## 📁 Project Structure

```
src/
├── assets/
│   ├── icons/
│   │   └── windowsStartIcon.png     # Windows XP logo used on login + toolbar
│   └── pictures/
│       ├── portrait.jpg             # User avatar on login screen
│       └── windows-bg.webp          # Desktop wallpaper (Bliss)
│
├── components/
│   ├── os/
│   │   ├── Desktop.tsx              # Main desktop orchestrator
│   │   ├── Toolbar.tsx              # Taskbar at the bottom of the desktop
│   │   ├── DesktopShortcut.tsx      # Individual shortcut icon component
│   │   ├── WindowsXPLogin.tsx       # Login screen with user selection
│   │   └── ShutdownSequence.tsx     # Shutdown animation screen
│   │
│   └── applications/
│       ├── ShowcaseExplorer.tsx     # Portfolio showcase window
│       └── Credits.tsx              # Credits window
│
└── App.tsx                          # Root — toggles between login and desktop
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js >= 16
- npm or yarn

### Installation

```bash
git clone https://github.com/your-username/windows-xp-portfolio.git
cd windows-xp-portfolio
npm install
```

### Development

```bash
npm run dev
# or
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
```

---

## 🖱️ How It Works

### Login Flow

1. The app opens to `WindowsXPLogin`, displaying a user card with a name and unread message count.
2. Clicking the user card triggers the `onLogin` callback (with a brief transition delay), handing control to `Desktop`.
3. Clicking **Turn off computer** plays `ShutdownSequence`, then resets back to the login screen.

### Desktop & Window Management

`Desktop.tsx` maintains a `windows` state object keyed by application ID. Each entry tracks:

- `component` — the rendered JSX element
- `zIndex` — managed so the most recently interacted window is always on top
- `minimized` — toggled via the taskbar

Applications are registered in the `APPLICATIONS` map and automatically generate desktop shortcuts. `My Showcase` opens automatically on first load.

### Shutdown Sequence

`ShutdownSequence` is shared between both `Desktop` and `WindowsXPLogin`. It accepts:

- `setShutdown` — to reset the shutdown state after the animation completes
- `numShutdowns` — an incrementing counter to re-trigger the animation correctly on repeated shutdowns

---

## 🎨 Customization

### Changing the User

In `WindowsXPLogin.tsx`, update the `user` object:

```tsx
const user: User = {
    id: 'user1',
    name: 'Your Name Here',
    icon: userIcon,       // swap import at top of file
    messages: 3           // unread message count
};
```

### Adding a New Application

In `Desktop.tsx`, add an entry to the `APPLICATIONS` map:

```tsx
myApp: {
    key: 'myApp',
    name: 'My App',
    shortcutIcon: 'Documents',   // must be a valid IconName
    component: MyAppComponent,
},
```

The desktop shortcut and taskbar entry are generated automatically.

### Auto-Opening an App on Login

In the `useEffect` that builds shortcuts, add your app's name to the condition:

```tsx
if (shortcut.shortcutName === 'My App') {
    shortcut.onOpen();
}
```

---

## 🙏 Credits

Built by **Tengis Temuulen**. Inspired by the Henry Heffernan portfolio & timeless aesthetic of Windows XP.

---

## 📄 License

MIT — feel free to fork, remix, and make it your own.
