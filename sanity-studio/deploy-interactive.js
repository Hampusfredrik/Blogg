const { spawn } = require('child_process');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('Deploying Sanity Studio...');
console.log('When prompted for hostname, type: my-blog-cms');

const deploy = spawn('npx', ['sanity', 'deploy', '--no-build'], {
  stdio: 'inherit',
  shell: true
});

deploy.on('close', (code) => {
  console.log(`Deploy process exited with code ${code}`);
  rl.close();
});
