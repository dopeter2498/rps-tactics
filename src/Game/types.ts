export type Player = {
  socketId: string;
  username: string;
  healthPoints: number | undefined;
  opponent: Player | undefined;
  ready: boolean;
  leader: boolean;
};
