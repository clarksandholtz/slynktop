module.exports = {
  extends: 'react-app',
  rules: {
    'no-console': ['error', { allow: ['error'] }],
    'react/prefer-stateless-function': 'off',
  },
  plugins: ['import'],
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx'],
        paths: [],
        moduleDirectory: ['node_modules', 'shared'],
      },
    },
  },
}
