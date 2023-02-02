const { describe, test, expect } = require("@jest/globals");
const aws = require("aws-sdk");
aws.config.update({
  region: "us-east-1",
});
const requestMock = require("./../mocks/request.json");
const { main } = require("../../src");

describe("image analyser test suite", () => {
  test("it should analyse successfuly the image returning the results", async () => {
    const finalText = [
      "100.00% de ser do tipo Golden Retriever",
      "100.00% de ser do tipo cão",
      "100.00% de ser do tipo canino",
      "100.00% de ser do tipo animal de estimação",
      "100.00% de ser do tipo animal",
      "100.00% de ser do tipo mamífero",
    ].join("\n");

    const expected = {
      statusCode: 200,
      body: `A imagem tem \n`.concat(finalText),
    };

    const result = await main(requestMock);
    expect(result).toStrictEqual(expected);
  });
  test("given an empty queryString it should return status code 400", async () => {
    const expected = {
      statusCode: 400,
      body: "an Image is required !!",
    };

    const result = await main({ queryStringParameters: {} });
    expect(result).toStrictEqual(expected);
  });
  test("given an invalid url it should return 500", async () => {
    const expected = {
      statusCode: 500,
      body: "Internal server error",
    };

    const result = await main({
      queryStringParameters: {
        imageUrl: "test",
      },
    });

    expect(result).toStrictEqual(expected);
  });
});
