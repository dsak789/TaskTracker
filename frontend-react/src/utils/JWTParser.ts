export const parseJWT = (token: string | null | undefined) => {
  try {
    if (!token) return null;
    return JSON.parse(atob(token.split(".")[1]));
  } catch (e) {
    console.error(e);
    return null;
  }
};

export const loginRemains = (token: string | null | undefined) => {
  const data = parseJWT(token);

  const timeMS = data.exp * 1000;
  const cur_time = Date.now();
  const remMS = timeMS - cur_time;
  const timeSec = Math.floor(remMS / 600);
  console.log(timeSec);
  return timeSec;
};
