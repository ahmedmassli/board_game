const request = require("supertest");
const app = require("../app");
const connection = require("../db/connection");
const seed = require("../db/seeds/seed");
const {
  categoryData,
  commentData,
  reviewData,
  userData,
} = require("../db/data/test-data/index");

beforeEach(() => {
  return seed({ categoryData, commentData, reviewData, userData });
});

afterAll(() => {
  return connection.end();
});

describe("app", () => {
  describe("get/api", () => {
    test("200: GET /api responds with message all ok here", () => {
      return request(app)
        .get("/api")
        .expect(200)
        .then((response) => {
          expect(response.body.msg).toBe("all ok here");
        });
    });
  });
  describe("get /api/categories", () => {
    test("200: GET /api/categories responds with categories data", () => {
      return request(app)
        .get("/api/categories")
        .expect(200)
        .then(({ body }) => {
          expect(body.catogData.length).toBe(4);
        });
    });
    describe("get /api/categories", () => {
      test("200: GET /api/categories responds with categories data", () => {
        return request(app)
          .get("/api/categories")
          .expect(200)
          .then(({ body }) => {
            expect.objectContaining({
              slug: expect.any(String),
              description: expect.any(String),
            });
          });
      });
    });
  });
});
