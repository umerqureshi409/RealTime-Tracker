// const express = require('express');
// const app = express();  
// const http = require("http");
// const path = require("path");
// const socketio = require("socket.io");
// const server = http.createServer(app);
// const io = socketio(server);

// app.set("view engine","ejs");
// // app.set(express.static(path.join(__dirname, "public")));
// app.use('/css', express.static(path.join(__dirname, 'public', 'css'), {
//     setHeaders: (res, path) => {
//       if (path.endsWith('.css')) {
//         res.setHeader('Content-Type', 'text/css');
//       }
//     }
//   }));
  
//   app.use('/js', express.static(path.join(__dirname, 'public', 'js'), {
//     setHeaders: (res, path) => {
//       if (path.endsWith('.js')) {
//         res.setHeader('Content-Type', 'application/javascript');
//       }
//     }
//   }));
// io.on("connection" , function (socket) {
//     socket.on("send-location",function(data){
//     io.emit( "receive-location", {id: socket.id , ...data});
//     });
//     socket.on("disconnect" , function(){
//         io.emit("user-disconnect", socket.id);
//     });
    
// });
// app.get("/",function (req,req){
// req.render("index");
// } );

// server.listen(3000);


const express = require('express');
const app = express();
const http = require("http");
const path = require("path");
const socketio = require("socket.io");
const server = http.createServer(app);
const io = socketio(server);

app.set("view engine", "ejs");

// Middleware for serving static files
app.use('/css', express.static(path.join(__dirname, 'public', 'css')));
app.use('/js', express.static(path.join(__dirname, 'public', 'js')));

// Handle socket connections
io.on("connection", function (socket) {
    // Listen for location data from clients
    socket.on("send-location", function (data) {
        io.emit("receive-location", { id: socket.id, ...data });
    });

    // Handle user disconnect event
    socket.on("disconnect", function () {
        io.emit("user-disconnect", socket.id);
    });
});

// Serve the login page
app.get("/", (req, res) => {
    res.render("login");
});

// Serve the map page after username submission
app.get("/map", (req, res) => {
    const username = req.query.username;
    if (!username) {
        return res.redirect("/");
    }
    res.render("index", { username });
});

// Start the server
server.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});
