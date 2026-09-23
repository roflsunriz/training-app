# AGENTS.md

## 作業開始前の必須手順（最優先・例外なし）

1. エージェントは、調査、計画、コマンド実行、スキル利用、ファイル編集、コミット、プッシュを始める前に、必ずリポジトリ直下の `.\COMMON-AGENTS.md` を開き、先頭から末尾まで全文を読む。
2. `COMMON-AGENTS.md` はGit管理外のシンボリックリンクである。`git`や既定のignore設定が有効な`rg --files`の検索結果だけで、ファイルが存在しないと判断してはならない。PowerShellでは最初に次を実行する。

```powershell
Get-Content -Raw -LiteralPath .\COMMON-AGENTS.md
```

3. 読み取りに失敗した場合、出力が省略された場合、または末尾まで読めたことを確認できない場合は、一切の作業を開始せず、パスとシンボリックリンク先を確認して全文を再取得する。必要なら分割して末尾まで読む。
4. 全文を読了するまで、ローカル `AGENTS.md` だけを根拠に作業を続けてはならない。読了後は `COMMON-AGENTS.md` を最優先の指針とし、読了直後の最初の進捗報告で全文を読了したことを明示する。
   このファイルでは `training-app` 固有の補足だけを記載する。

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
- TypeScript 7.0 は API を同梱せず typescript-eslint 8.x が `does not support TS 7.0` で lint 失敗する。対応（TS 7.1以降待ち）まで最新6系へ留め、再提案時に移行する。根拠は公式7.0発表の併用案内と typescript-eslint#10940。
- TS6 の既定 `noUncheckedSideEffectImports: true` により `./index.css` の副作用importが型検査で失敗する。`src/renderer/vite-env.d.ts` の `vite/client` 参照で解決し、検査の無効化はしない。
