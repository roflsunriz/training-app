# 検証手順

## v0.1.5の公開前検証（2026-09-13）

- lint、node/webの型検査、32テスト、main・preload・rendererビルド、Bunの既知脆弱性監査0件を再確認。
- `bun x --no-install electron-builder --win --publish never` でWindows x64インストーラーとblockmapを生成。`latest.yml` のバージョン、サイズ、SHA-512が実際のインストーラーと一致することを確認。
- 梱包した `app.asar` のmain・preload・rendererをElectron 43.2.0で非表示起動し、専用の一時userDataで初回案内、設定入力・保存・切り替え、未完了セッションのキャンセル、セッション完了、A/B切り替え、空メモ省略、再読み込み後の保存保持を確認。900×670と480×600で横にはみ出さず、コンソールエラーなし。
- 実ユーザー環境へのインストールと、配布済み旧版からの自動更新適用は行っていない。公開されたインストーラー・blockmap・latest.ymlを取得し、GitHubのSHA-256と各ファイル、latest.ymlの版・サイズ・SHA-512とインストーラーの一致を確認した。
- 初回のタグ実行はnpxによるEOVERRIDEで公開前に停止した。main側の起動方法をBunへ統一し、v0.1.5タグを移動せず手動実行34731093796で公開に成功した。公開時のNode.js 20非推奨通知は、公式定義で入力互換性とnode24実行を確認した公開アクションv3.0.3へmain側を更新して対応した。

## 依存更新

`how-to-update.md` の固定ロックによるインストール、監査、lint、型チェック、テスト、ビルドを実行します。CIとReleaseも同じチェックを実行します。

- ルートtsconfigは参照先を持つ構成のため、型検査には `tsc --build --pretty false` を使用します。`tsc --noEmit` 単体で成功しても参照先の検査結果にはなりません。
- 単体テストはA/Bの交替、段階への移行条件、痛みを申告したときの進行抑制、JSTの日付境界、保存データの検証を対象とします。
- `bun run build` はmain・preload・rendererを出力します。インストーラー生成や実アプリ操作の確認とは区別します。
- フォーマット用の既存スクリプトはないため、今回の依存・設定・文書変更は `git diff --check` とESLintで検査します。

## 2026-09-13のDependabot対応

Vitest 3から5への変更とbun.lockを同期し、既存3ファイル32テストの成功を確認しました。脆弱性監査で見つかった間接依存を修正版へ更新し、CI・Releaseへ監査を追加しました。Node.jsの最低要件を22.12へ明記し、Vite 8対応のReactプラグインへ移行しました。

今回の範囲は依存・検証基盤の更新です。インストーラー公開、自動更新配信、実ユーザーデータを使ったElectron画面操作は実施しません。画面・保存処理を変更する際は、専用テストデータで初回案内、トレーニング完了、履歴、設定、エクスポート・リセットを確認してください。

## Dependabot 自動処理（2026-09-23）

`.github/workflows/dependabot-automation.yml` を actionlint で検査し、PR 用 workflow 名（CI）と一致することを確認する。Dependabot の patch／minor かつ全 PR チェック成功の場合だけ取り込み、major・古い SHA・限定修復後も失敗した PR は残す。

実際の Dependabot PR がまだない場合、動作経路は未検証として扱う。実 PR 発生後に自動化ジョブ、CI の再試行、マージ結果を確認する。

大量の Dependabot PR により CI 完了より分類が遅れる場合でも、分類後の `workflow_dispatch` が現在の PR 番号と head SHA を照合して再評価する。別の作成者、古い SHA、未完了の CI はマージしない。

## Dependabot PR #2-#6 の処理（2026-09-23）

- #2（Electron 44.4.3）と #6（@eslint/js 10.0.1）は CI 成功のためそのままマージ。#4・#5 はマージ済みであることを確認。
- #2 マージ後に実効版が 43.2.0 のまま残ることを検出（`overrides` の固定版が優先されるため）。ピンを 44.4.3 へ揃えて `bun.lock` を再生成し、解決版が変わったことを確認。
- #3（TypeScript 7.0.2）は CI の lint で `typescript-eslint does not support TS 7.0` 失敗。PR ブランチで再現を確認し、`typescript` を `^6.0.3` へ調整、`src/renderer/vite-env.d.ts`（`vite/client` 参照）を追加して main を取り込み、CI 成功後にマージ。
- 最終状態で `bun install --frozen-lockfile`、lint、型チェック（`tsc --build`）、テスト 32 件、ビルド、`bun audit`（脆弱性 0 件）を確認。今回の範囲は依存更新のみで、インストーラー生成や実アプリ操作の確認は行わない。
