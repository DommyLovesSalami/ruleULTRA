export const trim = (value: string) => {
  return value.trim();
};

export const lowercase = (value: string) => {
  return value.toLowerCase();
};

export const requiredSpace = (value: string): string => {
  return value
    .replace(/(?<!_)\s*\(/g, " (")
    .replace(/\)\s*/g, ") ");
};

export const removeExtraSpaces = (value: string) => {
  return value.replace(/[ \t]{2,}/g, " ");
};

export const parentheses = (value: string): string => {
  return value.replace(/(?<!_)\(([^()]*)\)/g, (_, inside: string) => {
    const linted = inside
      .replace(/\\?~/g, " ~ ")
      .replace(/[ \t]{2,}/g, " ")
      .trim();

    return linted ? `( ${linted} )` : "()";
  });
};
