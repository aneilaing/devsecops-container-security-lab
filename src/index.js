const express = require('express');
const helmet = require('helmet');

const app = express();

//Apply security headers
app.use(helmet());

app.get('/', (req, res) => {
  res.send('DevSecOps Lab Running');
});

 app.listen(3000, () => {
   console.log('Server started on port 3000');
});

