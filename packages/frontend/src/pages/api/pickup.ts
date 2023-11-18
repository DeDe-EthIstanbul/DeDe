// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { createWakuEncoder, sendMessage, setupWaku } from "@/utils/waku";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const node = await setupWaku();
  const encoder = await createWakuEncoder();
  const data = await sendMessage(
    node,
    encoder,
    "Your parcel has been picked up!"
  );
  console.log("Message sent");
  res.status(200).json(data);
}
