const { authJwt } = require("../middleware");
const controller = require("../controllers/room.controller");

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

    // app.get(
    //     "/api/test/mod",
    //     [authJwt.verifyToken, authJwt.isModerator],
    //     controller.moderatorBoard
    // );

    // app.get(
    //     "/api/test/admin",
    //     [authJwt.verifyToken, authJwt.isAdmin],
    //     controller.adminBoard
    // );

    app.get(
        "/api/rooms",
        [authJwt.verifyToken],
        controller.getRooms
    );

    app.get(
        "/api/rooms/:id",
        [authJwt.verifyToken],
        controller.getRoomById
    );

    app.post(
        "/api/rooms",
        [authJwt.verifyToken, authJwt.isAdmin],
        controller.createRoom
    );

    app.put(
        "/api/rooms/:id",
        [authJwt.verifyToken, authJwt.isAdmin],
        controller.updateRoom
    );

    app.delete(
        "/api/rooms/:id",
        [authJwt.verifyToken, authJwt.isAdmin],
        controller.deleteRoom
    );
};
