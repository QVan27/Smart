const db = require("../models");
const Room = db.room;

/**
 * Creates a new room.
 *
 * @async
 * @function createRoom
 * @param {Object} req - Express request object.
 * @param {Object} req.body - Request body containing room data.
 * @param {string} req.body.name - Name of the room.
 * @param {string} req.body.image - Image URL of the room.
 * @param {number} req.body.capacity - Capacity of the room.
 * @param {string} req.body.floor - Floor of the room.
 * @param {string} req.body.pointOfContactEmail - Email address of the point of contact for the room.
 * @param {string} req.body.pointOfContactPhone - Phone number of the point of contact for the room.
 * @param {Object} res - Express response object.
 * @returns {Promise<void>} - A Promise that resolves with no value upon completion.
 * @throws {Error} - If an error occurs while creating the room.
 *
 * @example
 * const newRoomData = {
 *     name: "Conference Room",
 *     image: "room.jpg",
 *     capacity: 10,
 *     floor: "2nd floor",
 *     pointOfContactEmail: "contact@example.com",
 *     pointOfContactPhone: "1234567890"
 * };
 * const req = { body: newRoomData };
 * const res = {
 *     status: function(code) { return this; },
 *     send: function(data) { console.log(data); }
 * };
 * await createRoom(req, res);
 */
exports.createRoom = async (req, res) => {
  // Check if all required data is present
  if (!req.body.name || !req.body.image || !req.body.capacity || !req.body.floor || !req.body.pointOfContactEmail || !req.body.pointOfContactPhone) {
    res.status(400).send({ message: "All data must be provided!" });
    return;
  }

  // Create a new Room instance with the provided data
  const room = {
    name: req.body.name,
    image: req.body.image,
    capacity: req.body.capacity,
    floor: req.body.floor,
    pointOfContactEmail: req.body.pointOfContactEmail,
    pointOfContactPhone: req.body.pointOfContactPhone
  };

  try {
    // Save the room to the database
    const data = await Room.create(room);
    res.send(data);
  } catch (err) {
    res.status(500).send({ message: err.message || "An error occurred while creating the room." });
  }
};

/**
 * Retrieves all rooms.
 *
 * @async
 * @function getAllRooms
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Promise<void>} - A Promise that resolves with no value upon completion.
 * @throws {Error} - If an error occurs while retrieving the rooms.
 *
 * @example
 * const req = {};
 * const res = {
 *     send: function(data) { console.log(data); }
 * };
 * await getAllRooms(req, res);
 */
exports.getAllRooms = async (req, res) => {
  try {
    // Retrieve all rooms from the database
    const data = await Room.findAll();
    res.send(data);
  } catch (err) {
    res.status(500).send({ message: err.message || "An error occurred while retrieving the rooms." });
  }
};

/**
 * Retrieves a room by its ID.
 *
 * @async
 * @function getRoomById
 * @param {Object} req - Express request object.
 * @param {Object} req.params - Request parameters.
 * @param {string} req.params.id - ID of the room.
 * @param {Object} res - Express response object.
 * @returns {Promise<void>} - A Promise that resolves with no value upon completion.
 * @throws {Error} - If an error occurs while retrieving the room.
 *
 * @example
 * const roomId = "123456";
 * const req = { params: { id: roomId } };
 * const res = {
 *     send: function(data) { console.log(data); },
 *     status: function(code) { return this; }
 * };
 * await getRoomById(req, res);
 */
exports.getRoomById = async (req, res) => {
  const id = req.params.id;

  try {
    // Retrieve a room by its ID from the database
    const data = await Room.findByPk(id);
    if (data) {
      res.send(data);
    } else {
      res.status(404).send({ message: "Room not found with the specified ID." });
    }
  } catch (err) {
    res.status(500).send({ message: err.message || "An error occurred while retrieving the room." });
  }
};

/**
 * Updates a room by its ID.
 *
 * @async
 * @function updateRoom
 * @param {Object} req - Express request object.
 * @param {Object} req.params - Request parameters.
 * @param {string} req.params.id - ID of the room.
 * @param {Object} req.body - Request body containing updated room data.
 * @param {Object} res - Express response object.
 * @returns {Promise<void>} - A Promise that resolves with no value upon completion.
 * @throws {Error} - If an error occurs while updating the room.
 *
 * @example
 * const roomId = "123456";
 * const updatedRoomData = {
 *     name: "Updated Room",
 *     capacity: 20
 * };
 * const req = { params: { id: roomId }, body: updatedRoomData };
 * const res = {
 *     send: function(data) { console.log(data); },
 *     status: function(code) { return this; }
 * };
 * await updateRoom(req, res);
 */
exports.updateRoom = async (req, res) => {
  const id = req.params.id;

  try {
    // Update the room in the database
    const num = await Room.update(req.body, { where: { id: id } });
    if (num == 1) {
      res.send({ message: "Room updated successfully." });
    } else {
      res.status(404).send({ message: `Unable to update the room with the specified ID. Room not found or empty data provided.` });
    }
  } catch (err) {
    res.status(500).send({ message: err.message || "An error occurred while updating the room." });
  }
};

/**
 * Deletes a room by its ID.
 *
 * @async
 * @function deleteRoom
 * @param {Object} req - Express request object.
 * @param {Object} req.params - Request parameters.
 * @param {string} req.params.id - ID of the room.
 * @param {Object} res - Express response object.
 * @returns {Promise<void>} - A Promise that resolves with no value upon completion.
 * @throws {Error} - If an error occurs while deleting the room.
 *
 * @example
 * const roomId = "123456";
 * const req = { params: { id: roomId } };
 * const res = {
 *     send: function(data) { console.log(data); },
 *     status: function(code) { return this; }
 * };
 * await deleteRoom(req, res);
 */
exports.deleteRoom = async (req, res) => {
  const id = req.params.id;

  try {
    // Delete the room from the database
    const num = await Room.destroy({ where: { id: id } });
    if (num == 1) {
      res.send({ message: "Room deleted successfully." });
    } else {
      res.status(404).send({ message: `Unable to delete the room with the specified ID. Room not found.` });
    }
  } catch (err) {
    res.status(500).send({ message: err.message || "An error occurred while deleting the room." });
  }
};