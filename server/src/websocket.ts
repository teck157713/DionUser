import { WebSocket, WebSocketServer } from "ws";
import { Server } from "http";
import { getUID } from "./middlewares/token.middleware";

export const sockets: {
    [key: string]: WebSocket
} = {};

export const initWebSocket = (server: Server) => {
    const wss = new WebSocketServer({ noServer: true });

    wss.on("connection", async (ws, req) => {
        try {
            const uid = await getUID(req);
            sockets[uid] = ws;

            ws.on("close", () => {
                delete sockets[uid];
            });
    
            ws.on("message", (data) => {
                console.log(JSON.parse(data.toString()))
                ws.send(data);
            });
        }
        catch {
            ws.close();
        }
    });
    
    server.on('upgrade', function (request, socket, head) {
        try {
            wss.handleUpgrade(request, socket, head, (ws) => {
                wss.emit('connection', ws, request);
            });
        } catch (err) {
            console.log('Socket upgrade failed', err);
            socket.destroy();
        }
    });
}