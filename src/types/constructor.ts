export type Constructor<T> = new (...args: any[]) => T;

export type AnyConstructor = Constructor<any>;
