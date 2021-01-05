const mongoose = require('mongoose');
const validator  = require('validator');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        trim: true,
        required: true
    },

    lastName: {
        type: String,
        trim: true,
        required: true,
    },

    phone: {
        type: Number,
        trim: true,
        required: true,
    },

    email: {
        type: String,
        trim: true,
        required: true,
        unique: true,
        lowercase: true,

        validate(value) {
            if(!validator.isEmail(value)){
                throw new Error('invalid email format')
            }
        }
    },

    password: {
        type: String,
        trim: true,
        required: true,
        minlength: 6,
        
        validate(value) {
            if(value.includes('password' || 'PASSWORD')){
                throw new Error('password can be hacked')
            }
        }
    },

    confirmPassword: {
        type: String,
        trim: true,
        required:true,
        minlength: 6,
    },

    tokens:[{
        token: {
            type: String,
            required: true
        }
    }]
});

// generating token for the users.
// userSchema.methods.generateAuthToken = async function() {
//     const user = this;

//     const token = jwt.sign({_id:user._id.toString()}, 'thisisgenetratedtogetthtetoek234232')
//     user.tokens = user.tokens.concat({ token })
    
//     await user.save()

//     return token
// }


userSchema.methods.generateAuthToken = async function () {
    const user = this;
    const token = jwt.sign({_id:user._id.toString()}, process.env.JWT_SECRET_KEY);

    user.tokens = user.tokens.concat({ token })
    await user.save()
    
    return token
}


// checking if passwords match...
userSchema.pre('save', async function(next) {
    const user = this;

    if(user.password !== user.confirmPassword){
        throw new Error('sorry passwords do not match')
    }
})

// encrypting the password
userSchema.pre('save', async function(next){
    const user = this;

    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password, 8)
    }

    if(user.isModified('confirmPassword')){
        user.confirmPassword = await bcrypt.hash(user.confirmPassword, 8)
    }

    next()

})


const User = mongoose.model('User', userSchema)


module.exports = User