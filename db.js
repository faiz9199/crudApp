const mongoose = require ('mongoose')

const mongoURL = 'mongodb://localhost:27017/faiz'

mongoose.connect(mongoURL)

const db = mongoose.connection;

db.on('connected', ()=> {
    console.log('MogoDB connected to server')
})

db.on('error', (err)=> {
    console.log('MogoDB connected to server', err)
})

db.on('disconnected', ()=> {
    console.log('MogoDB disconnected')
})

module.exports = db