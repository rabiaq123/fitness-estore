const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const { query } = require('express');
const connection = require('./dbAuth.js');
const router = express.Router();
const app = express();

app.use(morgan('tiny'));
app.use(cors());
app.use(bodyParser.json());

/* Status codes when performing GET/POST requests */
const status = {
    success: 200,
    error: 500,
    notfound: 404,
    unauthorized: 401,
    conflict: 409,
    created: 201,
    bad: 400,
    nocontent: 204,
}

/** 
 *  Retrieves all records from products table 
 * ----------------------
 *  @returns records -> list of all the products
 */
router.get('/getProducts', (req, res) => {

    (async function () {
        try {
            let result = await DBRunner(queryStringBuilder('SELECT', 'PRODUCTS', [], []), []);
            let rows = result.rows;
            res.status(status.success).send({
                message: "successfully retrieved " + rows.length + " product(s)",
                records: rows,
            });
        } catch (error) {
            res.status(status.error).send(error.message);
        }

    })();
});

/** Retrieves all data from the specified table using the specified identifier
 * Used for getting/searching from a table
 * ----------------------
 * @params data {table, identifier}
 */
router.get('/getData', (req, res) => {
    let JSONObject = JSON.parse(req.query.data);
    console.log(JSONObject);
    (async function () {
        try {
            const returnData = await DBRunner(queryStringBuilder('SELECT', JSONObject.tableName, [], JSONObject.identifiers), []);
            //console.log(returnData.rows);
            res.status(status.success).send({
                message: "Successfully retrieved " + returnData.rows.length + " row(s) from " + JSONObject.tableName,
                rows: returnData.rows
            });
        } catch (error) {
            console.log(error);
            res.status(status.error).send(error);
        }
    })();

});

/** Inserts rows to the specified table
 * ----------------------
 * @params data {tableName, data[]}
 */
router.post('/addData', (req, res) => {
    let JSONObject = req.body.data;
    // console.log(JSONObject);
    (async function () {
        try {
            // Setting the current date to the date_created and date_updated fields
            for (var i = 0; i < JSONObject.data.length; i++) {
                let record = JSONObject.data[i];
                record.date_created = getCurrDate();
                record.date_updated = getCurrDate();
            }

            const returnData = await DBRunner(queryStringBuilder('INSERT', JSONObject.tableName, JSONObject.data, {}), flattenArray(JSONObject.data));
            // console.log(returnData.rows);
            res.status(status.success).send({
                message: "Successfully inserted " + returnData.rowCount + " row(s) to " + JSONObject.tableName,
                rows: returnData.rows
            });
        } catch (error) {
            console.log(error.details);
            res.status(status.error).send(error.details);
        }
    })();
});

/** Updates rows to the specified table using the specified identifier (generally the ID, which should be in the first row)
 * ----------------------
 * @params data {tableName, data[] (with identifiers)}
 */
router.post('/updateData', (req, res) => {
    let JSONObject = req.body.data;
    console.log(JSONObject);

    (async function () {
        try {
            let count = 0;
            //Updating each row 
            for (var i = 0; i < JSONObject.data.length; i++) {
                let record = JSONObject.data[i];
                record.date_updated = getCurrDate();

                //Extracting identifiers
                let identifiers = {}
                let colNames = Object.keys(record);
                let colValues = Object.values(record);
                identifiers[colNames.shift()] = colValues.shift();

                const returnData = await DBRunner(queryStringBuilder('UPDATE', JSONObject.tableName, colNames, identifiers), colValues);
                count += returnData.rowCount;
                // console.log(returnData);
            }
            res.status(status.success).send({
                message: "Successfully updated " + count + " row(s) from " + JSONObject.tableName,
            });
        } catch (error) {
            console.log(error.details);
            res.status(status.error).send(error.details);
        }
    })();
});


/** Deletes rows from the specified table (including tables with related foreign keys) using the specified identifier (generally the ID)
 * ----------------------
 * @params data {tableName, identifiers}
 */
router.post('/deleteData', (req, res) => {
    let JSONObject = req.body.data;

    (async function () {
        try {
            // Deleting from a table
            returnData = await DBRunner(queryStringBuilder('DELETE', JSONObject.tableName, [], JSONObject.identifiers), []);
            res.status(status.success).send({
                message: `successfully deleted ${returnData.rowCount} record(s) from ${JSONObject.tableName}`,
            });
            
        } catch (error) {
            res.status(status.error).send(error.message);
        }
    })();

});


/**
 * Gets current date in the appropriate format
 * ----------------------
 * @returns curDate -> current date in YYYY-MM-DD HH:MM:SS format
 */
function getCurrDate() {
    var today = new Date();
    //var curDate = today.getDate() + "/" + (today.getMonth() + 1) + "/" + today.getFullYear() + " " + today.getHours() + ":" + today.getMinutes()
    var curDate = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate() + " " + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds()
    return curDate;
}

/**
 * Helper function which flattens a 2D array into a 1D array
 * ----------------------
 * @param array 2D array to be flattened
 * 
 * @returns newArr -> flattened 2D array
 */
function flattenArray(array) {
    var newArr = [];
    array.forEach(element => Object.values(element).forEach(value => {
        newArr.push(value)
    }));
    return newArr;
}


/**
 * Helper function which dynamically builds the SQL query string
 * ----------------------
 * @param operation type of operation being done (SELECT, INSERT, UPDATE, DELETE)
 * @param tableName name of the table the operation is being done
 * @param parameters any parameters that is needed when building the query (for e.g column names)
 * @param identifiers any identifiers that is needed when building the query (anything after the where clause)
 * 
 * @returns queryString -> completed query string
 */
function queryStringBuilder(operation, tableName, parameters, identifiers) {
    let queryString = [];
    queryString.push(setCommand(operation.toUpperCase(), tableName, identifiers)); //Creating command section of string
    queryString.push(setValues(operation.toUpperCase(), parameters, identifiers)); //Creating values section of string
    console.log(queryString.join(' '));
    return queryString.join(' ');
}


/**
 * Helper function which builds the command section of the query string
 * ----------------------
 * @param operation type of operation being done (SELECT, INSERT, UPDATE, DELETE)
 * @param tableName name of the table the operation is being done
 * @param identifiers any identifiers that is needed when building the query
 * 
 * @returns commandSectionString -> completed command section of the query string
 */
function setCommand(operation, tableName, identifiers) {
    let commandSectionString = [operation];
    if (operation == 'SELECT') {
        commandSectionString.push('* FROM ' + tableName);
        //Completes string if its getting all products
        if (tableName == 'PRODUCTS' && identifiers.length == 0) {
            commandSectionString.push('ORDER BY id');
        } else {
            commandSectionString.push('WHERE');
        }
    } else if (operation == 'INSERT') {
        commandSectionString.push('INTO ' + tableName);
    } else if (operation == 'UPDATE') {
        commandSectionString.push(tableName + ' SET');
    } else {
        commandSectionString.push('FROM ' + tableName + ' WHERE');
    }
    return commandSectionString.join(' ');
}

/**
 * Helper function which builds the values/identifiers section of the query string
 * ----------------------
 * @param operation type of operation being done (SELECT, INSERT, UPDATE, DELETE)
 * @param parameters any parameters that is needed when building the query
 * @param identifiers any identifiers that is needed when building the query
 * 
 * @returns valueSectionString -> completed value section of the query string
 */
function setValues(operation, parameters, identifiers) {
    let valueSectionString = [];
    if (operation == 'UPDATE') {
        //Creating list of columns to update
        let set = [];
        for (let index = 0; index < parameters.length; index++) {
            set.push(parameters[index].toLowerCase() + ' = ( $' + (index + 1) + ' )');
        };
        valueSectionString.push(set.join(', '));

        valueSectionString.push('WHERE');
    } else if (operation == 'INSERT') {
        //Creates the column names of the values to be inserted
        valueSectionString.push('(');
        valueSectionString.push(Object.keys(parameters[0]).join(', '));
        valueSectionString.push(') VALUES');

        //Creating chunks of paramter values
        let i = 1;
        let values = Array(parameters.length).fill() //For each row
            .map(v => `(${Array(Object.values(parameters[0]).length).fill() //For each column
                .map(v => `$${i++}`).join(", ")})`).join(", ");
        //console.log(values);
        valueSectionString.push(values);

        //Adding a returning statement to get the ID(and other data) of the inserted row
        valueSectionString.push('RETURNING *');
    }
    //Setting identifiers (e.g WHERE id = 1)
    let set = [];
    Object.keys(identifiers).forEach(key => {
        set.push(key + ' = ' + identifiers[key]);
    });
    valueSectionString.push(set.join(' AND '));

    return valueSectionString.join(' ');
}

/**
 * Query runner for database
 * ----------------------
 * @param queryString the query string of the SQL command to be executed
 * @param params any parameters that is needed when executing the query
 * 
 * @returns result -> the result output of the SQL command
 */
function DBRunner(queryString, params) {
    console.log(queryString);
    return new Promise((resolve, reject) => {
        connection.query(queryString, params)
            .then((result) => {
                //console.log(result);
                resolve(result);
            })
            .catch((err) => {
                console.log(err);
                reject(err);
            });
    });
}
module.exports = router;


