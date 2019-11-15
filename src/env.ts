const env = {
  API_ENTRYPOINTS: process.env.API_ENTRYPOINTS,
  BASE_URL: process.env.BASE_URL,
  HTML5_HISTORY: process.env.HTML5_HISTORY,
  APP_PATH: process.env.APP_PATH,
}

const globalEnv = (window as any).env as typeof env

export default globalEnv || env
