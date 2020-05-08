module.exports = () => {
  const { src } = require('../build-config');

  const rule = {
    test: /\.(js|jsx)$/,
    include: [src.appPath],
    use: ['babel-loader'],
  };

  return rule;
};
