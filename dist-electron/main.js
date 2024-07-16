"use strict";const e=require("electron"),t=require("node:path");process.env.DIST=t.join(__dirname,"../dist");process.env.VITE_PUBLIC=e.app.isPackaged?process.env.DIST:t.join(process.env.DIST,"../public");let n;const s=process.env.VITE_DEV_SERVER_URL;function r(){n=new e.BrowserWindow({icon:t.join(process.env.VITE_PUBLIC,"icon.png"),webPreferences:{},autoHideMenuBar:!0,frame:!1,width:1200,height:800,backgroundColor:"#070709",titleBarStyle:"hidden",titleBarOverlay:{color:"#00000000",symbolColor:"#ffffff",height:28}});const o=new e.WebContentsView;n.contentView.addChildView(o),o.webContents.loadURL("https://hn.evan.graphics"),o.webContents.setWindowOpenHandler(({url:i})=>(e.shell.openExternal(i),{action:"deny"})),o.webContents.on("will-navigate",function(i,l){i.preventDefault(),e.shell.openExternal(l)}),o.setBackgroundColor("#000000"),o.setBounds({x:0,y:28,width:1200,height:772}),n.on("resize",()=>{o.setBounds({x:0,y:28,width:n.getBounds().width,height:n.getBounds().height-28})}),s?n.loadURL(s):n.loadFile(t.join(process.env.DIST,"index.html"))}e.app.on("window-all-closed",()=>{process.platform!=="darwin"&&(e.app.quit(),n=null)});e.app.on("activate",()=>{e.BrowserWindow.getAllWindows().length===0&&r()});e.app.whenReady().then(r);
