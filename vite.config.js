import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    port: 3000,
    host: '0.0.0.0'
  },
  preview: {
    port: 3000,
    host: '0.0.0.0'
  },
  plugins: [
    {
      name: 'contact-api-handler',
      configureServer(server) {
        server.middlewares.use('/api/contact', async (req, res) => {
          if (req.method === 'POST') {
            let body = '';
            req.on('data', chunk => { body += chunk; });
            req.on('end', () => {
              try {
                const data = JSON.parse(body);
                console.log('[Contact Form] Received project inquiry for johann@latskymultimedia.co.za:', data);
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({
                  success: true,
                  message: 'Inquiry received successfully. Sent to johann@latskymultimedia.co.za.'
                }));
              } catch (err) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ success: false, error: 'Invalid payload' }));
              }
            });
          } else {
            res.writeHead(405);
            res.end();
          }
        });
      }
    }
  ]
});
