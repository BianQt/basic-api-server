'use strict';

 module.exports = (req,res,next)=>{
     let userName = req.query.name;
     if(userName) { next()}
     else {throw new Error('No name found!')}
 }