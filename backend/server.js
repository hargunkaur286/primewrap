import { config } from "dotenv";
config({ path: "./.env" });

console.log("Loaded PORT:", process.env.PORT);

import { app } from "./app.js";

app.listen(process.env.PORT, () => {
  console.log(`Server listening on port ${process.env.PORT}`);
});
