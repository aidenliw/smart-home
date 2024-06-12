const PubNub = require('pubnub');

// Initialize PubNub
pubnub = new PubNub({
	publishKey : process.env.PUBNUB_PUBLISH_KEY,
	subscribeKey : process.env.PUBNUB_SUBSCRIBE_KEY,
	uuid: process.env.PUBNUB_UUID,
})

// Publish a message to a channel
async function publishMessage(channel, title, description)
{
	let publishPayload = {
        channel : channel,
        message: {
            title: title,
            description: description
        }
    }
    
    // Return a promise to handle the publish response
    return new Promise((resolve, reject) => {
        pubnub.publish(publishPayload, function(status, response) {
            if (status.error) {
                reject(status);
            } else {
                resolve(status);
            }
        });
    });
}

// Subscribe to a channel
async function subscribeChannel(channel)
{
	await pubnub.subscribe({
        channels: [channel]
    });
}


module.exports = {
	publishMessage,
    subscribeChannel
};