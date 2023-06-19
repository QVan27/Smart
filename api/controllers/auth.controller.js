const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
const Role = db.role;

const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

/**
 * Signs up a new user and saves them to the database.
 *
 * @function signup
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {void}
 * @throws {Error} - If an error occurs while saving the user to the database.
 *
 * @example
 * const req = {
 *     body: {
 *         firstName: "John",
 *         lastName: "Doe",
 *         email: "johndoe@example.com",
 *         position: "Developer",
 *         picture: "profile.jpg",
 *         password: "password123",
 *         roles: ["moderator", "user"]
 *     }
 * };
 * const res = {
 *     send: function(data) { console.log(data); },
 *     status: function(code) { return this; }
 * };
 * signup(req, res);
 */
exports.signup = (req, res) => {
    User.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        position: req.body.position,
        picture: req.body.picture,
        password: bcrypt.hashSync(req.body.password, 8)
    })
        .then(user => {
            if (req.body.roles) {
                Role.findAll({
                    where: {
                        name: {
                            [Op.or]: req.body.roles
                        }
                    }
                }).then(roles => {
                    user.setRoles(roles).then(() => {
                        res.send({ message: "User was registered successfully!" });
                    });
                });
            } else {
                // user role = 1
                user.setRoles([1]).then(() => {
                    res.send({ message: "User was registered successfully!" });
                });
            }
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};

/**
 * Authenticates a user by their email and password.
 *
 * @function signin
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {void}
 * @throws {Error} - If an error occurs during authentication.
 *
 * @example
 * const req = {
 *     body: {
 *         email: "johndoe@example.com",
 *         password: "password123"
 *     }
 * };
 * const res = {
 *     send: (data) => { console.log(data); },
 *     status: (code) => { return this; }
 * };
 * signin(req, res);
 */
exports.signin = (req, res) => {
    User.findOne({
        where: {
            email: req.body.email
        }
    })
        .then(user => {
            if (!user) {
                return res.status(404).send({ message: "User Not found." });
            }

            var passwordIsValid = bcrypt.compareSync(
                req.body.password,
                user.password
            );

            if (!passwordIsValid) {
                return res.status(401).send({
                    accessToken: null,
                    message: "Invalid Password!"
                });
            }

            var token = jwt.sign({ id: user.id }, config.secret, {
                expiresIn: 86400 // 24 hours
            });

            var authorities = [];
            user.getRoles().then(roles => {
                for (let i = 0; i < roles.length; i++) {
                    authorities.push("ROLE_" + roles[i].name.toUpperCase());
                }
                res.status(200).send({
                    id: user.id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    position: user.position,
                    picture: user.picture,
                    roles: authorities,
                    accessToken: token
                });
            });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};
