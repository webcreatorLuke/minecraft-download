const express = require('express');
const Stripe = require('stripe');
const stripe = Stripe('your-secret-key-here'); // Replace with your Stripe secret key

const app = express();
app.use(express.static('public')); // Serve HTML file

app.post('/create-checkout-session', async (req, res) => {
    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: 'Your Product Name',
                        },
                        unit_amount: 1000, // Price in cents (e.g., $10.00)
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: 'https://your-site.com/success',
            cancel_url: 'https://your-site.com/cancel',
        });

        res.json({ sessionId: session.id });
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.listen(3000, () => console.log('Server running on port 3000'));
