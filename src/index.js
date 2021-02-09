const express = require('express');
const bodyParder = require('body-parser');

const app = express();

app.use(bodyParder.json());
app.use(bodyParder.urlencoded({ extended: false }));

require('./app/controllers/index')(app);


app.listen(3000);