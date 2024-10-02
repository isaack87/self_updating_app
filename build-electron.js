const { execSync } = require('child_process');
const os = require('os');

/*
    Build the Electron app for the current platform.
    This script is used in the "build" script in root package.json to dynamically 
    build the correct electron builder based on which system the user is using.
*/

const platform = os.platform();

let buildCommand;

if (platform === 'win32') {
  buildCommand = 'electron-builder --win';
} else if (platform === 'darwin') {
  buildCommand = 'electron-builder --mac';
} else if (platform === 'linux') {
  buildCommand = 'electron-builder --linux';
} else {
  console.error('Unsupported platform:', platform);
  process.exit(1);
}

console.log(`Building for platform: ${platform}`);
execSync(buildCommand, { stdio: 'inherit' });