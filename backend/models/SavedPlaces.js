import mongoose from 'mongoose'

const savedPlacesSchema=new mongoose.Schema({
  userId:{type:mongoose.Schema.Types.ObjectId, ref:'User', required:true},
  location:{
    type:{type:String, default:'Point'},
    coordinates:{type:[Number], required:true},
    required:true
  },
  type:{type:String, enum:['home','work','clinic', 'others'], required:true},
  name:{type:String, required:true}
},{timestamps:true})

export default mongoose.model('SavedPlaces',savedPlacesSchema)