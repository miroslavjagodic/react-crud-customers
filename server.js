const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();
const cors = require("cors");

server.use(middlewares);
server.use(router);
server.use(
  cors({
    origin: '*'
  })
);
server.options("*", cors());
server.listen(8000, () => {
  console.log("JSON Server is running");
});