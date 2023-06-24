const db = require("../models");
const Booking = db.booking;
const User = db.user;

/**
 * Creates a new booking and associates users with the booking.
 *
 * @async
 * @function createBooking
 * @param {Object} req - Express request object.
 * @param {Object} req.body - Request body containing the booking data.
 * @param {string} req.body.startDate - Start date of the booking.
 * @param {string} req.body.endDate - End date of the booking.
 * @param {string} req.body.purpose - Purpose of the booking.
 * @param {string} req.body.roomId - ID of the room for the booking.
 * @param {boolean} [req.body.isModerator=false] - Indicates if the user creating the booking is a moderator.
 * @param {string[]} [req.body.userIds=[]] - Array containing the IDs of users to associate with the booking.
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
 *     isModerator: true,
 *     userIds: ["user1", "user2"]
 * };
 * const req = { body: newBookingData };
 * const res = {
 *     status: function(code) { return this; },
 *     send: function(data) { console.log(data); }
 * };
 * await createBooking(req, res);
 */
exports.createBooking = async (req, res) => {
  const { startDate, endDate, purpose, roomId, isModerator = false, userIds = [] } = req.body;

  if (!roomId) {
    return res.status(400).send({ message: "roomId cannot be null." });
  }

  try {
    // Create a new booking in the database
    const booking = await Booking.create({ startDate, endDate, purpose, roomId, isModerator });

    // Associate the users with the booking
    if (userIds.length > 0) {
      await booking.addUsers(userIds); // Add users to the booking using the association method
    }

    res.send({ message: "Booking created successfully.", booking: booking });
  } catch (err) {
    res.status(500).send({ message: err.message || "An error occurred while creating the booking." });
  }
};

/**
 * Updates a booking by its ID and associates users with the booking.
 *
 * @async
 * @function updateBooking
 * @param {Object} req - Express request object.
 * @param {Object} req.params - Request parameters.
 * @param {string} req.params.bookingId - ID of the booking.
 * @param {Object} req.body - Request body containing updated booking data.
 * @param {string[]} req.body.userIds - Array containing the IDs of users to associate with the booking.
 * @param {Object} res - Express response object.
 * @returns {Promise<void>} - A Promise that resolves with no value upon completion.
 * @throws {Error} - If an error occurs while updating the booking.
 *
 * @example
 * const bookingId = "123456";
 * const updatedBookingData = {
 *     startDate: "2023-06-24",
 *     endDate: "2023-06-25",
 *     purpose: "Updated Meeting",
 *     userIds: ["user1", "user2"]
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

    // Associate the users with the booking
    if (num === 1 && req.body.userIds && req.body.userIds.length > 0) {
      const booking = await Booking.findByPk(bookingId);
      if (booking) {
        await booking.setUsers(req.body.userIds); // Set the users for the booking using the association method
      }
    }

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
 * Retrieves all bookings with associated users.
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
    // Retrieve all bookings from the database, including associated users
    const bookings = await Booking.findAll({
      include: {
        model: User,
        attributes: ['id', 'position', 'picture', 'email'] // Include specific user attributes you want to fetch
      }
    });

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
 */
exports.getBookingById = async (req, res) => {
  const bookingId = req.params.bookingId;

  try {
    // Retrieve the booking by ID, including associated users
    const booking = await Booking.findByPk(bookingId, {
      include: {
        model: User,
        attributes: ['id', 'firstName', 'lastName', 'position', 'picture', 'email'] // Include specific user attributes you want to fetch
      }
    });

    if (!booking) {
      return res.status(404).send({ message: "Booking not found." });
    }

    res.send({ booking });
  } catch (err) {
    res.status(500).send({ message: err.message || "An error occurred while retrieving the booking." });
  }
};

/**
 * Retrieves all users associated with a booking.
 *
 * @async
 * @function getUsersByBooking
 * @param {Object} req - Express request object.
 * @param {Object} req.params - Request parameters.
 * @param {string} req.params.bookingId - ID of the booking.
 * @param {Object} res - Express response object.
 * @returns {Promise<void>} - A Promise that resolves with no value upon completion.
 * @throws {Error} - If an error occurs while retrieving the booking or the associated users.
 *
 * @example
 * const bookingId = "123456";
 * const req = { params: { bookingId: bookingId } };
 * const res = {
 *     send: function(data) { console.log(data); },
 *     status: function(code) { return this; }
 * };
 * await getUsersByBooking(req, res);
 */
exports.getUsersByBooking = async (req, res) => {
  try {
    const bookingId = req.params.bookingId;
    const booking = await Booking.findByPk(bookingId);

    if (!booking) {
      res.status(404).send({ message: "Booking not found." });
      return;
    }

    const users = await booking.getUsers();
    res.status(200).send(users);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};