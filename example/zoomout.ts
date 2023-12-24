import "dotenv/config";
import { Midjourney } from "../src";
/**
 *
 * a simple example of how to use the zoomout with ws command
 * ```
 * npx tsx example/zoomout.ts
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
  const Imagine = await client.Imagine("a cool cat, blue ears, yellow hat");
  
  if (!Imagine) {
    
    return;
  }
  const Upscale = await client.Upscale({
    index: 2,
    msgId: <string>Imagine.id,
    hash: <string>Imagine.hash,
    flags: Imagine.flags,
    loading: (uri: string, progress: string) => {
      
    },
  });
  if (!Upscale) {
    
    return;
  }
  
  const Zoomout = await client.ZoomOut({
    level: "2x",
    msgId: <string>Upscale.id,
    hash: <string>Upscale.hash,
    flags: Upscale.flags,
    loading: (uri: string, progress: string) => {
      
    },
  });
  

  client.Close();
}
main().catch((err) => {
  console.error(err);
  process.exit(1);
});
