let currentVersion = '1.0.0';

setInterval(() => {
  const [major, minor, patch] = currentVersion.split('.').map(Number);
  currentVersion = `${major}.${minor}.${patch + 1}`;
  console.log(`Updated version to: ${currentVersion}`);
}, `${1 * 60 * 1000}`);

const getCurrentVersion = (req, res) => {
  res.json({ version: currentVersion });
};

module.exports = { getCurrentVersion };