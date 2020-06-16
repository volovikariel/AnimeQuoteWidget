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

//-------------------------------------------------------------------------------------------------------------------
// Postgres Connection
var pg = require('pg');
var conString = "postgres://postgres:postgresilikeanime@localhost:5432/Workout";

const client = new pg.Client(conString);
client.connect();

const makeQuery = function(queryStatement) {
    
    client.query(queryStatement).then(res => {

        const headers = res.fields.map(field => field.name);
        // Connect to the table
        /*let table = document.getElementById("table");

        let row = table.insertRow(0);

        let cell = row.insertCell(0);
        cell.innerHTML = `Header Titles:${JSON.stringify(Object.keys(headers))}:${JSON.stringify(Object.values(headers))} - ${res.rowCount} rows`;*/
        
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