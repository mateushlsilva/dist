"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Sequelize = require('sequelize');
const database = require('./connect');
const airplane = database.define('airplanes', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    model: {
        type: Sequelize.STRING,
        allowNull: false
    },
    engine: {
        type: Sequelize.STRING,
        allowNull: false
    },
    certification: {
        type: Sequelize.STRING,
        allowNull: false
    },
    aircraftWeightMin: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    aircraftWeightMax: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    reverserAmount: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    brakingApplicationLevel: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});
module.exports = airplane;