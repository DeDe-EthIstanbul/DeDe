import {
  createLightNode,
  createEncoder,
  createDecoder,
  waitForRemotePeer,
  Protocols,
} from "@waku/sdk";
import protobuf from "protobufjs";

const contentTopic = "/dede/notifications";

export const setupLightNode = async () => {
  // Create and start a Light Node
  const node = await createLightNode({ defaultBootstrap: true });
  await node.start();

  console.log("✅ Node ready");
  return node;
};

export const setupWakuPeers = async (node) => {
  // Wait for a successful peer connection
  await waitForRemotePeer(node, [Protocols.Store]);
  console.log("📡 Peer connected");
};

export const setup = async () => {
  const node = await setupLightNode();
  await setupWakuPeers(node);
  return node;
};

export const createWakuEncoder = async () => {
  const encoder = createEncoder({
    contentTopic: contentTopic, // message content topic
    ephemeral: true, // allows messages to be persisted or not
  });
  return encoder;
};

export const sendMessage = async (node, encoder, message) => {
  // Create a message structure using Protobuf
  const ChatMessage = new protobuf.Type("ChatMessage")
    .add(new protobuf.Field("timestamp", 1, "uint64"))
    .add(new protobuf.Field("sender", 2, "string"))
    .add(new protobuf.Field("message", 3, "string"));

  // Create a new message object
  const protoMessage = ChatMessage.create({
    timestamp: Date.now(),
    sender: "DeDe",
    message: message,
  });

  // Serialise the message using Protobuf
  const serialisedMessage = ChatMessage.encode(protoMessage).finish();

  // Send the message using Light Push
  return await node.lightPush.send(encoder, {
    payload: serialisedMessage,
  });
};

// const test = async () => {
//   await setup();
//   const encoder = await createEncoder();
//   await sendMessage(encoder, "Hello, World!");
// };

// test();

// export const setup = async () => {
//   // Create and start a Light Node
//   const node = await createLightNode({ defaultBootstrap: true });
//   await node.start();

//   console.log("Node ready");
//   // Use the stop() function to stop a running node
//   // await node.stop();

//   // Wait for a successful peer connection
//   await waitForRemotePeer(node, [Protocols.Store]);
//   console.log("Peer connected");

//   // Choose a content topic
//   const contentTopic = "/light-guide/1/message/proto";

//   // Create a message encoder and decoder
//   const decoder = createDecoder(contentTopic);
//   const encoder = createEncoder({
//     contentTopic: contentTopic, // message content topic
//     ephemeral: true, // allows messages to be persisted or not
//   });

//   // Create a message structure using Protobuf
//   const ChatMessage = new protobuf.Type("ChatMessage")
//     .add(new protobuf.Field("timestamp", 1, "uint64"))
//     .add(new protobuf.Field("sender", 2, "string"))
//     .add(new protobuf.Field("message", 3, "string"));

//   // Create a new message object
//   const protoMessage = ChatMessage.create({
//     timestamp: Date.now(),
//     sender: "Alice",
//     message: "Hello, World!",
//   });

//   // Serialise the message using Protobuf
//   const serialisedMessage = ChatMessage.encode(protoMessage).finish();

//   // Send the message using Light Push
//   await node.lightPush.send(encoder, {
//     payload: serialisedMessage,
//   });

//   // Create the callback function
//   const callback = (wakuMessage) => {
//     // Check if there is a payload on the message
//     if (!wakuMessage.payload) return;
//     // Render the messageObj as desired in your application
//     const messageObj = ChatMessage.decode(wakuMessage.payload);
//     console.log(messageObj);
//   };

//   if (node.filter) {
//     // Create a filter subscription
//     const subscription = await node.filter.createSubscription();

//     // Subscribe to content topics and process new messages
//     await subscription.subscribe([decoder], callback);
//   }

//   console.log("Listen");
// };
