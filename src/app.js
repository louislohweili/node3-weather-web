const path = require('path')
const express = require('express')
const hbs =  require('hbs')

const app = express()

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const address = process.argv[2]

//define path for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname,'../Templates/views')
const partialPath = path.join(__dirname,'../Templates/partials')

//steup handlebar engine and view location
app.set('view engine', 'hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialPath)

//setup static directort to server 
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'louis'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'louis'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title:'Help',
        name :'louis'
    })
})


app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/products',(req, res) =>{

    if(!req.query.search){
        return res.send({
            error:'you must provide a searc term'
        })

    }


    console.log(req.query.search)
    res.send({
        products: []
    })
})


app.get('/help/*',(req, res)=>{
    res.render('404', {
        title: '404',
        name: 'Louis',
        errorMessage: 'Page not found.'
        })
})
app.get('*',(req, res)=>{
    res.render('404', {
        title: '404',
        name: 'Louis',
        errorMessage: 'Page not found.'
        })
})

app.listen(3000,() =>{
    console.log('Server is up on port 3000.')
})