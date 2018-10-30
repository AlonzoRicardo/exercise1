const axios = require('axios');
const express = require('express')
const bodyParser = require('body-parser')
const app = express()

function test() {
    return (req, res, next) => {

        let { destination, body } = req.body
        typeof req.body !== 'object' ?
            res.send('expected payload of type object')
            :
            next()
    }
}

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.post('/message', test(), (req, res) => {
    let { destination, body } = req.body

    if (destination.length < 100 && body.length < 100) {
        axios.post('http://localhost:3000/message', { destination, body })
            .then(() => {
                res.status(200).send('Succesful');
            })
            .catch((err) => {
                res.status(500).send('error');
            })
    } else {
        res.send('Error body is too long')
    }
})

app.listen(9001)