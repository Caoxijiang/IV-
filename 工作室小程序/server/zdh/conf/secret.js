// 'use strict';
var uuid = require('node-uuid');  
var SECRET=uuid.v1();
var ADMIN=uuid.v4();  
console.log("Useruuid:"+SECRET)
console.log("adminuuid:"+ADMIN)
module.exports.SECRET = SECRET;
module.exports.ADMIN = ADMIN;