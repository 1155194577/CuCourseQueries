import fireBaseKey from "./fireBaseKeyConfig";
import {
  FireBaseKeyType,
  FireBaseKeySchema,
  PortType,
  portSchema,
} from "../types/config";
import port from "./serverConfig";
describe("test fireBaseKeyConfig", () => {
  it("should return the correct private key", async () => {
    const result = FireBaseKeySchema.safeParse(fireBaseKey);
    expect(result.success).toBe(true);
  });

  it("should return valid port", async () => {
    expect(typeof port).toBe("string");
    expect(port).toBe("2001");
    expect(portSchema.safeParse(port).success).toBe(true);
  });
});
