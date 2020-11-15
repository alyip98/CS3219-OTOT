const kafka = require('kafka-node');
const HighLevelProducer = kafka.Producer;
const client = new kafka.KafkaClient({kafkaHost: 'kafka1:9092'});
const producer = new HighLevelProducer(client);

producer.on('ready', () => {
    producer.createTopics(['topic1'], (err, data) => {
        if (err) console.error(err);
        else console.log(data);
    })

    setInterval(() => {
        const payloads = [
            { topic: 'topic1', messages: Date.now() }];
        producer.send(payloads, (err, data) => {
            if (err) console.error(err);
            else console.log(data);
        });
    }, 1000);
})