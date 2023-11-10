

const parseCookies = (str: string) => {
  const cookies = str.split(';').map(v => v.split('=')).reduce((acc, v) => {
    acc[decodeURIComponent(v[0].trim())] = decodeURIComponent(v[1].trim());
    return acc;
  }, {});
  return cookies;
}

export default parseCookies;