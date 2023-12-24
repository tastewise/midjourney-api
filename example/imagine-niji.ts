import "dotenv/config";
import { Midjourney, NijiBot } from "../src";
/**
 *
 * a simple example of using the imagine api via DM Niji Bot
 * ```
 * npx tsx example/imagine-niji.ts
 * ```
 */
async function main() {
  const client = new Midjourney({
    SalaiToken: <string>process.env.SALAI_TOKEN,
    BotId: NijiBot, // NijiBot 
    ChannelId: "1125452970276954204",
    Debug: true,
    Ws: true,
  });
  await client.Connect();
  const info = await client.Info();
  
  const msg = await client.Imagine(
    "A little white dog",
    (uri: string, progress: string) => {
      
    }
  );
  
  client.Close();
}
main()
  .then(() => {
    // 
    // process.exit(0);
  })
  .catch((err) => {
    
    console.error(err);
    process.exit(1);
  });
