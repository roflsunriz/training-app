# 腹筋強化トレーニング支援アプリ 仕様書

## 1. 文書の目的
本仕様書は、"所謂普通の腹筋運動が1回も出来ない、プランクも1秒保たないユーザー向けの腹筋を強くする運動メニュー" を、Electron + TypeScript + React + Tailwind CSS + electron-updater を用いたデスクトップアプリとして実装するための作業用仕様書である。Cursor 上で実装を進めることを前提とし、要求仕様、画面仕様、データ構造、状態遷移、非機能要件、リリース要件をまとめる。

## 2. 背景
対象ユーザーは、一般的な腹筋運動や床プランクを開始できないレベルの体幹筋力しか持たない可能性がある。そのため本アプリは、強い負荷のトレーニングを提示するのではなく、以下を重視する。

- 最小負荷から始められること
- 毎日ではなく週単位で無理なく継続できること
- 成功体験を可視化できること
- 次の段階へ進む条件が明確であること
- 腰痛や無理なフォームを避けるガイドがあること

## 3. プロダクト概要
本アプリは、腹筋が極端に弱いユーザー向けに、段階的な体幹トレーニングメニューを提示し、日々の実施記録、達成状況、進行条件、注意事項を管理する単体デスクトップアプリである。

### 3.1 コア価値
- 何から始めればよいか分からないユーザーでも開始できる
- 1回 10〜15 分程度で完了する
- 今日やることが迷わず分かる
- 自分の達成状況に応じて次の段階へ進める
- 完了履歴がローカルに保存される

### 3.2 想定利用環境
- Windows 11 を優先ターゲットとする
- オフラインでも利用可能
- 初回起動後、基本機能はネットワーク不要
- アップデート確認時のみ通信可

## 4. 技術スタック
- Electron
- TypeScript
- React
- Tailwind CSS
- electron-updater
- 状態管理: React Context または Zustand
- ルーティング: React Router もしくは単一画面構成
- 永続化: localStorage または JSON ファイル保存

## 5. 開発方針
- まずは MVP を成立させる
- 医療診断アプリにはしない
- 高度な分析やクラウド同期は初期版では入れない
- 画面数は絞り、操作導線を短くする
- 実装は最小差分で積み上げる

## 6. 対象ユーザー
### 6.1 主対象
- 普通の腹筋運動が 1 回もできない
- プランクが 1 秒も保てない
- 体力に自信がない
- フィットネス初心者
- 運動メニューを自力で組めない

### 6.2 副対象
- リハビリではないが極めて軽負荷から始めたい人
- 腰へ不安があり強負荷を避けたい人
- 継続管理のためにデスクトップアプリを好む人

## 7. スコープ
### 7.1 初期版に含める
- 段階別トレーニングメニューの表示
- 今日のメニュー表示
- 種目ごとの説明表示
- 実施チェック
- セッション完了記録
- 進行条件の判定
- 段階の手動変更と推奨表示
- 進捗の可視化
- 注意事項表示
- 設定保存
- 自動更新確認

### 7.2 初期版に含めない
- 医師監修表現
- 音声ガイド
- 動画再生
- クラウド同期
- アカウント機能
- 通知の高度なスケジューリング
- ウェアラブル連携
- AI コーチング

## 8. 画面一覧
1. ホーム画面
2. 今日のトレーニング画面
3. 種目詳細モーダル
4. 進捗画面
5. 段階判定画面
6. 設定画面
7. 初回オンボーディング画面

## 9. 情報設計
### 9.1 ホーム画面
表示項目:
- 現在の段階
- 次回推奨メニュー
- 本日の状態
- 前回実施日
- 連続実施回数または週内達成数
- 注意文
- 開始ボタン
- 進捗を見るボタン

期待動作:
- アプリ起動時に最初に表示される
- 未実施なら "今日のメニューを開始" を強調
- 実施済みなら完了表示と次回案内を表示

### 9.2 今日のトレーニング画面
表示項目:
- セッション名
- 想定所要時間
- 種目リスト
- 各種目の回数、秒数、セット数
- フォームの要点
- 腰が痛い場合の注意文
- 完了チェック
- セッション完了ボタン

期待動作:
- A 日と B 日を自動ローテーションする
- 各種目ごとにチェック可能
- 全種目未チェックでも完了可能だが警告を出す
- 完了時に実施ログを保存する

### 9.3 種目詳細モーダル
表示項目:
- 種目名
- 目的
- 手順
- よくある失敗
- 軽減版のやり方
- 次の段階へのつながり

### 9.4 進捗画面
表示項目:
- 現在の段階
- 累計実施回数
- 段階ごとの達成率
- 最近 14 日の実施履歴
- セッション A/B の実施回数
- 現在の進行条件の達成状況

### 9.5 段階判定画面
表示項目:
- 現在の段階
- 段階を上げる条件
- 段階を維持する理由
- 推奨判定結果
- 手動で段階を変更するボタン

### 9.6 設定画面
表示項目:
- ユーザー名または表示名
- 注意事項を毎回表示するか
- セッション時間の目安表示
- データのエクスポート
- データの初期化
- アプリバージョン
- アップデート確認

### 9.7 初回オンボーディング画面
表示項目:
- アプリの目的
- 医療用途ではない旨
- 痛みがある場合は中止する旨
- 現在の開始段階説明
- 利用開始ボタン

## 10. トレーニングプログラム仕様
## 10.1 段階定義
- Stage 1: 導入期 1〜2 週
- Stage 2: 基礎期 3〜4 週
- Stage 3: 移行期 5 週以降

## 10.2 セッション種別
- Session A
- Session B

週 4 日を推奨するが、実施不能日があっても継続できる設計とする。

## 10.3 Stage 1 Session A
- お腹へこませキープ: 5 秒 x 6 回
- ペルビックティルト: 8 回 x 2 セット
- かかとスライド: 左右 6 回ずつ x 2 セット
- ブリッジ超軽量版: 3 秒キープ x 5 回

## 10.4 Stage 1 Session B
- お腹へこませキープ: 5 秒 x 6 回
- 膝左右倒し 小さく: 左右 6 回ずつ
- マーチング: 左右 5 回ずつ x 2 セット
- 椅子座位で腹圧: 10 秒 x 5 回

## 10.5 Stage 2 Session A
- お腹へこませキープ: 10 秒 x 5 回
- ブリッジ: 5 秒 x 6 回
- マーチング強化: 左右 8 回ずつ
- 壁プランク: 10〜15 秒 x 4 回

## 10.6 Stage 2 Session B
- ペルビックティルト: 10 回 x 2 セット
- デッドバグ予備動作: 左右 6 回ずつ
- 四つ這い荷重保持: 10 秒 x 5 回
- バードドッグ予備動作: 左右 5 回ずつ

## 10.7 Stage 3
- 台に手をつく斜めプランク: 15〜20 秒 x 3 回
- 膝つきプランク: 5〜10 秒 x 3〜5 回
- クランチ導入: 3〜5 回

## 11. 進行条件ロジック
### 11.1 Stage 1 から Stage 2 への推奨条件
以下をすべて満たす場合に推奨:
- お腹へこませキープ 10 秒 x 5 回相当を問題なく実施できる
- かかとスライド中に腰反りの自己申告がない
- ブリッジ超軽量版 5 回が苦痛なくできる
- Stage 1 のセッションを累計 6 回以上完了している

### 11.2 Stage 2 から Stage 3 への推奨条件
以下をすべて満たす場合に推奨:
- 壁プランク 15 秒 x 4 回が実施できる
- 四つ這い保持 10 秒 x 5 回が実施できる
- Stage 2 のセッションを累計 6 回以上完了している

### 11.3 判定仕様
- 自動で強制昇格はしない
- 条件を満たしたら "次の段階へ進めます" と表示する
- ユーザーが手動で段階を変更する
- 段階を戻す操作も可能

## 12. ユーザーフロー
### 12.1 初回起動
1. オンボーディング表示
2. 注意事項確認
3. 初期状態作成
4. ホーム画面へ遷移

### 12.2 日々の利用
1. ホーム画面表示
2. 今日のトレーニング開始
3. 種目を確認しながら実施
4. 完了チェック
5. セッション完了
6. 履歴保存
7. 進行条件が満たされていれば案内表示

### 12.3 段階変更
1. 進捗または段階判定画面を開く
2. 判定を確認
3. 手動で次の段階へ変更
4. 次回のメニュー内容が変わる

## 13. データモデル
## 13.1 TypeScript 型案
```ts
export type StageId = 'stage1' | 'stage2' | 'stage3';
export type SessionType = 'A' | 'B';

export type Exercise = {
  id: string;
  name: string;
  description: string;
  tips: string[];
  warnings: string[];
  regression?: string;
  progression?: string;
  prescription: {
    reps?: number;
    seconds?: number;
    sets?: number;
    perSide?: boolean;
    rangeText?: string;
  };
};

export type TrainingSession = {
  id: string;
  stageId: StageId;
  sessionType: SessionType;
  title: string;
  estimatedMinutes: number;
  exercises: Exercise[];
};

export type SessionLog = {
  id: string;
  completedAt: string;
  stageId: StageId;
  sessionType: SessionType;
  completedExerciseIds: string[];
  painReported: boolean;
  notes?: string;
};

export type ProgressState = {
  currentStage: StageId;
  onboardingCompleted: boolean;
  logs: SessionLog[];
  preferredSessionRotation: SessionType;
  showSafetyReminder: boolean;
};
```

## 13.2 保存方針
MVP ではレンダラープロセス側で localStorage 保存でもよいが、将来的な拡張性を考慮し、以下のどちらかを採用する。

案 A:
- localStorage に JSON 文字列として保存
- 実装が簡単
- データ量が少ない本件では十分

案 B:
- Electron の userData 配下へ JSON 保存
- preload 経由で安全に I/O を限定公開
- 将来のエクスポート、バックアップと相性が良い

初期版推奨は案 B とする。

## 14. 状態管理
### 14.1 必要状態
- 現在段階
- 今日表示すべきセッション A/B
- 実施履歴
- セーフティリマインダ表示設定
- オンボーディング完了状態

### 14.2 ローテーションロジック
- デフォルトは A → B → A → B
- 最後に完了したセッション種別から次回を決定
- ログがなければ A を表示

## 15. UI 要件
### 15.1 デザイン方針
- 初心者が怖がらない柔らかい UI
- 情報量は多すぎず、1画面 1目的
- ボタンは大きめ
- 主要アクションを明確化
- Tailwind で実装しやすいシンプル構成

### 15.2 必須 UI コンポーネント
- AppShell
- StageBadge
- SessionCard
- ExerciseCard
- ProgressSummary
- SafetyAlert
- ConfirmDialog
- SettingsPanel
- UpdateBanner

### 15.3 アクセシビリティ
- キーボード操作可能
- 色だけに依存しない状態表示
- 文字サイズは最低限読みやすいサイズ
- コントラストを確保

## 16. Electron 構成方針
### 16.1 プロセス分離
- main: ウィンドウ生成、アップデート、保存 I/O
- preload: 必要 API の限定公開
- renderer: React UI

### 16.2 preload 公開 API 例
```ts
export interface AppApi {
  getAppVersion: () => Promise<string>;
  loadState: () => Promise<ProgressState | null>;
  saveState: (state: ProgressState) => Promise<void>;
  checkForUpdates: () => Promise<void>;
  onUpdateStatus: (callback: (message: string) => void) => () => void;
}
```

### 16.3 セキュリティ要件
- contextIsolation: true
- nodeIntegration: false
- preload 経由以外の Node API 利用禁止
- 外部 URL の無制限遷移禁止
- CSP を設定する

## 17. 自動更新仕様
### 17.1 利用ライブラリ
- electron-updater

### 17.2 要件
- 起動時に更新確認できる
- 設定画面から手動更新確認できる
- 更新がある場合は通知表示
- ダウンロード完了後に再起動案内を表示

### 17.3 注意点
- GitHub Releases または汎用配信サーバを前提にする
- 署名や配布方法はビルドパイプラインと整合させる
- 開発環境では updater を安全に無効化またはモック化する

## 18. エラーハンドリング
- 保存失敗時はトーストまたはダイアログで通知
- state の JSON 破損時は初期化前に復旧案内を出す
- 更新確認失敗時はアプリ継続可能とする
- 重大エラーでもクラッシュ一発終了にしない

## 19. ログ方針
初期版では簡易ログでよい。

- main プロセス: update 関連ログ
- renderer: 開発時のみ console 出力
- 将来的に userData 配下へのログファイル保存を検討

## 20. 受け入れ条件
### 20.1 機能受け入れ条件
- 初回起動時にオンボーディングが表示される
- ホーム画面に現在段階と次回メニューが表示される
- セッション開始から完了保存まで行える
- ログが再起動後も残る
- 進行条件を満たすと推奨表示が出る
- 段階の手動変更ができる
- 設定画面からデータ初期化ができる
- アプリバージョンが表示される
- 更新確認の UI がある

### 20.2 非機能受け入れ条件
- 起動が極端に遅くない
- オフラインで基本利用できる
- 画面崩れが大きくない
- Windows 11 で最低限動作する
- preload 経由以外で Node API を触らない

## 21. ディレクトリ構成案
```txt
src/
  main/
    index.ts
    updater.ts
    storage.ts
  preload/
    index.ts
    types.ts
  renderer/
    main.tsx
    App.tsx
    routes/
      HomePage.tsx
      TrainingPage.tsx
      ProgressPage.tsx
      StagePage.tsx
      SettingsPage.tsx
      OnboardingPage.tsx
    components/
      AppShell.tsx
      StageBadge.tsx
      SessionCard.tsx
      ExerciseCard.tsx
      ProgressSummary.tsx
      SafetyAlert.tsx
      UpdateBanner.tsx
    features/
      training/
        trainingData.ts
        trainingLogic.ts
        progressLogic.ts
        types.ts
      settings/
        settingsStore.ts
    stores/
      appStore.ts
    utils/
      date.ts
      format.ts
```

## 22. 実装順序
### Phase 1: 土台
- Electron + React + Tailwind + TypeScript の起動確認
- preload 経由 API の雛形作成
- 画面ルーティングまたは単画面構成作成

### Phase 2: ドメイン実装
- trainingData 定義
- 段階別セッション表示
- ログ保存
- A/B ローテーション
- 進行条件判定

### Phase 3: UI 完成
- ホーム
- 今日のトレーニング
- 進捗
- 設定
- オンボーディング

### Phase 4: 配布対応
- electron-updater 導入
- ビルド設定
- アイコン、バージョン、配布導線整備

## 23. Cursor 向け実装指示
以下の前提で作業すること。

- TypeScript strict を有効にすること
- any の濫用を避けること
- React 関数コンポーネントで実装すること
- Tailwind のクラスは読みやすく整理すること
- Electron の main / preload / renderer 分離を守ること
- 保存処理は preload API 経由に限定すること
- ロジックと UI を分離すること
- トレーニングデータはハードコードでよいが、後で JSON 化しやすい構造にすること
- まず MVP を通し、その後に装飾を加えること

## 24. 禁止事項
- nodeIntegration: true を使わない
- renderer から fs を直接叩かない
- 医療効果を断定しない
- 初期版から過剰な機能追加をしない
- 1画面に全情報を詰め込みすぎない

## 25. 将来拡張案
- 通知リマインダー
- 種目イラスト
- GIF または動画ガイド
- CSV / JSON エクスポート強化
- 複数ユーザープロファイル
- 腰痛配慮モード
- 体重重め向けメニュー分岐
- 実施メモ分析
- テーマ切替

## 26. MVP 完了の定義
以下が満たされれば MVP 完了とする。

- 初回起動からオンボーディング完了まで動く
- Stage 1〜3 のメニューが表示できる
- A/B セッションがローテーションする
- セッション完了ログが保存される
- 進行条件が計算される
- 進捗画面で履歴が見える
- 設定画面でアプリ情報が見える
- 更新確認の導線がある

## 27. 実装メモ
- Electron 雛形は Vite ベースでも可
- electron-builder と組み合わせる場合は electron-updater との整合確認が必要
- 開発中は updater の副作用を避けるため、環境フラグで無効化する
- 日付処理は簡素でよいが、将来の履歴表示のため ISO 8601 文字列で保存する

## 28. 最終成果物
初期版では以下を成果物とする。

- デスクトップアプリ本体
- 実装済み UI
- ローカル保存機能
- 段階判定ロジック
- 更新確認機能
- README
- ビルド手順

## 29. README に最低限書く内容
- セットアップ方法
- 開発起動方法
- ビルド方法
- 更新配信方法の概要
- データ保存場所
- 注意事項

