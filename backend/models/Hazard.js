import mongoose from 'mongoose'

const hazardSchema=new mongoose.Schema({
  
  location:{
    type:{type:String, default:'Point'},
    coordinates:{type:[Number], required:true},
    required:true
  },

  userId:{type:mongoose.Schema.Types.ObjectId, ref:'User', required:true},
  verifiedCount:{type:Number},
  resolved:{type:Boolean, default:false, required:true},
  description: { type: String },
  type: { 
  type: String, 
  enum: ['manhole', 'construction', 'waterlogging', 'broken_pavement', 'traffic', 'other']
}  
},{timestamps:true})

export default mongoose.model('Hazard', hazardSchema)