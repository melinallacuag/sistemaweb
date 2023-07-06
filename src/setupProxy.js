const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://4-fact.com:8081',
      secure: false,
      changeOrigin: true,
    })
  );
};