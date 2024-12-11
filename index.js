const express = require('express')
const supabaseClient = require('@supabase/supabase-js')
const bodyParser = require('body-parser')

const app = express()
const port = 3000
app.use(bodyParser.json())
app.use(express.static(__dirname + '/public'))

const supabaseUrl = 'https://telaaoiyydexjcbnqhmx.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRlbGFhb2l5eWRleGpjYm5xaG14Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM1MjY3ODksImV4cCI6MjA0OTEwMjc4OX0.qoQSokC1ihou8_4pqug8EHakeidhtKibhfilqkWtC6I'
const supabase = supabaseClient.createClient(supabaseUrl, supabaseKey)

app.get('/feedback', async (req, res) => {
    console.log('Attempting to get all feedback.');

    const {data, error} = await supabase
        .from('feedback')
        .select();

    console.log('Data Retrieved: ', data);
    if (error) {
        console.log('Error: ', error)
        res.send(error);
    } else {
        console.log("Successfully Retrieved Data")
        res.send(data);
    }
})

app.post('/add', async(req, res) => {
    console.log('Attempting to add feedback.')
    console.log('Request', req.body)

    const name = req.body.name;
    const feedback = req.body.feedback;

    const {data, error} = await supabase
        .from('feedback')
        .insert({
            name: name, 
            feedback: feedback,
        })
        .select();

    if (error) {
        console.log('Error: ', error)
        res.send(error);
    } else {
        console.log("Successfully Retrieved Data")
        res.send(data);
    }
})

app.listen(port, () => {
    console.log('App is up n kickin')
})