import mongoose from "mongoose";

const sosSchema=new mongoose.Schema({
  userId:{type:mongoose.Schema.Types.ObjectId, ref:'User', required:true},
  location:{
    type:{type:String, default:'Point'},
    coordinates:{type:[Number], required:true}
  },
  status:{type:String, enum:['active', 'resolved'], default:'active' },
  message:{type:String, default:'need help'},
  resolvedAt:{type:Date}
},{timestamps:true})

export default mongoose.model('SOS', sosSchema)