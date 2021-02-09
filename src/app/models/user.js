const mongoose = require('../../database');
const bcrypt = require('brcyptjs');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
}, 
password: {
    type: String,
    required: true,
    select: false,
},
passwordResetToken: {
  type: String,
  select: false,
},
passwordResetExpires: {
 type: Date,
 select: false,
},
createdAt: {
    type: Date,
    default: date.now, 
},
})

UserSchema.pre('save', async function(next) {
const hash = await bcrypt.hash(this.passward, 10);
this.passward = hash;

next();
});

const User = mongoose.model('User', UserSchema);
module.exports = User;