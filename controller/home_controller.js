const Shipment = require('../models/shipments');
const fetch = require('node-fetch');
const excel = require('../excel');
module.exports.home = async function(req,res){
try{
    let AllShipments = await Shipment.find({});
    return res.render('home',{
        shipments:AllShipments
    });
}catch(err){
    console.log(err,'Error loading shipments');
    return;
}

}

module.exports.create = async function(req,res){
    try{
        let NewShipment = await Shipment.create({
            ShipId:req.body.ShipId,
            LogisticsName:req.body.LogisticsName,
            OrderId:req.body.OrderId
        });
        console.log('******',NewShipment);
        return res.redirect('back');
    }catch(err){
        console.log(err,'Error in adding shipment to database...');
        return;
    }

}

module.exports.track = async function(req,res){
    let trackId = req.params.id;
    let body = {
        "trackingNumber": trackId
    }
    try{
        let result = await fetch('https://api.ship24.com/public/v1/tracking/search', {
            method: 'post',
            body:    JSON.stringify(body),
            headers: { 'Content-Type': 'application/json; charset=utf-8',
                        'Authorization':'Bearer apik_HMQkGj1fmf8Soz623pYSAmvRcTHdjD'
                    },
        })
        let json = await result.json();
        //console.log(json.data.trackings[0].events[0].datetime);

        //Shipement Id
        var shipmentId;
        if(json.data.trackings[0].shipment.shipmentId){
            shipmentId = json.data.trackings[0].shipment.shipmentId;
            console.log("Success..")
        }else{
            console.log("Error in calling the API");
            return res.status(404).json({
                message:"Invalid Tracking id/ Order Id"
            })
        }

        //delivery date
        var delDate;
        if(json.data.trackings[0].shipment.delivery.estimatedDeliveryDate){
            delDate = json.data.trackings[0].shipment.delivery.estimatedDeliveryDate;
        }else{
            delDate = 'Not mentioned'
        }

        //Status Code
        var stat; 
        if(json.data.trackings[0].events[0].status){
            stat = json.data.trackings[0].events[0].status;
        }else{
            stat = "Not Mentioned";
        }

        // Date and Time
        var datTime;
        if(json.data.trackings[0].events[0].datetime){
            datTime = json.data.trackings[0].events[0].datetime;
        }else{
            datTime = "Not Mentioned";
        }

        // Service Provider
        var logisctic;
        if(json.data.trackings[0].shipment.delivery.service){
            logisctic = json.data.trackings[0].shipment.delivery.service;
        }else{
            logisctic = "Not Mentioned";
        }
        return res.render('track_order',{
            track:trackId,
            orderdetails:{
                shipmentId:shipmentId,
                trackingNumber:trackId,
                delivery_date:delDate,
                status:stat,
                Datetime:datTime,
                service:logisctic
            }
        });
    }catch(err){
        console.log(err,"Error in calling the API");
        return res.status(404).json({
            message:"Invalid Tracking id/ Order Id"
        })
    }
}

module.exports.print = async function(req,res){
    let trackId = req.params.id;
    let body = {
        "trackingNumber": trackId
    }
    try{
        let result = await fetch('https://api.ship24.com/public/v1/tracking/search', {
            method: 'post',
            body:    JSON.stringify(body),
            headers: { 'Content-Type': 'application/json; charset=utf-8',
                        'Authorization':'Bearer apik_HMQkGj1fmf8Soz623pYSAmvRcTHdjD'
                    },
        })
        let json = await result.json();

        //Shipement Id
        var shipmentId;
        if(json.data.trackings[0].shipment.shipmentId){
            shipmentId = json.data.trackings[0].shipment.shipmentId;
            console.log("Success..")
        }else{
            console.log("Error in calling the API");
            return res.status(404).json({
                message:"Invalid Tracking id/ Order Id"
            })
        }

        //delivery date
        var delDate;
        if(json.data.trackings[0].shipment.delivery.estimatedDeliveryDate){
            delDate = json.data.trackings[0].shipment.delivery.estimatedDeliveryDate;
        }else{
            delDate = 'Not mentioned'
        }

        //Status Code
        var stat; 
        if(json.data.trackings[0].events[0].status){
            stat = json.data.trackings[0].events[0].status;
        }else{
            stat = "Not Mentioned";
        }

        // Date and Time
        var datTime;
        if(json.data.trackings[0].events[0].datetime){
            datTime = json.data.trackings[0].events[0].datetime;
        }else{
            datTime = "Not Mentioned";
        }

        // Service Provider
        var logisctic;
        if(json.data.trackings[0].shipment.delivery.service){
            logisctic = json.data.trackings[0].shipment.delivery.service;
        }else{
            logisctic = "Not Mentioned";
        }

        //
        let orderdet = {
            shipmentId:shipmentId,
            trackingNumber:trackId,
            delivery_date:delDate,
            status:stat,
            Datetime:datTime,
            service:logisctic
        };
        await excel.store(orderdet);
        return res.status(200).json({
            message:"Downloaded file"
        })
    }catch(err){
        console.log(err,"Error in downloading file!!");
        return res.status(404).json({
            message:"Error in downloading file!!"
        })
    }
}