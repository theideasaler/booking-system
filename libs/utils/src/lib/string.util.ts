export function camcelToHyphen(str: string) {
    return str.replace(/[A-Z]/g, (m) => '-' + m.toLowerCase());
  }