import { registerRootComponent } from 'expo';

import App from './App';
// (required) Called when a remote is received or opened, or local notification is opened

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);
