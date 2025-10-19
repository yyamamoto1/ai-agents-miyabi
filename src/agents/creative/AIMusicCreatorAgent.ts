/**
 * AI Music Creator Agent
 *
 * 音楽・BGM制作の専門家エージェント
 * BGM、効果音、ジングル等の音楽コンテンツ制作を実行
 *
 * @capabilities
 * - 音楽作曲
 * - BGM作成
 * - 効果音生成
 * - オーディオミキシング
 * - ムードマッチング
 * - ジャンル作成
 * - オーディオ分析
 *
 * @taskTypes
 * - music-composition: 音楽作曲
 * - bgm-creation: BGM作成
 * - sound-effects: 効果音生成
 * - audio-mixing: オーディオミキシング
 * - mood-matching: ムードマッチング
 * - genre-creation: ジャンル作成
 * - audio-analysis: オーディオ分析
 */

import { BaseAgent, AgentTask } from '../../core/BaseAgent.js';
import { AGENT_CONFIGS } from '../../config/agents.config.js';

/**
 * 音楽ジャンルの定義
 */
type MusicGenre =
  | 'pop'
  | 'rock'
  | 'jazz'
  | 'classical'
  | 'electronic'
  | 'hip-hop'
  | 'ambient'
  | 'cinematic'
  | 'corporate'
  | 'upbeat'
  | 'lo-fi'
  | 'orchestral'
  | 'acoustic'
  | 'folk'
  | 'world'
  | 'experimental';

/**
 * ムード・雰囲気の定義
 */
type Mood =
  | 'happy'
  | 'sad'
  | 'energetic'
  | 'calm'
  | 'mysterious'
  | 'dramatic'
  | 'romantic'
  | 'epic'
  | 'playful'
  | 'dark'
  | 'uplifting'
  | 'melancholic'
  | 'tense'
  | 'peaceful'
  | 'aggressive';

/**
 * 楽器カテゴリの定義
 */
type InstrumentCategory =
  | 'strings'
  | 'brass'
  | 'woodwinds'
  | 'percussion'
  | 'keyboards'
  | 'synthesizers'
  | 'guitars'
  | 'bass'
  | 'vocals'
  | 'ethnic'
  | 'electronic';

/**
 * 音楽作曲タスクの入力
 */
interface MusicCompositionInput {
  title?: string;                    // 曲のタイトル
  genre: MusicGenre;                 // ジャンル
  mood: Mood;                        // ムード
  duration: number;                  // 長さ（秒）
  tempo?: number;                    // BPM（テンポ）
  key?: string;                      // 調（例: C major, A minor）
  timeSignature?: string;            // 拍子（例: 4/4, 3/4）
  instruments?: InstrumentCategory[]; // 使用楽器
  structure?: 'verse-chorus' | 'aba' | 'through-composed' | 'free-form';
  referenceTrack?: string;           // 参考曲
  targetUse?: string;                // 使用目的（動画BGM、ゲーム、広告等）
  emotionalArc?: 'ascending' | 'descending' | 'stable' | 'dynamic';
  complexity?: 'simple' | 'moderate' | 'complex';
}

/**
 * 音楽作曲の出力
 */
interface MusicCompositionOutput {
  metadata: {
    title: string;
    genre: MusicGenre;
    mood: Mood;
    duration: number;
    tempo: number;
    key: string;
    timeSignature: string;
    composer: string;
    createdAt: string;
  };
  structure: {
    sections: Array<{
      name: string;                  // イントロ、Aメロ、サビ等
      startTime: number;             // 開始時間（秒）
      duration: number;              // 長さ（秒）
      description: string;           // セクションの説明
      energy: number;                // エネルギーレベル (0-100)
      instruments: InstrumentCategory[];
    }>;
    totalDuration: number;
  };
  arrangement: {
    layers: Array<{
      instrument: string;
      role: 'melody' | 'harmony' | 'rhythm' | 'bass' | 'texture';
      pattern: string;
      velocity: number;              // 音量 (0-127)
      panning: number;               // パン (-100 to 100)
      effects: string[];
    }>;
  };
  musicalElements: {
    melody: {
      range: string;                 // 音域（例: C4-C6）
      motifs: string[];              // モチーフ
      contour: string;               // メロディーの形状
    };
    harmony: {
      chordProgression: string[];    // コード進行
      harmonyType: string;           // ハーモニーのタイプ
      complexity: string;
    };
    rhythm: {
      pattern: string;
      groove: string;
      syncopation: boolean;
    };
  };
  production: {
    mixingNotes: string[];
    masteringGuidelines: string[];
    effectsChain: Array<{
      track: string;
      effects: string[];
    }>;
  };
  exportOptions: {
    formats: string[];
    sampleRate: number;
    bitDepth: number;
    stems?: boolean;                 // ステムファイルの書き出し
  };
  licenseInfo: {
    type: 'royalty-free' | 'commercial' | 'attribution';
    restrictions: string[];
    attribution: string;
  };
}

/**
 * BGM作成タスクの入力
 */
interface BGMCreationInput {
  purpose: 'video' | 'game' | 'podcast' | 'presentation' | 'website' | 'app';
  mood: Mood;
  duration: number;                  // 秒数
  loopable?: boolean;                // ループ可能にするか
  fadeInOut?: boolean;               // フェードイン・アウト
  energyLevel?: 'low' | 'medium' | 'high';
  layering?: 'minimal' | 'moderate' | 'rich';
  genre?: MusicGenre;
  avoidInstruments?: InstrumentCategory[];
  targetAudience?: string;
  brandGuidelines?: {
    tone: string;
    values: string[];
    avoidElements: string[];
  };
  technicalRequirements?: {
    maxFileSize?: number;            // MB
    format?: string;                 // MP3, WAV, etc.
    sampleRate?: number;             // Hz
  };
}

/**
 * BGM作成の出力
 */
interface BGMCreationOutput {
  title: string;
  description: string;
  musicalCharacteristics: {
    genre: MusicGenre;
    mood: Mood;
    tempo: number;
    key: string;
    energyLevel: string;
  };
  composition: {
    structure: string;
    mainTheme: string;
    instrumentation: string[];
    textureDescription: string;
  };
  technicalSpecs: {
    duration: number;
    isLoopable: boolean;
    fadeIn: number;                  // 秒数
    fadeOut: number;                 // 秒数
    format: string;
    sampleRate: number;
    bitRate: string;
    fileSize: number;                // MB
  };
  timeline: Array<{
    timestamp: number;
    event: string;
    description: string;
  }>;
  usageRecommendations: {
    bestFor: string[];
    pairsWith: string[];
    voiceoverCompatibility: string;
    transitionPoints: number[];
  };
  variations: Array<{
    name: string;
    description: string;
    duration: number;
    modifications: string[];
  }>;
  deliverables: {
    mainTrack: string;
    stems?: string[];
    loops?: string[];
    altVersions?: string[];
  };
}

/**
 * 効果音生成タスクの入力
 */
interface SoundEffectsInput {
  category: 'ui' | 'game' | 'film' | 'transition' | 'ambient' | 'foley';
  effectType: string;                // 例: button-click, explosion, whoosh
  context?: string;                  // 使用コンテキスト
  duration: number;                  // ミリ秒
  style?: 'realistic' | 'stylized' | 'retro' | 'futuristic' | '8-bit';
  intensity?: 'subtle' | 'moderate' | 'impactful';
  count?: number;                    // 生成する効果音の数
  variations?: boolean;              // バリエーションを生成
  layering?: {
    baseSound: string;
    additionalLayers: string[];
  };
}

/**
 * 効果音生成の出力
 */
interface SoundEffectsOutput {
  effects: Array<{
    id: string;
    name: string;
    description: string;
    category: string;
    effectType: string;
    specs: {
      duration: number;              // ミリ秒
      frequency: string;             // Hz範囲
      waveform: string;
      envelope: {
        attack: number;
        decay: number;
        sustain: number;
        release: number;
      };
    };
    composition: {
      layers: Array<{
        sound: string;
        processing: string[];
        level: number;
      }>;
    };
    processing: {
      effects: string[];
      eq: string;
      compression: string;
      normalization: string;
    };
    format: {
      fileType: string;
      sampleRate: number;
      bitDepth: number;
      channels: 'mono' | 'stereo';
    };
    usageTips: string[];
  }>;
  collections: Array<{
    name: string;
    effectIds: string[];
    theme: string;
    description: string;
  }>;
  metadata: {
    totalEffects: number;
    categories: string[];
    averageDuration: number;
    fileSize: number;                // 合計MB
  };
}

/**
 * オーディオミキシングタスクの入力
 */
interface AudioMixingInput {
  tracks: Array<{
    id: string;
    name: string;
    type: 'vocal' | 'instrument' | 'drum' | 'bass' | 'fx';
    filePath?: string;
    description?: string;
  }>;
  genre: MusicGenre;
  targetLoudness?: number;           // LUFS
  stereoWidth?: 'narrow' | 'medium' | 'wide';
  mixStyle?: 'clean' | 'warm' | 'aggressive' | 'lo-fi' | 'vintage';
  referenceTrack?: string;
  deliverables?: {
    stereoMix: boolean;
    stems: boolean;
    instrumental: boolean;
    acapella: boolean;
  };
}

/**
 * オーディオミキシングの出力
 */
interface AudioMixingOutput {
  mixConfiguration: {
    masterSettings: {
      targetLoudness: number;        // LUFS
      peakLevel: number;             // dBFS
      dynamicRange: number;          // dB
      stereoWidth: string;
    };
    trackSettings: Array<{
      trackId: string;
      trackName: string;
      processing: {
        gain: number;                // dB
        pan: number;                 // -100 to 100
        eq: {
          lowCut: number;            // Hz
          lowShelf?: { freq: number; gain: number };
          midBell?: { freq: number; gain: number; q: number };
          highShelf?: { freq: number; gain: number };
          highCut: number;           // Hz
        };
        compression: {
          threshold: number;         // dB
          ratio: number;
          attack: number;            // ms
          release: number;           // ms
          makeupGain: number;        // dB
        };
        reverb?: {
          type: string;
          wetDry: number;            // %
          decay: number;             // seconds
          predelay: number;          // ms
        };
        delay?: {
          time: number;              // ms
          feedback: number;          // %
          wetDry: number;            // %
        };
        saturation?: number;         // %
        otherEffects: string[];
      };
      routing: {
        send1?: { bus: string; level: number };
        send2?: { bus: string; level: number };
      };
    }>;
    auxBuses: Array<{
      name: string;
      type: 'reverb' | 'delay' | 'parallel-compression' | 'effects';
      processing: string[];
    }>;
  };
  balanceRecommendations: {
    frequencyBalance: string;
    stereoImage: string;
    dynamics: string;
    depth: string;
  };
  automationSuggestions: Array<{
    track: string;
    parameter: string;
    timeline: Array<{
      time: number;
      value: number;
      description: string;
    }>;
  }>;
  qualityChecks: {
    phaseIssues: boolean;
    clipping: boolean;
    frequencyMasking: string[];
    dynamicRange: string;
    stereoCompatibility: string;
  };
  deliverables: {
    formats: string[];
    stems: string[];
    alternativeVersions: string[];
  };
}

/**
 * ムードマッチングタスクの入力
 */
interface MoodMatchingInput {
  targetMood: Mood;
  context: string;                   // 動画、ゲームシーン等
  duration: number;
  sceneDescription?: string;
  emotionalProgression?: Array<{
    timestamp: number;
    mood: Mood;
    intensity: number;               // 0-100
  }>;
  visualElements?: string[];
  narrativeTone?: string;
  existingMusic?: string;            // 参考曲
  constraints?: {
    avoidGenres?: MusicGenre[];
    mustIncludeInstruments?: InstrumentCategory[];
    tempoRange?: { min: number; max: number };
  };
}

/**
 * ムードマッチングの出力
 */
interface MoodMatchingOutput {
  analysis: {
    targetMood: Mood;
    moodDimensions: {
      valence: number;               // ポジティブ/ネガティブ (-100 to 100)
      arousal: number;               // 覚醒度 (0-100)
      dominance: number;             // 支配性 (0-100)
    };
    emotionalKeywords: string[];
    colorAssociations: string[];
    sensoryDescriptors: string[];
  };
  musicRecommendations: Array<{
    rank: number;
    matchScore: number;              // 0-100
    musicProfile: {
      genre: MusicGenre;
      tempo: number;
      key: string;
      mode: 'major' | 'minor' | 'modal';
      instrumentation: InstrumentCategory[];
      texture: string;
    };
    characteristics: {
      energy: number;                // 0-100
      valence: number;               // 0-100
      danceability: number;          // 0-100
      acousticness: number;          // 0-100
      instrumentalness: number;      // 0-100
    };
    reasoning: string;
    sampleDescription: string;
    usageNotes: string[];
  }>;
  compositionGuidelines: {
    melodicDirection: string;
    harmonicComplexity: string;
    rhythmicDensity: string;
    dynamicRange: string;
    instrumentalPriorities: string[];
    textureRecommendations: string[];
  };
  dynamicMapping: Array<{
    timestamp: number;
    targetMood: Mood;
    musicalAdjustments: {
      tempo?: number;
      key?: string;
      instrumentation?: string[];
      dynamics?: string;
      density?: string;
    };
    transitionType: 'smooth' | 'abrupt' | 'gradual';
  }>;
  referenceExamples: Array<{
    title: string;
    artist: string;
    relevance: string;
    keyFeatures: string[];
  }>;
}

/**
 * ジャンル作成タスクの入力
 */
interface GenreCreationInput {
  baseGenre: MusicGenre;
  fusionGenres?: MusicGenre[];
  uniqueElements?: string[];
  culturalInfluences?: string[];
  timePeriod?: string;               // 例: 1980s, contemporary, futuristic
  targetAudience?: string;
  innovationLevel?: 'traditional' | 'fusion' | 'experimental';
  instrumentalPreference?: InstrumentCategory[];
  avoidClichés?: boolean;
}

/**
 * ジャンル作成の出力
 */
interface GenreCreationOutput {
  genreDefinition: {
    name: string;
    description: string;
    origin: string;
    influences: string[];
    keyCharacteristics: string[];
    subgenres?: string[];
  };
  musicalElements: {
    rhythm: {
      typicalBPM: { min: number; max: number };
      timeSignatures: string[];
      rhythmicPatterns: string[];
      groove: string;
    };
    melody: {
      scalePreferences: string[];
      melodicMotifs: string[];
      intervalPatterns: string[];
      ornamentation: string[];
    };
    harmony: {
      chordVocabulary: string[];
      progressionStyles: string[];
      modalityPreference: string;
      dissonanceTolerance: string;
    };
    instrumentation: {
      coreInstruments: string[];
      supportingInstruments: string[];
      unusualInstruments?: string[];
      synthesizers?: string[];
    };
    production: {
      mixingStyle: string;
      commonEffects: string[];
      spatialCharacter: string;
      dynamicProfile: string;
    };
  };
  culturalContext: {
    geographicOrigins: string[];
    historicalContext: string;
    socialContext: string;
    visualAesthetics: string[];
    fashionAssociations: string[];
  };
  compositionGuide: {
    songStructures: string[];
    typicalDuration: { min: number; max: number };
    introStyles: string[];
    transitionTechniques: string[];
    endingStyles: string[];
  };
  examples: Array<{
    type: 'theoretical' | 'similar-existing';
    description: string;
    musicalFeatures: string[];
    context: string;
  }>;
  marketAnalysis: {
    targetDemographics: string[];
    useCases: string[];
    potentialReach: string;
    competitiveGenres: string[];
  };
}

/**
 * オーディオ分析タスクの入力
 */
interface AudioAnalysisInput {
  audioFile?: string;                // ファイルパス
  analysisType: 'full' | 'technical' | 'musical' | 'perceptual' | 'commercial';
  referenceTrack?: string;           // 比較対象
  targetUse?: string;                // 分析目的
  metricsRequired?: string[];        // 必要な指標
}

/**
 * オーディオ分析の出力
 */
interface AudioAnalysisOutput {
  metadata: {
    fileName: string;
    format: string;
    duration: number;
    sampleRate: number;
    bitDepth: number;
    channels: number;
    fileSize: number;                // MB
    codec: string;
  };
  technicalAnalysis: {
    loudness: {
      integrated: number;            // LUFS
      range: number;                 // LU
      peak: number;                  // dBTP
      truePeak: number;              // dBTP
    };
    dynamics: {
      crestFactor: number;           // dB
      dynamicRange: number;          // dB
      rmsLevel: number;              // dB
      compression: string;
    };
    frequency: {
      lowEnd: { range: string; level: number };
      midRange: { range: string; level: number };
      highEnd: { range: string; level: number };
      fundamentalFrequency: number;  // Hz
      spectralCentroid: number;      // Hz
      spectralRolloff: number;       // Hz
    };
    stereo: {
      width: number;                 // %
      correlation: number;           // -1 to 1
      balance: number;               // -100 to 100
      monoCompatibility: string;
    };
    tempo: {
      bpm: number;
      confidence: number;            // %
      stability: string;
      timeSignature: string;
    };
  };
  musicalAnalysis: {
    key: {
      tonic: string;
      mode: 'major' | 'minor' | 'modal';
      confidence: number;            // %
      keyChanges?: Array<{
        timestamp: number;
        key: string;
      }>;
    };
    structure: {
      sections: Array<{
        name: string;
        start: number;
        end: number;
        duration: number;
      }>;
      repetitionPattern: string;
      formType: string;
    };
    melody: {
      range: { low: string; high: string };
      contour: string;
      complexity: string;
      motifs: number;
    };
    harmony: {
      chordProgression: string[];
      harmonicComplexity: string;
      dissonanceLevel: string;
      modulations: number;
    };
    rhythm: {
      pattern: string;
      syncopation: string;
      polyrhythm: boolean;
      grooveIntensity: number;       // 0-100
    };
  };
  perceptualAnalysis: {
    mood: Mood;
    energy: number;                  // 0-100
    valence: number;                 // 0-100 (positive/negative)
    danceability: number;            // 0-100
    acousticness: number;            // 0-100
    instrumentalness: number;        // 0-100
    liveness: number;                // 0-100
    speechiness: number;             // 0-100
    emotionalProfile: {
      primary: string;
      secondary: string[];
      intensity: number;             // 0-100
    };
  };
  genreClassification: {
    primary: MusicGenre;
    secondary: MusicGenre[];
    confidence: number;              // %
    stylisticElements: string[];
  };
  production: {
    mixQuality: {
      balance: string;
      clarity: string;
      depth: string;
      width: string;
      overallScore: number;          // 0-100
    };
    mastering: {
      loudnessCompliance: string;
      dynamicRangeScore: number;
      frequencyBalanceScore: number;
      stereoImageScore: number;
      overallScore: number;          // 0-100
    };
    issues: Array<{
      severity: 'critical' | 'warning' | 'info';
      category: string;
      description: string;
      timestamp?: number;
      recommendation: string;
    }>;
  };
  commercialAnalysis: {
    broadcastCompliance: {
      ebuR128: boolean;
      atscA85: boolean;
      other: string[];
    };
    platformReadiness: {
      spotify: { compliant: boolean; notes: string[] };
      youtube: { compliant: boolean; notes: string[] };
      radio: { compliant: boolean; notes: string[] };
      film: { compliant: boolean; notes: string[] };
    };
    qualityScore: number;            // 0-100
    marketability: {
      trendinessScore: number;
      uniquenessScore: number;
      commercialAppeal: string;
      targetAudience: string[];
    };
  };
  recommendations: Array<{
    category: string;
    priority: 'high' | 'medium' | 'low';
    suggestion: string;
    expectedImprovement: string;
  }>;
  comparison?: {
    referenceTrack: string;
    similarities: string[];
    differences: string[];
    matchScore: number;              // 0-100
    recommendations: string[];
  };
}

/**
 * AI Music Creator Agent クラス
 */
export class AIMusicCreatorAgent extends BaseAgent {
  constructor() {
    const config = AGENT_CONFIGS.MUSIC_CREATOR;
    super({
      name: config.name,
      role: config.role,
      category: config.category,
      description: config.description,
      capabilities: config.capabilities,
    });
  }

  /**
   * エージェントのセットアップ
   */
  protected async setup(): Promise<void> {
    this.log('AI Music Creator Agent をセットアップしています...');
    // 必要な初期化処理をここに追加
    this.log('セットアップ完了');
  }

  /**
   * タスクの処理
   */
  protected async process(task: AgentTask): Promise<any> {
    this.log(`タスクを処理中: ${task.type}`);

    switch (task.type) {
      case 'music-composition':
        return this.composeMusic(task.input as MusicCompositionInput);

      case 'bgm-creation':
        return this.createBGM(task.input as BGMCreationInput);

      case 'sound-effects':
        return this.generateSoundEffects(task.input as SoundEffectsInput);

      case 'audio-mixing':
        return this.mixAudio(task.input as AudioMixingInput);

      case 'mood-matching':
        return this.matchMood(task.input as MoodMatchingInput);

      case 'genre-creation':
        return this.createGenre(task.input as GenreCreationInput);

      case 'audio-analysis':
        return this.analyzeAudio(task.input as AudioAnalysisInput);

      default:
        throw new Error(`サポートされていないタスクタイプ: ${task.type}`);
    }
  }

  /**
   * クリーンアップ処理
   */
  protected async cleanup(): Promise<void> {
    this.log('AI Music Creator Agent をクリーンアップしています...');
    // 必要なクリーンアップ処理をここに追加
    this.log('クリーンアップ完了');
  }

  /**
   * 音楽作曲
   */
  private async composeMusic(input: MusicCompositionInput): Promise<MusicCompositionOutput> {
    this.log(`音楽を作曲中: ${input.title || input.genre}`);

    // メタデータの生成
    const metadata = await this.generateMetadata(input);

    // 楽曲構成の作成
    const structure = await this.createMusicStructure(input);

    // アレンジメントの作成
    const arrangement = await this.createArrangement(input, structure);

    // 音楽要素の生成
    const musicalElements = await this.generateMusicalElements(input);

    // プロダクション情報の生成
    const production = await this.generateProductionInfo(input);

    // エクスポートオプションの設定
    const exportOptions = await this.setExportOptions(input);

    // ライセンス情報の生成
    const licenseInfo = await this.generateLicenseInfo();

    const output: MusicCompositionOutput = {
      metadata,
      structure,
      arrangement,
      musicalElements,
      production,
      exportOptions,
      licenseInfo,
    };

    this.log(`作曲完了: ${metadata.title} (${metadata.duration}秒)`);
    return output;
  }

  /**
   * メタデータ生成
   */
  private async generateMetadata(input: MusicCompositionInput): Promise<MusicCompositionOutput['metadata']> {
    const tempo = input.tempo || this.determineTempoForGenre(input.genre);
    const key = input.key || this.selectKeyForMood(input.mood);

    return {
      title: input.title || this.generateTitle(input.genre, input.mood),
      genre: input.genre,
      mood: input.mood,
      duration: input.duration,
      tempo,
      key,
      timeSignature: input.timeSignature || '4/4',
      composer: 'AI Music Creator',
      createdAt: new Date().toISOString(),
    };
  }

  /**
   * ジャンルに応じたテンポ決定
   */
  private determineTempoForGenre(genre: MusicGenre): number {
    const tempoRanges: Record<MusicGenre, { min: number; max: number }> = {
      pop: { min: 100, max: 130 },
      rock: { min: 110, max: 140 },
      jazz: { min: 80, max: 180 },
      classical: { min: 60, max: 120 },
      electronic: { min: 120, max: 140 },
      'hip-hop': { min: 80, max: 110 },
      ambient: { min: 60, max: 90 },
      cinematic: { min: 70, max: 100 },
      corporate: { min: 100, max: 120 },
      upbeat: { min: 120, max: 140 },
      'lo-fi': { min: 70, max: 90 },
      orchestral: { min: 60, max: 120 },
      acoustic: { min: 80, max: 110 },
      folk: { min: 90, max: 120 },
      world: { min: 90, max: 130 },
      experimental: { min: 60, max: 180 },
    };

    const range = tempoRanges[genre];
    return Math.floor((range.min + range.max) / 2);
  }

  /**
   * ムードに応じた調の選択
   */
  private selectKeyForMood(mood: Mood): string {
    const keyMappings: Record<Mood, string[]> = {
      happy: ['C major', 'G major', 'D major', 'A major'],
      sad: ['A minor', 'D minor', 'E minor', 'B minor'],
      energetic: ['E major', 'B major', 'F# major'],
      calm: ['F major', 'Bb major', 'Eb major'],
      mysterious: ['F# minor', 'C# minor', 'G# minor'],
      dramatic: ['C minor', 'G minor', 'F minor'],
      romantic: ['Eb major', 'Ab major', 'Db major'],
      epic: ['C major', 'D major', 'Bb major'],
      playful: ['G major', 'D major', 'A major'],
      dark: ['E minor', 'B minor', 'F# minor'],
      uplifting: ['C major', 'G major', 'F major'],
      melancholic: ['D minor', 'A minor', 'C minor'],
      tense: ['C# minor', 'G# minor', 'Eb minor'],
      peaceful: ['F major', 'Bb major', 'C major'],
      aggressive: ['E minor', 'B minor', 'D minor'],
    };

    const keys = keyMappings[mood];
    return keys[Math.floor(Math.random() * keys.length)];
  }

  /**
   * タイトル生成
   */
  private generateTitle(genre: MusicGenre, mood: Mood): string {
    const adjectives = {
      happy: 'Joyful',
      sad: 'Melancholic',
      energetic: 'Dynamic',
      calm: 'Serene',
      mysterious: 'Enigmatic',
      dramatic: 'Intense',
      romantic: 'Tender',
      epic: 'Majestic',
      playful: 'Whimsical',
      dark: 'Shadowed',
      uplifting: 'Inspiring',
      melancholic: 'Wistful',
      tense: 'Suspenseful',
      peaceful: 'Tranquil',
      aggressive: 'Fierce',
    };

    const nouns = {
      pop: 'Anthem',
      rock: 'Groove',
      jazz: 'Improvisation',
      classical: 'Movement',
      electronic: 'Pulse',
      'hip-hop': 'Beat',
      ambient: 'Atmosphere',
      cinematic: 'Score',
      corporate: 'Theme',
      upbeat: 'Rhythm',
      'lo-fi': 'Dreams',
      orchestral: 'Symphony',
      acoustic: 'Melody',
      folk: 'Ballad',
      world: 'Journey',
      experimental: 'Soundscape',
    };

    return `${adjectives[mood]} ${nouns[genre]}`;
  }

  /**
   * 楽曲構成の作成
   */
  private async createMusicStructure(input: MusicCompositionInput): Promise<MusicCompositionOutput['structure']> {
    const structureType = input.structure || this.determineStructure(input.genre, input.duration);
    const sections = await this.generateSections(input, structureType);

    return {
      sections,
      totalDuration: sections.reduce((sum, s) => sum + s.duration, 0),
    };
  }

  /**
   * 構成タイプの決定
   */
  private determineStructure(genre: MusicGenre, duration: number): MusicCompositionInput['structure'] {
    if (duration < 60) {
      return 'free-form';
    }

    const structureMap: Record<MusicGenre, MusicCompositionInput['structure']> = {
      pop: 'verse-chorus',
      rock: 'verse-chorus',
      jazz: 'aba',
      classical: 'through-composed',
      electronic: 'free-form',
      'hip-hop': 'verse-chorus',
      ambient: 'through-composed',
      cinematic: 'through-composed',
      corporate: 'aba',
      upbeat: 'verse-chorus',
      'lo-fi': 'aba',
      orchestral: 'through-composed',
      acoustic: 'verse-chorus',
      folk: 'verse-chorus',
      world: 'aba',
      experimental: 'free-form',
    };

    return structureMap[genre];
  }

  /**
   * セクション生成
   */
  private async generateSections(
    input: MusicCompositionInput,
    structureType: MusicCompositionInput['structure']
  ): Promise<MusicCompositionOutput['structure']['sections']> {
    const sections: MusicCompositionOutput['structure']['sections'] = [];
    let currentTime = 0;

    const instruments = input.instruments || this.selectInstrumentsForGenre(input.genre);

    if (structureType === 'verse-chorus') {
      // イントロ
      sections.push(this.createSection('Intro', currentTime, 8, 30, instruments, 'イントロダクション、主題の導入'));
      currentTime += 8;

      // Verse 1
      sections.push(this.createSection('Verse 1', currentTime, 16, 50, instruments, 'ストーリーの展開、メロディー導入'));
      currentTime += 16;

      // Chorus
      sections.push(this.createSection('Chorus', currentTime, 16, 80, instruments, 'サビ、最もエネルギッシュなセクション'));
      currentTime += 16;

      // Verse 2
      sections.push(this.createSection('Verse 2', currentTime, 16, 55, instruments, 'ストーリーの続き、バリエーション'));
      currentTime += 16;

      // Chorus
      sections.push(this.createSection('Chorus', currentTime, 16, 85, instruments, 'サビの繰り返し、強調'));
      currentTime += 16;

      // Bridge
      if (input.duration > 100) {
        sections.push(this.createSection('Bridge', currentTime, 12, 60, instruments, '転換部、新しい要素の導入'));
        currentTime += 12;
      }

      // Final Chorus
      sections.push(this.createSection('Chorus (Final)', currentTime, 16, 90, instruments, '最終サビ、クライマックス'));
      currentTime += 16;

      // Outro
      const outroDuration = Math.max(8, input.duration - currentTime);
      sections.push(this.createSection('Outro', currentTime, outroDuration, 20, instruments, 'エンディング、フェードアウト'));

    } else if (structureType === 'aba') {
      const sectionDuration = Math.floor(input.duration / 3);

      sections.push(this.createSection('Section A', 0, sectionDuration, 60, instruments, 'メインテーマの提示'));
      sections.push(this.createSection('Section B', sectionDuration, sectionDuration, 70, instruments, 'コントラストセクション、展開'));
      sections.push(this.createSection('Section A (Reprise)', sectionDuration * 2, input.duration - (sectionDuration * 2), 65, instruments, 'メインテーマの再現'));

    } else if (structureType === 'through-composed') {
      const sectionCount = Math.max(4, Math.floor(input.duration / 20));
      const sectionDuration = input.duration / sectionCount;

      for (let i = 0; i < sectionCount; i++) {
        const energy = 30 + (i / sectionCount) * 60; // 徐々にエネルギーを上げる
        sections.push(
          this.createSection(
            `Section ${i + 1}`,
            i * sectionDuration,
            sectionDuration,
            energy,
            instruments,
            `展開部 ${i + 1}、継続的な発展`
          )
        );
      }

    } else {
      // free-form
      const intro = Math.min(5, input.duration * 0.1);
      const main = input.duration - intro - 5;
      const outro = 5;

      sections.push(this.createSection('Introduction', 0, intro, 40, instruments, '導入部'));
      sections.push(this.createSection('Main Section', intro, main, 70, instruments, 'メインセクション、自由な展開'));
      sections.push(this.createSection('Conclusion', intro + main, outro, 30, instruments, '終結部'));
    }

    return sections;
  }

  /**
   * セクション作成ヘルパー
   */
  private createSection(
    name: string,
    startTime: number,
    duration: number,
    energy: number,
    instruments: InstrumentCategory[],
    description: string
  ): MusicCompositionOutput['structure']['sections'][0] {
    return {
      name,
      startTime,
      duration,
      description,
      energy,
      instruments,
    };
  }

  /**
   * ジャンルに応じた楽器選択
   */
  private selectInstrumentsForGenre(genre: MusicGenre): InstrumentCategory[] {
    const instrumentMap: Record<MusicGenre, InstrumentCategory[]> = {
      pop: ['synthesizers', 'guitars', 'bass', 'percussion', 'vocals'],
      rock: ['guitars', 'bass', 'percussion', 'keyboards'],
      jazz: ['brass', 'woodwinds', 'keyboards', 'bass', 'percussion'],
      classical: ['strings', 'woodwinds', 'brass', 'percussion'],
      electronic: ['synthesizers', 'electronic', 'percussion'],
      'hip-hop': ['synthesizers', 'bass', 'percussion', 'vocals'],
      ambient: ['synthesizers', 'keyboards', 'strings'],
      cinematic: ['strings', 'brass', 'woodwinds', 'percussion', 'synthesizers'],
      corporate: ['keyboards', 'guitars', 'bass', 'percussion'],
      upbeat: ['synthesizers', 'guitars', 'percussion', 'bass'],
      'lo-fi': ['keyboards', 'synthesizers', 'percussion'],
      orchestral: ['strings', 'brass', 'woodwinds', 'percussion'],
      acoustic: ['guitars', 'strings', 'percussion'],
      folk: ['guitars', 'strings', 'woodwinds'],
      world: ['ethnic', 'percussion', 'strings'],
      experimental: ['synthesizers', 'electronic', 'ethnic'],
    };

    return instrumentMap[genre];
  }

  /**
   * アレンジメント作成
   */
  private async createArrangement(
    input: MusicCompositionInput,
    structure: MusicCompositionOutput['structure']
  ): Promise<MusicCompositionOutput['arrangement']> {
    const instruments = input.instruments || this.selectInstrumentsForGenre(input.genre);
    const layers: MusicCompositionOutput['arrangement']['layers'] = [];

    // メロディーレイヤー
    layers.push({
      instrument: this.selectMelodyInstrument(input.genre, instruments),
      role: 'melody',
      pattern: 'Main melodic line, lyrical and memorable',
      velocity: 100,
      panning: 0,
      effects: ['Reverb (Short)', 'EQ (Presence boost)'],
    });

    // ハーモニーレイヤー
    layers.push({
      instrument: this.selectHarmonyInstrument(input.genre, instruments),
      role: 'harmony',
      pattern: 'Chord voicings, harmonic support',
      velocity: 80,
      panning: 20,
      effects: ['Reverb (Medium)', 'Chorus'],
    });

    // リズムレイヤー
    layers.push({
      instrument: 'Drums / Percussion',
      role: 'rhythm',
      pattern: `${input.genre} groove pattern`,
      velocity: 95,
      panning: 0,
      effects: ['Compression', 'EQ (Punch)'],
    });

    // ベースレイヤー
    layers.push({
      instrument: 'Bass',
      role: 'bass',
      pattern: 'Root notes and rhythmic variations',
      velocity: 90,
      panning: 0,
      effects: ['Compression (Heavy)', 'EQ (Low-end)'],
    });

    // テクスチャレイヤー
    if (input.complexity !== 'simple') {
      layers.push({
        instrument: this.selectTextureInstrument(input.genre),
        role: 'texture',
        pattern: 'Atmospheric pads, ambient sounds',
        velocity: 60,
        panning: -30,
        effects: ['Reverb (Long)', 'Delay', 'Filter'],
      });
    }

    return { layers };
  }

  /**
   * メロディー楽器選択
   */
  private selectMelodyInstrument(genre: MusicGenre, instruments: InstrumentCategory[]): string {
    const preferences: Record<MusicGenre, string> = {
      pop: 'Vocals / Synth Lead',
      rock: 'Electric Guitar',
      jazz: 'Saxophone / Trumpet',
      classical: 'Violin / Flute',
      electronic: 'Synth Lead',
      'hip-hop': 'Vocals / Synth',
      ambient: 'Synth Pad',
      cinematic: 'Strings / Woodwinds',
      corporate: 'Piano / Synth',
      upbeat: 'Synth Lead',
      'lo-fi': 'Electric Piano',
      orchestral: 'Strings',
      acoustic: 'Acoustic Guitar',
      folk: 'Acoustic Guitar / Fiddle',
      world: 'Ethnic Instruments',
      experimental: 'Synth / Processed Sounds',
    };

    return preferences[genre];
  }

  /**
   * ハーモニー楽器選択
   */
  private selectHarmonyInstrument(genre: MusicGenre, instruments: InstrumentCategory[]): string {
    const preferences: Record<MusicGenre, string> = {
      pop: 'Piano / Synth Pad',
      rock: 'Rhythm Guitar',
      jazz: 'Piano / Guitar',
      classical: 'Strings',
      electronic: 'Synth Pad',
      'hip-hop': 'Synth Pad',
      ambient: 'Synth Strings',
      cinematic: 'Strings / Brass',
      corporate: 'Piano',
      upbeat: 'Synth Pad',
      'lo-fi': 'Synth Pad',
      orchestral: 'Strings / Woodwinds',
      acoustic: 'Acoustic Guitar',
      folk: 'Acoustic Guitar',
      world: 'Strings / Ethnic',
      experimental: 'Textured Synths',
    };

    return preferences[genre];
  }

  /**
   * テクスチャ楽器選択
   */
  private selectTextureInstrument(genre: MusicGenre): string {
    const textures: Record<MusicGenre, string> = {
      pop: 'Synth Pad',
      rock: 'Atmospheric Guitar',
      jazz: 'Vibraphone / Synth',
      classical: 'Strings Sustain',
      electronic: 'Ambient Synth',
      'hip-hop': 'Atmospheric Pad',
      ambient: 'Evolving Textures',
      cinematic: 'String Swells',
      corporate: 'Soft Pad',
      upbeat: 'Bright Pad',
      'lo-fi': 'Vinyl Crackle / Pad',
      orchestral: 'String Tremolo',
      acoustic: 'String Harmonics',
      folk: 'Drone / Harmonics',
      world: 'Atmospheric Ethnic',
      experimental: 'Granular Synthesis',
    };

    return textures[genre];
  }

  /**
   * 音楽要素の生成
   */
  private async generateMusicalElements(input: MusicCompositionInput): Promise<MusicCompositionOutput['musicalElements']> {
    return {
      melody: await this.generateMelodyInfo(input),
      harmony: await this.generateHarmonyInfo(input),
      rhythm: await this.generateRhythmInfo(input),
    };
  }

  /**
   * メロディー情報生成
   */
  private async generateMelodyInfo(input: MusicCompositionInput): Promise<MusicCompositionOutput['musicalElements']['melody']> {
    const ranges: Record<Mood, string> = {
      happy: 'C4-C6',
      sad: 'A3-A5',
      energetic: 'D4-D6',
      calm: 'G3-G5',
      mysterious: 'F#3-F#5',
      dramatic: 'C3-C6',
      romantic: 'A3-A5',
      epic: 'C3-C6',
      playful: 'G4-G6',
      dark: 'E3-E5',
      uplifting: 'D4-D6',
      melancholic: 'A3-A5',
      tense: 'C#4-C#6',
      peaceful: 'F3-F5',
      aggressive: 'E3-E6',
    };

    return {
      range: ranges[input.mood],
      motifs: ['Primary theme', 'Secondary theme', 'Development motif'],
      contour: this.determineMelodyContour(input.mood, input.emotionalArc),
    };
  }

  /**
   * メロディー輪郭の決定
   */
  private determineMelodyContour(mood: Mood, emotionalArc?: MusicCompositionInput['emotionalArc']): string {
    if (emotionalArc === 'ascending') {
      return 'Rising contour, gradually increasing in pitch';
    }
    if (emotionalArc === 'descending') {
      return 'Falling contour, gradually decreasing in pitch';
    }
    if (emotionalArc === 'dynamic') {
      return 'Wave-like contour, with peaks and valleys';
    }

    const contours: Record<Mood, string> = {
      happy: 'Upward leaps, optimistic intervals',
      sad: 'Descending lines, narrow intervals',
      energetic: 'Wide intervals, angular motion',
      calm: 'Smooth stepwise motion',
      mysterious: 'Chromatic, unpredictable',
      dramatic: 'Large leaps, contrasting registers',
      romantic: 'Flowing, legato lines',
      epic: 'Bold, heroic intervals',
      playful: 'Skipping, light motion',
      dark: 'Descending, chromatic',
      uplifting: 'Ascending, major intervals',
      melancholic: 'Descending, minor intervals',
      tense: 'Dissonant leaps, jagged',
      peaceful: 'Gentle, stepwise',
      aggressive: 'Angular, wide intervals',
    };

    return contours[mood];
  }

  /**
   * ハーモニー情報生成
   */
  private async generateHarmonyInfo(input: MusicCompositionInput): Promise<MusicCompositionOutput['musicalElements']['harmony']> {
    const progressions = this.generateChordProgression(input.mood, input.genre);

    return {
      chordProgression: progressions,
      harmonyType: this.determineHarmonyType(input.genre, input.complexity),
      complexity: input.complexity || 'moderate',
    };
  }

  /**
   * コード進行生成
   */
  private generateChordProgression(mood: Mood, genre: MusicGenre): string[] {
    const progressions: Record<Mood, string[]> = {
      happy: ['I', 'V', 'vi', 'IV'],
      sad: ['i', 'VI', 'III', 'VII'],
      energetic: ['I', 'IV', 'V', 'I'],
      calm: ['I', 'V', 'vi', 'iii'],
      mysterious: ['i', 'bVI', 'bVII', 'i'],
      dramatic: ['i', 'iv', 'V', 'i'],
      romantic: ['I', 'vi', 'IV', 'V'],
      epic: ['i', 'VI', 'III', 'VII'],
      playful: ['I', 'IV', 'I', 'V'],
      dark: ['i', 'bVI', 'bIII', 'bVII'],
      uplifting: ['I', 'V', 'vi', 'IV'],
      melancholic: ['i', 'iv', 'v', 'i'],
      tense: ['i', 'iidim', 'V', 'i'],
      peaceful: ['I', 'IV', 'I', 'V'],
      aggressive: ['i', 'VII', 'VI', 'V'],
    };

    return progressions[mood];
  }

  /**
   * ハーモニータイプ決定
   */
  private determineHarmonyType(genre: MusicGenre, complexity?: MusicCompositionInput['complexity']): string {
    if (complexity === 'simple') {
      return 'Diatonic triads, basic progressions';
    }
    if (complexity === 'complex') {
      return 'Extended chords (9th, 11th, 13th), altered dominants, modal interchange';
    }

    const types: Record<MusicGenre, string> = {
      pop: 'Diatonic with occasional borrowed chords',
      rock: 'Power chords and triads',
      jazz: 'Extended chords, complex voicings',
      classical: 'Functional harmony, modulations',
      electronic: 'Simple or modal harmony',
      'hip-hop': 'Simple triads or modal',
      ambient: 'Sparse, modal harmony',
      cinematic: 'Rich, orchestral harmony',
      corporate: 'Diatonic, major tonality',
      upbeat: 'Simple, major chords',
      'lo-fi': 'Jazz-influenced, 7th chords',
      orchestral: 'Complex, classical harmony',
      acoustic: 'Diatonic triads',
      folk: 'Simple, folk progressions',
      world: 'Modal or ethnic scales',
      experimental: 'Atonal or microtonal',
    };

    return types[genre];
  }

  /**
   * リズム情報生成
   */
  private async generateRhythmInfo(input: MusicCompositionInput): Promise<MusicCompositionOutput['musicalElements']['rhythm']> {
    return {
      pattern: this.determineRhythmPattern(input.genre),
      groove: this.determineGroove(input.genre, input.mood),
      syncopation: this.shouldUseSyncopation(input.genre),
    };
  }

  /**
   * リズムパターン決定
   */
  private determineRhythmPattern(genre: MusicGenre): string {
    const patterns: Record<MusicGenre, string> = {
      pop: 'Four-on-the-floor kick with snare on 2 and 4',
      rock: 'Standard rock beat, backbeat emphasis',
      jazz: 'Swing rhythm, ride cymbal pattern',
      classical: 'Orchestral percussion, subtle rhythmic support',
      electronic: 'Programmed beats, quantized rhythm',
      'hip-hop': 'Boom-bap or trap pattern',
      ambient: 'Minimal or absent rhythmic elements',
      cinematic: 'Orchestral percussion, dramatic hits',
      corporate: 'Steady, unobtrusive beat',
      upbeat: 'Driving, consistent rhythm',
      'lo-fi': 'Laid-back, slightly off-grid beats',
      orchestral: 'Timpani and orchestral percussion',
      acoustic: 'Acoustic drums or hand percussion',
      folk: 'Simple, traditional rhythms',
      world: 'Ethnic percussion patterns',
      experimental: 'Unconventional, polyrhythmic',
    };

    return patterns[genre];
  }

  /**
   * グルーヴ決定
   */
  private determineGroove(genre: MusicGenre, mood: Mood): string {
    const grooves: Record<MusicGenre, string> = {
      pop: 'Tight, polished groove',
      rock: 'Driving, energetic groove',
      jazz: 'Swinging, loose feel',
      classical: 'Refined, precise timing',
      electronic: 'Mechanical, quantized',
      'hip-hop': 'Head-nodding, laid-back',
      ambient: 'Floating, atmospheric',
      cinematic: 'Dynamic, evolving',
      corporate: 'Steady, professional',
      upbeat: 'Energetic, forward-moving',
      'lo-fi': 'Relaxed, slightly imperfect',
      orchestral: 'Grand, orchestral feel',
      acoustic: 'Natural, organic',
      folk: 'Traditional, earthy',
      world: 'Cultural, rhythmic complexity',
      experimental: 'Unpredictable, unique',
    };

    return grooves[genre];
  }

  /**
   * シンコペーション使用判定
   */
  private shouldUseSyncopation(genre: MusicGenre): boolean {
    const syncopatedGenres: MusicGenre[] = ['jazz', 'hip-hop', 'electronic', 'experimental', 'world'];
    return syncopatedGenres.includes(genre);
  }

  /**
   * プロダクション情報生成
   */
  private async generateProductionInfo(input: MusicCompositionInput): Promise<MusicCompositionOutput['production']> {
    return {
      mixingNotes: [
        `Balance melody prominently in ${input.genre} style`,
        'Create depth with reverb and delay',
        'Ensure clarity in frequency spectrum',
        'Apply compression to maintain dynamics',
        'Use panning for stereo width',
      ],
      masteringGuidelines: [
        'Target -14 LUFS for streaming platforms',
        'Apply subtle multi-band compression',
        'Enhance presence with high-shelf EQ',
        'Limit peaks to -1 dBTP',
        'Check mono compatibility',
      ],
      effectsChain: [
        {
          track: 'Melody',
          effects: ['EQ (Presence)', 'Compression (Light)', 'Reverb (Short)', 'Delay (Subtle)'],
        },
        {
          track: 'Harmony',
          effects: ['EQ (Warmth)', 'Chorus', 'Reverb (Medium)'],
        },
        {
          track: 'Rhythm',
          effects: ['EQ (Punch)', 'Compression (Heavy)', 'Transient Shaper'],
        },
        {
          track: 'Bass',
          effects: ['EQ (Sub-bass boost)', 'Compression (Heavy)', 'Saturation'],
        },
      ],
    };
  }

  /**
   * エクスポートオプション設定
   */
  private async setExportOptions(input: MusicCompositionInput): Promise<MusicCompositionOutput['exportOptions']> {
    return {
      formats: ['WAV (24-bit)', 'MP3 (320kbps)', 'FLAC'],
      sampleRate: 48000,
      bitDepth: 24,
      stems: input.complexity !== 'simple',
    };
  }

  /**
   * ライセンス情報生成
   */
  private async generateLicenseInfo(): Promise<MusicCompositionOutput['licenseInfo']> {
    return {
      type: 'royalty-free',
      restrictions: [
        'Commercial use allowed',
        'No redistribution of source files',
        'Attribution appreciated but not required',
      ],
      attribution: 'Music created by AI Music Creator Agent',
    };
  }

  /**
   * BGM作成
   */
  private async createBGM(input: BGMCreationInput): Promise<BGMCreationOutput> {
    this.log(`BGMを作成中: ${input.purpose} - ${input.mood}`);

    const title = `${input.mood} ${input.purpose} BGM`;
    const description = `Background music for ${input.purpose} with ${input.mood} mood`;

    const musicalCharacteristics = await this.determineBGMCharacteristics(input);
    const composition = await this.composeBGM(input, musicalCharacteristics);
    const technicalSpecs = await this.defineBGMTechnicalSpecs(input);
    const timeline = await this.createBGMTimeline(input);
    const usageRecommendations = await this.generateBGMUsageRecommendations(input);
    const variations = await this.createBGMVariations(input);
    const deliverables = await this.prepareBGMDeliverables(input);

    const output: BGMCreationOutput = {
      title,
      description,
      musicalCharacteristics,
      composition,
      technicalSpecs,
      timeline,
      usageRecommendations,
      variations,
      deliverables,
    };

    this.log(`BGM作成完了: ${title}`);
    return output;
  }

  /**
   * BGM音楽特性の決定
   */
  private async determineBGMCharacteristics(input: BGMCreationInput): Promise<BGMCreationOutput['musicalCharacteristics']> {
    const genre = input.genre || this.selectGenreForPurpose(input.purpose);
    const tempo = this.selectTempoForMood(input.mood);
    const key = this.selectKeyForMood(input.mood);
    const energyLevel = input.energyLevel || this.determineEnergyLevel(input.mood);

    return {
      genre,
      mood: input.mood,
      tempo,
      key,
      energyLevel,
    };
  }

  /**
   * 用途に応じたジャンル選択
   */
  private selectGenreForPurpose(purpose: BGMCreationInput['purpose']): MusicGenre {
    const genreMap: Record<BGMCreationInput['purpose'], MusicGenre> = {
      video: 'cinematic',
      game: 'electronic',
      podcast: 'ambient',
      presentation: 'corporate',
      website: 'upbeat',
      app: 'electronic',
    };

    return genreMap[purpose];
  }

  /**
   * ムードに応じたテンポ選択
   */
  private selectTempoForMood(mood: Mood): number {
    const tempos: Record<Mood, number> = {
      happy: 120,
      sad: 70,
      energetic: 130,
      calm: 80,
      mysterious: 90,
      dramatic: 100,
      romantic: 75,
      epic: 110,
      playful: 125,
      dark: 85,
      uplifting: 115,
      melancholic: 65,
      tense: 95,
      peaceful: 70,
      aggressive: 140,
    };

    return tempos[mood];
  }

  /**
   * エネルギーレベル決定
   */
  private determineEnergyLevel(mood: Mood): 'low' | 'medium' | 'high' {
    const highEnergy: Mood[] = ['energetic', 'aggressive', 'epic'];
    const lowEnergy: Mood[] = ['calm', 'peaceful', 'melancholic', 'sad'];

    if (highEnergy.includes(mood)) return 'high';
    if (lowEnergy.includes(mood)) return 'low';
    return 'medium';
  }

  /**
   * BGM作曲
   */
  private async composeBGM(
    input: BGMCreationInput,
    characteristics: BGMCreationOutput['musicalCharacteristics']
  ): Promise<BGMCreationOutput['composition']> {
    const structure = input.loopable ? 'AABA loop structure' : 'Linear progression';
    const mainTheme = `${characteristics.mood} melodic theme in ${characteristics.key}`;

    const instrumentation = this.selectBGMInstrumentation(input);
    const textureDescription = this.describeBGMTexture(input.layering || 'moderate');

    return {
      structure,
      mainTheme,
      instrumentation,
      textureDescription,
    };
  }

  /**
   * BGM楽器編成選択
   */
  private selectBGMInstrumentation(input: BGMCreationInput): string[] {
    const base = ['Soft Pad', 'Subtle Melody', 'Light Percussion'];

    if (input.layering === 'rich') {
      return [...base, 'Strings', 'Piano', 'Ambient Textures', 'Bass'];
    }

    if (input.layering === 'minimal') {
      return ['Pad', 'Simple Melody'];
    }

    return base;
  }

  /**
   * BGMテクスチャ説明
   */
  private describeBGMTexture(layering: 'minimal' | 'moderate' | 'rich'): string {
    const descriptions = {
      minimal: 'Sparse, open texture with space for voiceovers and dialogue',
      moderate: 'Balanced layering with clear melodic and harmonic elements',
      rich: 'Full, lush arrangement with multiple instrumental layers',
    };

    return descriptions[layering];
  }

  /**
   * BGM技術仕様定義
   */
  private async defineBGMTechnicalSpecs(input: BGMCreationInput): Promise<BGMCreationOutput['technicalSpecs']> {
    const fadeTime = input.fadeInOut ? 2 : 0;

    return {
      duration: input.duration,
      isLoopable: input.loopable || false,
      fadeIn: fadeTime,
      fadeOut: fadeTime,
      format: input.technicalRequirements?.format || 'MP3',
      sampleRate: input.technicalRequirements?.sampleRate || 44100,
      bitRate: '192kbps',
      fileSize: this.estimateFileSize(input.duration, 'MP3', 192),
    };
  }

  /**
   * ファイルサイズ推定
   */
  private estimateFileSize(duration: number, format: string, bitRate: number): number {
    // ビットレート (kbps) * 時間 (秒) / 8 / 1024 = MB
    return (bitRate * duration) / 8 / 1024;
  }

  /**
   * BGMタイムライン作成
   */
  private async createBGMTimeline(input: BGMCreationInput): Promise<BGMCreationOutput['timeline']> {
    const timeline: BGMCreationOutput['timeline'] = [];

    if (input.fadeInOut) {
      timeline.push({
        timestamp: 0,
        event: 'Fade In',
        description: 'Gradual introduction of elements',
      });
    }

    timeline.push({
      timestamp: 0,
      event: 'Introduction',
      description: 'Main theme introduction',
    });

    const midPoint = Math.floor(input.duration / 2);
    timeline.push({
      timestamp: midPoint,
      event: 'Development',
      description: 'Variation or subtle development',
    });

    if (input.fadeInOut) {
      timeline.push({
        timestamp: input.duration - 2,
        event: 'Fade Out',
        description: 'Gradual reduction to silence',
      });
    }

    return timeline;
  }

  /**
   * BGM使用推奨事項生成
   */
  private async generateBGMUsageRecommendations(input: BGMCreationInput): Promise<BGMCreationOutput['usageRecommendations']> {
    const purposeRecommendations: Record<BGMCreationInput['purpose'], string[]> = {
      video: ['YouTube content', 'Corporate videos', 'Vlogs', 'Tutorials'],
      game: ['Menu screens', 'Exploration phases', 'Ambient gameplay'],
      podcast: ['Intros/Outros', 'Transitions', 'Background during talking'],
      presentation: ['Slide transitions', 'Background for presentations', 'Opening/Closing'],
      website: ['Homepage background', 'Product showcases', 'Loading screens'],
      app: ['Onboarding', 'Menu navigation', 'Background ambiance'],
    };

    return {
      bestFor: purposeRecommendations[input.purpose],
      pairsWith: ['Voiceovers', 'Sound effects', 'Ambient sounds'],
      voiceoverCompatibility: 'Designed to sit behind vocals without masking',
      transitionPoints: this.identifyTransitionPoints(input.duration),
    };
  }

  /**
   * トランジションポイント特定
   */
  private identifyTransitionPoints(duration: number): number[] {
    const points: number[] = [];
    const interval = Math.max(15, Math.floor(duration / 4));

    for (let i = interval; i < duration; i += interval) {
      points.push(i);
    }

    return points;
  }

  /**
   * BGMバリエーション作成
   */
  private async createBGMVariations(input: BGMCreationInput): Promise<BGMCreationOutput['variations']> {
    const variations: BGMCreationOutput['variations'] = [];

    // 60秒版
    if (input.duration > 60) {
      variations.push({
        name: '60-Second Version',
        description: 'Shortened version for quick content',
        duration: 60,
        modifications: ['Condensed structure', 'Faster fade-out'],
      });
    }

    // 30秒版
    if (input.duration > 30) {
      variations.push({
        name: '30-Second Version',
        description: 'Short version for ads and intros',
        duration: 30,
        modifications: ['Core elements only', 'Quick fade in/out'],
      });
    }

    // ループ版
    if (!input.loopable && input.duration >= 60) {
      variations.push({
        name: 'Seamless Loop',
        description: 'Loopable version for extended use',
        duration: input.duration,
        modifications: ['Seamless loop points', 'Removed fade-out'],
      });
    }

    return variations;
  }

  /**
   * BGM成果物準備
   */
  private async prepareBGMDeliverables(input: BGMCreationInput): Promise<BGMCreationOutput['deliverables']> {
    return {
      mainTrack: `${input.purpose}_bgm_${input.mood}.mp3`,
      stems: input.layering === 'rich' ? ['melody.wav', 'harmony.wav', 'rhythm.wav', 'bass.wav'] : undefined,
      loops: input.loopable ? [`${input.purpose}_bgm_loop.mp3`] : undefined,
      altVersions: ['60s_version.mp3', '30s_version.mp3'],
    };
  }

  /**
   * 効果音生成
   */
  private async generateSoundEffects(input: SoundEffectsInput): Promise<SoundEffectsOutput> {
    this.log(`効果音を生成中: ${input.effectType} (${input.category})`);

    const count = input.count || (input.variations ? 3 : 1);
    const effects: SoundEffectsOutput['effects'] = [];

    for (let i = 0; i < count; i++) {
      effects.push(await this.createSoundEffect(input, i + 1));
    }

    const collections = await this.groupEffectsIntoCollections(effects, input);
    const metadata = await this.compileSoundEffectsMetadata(effects);

    const output: SoundEffectsOutput = {
      effects,
      collections,
      metadata,
    };

    this.log(`効果音生成完了: ${effects.length}個の効果音`);
    return output;
  }

  /**
   * 個別効果音作成
   */
  private async createSoundEffect(input: SoundEffectsInput, index: number): Promise<SoundEffectsOutput['effects'][0]> {
    const id = `${input.category}_${input.effectType}_${index}`;
    const name = `${input.effectType} ${index}`;
    const description = `${input.style || 'realistic'} ${input.effectType} sound effect`;

    const specs = await this.generateSoundEffectSpecs(input);
    const composition = await this.composeSoundEffect(input);
    const processing = await this.defineSoundEffectProcessing(input);
    const format = await this.setSoundEffectFormat(input);
    const usageTips = await this.provideSoundEffectUsageTips(input);

    return {
      id,
      name,
      description,
      category: input.category,
      effectType: input.effectType,
      specs,
      composition,
      processing,
      format,
      usageTips,
    };
  }

  /**
   * 効果音仕様生成
   */
  private async generateSoundEffectSpecs(input: SoundEffectsInput): Promise<SoundEffectsOutput['effects'][0]['specs']> {
    const waveforms: Record<string, string> = {
      'button-click': 'Sine wave with fast attack',
      'explosion': 'White noise burst with sub-bass',
      'whoosh': 'Filtered noise sweep',
      'notification': 'Sine wave with harmonics',
      'error': 'Square wave with descending pitch',
      'success': 'Ascending triad',
    };

    return {
      duration: input.duration,
      frequency: this.determineFrequencyRange(input.effectType),
      waveform: waveforms[input.effectType] || 'Complex waveform',
      envelope: this.createADSREnvelope(input.effectType, input.duration),
    };
  }

  /**
   * 周波数範囲決定
   */
  private determineFrequencyRange(effectType: string): string {
    const ranges: Record<string, string> = {
      'button-click': '1000-4000 Hz',
      'explosion': '20-200 Hz (sub) + 2000-8000 Hz (high)',
      'whoosh': '500-5000 Hz',
      'notification': '800-1600 Hz',
      'error': '200-600 Hz',
      'success': '600-2000 Hz',
    };

    return ranges[effectType] || '200-5000 Hz';
  }

  /**
   * ADSRエンベロープ作成
   */
  private createADSREnvelope(effectType: string, duration: number): SoundEffectsOutput['effects'][0]['specs']['envelope'] {
    const envelopes: Record<string, any> = {
      'button-click': { attack: 1, decay: 10, sustain: 0, release: 20 },
      'explosion': { attack: 5, decay: 100, sustain: 50, release: 300 },
      'whoosh': { attack: 50, decay: 100, sustain: 30, release: 150 },
      'notification': { attack: 10, decay: 50, sustain: 80, release: 100 },
      'error': { attack: 10, decay: 100, sustain: 0, release: 50 },
      'success': { attack: 20, decay: 80, sustain: 60, release: 150 },
    };

    return envelopes[effectType] || { attack: 10, decay: 50, sustain: 50, release: 100 };
  }

  /**
   * 効果音コンポジション
   */
  private async composeSoundEffect(input: SoundEffectsInput): Promise<SoundEffectsOutput['effects'][0]['composition']> {
    const layers: SoundEffectsOutput['effects'][0]['composition']['layers'] = [];

    if (input.layering) {
      layers.push({
        sound: input.layering.baseSound,
        processing: ['EQ', 'Compression'],
        level: 100,
      });

      input.layering.additionalLayers.forEach((layer, index) => {
        layers.push({
          sound: layer,
          processing: ['Filter', 'Reverb'],
          level: 70 - index * 10,
        });
      });
    } else {
      layers.push({
        sound: input.effectType,
        processing: ['Basic Processing'],
        level: 100,
      });
    }

    return { layers };
  }

  /**
   * 効果音処理定義
   */
  private async defineSoundEffectProcessing(input: SoundEffectsInput): Promise<SoundEffectsOutput['effects'][0]['processing']> {
    const styleProcessing: Record<string, string[]> = {
      realistic: ['Natural EQ', 'Light Compression', 'Subtle Reverb'],
      stylized: ['Heavy EQ', 'Saturation', 'Creative Effects'],
      retro: ['Bit Reduction', 'Low-pass Filter', 'Vinyl Crackle'],
      futuristic: ['Digital Modulation', 'Ring Modulator', 'Spectral Processing'],
      '8-bit': ['Chiptune Waveforms', 'Bit Reduction', 'Square Wave'],
    };

    const effects = styleProcessing[input.style || 'realistic'];

    return {
      effects,
      eq: 'Optimized for clarity and punch',
      compression: '3:1 ratio, fast attack',
      normalization: 'Peak normalized to -0.1 dBFS',
    };
  }

  /**
   * 効果音フォーマット設定
   */
  private async setSoundEffectFormat(input: SoundEffectsInput): Promise<SoundEffectsOutput['effects'][0]['format']> {
    return {
      fileType: 'WAV',
      sampleRate: 48000,
      bitDepth: 24,
      channels: input.category === 'ambient' ? 'stereo' : 'mono',
    };
  }

  /**
   * 効果音使用ティップス提供
   */
  private async provideSoundEffectUsageTips(input: SoundEffectsInput): Promise<string[]> {
    const categoryTips: Record<SoundEffectsInput['category'], string[]> = {
      ui: [
        'Use sparingly to avoid fatigue',
        'Ensure consistent volume across all UI sounds',
        'Test on different devices',
      ],
      game: [
        'Layer with music for impact',
        'Vary pitch for repetitive sounds',
        'Consider 3D spatial audio',
      ],
      film: [
        'Sync precisely with visual action',
        'Layer for realistic depth',
        'Consider Foley replacement',
      ],
      transition: [
        'Use to bridge scenes smoothly',
        'Match energy to content',
        'Avoid overuse',
      ],
      ambient: [
        'Loop seamlessly for backgrounds',
        'Mix at low levels',
        'Use for atmosphere',
      ],
      foley: [
        'Record multiple takes for variation',
        'Sync tightly with picture',
        'Layer for realism',
      ],
    };

    return categoryTips[input.category];
  }

  /**
   * 効果音コレクショングループ化
   */
  private async groupEffectsIntoCollections(
    effects: SoundEffectsOutput['effects'],
    input: SoundEffectsInput
  ): Promise<SoundEffectsOutput['collections']> {
    return [
      {
        name: `${input.category} Collection`,
        effectIds: effects.map(e => e.id),
        theme: input.effectType,
        description: `Collection of ${input.effectType} sound effects for ${input.category} use`,
      },
    ];
  }

  /**
   * 効果音メタデータコンパイル
   */
  private async compileSoundEffectsMetadata(effects: SoundEffectsOutput['effects']): Promise<SoundEffectsOutput['metadata']> {
    const categories = Array.from(new Set(effects.map(e => e.category)));
    const averageDuration = effects.reduce((sum, e) => sum + e.specs.duration, 0) / effects.length;
    const fileSize = effects.length * 0.5; // 仮の推定

    return {
      totalEffects: effects.length,
      categories,
      averageDuration,
      fileSize,
    };
  }

  /**
   * オーディオミキシング
   */
  private async mixAudio(input: AudioMixingInput): Promise<AudioMixingOutput> {
    this.log(`オーディオをミキシング中: ${input.tracks.length}トラック`);

    const mixConfiguration = await this.createMixConfiguration(input);
    const balanceRecommendations = await this.generateBalanceRecommendations(input);
    const automationSuggestions = await this.createAutomationSuggestions(input);
    const qualityChecks = await this.performQualityChecks(input);
    const deliverables = await this.prepareDeliverables(input);

    const output: AudioMixingOutput = {
      mixConfiguration,
      balanceRecommendations,
      automationSuggestions,
      qualityChecks,
      deliverables,
    };

    this.log('オーディオミキシング完了');
    return output;
  }

  /**
   * ミックス設定作成
   */
  private async createMixConfiguration(input: AudioMixingInput): Promise<AudioMixingOutput['mixConfiguration']> {
    const masterSettings: AudioMixingOutput['mixConfiguration']['masterSettings'] = {
      targetLoudness: input.targetLoudness || -14,
      peakLevel: -1,
      dynamicRange: 8,
      stereoWidth: input.stereoWidth || 'medium',
    };

    const trackSettings = await Promise.all(
      input.tracks.map(track => this.createTrackSettings(track, input.genre))
    );

    const auxBuses = await this.createAuxBuses(input);

    return {
      masterSettings,
      trackSettings,
      auxBuses,
    };
  }

  /**
   * トラック設定作成
   */
  private async createTrackSettings(
    track: AudioMixingInput['tracks'][0],
    genre: MusicGenre
  ): Promise<AudioMixingOutput['mixConfiguration']['trackSettings'][0]> {
    const typeSettings: Record<string, any> = {
      vocal: {
        gain: 0,
        pan: 0,
        eq: {
          lowCut: 80,
          lowShelf: { freq: 200, gain: -2 },
          midBell: { freq: 3000, gain: 3, q: 1.5 },
          highShelf: { freq: 10000, gain: 2 },
          highCut: 18000,
        },
        compression: {
          threshold: -12,
          ratio: 4,
          attack: 5,
          release: 50,
          makeupGain: 3,
        },
        reverb: {
          type: 'Plate',
          wetDry: 20,
          decay: 1.8,
          predelay: 20,
        },
        delay: {
          time: 250,
          feedback: 20,
          wetDry: 15,
        },
      },
      instrument: {
        gain: -2,
        pan: 20,
        eq: {
          lowCut: 100,
          midBell: { freq: 2000, gain: 2, q: 1.0 },
          highCut: 16000,
        },
        compression: {
          threshold: -18,
          ratio: 3,
          attack: 10,
          release: 80,
          makeupGain: 2,
        },
        reverb: {
          type: 'Hall',
          wetDry: 25,
          decay: 2.0,
          predelay: 15,
        },
      },
      drum: {
        gain: -1,
        pan: 0,
        eq: {
          lowCut: 40,
          lowShelf: { freq: 80, gain: 3 },
          midBell: { freq: 4000, gain: 2, q: 2.0 },
          highShelf: { freq: 12000, gain: 1 },
          highCut: 20000,
        },
        compression: {
          threshold: -10,
          ratio: 6,
          attack: 3,
          release: 40,
          makeupGain: 4,
        },
      },
      bass: {
        gain: -3,
        pan: 0,
        eq: {
          lowCut: 30,
          lowShelf: { freq: 80, gain: 4 },
          midBell: { freq: 200, gain: -2, q: 1.0 },
          highCut: 5000,
        },
        compression: {
          threshold: -15,
          ratio: 5,
          attack: 5,
          release: 60,
          makeupGain: 3,
        },
        saturation: 15,
      },
      fx: {
        gain: -5,
        pan: -30,
        eq: {
          lowCut: 200,
          highCut: 12000,
        },
        compression: {
          threshold: -20,
          ratio: 2,
          attack: 20,
          release: 100,
          makeupGain: 1,
        },
        reverb: {
          type: 'Space',
          wetDry: 40,
          decay: 3.0,
          predelay: 30,
        },
      },
    };

    const settings = typeSettings[track.type] || typeSettings.instrument;

    return {
      trackId: track.id,
      trackName: track.name,
      processing: {
        ...settings,
        otherEffects: [],
      },
      routing: {
        send1: { bus: 'Reverb', level: 30 },
      },
    };
  }

  /**
   * Auxバス作成
   */
  private async createAuxBuses(input: AudioMixingInput): Promise<AudioMixingOutput['mixConfiguration']['auxBuses']> {
    return [
      {
        name: 'Reverb',
        type: 'reverb',
        processing: ['Long Reverb (Hall)', 'EQ (High-pass at 300Hz)'],
      },
      {
        name: 'Delay',
        type: 'delay',
        processing: ['1/4 Note Delay', 'Low-pass Filter'],
      },
      {
        name: 'Parallel Compression',
        type: 'parallel-compression',
        processing: ['Heavy Compression (10:1)', 'Blend with dry signal'],
      },
    ];
  }

  /**
   * バランス推奨事項生成
   */
  private async generateBalanceRecommendations(input: AudioMixingInput): Promise<AudioMixingOutput['balanceRecommendations']> {
    return {
      frequencyBalance: 'Ensure clear separation: bass (20-250Hz), mids (250-4kHz), highs (4k-20kHz)',
      stereoImage: `${input.stereoWidth || 'Medium'} width, centered low frequencies`,
      dynamics: 'Maintain 8-12dB dynamic range for musicality',
      depth: 'Use reverb and delay to create front-to-back dimension',
    };
  }

  /**
   * オートメーション提案作成
   */
  private async createAutomationSuggestions(input: AudioMixingInput): Promise<AudioMixingOutput['automationSuggestions']> {
    return [
      {
        track: 'Vocal',
        parameter: 'Volume',
        timeline: [
          { time: 0, value: -3, description: 'Lower during intro' },
          { time: 30, value: 0, description: 'Full level at verse' },
          { time: 60, value: 0, description: 'Maintain through chorus' },
        ],
      },
      {
        track: 'Master',
        parameter: 'Reverb Send',
        timeline: [
          { time: 0, value: 20, description: 'Moderate reverb' },
          { time: 120, value: 40, description: 'Increase for epic outro' },
        ],
      },
    ];
  }

  /**
   * 品質チェック実施
   */
  private async performQualityChecks(input: AudioMixingInput): Promise<AudioMixingOutput['qualityChecks']> {
    return {
      phaseIssues: false,
      clipping: false,
      frequencyMasking: [],
      dynamicRange: 'Healthy 10dB range',
      stereoCompatibility: 'Mono-compatible',
    };
  }

  /**
   * 成果物準備
   */
  private async prepareDeliverables(input: AudioMixingInput): Promise<AudioMixingOutput['deliverables']> {
    const formats = ['WAV (24-bit 48kHz)', 'MP3 (320kbps)'];
    const stems = input.deliverables?.stems ? ['vocals.wav', 'instruments.wav', 'drums.wav', 'bass.wav'] : [];
    const alternativeVersions = [];

    if (input.deliverables?.instrumental) {
      alternativeVersions.push('Instrumental Mix');
    }

    if (input.deliverables?.acapella) {
      alternativeVersions.push('Acapella Mix');
    }

    return {
      formats,
      stems,
      alternativeVersions,
    };
  }

  /**
   * ムードマッチング
   */
  private async matchMood(input: MoodMatchingInput): Promise<MoodMatchingOutput> {
    this.log(`ムードマッチング中: ${input.targetMood}`);

    const analysis = await this.analyzeMood(input);
    const musicRecommendations = await this.recommendMusic(input, analysis);
    const compositionGuidelines = await this.provideCompositionGuidelines(input, analysis);
    const dynamicMapping = await this.mapMoodDynamics(input);
    const referenceExamples = await this.findReferenceExamples(input);

    const output: MoodMatchingOutput = {
      analysis,
      musicRecommendations,
      compositionGuidelines,
      dynamicMapping,
      referenceExamples,
    };

    this.log('ムードマッチング完了');
    return output;
  }

  /**
   * ムード分析
   */
  private async analyzeMood(input: MoodMatchingInput): Promise<MoodMatchingOutput['analysis']> {
    const moodDimensions = this.calculateMoodDimensions(input.targetMood);
    const emotionalKeywords = this.extractEmotionalKeywords(input.targetMood);
    const colorAssociations = this.associateColors(input.targetMood);
    const sensoryDescriptors = this.generateSensoryDescriptors(input.targetMood);

    return {
      targetMood: input.targetMood,
      moodDimensions,
      emotionalKeywords,
      colorAssociations,
      sensoryDescriptors,
    };
  }

  /**
   * ムード次元計算
   */
  private calculateMoodDimensions(mood: Mood): MoodMatchingOutput['analysis']['moodDimensions'] {
    const dimensions: Record<Mood, { valence: number; arousal: number; dominance: number }> = {
      happy: { valence: 80, arousal: 70, dominance: 60 },
      sad: { valence: -70, arousal: 30, dominance: 20 },
      energetic: { valence: 50, arousal: 90, dominance: 80 },
      calm: { valence: 40, arousal: 20, dominance: 30 },
      mysterious: { valence: -20, arousal: 50, dominance: 40 },
      dramatic: { valence: 0, arousal: 80, dominance: 70 },
      romantic: { valence: 70, arousal: 40, dominance: 40 },
      epic: { valence: 60, arousal: 85, dominance: 90 },
      playful: { valence: 75, arousal: 60, dominance: 50 },
      dark: { valence: -80, arousal: 60, dominance: 60 },
      uplifting: { valence: 85, arousal: 75, dominance: 70 },
      melancholic: { valence: -60, arousal: 35, dominance: 25 },
      tense: { valence: -40, arousal: 85, dominance: 50 },
      peaceful: { valence: 50, arousal: 15, dominance: 30 },
      aggressive: { valence: -50, arousal: 95, dominance: 90 },
    };

    return dimensions[mood];
  }

  /**
   * 感情キーワード抽出
   */
  private extractEmotionalKeywords(mood: Mood): string[] {
    const keywords: Record<Mood, string[]> = {
      happy: ['joyful', 'cheerful', 'bright', 'optimistic', 'lively'],
      sad: ['melancholic', 'somber', 'mournful', 'sorrowful', 'gloomy'],
      energetic: ['dynamic', 'vigorous', 'powerful', 'intense', 'driving'],
      calm: ['peaceful', 'serene', 'tranquil', 'relaxed', 'gentle'],
      mysterious: ['enigmatic', 'cryptic', 'intriguing', 'suspenseful', 'eerie'],
      dramatic: ['intense', 'powerful', 'compelling', 'striking', 'bold'],
      romantic: ['tender', 'passionate', 'intimate', 'warm', 'affectionate'],
      epic: ['grand', 'heroic', 'majestic', 'monumental', 'triumphant'],
      playful: ['whimsical', 'lighthearted', 'fun', 'bouncy', 'quirky'],
      dark: ['ominous', 'sinister', 'brooding', 'menacing', 'grim'],
      uplifting: ['inspiring', 'hopeful', 'encouraging', 'motivating', 'positive'],
      melancholic: ['wistful', 'nostalgic', 'pensive', 'reflective', 'bittersweet'],
      tense: ['anxious', 'nervous', 'edgy', 'apprehensive', 'uneasy'],
      peaceful: ['calm', 'still', 'harmonious', 'quiet', 'meditative'],
      aggressive: ['fierce', 'forceful', 'harsh', 'combative', 'violent'],
    };

    return keywords[mood];
  }

  /**
   * 色の関連付け
   */
  private associateColors(mood: Mood): string[] {
    const colors: Record<Mood, string[]> = {
      happy: ['Yellow', 'Orange', 'Bright Green'],
      sad: ['Blue', 'Gray', 'Muted Purple'],
      energetic: ['Red', 'Bright Orange', 'Electric Blue'],
      calm: ['Soft Blue', 'Pastel Green', 'Cream'],
      mysterious: ['Deep Purple', 'Midnight Blue', 'Black'],
      dramatic: ['Deep Red', 'Black', 'Gold'],
      romantic: ['Pink', 'Rose', 'Burgundy'],
      epic: ['Gold', 'Royal Blue', 'Crimson'],
      playful: ['Bright Pink', 'Lime Green', 'Sky Blue'],
      dark: ['Black', 'Dark Gray', 'Deep Burgundy'],
      uplifting: ['Bright Yellow', 'Sky Blue', 'White'],
      melancholic: ['Muted Blue', 'Gray', 'Sepia'],
      tense: ['Dark Red', 'Gray', 'Black'],
      peaceful: ['Soft Green', 'Light Blue', 'White'],
      aggressive: ['Red', 'Black', 'Dark Orange'],
    };

    return colors[mood];
  }

  /**
   * 感覚的記述子生成
   */
  private generateSensoryDescriptors(mood: Mood): string[] {
    const descriptors: Record<Mood, string[]> = {
      happy: ['Bright', 'Light', 'Bouncy', 'Warm'],
      sad: ['Heavy', 'Slow', 'Cold', 'Distant'],
      energetic: ['Fast', 'Driving', 'Pulsing', 'Electric'],
      calm: ['Smooth', 'Flowing', 'Soft', 'Gentle'],
      mysterious: ['Shadowy', 'Ethereal', 'Whispered', 'Veiled'],
      dramatic: ['Bold', 'Sweeping', 'Intense', 'Powerful'],
      romantic: ['Warm', 'Intimate', 'Soft', 'Embracing'],
      epic: ['Grand', 'Soaring', 'Powerful', 'Majestic'],
      playful: ['Light', 'Bouncy', 'Quirky', 'Spontaneous'],
      dark: ['Heavy', 'Ominous', 'Deep', 'Threatening'],
      uplifting: ['Rising', 'Bright', 'Open', 'Expansive'],
      melancholic: ['Tender', 'Reflective', 'Delicate', 'Fragile'],
      tense: ['Sharp', 'Tight', 'Restless', 'Jarring'],
      peaceful: ['Smooth', 'Still', 'Floating', 'Spacious'],
      aggressive: ['Sharp', 'Hard', 'Forceful', 'Jagged'],
    };

    return descriptors[mood];
  }

  /**
   * 音楽推奨
   */
  private async recommendMusic(
    input: MoodMatchingInput,
    analysis: MoodMatchingOutput['analysis']
  ): Promise<MoodMatchingOutput['musicRecommendations']> {
    const recommendations: MoodMatchingOutput['musicRecommendations'] = [];

    // Top 3 recommendations
    for (let i = 0; i < 3; i++) {
      recommendations.push({
        rank: i + 1,
        matchScore: 95 - i * 10,
        musicProfile: {
          genre: this.selectGenreForPurpose('video'), // Simplification
          tempo: this.selectTempoForMood(input.targetMood),
          key: this.selectKeyForMood(input.targetMood),
          mode: analysis.moodDimensions.valence > 0 ? 'major' : 'minor',
          instrumentation: this.selectInstrumentsForGenre('cinematic'),
          texture: 'Rich and layered',
        },
        characteristics: {
          energy: analysis.moodDimensions.arousal,
          valence: (analysis.moodDimensions.valence + 100) / 2,
          danceability: analysis.moodDimensions.arousal > 70 ? 75 : 40,
          acousticness: 50,
          instrumentalness: 80,
        },
        reasoning: `This recommendation matches the ${input.targetMood} mood with appropriate valence, arousal, and musical characteristics`,
        sampleDescription: `${input.targetMood} music with ${analysis.emotionalKeywords.join(', ')} qualities`,
        usageNotes: [`Perfect for ${input.context}`, 'Supports emotional narrative', 'Enhances viewer engagement'],
      });
    }

    return recommendations;
  }

  /**
   * 作曲ガイドライン提供
   */
  private async provideCompositionGuidelines(
    input: MoodMatchingInput,
    analysis: MoodMatchingOutput['analysis']
  ): Promise<MoodMatchingOutput['compositionGuidelines']> {
    return {
      melodicDirection: analysis.moodDimensions.valence > 0 ? 'Ascending, upward motion' : 'Descending, downward motion',
      harmonicComplexity: analysis.moodDimensions.arousal > 70 ? 'Rich and complex' : 'Simple and clear',
      rhythmicDensity: analysis.moodDimensions.arousal > 70 ? 'High density, driving' : 'Sparse, spacious',
      dynamicRange: analysis.moodDimensions.arousal > 70 ? 'Wide dynamic range' : 'Moderate, controlled',
      instrumentalPriorities: this.selectInstrumentsForGenre('cinematic').map(String),
      textureRecommendations: [
        'Layer instruments for depth',
        'Use reverb for space',
        'Balance clarity with atmosphere',
      ],
    };
  }

  /**
   * ムードダイナミクスマッピング
   */
  private async mapMoodDynamics(input: MoodMatchingInput): Promise<MoodMatchingOutput['dynamicMapping']> {
    if (!input.emotionalProgression) {
      return [];
    }

    return input.emotionalProgression.map((progression, index) => ({
      timestamp: progression.timestamp,
      targetMood: progression.mood,
      musicalAdjustments: {
        tempo: this.selectTempoForMood(progression.mood),
        key: this.selectKeyForMood(progression.mood),
        instrumentation: this.selectInstrumentsForGenre('cinematic').map(String),
        dynamics: progression.intensity > 70 ? 'Forte' : 'Piano',
        density: progression.intensity > 70 ? 'High' : 'Low',
      },
      transitionType: index === 0 ? 'smooth' : 'gradual',
    }));
  }

  /**
   * 参考例検索
   */
  private async findReferenceExamples(input: MoodMatchingInput): Promise<MoodMatchingOutput['referenceExamples']> {
    // Simplified reference examples
    return [
      {
        title: `${input.targetMood} Reference 1`,
        artist: 'Example Composer',
        relevance: `Excellent ${input.targetMood} mood representation`,
        keyFeatures: ['Strong emotional core', 'Appropriate instrumentation', 'Effective dynamics'],
      },
    ];
  }

  /**
   * ジャンル作成
   */
  private async createGenre(input: GenreCreationInput): Promise<GenreCreationOutput> {
    this.log(`新しいジャンルを作成中: ${input.baseGenre}ベース`);

    const genreDefinition = await this.defineGenre(input);
    const musicalElements = await this.defineMusicalElements(input);
    const culturalContext = await this.defineCulturalContext(input);
    const compositionGuide = await this.createCompositionGuide(input);
    const examples = await this.generateGenreExamples(input);
    const marketAnalysis = await this.analyzeMarket(input);

    const output: GenreCreationOutput = {
      genreDefinition,
      musicalElements,
      culturalContext,
      compositionGuide,
      examples,
      marketAnalysis,
    };

    this.log(`ジャンル作成完了: ${genreDefinition.name}`);
    return output;
  }

  /**
   * ジャンル定義
   */
  private async defineGenre(input: GenreCreationInput): Promise<GenreCreationOutput['genreDefinition']> {
    const fusionString = input.fusionGenres ? ` x ${input.fusionGenres.join(' x ')}` : '';
    const name = `${input.timePeriod || 'Contemporary'} ${input.baseGenre}${fusionString}`;

    return {
      name,
      description: `A ${input.innovationLevel || 'fusion'} genre combining elements of ${input.baseGenre}${fusionString}`,
      origin: `Created through AI-driven genre fusion, ${new Date().getFullYear()}`,
      influences: [input.baseGenre, ...(input.fusionGenres || []), ...(input.culturalInfluences || [])],
      keyCharacteristics: input.uniqueElements || ['Innovative sound design', 'Cross-genre fusion', 'Modern production'],
      subgenres: [],
    };
  }

  /**
   * 音楽要素定義
   */
  private async defineMusicalElements(input: GenreCreationInput): Promise<GenreCreationOutput['musicalElements']> {
    const baseTempo = this.determineTempoForGenre(input.baseGenre);

    return {
      rhythm: {
        typicalBPM: { min: baseTempo - 20, max: baseTempo + 20 },
        timeSignatures: ['4/4', '3/4', '6/8'],
        rhythmicPatterns: [this.determineRhythmPattern(input.baseGenre)],
        groove: this.determineGroove(input.baseGenre, 'energetic'),
      },
      melody: {
        scalePreferences: ['Major', 'Minor', 'Pentatonic', 'Modal'],
        melodicMotifs: ['Short memorable phrases', 'Repetitive hooks'],
        intervalPatterns: ['Stepwise motion', 'Leaps for emphasis'],
        ornamentation: ['Vibrato', 'Slides', 'Grace notes'],
      },
      harmony: {
        chordVocabulary: ['Triads', '7th chords', 'Extended chords'],
        progressionStyles: ['Diatonic', 'Modal', 'Chromatic'],
        modalityPreference: 'Major/Minor with modal touches',
        dissonanceTolerance: input.innovationLevel === 'experimental' ? 'High' : 'Moderate',
      },
      instrumentation: {
        coreInstruments: this.selectInstrumentsForGenre(input.baseGenre).map(String),
        supportingInstruments: ['Percussion', 'Synthesizers'],
        unusualInstruments: input.uniqueElements,
        synthesizers: input.baseGenre === 'electronic' ? ['Analog', 'FM', 'Wavetable'] : undefined,
      },
      production: {
        mixingStyle: 'Modern, clear separation',
        commonEffects: ['Reverb', 'Delay', 'Compression', 'EQ'],
        spatialCharacter: 'Wide stereo field with depth',
        dynamicProfile: 'Controlled with occasional dynamic bursts',
      },
    };
  }

  /**
   * 文化的コンテキスト定義
   */
  private async defineCulturalContext(input: GenreCreationInput): Promise<GenreCreationOutput['culturalContext']> {
    return {
      geographicOrigins: input.culturalInfluences || ['Global'],
      historicalContext: `Emerged in ${input.timePeriod || 'contemporary'} era through genre fusion`,
      socialContext: `Appeals to ${input.targetAudience || 'diverse audiences'} seeking innovative sounds`,
      visualAesthetics: ['Modern', 'Eclectic', 'Genre-bending'],
      fashionAssociations: ['Contemporary', 'Expressive'],
    };
  }

  /**
   * 作曲ガイド作成
   */
  private async createCompositionGuide(input: GenreCreationInput): Promise<GenreCreationOutput['compositionGuide']> {
    return {
      songStructures: ['Verse-Chorus', 'ABA', 'Through-composed'],
      typicalDuration: { min: 180, max: 300 },
      introStyles: ['Atmospheric build', 'Immediate hook', 'Gradual introduction'],
      transitionTechniques: ['Smooth fade', 'Abrupt cut', 'Bridge section'],
      endingStyles: ['Fade out', 'Definitive ending', 'Cyclical return'],
    };
  }

  /**
   * ジャンル例生成
   */
  private async generateGenreExamples(input: GenreCreationInput): Promise<GenreCreationOutput['examples']> {
    return [
      {
        type: 'theoretical',
        description: `A ${input.baseGenre} track with ${input.fusionGenres?.join(' and ')} influences`,
        musicalFeatures: ['Fusion of rhythmic patterns', 'Blended instrumentation', 'Hybrid production techniques'],
        context: 'Theoretical example demonstrating genre characteristics',
      },
    ];
  }

  /**
   * 市場分析
   */
  private async analyzeMarket(input: GenreCreationInput): Promise<GenreCreationOutput['marketAnalysis']> {
    return {
      targetDemographics: [input.targetAudience || 'Music enthusiasts', 'Genre explorers', '18-35 age range'],
      useCases: ['Streaming platforms', 'Live performances', 'Film/TV sync', 'Gaming'],
      potentialReach: input.innovationLevel === 'traditional' ? 'Established audience' : 'Niche to growing audience',
      competitiveGenres: [input.baseGenre, ...(input.fusionGenres || [])],
    };
  }

  /**
   * オーディオ分析
   */
  private async analyzeAudio(input: AudioAnalysisInput): Promise<AudioAnalysisOutput> {
    this.log(`オーディオを分析中: ${input.analysisType}`);

    const metadata = await this.extractMetadata(input);
    const technicalAnalysis = await this.performTechnicalAnalysis(input);
    const musicalAnalysis = await this.performMusicalAnalysis(input);
    const perceptualAnalysis = await this.performPerceptualAnalysis(input);
    const genreClassification = await this.classifyGenre(input);
    const production = await this.analyzeProduction(input);
    const commercialAnalysis = await this.performCommercialAnalysis(input);
    const recommendations = await this.generateRecommendations(input, production);
    const comparison = input.referenceTrack ? await this.compareWithReference(input) : undefined;

    const output: AudioAnalysisOutput = {
      metadata,
      technicalAnalysis,
      musicalAnalysis,
      perceptualAnalysis,
      genreClassification,
      production,
      commercialAnalysis,
      recommendations,
      comparison,
    };

    this.log('オーディオ分析完了');
    return output;
  }

  /**
   * メタデータ抽出
   */
  private async extractMetadata(input: AudioAnalysisInput): Promise<AudioAnalysisOutput['metadata']> {
    return {
      fileName: input.audioFile || 'audio.wav',
      format: 'WAV',
      duration: 240,
      sampleRate: 48000,
      bitDepth: 24,
      channels: 2,
      fileSize: 50,
      codec: 'PCM',
    };
  }

  /**
   * 技術分析実施
   */
  private async performTechnicalAnalysis(input: AudioAnalysisInput): Promise<AudioAnalysisOutput['technicalAnalysis']> {
    return {
      loudness: {
        integrated: -14,
        range: 8,
        peak: -0.5,
        truePeak: -0.3,
      },
      dynamics: {
        crestFactor: 12,
        dynamicRange: 10,
        rmsLevel: -18,
        compression: 'Moderate compression applied',
      },
      frequency: {
        lowEnd: { range: '20-250 Hz', level: -12 },
        midRange: { range: '250-4000 Hz', level: -15 },
        highEnd: { range: '4000-20000 Hz', level: -20 },
        fundamentalFrequency: 220,
        spectralCentroid: 2000,
        spectralRolloff: 8000,
      },
      stereo: {
        width: 75,
        correlation: 0.8,
        balance: 0,
        monoCompatibility: 'Excellent',
      },
      tempo: {
        bpm: 120,
        confidence: 95,
        stability: 'Very stable',
        timeSignature: '4/4',
      },
    };
  }

  /**
   * 音楽分析実施
   */
  private async performMusicalAnalysis(input: AudioAnalysisInput): Promise<AudioAnalysisOutput['musicalAnalysis']> {
    return {
      key: {
        tonic: 'C',
        mode: 'major',
        confidence: 90,
        keyChanges: [],
      },
      structure: {
        sections: [
          { name: 'Intro', start: 0, end: 16, duration: 16 },
          { name: 'Verse', start: 16, end: 48, duration: 32 },
          { name: 'Chorus', start: 48, end: 80, duration: 32 },
        ],
        repetitionPattern: 'Verse-Chorus structure',
        formType: 'Popular song form',
      },
      melody: {
        range: { low: 'C4', high: 'C6' },
        contour: 'Primarily ascending with resolution',
        complexity: 'Moderate',
        motifs: 2,
      },
      harmony: {
        chordProgression: ['I', 'V', 'vi', 'IV'],
        harmonicComplexity: 'Diatonic with occasional borrowed chords',
        dissonanceLevel: 'Low',
        modulations: 0,
      },
      rhythm: {
        pattern: 'Four-on-the-floor',
        syncopation: 'Moderate',
        polyrhythm: false,
        grooveIntensity: 75,
      },
    };
  }

  /**
   * 知覚分析実施
   */
  private async performPerceptualAnalysis(input: AudioAnalysisInput): Promise<AudioAnalysisOutput['perceptualAnalysis']> {
    return {
      mood: 'energetic',
      energy: 80,
      valence: 75,
      danceability: 85,
      acousticness: 30,
      instrumentalness: 70,
      liveness: 15,
      speechiness: 5,
      emotionalProfile: {
        primary: 'Energetic',
        secondary: ['Happy', 'Uplifting'],
        intensity: 80,
      },
    };
  }

  /**
   * ジャンル分類
   */
  private async classifyGenre(input: AudioAnalysisInput): Promise<AudioAnalysisOutput['genreClassification']> {
    return {
      primary: 'electronic',
      secondary: ['pop', 'upbeat'],
      confidence: 85,
      stylisticElements: ['Synthesizers', 'Four-on-the-floor beat', 'Catchy hooks'],
    };
  }

  /**
   * プロダクション分析
   */
  private async analyzeProduction(input: AudioAnalysisInput): Promise<AudioAnalysisOutput['production']> {
    return {
      mixQuality: {
        balance: 'Well-balanced',
        clarity: 'Excellent clarity',
        depth: 'Good depth and dimension',
        width: 'Wide stereo image',
        overallScore: 85,
      },
      mastering: {
        loudnessCompliance: 'Meets -14 LUFS streaming standard',
        dynamicRangeScore: 80,
        frequencyBalanceScore: 85,
        stereoImageScore: 90,
        overallScore: 85,
      },
      issues: [],
    };
  }

  /**
   * 商業分析実施
   */
  private async performCommercialAnalysis(input: AudioAnalysisInput): Promise<AudioAnalysisOutput['commercialAnalysis']> {
    return {
      broadcastCompliance: {
        ebuR128: true,
        atscA85: true,
        other: [],
      },
      platformReadiness: {
        spotify: { compliant: true, notes: ['Meets loudness standards'] },
        youtube: { compliant: true, notes: ['Ready for upload'] },
        radio: { compliant: true, notes: ['Broadcast ready'] },
        film: { compliant: true, notes: ['Sync-ready'] },
      },
      qualityScore: 85,
      marketability: {
        trendinessScore: 75,
        uniquenessScore: 70,
        commercialAppeal: 'High',
        targetAudience: ['Young adults', 'Electronic music fans'],
      },
    };
  }

  /**
   * 推奨事項生成
   */
  private async generateRecommendations(
    input: AudioAnalysisInput,
    production: AudioAnalysisOutput['production']
  ): Promise<AudioAnalysisOutput['recommendations']> {
    const recommendations: AudioAnalysisOutput['recommendations'] = [];

    if (production.mixQuality.overallScore < 80) {
      recommendations.push({
        category: 'Mix Quality',
        priority: 'high',
        suggestion: 'Improve overall mix balance and clarity',
        expectedImprovement: '+10% quality score',
      });
    }

    recommendations.push({
      category: 'Mastering',
      priority: 'medium',
      suggestion: 'Consider additional loudness optimization for streaming',
      expectedImprovement: 'Better platform compliance',
    });

    return recommendations;
  }

  /**
   * 参照トラックとの比較
   */
  private async compareWithReference(input: AudioAnalysisInput): Promise<AudioAnalysisOutput['comparison']> {
    return {
      referenceTrack: input.referenceTrack || 'Reference Track',
      similarities: ['Similar tempo', 'Comparable loudness', 'Matching genre'],
      differences: ['Different harmonic complexity', 'Wider stereo image', 'Less compression'],
      matchScore: 75,
      recommendations: ['Increase mid-range presence to match reference', 'Apply similar reverb characteristics'],
    };
  }
}
