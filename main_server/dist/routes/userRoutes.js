"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = __importDefault(require("../config/db"));
const router = express_1.default.Router();
// Register new user
router.post('/register', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("registering user");
    console.log(req.body);
    const { email, username, imageUrl, externalUserId, bio } = req.body;
    try {
        const newUser = yield db_1.default.user.create({
            data: {
                email,
                username,
                imageUrl,
                externalUserId,
                bio,
            },
        });
        res.status(201).json(newUser);
        console.log(newUser);
    }
    catch (error) {
        console.log(error);
        res.status(400).json({ error: 'User registration failed', details: error });
    }
}));
// Update user details
router.put('/update/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { email, username, imageUrl, externalUserId, bio } = req.body;
    try {
        const updatedUser = yield db_1.default.user.update({
            where: { id },
            data: {
                email,
                username,
                imageUrl,
                externalUserId,
                bio,
            },
        });
        res.status(200).json(updatedUser);
    }
    catch (error) {
        res.status(400).json({ error: 'User update failed', details: error });
    }
}));
// Delete user details
router.delete('/delete/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        yield db_1.default.user.delete({
            where: { id },
        });
        res.status(200).json({ message: 'User deleted successfully' });
    }
    catch (error) {
        res.status(400).json({ error: 'User deletion failed', details: error });
    }
}));
exports.default = router;
