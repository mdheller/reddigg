// Backend
const backend = require('./backend');

// Frontend
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare()
  .then(() => {
    // ROUTING
    backend.get('/pages/:no', (req, res) => {
      app.render(req, res, '/pages', { pageNo: req.params.no });
    });

    backend.get('*', (req, res) => handle(req, res));

    backend.listen(3000, (err) => {
      if (err) throw err;
      console.log('> Ready on http://localhost:3000');
    });
  })
  .catch((ex) => {
    console.error(ex.stack);
    process.exit(1);
  });
