import { type NextConfig } from "next";

const config: NextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath: '/todo-app-fe',
};

export default config;
