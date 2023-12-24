import "dotenv/config";
import { Midjourney } from "../src";
import { sleep } from "../src/utls";
/**
 *
 * a simple example of using the shorten api
 * ```
 * npx tsx example/shorten.ts
 * ```
 */
async function main() {
  const client = new Midjourney({
    ServerId: <string>process.env.SERVER_ID,
    ChannelId: <string>process.env.CHANNEL_ID,
    SalaiToken: <string>process.env.SALAI_TOKEN,
    Debug: true,
    Ws: true,
  });
  await client.Connect();
  const Shorten = await client.Shorten(
    "Peeking out from the bushes, masterpiece, octane rendering, focus, realistic photography, colorful background, detailed, intricate details, rich colors, realistic style"
  );
  
  if (!Shorten) {
    
    return;
  }
  const prompt = Shorten.options.find((o) => o.label === `1️⃣`);
  if (!prompt) {
    
    return;
  }
  await sleep(1400);
  //shorten click
  // const imagine = await client.Custom({
  //   msgId: <string>Shorten.id,
  //   flags: Shorten.flags,
  //   content: Shorten.prompts[0],
  //   customId: prompt.custom,
  //   loading: (uri: string, progress: string) => {
  //     
  //   },
  // });
  // 

  client.Close();
}
main().catch((err) => {
  
  console.error(err);
  process.exit(1);
});
