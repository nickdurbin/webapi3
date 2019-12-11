const postRoutes = require("./posts/postRouter");
const userRoutes = require("./users/userRouter");

module.exports = server => {
  server.use("/api/posts", postRoutes);
  server.use("/api/users", userRoutes);
};