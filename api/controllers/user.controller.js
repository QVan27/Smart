const db = require("../models");
const User = db.user;
const Booking = db.booking;
const bcrypt = require("bcryptjs");

exports.allAccess = (req, res) => {
    res.status(200).send("Public Content.");
};

exports.userBoard = (req, res) => {
    res.status(200).send("User Content.");
};

exports.adminBoard = (req, res) => {
    res.status(200).send("Admin Content.");
};

exports.moderatorBoard = (req, res) => {
    res.status(200).send("Moderator Content.");
};

/**
 * Retrieves all users from the database.
 *
 * @async
 * @function getUsers
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Promise<void>} - A Promise that resolves with no value upon completion.
 * @throws {Error} - If an error occurs while retrieving the users.
 *
 * @example
 * getUsers(req, res);
 */
exports.getUsers = async (req, res) => {
    try {
        const users = await User.findAll();

        res.status(200).send(users);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
}

/**
 * Retrieves a user by their ID from the database.
 *
 * @async
 * @function getUserById
 * @param {Object} req - Express request object.
 * @param {Object} req.params - Request parameters.
 * @param {string} req.params.id - ID of the user to retrieve.
 * @param {Object} res - Express response object.
 * @returns {Promise<void>} - A Promise that resolves with no value upon completion.
 * @throws {Error} - If an error occurs while retrieving the user or if the user does not exist.
 *
 * @example
 * getUserById(req, res);
 */
exports.getUserById = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);

        if (!user) {
            res.status(404).send({ message: "User does not exist!" });
            return;
        }

        res.status(200).send(user);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
}

/**
 * Deletes a user from the database.
 *
 * @async
 * @function deleteUser
 * @param {Object} req - Express request object.
 * @param {Object} req.params - Request parameters.
 * @param {string} req.params.id - ID of the user to delete.
 * @param {Object} res - Express response object.
 * @returns {Promise<void>} - A Promise that resolves with no value upon completion.
 * @throws {Error} - If an error occurs while retrieving the user or if the user does not exist.
 *
 * @example
 * deleteUser(req, res);
 */
exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);

        if (!user) {
            res.status(404).send({ message: "User does not exist!" });
            return;
        }

        await user.destroy();
        res.status(200).send({ message: "User deleted successfully!" });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
}

/**
 * Updates a user in the database.
 *
 * @async
 * @function updateUser
 * @param {Object} req - Express request object.
 * @param {Object} req.params - Request parameters.
 * @param {string} req.params.id - ID of the user to update.
 * @param {Object} req.body - Request body containing updated user data.
 * @param {string} [req.body.name] - Updated name of the user.
 * @param {string} [req.body.email] - Updated email address of the user.
 * @param {string} [req.body.password] - Updated password of the user.
 * @param {Object} res - Express response object.
 * @returns {Promise<void>} - A Promise that resolves with no value upon completion.
 * @throws {Error} - If an error occurs while retrieving the user or if the user does not exist.
 *
 * @example
 * const updatedUserData = {
 *     name: "John Doe",
 *     email: "johndoe@example.com",
 *     password: "newpassword",
 * };
 * const req = { params: { id: 123 }, body: updatedUserData };
 * const res = {
 *     status: function(code) { return this; },
 *     send: function(data) { console.log(data); }
 * };
 * await updateUser(req, res);
 */
exports.updateUser = async (req, res) => {
    try {
        if (req.body.password) req.body.password = bcrypt.hashSync(req.body.password, 8);

        const user = await User.findByPk(req.params.id);

        if (!user) {
            res.status(404).send({ message: "User does not exist!" });
            return;
        }

        await user.update(req.body);
        res.status(200).send({ message: "User updated successfully!" });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
}

/**
 * Retrieves the bookings associated with a user from the database.
 *
 * @async
 * @function getUserBookings
 * @param {Object} req - Express request object.
 * @param {Object} req.params - Request parameters.
 * @param {string} req.params.id - ID of the user to retrieve the bookings for.
 * @param {Object} res - Express response object.
 * @returns {Promise<void>} - A Promise that resolves with no value upon completion.
 * @throws {Error} - If an error occurs while retrieving the user or if the user does not exist.
 *
 * @example
 * const req = {
 *   params: { id: "123" },
 * };
 * const res = {
 *   status: function(code) { return this; },
 *   send: function(data) { console.log(data); }
 * };
 * await getUserBookings(req, res);
 */
exports.getUserBookings = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id, {
            include: ["bookings"],
        });

        if (!user) {
            res.status(404).send({ message: "User does not exist!" });
            return;
        }

        const bookings = user.bookings;
        res.status(200).send(bookings);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};