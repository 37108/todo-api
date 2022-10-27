export interface Payload {
  username: string;
  sub: string;
  group: string[];
  iat: number;
  exp: number;
}
