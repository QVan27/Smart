const express = require("express");
const cors = require("cors");
const errorHandler = require("./middleware/errorHandler");
require('dotenv').config()

const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to smart application." });
});

// routes
require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);
require('./routes/room.routes')(app);
require('./routes/booking.routes')(app);

app.use(errorHandler);

// set port, listen for requests
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

const db = require("./models");
const Role = db.role;
const User = db.user;

db.sequelize.sync({ force: true }).then(() => {
  console.log('Drop and Resync Database');
  initial();
});

function initial() {
  Role.create({
    id: 1,
    name: "USER"
  });

  Role.create({
    id: 2,
    name: "MODERATOR"
  });

  Role.create({
    id: 3,
    name: "ADMIN"
  });

  const bcrypt = require("bcryptjs");
  const passwordAdmin = "admin";
  const passwordModerator = "moderator";

  const hashedPasswordAdmin = bcrypt.hashSync(passwordAdmin, 8);
  const hashedPasswordModerator = bcrypt.hashSync(passwordModerator, 8);

  User.create({
    id: 1,
    firstName: "Quentin",
    lastName: "Vannarath",
    email: "admin@smart.com",
    position: "developer",
    picture: "profile.jpg",
    password: hashedPasswordAdmin,
  }).then(user => {
    Role.findOne({ where: { name: "ADMIN" } }).then(role => {
      user.setRoles([role]).then(() => {
        console.log("Initial user with ADMIN role created successfully.");
      });
    });
  });

  User.create({
    id: 2,
    firstName: "John",
    lastName: "Doe",
    email: "moderator@smart.com",
    position: "developer",
    picture: "profile.jpg",
    password: hashedPasswordModerator,
  }).then(user => {
    Role.findOne({ where: { name: "MODERATOR" } }).then(role => {
      user.setRoles([role]).then(() => {
        console.log("Initial user with MODERATOR role created successfully.");
      });
    });
  });
}