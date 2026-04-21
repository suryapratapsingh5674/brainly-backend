import mongoose from "mongoose";

const linkSchema = new mongoose.Schema({
    hash: {
        type: String,
        required: true,
        unique: true, // critical
    },
    contentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Content",
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
}, {
    timestamps: true
});

const LinkModel = mongoose.model("Link", linkSchema);

export default LinkModel;