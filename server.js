const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

const app = require('./app')



// Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(
        `Servidor corriendo en http://localhost:${PORT}`
    );
});

