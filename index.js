const { app, BrowserWindow, dialog } = require("electron");
const path = require("path");
const fs = require("fs");
const https = require("https");
const url = require("url");

const downloadUrl = "https://jummb.us/jummbox_offline";
const downloadDir = path.join(__dirname, "download");

if (!fs.existsSync(downloadDir)) {
    fs.mkdirSync(downloadDir);
}

const localFilePath = path.join(downloadDir, "index.html");

function downloadFile(downloadUrl, localFilePath, callback) {
    https
        .get(downloadUrl, function (response) {
            const file = fs.createWriteStream(localFilePath);
            response.pipe(file);
            file.on("finish", function () {
                file.close(callback);
            });
        })
        .on("error", function (err) {
            if (callback) callback(err.message);
        });
}

function createWindow() {
    let win = new BrowserWindow({
        width: 800,
        height: 600,
        autoHideMenuBar: true,
        webPreferences: {
            devTools: true,
            preload: path.join(__dirname, "preload.js"),
            nodeIntegration: true,
        },
        icon: path.join(__dirname, "icon.png"),
    });

    win.maximize();

    downloadFile(downloadUrl, localFilePath, function (err) {
        if (err) {
            if (fs.existsSync(localFilePath)) {
                win.loadFile(localFilePath);
            } else {
                win.loadURL("https://jummb.us/");
            }
        } else {
            win.loadFile(localFilePath);
        }
    });

    win.on("close", function (e) {
        const choice = dialog.showMessageBoxSync(this, {
            type: "warning",
            buttons: ["Yes", "No"],
            title: "Quit",
            message: "Are you sure you want to quit? Changes you made may not be saved.",
        });
        if (choice === 1) {
            e.preventDefault();
        } else {
            win.destroy();
        }
    });
}

app.whenReady().then(() => {
    createWindow();

    app.on("activate", function () {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

app.on("window-all-closed", function () {
    if (process.platform !== "darwin") app.quit();
});
