export const throttle = <T>(
  cb: (...args: any[]) => Promise<T>,
  delay: number = 1000
) => {
  let nextPossibleCallTime: number = 0;

  return async (...args: any[]): Promise<T> => {
    if (Date.now() > nextPossibleCallTime) {
      nextPossibleCallTime = Date.now() + delay;
      return await cb(...args);
    } else {
      const newDelay = nextPossibleCallTime - Date.now();
      nextPossibleCallTime = nextPossibleCallTime + delay;
      return new Promise<T>((res, rej) => {
        setTimeout(async () => {
          res(await cb(...args));
        }, newDelay);
      });
    }
  };
};

export const parseCookies = (str: string) => {
  if (!str || str === '') return;
  const cookies = str.split(';').map(v => (v ? v.split('=') : null));
  if (!cookies) return;
  const cookieJar = cookies.reduce<{ [k: string]: string }>((acc, v) => {
    if (!v) return acc;
    acc[decodeURIComponent(v[0].trim())] = decodeURIComponent(v[1].trim());
    return acc;
  }, {});

  return cookieJar;
};

export const pascalCaseSingleWord = (str: string): string => {
  return str[0].toUpperCase() + str.slice(1);
};

export const truncate = (str: string, maxLength: number) => {
  return str.length > maxLength ? str.substring(0, maxLength - 3) + '...' : str;
};
export function shuffleArray<T>(array: T[]): void {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
