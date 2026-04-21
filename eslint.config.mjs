import nextConfig from 'eslint-config-next'

const config = [
  {
    ignores: ['.next/**', 'node_modules/**', 'out/**', 'build/**'],
  },
  ...nextConfig,
]

export default config
