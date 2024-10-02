const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
  ipcRenderer: {
    on: (channel, func) => {
      const validChannels = ['update_available', 'update_downloaded'];
      if (validChannels.includes(channel)) {
        ipcRenderer.on(channel, func);
      }
    },
    removeAllListeners: (channel) => ipcRenderer.removeAllListeners(channel),
  },
});