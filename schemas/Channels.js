const mongoose = require('mongoose');

const channelSchema = mongoose.Schema({
    channelName:{
        type:String,
        required:false,
        default:"Undefined Channel Name!"
    },
    channel_description:{
        type:String,
        required:false,
        default:"Undefined Channel Description!"
    },
    createdBy:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:"User"
    },
    members: [{
        type:mongoose.SchemaTypes.ObjectId,
        ref: "User"
    }]
},{ timestamps: true })

const Channel = mongoose.model("Channel", channelSchema);

module.exports = Channel;