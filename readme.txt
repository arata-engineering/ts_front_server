/** 各種設定とtsを動かす環境 */
==============================================
npm init --yes
----------------------------------------------
・package.jsonが作成される
・下記設定を追加する
"type": "module"
　　フロントjsの場合はmodule
　　nodejsの場合はcommonjs
なぜ必要か：「npx 〇〇.js」を実行する時に、
cjs(CommonJS),mjs(ES Module)なのかを判定して実行してくれる
==============================================

==============================================
npm install --save-dev typescript @types/node
----------------------------------------------
・typescript ：typescriptの導入
・@types/node：nodeの型パッケージの導入
==============================================

==============================================
npx tsc --init
----------------------------------------------
・TypeScriptの設定ファイル（tsconfig.json）作成

▼cjsかmjsかで変更（トランスパイルの時必要）
"module": "commonjs" or "module": "esnext"
▼トランスパイル対象ファイルの選定
"include":
▼トランスパイルファイル出力先の選定
"outDir":
▼恐らくデュアルパッケージにする場合はコメント削除して使用する必要がある
"rootDir": "./"
==============================================

/** 実行系 */
==============================================
npx tsc
----------------------------------------------
コンパイル
==============================================
node ./〇〇
----------------------------------------------
jsファイルの実行（.jsの拡張子はなくても実行可能）
==============================================
npx ts-node ./XXXXX
----------------------------------------------
tsファイルの実行（.tsの拡張子はなくても実行可能）
==============================================

/** 使用した方がよさそうなパッケージとモジュール */
★☆★☆★☆★☆★☆eslint★☆★☆★☆★☆★☆
==============================================
#1 eslintのインストール
npm install --save-dev eslint @eslint/js @types/eslint__js typescript-eslin
----------------------------------------------
・eslintとは：静的解析ツール(コーディングルール規約)
・https://typescript-eslint.io/getting-started（導入方法）
・https://typescriptbook.jp/tutorials/eslint（ルールの設定変更の方法）
・https://eslint.org/docs/latest/rules/（ルールリファレンス）
・https://dev.to/cyrilletuzi/typescript-strictly-typed-part-1-configuring-a-project-9ca(設定例)
==============================================
#2 「eslint.config.js」の設定
----------------------------------------------
①「eslint.config.js」をルートに作成する
※デュアルパッケージでnodejsパッケージに配置する場合は「eslint.config.mjs」でよさそう
②以下をコピペして更新
<code>
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  {
    languageOptions: {
      parserOptions: {
        project: true,
      },
    },
  },
  {
    files: ['**/*.mjs'],
    ...tseslint.configs.disableTypeChecked,
  },
);
</code>
==============================================
#3 vscodeにeslintをインストールして使えるようにする
----------------------------------------------
https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint
※インストール後再起動
==============================================

★☆★☆★☆★☆★☆express★☆★☆★☆★☆★☆
==============================================
----------------------------------------------
npm i express
npm i -D @types/express
==============================================


