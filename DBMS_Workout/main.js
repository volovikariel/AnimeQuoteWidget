console.log('main process working');

const electron = require("electron");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const path = require("path");
const url = require("url");

let win;

function createWindow() {
    win = new BrowserWindow();
    win.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'), 
        protocol: 'file',
        slashes: true
    }));
    
    // DEV TOOLS
    // win.webContents.openDevTools();
    win.on('closed', () => {
        win = null;
    })
}

app.on('ready', createWindow);

// MAC----------------------------------------
app.on('window-all-closed', () => {
    if(process.platform != 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if(win == null) {
        createWindow();
    }
});


// Postgres Connection
var pg = require('pg');
var conString = "postgres://postgres:postgresilikeanime@localhost:5432/Workout";

const client = new pg.Client(conString);
client.connect();

const makeQuery = function(queryStatement) {
    
    client.query(queryStatement).then(res => {

        const headers = res.fields.map(field => field.name);
        // Connect to the table
        let table = document.getElementById("table");

        let row = table.insertRow(0);

        let cell = row.insertCell(0);
        cell.innerHTML = `Header Titles:${JSON.stringify(Object.keys(headers))}:${JSON.stringify(Object.values(headers))} - ${res.rowCount} rows`;
        
        for(let i = 0; i < res.rowCount; i++) {
            console.log(`Data row #${i}: ${JSON.stringify(Object.keys(res.rows[i]))}:${JSON.stringify(Object.values(res.rows[i]))}`);
        }
    
    }).catch(err => {
        console.log(err.stack);
    }).finally((res) => {
        console.log(`Query called: ${queryStatement}`);
    });    
}

makeQuery('SELECT table_name AS TableName FROM information_schema.tables WHERE table_schema=\'public\';');


//--------------------------------------------


// Create new windows by just creating new BrowserWindows - these can act as popups with their own HTML template for Buttons accept/textfield, etc.
/*
User:
    User ID [PK]
    First Name [varchar(20)]
    Last Name [varchar(20)]

Exercise Types:
    Exercise Type ID [PK]
    Exercise Type Name [varchar(20)]

Exercise:
    Exercise ID [PK]
    Exercise Type ID [FK]
    Name [varchar(40)]

Routine:
    Routine ID [PK]
    Array of Exercise IDs [FKs]
  
History:
    User ID [FK]
    Date + Time of start [Timestamp]
    Workout Duration [smallint]
    Avg. Rest time [smallint] 
    Routine ID [FK]
    Exercise ID [FK]
    Array of Sets [ARRAY]
*/