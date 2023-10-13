const express = require('express');
const router = express.Router();
const Order = require("../models/Orders.js");

router.post("/orderData", async (req, res) => {
  try {
    let data = req.body.order_data;
    data.unshift({ order_date: req.body.order_date });

    let eId = await Order.findOne({ email: req.body.email });
    //console.log(eId);

    if (eId === null) {
      await Order.create({
        email: req.body.email,
        order_data: [data]
      }).then(() => {
        res.json({ success: true });
      });
    } else {
      await Order.findOneAndUpdate(
        { email: req.body.email },
        { $push: { order_data: data } }
      ).then(() => {
        res.json({ success: true });
      });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).send('Server error: ' + error.message);
  }
});


router.post("/myorderData", async (req, res) => {
  try{
    let myData=await Order.findOne({'email':req.body.email});
    res.json({orderData:myData});
  }catch(error){
    console.log(error.message);
    res.status(500).send('Server error: ' , error.message);
  }
});

module.exports = router;

/* 
const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

router.post('/orderData', async (req, res) => {
  try {
    console.log('Received a request to create/update order data');
    const { order_data, order_date, email } = req.body;
    
    const updatedOrderData = { order_date, order_data };

    let existingOrder = await Order.findOne({ email });

    if (!existingOrder) {
      existingOrder = await Order.create({
        email,
        order_data: [updatedOrderData],
      });
    } else {
      existingOrder.order_data.push(updatedOrderData);
      await existingOrder.save();
    }

    res.json({ success: true });
  } catch (error) {
    console.log(error.message);
    res.status(500).send('Server error');
  }
});

router.post('/myorderData', async (req, res) => {
  try {
    console.log('Received a request to fetch user order data');
    const { email } = req.body;

    const myData = await Order.findOne({ email });

    if (!myData) {
      res.json({ orderData: null });
    } else {
      res.json({ orderData: myData.order_data });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
 */