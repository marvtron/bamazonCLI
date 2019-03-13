//console.log('hello world');

// Require NPM packages
const mysql = require('mysql');
const inquirer = require('inquirer');
const colors = require('colors');

// Setup connection to SQL server
var connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'bamazon_db'
});

// Set counter for total number of products
var numberOfProductTypes = 0;


/*Do not call Promise.resolve on a thenable that resolves to itself. 
  This will cause infinite recursion as it tries to flatten what seems to be an infinitely nested promise. */

//Connect to DB 
connection.connect(function(err){
    //Throw error if it errors
    if (err) throw (err);
    //New promise that selects all data from the table
    new Promise(function(resolve, reject) {
        connection.query('SELECT * FROM products', function(err, res){
            if (err) reject(err);
            resolve(res);
            console.log("Welcome Manager!".bgCyan);
        });
    }).then(function(result) {
        //increment # of products based on DB
        result.forEach(function(item){
            numberOfProductTypes++;
        });
        return enterManagerApp();
        //catch errors
    }).catch(function(err){
        console.log(err);
    });
});

//Enter the manager prompts
function enterManagerApp(){
    
}

