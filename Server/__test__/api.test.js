const request = require("supertest");
const { app, server } = require("../index");

describe("API Endpoints", () => {
  // Test the /crypto endpoint
  test("GET /crypto should return 200 OK", async () => {
    const response = await request(app).get("/crypto");
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("topCryptos");
    expect(response.body).toHaveProperty("supportedCurrencies");
  });

  // Test the /convert endpoint
  test("GET /convert should return 200 OK", async () => {
    const response = await request(app).get("/convert").query({
      sourceCrypto: "bitcoin",
      amount: 1,
      targetCurrency: "usd",
    });
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("sourceCrypto", "bitcoin");
    expect(response.body).toHaveProperty("amount", "1");
    expect(response.body).toHaveProperty("targetCurrency", "usd");
    expect(response.body).toHaveProperty("convertedAmount");
  });
});
afterAll((done) => {
  // Close the server after all tests have completed
  server.close(done);
});
