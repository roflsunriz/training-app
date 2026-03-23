# 腹筋トレーニング支援アプリ

腹筋が極端に弱いユーザー向けの段階的な体幹トレーニング支援デスクトップアプリです。

## 特徴

- 最小負荷から始められる 3 段階のプログラム
- 1 回 10〜15 分で完了する短時間設計
- A/B セッションの自動ローテーション
- 進行条件を満たすと次の段階への推奨を表示
- ローカル保存で完全オフライン動作

## 技術スタック

- Electron + electron-vite
- React 19 + TypeScript (strict)
- Tailwind CSS v4
- Zustand（状態管理）
- Zod（ランタイム検証）
- Vitest（単体テスト）

## セットアップ

```bash
# 依存インストール
bun install

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
bun run build && npx electron-builder --win
```

生成物は `dist/` に出力されます。

## 更新配信

GitHub Releases を利用した自動更新に対応しています。
開発環境では環境変数 `DISABLE_UPDATER=true` で無効化できます。

## データ保存場所

ユーザーデータは Electron の `userData` ディレクトリに保存されます：

```
%APPDATA%/ab-training-app/progress.json
```

## 注意事項

- このアプリは医療用途ではありません
- 痛みを感じた場合はすぐに中止してください
- 腰に不安がある方は医師にご相談ください

## ライセンス

[MIT](LICENSE)
