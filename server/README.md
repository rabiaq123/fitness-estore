# JSON OBJECTS SYNTAX

When using the API, use this syntax (tableName, parameters, data)
```
"data": {
        "tableName": "PRODUCTS",
        "identifiers": {
            "product_id": 6
        }, 
        "data": [{
                "product_name": "weights",
                "product_description": "This is a product description",
                "category": "Weights",
                "quantity": 44,
                "price": 175.50,
                "notes": "none"
            },
            {
                "product_name": "protein",
                "product_description": "This is a product description for protein",
                "category": "Protein",
                "quantity": 25,
                "price": 30.40,
                "notes": "notes"
            }
        ]
    }
```
## Updating the server api
Before doing all that, make sure you have heroku installed on your laptop then login to heroku from the terminal using heroku login. This will prompt you to login to the heroku CLI, then you will be able to run heroku commands.
When you want to update the api, first make sure you are in the root of the repository (CIS3750_JS) and add and commit them like you usually do. Then in order to push and deploy those changes to heroku (the server), write 'git subtree push --prefix server heroku master'. 