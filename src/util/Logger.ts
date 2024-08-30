enum LogLevel {
  DEBUG = 0,
  INFO = 1,
  WARN = 2,
  ERROR = 3,
}

enum LogLevelTags {
  DEBUG = "[D]",
  INFO = "[I]",
  WARN = "[W]",
  ERROR = "[E]",
}

class Logger {
  private level: LogLevel;

  constructor() {
    this.level = this.getDefaultLogLevel();
  }

  private getDefaultLogLevel(): LogLevel {
    return this.isDevMode() ? LogLevel.DEBUG : LogLevel.WARN;
  }

  setLevel(level: LogLevel): void {
    this.level = level;
  }

  getLevel(): LogLevel {
    return this.level;
  }

  debug(...args: unknown[]): void {
    if (this.level <= LogLevel.DEBUG) {
      console.log(LogLevelTags.DEBUG, ...args);
    }
  }

  info(...args: unknown[]): void {
    if (this.level <= LogLevel.INFO) {
      console.info(LogLevelTags.INFO, ...args);
    }
  }

  warn(...args: unknown[]): void {
    if (this.level <= LogLevel.WARN) {
      console.warn(LogLevelTags.WARN, ...args);
    }
  }

  error(...args: unknown[]): void {
    if (this.level <= LogLevel.ERROR) {
      console.error(LogLevelTags.ERROR, ...args);
    }
  }

  isDevMode(): boolean {
    const isDevMode = import.meta.env.DEV;
    return isDevMode;
  }
}

export const logger = new Logger();
export { LogLevel };
