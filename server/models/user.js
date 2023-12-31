const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt  = require('jsonwebtoken');
const SALT_I = 10;
const config = require('../config/config').get(process.env.NODE_ENV);

const userSchema = mongoose.Schema({
    email:{
        type: String,
        required:true,
        trim:true,
        unique:1
    },
    password:{
        type: String,
        required:true,
        minlength:6 
    },
    name:{
        type: String,
        maxlength:100 
    },
    lastname:{
        type: String,
        maxlength:100 
    },
    role:{
        type:Number,
        default:0
    },
    token:{
        type:String
    }
});

userSchema.pre('save', function(next) {
    const user = this; 
    if(user.isModified('password')) {
        bcrypt.genSalt(SALT_I, function(err,salt) {
            if(err) return next(err);
            bcrypt.hash(user.password,salt,function(err,hash) {
                if(err) return next(err);
                user.password = hash;
                next();
            });
        });
     } else {
        next();
    }
});

userSchema.methods.comparePassword =  function(candidatePassword,cb) {
    bcrypt.compare(candidatePassword,this.password, function(err, isMatch) {
        if(err) return cb(err);
        cb(null,isMatch);

    });
}

userSchema.methods.generateToken = function(cb) {
    const user = this;
    const token = jwt.sign(user._id.toHexString(),config.SECRET);
    user.token = token;
    try {
        user.save();
       return  cb(null,user);
    } catch (err) {
        return cb(err);
    }
}


userSchema.statics.findByToken = function (token,cb) {
    const user = this;
    jwt.verify(token,config.SECRET,async (err,decode) => {

        if (err) return cb(err);
        try {
            const data = await user.findOne({"_id":decode, "token":token}).exec();
             cb(null,data)
        } catch (err) {
            return cb(err)
        }
      
    })
}

userSchema.methods.deleteToken = async function(token,cb) {
    let  user = this;
    try {
        const data = await user.updateOne({token: ''}).exec();
        cb(null,data)   
    } catch (err) {
        cb(err)  
    }
}


const User = mongoose.model('User', userSchema);

module.exports = { User }