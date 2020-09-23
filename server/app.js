const express=require('express')
const {graphqlHTTP} = require('express-graphql')
const app = express();
const schema = require('./schema/schema.js')
const mongoose = require('mongoose')
const cors =require('cors')
app.use(cors())
mongoose.connect("mongodb://localhost:27017/graphql-learning",{useNewUrlParser:true,useUnifiedTopology: true})
mongoose.connection.once('open',()=>{
    console.log("connected to database")
})
app.use('/graphql',graphqlHTTP({
    schema,
    graphiql:true
}
))
app.listen(2000,()=>{
    console.log("server started in 2000");
})
