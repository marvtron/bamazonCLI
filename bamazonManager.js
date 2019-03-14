console.log('hello world');

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
    database: 'bamazon_DB'
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
            console.log("Welcome Manager!".bgCyan.red.bold);
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
    inquirer.prompt([{
        name: 'entrance',
        message: 'What would you like to do?',
        type: 'list',
        choices: ['View Products for Sale', 'View Low Inventory', 'Add to Inventory', 'Add New Product', 'EXIT']
    }]).then(function(answer){
        switch (answer.entrance) {
            case 'View Products for Sale':
                itemsForSale();
                break;
            case 'View Low Inventory':
                lowInventory();
                break;
            case 'Add to Inventory':
                addInventory();
                break;
            case 'Add New Product':
                addProduct();
                break;
            case 'EXIT':
                console.log('Gooodbye Manager!'.bgCyan.red.bold);
                connection.destroy();
                return;
                break;
            default:
                enterManagerApp();
                break;

        };
    });
}

//Logs all items
function logItems(result) {
    result.forEach(function(item){
        numberOfProductTypes++;
        console.log('Item ID: '.cyan + item.item_id + ' || Product Name: '.yellow + item.product_name + ' || Department: '.blue + item.department_name + ' || Price: '.green + item.price + ' || Stock: '.cyan + item.stock_quantity); 
    });
}

//Grabs all items for sale from DB
function itemsForSale() {
    return new Promise(function(resolve, reject){
        connection.query('SELECT * FROM products', function(err, res){
            if (err) reject(err);
            resolve(res);
        });
    }).then(function(result){
        logItems(result);
    }).then(function(){
        enterManagerApp();
        //catch errors
    }).catch(function(err){
        console.log(err);
        connection.destroy();
    });
}

//grabs all items with an inventory > 5
function lowInventory(){

}

//Function to add inventory to SQL DB
function addInventory(){

}

//Function to add a new product to the DB
function addProduct(){

}
