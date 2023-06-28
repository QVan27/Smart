const express = require("express");
const cors = require("cors");
const errorHandler = require("./middleware/errorHandler");
require('dotenv').config()

const app = express();

const corsOptions = {
  origin: process.env.CORS_ORIGIN
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
// const User = db.user;

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

  // const bcrypt = require("bcryptjs");
  // const passwordAdmin = "admin";
  // const passwordModerator = "moderator";
  // const passwordUser = "user";

  // const hashedPasswordAdmin = bcrypt.hashSync(passwordAdmin, 8);
  // const hashedPasswordModerator = bcrypt.hashSync(passwordModerator, 8);
  // const hashedPasswordUser = bcrypt.hashSync(passwordUser, 8);

  // User.create({
  //   // id: 1,
  //   firstName: "Quentin",
  //   lastName: "Vannarath",
  //   email: "admin@smart.com",
  //   position: "developer",
  //   picture: "https://media.licdn.com/dms/image/C4E03AQH8u8YIiiczfA/profile-displayphoto-shrink_800_800/0/1607001937665?e=1693440000&v=beta&t=kA7vju3Au11g1MYpdsPt7lhL5tXgHJ03P5eujtwSmpg",
  //   password: hashedPasswordAdmin,
  // }).then(user => {
  //   Role.findOne({ where: { name: "ADMIN" } }).then(role => {
  //     user.setRoles([role]).then(() => {
  //       console.log("Initial user with ADMIN role created successfully.");
  //     });
  //   });
  // });

  // User.create({
  //   // id: 2,
  //   firstName: "John",
  //   lastName: "Doe",
  //   email: "moderator@smart.com",
  //   position: "manager",
  //   picture: "https://images.unsplash.com/photo-1499996860823-5214fcc65f8f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=766&q=80",
  //   password: hashedPasswordModerator,
  // }).then(user => {
  //   Role.findOne({ where: { name: "MODERATOR" } }).then(role => {
  //     user.setRoles([role]).then(() => {
  //       console.log("Initial user with MODERATOR role created successfully.");
  //     });
  //   });
  // });

  // User.create({
  //   // id: 3,
  //   firstName: "Jane",
  //   lastName: "Doe",
  //   email: "user@smart.com",
  //   position: "designer",
  //   picture: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=688&q=80",
  //   password: hashedPasswordUser,
  // }).then(user => {
  //   Role.findOne({ where: { name: "USER" } }).then(role => {
  //     user.setRoles([role]).then(() => {
  //       console.log("Initial user with USER role created successfully.");
  //     });
  //   });
  // });
}