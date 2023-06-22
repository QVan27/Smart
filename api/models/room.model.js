module.exports = (sequelize, Sequelize) => {
    const Room = sequelize.define("rooms", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        image: {
            type: Sequelize.STRING,
            allowNull: false
        },
        capacity: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        floor: {
            type: Sequelize.STRING,
            allowNull: false
        },
        pointOfContactName: {
            type: Sequelize.STRING,
            allowNull: false
        },
        pointOfContactEmail: {
            type: Sequelize.STRING,
            allowNull: false
        }
    });

    const BookedTime = sequelize.define("booked_times", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        startDate: {
            type: Sequelize.STRING,
            allowNull: false
        },
        endDate: {
            type: Sequelize.STRING,
            allowNull: false
        },
        purposeOfBooking: {
            type: Sequelize.STRING,
            allowNull: false
        },
        isModerator: {
            type: sequelize.BOOLEAN,
            defaultValue: false
        }
    });

    Room.hasMany(BookedTime, {
        foreignKey: {
            allowNull: false
        }
    });
    BookedTime.belongsTo(Room);

    return Room;
};
