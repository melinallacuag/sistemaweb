const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {

  url= 'http://4-fact.com:8081/';
  
  app.use(
    '/api',
    createProxyMiddleware({
      target: url,
      secure: false,
      changeOrigin: true,
    })
  );
};