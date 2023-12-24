import "dotenv/config";
import { Midjourney } from "../src";
/**
 *
 * a simple example of how to use the (custom zoom) options with ws command
 * ```
 * npx tsx example/customzoom.ts
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
  //imagine
  const Imagine = await client.Imagine(
    prompt,
    (uri: string, progress: string) => {
      
    }
  );
  
  if (!Imagine) {
    
    return;
  }
  //U1 U2 U3 U4 V1 V2 V3 V4  "Vary (Strong)" ...
  const V1CustomID = Imagine.options?.find((o) => o.label === "V1")?.custom;
  if (!V1CustomID) {
    
    return;
  }
  // Varition V1
  const Varition = await client.Custom({
    msgId: <string>Imagine.id,
    flags: Imagine.flags,
    customId: V1CustomID,
    loading: (uri: string, progress: string) => {
      
    },
  });
  
  const U1CustomID = Imagine.options?.find((o) => o.label === "U1")?.custom;
  if (!U1CustomID) {
    
    return;
  }
  // Upscale U1
  const Upscale = await client.Custom({
    msgId: <string>Imagine.id,
    flags: Imagine.flags,
    customId: U1CustomID,
    loading: (uri: string, progress: string) => {
      
    },
  });
  if (!Upscale) {
    
    return;
  }
  
  const zoomout = Upscale?.options?.find((o) => o.label === "Custom Zoom");
  if (!zoomout) {
    
    return;
  }
  // Custom Zoom
  const CustomZoomout = await client.Custom({
    msgId: <string>Upscale.id,
    flags: Upscale.flags,
    content: `${prompt} --zoom 2`,
    customId: zoomout.custom,
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
