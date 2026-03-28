# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/),
and this project adheres to [Semantic Versioning](https://semver.org/).

## [0.1.4] - 2026-03-29

### Changed

- 設定ページのアップデート進捗表示をテキストからダウンロードプログレスバーに変更
- アップデートのダウンロード完了後に自動で再起動して更新を適用するように変更

## [0.1.3] - 2026-03-24

### Fixed

- アイコンが適切に表示されるように修正

## [0.1.2] - 2026-03-23

### Fixed

- 「今日のトレーニング完了」判定がUTC基準だったためJST午前9時で日が切り替わっていた問題をJST（Asia/Tokyo）基準に修正
- `isSameDay` の日付比較をJST基準に統一
- データエクスポートのファイル名日付をJST基準に統一

## [0.1.1] - 2026-03-23

### Added

- Custom app icon featuring ab crunch silhouette with orange-red gradient

### Fixed

- Release workflow now uploads `latest.yml` for electron-updater version check
- Release workflow now uploads `.exe.blockmap` for differential updates
- Release notes now extracted from CHANGELOG.md instead of auto-generated

## [0.1.0] - 2026-03-23

### Added

- Initial project setup with electron-vite, React, TypeScript, Tailwind CSS
- Stage 1-3 training programs with A/B session rotation
- Session completion logging with local JSON persistence
- Progression condition evaluation for stage advancement
- Onboarding flow for first-time users
- Progress tracking with 14-day history view
- Settings page with data export and reset
- Auto-update check via electron-updater
