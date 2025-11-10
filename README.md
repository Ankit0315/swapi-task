# Star Wars Characters App

A modern React application for browsing and exploring Star Wars characters from the Star Wars API (SWAPI). Built with React, TypeScript, Vite, and Tailwind CSS.

## How to Run the Project

### Prerequisites

- Node.js (v20)
- npm

### Installation & Setup

1. Clone the repository:

```bash
git clone <repository-url>
cd star-war-app
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Demo Credentials

- **Username:** `admin`
- **Password:** `password123`

## Implemented

### Core Features

- **Character Browsing** - View all Star Wars characters with pagination support

- **Character Details Modal** - Click any character card to view comprehensive details including:
  - Height (converted to meters)
  - Mass
  - Birth year
  - Number of films
  - Date added
  - Homeworld information (name, terrain, climate, population)
- **Species-Based Color Coding** - Each character card displays unique color gradients based on their species
- **Responsive Design** - Fully responsive modals and UI that adapt to mobile, tablet, and desktop screen sizes

### Bonus Features

- **Search Functionality** - Real-time search to filter characters by name
- **Authentication System** - Login/Logout functionality with secure session management using localStorage
