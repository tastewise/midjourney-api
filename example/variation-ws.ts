import "dotenv/config";
import { Midjourney } from "../src";
/**
 *
 * a simple example of how to use the Variation (remix mode) with ws command
 * ```
 * npx tsx example/variation-ws.ts
 * ```
 */
async function main() {
  const client = new Midjourney({
    ServerId: <string>process.env.SERVER_ID,
    ChannelId: <string>process.env.CHANNEL_ID,
    SalaiToken: <string>process.env.SALAI_TOKEN,
    Debug: true,
    Ws: true, //enable ws is required for remix mode
  });
  await client.init(); //init auto enable remix mode
  const prompt =
    "48 year old woman with auburn hair plays video games on a tablet in her bedroom and is a chemist. Engaged. Happy. Evening. Silver blue walls in room. In the style of anime. does not exceed 10 MB.";
  const Imagine = await client.Imagine(
    prompt,
    (uri: string, progress: string) => {
      
    }
  );
  
  if (!Imagine) {
    
    return;
  }
  const Variation = await client.Variation({
    index: 1,
    msgId: <string>Imagine.id,
    hash: <string>Imagine.hash,
    flags: Imagine.flags,
    content: prompt,
    loading: (uri: string, progress: string) => {
      
    },
  });
  
  if (!Variation) {
    
    return;
  }

  const Upscale = await client.Upscale({
    index: 2,
    msgId: <string>Variation.id,
    hash: <string>Variation.hash,
    flags: Variation.flags,
    content: prompt,
    loading: (uri: string, progress: string) => {
      
    },
  });
}
main().catch((err) => {
  console.error(err);
  process.exit(1);
});
