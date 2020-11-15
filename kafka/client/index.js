const kafka = require('kafka-node');
const Consumer = kafka.Consumer;
const client = new kafka.KafkaClient({kafkaHost: 'kafka1:9092'});
const consumer = new Consumer(client, [{topic: 'topic1'}], {});

consumer.on('message', message => {
    console.log(`New message [${message.topic}] ${message.value}`);
})

