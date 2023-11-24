import AWS from 'aws-sdk';
import logger from '../../logger/logger';


export const snsPublish = (message)=>{

    const arn = process.env.SNS_ARN

    // AWS.config.update({region:"us-east-1"});

var params = {
    Message: message,
    TopicArn: arn
  };

  var publishTextPromise = new AWS.SNS({apiVersion: '2010-03-31'}).publish(params).promise();

publishTextPromise.then(
function(data) {
console.log(`Message ${params.Message} sent to the topic ${params.TopicArn}`);
logger.info(`Message ${params.Message} sent to the topic ${params.TopicArn}`)
console.log("MessageID is " + data.MessageId);
logger.info("MessageID is " + data.MessageId)
}).catch(
function(err) {
console.error(err, err.stack);
logger.error(err)
});
}