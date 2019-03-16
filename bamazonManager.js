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
        message: 'What would you like to do?'.yellow,
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

        }
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
    return new Promise(function(resolve, reject){
        connection.query('SELECT * FROM products WHERE stock_quantity <= 5', function(err, res){
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

//Function to add inventory to SQL DB
function addInventory() {
    return inquirer.prompt([{
        name: 'item',
        message: 'Enter the item number of the product you would like to add stock to.'.yellow,
        type: 'input',
        validate: function(value) {
            // Validator to ensure the product number is a number and it exists
            if ((isNaN(value) === false) && (value <= numberOfProductTypes)) {
                return true;
            } else {
                console.log('\nPlease enter a valid item ID.'.bgRed.bold);
                return false;
            }
        }
    }, {
        name: 'quantity',
        message: 'How much stock would you like to add?'.Yellow,
        type: 'input',
        // Validator to ensure it is number
        validate: function(value) {
            if (isNaN(value) === false) {
                return true;
            } else {
                console.log('\nPlease enter a valid quantity.'.bgRed.bold);
                return false;
            }
        }
    }]).then(function(answer) {
        return new Promise(function(resolve, reject) {
            connection.query('SELECT stock_quantity FROM products WHERE ?', { item_id: answer.item }, function(err, res) {
                if (err) reject(err);
                resolve(res);
            });
        }).then(function(result) {
            var updatedQuantity = parseInt(result[0].stock_quantity) + parseInt(answer.quantity);
            var itemId = answer.item;
            connection.query('UPDATE products SET ? WHERE ?', [{
                stock_quantity: updatedQuantity
            }, {
                item_id: itemId
            }], function(err, res) {
                if (err) throw err;
                console.log('The total stock has been updated to: ' + updatedQuantity + '.');
                enterManagerApp();
            });
            // catch errors
        }).catch(function(err) {
            console.log(err);
            connection.destroy();
        });
        // catch errors
    }).catch(function(err) {
        console.log(err);
        connection.destroy();
    });
}
//Function to add a new product to the DB
function addProduct(){

}
