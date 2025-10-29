# 音声認識実装ガイド

## 🎯 目標システム

```
Siri → ターミナル起動 → 音声認識 → Yamatoチーム起動
```

### 想定フロー
1. **Siri**: "AIヤマト呼んで"
2. **ターミナル**: 自動起動
3. **音声認識**: yamatoチーム識別
4. **AIエージェント**: Yamatoチーム稼働開始

## 🛠️ 実装手順

### Phase 1: Siri → ターミナル起動

#### 1-1. Siriショートカット作成
```applescript
# Shortcuts.appで作成
トリガー: "AIヤマト呼んで" / "AIハヤテ起動" / "AIカレン呼び出し"
アクション: 
1. ターミナルを開く
2. コマンド実行: voice-miyabi --team yamato
```

#### 1-2. ターミナル自動化スクリプト
```bash
# ~/voice-agents/launch-agent.sh
#!/bin/bash

case "$1" in
    "yamato"|"ヤマト")
        echo "🎖️ Yamato team activating..."
        cd /path/to/ai-agents-miyabi
        npm run voice-agent -- --team yamato
        ;;
    "hayate"|"ハヤテ")
        echo "⚡ Hayate team activating..."
        cd /path/to/ai-agents-miyabi
        npm run voice-agent -- --team hayate
        ;;
    "karen"|"カレン")
        echo "💼 Karen team activating..."
        cd /path/to/ai-agents-miyabi
        npm run voice-agent -- --team karen
        ;;
    *)
        echo "🎤 Listening for voice command..."
        node voice-recognition.js
        ;;
esac
```

### Phase 2: 音声認識システム構築

#### 2-1. Node.js音声認識 (SpeechRecognition API)
```javascript
// voice-recognition.js
const speech = require('@google-cloud/speech');
const recorder = require('node-record-lpcm16');

class VoiceMiyabiRecognition {
  constructor() {
    this.client = new speech.SpeechClient();
    this.isListening = false;
    
    // エージェントキーワード定義
    this.agentKeywords = {
      'yamato': ['ヤマト', 'やまと', 'yamato', 'Yamato'],
      'hayate': ['ハヤテ', 'はやて', 'hayate', 'Hayate'],
      'karen': ['カレン', 'かれん', 'karen', 'Karen'],
      'mirai': ['ミライ', 'みらい', 'mirai', 'Mirai'],
      'hibiki': ['ヒビキ', 'ひびき', 'hibiki', 'Hibiki'],
      'kotone': ['コトネ', 'ことね', 'kotone', 'Kotone'],
      'nagomi': ['ナゴミ', 'なごみ', 'nagomi', 'Nagomi']
    };
  }

  startListening() {
    console.log('🎤 Voice recognition started. Say agent name...');
    this.isListening = true;

    const recording = recorder.record({
      sampleRateHertz: 16000,
      threshold: 0,
      verbose: false,
      recordProgram: 'rec', // or 'sox'
      silence: '1.0s'
    });

    const recognizeStream = this.client
      .streamingRecognize({
        config: {
          encoding: 'LINEAR16',
          sampleRateHertz: 16000,
          languageCode: 'ja-JP', // 日本語対応
          alternativeLanguageCodes: ['en-US'], // 英語も対応
        },
        interimResults: true
      });

    recording.stream()
      .on('error', console.error)
      .pipe(recognizeStream)
      .on('error', console.error)
      .on('data', (data) => {
        const transcript = data.results[0]?.alternatives[0]?.transcript;
        if (transcript) {
          console.log(`🎤 Heard: ${transcript}`);
          this.processVoiceCommand(transcript);
        }
      });
  }

  processVoiceCommand(transcript) {
    const command = transcript.toLowerCase();
    
    // エージェント識別
    for (const [agent, keywords] of Object.entries(this.agentKeywords)) {
      for (const keyword of keywords) {
        if (command.includes(keyword.toLowerCase())) {
          console.log(`✅ Agent identified: ${agent}`);
          this.launchAgent(agent, transcript);
          return;
        }
      }
    }

    // 特殊コマンド処理
    if (command.includes('緊急') || command.includes('urgent')) {
      console.log('🚨 Emergency detected - launching Yamato');
      this.launchAgent('yamato', transcript, true);
      return;
    }

    console.log('❓ Agent not recognized. Please try again.');
  }

  async launchAgent(agentName, originalCommand, isEmergency = false) {
    try {
      const { spawn } = require('child_process');
      
      console.log(`🚀 Launching ${agentName} team...`);
      
      // MCPサーバー経由でエージェント起動
      const agentProcess = spawn('npm', ['run', 'mcp-server'], {
        cwd: '/path/to/ai-agents-miyabi',
        stdio: 'inherit'
      });

      // エージェントチーム指定でタスク実行
      const taskCommand = isEmergency ? 
        `execute_agent_task --agents ${agentName} --priority critical --task "${originalCommand}"` :
        `execute_agent_task --agents ${agentName} --task "${originalCommand}"`;

      console.log(`💬 Command: ${taskCommand}`);
      
      // 音声フィードバック
      this.speakResponse(`${agentName}チームを起動しました`);

    } catch (error) {
      console.error('❌ Agent launch failed:', error);
      this.speakResponse('エージェントの起動に失敗しました');
    }
  }

  speakResponse(text) {
    const { exec } = require('child_process');
    // macOS標準のsayコマンドで音声出力
    exec(`say -v Kyoko "${text}"`, (error) => {
      if (error) console.error('Speech synthesis error:', error);
    });
  }
}

// 起動
const voiceSystem = new VoiceMiyabiRecognition();
voiceSystem.startListening();
```

#### 2-2. macOS音声認識 (Speech Framework)
```swift
// VoiceMiyabi.swift (Swift実装案)
import Speech
import AVFoundation

class VoiceMiyabiRecognizer {
    private let speechRecognizer = SFSpeechRecognizer(locale: Locale(identifier: "ja-JP"))
    private let audioEngine = AVAudioEngine()
    private var recognitionRequest: SFSpeechAudioBufferRecognitionRequest?
    private var recognitionTask: SFSpeechRecognitionTask?

    func startListening() {
        guard let speechRecognizer = speechRecognizer else { return }
        
        recognitionRequest = SFSpeechAudioBufferRecognitionRequest()
        guard let recognitionRequest = recognitionRequest else { return }
        
        recognitionRequest.shouldReportPartialResults = true
        
        recognitionTask = speechRecognizer.recognitionTask(with: recognitionRequest) { result, error in
            if let result = result {
                let transcript = result.bestTranscription.formattedString
                self.processVoiceCommand(transcript)
            }
        }
        
        let inputNode = audioEngine.inputNode
        let recordingFormat = inputNode.outputFormat(forBus: 0)
        
        inputNode.installTap(onBus: 0, bufferSize: 1024, format: recordingFormat) { buffer, _ in
            recognitionRequest.append(buffer)
        }
        
        audioEngine.prepare()
        try? audioEngine.start()
    }
    
    func processVoiceCommand(_ transcript: String) {
        // エージェント判定ロジック
        let command = transcript.lowercased()
        
        if command.contains("ヤマト") || command.contains("yamato") {
            launchAgent("yamato")
        } else if command.contains("ハヤテ") || command.contains("hayate") {
            launchAgent("hayate")
        }
        // ... 他のエージェント
    }
    
    func launchAgent(_ agentName: String) {
        let task = Process()
        task.launchPath = "/usr/bin/env"
        task.arguments = ["node", "launch-agent.js", agentName]
        task.launch()
        
        // 音声フィードバック
        speakResponse("\(agentName)チームを起動します")
    }
    
    func speakResponse(_ text: String) {
        let utterance = AVSpeechUtterance(string: text)
        utterance.voice = AVSpeechSynthesisVoice(language: "ja-JP")
        let synthesizer = AVSpeechSynthesizer()
        synthesizer.speak(utterance)
    }
}
```

### Phase 3: システム統合

#### 3-1. package.json設定
```json
{
  "scripts": {
    "voice-agent": "node voice-recognition.js",
    "voice-setup": "./scripts/voice-setup.sh"
  },
  "dependencies": {
    "@google-cloud/speech": "^6.0.0",
    "node-record-lpcm16": "^1.0.1",
    "say": "^0.16.0"
  }
}
```

#### 3-2. Siriショートカット詳細設定
```yaml
# Siri Shortcuts設定
ショートカット名: "AIヤマト"
フレーズ: 
  - "AIヤマト呼んで"
  - "ヤマトチーム起動"
  - "Yamato activate"

アクション:
1. スクリプト実行:
   - アプリ: ターミナル
   - スクリプト: ~/voice-agents/launch-agent.sh yamato

2. 音声フィードバック:
   - テキスト読み上げ: "Yamatoチームを起動します"
```

### Phase 4: 詳細実装

#### 4-1. 音声コマンド拡張
```javascript
// advanced-voice-commands.js
const commandPatterns = {
  // 基本起動
  launch: {
    patterns: ['起動', 'スタート', 'launch', 'start', 'activate'],
    action: 'launchAgent'
  },
  
  // 緊急モード
  emergency: {
    patterns: ['緊急', 'urgent', 'emergency', 'ヘルプ'],
    action: 'emergencyMode'
  },
  
  // タスク指定
  task: {
    patterns: ['タスク', 'task', '実行', 'execute'],
    action: 'executeTask'
  },
  
  // 停止
  stop: {
    patterns: ['停止', 'ストップ', 'stop', '終了'],
    action: 'stopAgent'
  }
};

// 使用例
"ヤマト緊急起動" → Yamato emergency mode
"ハヤテでデータ分析タスク" → Hayate team + data analysis task
"全エージェント停止" → Stop all agents
```

#### 4-2. 人間らしい音声フィードバックシステム

##### Option 1: 高品質TTS (Text-to-Speech)
```javascript
// voice-feedback.js
class VoiceFeedback {
  constructor() {
    // macOS高品質音声 (Neural Engine対応)
    this.voices = {
      yamato: 'Hattori',      // 男性・力強い・落ち着いた指揮官
      hayate: 'Kenji',        // 男性・速い・エネルギッシュ
      karen: 'Kyoko (Enhanced)', // 女性・丁寧・秘書らしい
      mirai: 'Siri (Female)', // 女性・未来的・テクノロジー感
      hibiki: 'Otoya (Premium)', // 男性・響く・音響専門
      kotone: 'Yuki',         // 女性・美しい・接客向け
      nagomi: 'Kyoko (Calm)'  // 女性・癒し・ゆっくり
    };

    // 感情パラメータ
    this.emotionSettings = {
      yamato: { rate: 0.9, pitch: 0.8, emphasis: 'strong' },
      hayate: { rate: 1.3, pitch: 1.0, emphasis: 'urgent' },
      karen: { rate: 1.0, pitch: 1.1, emphasis: 'polite' },
      mirai: { rate: 1.1, pitch: 1.2, emphasis: 'confident' },
      hibiki: { rate: 0.95, pitch: 0.9, emphasis: 'resonant' },
      kotone: { rate: 1.0, pitch: 1.3, emphasis: 'friendly' },
      nagomi: { rate: 0.8, pitch: 1.2, emphasis: 'gentle' }
    };
  }

  speak(agentName, message, emotion = 'normal') {
    const voice = this.voices[agentName] || 'Kyoko';
    const settings = this.emotionSettings[agentName] || {};
    
    // macOS say コマンド + 感情パラメータ
    const rate = settings.rate * 200; // WPM (Words Per Minute)
    const pitch = settings.pitch * 50; // Hz
    
    const { exec } = require('child_process');
    const command = `say -v "${voice}" -r ${rate} -p ${pitch} "${message}"`;
    
    exec(command, (error) => {
      if (error) console.error(`Voice synthesis error: ${error}`);
    });
  }
}
```

##### Option 2: AI音声クローン (ElevenLabs API)
```javascript
// ai-voice-clone.js
class AIVoiceClone {
  constructor() {
    this.elevenLabsAPI = 'your-api-key';
    
    // カスタム音声ID (事前に作成)
    this.customVoices = {
      yamato: 'voice-id-yamato-commander',    // 指揮官らしい男性声
      hayate: 'voice-id-hayate-energetic',   // エネルギッシュな男性声
      karen: 'voice-id-karen-secretary',     // 丁寧な女性秘書声
      mirai: 'voice-id-mirai-futuristic',    // 未来的な女性声
      hibiki: 'voice-id-hibiki-resonant',    // 響く男性声
      kotone: 'voice-id-kotone-service',     // 接客向け女性声
      nagomi: 'voice-id-nagomi-healing'      // 癒し系女性声
    };
  }

  async speakWithAI(agentName, message) {
    const voiceId = this.customVoices[agentName];
    
    try {
      const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
        method: 'POST',
        headers: {
          'Accept': 'audio/mpeg',
          'Content-Type': 'application/json',
          'xi-api-key': this.elevenLabsAPI
        },
        body: JSON.stringify({
          text: message,
          model_id: 'eleven_multilingual_v2', // 日本語対応
          voice_settings: {
            stability: 0.75,
            similarity_boost: 0.85,
            style: 0.5,
            use_speaker_boost: true
          }
        })
      });

      const audioBuffer = await response.arrayBuffer();
      
      // 音声ファイル保存・再生
      const fs = require('fs');
      const audioPath = `/tmp/voice-${agentName}-${Date.now()}.mp3`;
      fs.writeFileSync(audioPath, Buffer.from(audioBuffer));
      
      // macOSで再生
      const { exec } = require('child_process');
      exec(`afplay "${audioPath}"`, () => {
        // 再生後にファイル削除
        fs.unlinkSync(audioPath);
      });

    } catch (error) {
      console.error('AI Voice synthesis error:', error);
    }
  }
}
```

##### Option 3: VOICEVOX (無料・高品質)
```javascript
// voicevox-integration.js
class VOICEVOXIntegration {
  constructor() {
    this.voiceSettings = {
      yamato: { speaker: 13, speed: 1.0, pitch: 0.0, intonation: 1.0 }, // 青山龍星
      hayate: { speaker: 11, speed: 1.3, pitch: 0.1, intonation: 1.2 }, // 栗田まろん  
      karen: { speaker: 1, speed: 1.0, pitch: 0.05, intonation: 0.9 },  // 四国めたん
      mirai: { speaker: 20, speed: 1.1, pitch: 0.15, intonation: 1.1 }, // もち子
      hibiki: { speaker: 13, speed: 0.95, pitch: -0.05, intonation: 1.0 }, // 青山龍星
      kotone: { speaker: 1, speed: 1.0, pitch: 0.1, intonation: 0.95 },  // 四国めたん
      nagomi: { speaker: 1, speed: 0.8, pitch: 0.05, intonation: 0.85 }  // 四国めたん
    };
  }

  async speakVOICEVOX(agentName, message) {
    const settings = this.voiceSettings[agentName];
    
    try {
      // 音声クエリ生成
      const audioQuery = await fetch(
        `http://localhost:50021/audio_query?text=${encodeURIComponent(message)}&speaker=${settings.speaker}`,
        { method: 'POST' }
      ).then(r => r.json());

      // パラメータ調整
      audioQuery.speedScale = settings.speed;
      audioQuery.pitchScale = settings.pitch;
      audioQuery.intonationScale = settings.intonation;

      // 音声合成
      const audioResponse = await fetch(
        `http://localhost:50021/synthesis?speaker=${settings.speaker}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(audioQuery)
        }
      );

      const audioBuffer = await audioResponse.arrayBuffer();
      
      // 再生
      const audioPath = `/tmp/voice-${agentName}-${Date.now()}.wav`;
      require('fs').writeFileSync(audioPath, Buffer.from(audioBuffer));
      require('child_process').exec(`afplay "${audioPath}"`);

    } catch (error) {
      console.error('VOICEVOX synthesis error:', error);
    }
  }
}
```

## 🎤 推奨アプローチ

### 💰 **コスト重視**: VOICEVOX (無料)
- 高品質な日本語音声合成
- 多様なキャラクター音声
- ローカル実行で高速

### 🎯 **品質重視**: ElevenLabs AI
- 最高品質の人間らしい音声
- カスタム音声クローン
- 月額$5〜

### ⚡ **手軽さ重視**: macOS標準TTS
- 設定不要
- 即座利用可能
- パラメータ調整で個性付け

## 📥 VOICEVOX セットアップガイド

### 1. VOICEVOX本体インストール
```bash
# Homebrewでインストール
brew install --cask voicevox

# または公式サイトからダウンロード
# https://voicevox.hiroshiba.jp/
```

### 2. 音声モデル（エンジン）ダウンロード
VOICEVOXアプリを起動すると、以下の音声が利用可能：

#### 標準搭載音声
- **四国めたん** (Speaker ID: 1) - 可愛い女性声
- **ずんだもん** (Speaker ID: 3) - 中性的な声

#### 追加ダウンロード可能音声
```bash
# エージェント用推奨音声
yamato用: 青山龍星 (Speaker ID: 13) - 男性・力強い
hayate用: 栗田まろん (Speaker ID: 11) - エネルギッシュ
karen用: 四国めたん (Speaker ID: 1) - 丁寧・女性
mirai用: もち子さん (Speaker ID: 20) - 明るい女性
hibiki用: 青山龍星 (Speaker ID: 13) - 響く男性声
kotone用: 四国めたん (Speaker ID: 1) - 美しい女性声
nagomi用: 四国めたん (Speaker ID: 1) - 癒し系
```

### 3. 音声モデルダウンロード手順
1. **VOICEVOXアプリ起動**
2. **音声ライブラリ** タブを開く
3. **必要な音声をダウンロード**:
   - 青山龍星 (Yamato, Hibiki用)
   - 栗田まろん (Hayate用) 
   - もち子さん (Mirai用)
   - 四国めたん (Karen, Kotone, Nagomi用)

### 4. VOICEVOX ENGINE起動
```bash
# コマンドラインからENGINE起動
/Applications/VOICEVOX.app/Contents/MacOS/VOICEVOX --enable-mock

# またはアプリから「エンジン起動」
```

### 5. API接続確認
```bash
# エンジンが起動しているか確認
curl http://localhost:50021/speakers

# 音声合成テスト
curl -X POST "http://localhost:50021/audio_query?text=こんにちは&speaker=1" \
  -H "Content-Type: application/json" > query.json

curl -X POST "http://localhost:50021/synthesis?speaker=1" \
  -H "Content-Type: application/json" \
  -d @query.json > test.wav
```

## 🎵 エージェント別音声設定詳細

### Yamato (青山龍星)
```javascript
{
  speaker: 13,
  speed: 1.0,      // 落ち着いた速度
  pitch: 0.0,      // 標準ピッチ
  intonation: 1.0, // しっかりとしたイントネーション
  volume: 1.0      // 力強い音量
}
```

### Hayate (栗田まろん)
```javascript
{
  speaker: 11,
  speed: 1.3,      // 高速
  pitch: 0.1,      // 少し高め
  intonation: 1.2, // 活発なイントネーション
  volume: 1.1      // 元気な音量
}
```

### Karen (四国めたん)
```javascript
{
  speaker: 1,
  speed: 1.0,      // 丁寧な速度
  pitch: 0.05,     // 上品な高さ
  intonation: 0.9, // 控えめなイントネーション
  volume: 0.9      // 落ち着いた音量
}
```

## 🔧 自動セットアップスクリプト

```bash
#!/bin/bash
# voicevox-setup.sh

echo "🎤 VOICEVOX セットアップ開始"

# 1. VOICEVOX インストール確認
if ! command -v /Applications/VOICEVOX.app/Contents/MacOS/VOICEVOX &> /dev/null; then
    echo "📥 VOICEVOX をインストール中..."
    brew install --cask voicevox
fi

# 2. ENGINE 起動
echo "🚀 VOICEVOX ENGINE 起動中..."
/Applications/VOICEVOX.app/Contents/MacOS/VOICEVOX --mode=engineOnly &

# 3. ENGINE 起動待機
sleep 5

# 4. 接続テスト
echo "🔍 ENGINE 接続確認中..."
if curl -s http://localhost:50021/speakers > /dev/null; then
    echo "✅ VOICEVOX ENGINE 起動成功"
    
    # 5. 利用可能な音声一覧表示
    echo "🎵 利用可能な音声:"
    curl -s http://localhost:50021/speakers | jq '.[] | {name: .name, speaker_uuid: .speaker_uuid}'
    
else
    echo "❌ VOICEVOX ENGINE 起動失敗"
    exit 1
fi

echo "🎉 VOICEVOX セットアップ完了"
```

## 📋 package.json 設定追加

```json
{
  "scripts": {
    "voicevox-setup": "./scripts/voicevox-setup.sh",
    "voicevox-start": "/Applications/VOICEVOX.app/Contents/MacOS/VOICEVOX --mode=engineOnly",
    "voice-test": "node test-voicevox.js"
  },
  "dependencies": {
    "node-fetch": "^3.3.0"
  }
}
```

## 🧪 テストスクリプト

```javascript
// test-voicevox.js
const fetch = require('node-fetch');
const fs = require('fs');

async function testVOICEVOX() {
  try {
    // 1. 利用可能音声確認
    const speakers = await fetch('http://localhost:50021/speakers').then(r => r.json());
    console.log('Available speakers:', speakers.length);

    // 2. Yamatoテスト (青山龍星)
    const testMessage = "Yamato、全権限モードで待機しております";
    
    const audioQuery = await fetch(
      `http://localhost:50021/audio_query?text=${encodeURIComponent(testMessage)}&speaker=13`,
      { method: 'POST' }
    ).then(r => r.json());

    const audioResponse = await fetch(
      'http://localhost:50021/synthesis?speaker=13',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(audioQuery)
      }
    );

    const audioBuffer = await audioResponse.arrayBuffer();
    fs.writeFileSync('./test-yamato.wav', Buffer.from(audioBuffer));
    
    console.log('✅ 音声ファイル生成成功: test-yamato.wav');
    
    // 3. 再生
    require('child_process').exec('afplay test-yamato.wav');

  } catch (error) {
    console.error('❌ テスト失敗:', error);
  }
}

testVOICEVOX();
```

  speak(agentName, message) {
    const voice = this.voices[agentName] || 'Kyoko';
    const { exec } = require('child_process');
    
    exec(`say -v ${voice} "${message}"`, (error) => {
      if (error) console.error(`Voice synthesis error: ${error}`);
    });
  }

  announceAgentLaunch(agentName) {
    const messages = {
      yamato: 'Yamato、全権限で待機中です',
      hayate: 'Hayate、高速処理モードで準備完了',
      karen: 'Karen、お手伝いいたします',
      mirai: 'Mirai、未来の開発を始めます',
      hibiki: 'Hibiki、音声処理システム起動',
      kotone: 'Kotone、サービスカウンター開設',
      nagomi: 'Nagomi、心穏やかにサポートします'
    };

    this.speak(agentName, messages[agentName] || `${agentName}チーム起動しました`);
  }
}
```

### Phase 5: デバッグ・テスト

#### 5-1. テストコマンド
```bash
# 音声認識テスト
npm run voice-agent -- --test

# 個別エージェントテスト
./launch-agent.sh yamato "システム状態確認"
./launch-agent.sh hayate "緊急データ処理"

# Siriショートカットテスト
# iPhone/Macで「AIヤマト呼んで」と発話
```

#### 5-2. ログ・デバッグ
```javascript
// debug-voice.js
const fs = require('fs');

class VoiceDebugger {
  logVoiceCommand(timestamp, transcript, recognizedAgent, action) {
    const logEntry = {
      timestamp,
      transcript,
      recognizedAgent,
      action,
      success: !!recognizedAgent
    };

    fs.appendFileSync('./logs/voice-commands.log', 
      JSON.stringify(logEntry) + '\n'
    );
  }

  analyzeRecognitionAccuracy() {
    // 音声認識精度の分析
    const logs = fs.readFileSync('./logs/voice-commands.log', 'utf8');
    const entries = logs.split('\n').filter(Boolean).map(JSON.parse);
    
    const accuracy = entries.filter(e => e.success).length / entries.length;
    console.log(`音声認識精度: ${(accuracy * 100).toFixed(2)}%`);
  }
}
```

## 🎤 使用フロー例

### 基本使用
```
👤 "Hey Siri, AIヤマト呼んで"
📱 Siri: "実行しています"
💻 ターミナル: 自動起動
🎖️ Yamato: "Yamato、全権限で待機中です"
👤 "データ分析をお願いします"
🎖️ Yamato: "データ分析チームに指示します"
```

### 緊急時
```
👤 "Hey Siri, 緊急でハヤテ起動"
⚡ Hayate: "緊急モードで起動しました。どのような処理が必要ですか？"
👤 "セキュリティ侵害の調査"
⚡ Hayate: "セキュリティチームを展開、調査を開始します"
```

## 📋 必要な準備

### 環境設定
1. **Node.js** (v18+)
2. **Google Cloud Speech API** アカウント
3. **Xcode** (Swift実装の場合)
4. **FFmpeg** (音声処理)

### パッケージインストール
```bash
# 音声認識関連
npm install @google-cloud/speech node-record-lpcm16 say

# 開発ツール
brew install ffmpeg sox
```

### 権限設定
```bash
# マイクアクセス許可 (macOS)
# システム環境設定 → セキュリティとプライバシー → マイク
# ターミナル、Node.js への許可

# Siriショートカット
# ショートカット.app → プライバシー設定
```

## 🚀 実装優先順位

1. **Phase 1**: Siriショートカット + 基本ターミナル起動
2. **Phase 2**: Node.js音声認識システム
3. **Phase 3**: MCPサーバー統合
4. **Phase 4**: 音声フィードバック
5. **Phase 5**: 詳細コマンド・デバッグ

---

**作成日**: 2024-10-29
**更新日**: -
**ステータス**: 実装ガイド完成