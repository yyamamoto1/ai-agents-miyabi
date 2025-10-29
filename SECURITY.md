# セキュリティガイド

## ⚠️ 重要なセキュリティ注意事項

このプロジェクトを使用・展開する前に、以下のセキュリティ要件を必ず確認してください。

## 🔒 機密データ保護

### 除外対象ディレクトリ
以下のディレクトリには機密データが含まれるため、**絶対にGitHubにコミットしないでください**：

```
logs/           # 実行ログ（認証情報・ファイルパス等）
outputs/        # タスク処理結果（個人情報・API応答等）
data/           # 入力データ（機密情報含有可能性）
sessions/       # tmuxセッション情報
```

### 設定ファイル
- `config.json` ← 本番用設定（コミット禁止）
- `config.example.json` ← 公開用サンプル（コミット可）

## 🛡️ セットアップ時のセキュリティ

### 1. 設定ファイル作成
```bash
# サンプルから実環境用設定を作成
cp mcp-server/config.example.json mcp-server/config.json

# 設定を環境に合わせて編集
nano mcp-server/config.json
```

### 2. 権限設定
```bash
# ログ・出力ディレクトリの権限を制限
chmod 700 logs/ outputs/ data/

# 設定ファイルの権限を制限  
chmod 600 mcp-server/config.json
```

### 3. 環境変数使用
機密情報は環境変数で管理：
```bash
export MIYABI_LOG_LEVEL=info
export MIYABI_MAX_AGENTS=5
export MIYABI_SESSION_TIMEOUT=3600
```

## 🔍 自動サニタイゼーション

本システムには自動セキュリティ機能が含まれています：

### ログサニタイゼーション
- パスワード・トークン自動マスク化
- ファイルパス正規化
- 個人情報自動検出・除去

### 出力フィルタリング
- 機密パターンの自動検出
- エージェント出力のスクリーニング
- tmuxセッション情報のマスク化

## ⚡ 公開前チェック

### GitHub公開前の必須確認
```bash
# セキュリティチェック実行
npm run security-check

# 機密データスキャン
npm run scan-secrets

# .gitignore検証
git status --ignored
```

### 手動確認項目
- [ ] `logs/` `outputs/` `data/` がコミット対象外
- [ ] 設定ファイルに機密情報なし
- [ ] ファイルパスに個人ディレクトリなし
- [ ] API키・トークン類なし
- [ ] 認証情報なし

## 🚨 セキュリティインシデント対応

### 機密データが誤ってコミットされた場合

1. **即座にリポジトリを非公開化**
```bash
# GitHubでリポジトリを Private に変更
```

2. **歴史から完全削除**
```bash
# git-filter-branchで完全削除
git filter-branch --force --index-filter \
  'git rm --cached --ignore-unmatch logs/* outputs/* data/*' \
  --prune-empty --tag-name-filter cat -- --all

# 強制プッシュ
git push --force --all
git push --force --tags
```

3. **認証情報の無効化**
- API키・トークンの即座無効化
- パスワードの変更
- アクセス権限の見直し

## 📋 運用セキュリティ

### 定期的な確認事項
- [ ] ログファイルサイズ監視（1週間で自動削除）
- [ ] 出力ディレクトリ容量確認
- [ ] 機密データ漏洩スキャン
- [ ] アクセス権限監査

### 本番環境での注意点
- 個人環境での使用限定
- 外部ネットワークアクセス制限
- ログ保存期間の制限（最大7日）
- 定期的なデータ削除

## 🔧 セキュリティ設定

### 推奨設定
```json
{
  "security": {
    "logSanitization": true,
    "excludePersonalInfo": true,
    "maxLogRetentionDays": 7,
    "autoCleanup": true
  },
  "logging": {
    "level": "warn",
    "sanitize": {
      "enabled": true,
      "patterns": ["password", "token", "key", "secret"]
    }
  }
}
```

## 📞 セキュリティ報告

セキュリティ問題を発見した場合：

1. **Issue作成** - GitHub Issues でセキュリティラベル付与
2. **詳細情報** - 再現手順・影響範囲・修正提案
3. **緊急度** - High/Medium/Low で分類

## ⚖️ 責任と免責

- 本ソフトウェアは教育・研究目的です
- 商用利用時は独自のセキュリティ監査が必要です
- データ漏洩等の責任は使用者に帰属します
- 定期的なセキュリティアップデートを推奨します

---

**🔐 セキュリティは全員の責任です。不明な点があれば必ず確認してください。**