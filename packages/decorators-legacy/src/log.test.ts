import { describe, expect, it } from 'vitest';
import { Log } from './log';
import type { Logger } from './log';

class FakeLogger implements Logger {
  messages: string[] = [];

  log(message: string): void {
    this.messages.push(message);
  }
}

describe('@Log', () => {
  it('logs entry and exit for a synchronous method and preserves the return value', () => {
    const logger = new FakeLogger();

    class Calculator {
      @Log({ logger })
      add(a: number, b: number): number {
        return a + b;
      }
    }

    const result = new Calculator().add(2, 3);

    expect(result).toBe(5);
    expect(logger.messages).toHaveLength(2);
    expect(logger.messages[0]).toMatch(/\[ENTER\] add\(2, 3\)/);
    expect(logger.messages[1]).toMatch(/\[EXIT\] add -> 5 \(\d+\.\d+ms\)/);
  });

  it('logs entry and exit for an async method', async () => {
    const logger = new FakeLogger();

    class Calculator {
      @Log({ logger })
      async asyncAdd(a: number, b: number): Promise<number> {
        return a + b;
      }
    }

    const result = await new Calculator().asyncAdd(4, 5);

    expect(result).toBe(9);
    expect(logger.messages).toHaveLength(2);
    expect(logger.messages[0]).toMatch(/\[ENTER\] asyncAdd\(4, 5\)/);
    expect(logger.messages[1]).toMatch(/\[EXIT\] asyncAdd -> 9 \(\d+\.\d+ms\)/);
  });

  it('logs errors without swallowing them', () => {
    const logger = new FakeLogger();

    class Service {
      @Log({ logger })
      thrower(): void {
        throw new Error('boom');
      }
    }

    expect(() => new Service().thrower()).toThrow('boom');
    expect(logger.messages).toHaveLength(2);
    expect(logger.messages[0]).toMatch(/\[ENTER\] thrower\(\)/);
    expect(logger.messages[1]).toMatch(/\[ERROR\] thrower threw Error: boom \(\d+\.\d+ms\)/);
  });

  it('defaults to console when no logger is provided', () => {
    const originalLog = console.log;
    const logs: string[] = [];
    console.log = (message: string) => logs.push(message);

    class Service {
      @Log()
      greet(name: string): string {
        return `Hello ${name}`;
      }
    }

    try {
      expect(new Service().greet('World')).toBe('Hello World');
      expect(logs).toHaveLength(2);
      expect(logs[0]).toMatch(/\[ENTER\] greet\("World"\)/);
      expect(logs[1]).toMatch(/\[EXIT\] greet -> "Hello World" \(\d+\.\d+ms\)/);
    } finally {
      console.log = originalLog;
    }
  });
});
