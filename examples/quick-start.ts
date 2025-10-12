/**
 * クイックスタート - 最もシンプルな使い方
 */

import { AgentOrchestrator } from '../src/core/AgentOrchestrator.js';
import { AIWriterAgent } from '../src/agents/creative/AIWriterAgent.js';

async function main() {
  console.log('🌸 AIエージェントを使ってみよう！\n');

  // 1. オーケストレーターを作成
  const orchestrator = new AgentOrchestrator({
    enableLogging: false, // ログを簡潔に
  });

  // 2. 使いたいエージェントを登録
  console.log('✓ AI Writerエージェントを登録');
  orchestrator.registerAgent(new AIWriterAgent());

  // 3. 初期化
  console.log('✓ エージェントを初期化中...');
  await orchestrator.initializeAll();

  // 4. タスクを実行
  console.log('✓ ブログ記事を生成中...\n');
  const result = await orchestrator.executeTask('AI Writer', {
    type: 'blog',
    priority: 'high',
    input: {
      contentType: 'blog',
      topic: 'AIエージェントの使い方',
      tone: 'friendly',
      length: 'short',
    },
  });

  // 5. 結果を表示
  if (result.success) {
    console.log('✅ 成功！生成された記事:\n');
    console.log('─'.repeat(60));
    console.log(result.data.content);
    console.log('─'.repeat(60));
    console.log(`\n📊 メタデータ:`);
    console.log(`   文字数: ${result.data.metadata.wordCount}`);
    console.log(`   トーン: ${result.data.metadata.tone}`);
  } else {
    console.log('❌ エラー:', result.error);
  }

  // 6. クリーンアップ
  await orchestrator.shutdownAll();
  console.log('\n✓ 完了！');
}

main().catch(console.error);
