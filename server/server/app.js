const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const mongoose = require('mongoose');
const cors = require('cors');

const schema = require('../schema/schema');

const app = express();
const PORT = 3005;

const DATABASE_URL = `mongodb+srv://volkovanton71:18202830Aa@cluster-antonvolkov.h8lcm.mongodb.net/graphQL?retryWrites=true&w=majority`;

app.use(cors());

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}))//типа мидлвары для обращения запросов


mongoose.connect(DATABASE_URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

const dbConnection = mongoose.connection;
dbConnection.on('error', err => console.log(`Connection error: ${err}`))
dbConnection.once('open', () => console.log('Connection DB!'))

app.listen(PORT, err => {
  err ? console.log(err) : console.log('Server started!')
})
