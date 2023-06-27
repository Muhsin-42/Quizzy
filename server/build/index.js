"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const dotenv_1 = __importDefault(require("dotenv"));
const morgan_1 = __importDefault(require("morgan"));
const connection_1 = __importDefault(require("./utils/connection"));
const students_1 = __importDefault(require("./routes/students"));
const faculties_1 = __importDefault(require("./routes/faculties"));
const superusers_1 = __importDefault(require("./routes/superusers"));
const app = (0, express_1.default)();
dotenv_1.default.config();
// Connect to database
(0, connection_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use((0, helmet_1.default)());
app.use((0, morgan_1.default)('common'));
app.use((0, cors_1.default)({
    origin: ['https://quizzy-ecera.netlify.app', 'https://quizzy-superuser.netlify.app', 'https://quizzy-faculty.netlify.app']
}));
// routes
app.use('/api/student', students_1.default);
app.use('/api/faculty', faculties_1.default);
app.use('/api/superuser', superusers_1.default);
const server = app.listen(process.env.PORT, () => {
    console.log(`server is ready at ${process.env.PORT}`);
});
