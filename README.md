# MineflayerWaypoints
A simple waypoint plugin for Mineflayer (My first coding project)

What does this do?
- This waypoint plugin allows players to add, remove, find, and list waypoints. This plugin is useful for storing waypoints in a storage that players can then retrieve later on if they need access to those waypoints again.

How to use it:
!bot waypoint - (Shows list of commands)
!bot waypoint add (x y z) (name) - (Adds waypoint)
!bot waypoint remove (name) - (Removes waypoint)
!bot waypoint find (name) - (Finds waypoint)
!bot waypoing list - (Lists all waypoints)

How does this plugin work?
- This plugin uses the mineflayer package to work. Other additional requirements are 'path' and 'fs'.
- This plugin stores all waypoints in a local JSON file that contains the name of waypoint, coordinates of waypoint, and username of the player that created the waypoint.

Before initializing the bot, please change the placeholders in lines 15, 16, and 49.

If there are any issues, please let me know as this is my first coding project. I am no where near even an intermediate coder, I am still very much a beginner. Thank you!
