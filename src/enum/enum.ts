const SECRET_KEY_TOKEN: any = process.env.SECRET_KEY_TOKEN;

export enum SecretKey {
  key = SECRET_KEY_TOKEN,
}

export enum ExpiredTime {
  ACCESS_TOKEN = '30 days',
  REFRESH_TOKEN = '90 days',
}
