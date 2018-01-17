var Cloudant = require("cloudant");

cloudant = Cloudant({url:"https://467fab83-f298-4c08-8ce2-83e458f1d0a4-bluemix:afd1075d3492117215306f7287367683ca5a29f5e6f45d79676754e9c1947e8e@467fab83-f298-4c08-8ce2-83e458f1d0a4-bluemix.cloudant.com",plugin:"promises"});
var equipmentDB = cloudant.db.use("equipment");
// Cloudant DB Url

module.exports = {
  equipmentDB:equipmentDB
};
