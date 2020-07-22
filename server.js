import { Server } from 'boardgame.io/server';
import path from 'path';
import serve from 'koa-static';
import { Hanafuda } from './src/game/Game';

const server = Server({ games: [Hanafuda] });
const PORT = process.env.PORT || 8000;

const frontEndAppBuildPath = path.resolve(__dirname, './build');
server.app.use(serve(frontEndAppBuildPath));

server.run(PORT, () => {
    server.app.use(
        async (ctx, next) => 
        await serve(frontEndAppBuildPath)(
            Object.assign(ctx, { path: 'index.html' }),
            next
        )
    );
});
