const express = require('express')
const app = express()
const port = 8000

app.use(((req, res, next) => {
    console.log("Received req", req)
    next()
}))

app.get('/api/', (req, res) => {
    // console.log("Received req", req)
    res.send('Hello World!')
})

app.get('/api/echo', (req, res) => {
    console.log("GET echo", req.query)
    // res.send(req.query)
    res.json({
        "msg": "GET echo",
        "data": req.query
    })
})

app.post('/api/echo', (req, res) => {
    console.log("POST echo", req.query)
    res.json({
        "msg": "POST echo",
        "data": req.body
    })
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})