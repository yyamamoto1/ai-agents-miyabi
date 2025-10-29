import { createHash } from 'crypto';

/**
 * セキュリティ・サニタイゼーション管理
 */
export class SecurityManager {
  private sensitivePatterns: RegExp[];
  private hashSalt: string;

  constructor() {
    // 機密情報パターン定義
    this.sensitivePatterns = [
      /password[:\s]*[=\s]*[^\s]+/gi,
      /token[:\s]*[=\s]*[^\s]+/gi,
      /key[:\s]*[=\s]*[^\s]+/gi,
      /secret[:\s]*[=\s]*[^\s]+/gi,
      /credential[:\s]*[=\s]*[^\s]+/gi,
      /api_key[:\s]*[=\s]*[^\s]+/gi,
      /auth[:\s]*[=\s]*[^\s]+/gi,
      // ファイルパス（ユーザーディレクトリ）
      /\/Users\/[^\/\s]+/gi,
      /C:\\Users\\[^\\\/\s]+/gi,
      // IPアドレス・ポート
      /\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b/g,
      /localhost:\d+/gi,
      // メールアドレス
      /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,
    ];

    this.hashSalt = 'ai-agents-miyabi-2024';
  }

  /**
   * ログ内容のサニタイゼーション
   */
  sanitizeLogContent(content: string): string {
    let sanitized = content;

    for (const pattern of this.sensitivePatterns) {
      sanitized = sanitized.replace(pattern, (match) => {
        return this.maskSensitiveData(match);
      });
    }

    return sanitized;
  }

  /**
   * タスク内容のサニタイゼーション
   */
  sanitizeTaskContent(task: any): any {
    if (typeof task === 'string') {
      return this.sanitizeLogContent(task);
    }

    if (typeof task === 'object' && task !== null) {
      const sanitized: any = {};
      
      for (const [key, value] of Object.entries(task)) {
        if (this.isSensitiveKey(key)) {
          sanitized[key] = this.maskSensitiveData(String(value));
        } else if (typeof value === 'string') {
          sanitized[key] = this.sanitizeLogContent(value);
        } else if (typeof value === 'object') {
          sanitized[key] = this.sanitizeTaskContent(value);
        } else {
          sanitized[key] = value;
        }
      }
      
      return sanitized;
    }

    return task;
  }

  /**
   * 機密キー判定
   */
  private isSensitiveKey(key: string): boolean {
    const sensitiveKeys = [
      'password', 'token', 'key', 'secret', 'credential',
      'auth', 'api_key', 'access_token', 'refresh_token',
      'private_key', 'certificate', 'ssl_cert'
    ];

    return sensitiveKeys.some(sensitiveKey => 
      key.toLowerCase().includes(sensitiveKey)
    );
  }

  /**
   * 機密データマスク化
   */
  private maskSensitiveData(data: string): string {
    if (data.length <= 8) {
      return '*'.repeat(data.length);
    }

    // 最初と最後の2文字だけ表示、中間は*でマスク
    const start = data.substring(0, 2);
    const end = data.substring(data.length - 2);
    const middle = '*'.repeat(Math.max(4, data.length - 4));
    
    return `${start}${middle}${end}`;
  }

  /**
   * ハッシュ化（ログ用ID生成）
   */
  generateLogId(content: string): string {
    return createHash('sha256')
      .update(content + this.hashSalt)
      .digest('hex')
      .substring(0, 12);
  }

  /**
   * ファイルパス正規化（個人情報除去）
   */
  normalizePath(filePath: string): string {
    return filePath
      .replace(/\/Users\/[^\/]+/, '/Users/[USER]')
      .replace(/C:\\Users\\[^\\]+/, 'C:\\Users\\[USER]')
      .replace(/\/home\/[^\/]+/, '/home/[USER]');
  }

  /**
   * エージェント出力のサニタイゼーション
   */
  sanitizeAgentOutput(output: string): string {
    let sanitized = this.sanitizeLogContent(output);
    
    // tmuxセッション情報をマスク
    sanitized = sanitized.replace(/session-[a-zA-Z0-9-]+/g, 'session-[MASKED]');
    
    // プロセスIDをマスク
    sanitized = sanitized.replace(/PID:\s*\d+/gi, 'PID: [MASKED]');
    
    return sanitized;
  }

  /**
   * GitHub公開前チェック
   */
  validateForPublicRelease(content: string): {
    isSecure: boolean;
    issues: string[];
    sanitizedContent: string;
  } {
    const issues: string[] = [];
    let sanitizedContent = content;

    // 各パターンをチェック
    for (const pattern of this.sensitivePatterns) {
      const matches = content.match(pattern);
      if (matches) {
        issues.push(`Sensitive data detected: ${matches.length} matches found`);
        sanitizedContent = sanitizedContent.replace(pattern, '[REDACTED]');
      }
    }

    // ファイルパスチェック
    if (content.includes('/Users/') || content.includes('C:\\Users\\')) {
      issues.push('Personal file paths detected');
    }

    // 特定の文字列チェック
    const dangerousStrings = ['localhost', '127.0.0.1', 'private_key', 'ssh-rsa'];
    for (const dangerous of dangerousStrings) {
      if (content.toLowerCase().includes(dangerous)) {
        issues.push(`Potentially sensitive string: ${dangerous}`);
      }
    }

    return {
      isSecure: issues.length === 0,
      issues,
      sanitizedContent,
    };
  }

  /**
   * 設定ファイルの公開用サニタイズ
   */
  createPublicConfig(privateConfig: any): any {
    const publicConfig = JSON.parse(JSON.stringify(privateConfig));

    // 機密設定を除去・置換
    const sanitizeObj = (obj: any, path: string = '') => {
      for (const [key, value] of Object.entries(obj)) {
        const currentPath = path ? `${path}.${key}` : key;
        
        if (this.isSensitiveKey(key)) {
          obj[key] = '[PLACEHOLDER]';
        } else if (typeof value === 'string' && this.containsSensitiveData(value)) {
          obj[key] = '[EXAMPLE_VALUE]';
        } else if (typeof value === 'object' && value !== null) {
          sanitizeObj(value, currentPath);
        }
      }
    };

    sanitizeObj(publicConfig);
    return publicConfig;
  }

  /**
   * 機密データ含有チェック
   */
  private containsSensitiveData(value: string): boolean {
    return this.sensitivePatterns.some(pattern => pattern.test(value));
  }
}