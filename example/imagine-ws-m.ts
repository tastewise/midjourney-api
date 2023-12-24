import "dotenv/config";
import { Midjourney } from "../src";
/**
 *
 * a simple example of using the imagine api with ws
 * ```
 * npx tsx example/imagine-ws-m.ts
 * ```
 */
async function main() {
  const client = new Midjourney({
    ServerId: <string>process.env.SERVER_ID,
    ChannelId: <string>process.env.CHANNEL_ID,
    SalaiToken: <string>process.env.SALAI_TOKEN,
    HuggingFaceToken: <string>process.env.HUGGINGFACE_TOKEN,
    Debug: true,
  });
  await client.Connect();
  client
    .Imagine("A little pink elephant", (uri) => {
      
    })
    .then(function (msg) {
      
    });

  client
    .Imagine("A little pink dog", (uri) => {
      
    })
    .then(function (msg) {
      
    });
}
main()
  .then(() => {
    
    // process.exit(0);
  })
  .catch((err) => {
    
    console.error(err);
    process.exit(1);
  });
