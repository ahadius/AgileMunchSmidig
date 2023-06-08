const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');

//manger roles
const productRouter = require('./routers/productRouter.js');
const ratingRouter = require('./routers/RatingRouter.js');
const signupRouters = require('./routers/userRouter.js');
const loginRouters = require('./routers/loginRouter.js');

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
//app.use('/rating', ratingRouter);
app.use('/users', signupRouters);
app.use('/ogin', loginRouters);

app.get('/*', (req, res) => {
	res.sendFile(
		path.join(__dirname, '..', 'public', 'index.html')
	);
});

module.exports = app;
