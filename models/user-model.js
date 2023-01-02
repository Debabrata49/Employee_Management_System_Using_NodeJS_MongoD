const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

var userSchema = new Schema({
    name: {
        type: String,
        required: true,
        default: ""
    },
    email: {
        type: String,
        required: true,
        default: ""
    },
    phone: {
        type: String,
        required: true,
        default: ""
    },
    password: {
        type: String
    },
    role: {
        type: String,
        default: "0"
    },
    profile_image: {
        type: String,
        default: ""
    },
}, {
    timestamps: true,
    versionKey: false
});

userSchema.pre("save", async function(next){
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password, 10)
    }

    next();
})

module.exports = mongoose.model('User1', userSchema);