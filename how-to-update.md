# 更新手順

## 開発・依存更新

Node.jsは `package.json` のengines、BunはCI・Release定義のバージョンを使用します。ユーザーデータの `progress.json` をバックアップし、作業ツリーの既存変更を確認してから更新します。

```powershell
git pull --ff-only
bun install --frozen-lockfile
bun audit
bun run lint
bun run type-check
bun run test
bun run build
```

Dependabotを含め依存を変更するときは、先に `bun install` で `bun.lock` を再生成し、package.jsonとロックの両方をレビューします。CIの `--frozen-lockfile` を外して不整合を回避しないでください。更新対象のリリースノートとNode/Viteの互換要件も確認します。

Vitest 5への移行にはNode.js 22.12以降が必要です。Vite 8では対応するReactプラグイン6を使用します。監査上のoverridesを変更する場合は、間接依存を含む監査0件と全検証を確認します。

## リリース

1. 前回リリースからの実際の差分を確認し、日本語の `CHANGELOG.md` のUnreleasedを整理します。
2. 互換性のない変更はmajor、互換性のある機能追加はminor、互換性のある不具合修正はpatchを上げ、package.jsonとロックを更新します。
3. 上記の監査・検証を実行し、Windowsインストーラーが必要な場合は `bun x --no-install electron-builder --win --publish never` で生成します。npxはBun用overridesの検証で停止するため使用しません。
4. 変更をmainへ反映してCI成功を確認します。
5. 公開を行うときだけ、実際のversionに一致する `vX.Y.Z` タグを作成してpushします。ReleaseワークフローがCHANGELOGから本文を抽出し、インストーラー・更新メタデータを公開します。

## 復旧

タグのソースに問題がなく、公開ワークフローだけが失敗した場合は、タグを削除・移動せずmainでワークフローを修正します。mainのCI成功後、`gh workflow run release.yml --repo roflsunriz/training-app --ref main -f release_tag=vX.Y.Z` の `vX.Y.Z` を既存タグへ置き換えて再実行します。手動実行も指定タグのソースを取得し、package.jsonのversionと照合してから同じタグへ公開します。

依存更新に問題がある場合は、package.jsonとbun.lockを同じコミット単位でrevertし、依存を再導入して上記検証を実行します。ユーザーデータは削除しません。公開済みタグの付け替えは避け、配布済みの不具合は新しいパッチバージョンで修正します。
