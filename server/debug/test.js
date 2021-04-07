const axios = require('axios');
// const baseURL = "http://localhost:8080/api";
const baseURL = "https://fitnova-server.herokuapp.com/api";
(function () {
  let JSONObject = {
    tableName: 'PRODUCTS',
    // identifiers: {
    //     product_name: "'Treadmill'"
    // },
    data: [{
      product_name: "Dumbells 25Lb",
      product_description: "This is a product description",
      category: "Weights",
      quantity: 29,
      price: 210.50,
    },
    {
      product_name: "Whey Protein Shake 250g",
      product_description: "This is a product description for protein",
      category: "Protein",
      quantity: 25,
      price: 35.00,
    },
    {
      product_name: "Exercise Ball",
      product_description: "A ball to use for exercise",
      category: "Others",
      quantity: 10,
      price: 29.99,
    },
    {
      product_name: "Chrome Dumbells 15Lb",
      product_description: "Dumbells",
      category: "Weights",
      quantity: 23,
      price: 125.50,
    },
    {
      product_name: "Home Exercise Kit",
      product_description: "Description",
      category: "Others",
      quantity: 7,
      price: 550.00,
    },
    {
      product_name: "Organic Protein 500g",
      product_description: "Description",
      category: "Protein",
      quantity: 36,
      price: 34.99,
    },
    {
      product_name: "Barbell - Blackout 10Lb",
      product_description: "Description",
      category: "Weights",
      quantity: 25,
      price: 89.50,
    },
    {
      product_name: "Whey Protein Shake 1Kg",
      product_description: "Description",
      category: "Protein",
      quantity: 48,
      price: 25.50,
    }],
  }

  // console.log(JSONObject)
  // JSON.stringify(JSONObject)
  // axios.get(baseURL + '/getData', {
  //   params: {
  //     data: JSON.stringify(JSONObject),
  //   }
  // }).then(response => {
  //   console.log(response.data);
  //   console.log(response.data.message);
  //   console.log(response.data.rows);
  //   if (response.data.rows.length != 0) {
  //     console.log(response.data.message);
  //   } else {
  //   }

  // }).catch(error => {
  //   console.log(error.message);
  // });

  // axios({
  //   method: "post",
  //   url: baseURL + '/updateData',
  //   data: {
  //     data: selectedRow
  //   }
  // }).then(response => {
  //   console.log(response.data);
  //   return response.data;
  // }).catch(error => {
  //   console.log(error.message);
  // });
  
  axios({
    method: "post",
    url: baseURL + '/addData',
    data: {
      data: JSONObject
    }
  }).then(response => {
    console.log(response.data);
    return response.data;
  }).catch(error => {
    console.log(error.message);
  });
})();
