## About SHOPSRUS Project

## Stacks
 - Language/Framework: Javascript(Nodejs)
 - Database: postgres
 - ORM: Sequelize
 - Host: Heroku
 - Test: Mocha and chai
 
# How to run this application

- Clone Project and run
    ```
    yarn install
    ```
Then depending on the environment you want to run on use following commands

 - Development 
    ```
    yarn dev
    ```
 - Production 
    ```
    yarn start
    ```
 - Test 
    ```
    yarn test
    ```

# Base Url
```
Base url: https://shopsrus-gp.herokuapp.com/api/v1
```

# Routes

All routes are token protected, login to get token.

 - Login
    ```
    /login
    {email: "name@email.com", password: "password"}
    ```
 - Customer (Create)
    ```
    /customer/create
    {name: 100, account_type: "EMPLOYEE", discount:"disc_id"} (Discount Id is optional, Account-Type is an ENUM ['REGULAR', 'AFFILIATE', 'EMPLOYEE'])
    ```
 - Customer (Get all) 
    ```
    /customer/all
    ```
 - Customer (Get by Id) 
    ```
    /customer/{{customer_id}}
    ```
 - Customer (Get by name) 
    ```
    /customer/name/jogapps
    ```
 - Discount (Create) 
    ```
    /discount/add
    {desc: "Whatever ", type: "$100 bill", apply_method:"VALUE", value: "100:5"} (Discount Id is optional, Apply-Method is an ENUM ['PERC', 'VALUE']) if method == VALUE value becomes whole number below 100
    ```
 - Customer (Get all) 
    ```
    /discount/all
    ```
 - Discount (Get by Type) 
    ```
    /discount/{type: eg affiliate}
    ```
 - Invoice (Create) 
    ```
    /invoice/add
    {customer: {customer_id}, discount: {discount_id}, product_name: "Headset", groceries: false} (Discount Id is optional)
    ```
