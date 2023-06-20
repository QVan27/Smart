const db = require("../models");
const Room = db.room;

/**
 * Creates a new room.
 *
 * @async
 * @function createRoom
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Promise<void>} - A Promise that resolves with no value upon completion.
 * @throws {Error} - If an error occurs while creating the room.
 *
 * @example
 * const newRoomData = {
 *     name: "Conference Room",
 *     capacity: 10
 * };
 * const req = { body: newRoomData };
 * const res = {
 *     status: function(code) { return this; },
 *     send: function(data) { console.log(data); }
 * };
 * await createRoom(req, res);
 */
exports.createRoom = async (req, res) => {
    try {
        const { name, capacity } = req.body;

        if (!name || !capacity) {
            res.status(400).send({ message: "Name and capacity are required!" });
            return;
        }

        const room = await Room.create({ name, capacity });

        res.status(201).send({ message: "Room created successfully!", room });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

/**
 * Retrieves all rooms from the database.
 *
 * @async
 * @function getRooms
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Promise<void>} - A Promise that resolves with no value upon completion.
 * @throws {Error} - If an error occurs while retrieving the rooms.
 *
 * @example
 * getRooms(req, res);
 */
exports.getRooms = async (req, res) => {
    try {
        const rooms = await Room.findAll();

        res.status(200).send(rooms);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

/**
 * Retrieves a room by its ID from the database.
 *
 * @async
 * @function getRoomById
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Promise<void>} - A Promise that resolves with no value upon completion.
 * @throws {Error} - If an error occurs while retrieving the room or if the room does not exist.
 *
 * @example
 * getRoomById(req, res);
 */
exports.getRoomById = async (req, res) => {
    try {
        const room = await Room.findByPk(req.params.id);

        if (!room) {
            res.status(404).send({ message: "Room does not exist!" });
            return;
        }

        res.status(200).send(room);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

/**
 * Updates a room in the database.
 *
 * @async
 * @function updateRoom
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Promise<void>} - A Promise that resolves with no value upon completion.
 * @throws {Error} - If an error occurs while retrieving the room or if the room does not exist.
 *
 * @example
 * const updatedRoomData = {
 *     name: "Updated Room",
 *     capacity: 15
 * };
 * const req = { params: { id: 123 }, body: updatedRoomData };
 * const res = {
 *     status: function(code) { return this; },
 *     send: function(data) { console.log(data); }
 * };
 * await updateRoom(req, res);
 */
exports.updateRoom = async (req, res) => {
    try {
        const { name, capacity } = req.body;

        if (!name || !capacity) {
            res.status(400).send({ message: "Name and capacity are required!" });
            return;
        }

        const room = await Room.findByPk(req.params.id);

        if (!room) {
            res.status(404).send({ message: "Room does not exist!" });
            return;
        }

        await room.update({ name, capacity });

        res.status(200).send({ message: "Room updated successfully!" });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

/**
 * Deletes a room from the database.
 *
 * @async
 * @function deleteRoom
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Promise<void>} - A Promise that resolves with no value upon completion.
 * @throws {Error} - If an error occurs while retrieving the room or if the room does not exist.
 *
 * @example
 * deleteRoom(req, res);
 */
exports.deleteRoom = async (req, res) => {
    try {
        const room = await Room.findByPk(req.params.id);

        if (!room) {
            res.status(404).send({ message: "Room does not exist!" });
            return;
        }

        await room.destroy();
        res.status(200).send({ message: "Room deleted successfully!" });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};
