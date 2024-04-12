module.exports = {
  root: true,
  env: { //ESLintが実行される環境を指定(ブラウザとNode.jsを指定)
    browser: true,
    node: true
  },
  extends: [ // 他の設定ファイルを継承するための設定
    '@nuxtjs/eslint-config-typescript', // @nuxtjs/eslint-config-typescriptはNuxt.jsとTypeScriptを使用する場合の推奨設定
    'prettier', // Prettierの基本設定
    'prettier/vue', // Vueコンポーネントに対するPrettierの設定
    'plugin:prettier/recommended', // ESLintに統合するためのプラグインの推奨設定
    'plugin:nuxt/recommended' // Nuxt.jsプロジェクトのための推奨設定
  ],
  plugins: [ // 利用するESLintプラグインを指定。
    'prettier'
  ],
  // add your custom rules here
  rules: {
  }
}