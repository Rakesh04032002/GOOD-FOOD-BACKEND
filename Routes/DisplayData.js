/* const express = require('express');
const router = express.Router();

router.post("/foodData",async (req,res)=>{
    try{
        
        res.send([global.Fooditems,global.FoodCategory])
    }catch(error){
        console.log(error.message);
        res.send("server error");
    }
})

module.exports=router; */

const express = require('express');
const router = express.Router();

router.post('/foodData', async (req, res) => {
  try {
    //console.log('Received a request to fetch food data');
    res.send([global.Fooditems, global.FoodCategory]);
  } catch (error) {
    console.log(error.message);
    res.send('Server error');
  }
});

module.exports = router;
