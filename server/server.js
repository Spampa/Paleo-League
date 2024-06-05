require('dotenv').config();

//initialize database
require('./config/db').createDatabase();

const express = require('express');
const cors = require('cors');
const router = express.Router();

//app settings
const app = express();
app.use(cors());
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

//routes
const routes = require('./routes/index');
app.use(routes.match);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})

module.exports = router;