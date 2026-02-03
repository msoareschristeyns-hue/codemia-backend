import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
import stripe from 'stripe';

const prisma = new PrismaClient();
const stripeClient = new stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2024-04-10',
});

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';

// Middleware
app.use(cors({ origin: FRONTEND_URL }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date(),
    service: 'Kodemia Backend',
  });
});

// API Routes
app.use('/api/courses', require('./routes/courses').default);

// Stripe Webhook endpoint
app.post('/api/webhooks/stripe', express.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature'] as string;
  const secret = process.env.STRIPE_WEBHOOK_SECRET || '';

  try {
    const event = stripeClient.webhooks.constructEvent(req.body, sig, secret);

    if (event.type === 'payment_intent.succeeded') {
      const paymentIntent = event.data.object as any;
      // Update payment status in database
      await prisma.payment.update({
        where: { stripePaymentIntentId: paymentIntent.id },
        data: { status: 'completed' },
      });
    }

    res.json({ received: true });
  } catch (error) {
    res.status(400).json({ error: 'Webhook error' });
  }
});

// Error handler
app.use((err: any, req: any, res: any, next: any) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined,
  });
});

// Server start
app.listen(PORT, () => {
  console.log(`✓ Kodemia Backend running on port ${PORT}`);
  console.log(`✓ Environment: ${process.env.NODE_ENV || 'development'}`);
});

export default app;
