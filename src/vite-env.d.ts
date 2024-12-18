/// <reference types="vite/client" />


declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<object, object, object>
  export default component
}

interface Window {
  // expose in the `electron/preload/index.ts`
  ipcRenderer: import('electron').IpcRenderer
}

declare global {
  interface Window {
    electronAPI: IElectronAPI;
  }
}


export interface IElectronAPI {
  loadPreferences: () => Promise<void>;
  openFile: () => Promise<string>;
}