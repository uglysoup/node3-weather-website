const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const app = express()
const port = process.env.PORT||3000

//Define paths for express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewPath= path.join(__dirname,'../template/views')
const partialsPath=path.join(__dirname,'../template/partials')
//setup handlebars engine and views loc
app.set('view engine','hbs')
app.set('views',viewPath)
hbs.registerPartials(partialsPath)
//setup static dir to serve
app.use(express.static(publicDirectoryPath))
app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather',
        name:'Abhishek'
    })
})
app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About Abhishek',
        name:'Abhishek'
    })
})
app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help',
        name:'Abhishek'
    })
})
app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error: 'Provide a search term'
        })
    }
    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if(error){
            return res.send(error)
        }
    
        forecast(latitude,longitude, (error, data1) => {
            // console.log(data.latitude,data.longitude)
            if(error){
                return res.send(error)
            }
            
            res.send({
                forecast: data1,
                location,
                address:req.query.address

            })
    })
})

    // res.send({
    //     forecast:'Sunny',
    //     location:'Boston',
    //     address:req.query.address
    // })
})

app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error: 'Provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products:[]
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'Abhishek',
        errorMessage:'Not a help article.'
    })})

app.get('*',(req,res)=>{
res.render('404',{
    title:'404',
    name:'Abhishek',
    errorMessage:'Page not found.'
})
})
app.listen(port, ()=>{
    console.log('Server is up on port '+port)
})