import app from "./src/server";
import port from "./src/config/serverConfig";

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
