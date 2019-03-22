# bamazonCLI
Amazon-like storefront using MySQL &amp; Node. The app will take in orders from customers and deplete stock from the store's inventory. The app is programmed to track product sales across the store's departments and then provide a summary of the highest-grossing departments in the store.

### Within the client's (customer) stotrefront you are able to:

- View inventory: 
  * the client will see an up to date list of items for sale, to include the prices

- Select an item to purchase:
  * the client will be able to select an item or items to purchase, have their transaction total calculated, and update the         database to reflect the change in stock

![customer](https://github.com/marvtron/bamazonCLI/blob/master/Screenshots/bamazonCustomer.png)


### Within the adminstrator's (manager) interface you are able to: 

- View Products for Sale: 
   * the administrator will see an up to date list of items for sale, to include the department, prices, and stock level

- View Low Inventory:
  * the administrator will be given a list of any and all items whose stock levels have fallen below 5

- Add to Inventory:
  * admin will be prompted to provide the itm number of the product they would like to add additional stock to,                   updating the database to reflect the change.

- Add New Product:
  * admin can add a new product to the storefront to be sold, admin is prompted to provide the name, department, price,           and initial stock quantity.
  
  ![manager](https://github.com/marvtron/bamazonCLI/blob/master/Screenshots/bamazonManager.png)

### Getting Started

1. Clone down repo.
2. Run command 'npm install' in Terminal or GitBash
3. Create a MySQL database with the bamazon.sql code
4. Enter your MySQL password in bamazonCustomer.js and bamazonManager.js
5. Run command 'node bamazonCustomer.js' or 'node bamazonManager.js'

#### Tech used:
- Node.js
- MySQL
- npm Inquirer https://www.npmjs.com/package/inquirer
- npm Colors https://www.npmjs.com/package/colors

###### Prerequisites
- Node.js - Download the latest version of Node https://nodejs.org/en/

**Built With:**
 - VS Code
   - Author:
    *Marvin Tryon Jr - Node JS - MySQL*





**My Website**
https://marvtron.github.io/My-Portfolio/
