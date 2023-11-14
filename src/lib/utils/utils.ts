import { cookies } from "next/headers";


export const throttle = (cb:Function, delay:number = 1000) => {
  let nextPossibleCallTime: number = 0;

  // let waitingArgs: any[] = [];
  
  // const timeoutFunc = () => {
  //   if (waitingArgs === null) shouldWait = false;
  //   else {
  //     cb(...waitingArgs)
  //     waitingArgs = null;
  //     setTimeout(timeoutFunc, delay)
  //   }
  // }
  
  return async (...args: any) => {
    if (Date.now() > nextPossibleCallTime) {
      console.log('no delay')
      nextPossibleCallTime = Date.now() + delay;
      return (await cb(...args));
    } else {
      console.log('delay')
      const newDelay = nextPossibleCallTime - Date.now();
      nextPossibleCallTime = nextPossibleCallTime + delay;
      return new Promise((res, rej)=>{
        setTimeout(async ()=>{
          res(await cb(...args));
        }, newDelay)
      })
    }
  }
}



export const parseCookies = (str: string) => {
  console.log('str :>> ', typeof str);
  if (!str || str === '') return;
  
  const cookies = str.split(';').map(v => v ? v.split('=') : null);
  if (!cookies) return;
  console.log('cookies :>> ', cookies);

  const cookieJar = cookies.reduce((acc, v) => {
    console.log('acc :>> ', acc);
    acc[decodeURIComponent(v[0].trim())] = decodeURIComponent(v[1].trim());
    return acc;
  }, {});

  return cookieJar;
}

export const pascalCaseSingleWord = (str: string): string => {
  return str[0].toUpperCase() + str.slice(1);
}



export const truncate = (str:string, maxLength: number) => {
  return str.length > maxLength ? str.substring(0, maxLength-3) + "..." : str;
}
export function shuffleArray<T>(array: T[]): void {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
