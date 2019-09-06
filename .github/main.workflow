workflow "packtracker.io" {
  on = "push"
  resolves = ["report webpack stats"]
}

action "report webpack stats" {
  uses = "packtracker/report@2.2.0"
  secrets = ["PT_PROJECT_TOKEN"]
  env = {
    "WEBPACK_CONFIG_PATH" = "./webpack.config.js"
  }
}
