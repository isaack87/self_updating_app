# Self-Update Electron App

This project is a cross-platform Electron application that supports **Windows**, **Linux**, and **MacOS**. It includes both a backend server (Node.js) and a React-based frontend. The app demonstrates a simple self-updating mechanism where:

- The backend increments the version number at regular intervals (simulates constant new versions being pushed out for this application).
- The frontend checks the backend periodically for updates.
- When a new version is detected by the frontend, it triggers an update process that simulates downloading and updating the application using a mock up fake pipeline visuals.

## Demo Video

[![Watch the demo video](https://i.ibb.co/yyCyRff/Screenshot-2024-10-01-154941.png)](https://streamable.com/s77ry2 "Click to watch the demo video")

## Features

- **Cross-Platform**: Supports Windows, Mac, and Linux builds using Electron.
- **Version Update Simulation**: Backend increments the version number every minute.
- **Electron Integration**: The app packages both the backend and frontend together using Electron, allowing it to run as a standalone desktop application.
- **Polling Mechanism**: The frontend polls the backend 30 seconds to check for updates.
- **Auto Update**: When a new version is detected, the frontend triggers a simulation of updating the version and refreshing the UI to reflect the latest version. The Electron autoUpdater is integrated to check for real updates. When a new version is available, the app notifies the user that an update is being downloaded. After the update is downloaded, the app automatically installs the update and prompts the user to restart the app for the changes to take effect.

## Tech Stack

- **Electron**: Provides the framework for creating cross-platform desktop applications.
- **Node.js (Express)**: Backend API that increments version numbers and returns back to frontend changes to simulate versions updating.
- **React**: The frontend of the application, built with Create React App.
- **Electron Builder**: Used to package the app for Windows, Linux, and Mac.

## Future Improvements

- **Testing**: Write some unit, intregration, system, and user acceptance testing.
- **Linter**: Coding style format.
- **Webhook Implementation**:  Integrate webhooks to trigger specific actions when an update is made. This could automate processes such as notifying users, logging updates, or initiating deployment processes whenever a new version is published. For this example I have used a set timeout to simulate versions being updated regularly. 

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-repo/self-update-electron-app.git
cd self-update-electron-app
```

### 2. Install dependencies
```bash
npm run install
```

### 3. Add .env files for frontend /  backend
```bash
cp backend/example.env backend/.env
cp frontend/example.env frontend/.env
```

### 4. Run the app in development mode with FRONTEND & BACKEND
```bash
npm run start
```

### 5. Build the app for production
```bash
npm run build-electron
```
