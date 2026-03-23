1. 前回のリリースバージョンからのコミット履歴を取得し、変更点を抽出する
2. 変更点をもとに、CHANGELOG.md を更新する
3. メジャー->破壊的変更、大規模変更、マイナー->バグ修正、新機能追加、パッチ->バグ修正としてpackage.jsonのversionを更新する
4. git tag v{version} & git push origin v{version}でGitHub Actionsが自動リリース作成