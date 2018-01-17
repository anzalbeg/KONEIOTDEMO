var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
const url = require('url');  
const querystring = require('querystring');

var urlencodedParser = bodyParser.urlencoded({
    extended: false
})
var request = require('request');
var database = require('../config/dbconfig');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('new');
});


router.get('/equipment/search', function(req, res, next) {
  var limitvalue = req.query.limit;
    console.log('limitvalue id ---'+limitvalue);
    var find_equipment_json = {
      limit: limitvalue,
      include_docs: true 
    }
    database.equipmentDB.list(find_equipment_json).then((result) => {
      console.log(' top '+limitvalue+'equipment found --'+JSON.stringify(result));
      res.send(result);
    }).catch((err) => {
      res.send(err);
    });
});


router.get('/equipment/:equipment_id', function(req, res, next) {
    console.log('equiment id ---'+req.params.equipment_id);
    var find_equipment_json = {
      selector: {
          equipment_no: req.params.equipment_id
      }
    }
        // var equipment_no_name = {name:'equipment_no', type:'json', index:{fields:['equipment_no']}}
        // database.equipmentDB.index(equipment_no_name, function(er, response) {
        //   if (er) {
        //     throw er;
        //   }
       //   console.log('Index creation result: %s', response.result);
           database.equipmentDB.find(find_equipment_json).then((result) => {
            console.log('equipment_no found--'+JSON.stringify(result));
            res.send(result);
          }).catch((err) => {
            res.send(err);
       // });
        });
         
});




router.post('/equipment', urlencodedParser, (req, res) => {
    let newequipmentobj = req.body;
    console.log('newequipmentobj-----' + newequipmentobj);
    console.log('json string ----' + JSON.stringify(newequipmentobj));
    var newequipmentjsonobj = JSON.parse(JSON.stringify(newequipmentobj));
    if (newequipmentjsonobj.hasOwnProperty('equipment_no')) {
        let newequipment_no = newequipmentjsonobj.equipment_no;
        console.log('newequipment_no-----' + newequipment_no);
        let equipment_noToFindJson = {
            selector: {
                equipment_no: newequipment_no
            }
        };
        database.equipmentDB.find(equipment_noToFindJson).then((result) => {
            console.log('result fin equipment_no---' + JSON.stringify(result));
            var resultJsonObj = JSON.parse(JSON.stringify(result));
            console.log(resultJsonObj.docs.length);
            if (resultJsonObj.docs.length > 0) {
                res.send('equipmentexist');
            } else {
                //register new equipment
               database.equipmentDB.insert(newequipmentjsonobj).then((result) => {
                  res.send('ok');
                }).catch((err) => {
                  console.log("err in inserting the new equipement"+err);
                });
            }
        }).catch((err) => {
            console.log('err in finding new equipment--' + JSON.stringify(err));
            res.render('../views/new.html', {
                Error: true,
                Message: err
            })
        })
    } else {
        res.render('../views/new.html', {
            Error: true,
            Message: "Invalid JSON Field"
        })
    }
});



module.exports = router;