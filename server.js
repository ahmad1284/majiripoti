const dotenv = require('dotenv');
const express = require('express');
const bodyParser = require('body-parser');

dotenv.config()

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/ussd', (req, res) => {
    // Read the variables sent via POST from our API
    const {
        sessionId,
        serviceCode,
        phoneNumber,
        text,
    } = req.body;


    let response = '';

    if (text == '') {
        // This is the first request. Note how we start the response with CON
        response = `CON Maji Ripoti
        1. Ripoti kupasuka kwa bomba
        2. Pata taarifa za wiki kuhusu maji`;

    } else if ( text == '1') {
        // Business logic for first level response
        response = `CON Ingiza eneo uliopo`;

    } else if ( text == '2') {
        // Business logic for first level response
        // This is a terminal request. Note how we start the response with END
        const taarifa = "CON Mradi wa maji, wilaya ya tabora kuaza kesho";
        response = `END Taarifa ya wiki hii ni ${taarifa}`;
    } else if ( text !== '' || text !== '1' || text !== '2') {
        // This is a second level response where the user selected 1 in the first instance
        // This is a terminal request. Note how we start the response with END
        response = `END Ahsante tutakipigia baada ya muda mfupi ${phoneNumber}`;
    }

    // Send the response back to the API
    res.set('Content-Type: text/plain');
    res.send(response);
});

const port = process.env.PORT || 3000;

app.listen(port, function () {
    console.log(`Server is listening on port ${port}. Ready to accept requests!`);
  });