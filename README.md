# RPS Tactics
Developers:
------
- [Peter Do](https://github.com/dopeter2498)
- [Kenneth Pham](https://github.com/kennethpham)

Built with:
------
- [React.js](https://reactjs.org/) using Typescript
- [Socket.IO](https://socket.io/) package for client and server connection
- Bootstrapped with [Vite](https://vitejs.dev/)

Rules
------
There is a lobby of 8 players, where each player will be matched up randomly with another player(unless there are odd active players). This pairing will be one timed round of rps and the loser will lose 1 hp. A new matchup will be created after this one and this will continue until there is at most one player with 1hp or more.

Current Development
------
- Currently only one game is playable for one lobby at a time
- Adding support for multiple games per lobby
- Adding support for multiple lobbies per server
