import {
  createLightNode,
  createEncoder,
  createDecoder,
  waitForRemotePeer,
  Protocols,
} from "@waku/sdk";
import protobuf from "protobufjs";

const contentTopic = "/dede/notifications";

export const setupWaku = async () => {
  const node = await createLightNode({ defaultBootstrap: true });
  await node.start();
  console.log("✅ Node ready");

  await waitForRemotePeer(node, [Protocols.Store]);
  console.log("📡 Peer connected");
  return node;
};

export const createWakuDecoder = async () => {
  const decoder = createDecoder(contentTopic);
  return decoder;
};

export const createWakuEncoder = async () => {
  const encoder = createEncoder({
    contentTopic: contentTopic, // message content topic
    ephemeral: true, // allows messages to be persisted or not
  });
  return encoder;
};

export const sendMessage = async (node: any, encoder: any, message: any) => {
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

export const listenToMessages = async (
  node: any,
  decoder: any,
  callback: any
) => {
  console.log("Hit");

  // Create the callback function
  //   const callback = (wakuMessage: any) => {
  //     // Check if there is a payload on the message
  //     if (!wakuMessage.payload) return;
  //     // Render the messageObj as desired in your application
  //     const messageObj = ChatMessage.decode(wakuMessage.payload);
  //     console.log(messageObj);
  //   };
  console.log("here");

  // Create a filter subscription
  const subscription = await node.filter.createSubscription();

  // Subscribe to content topics and process new messages
  console.log("yeet");
  await subscription.subscribe([decoder], callback);
};
