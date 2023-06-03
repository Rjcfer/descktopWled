const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
// require bootstrap and jquery from angular modules
//require("bootstrap");

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  ipcMain.handle("ping", () => "pong");
  win.loadFile("index.html");
  // win.webContents.openDevTools(); uncomment to open dev tools
  win.setIcon("assets/icons/icon.ico");
};
// creer une fenetre au demarrage de l'application lors que l'application est prete et la promesse est resolue
app.whenReady().then(() => {
  createWindow();

  // quitter des que touts les fenetres sont fermes sauf sur mac
  app.on("window-all-closed", () => {
    if (process.platform !== "darwin") app.quit();
  });
});
