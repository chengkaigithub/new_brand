export function range(length: number): Array<number> {
  const ret = [];
  for (let i = 0; i < length; i++) {
    ret.push(i);
  }
  return ret;
}

export function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

export function isLeapYear(year: string): boolean {
  let numYear = parseInt(year, 10);
  if ((numYear % 4 === 0 && numYear % 100 !== 0) || numYear % 400 === 0) {
    return true;
  } else {
    return false;
  }
}

export function convert2Digit(i: number): string {
  i = Number(i);
  let result;
  if (i >= 0 && i < 10) {
    result = '0' + i;
  } else {
    result = '' + i;
  }
  return result;
}
