import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import { errorHandler } from './middleware/errorHandler.js';
import routes from './routes/index.js';
import { logger } from './utils/logger.js';
import { env } from './env.js';

dotenv.config();

const app = express();

// Middleware
app.use(cors({ origin: env.FRONTEND_URL }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date(), service: 'Kodemia Backend' });
});

// API Routes
app.use('/api', routes);

// Error handler (à la fin)
app.use(errorHandler);

// Server start
const PORT = env.PORT || 3000;
app.listen(PORT, () => {
  logger.info(`✅ Kodemia Backend running on http://localhost:${PORT}`);
  logger.info(`📚 Kodemia Backend v1.0.0`);
  logger.info(`🔗 Health check: GET /health`);
});

export default app;
