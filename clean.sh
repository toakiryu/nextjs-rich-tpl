#!/bin/bash

echo "Cleaning up unnecessary files..."

# プロジェクト全体を検索して .next と node_modules を削除
find . -type d \( -name ".next" -o -name "node_modules" \) -prune -exec rm -rf {} +

# ルートの package-lock.json も削除
rm -f package-lock.json

echo "Cleanup completed."