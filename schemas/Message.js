const mongoose = require('mongoose');

const messageSchema = mongoose.Schema({
    channselId: {type: mongoose.SchemaTypes.ObjectId, ref:"Channel" , required:true},
    senderId: {type: mongoose.SchemaTypes.ObjectId, ref:"User" , required:true},
    senderName:{type: String , required: true},
    text: {type: String , required:true},
    createdAt: {
    type: Date,
    default: Date.now
  }

});

const Message = mongoose.model("Message" , messageSchema);

module.exports = Message;