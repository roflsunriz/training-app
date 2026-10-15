# プロジェクト固有の知見

共通指針と [AGENTS.md](AGENTS.md) を読んだ後、作業前にこの文書を全文読む。元の条件・確認日・未検証事項を保ったまま、固有の実現手段と再利用する知見を集約する。

## 共通指針の具体化と適用範囲

- 対象: 共通指針の「設計と実装方針」「検証」「更新手順」「ドキュメント」と、各節に明記した共通ルール。
- 理由・範囲: Bunを使うElectronアプリで、node/webの参照プロジェクトと梱包済みapp.asarの確認が必要。共通の型検査・ビルドを、下記の実効コマンドと配布物検査で具体化する。
- 代替手段・検証: 以下の実効コマンド・根拠を用い、[検証記録](verification.md) で成功・未検証を区別する。共通方針の完了条件やユーザーの明示指示は弱めない。

## AGENTS.mdから移した知見

## パッケージ管理

- パッケージマネージャは Bun を使用する。
- CIとReleaseで指定する同じBunを使い、依存更新時は `bun.lock` も再生成して `bun install --frozen-lockfile` と `bun audit` を確認する。npm向けDependabot PR #1は `package.json` だけを変更し、ロック不整合でCIが停止した。
- ルート `tsconfig.json` は参照先だけを持つため、`tsc --noEmit` 単体ではソースを検査しない。`bun run type-check` のbuildモードでnode/web両プロジェクトを検査する。
- Vitest 5はNode.js 22.12以降を必要とする。Vite 8には対応する `@vitejs/plugin-react` 6を使う。検証範囲は `verification.md` を参照する。
- 配布確認では `bun run build` だけで済ませず、electron-builderで作った `app.asar` とインストーラーも確認する。Bunでは依存関係ツリーをファイル走査で収集するため、梱包後の依存読み込みとmain/preload/rendererの接続を検証し、`latest.yml` の版・サイズ・SHA-512を実ファイルと照合する。アプリ実行は隔離したuserDataと `DISABLE_UPDATER=true` を使う。
- electron-builderは `bun x --no-install` で起動する。2026-09-13にnpxが `react-router` のBun用overridesをnpmの規則で評価し、EOVERRIDEでリリースを停止した。ワークフローだけの障害はmain側を修正し、既存タグを移動せず手動実行の `release_tag` で復旧する。

## Dependabot の限定修復（2026-09-23）

- CI 再失敗後の自動修復は `bun.lock` だけをパッチとして適用する。修復後は `workflow_dispatch` で `.github/workflows/ci.yml` を再実行するため、この CI の `contents: read` と checkout の `persist-credentials: false` を維持し、PR コードを実行するジョブへ書き込み権限や秘密情報を渡さない。根拠は `.github/workflows/dependabot-automation.yml` と共通ワークフローの権限分離。

## 依存更新の注意（2026-09-23）

- `overrides` に固定版がある依存は、Dependabot PR の `devDependencies` 引き上げだけでは実効版が変わらない。`package.json` の両方を揃えて `bun install` で `bun.lock` を再生成し、解決版が変わったことを確認する（例: Electron 44.4.3）。
- 間接依存のメジャー系列ごとに修正版を適用する必要がある場合は、Bun の version-scoped override（例: `undici@^6.0.0` と `undici@^7.0.0`）を使う。2026-09-30の脆弱性修正ではこの形式で `bun.lock` が lockfileVersion 3 になったため、CI・Release と同じ Bun で frozen install を確認する。
- TypeScript 7.0 は API を同梱せず typescript-eslint 8.x が `does not support TS 7.0` で lint 失敗する。対応（TS 7.1以降待ち）まで最新6系へ留め、再提案時に移行する。根拠は公式7.0発表の併用案内と typescript-eslint#10940。
- TS6 の既定 `noUncheckedSideEffectImports: true` により `./index.css` の副作用importが型検査で失敗する。`src/renderer/vite-env.d.ts` の `vite/client` 参照で解決し、検査の無効化はしない。

## 系列別の依存修復（2026-10-05）

- 全majorへの一律overrideを避け、親パッケージの要求系列に合う修正版をversion-scoped overrideで選ぶ。lockfileの実効版、固定インストール、全重大度監査と製品チェックを確認する。
- electron-builder 26.15.3が取り込む旧 @electron/get 3 は got/cacheable-request 経由で未解決の機密キャッシュ問題を持つため、公式5.1.0へ限定移行する。Node.js 22.12以降が必要で、downloadArtifact互換性はWindows梱包でも確認する。http-cache-semantics 4.3.0の監査0件だけでは安全性を判断しない。PoCと実際の経路は `verification.md` を参照。

## 依存更新の互換条件（2026-10-15）

- ESLint 10はNode.js 22系では22.13以降を要求する。最低要件は `package.json` のenginesへ合わせる。typescript-eslint 8.71.2の公式peer範囲はTypeScript `<6.1.0` で、TypeScript 7への移行は引き続き不可。
- electron-vite 6では `externalizeDepsPlugin()` が非推奨のため、main/preloadの `build.externalizeDeps` を使う。Vitest設定は `vitest.config.mts` とし、ESM設定をCommonJSとして扱う警告を抑制せず解消する。
- 手動修正をpushしたPR #14がCI成功直後に既存自動化でマージされた。修正pushの直前にはPRのOpen状態とリモートブランチの存在を再確認し、既に削除されたブランチを再作成しない。複数PRの履歴をまとめて取り込む場合は最終CIまで統合先をDraftにし、merge commitで履歴を保持する。

## READMEなどから移した開発・運用情報

## 技術スタック

- Electron + electron-vite
- React 19 + TypeScript (strict)
- Tailwind CSS v4
- Zustand（状態管理）
- Zod（ランタイム検証）
- Vitest（単体テスト）

## セットアップ

開発にはNode.js 22.13以降と、CI定義に記載したBunを使用します。依存更新は[更新手順](how-to-update.md)、検証範囲は[検証手順](verification.md)を参照してください。

```bash
# 依存インストール
bun install --frozen-lockfile

# 開発起動
bun run dev

# lint
bun run lint

# 型チェック
bun run type-check

# テスト
bun run test

# ビルド（Electron アプリ出力）
bun run build
```

## ビルド・配布

```bash
# Windows インストーラー作成
bun run build && bun x --no-install electron-builder --win --publish never
```

生成物は `dist/` に出力されます。

## 依存更新の自動処理

Dependabot は対象の依存関係を毎週確認します。patch／minor 更新は PR のチェック（CI）が成功した後に自動で squash merge されます。CI の失敗ジョブは 1 回だけ再実行します。再失敗時は読み取り権限のジョブで `bun.lock` を再生成し、限定した修正コミットで CI を再実行します。修復できない PR は残します。major 更新は手動で確認します。

## 開発時の自動更新

開発環境では環境変数 `DISABLE_UPDATER=true` で無効化できます。

## 文書の役割

- [README.md](README.md): 利用開始と操作、利用者が知る必要のある制限。
- この文書: 固有の配置・ツール・実行手段・例外・再利用する調査知見。
- [verification.md](verification.md): 検証手順、実測結果、証拠、未検証事項。
- [how-to-update.md](how-to-update.md): 更新と復旧の手順。
