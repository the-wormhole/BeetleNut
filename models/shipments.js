const mongoose = require('mongoose');

const shipmentSchema = new mongoose.Schema({
    ShipId:{
        type:String,
        required: true
    },
    LogisticsName:{
        type:String,
        required:true
    },
    OrderId:{
        type:String,
        required:true
    }
},{timestamps:true});

const Shipment= mongoose.model('Shipment',shipmentSchema);

module.exports = Shipment;