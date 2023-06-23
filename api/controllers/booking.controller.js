const db = require("../models");
const Booking = db.booking;

/**
 * Creates a new booking.
 *
 * @async
 * @function createBooking
 * @param {Object} req - Express request object.
 * @param {Object} req.body - Request body containing the booking data.
 * @param {Object} res - Express response object.
 * @returns {Promise<void>} - A Promise that resolves with no value upon completion.
 * @throws {Error} - If an error occurs while creating the booking or if `roomId` is null.
 *
 * @example
 * const newBookingData = {
 *     startDate: "2023-06-24",
 *     endDate: "2023-06-25",
 *     purpose: "Meeting",
 *     roomId: "123456",
 *     isModerator: true
 * };
 * const req = { body: newBookingData };
 * const res = {
 *     status: function(code) { return this; },
 *     send: function(data) { console.log(data); }
 * };
 * await createBooking(req, res);
 */
exports.createBooking = async (req, res) => {
  const { startDate, endDate, purpose, roomId, isModerator = false } = req.body;

  if (!roomId) {
    return res.status(400).send({ message: "roomId cannot be null." });
  }

  try {
    // Create a new booking in the database
    const booking = await Booking.create({ startDate, endDate, purpose, roomId, isModerator });
    res.send({ message: "Booking created successfully.", booking: booking });
  } catch (err) {
    res.status(500).send({ message: err.message || "An error occurred while creating the booking." });
  }
};

/**
 * Updates a booking by its ID.
 *
 * @async
 * @function updateBooking
 * @param {Object} req - Express request object.
 * @param {Object} req.params - Request parameters.
 * @param {string} req.params.bookingId - ID of the booking.
 * @param {Object} req.body - Request body containing updated booking data.
 * @param {Object} res - Express response object.
 * @returns {Promise<void>} - A Promise that resolves with no value upon completion.
 * @throws {Error} - If an error occurs while updating the booking.
 *
 * @example
 * const bookingId = "123456";
 * const updatedBookingData = {
 *     startDate: "2023-06-24",
 *     endDate: "2023-06-25",
 *     purpose: "Updated Meeting"
 * };
 * const req = { params: { bookingId: bookingId }, body: updatedBookingData };
 * const res = {
 *     send: function(data) { console.log(data); },
 *     status: function(code) { return this; }
 * };
 * await updateBooking(req, res);
 */
exports.updateBooking = async (req, res) => {
  const bookingId = req.params.bookingId;

  try {
    // Update the booking in the database
    const [num] = await Booking.update(req.body, { where: { id: bookingId } });
    if (num === 1) {
      res.send({ message: "Booking updated successfully." });
    } else {
      res.status(404).send({ message: "Unable to update the booking with the specified ID. Booking not found or empty data provided." });
    }
  } catch (err) {
    res.status(500).send({ message: err.message || "An error occurred while updating the booking." });
  }
};

/**
 * Deletes a booking by its ID.
 *
 * @async
 * @function deleteBooking
 * @param {Object} req - Express request object.
 * @param {Object} req.params - Request parameters.
 * @param {string} req.params.bookingId - ID of the booking.
 * @param {Object} res - Express response object.
 * @returns {Promise<void>} - A Promise that resolves with no value upon completion.
 * @throws {Error} - If an error occurs while deleting the booking.
 *
 * @example
 * const bookingId = "123456";
 * const req = { params: { bookingId: bookingId } };
 * const res = {
 *     send: function(data) { console.log(data); },
 *     status: function(code) { return this; }
 * };
 * await deleteBooking(req, res);
 */
exports.deleteBooking = async (req, res) => {
  const bookingId = req.params.bookingId;

  try {
    // Delete the booking from the database
    const num = await Booking.destroy({ where: { id: bookingId } });
    if (num === 1) {
      res.send({ message: "Booking deleted successfully." });
    } else {
      res.status(404).send({ message: "Unable to delete the booking with the specified ID. Booking not found." });
    }
  } catch (err) {
    res.status(500).send({ message: err.message || "An error occurred while deleting the booking." });
  }
};

/**
 * Retrieves all bookings.
 *
 * @async
 * @function getAllBookings
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Promise<void>} - A Promise that resolves with no value upon completion.
 * @throws {Error} - If an error occurs while retrieving the bookings.
 *
 * @example
 * const req = {};
 * const res = {
 *     send: function(data) { console.log(data); }
 * };
 * await getAllBookings(req, res);
 */
exports.getAllBookings = async (req, res) => {
  try {
    // Retrieve all bookings from the database
    const bookings = await Booking.findAll();
    res.send(bookings);
  } catch (err) {
    res.status(500).send({ message: err.message || "An error occurred while retrieving the bookings." });
  }
};

/**
 * Retrieves a booking by its ID.
 *
 * @async
 * @function getBookingById
 * @param {Object} req - Express request object.
 * @param {Object} req.params - Request parameters.
 * @param {string} req.params.bookingId - ID of the booking.
 * @param {Object} res - Express response object.
 * @returns {Promise<void>} - A Promise that resolves with no value upon completion.
 * @throws {Error} - If an error occurs while retrieving the booking.
 *
 * @example
 * const bookingId = "123456";
 * const req = { params: { bookingId: bookingId } };
 * const res = {
 *     send: function(data) { console.log(data); },
 *     status: function(code) { return this; }
 * };
 * await getBookingById(req, res);
 */
exports.getBookingById = async (req, res) => {
  const bookingId = req.params.bookingId;

  try {
    // Retrieve a booking by its ID from the database
    const booking = await Booking.findByPk(bookingId);
    if (booking) {
      res.send(booking);
    } else {
      res.status(404).send({ message: "Booking not found with the specified ID." });
    }
  } catch (err) {
    res.status(500).send({ message: err.message || "An error occurred while retrieving the booking." });
  }
};

/**
 * Retrieves all bookings belonging to a room.
 *
 * @async
 * @function getBookingsByRoomId
 * @param {Object} req - Express request object.
 * @param {Object} req.params - Request parameters.
 * @param {string} req.params.roomId - ID of the room.
 * @param {Object} res - Express response object.
 * @returns {Promise<void>} - A Promise that resolves with no value upon completion.
 * @throws {Error} - If an error occurs while retrieving the bookings.
 *
 * @example
 * const roomId = "123456";
 * const req = { params: { roomId: roomId } };
 * const res = {
 *     send: function(data) { console.log(data); },
 *     status: function(code) { return this; }
 * };
 * await getBookingsByRoomId(req, res);
 */
exports.getBookingsByRoomId = async (req, res) => {
  const roomId = req.params.roomId;

  try {
    // Retrieve all bookings belonging to a room from the database
    const bookings = await Booking.findAll({ where: { roomId: roomId } });
    res.send(bookings);
  } catch (err) {
    res.status(500).send({ message: err.message || "An error occurred while retrieving the bookings." });
  }
};
