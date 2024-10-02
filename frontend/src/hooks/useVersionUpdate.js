import { useState, useEffect } from 'react';

export const useVersionUpdate = (steps, intervalTime) => {
  const [version, setVersion] = useState('1.0.0');
  const [pipelineStep, setPipelineStep] = useState('Idle'); 
  const [isUpdating, setIsUpdating] = useState(false);

/* 
    Function to fetch the backend version and compare it with the current frontend version.
    If they are different, it starts the pipeline process to update the frontend version(updating application to new version).
*/

  const fetchVersion = async () => {
    try {

      const response = await fetch(`${process.env.REACT_APP_API_URL}/version`);
      const data = await response.json();

      if (data.version !== version) {
        if (!isUpdating) {
          console.log('Starting pipeline for version update...');
          setPipelineStep('Idle');
          runPipeline(data.version);
        }
      } else {
        console.log('Backend version is the same as frontend version. No update required.');
      }
    } catch (error) {
      console.error('Error fetching version:', error);
    }
  };

/* 
    Simulate a pipeline process with multiple steps. In a real-world scenario, this could be triggered by a webhook or event.
    The next step is to have a GitHub Actions workflow file that will:
    - Run the frontend build process.
    - Run tests to ensure the app is functioning correctly.
    - Create the Electron build using `electron-builder` to package the app for the current platform and version.
*/

  const runPipeline = (newVersion) => {
    setIsUpdating(true);
    let currentStep = 0;

    const stepInterval = setInterval(() => {
      if (currentStep < steps.length) {
        setPipelineStep(steps[currentStep]);
        currentStep += 1;
      } else {
        clearInterval(stepInterval);
        setPipelineStep('Version update complete!');
        setVersion(newVersion);

        setTimeout(() => {
          setPipelineStep('Idle');
          setIsUpdating(false);
        }, 3000);
      }
    }, 3000);
  };

  useEffect(() => {
    fetchVersion();
    const intervalId = setInterval(() => {
      if (!isUpdating) {
        fetchVersion();
      }
    }, intervalTime);

    return () => clearInterval(intervalId);
  }, [isUpdating]);

  return { version, pipelineStep };
};