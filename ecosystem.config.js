const port = (process.env.PORT) ? process.env.PORT : 3000
const appName = (process.env.APP_NAME) ? process.env.APP_NAME : 'KP Pharma'
module.exports = {
  apps: [
    {
      name: appName,
      exec_mode: 'cluster',
      instances: 'max',
      script: './.output/server/index.mjs',
      port: 3000,
    },
    {
      name: 'KP Pharma - dev',
      exec_mode: 'cluster',
      instances: 'max',
      script: '../staging.kp-pharma.co.uk/.output/server/index.mjs',
      port: 3001,
    },
  ],
}
