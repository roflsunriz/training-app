# 調査知見

- ルート `tsconfig.json` は参照だけなので `tsc --noEmit` 単体ではソースを検査しない。`bun run type-check` のbuild modeでnode/web両方を確認する。
- Electron配布は `bun run build` だけで終えず、`bun x --no-install electron-builder` で生成した `app.asar`、インストーラー、main/preload/renderer接続、`latest.yml` の版・サイズ・SHA-512を照合する。起動確認は隔離userDataと `DISABLE_UPDATER=true` を使う。
- `npx electron-builder` はBun用overridesをnpm規則で評価して `EOVERRIDE` になった。既存タグを動かさず、mainのworkflow修正後に `release_tag` で復旧する。
- Dependabotがmanifestだけ更新するとfrozen lockで止まる。`overrides` と `bun.lock` の実効版を揃え、系列別overrideはCI/Releaseと同じBunで検証する。自動修復は読取り権限でlockfileだけを扱う。
- TypeScript 7はAPI不足とtypescript-eslint非対応のため、対応確認まで6系に留める。TS6のCSS副作用importは `vite/client` 型参照で解決し、検査を無効化しない。
- Electron-builder配下の旧 `@electron/get` は監査0件だけで安全と判断せず、公式5系への限定移行後にWindows梱包とartifact download互換を確認する。
- 修正push前にPRがOpenか、remote branchが残るかを再確認する。自動マージ後の削除済みbranchを再作成しない。
