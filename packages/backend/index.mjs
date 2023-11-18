import express from "express";
import { setup, createWakuEncoder, sendMessage } from "./setup.mjs";

const app = express();
const port = 3001;
let node;
let encoder;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/pickup", async (req, res) => {
  const data = sendMessage(node, encoder, "Your parcel has been picked up!");
  console.log("Message sent");
  res.send(JSON.stringify(data, null, 4));
});

app.get("/dropoff", async (req, res) => {
  const data = sendMessage(node, encoder, "Your parcel has been delivered!");
  console.log("Message sent");
  res.send(JSON.stringify(data, null, 4));
});

app.listen(port, async () => {
  node = await setup();
  encoder = await createWakuEncoder();

  console.log(`Backend messaging listening on port ${port}`);
});
