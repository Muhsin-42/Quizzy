"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const QuizSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    difficulty: {
        type: String,
        required: true,
    },
    totalQuestions: {
        type: Number,
        required: true
    },
    tags: {
        type: [String],
        required: false,
    },
    author: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'faculties',
        required: true,
    },
    questions: [
        {
            question: {
                type: String,
            },
            options: {
                type: [String],
            },
            answer: {
                type: Number,
            },
        },
    ],
    isDelete: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });
const QuizModel = (0, mongoose_1.model)('quizs', QuizSchema);
exports.default = QuizModel;
