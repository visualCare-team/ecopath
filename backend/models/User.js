import mongoose from 'mongoose'

const userSchema=new mongoose.Schema({
  name:{
    type:String,
    required:true
  },
  phoneNumber:{type:String, required: true, unique:true},
  password:{type:String, required:true},
  emergencyContacts:[{type:String}],
  preferredLanguage:{type:String}
},{timestamps:true})

export default mongoose.model('User', userSchema)