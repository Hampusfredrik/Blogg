const { spawn } = require('child_process');

const deploy = spawn('npx', ['sanity', 'deploy'], {
  stdio: 'inherit',
  shell: true
});

deploy.on('close', (code) => {
  console.log(`Deploy process exited with code ${code}`);
});
