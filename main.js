const { app, BrowserWindow } = require("electron");

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
  });

  win.loadFile("index.html");
  win.webContents.openDevTools();
};
// creer une fenetre au demarrage de l'application lors que l'application est prete et la promesse est resolue
app.whenReady().then(() => {
  createWindow();

  // quitter des que touts les fenetres sont fermes sauf sur mac
  app.on("window-all-closed", () => {
    if (process.platform !== "darwin") app.quit();
  });
});
