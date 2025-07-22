module.exports = {
  apps: [
    {
      name: "se_project_express",
      script: "app.js",
      instances: 1,
      autorestart: true,
      watch: false,
      max_restarts: 5,
      env: {
        NODE_ENV: "production",
        JWT_SECRET: "dev-secret",
        PORT: 3001,
      },
      env_production: {
        NODE_ENV: "production",
        JWT_SECRET: "dev-secret",
        PORT: 3001,
      },
    },
  ],
};
