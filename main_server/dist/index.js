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
exports.prisma = void 0;
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const modelRoutes_1 = __importDefault(require("./routes/modelRoutes"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const dbContextRoutes_1 = __importDefault(require("./routes/dbContextRoutes"));
const cors_1 = __importDefault(require("cors"));
exports.prisma = new client_1.PrismaClient(); // Prisma Client
const port = process.env.PORT || 4000;
const app = (0, express_1.default)();
// middlewares
app.use((0, cors_1.default)({
    origin: process.env.CORS_ORIGIN || "http://localhost:3000", // Adjust the origin as needed
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));
app.use(express_1.default.json());
// routes
app.get("/", (req, res) => {
    res.send("Express + TypeScript Server");
});
app.use('/', modelRoutes_1.default);
app.use('/user', userRoutes_1.default);
app.use('/', dbContextRoutes_1.default);
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        app.listen(port, () => {
            console.log(`Server is running on http://localhost:${port}`);
        });
    }
    catch (error) {
        console.error(error.message);
    }
});
startServer();
