import fireBaseKey from "../../src/config/firebaseConfig.js";
import port from "../../src/config/serverConfig.js";
import dotenv from "dotenv";
dotenv.config();
test("PORT should be defined and is string", () => {
  expect(port).toBeDefined();
  expect(typeof port).toBe("string");
});

test("firebaseKey should be defined and every value are defined", () => {
  const values = Object.values(fireBaseKey);
  for (const value of values) {
    expect(value).toBeDefined();
  }
});
