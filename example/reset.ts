import "dotenv/config";
import { Midjourney } from "../src";
/**
 *
 * a simple example of using the reset api
 * ```
 * npx tsx example/reset.ts
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
  await client.Reset();
  client.Close();
}
main()
  .then(() => {
    
    process.exit(0);
  })
  .catch((err) => {
    
    console.error(err);
    process.exit(1);
  });
