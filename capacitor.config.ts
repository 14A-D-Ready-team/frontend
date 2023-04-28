import { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.ready.app",
  appName: "Ready!",
  webDir: "dist/app/mobile",
  bundledWebRuntime: false,
  backgroundColor: "#c10b00",
  android: {
    backgroundColor: "#c10b00",
  },
};

export default config;
