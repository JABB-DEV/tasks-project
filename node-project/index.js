const express = require('express'),
        app = express(),
        bodyParser = require('body-parser'),
        mongoose = require('mongoose'),
        cors = require('cors'),
         helmet = require('helmet'),
        morgan = require('morgan'),
        tasks = require('./routes/tasks')
        
mongoose.connect(process.env.MONGO_URI || "mongodb+srv://root:root2020@tasks-app.zcpw0.mongodb.net/tasks-app?retryWrites=true&w=majority", {useNewUrlParser: true, useUnifiedTopology: true})

//Configurations
app.set('PORT', process.env.PORT || 3000);

//Middlewares
app.use(cors())
app.use(helmet())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(morgan('dev'))

//Routes
app.use('/tasks', tasks)

app.get('*', (req, res)=>{
    res.sendStatus(404)
    //res.send('Hola mundo este es mi comienzo en express desde NodeJS soy el index de todo')
})

//Server Initializing
app.listen(app.get('PORT'), ()=>{
    console.log(`Server on port: ${app.get('PORT')}`)
})