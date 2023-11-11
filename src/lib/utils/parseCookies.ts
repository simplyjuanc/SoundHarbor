
const parseCookies = (str: string) => {
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

export default parseCookies;