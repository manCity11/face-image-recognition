module.exports = () => {
  const rule = {
    test: /\.(scss|css)$/,
    use: ['style-loader', 'css-loader', 'sass-loader'],
  };

  return rule;
};
