import app from "./src/server.js";
import port from "./src/config/serverConfig.js";

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
