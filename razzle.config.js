const nodeExternals = require('webpack-node-externals')

module.exports = {
  modify: (config, { target, dev }, webpack) => {
    config.externals = []
    return config
  },
};
