const axios = require('axios');
    const baseURL = "http://localhost:3000/api";
    (function () {
    let JSONData = {
        tableName: 'PRODUCTS',
        /* identifiers: {
            record_id: 6
        }, */
        data: [{
            //record_id: 1,
            lot_no: 99999,
            project_title: "Title 9",
            formulation_date: "2020-12-5",
            preparation_date: "2020-12-5",
            prepared_by: "Jack",
            quantity: 152,
            notes: "notes.",
            preparation_reason: "testtest",
            observations: "",
            total_percentage_w: 100.0,
            total_ar: 355.6,
            total_ad: "355.84",
        }],
       
      axios({
        method: "post",
        url: baseURL + '/addData',
        data: {
          data: JSONData
        }
      }).then(response => {
        console.log(response.data);
        return response.data;
      }).catch(error => {
          console.log(error.message);
      });
})();
