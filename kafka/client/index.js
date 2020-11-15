const kafka = require('kafka-node');
const Consumer = kafka.Consumer;
const client = new kafka.KafkaClient({kafkaHost: process.env.KAFKA_HOST || 'kafka1:9092'});


function load() {
    client.loadMetadataForTopics(["topic1"], (err, resp) => {
        console.log(err, resp)
        if (resp[1].error) {
            setTimeout(load, 1000)
            return;
        }
        console.log('Starting consumer')
        const consumer = new Consumer(client, [{topic: 'topic1'}], {});
        consumer.on('message', message => {
            console.log(`New message [${message.topic}] ${message.value}`);
        })
    });
}
client.on("ready", load)



