import { StatsD } from 'hot-shots';

const statsdClient = new StatsD({
  host: '127.0.0.1', // StatsD server host
  port: 8125, // StatsD server port
  prefix: 'web-app.' // Metric key prefix
});

export const getStatsdMiddleware = () => {
  return (req, res, next) => {
    const metricName = `api.${req.method.toLowerCase()}.${req.originalUrl}`; 
    statsdClient.increment(metricName); 
    next();
  };
};
