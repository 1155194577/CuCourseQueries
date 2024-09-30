import {
  dBDocumentType,
  dBdocumentSchema,
  dBDocumentStrictType,
  dBdocumentStrictSchema,
  dBcollectionSchema,
  FireBaseQueryType,
} from "../../types/fireBaseQuery";
import { z } from "zod";
import { dbName } from "../../constant/db";
import { addDoc, getDoc, getDocByQuery } from "./typedDocumentOperation";
describe("test typedDocumentOperation", () => {
  it("should add document to firebase", async () => {
    const testDocument: dBDocumentType = dBdocumentSchema.parse({
      dbName: dbName.default,
      colName: "test",
      docName: "testDoc",
    });
    const isSuccessful: boolean = await addDoc(testDocument, { test: "test" });
    expect(isSuccessful).toBe(true);
  });

  it("should fail to add document to firebase", async () => {
    const testDocument: dBDocumentType = dBdocumentSchema.parse({
      dbName: "random_db",
      colName: "test",
      docName: "testDoc",
    });
    const isSuccessful: boolean = await addDoc(testDocument, { test: "test" });
    expect(isSuccessful).toBe(false);
  });

  it("should fetch document from firebase", async () => {
    const testDocument: dBDocumentStrictType = dBdocumentStrictSchema.parse({
      dbName: dbName.default,
      colName: "test",
      docName: "testDoc",
    });
    const data = await getDoc<any>(testDocument);
    expect(data).toEqual({ test: "test" });
  });
  it("should fail to fetch document from firebase", async () => {
    const testDocument: dBDocumentStrictType = dBdocumentStrictSchema.parse({
      dbName: dbName.default,
      colName: "testabc",
      docName: "testDoc",
    });
    const data = await getDoc<any>(testDocument);
    expect(data).toBeUndefined();
  });
  it("should again fail to fetch document from firebase", async () => {
    const testDocument: dBDocumentStrictType = dBdocumentStrictSchema.parse({
      dbName: dbName.default,
      colName: "test",
      docName: "testabc",
    });
    const data = await getDoc<any>(testDocument);
    expect(data).toBeUndefined();
  });

  it("should get doc by query", async () => {
    const testCollection = dBcollectionSchema.parse({
      dbName: dbName.default,
      colName: "test",
    });
    const testQuery: FireBaseQueryType[] = [
      { field: "test", operator: "==", value: "test" },
    ];
    const data = await getDocByQuery<any>(testCollection, testQuery);
    expect(data).toEqual([{ test: "test" }]);
  });
});
