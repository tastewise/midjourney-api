import "dotenv/config";
import { Midjourney } from "../src";
/**
 *
 * a simple example of how to use the vary
 * ```
 * npx tsx example/vary.ts
 * ```
 */
async function main() {
  const client = new Midjourney({
    ServerId: <string>process.env.SERVER_ID,
    ChannelId: <string>process.env.CHANNEL_ID,
    SalaiToken: <string>process.env.SALAI_TOKEN,
    Debug: true,
    Ws: true, //enable ws is required for custom zoom
  });
  await client.init();
  const prompt =
    "Christmas dinner with spaghetti with family in a cozy house, we see interior details , simple blue&white illustration";
  const Imagine = await client.Imagine(
    prompt,
    (uri: string, progress: string) => {
      
    }
  );
  
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
  

  const vary = Upscale?.options?.find((o) => o.label === "Vary (Strong)");
  if (!vary) {
    
    return;
  }
  const varyCustom = await client.Custom({
    msgId: <string>Upscale.id,
    flags: Upscale.flags,
    content: `${prompt} --zoom 2`,
    customId: vary.custom,
    loading: (uri: string, progress: string) => {
      
    },
  });
  
  client.Close();
}
main()
  .then(() => {
    
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
