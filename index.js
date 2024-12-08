const express = require('express')
const supabaseClient = require('@supabase/supabase-js')

const app = express()
const port = 3000
app.use(express.static(__dirname + '/public'))

const supabaseUrl = 'https://telaaoiyydexjcbnqhmx.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRlbGFhb2l5eWRleGpjYm5xaG14Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM1MjY3ODksImV4cCI6MjA0OTEwMjc4OX0.qoQSokC1ihou8_4pqug8EHakeidhtKibhfilqkWtC6I'
const supabase = supabaseClient.createClient(supabaseUrl, supabaseKey)

app.get('/customers', async (req, res) => {
    console.log('Attempting to get all customers.');

    const {data, error} = await supabase
        .from('customer')
        .select();

    console.log('Data Retrieved: ', data);
    console.log('Error: ', error)
    res.send(data);
})

app.post('/customer', (req, res) => {
    console.log('Attempting to add Customer.')
    res.send("Post complete")
})

app.listen(port, () => {
    console.log('App is up n kickin')
})