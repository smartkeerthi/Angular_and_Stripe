const express = require('express')
const cors = require('cors')
const stripe = require('stripe')("Stripe_secret_key")

const app = express()

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    res.send("hello")
})

app.post('/createStripeSession', async (req, res) => {
    const {priceId, quantity} = req.body

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [{ price: priceId, quantity: quantity }],
        mode: 'payment',
        success_url: 'https://google.com/',
        cancel_url: 'http://localhost:4200/',
    })

    res.status(200).json({id: session.id})
})

port = 5000
app.listen(port, ()=>console.log(`Running on port ${port}`))