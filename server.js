const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

const app = require('./app')
const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.PASSWORD);

mongoose
    // .connect(process.env.DATABASE_LOCAL, {
    .connect(DB, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    }).then(() => {
        console.log(`DB connection successful`);
    }).catch(err => {
        console.error(`DB connection error: ${err.message}`);
    });


// Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(
        `Servidor corriendo en http://localhost:${PORT}`
    );
});

