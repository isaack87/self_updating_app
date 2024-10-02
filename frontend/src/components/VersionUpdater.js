import React, { useEffect } from 'react';
import { useVersionUpdate } from '../hooks/useVersionUpdate';
import PipelineStatus from './PipelineStatus';

const VersionUpdater = () => {
  
  const steps = ['Running tests...', 'Deploying...', 'Finishing...'];
  const intervalTime = 30000;
  const { version, pipelineStep } = useVersionUpdate(steps, intervalTime);


  useEffect(() => {
    if (version) {
      document.title = `Self Update Application v${version}`;
    }
  }, [version]);


  /*
      Checks for ipcRenderer and setup event listers that trigger when a new update is available or downloaded
  */

  useEffect(() => {
    const { ipcRenderer } = window.electron || {};

    if (ipcRenderer) {
      ipcRenderer.on('update_available', () => {
        console.log('A new update is available. Downloading now...');
      });

      ipcRenderer.on('update_downloaded', () => {
        console.log('Update downloaded. The app will restart to install the update.');
      });

      return () => {
        ipcRenderer.removeAllListeners('update_available');
        ipcRenderer.removeAllListeners('update_downloaded');
      };
    }
  }, []);

  return (
    <div>
      <h1>Self Update Application</h1>
      <p>Current Version: v{version || 'Loading...'}</p>
      <PipelineStatus pipelineStep={pipelineStep} />
    </div>
  );
};

export default VersionUpdater;

