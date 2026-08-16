import 'reflect-metadata';

export interface Logger {
  log(message: string, ...args: unknown[]): void;
}

export interface LogOptions {
  logger?: Logger;
}

/**
 * Legacy TypeScript method decorator that logs method entry, arguments,
 * exit, return value, and elapsed timing.
 *
 * The decorator is framework-agnostic: it accepts an optional `logger`
 * seam that defaults to `console`. Consumers can supply a spy/logger
 * adapter in tests to assert on the emitted messages.
 */
export function Log(options: LogOptions = {}): MethodDecorator {
  const logger = options.logger ?? console;

  return function (_target: object, propertyKey: string | symbol, descriptor: PropertyDescriptor): PropertyDescriptor {
    const originalMethod = descriptor.value as (...args: unknown[]) => unknown;
    const methodName = typeof propertyKey === 'symbol' ? propertyKey.toString() : propertyKey;

    descriptor.value = function (this: unknown, ...args: unknown[]): unknown {
      const start = performance.now();
      const argsString = args.map((arg) => JSON.stringify(arg)).join(', ');

      logger.log(`[ENTER] ${methodName}(${argsString})`);

      try {
        const result = originalMethod.apply(this, args);

        if (result instanceof Promise) {
          return result.then(
            (value) => {
              logger.log(`[EXIT] ${methodName} -> ${JSON.stringify(value)} (${elapsed(start)}ms)`);
              return value;
            },
            (error: unknown) => {
              logger.log(`[ERROR] ${methodName} threw ${String(error)} (${elapsed(start)}ms)`);
              throw error;
            },
          );
        }

        logger.log(`[EXIT] ${methodName} -> ${JSON.stringify(result)} (${elapsed(start)}ms)`);
        return result;
      } catch (error) {
        logger.log(`[ERROR] ${methodName} threw ${String(error)} (${elapsed(start)}ms)`);
        throw error;
      }
    };

    return descriptor;
  };
}

function elapsed(start: number): string {
  return (performance.now() - start).toFixed(3);
}
