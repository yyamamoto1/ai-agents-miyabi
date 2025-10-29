#!/bin/bash

# ai-agents-miyabi セキュリティチェックスクリプト

echo "🔍 ai-agents-miyabi セキュリティチェック開始"
echo "=============================================="

# 色定義
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

ISSUES=0

# 1. 危険なディレクトリ・ファイルの存在チェック
echo -e "\n📁 危険なディレクトリ・ファイルチェック"
echo "----------------------------------------"

dangerous_paths=("logs/" "outputs/" "data/" "sessions/" "*.log" "config.json" "*-secrets.json" "*-credentials.json")

for path in "${dangerous_paths[@]}"; do
    if [ -e "$path" ] || ls $path 1> /dev/null 2>&1; then
        echo -e "${RED}❌ 危険: $path が存在します${NC}"
        ISSUES=$((ISSUES + 1))
    else
        echo -e "${GREEN}✅ 安全: $path は存在しません${NC}"
    fi
done

# 2. Gitトラッキング状況確認
echo -e "\n📋 Gitトラッキング状況確認"
echo "----------------------------------------"

if git status --porcelain --ignored | grep -E "(logs/|outputs/|data/|\.log|config\.json)" > /dev/null; then
    echo -e "${RED}❌ 危険: 機密ファイルがGit管理下にあります${NC}"
    git status --porcelain --ignored | grep -E "(logs/|outputs/|data/|\.log|config\.json)"
    ISSUES=$((ISSUES + 1))
else
    echo -e "${GREEN}✅ 安全: 機密ファイルはGit管理下にありません${NC}"
fi

# 3. .gitignore の検証
echo -e "\n🚫 .gitignore 検証"
echo "----------------------------------------"

required_ignores=("logs/" "outputs/" "data/" "*.log" "config.json" "*-secrets.json")
gitignore_issues=0

for ignore in "${required_ignores[@]}"; do
    if grep -q "$ignore" .gitignore; then
        echo -e "${GREEN}✅ $ignore は.gitignoreに含まれています${NC}"
    else
        echo -e "${RED}❌ $ignore が.gitignoreにありません${NC}"
        gitignore_issues=$((gitignore_issues + 1))
    fi
done

if [ $gitignore_issues -gt 0 ]; then
    ISSUES=$((ISSUES + gitignore_issues))
fi

# 4. ソースコード内の機密情報検索
echo -e "\n🔍 ソースコード機密情報スキャン"
echo "----------------------------------------"

# 機密パターン定義
secret_patterns=("password" "secret" "credential" "api_key" "auth.*=" "/Users/" "localhost:" "@.*\.com")

found_secrets=0
for pattern in "${secret_patterns[@]}"; do
    matches=$(grep -r -i "$pattern" --include="*.ts" --include="*.js" --include="*.json" --exclude-dir=node_modules --exclude-dir=dist . 2>/dev/null | grep -v -E "(example|sample|placeholder|PLACEHOLDER|REDACTED|security\.ts|教育|tutorial|サンプル|説明|コメント|/api/users|localhost:|package-lock\.json|Personal Access Token|GitHub.*secrets|AWS Secrets Manager|AIGitHubTutorialAgent|AISecurityEngineerAgent|N8NBuilderAgent|AIFullStackCodeEngineerAgent|AIFullStackProgrammerAgent|AICreativeDesignerAgent|task-mapper\.ts|personalizationTokens|designTokens|design.*tokens|extractKeywords|keywords|synonym)" | head -5)
    
    if [ ! -z "$matches" ]; then
        echo -e "${YELLOW}⚠️  潜在的機密情報 '$pattern':${NC}"
        echo "$matches"
        found_secrets=$((found_secrets + 1))
    fi
done

if [ $found_secrets -gt 0 ]; then
    echo -e "${YELLOW}⚠️  $found_secrets 種類の潜在的機密パターンが見つかりました${NC}"
    ISSUES=$((ISSUES + 1))
else
    echo -e "${GREEN}✅ 機密情報パターンは見つかりませんでした${NC}"
fi

# 5. ファイル権限チェック
echo -e "\n🔐 ファイル権限チェック"
echo "----------------------------------------"

if [ -f "mcp-server/config.json" ]; then
    perms=$(stat -f "%A" mcp-server/config.json 2>/dev/null || stat -c "%a" mcp-server/config.json 2>/dev/null)
    if [ "$perms" != "600" ]; then
        echo -e "${YELLOW}⚠️  config.json の権限が $perms です（推奨: 600）${NC}"
        ISSUES=$((ISSUES + 1))
    else
        echo -e "${GREEN}✅ config.json の権限は適切です${NC}"
    fi
else
    echo -e "${GREEN}✅ config.json は存在しません（安全）${NC}"
fi

# 6. 環境固有のパス検索
echo -e "\n🗂️  環境固有パス検索"
echo "----------------------------------------"

env_paths=$(grep -r "/Users/" --include="*.ts" --include="*.js" --include="*.json" --exclude-dir=node_modules . 2>/dev/null | grep -v -E "(example|gitignore|security)" | head -3)

if [ ! -z "$env_paths" ]; then
    echo -e "${RED}❌ 環境固有のパスが見つかりました:${NC}"
    echo "$env_paths"
    ISSUES=$((ISSUES + 1))
else
    echo -e "${GREEN}✅ 環境固有のパスは見つかりませんでした${NC}"
fi

# 7. パッケージセキュリティ監査
echo -e "\n📦 NPMセキュリティ監査"
echo "----------------------------------------"

if command -v npm > /dev/null; then
    npm audit --audit-level moderate > /dev/null 2>&1
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✅ NPMパッケージに重大な脆弱性はありません${NC}"
    else
        echo -e "${YELLOW}⚠️  NPMパッケージに脆弱性があります: npm audit で確認してください${NC}"
        ISSUES=$((ISSUES + 1))
    fi
else
    echo -e "${YELLOW}⚠️  NPMが見つかりません - パッケージ監査をスキップ${NC}"
fi

# 結果サマリー
echo -e "\n📊 セキュリティチェック結果"
echo "=============================================="

if [ $ISSUES -eq 0 ]; then
    echo -e "${GREEN}🎉 セキュリティチェック完了: 問題は見つかりませんでした${NC}"
    echo -e "${GREEN}✅ GitHub公開準備OK${NC}"
    exit 0
else
    echo -e "${RED}❌ $ISSUES 個の問題が見つかりました${NC}"
    echo -e "${RED}🚫 これらの問題を修正してから公開してください${NC}"
    
    echo -e "\n🔧 修正手順:"
    echo "1. 機密ファイル・ディレクトリを削除"
    echo "2. .gitignore を更新"
    echo "3. Git履歴から機密データを除去"
    echo "4. 再度セキュリティチェックを実行"
    
    exit 1
fi