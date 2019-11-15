const configVars = ['API_ENTRYPOINTS', 'HTML5_HISTORY', 'BASE_URL', 'APP_PATH']

console.log(`window.env = {
  ${configVars.map(varName => `${varName}: '${process.env[varName] || ''}'`).join(',\n  ')}
}`)
