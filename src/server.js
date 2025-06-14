const app = require('./app');
const config = require('./config/default');
require('./jobs/fileProcessor');

app.listen(config.port, '0.0.0.0', () => {
  console.log(`Server running on port '0.0.0.0:${config.port}'`);
}); 