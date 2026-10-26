import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.daury.couteau',
  appName: 'Couteau',
  webDir: 'dist',
  plugins: {
    // Las peticiones fetch pasan por el cliente HTTP nativo
    CapacitorHttp: { enabled: true },
  },
};

export default config;