import { app, BrowserWindow, WebContentsView } from "electron";
import path from "node:path";

process.env.DIST = path.join(__dirname, "../dist");
process.env.VITE_PUBLIC = app.isPackaged
  ? process.env.DIST
  : path.join(process.env.DIST, "../public");

let win: BrowserWindow | null;
const VITE_DEV_SERVER_URL = process.env["VITE_DEV_SERVER_URL"];

function createWindow() {
  win = new BrowserWindow({
    icon: path.join(process.env.VITE_PUBLIC, "icon.png"),
    webPreferences: {
      // preload: path.join(__dirname, 'preload.js'),
    },
    autoHideMenuBar: true,
    frame: false,
    width: 1200,
    height: 800,
    backgroundColor: "#070709",
    titleBarStyle: "hidden",
    titleBarOverlay: {
      color: "#00000000",
      symbolColor: "#ffffff",
      height: 28,
    },
  });

  const view = new WebContentsView();
  win.contentView.addChildView(view);
  view.webContents.loadURL("https://hn.evan.graphics");
  view.setBackgroundColor("#000000");
  view.setBounds({ x: 0, y: 28, width: 1200, height: 800 - 28 });

  win.on("resize", () => {
    view.setBounds({ x: 0, y: 28, width: win!.getBounds().width, height: win!.getBounds().height - 28 });
  });


  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL);
  } else {
    win.loadFile(path.join(process.env.DIST, "index.html"));
  }
}

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
    win = null;
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

app.whenReady().then(createWindow);
