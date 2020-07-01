const {app, BrowserWindow, ipcMain} = require('electron');
const url = require('url');
const path = require('path');

let win; 

function createWindow() {
    
    win = new BrowserWindow({frame: false, height: 400, width: 500, webPreferences:{nodeIntegration:true}, show: false});
    
    win.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file', 
        slashes: true
    }))
   
    win.on('closed', () => {
        win = null;
    })

    win.once('ready-to-show', () => {
        win.show();
    })
}


app.on('ready', createWindow);