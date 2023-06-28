const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    // app.get("/api/test/all", controller.allAccess);
    // app.get("/api/test/user", [authJwt.verifyToken], controller.userBoard);
    // app.get("/api/test/moderator", [authJwt.verifyToken, authJwt.isModerator], controller.moderatorBoard);
    // app.get("/api/test/admin", [authJwt.verifyToken, authJwt.isAdmin], controller.adminBoard);

    app.get("/api/users", [authJwt.verifyToken], controller.getUsers)
    app.get("/api/users/:id", [authJwt.verifyToken], controller.getUserById);
    app.get('/api/users/:id/bookings', [authJwt.verifyToken], controller.getUserBookings);
    app.get('/api/user/bookings', [authJwt.verifyToken], controller.getSessionUserBookings);
    app.get('/api/user', [authJwt.verifyToken], controller.getUserInfo);
    app.put("/api/users/:id", [authJwt.verifyToken], controller.updateUser);
    app.delete("/api/users/:id", [authJwt.verifyToken, authJwt.isAdmin], controller.deleteUser);
};