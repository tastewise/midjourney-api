import "dotenv/config";
import { Midjourney } from "../src";
/**
 *
 * a simple example of how to use the Upscale command
 * ```
 * npx tsx example/upscale.ts
 * ```
 */
async function main() {
  const client = new Midjourney({
    ServerId: <string>process.env.SERVER_ID,
    ChannelId: <string>process.env.CHANNEL_ID,
    SalaiToken: <string>process.env.SALAI_TOKEN,
    Debug: true,
  });
  const msg = await client.Imagine("a cool cat, blue ears, yellow hat");
  
  if (!msg) {
    
    return;
  }
  const msg2 = await client.Upscale({
    index: 2,
    msgId: <string>msg.id,
    hash: <string>msg.hash,
    flags: msg.flags,
    content: msg.content,
    loading: (uri: string, progress: string) => {
      
    },
  });
  
}
main().catch((err) => {
  console.error(err);
  process.exit(1);
});
