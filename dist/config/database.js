"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initDB = initDB;
const mongoose_1 = __importDefault(require("mongoose"));
async function initDB() {
    try {
        await mongoose_1.default.connect(process.env.MONGO_URI);
        console.log("Database connection: SUCCESSFUL");
    }
    catch (error) {
        console.log("Database connection: FAILED", error);
        process.exit(1);
    }
}
