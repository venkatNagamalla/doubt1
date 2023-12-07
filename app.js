const express = require("express");
const app = express();
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const path = require("path");
const dbPath = path.join(__dirname, "cricketTeam.db");
let db = null;

const initializeDBAndServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });
    app.listen(3000, () => {
      console.log("Starting...");
    });
  } catch (e) {
    console.log(e.message);
    process.exit(1);
  }
};

initializeDBAndServer();

//get all players
app.get("/players/", async (request, response) => {
  const getAllPlayersQuery = `
      SELECT * FROM cricket_team;
    `;
  const playersArray = await db.all(getAllPlayersQuery);
  response.send(playersArray);
});
