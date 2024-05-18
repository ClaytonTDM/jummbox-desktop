# JummBox Desktop

**JummBox Desktop** is a desktop app version of JummBox, an online tool for sketching and sharing instrumental music.

This app aims to provide a more convenient way to use JummBox offline by just opening an app, rather than downloading the newest offline version from the website.

## Features

- **Offline Use**: Use JummBox without an internet connection.

- **Automatic Updates**: The app will automatically check for updates and download them when available.

- **Cross-Platform**: Available on Windows, macOS, and Linux. (Android and iOS versions are planned.)

## Installation

There are currently no pre-built binaries available. You can build the app from source by following the instructions below.

### Prerequisites

- [Node.js](https://nodejs.org/) (v20 or higher)
- [PNPM](https://pnpm.io/installation/)

### Running the App

1. Download the repository:

    - Click the green "Code" button on the repository page.
    - Click "Download ZIP".
    - Extract the ZIP file to a folder.

2. Open a terminal in the folder where you extracted the ZIP file.

3. Run the following commands (assuming you have Node.js and PNPM installed):

    ```sh
    pnpm install
    pnpm start
    ```

    The app should open in a new window.