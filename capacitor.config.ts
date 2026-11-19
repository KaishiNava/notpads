import type { CapacitorConfig } from "@capacitor/cli";
const config: CapacitorConfig = {
  appId: "id.notpad.workshop",
  appName: "NotPad",
  webDir: "out",
  android: { allowMixedContent: false }
};
export default config;
