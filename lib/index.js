// jsonfile.js - obj to file or file to obj 
// Author: Simon Li
// Date  : Nov 19, 2019

/* Test 
const jsonfile = require('minijsonfile');
const fileName = "test.json";
const obj = {"one": 1, "two": 2, "three":  [31, 32, 33], "four": {"inner": 41}};

jsonfile.obj2file(obj, fileName);
const obj2 = jsonfile.file2obj(fileName);
console.log(jsonfile.jsonEqual(obj, obj2)? "pass" : "failed");

jsonfile.obj2fileA(obj, fileName, file => {
    const obj2 = jsonfile.file2obj(file);
    console.log(jsonfile.jsonEqual(obj, obj2)? "pass" : "failed");
});
*/

const fs = require('fs');

module.exports.file2obj = file => {
    return JSON.parse(fs.readFileSync(file));
}

module.exports.obj2fileA = (obj, file, callback) => {
    const jsonContent = JSON.stringify(obj);
    fs.writeFile(file, jsonContent, 'utf8', err => {
        if (err) 
            throw new Error(`An error occurred - ${err}`); 
        console.log(`JSON file ${file} has been saved.`);

        if (typeof callback != 'undefined')
            callback(file);
   });
}    
 
module.exports.obj2file = (obj, file) => {
    const jsonContent = JSON.stringify(obj);
    fs.writeFileSync(file, jsonContent, 'utf8')
    console.log(`JSON file ${file} has been saved.`);
} 

module.exports.jsonEqual = (a, b) => JSON.stringify(a) === JSON.stringify(b);