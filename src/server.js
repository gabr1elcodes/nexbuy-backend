require('dotenv').config();

const app = require('./app');
const connectDatabase = require('./database');

const PORT = process.env.PORT || 3333;

(async () => {
  await connectDatabase();

  app.listen(PORT, () => {
    console.log(`🚀 NexBuy API running on port ${PORT}`);
  });
})();
