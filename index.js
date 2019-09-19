const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
const morgan = require('morgan');
const path = require('path');
const popper = require('popper.js')


const app = express();


const PORT = process.env.PORT || 3000;
app.use(express.urlencoded({extended: true}));


// Sets up the Express app to handle  parsing
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());
app.use(morgan('tiny'));
app.use(express.static(path.join(__dirname, '/public/')))
app.use('/js', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/js')))
app.use('/js', express.static(path.join(__dirname, '/node_modules/jquery/dist/')))
app.use('/js', express.static(path.join(__dirname, '/node_modules/popper.js/dist/')))



require('./public/js/routing/apiRoutes.js')(app);
app.get('/survey', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/views/survey.html'))
})

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/views/index.html'))
})



 





app.listen(PORT, () => {
    debug(`Listening at localhost${chalk.green(PORT)}`)
})