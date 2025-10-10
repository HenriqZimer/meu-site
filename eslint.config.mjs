// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt({
  // Configurações personalizadas para o portfolio
  rules: {
    // Permite nomes simples para componentes em projetos de portfolio
    'vue/multi-word-component-names': 'off',
    
    // Permite variáveis não utilizadas que começam com underscore
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        ignoreRestSiblings: true
      }
    ],
    
    // Permite uso controlado de any em casos específicos
    '@typescript-eslint/no-explicit-any': 'warn',
    
    // Configurações mais flexíveis para desenvolvimento
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
  },
  
  // Ignora arquivos específicos se necessário
  ignores: [
    'dist/**',
    '.output/**',
    '.nuxt/**',
    'node_modules/**'
  ]
})
