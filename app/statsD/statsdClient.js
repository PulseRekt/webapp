import { StatsD } from 'hot-shots';

const statsdClient = new StatsD({
  host: '127.0.0.1', 
  port: 8125, 
  prefix: 'web-app.'
});

export const getStatsdMiddleware = () => {
  return (req, res, next) => {
    const metricName = `api.${req.method.toLowerCase()}.${req.originalUrl}`; 
    console.log(metricName);
    statsdClient.increment(metricName); 
    next();
  };
};
