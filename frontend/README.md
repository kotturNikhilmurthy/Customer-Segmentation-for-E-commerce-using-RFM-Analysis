# RFM Analytics Frontend

React + Vite + TailwindCSS frontend for RFM customer segmentation platform.

## Installation

```bash
npm install
```

## Development

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## Build for Production

```bash
npm run build
```

## Preview Production Build

```bash
npm run preview
```

## Project Structure

```
src/
├── components/
│   └── Navbar.jsx
├── pages/
│   ├── LandingPage.jsx
│   ├── UploadPage.jsx
│   ├── HowItWorks.jsx
│   ├── WhyRFM.jsx
│   ├── Dashboard.jsx
│   └── Documentation.jsx
├── App.jsx
├── main.jsx
└── index.css
```

## Features

- 🎨 Beautiful UI with TailwindCSS
- 📊 Interactive charts with Recharts
- 📱 Fully responsive design
- 🚀 Fast development with Vite
- 🎯 Client-side routing with React Router
- 📤 File upload with drag-and-drop
- 📥 Export functionality

## Configuration

The frontend is configured to proxy API requests to `http://localhost:8000` in development mode. Update `vite.config.js` if your backend runs on a different port.
