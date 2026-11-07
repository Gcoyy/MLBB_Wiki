# MLBB Wiki

A fan-made Mobile Legends: Bang Bang reference and guide website built with React, Vite, and Firebase. The project provides rank breakdowns, lane recommendations, hero progression information, and general site content for players looking for a simple wiki-style experience.

## Overview

MLBB Wiki is a frontend web app designed to help players navigate rank tiers, lane roles, and common game information in a clean, lightweight interface. It includes:

- Rank pages for Warrior, Epic, Legend, Mythic, Mythic Honor, and Mythic Glory
- Lane guide section
- About and Contact pages
- FAQ section
- Sitemap navigation
- Firebase integration for data and app configuration

## Tech Stack

- React 19
- Vite 6
- React Router DOM
- Firebase Firestore
- CSS Modules / component-level CSS

## Project Structure

```text
MLBB_Wiki/
├── public/                  # Static assets and images
├── src/
│   ├── About Us/            # About page
│   ├── ContactUs/           # Contact page
│   ├── FAQs/                # FAQ page
│   ├── Header/              # Navigation header
│   ├── Home/                # Landing page
│   ├── Lane/                # Lane information page
│   ├── SiteMap/             # Site index page
│   ├── config/              # Firebase/firestore config helpers
│   ├── pages/               # Rank and progression pages
│   ├── styles/              # Additional shared styling
│   ├── App.jsx              # Main app routing
│   ├── App.css              # Global app styling
│   ├── firebase.js          # Firebase initialization
│   ├── index.css            # Base styling
│   └── main.jsx             # App bootstrap
├── index.html
├── eslint.config.js
├── package.json
├── vite.config.js
├── README.md
└── public/
```

## Features

### Rank & tier information
The app includes tier pages for progression-based content such as:

- Warrior / GM
- Epic / Legend
- Mythic
- Mythic Honor
- Mythic Glory

### Lane Guides
The lane section displays lane-specific information and visuals for gameplay roles.

### Supporting pages
- Home
- About Us
- Contact Us
- FAQs
- Site Map

## Getting Started

### Prerequisites

Make sure you have the following installed:

- Node.js 18+
- npm 9+

### Install dependencies

```bash
npm install
```

### Run locally

```bash
npm run dev
```

Then open the local Vite URL shown in the terminal (typically http://localhost:5173).

### Production build

```bash
npm run build
```

To preview the production build locally:

```bash
npm run preview
```

## Firebase Setup

This project already includes Firebase initialization in `src/firebase.js`. If you are using your own Firebase project, replace the config values in that file with your project credentials.

Example:

```js
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID",
};
```

If Firebase is not required for your use case, you can also remove or simplify the Firebase integration as needed.

## Routes

The app currently includes these routes:

| Route | Description |
| --- | --- |
| `/` | Home page |
| `/warrior-gm` | Warrior / GM rankings |
| `/epic-legend` | Epic and Legend content |
| `/mythic` | Mythic page |
| `/mythical-honor` | Mythic Honor page |
| `/mythical-glory` | Mythic Glory page |
| `/lane` | Lane overview |
| `/about` | About the project |
| `/contact` | Contact page |
| `/SiteMap` | Sitemap |
| `/FAQs` | Frequently asked questions |

## Scripts

```bash
npm run dev     # starts the Vite dev server
npm run build   # creates a production build
npm run preview # previews the production build
npm run lint    # runs ESLint
```

## Notes

- The project is a fan-made resource for Mobile Legends content.
- Assets such as icons, backgrounds, and imagery are included in the `public/` folder.
- Some project content may be customized or expanded depending on your personal use case.

## Contributing

Contributions are welcome. If you want to improve the content, styling, or structure of the project:

1. Fork the repository.
2. Create a feature branch.
3. Make your changes.
4. Open a pull request with a clear description.

## License

This repository does not currently appear to include a dedicated license file. Please check the repository settings or add a license before publishing or sharing the project publicly.

