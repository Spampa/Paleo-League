require('dotenv').config();

//initialize database
require('./config/db').createDatabase();

const express = require('express');
const cors = require('cors');
const router = express.Router();
const session = require('express-session');
const passport = require('passport');

//app settings
const app = express();
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));
app.use(express.json())
const port = process.env.PORT;

//swagger
const yaml = require('yamljs');
const swaggerUi = require('swagger-ui-express');

const apiSpec = yaml.load('./api_spec.yaml');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(apiSpec));

//middleware
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url} from ${req.ip}`);
    next();
})

//validator
const openApiValidator = require('express-openapi-validator');
app.use(
    openApiValidator.middleware({
        apiSpec: './api_spec.yaml',
        validateRequests: true,
        validateResponses: true
    })
);

//auth
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, maxAge: 7 * 24 * 60 * 60 * 1000 }
}));
app.use(passport.initialize());
app.use(passport.session());

//routes
const routes = require('./routes/index');
app.use(routes.match);
app.use(routes.team);
app.use(routes.auth);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})

module.exports = router;