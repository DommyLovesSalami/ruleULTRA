type FormatRule = (value: string) => string;

export class Linter {
  private rules: FormatRule[] = [];

  constructor(rules: FormatRule[] = []) {
    this.rules = rules;
  }

  format(value: string): string {
    return this.rules.reduce(
      (result, rule) => rule(result),
      String(value)
    );
  }
}
