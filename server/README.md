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