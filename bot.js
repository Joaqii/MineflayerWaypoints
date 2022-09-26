// Created by wacky

const fs = require("fs");
const path = require("path");
const waypointDir = path.resolve(__dirname, "./storage/waypoints.json");
const waypointHistory = path.resolve(
  __dirname,
  "./storage/waypointHistory.json"
);
let dataWaypoint = JSON.parse(fs.readFileSync(waypointDir));
let dataWaypointHistory = JSON.parse(fs.readFileSync(waypointHistory));
const mineflayer = require("mineflayer");
console.log(dataWaypoint);

const bot = mineflayer.createBot({
  host: <InsertIP>,
  username: <InsertUsername>, // You can also add a Microsoft account for premium authentication
});

bot.on("login", (a) => {
  let botSocket = bot._client.socket;
  console.log(
    `Bot logged on to ${botSocket.server ? botSocket.server : botSocket._host}`
  );
  bot.chat(
    "im a bot fr, that means im not a real person. just do '!10c help' for a list of what i can do fr"
  );
});

bot.on("end", () => {
  console.log("Bot disconnected.");
});

function waypointCmd() {
  bot.chat("Waypoint commands:");
  bot.chat("!10c waypoint add (x y z) (name)");
  bot.chat("!10c waypoint remove (name)");
  bot.chat("!10c waypoint find (name)");
  bot.chat("!10c waypoint list");
}
function helpCmd() {
  bot.chat("List of commands:");
  bot.chat("!10c waypoint");
  bot.chat("-");
  bot.chat("ok thats all i can do rn sorry");
}

bot.on("chat", (a, b) => {
  if (b.slice(0, 5).toLowerCase() === "!10c " && a !== "10C_Bot") {
    let command = b.slice(5);
    let preCommandArray = command.split(" ");
    let commandArray = [];
    for (let i = 0; i < preCommandArray.length; i++) {
      commandArray.push(preCommandArray[i].toLowerCase());
    }
    console.log(commandArray);
    if (commandArray[0] === "waypoint" && !commandArray[1]) {
      waypointCmd();
    } else if (commandArray[0] === "waypoint" && commandArray[1] == "add") {
      // Add
      if (
        // Checking if all values are inserted
        !commandArray[2] ||
        !commandArray[3] ||
        !commandArray[4] ||
        !commandArray[5]
      ) {
        bot.chat("!10c waypoint add (x y z) (name)");
      } else {
        let coords = [
          Number(commandArray[2]),
          Number(commandArray[3]),
          Number(commandArray[4]),
        ];
        let name = commandArray[5];
        if (coords.includes(NaN)) {
          bot.chat("Please insert a valid set of coords. (Numbers only)");
        } else if (dataWaypoint[name]) {
          bot.chat(
            `Please change the name of the waypoing as '${name}' already exists.`
          );
        } else {
          bot.chat(
            `Adding coords ${coords} with the name ${name} to the database.`
          );
          dataWaypoint[name] = [coords, a];
          dataWaypointHistory[name] = [coords, a];
          fs.writeFileSync(
            waypointHistory,
            JSON.stringify(dataWaypointHistory)
          );
          fs.writeFileSync(waypointDir, JSON.stringify(dataWaypoint));
          bot.chat("Complete!");
          console.log(dataWaypoint);
        }
      }
    } else if (commandArray[0] === "waypoint" && commandArray[1] == "remove") {
      // Remove
      if (!commandArray[2]) {
        bot.chat("!10c waypoint remove (name)");
      } else {
        if (!dataWaypoint[commandArray[2]]) {
          bot.chat("Waypoint does not exist!");
        } else if (dataWaypoint[commandArray[2]][1] !== a) {
          bot.chat("You can only delete waypoints that you made.");
        } else {
          delete dataWaypoint[commandArray[2]];
          fs.writeFileSync(waypointDir, JSON.stringify(dataWaypoint));
          bot.chat(`Successfully deleted waypoint '${commandArray[2]}'.`);
        }
      }
    } else if (commandArray[0] === "waypoint" && commandArray[1] == "find") {
      // find
      if (!commandArray[2]) {
        bot.chat("Please insert a waypoint name to find.");
      } else if (!dataWaypoint[commandArray[2]]) {
        bot.chat("Waypoint does not exist!");
      } else {
        const object = dataWaypoint[commandArray[2]];
        const coords = `${object[0][0]} ${object[0][1]} ${object[0][2]}`;
        bot.chat(`The coords are (${coords})`);
        console.log(coords.split(","));
      }
    } else if (commandArray[0] === "waypoint" && commandArray[1] == "list") {
      bot.chat(`Waypoints: ${String(Object.keys(dataWaypoint))}`);
    }
  }
});

bot;
