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

## Dependabot PR #7-#11 の処理（2026-09-30）

- PR #7（Vite 8.3.1）、#8（React と @types/react 19.3.0）、#10（Zustand 5.0.15）、#11（Electron 44.4.5）は、CI の lint、`bun audit`、型チェック、32 テスト、build が成功した後に `main` へマージした。
- 4件を統合した `main` の CI（workflow_dispatch、run 36589057285）も lint、`bun audit`、型チェック、32 テスト、build の全チェックが成功した。
- 4件の最初のCI失敗は `fast-uri` 3.1.6 と `undici` 7.29.0／6.28.0 の既知脆弱性による `bun audit` の失敗。version-scoped override で `fast-uri` 3.1.7、`undici` 7.29.1／6.28.1 を指定し、Electron と Vite の override もDependabotの更新版へ揃えた。ローカル `bun audit` は脆弱性 0 件、frozen install は成功。
- ローカルには Bun 1.4.0 のみがあり、lockfile の再生成とローカル検証はその版で実施した。CI はプロジェクト指定の Bun 1.4.2 で各PRを検証し、成功を確認した。
- PR #9（TypeScript 7.0.2）は typescript-eslint 8.x が TypeScript 7.0 をサポートせず lint が失敗するため、既知の互換性制約に従いマージせずクローズ状態を維持した。`typescript` は 6.0.3 のままとする。

## 2026-10-05: GitHub受付・READMEの整備（公開前）

- 比較元: `5cbc3ac9d70f3a2b5a2e33d71dee668c3f981252`（`main`）。
- 受付フォーム 2 件のYAML構造、重複キー・ID、入力型、選択肢、予約ファイル名を一括検査し、エラー0件。
- 既存の固有質問・入力例・必須条件を原文と照合。READMEのリンク・画像・コマンド・条件を確認し、裏付けがある誤記だけを訂正した。
- 既存のCI、Dependabot、labeler、ライセンスのファイル内容は比較元から変更していない。
- 製品のビルド・インストール・実機操作、GitHub上のフォーム表示、公開後CIは今回の静的検証に含めない。公開後に実際の受付表示と必要ラベルの適用を確認する。

## 2026-10-05: マージ後の依存監査失敗の修復

- 旧受付整備PRは既にマージ済みで、現在の既定ブランチCIに依存監査の失敗があることをGitHub APIと失敗ログで再確認した。過去の公開前記録を現在の成功根拠には使わない。
- `brace-expansion`、`fast-uri`、`js-yaml`、`undici` は親依存が要求するmajor系列ごとに修正版を指定する。全系列を新majorへ一律置換しない。
- `app-builder-lib -> @electron/get 3 -> got 11 -> cacheable-request -> http-cache-semantics` の経路を、公式 `@electron/get 5.1.0` へ限定移行した。Node.js 22.12以降が必要。既存 electron-builder 26.15.3 の `downloadArtifact` 呼び出し互換性は、Windowsインストーラー生成で確認した。
- npm配布の `http-cache-semantics 4.3.0` は監査上検出されなくても、private/Set-Cookie付きの非保存可能な応答に `max-stale=999999` を指定すると再利用されることをローカルPoCで確認した。安全版と扱わず、上記の依存経路そのものを新ダウンローダーへ移した。現在のロックに got/cacheable-request/http-cache-semantics はない。
- 固定インストール、全重大度の `bun audit`（0件）、lint、型、既存 32 テスト、main/preload/rendererビルドを確認。配布パッケージと専用userDataでの非表示起動も確認した。公開、実ユーザーへのインストール、自動更新の実適用は行わない。
- Windowsインストーラーとblockmapを生成し、梱包済みapp.asarで初回案内の描画とmain/preloadの保存読み出し接続を確認。rendererのコンソールエラー0件。
