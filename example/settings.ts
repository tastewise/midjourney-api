import "dotenv/config";
import { Midjourney } from "../src";
/**
 *
 * a simple example of using the settings api
 * ```
 * npx tsx example/settings.ts
 * ```
 */
async function main() {
  const client = new Midjourney({
    ServerId: <string>process.env.SERVER_ID,
    ChannelId: <string>process.env.CHANNEL_ID,
    SalaiToken: <string>process.env.SALAI_TOKEN,
    Debug: true,
    Ws: true, //Important 
  });
  await client.Connect();
  const msg = await client.Settings();
  
  if (!msg) {
    return;
  }
  // //niji5
  const niji5 = msg.options.filter((x) => {
    return x.label === "Niji version 5";
  })[0];
  
  // const httpstatus = await client.MJApi.CustomApi({
  //   msgId: msg.id,
  //   customId: niji5.custom,
  //   flags: msg.flags,
  // });
  // 
  // const setting = await client.Settings();
  // 
  //reset settings

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
