export type Player = {
  socketId: string;
  username: string;
  healthPoints: number | undefined;
  opponent: string | undefined;
  ready: boolean;
  leader: boolean;
  choice: string | undefined;
};
