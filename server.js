const fs = require('fs')
const express = require('express');
const mongoose = require('mongoose');

const app = express();

// Middleware para interpretar JSON
app.use(express.json());

// Conectar a MongoDB
// const mongoURI = 'mongodb://127.0.0.1:27017/nombreDeTuBaseDeDatos';
// mongoose
//     .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
//     .then(() => console.log('MongoDB conectado'))
//     .catch(err => console.error('Error conectando a MongoDB:', err));



const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`));

app.get('/api/v1/tours', (req, res) => {
    res.status(200).json({
        status: "success",
        results: tours.length,
        data: {
            tours
        }
    })
});

app.get('/api/v1/tours/:id', (req, res) => {
    console.log(req.params);
    const id = req.params.id * 1;
    const tour = tours.find(elem => elem.id === id)
    if (!tour) {
        return res.status(404).json({
            status: "fail",
            message: "Invalid Id"
        })
    }
    res.status(200).json({
        status: "success",
        data: {
            tour
        }
    })
});

app.post('/api/v1/tours', (req, res) => {
    // console.log(req.body)
    const newId = tours[tours.length - 1].id + 1;
    const newTour = { id: newId, ...req.body }
    tours.push(newTour)
    fs.writeFile(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`), JSON.stringify(tours), err => {
        res.status(201).json({
            status: "success",
            data: {
                tour: ""
            }
        })
    });
});


app.patch('/api/v1/tours/:id', (req, res) => {
    if (req.params.id * 1 > tours.length) {
        return res.status(404).json({
            status: "fail",
            message: "Invalid Id"
        })
    }

    res.status(200).json({
        status: "success",
        data: {
            tour: "Updated tour here"
        }
    })
});


// Puerto
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
