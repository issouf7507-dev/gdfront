module.exports = {
  apps: [
    {
      name: "gdcouv",
      script: "node_modules/next/dist/bin/next",
      args: "start",
      cwd: __dirname,
      instances: 1,
      autorestart: true,
      max_memory_restart: "1G",
      // Limite la mémoire Node pour éviter que le process grossisse sans fin
      node_args: "--max-old-space-size=896",
      env: {
        NODE_ENV: "production",
        PORT: 3001,
      },
      env_production: {
        NODE_ENV: "production",
        PORT: 3001,
      },
      merge_logs: true,
      time: true,
    },
  ],
};
