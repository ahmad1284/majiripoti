const express = require('express');
const bodyParser = require('body-parser');

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
        response = `Maji Ripoti
        1. Ripoti kupasuka kwa bomba
        2. Pata taarifa za wiki kuhusu maji`;

    } else if ( text == '1') {
        // Business logic for first level response
        response = `Ingiza eneo uliopo`;

    } else if ( text == '2') {
        // Business logic for first level response
        // This is a terminal request. Note how we start the response with END
        const taarifa = "Mradi wa maji, wilaya ya tabora kuaza kesho";
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

app.listen(3000, function () {
    console.log('Server is listening on port 3000. Ready to accept requests!');
  });