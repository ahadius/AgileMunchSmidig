const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
//manger roles
const productRouter = require('./routers/productRouter.js');
// for users site

const app = express();
app.use(cors());
app.use(
	express.json({
		origin: 'http://localhost:3000',
	})
);
app.use(express.json());
app.use(
	express.static(path.join(__dirname, '..', 'public'))
);
app.use(morgan('combined'));
//app.use('/products', productRouter);

app.get('/*', (req, res) => {
	res.sendFile(
		path.join(__dirname, '..', 'public', 'index.html')
	);
});

module.exports = app;
