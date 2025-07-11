module.exports = {
  apps: [
    {
      name: "se_project_express",
      script: "app.js",
      env: {
        NODE_ENV: "production",
        JWT_SECRET: "dev-secret", // ✅ add your actual secret here
        PORT: 3001,
      },
    },
  ],
};
