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
            expect(body.catogData[0]).toEqual(
              expect.objectContaining({
                slug: expect.any(String),
                description: expect.any(String),
              })
            );
          });
      });
    });
  });
});

describe("get /api/reviews", () => {
  test("200: GET /api/reviews responds with reviews data", () => {
    return request(app)
      .get("/api/reviews")
      .expect(200)
      .then(({ body }) => {
        expect(body.revData.length).toBe(13);
      });
  });
  describe("get /api/reviews", () => {
    test("200: GET /api/reviews responds with reviews data", () => {
      return request(app)
        .get("/api/reviews")
        .expect(200)
        .then(({ body }) => {
          expect(body.revData[0]).toEqual(
            expect.objectContaining({
              owner: expect.any(String),
              title: expect.any(String),
              review_id: expect.any(Number),
              category: expect.any(String),
              review_img_url: expect.any(String),
              created_at: expect.any(String),
              votes: expect.any(Number),
              designer: expect.any(String),
              comment_count: expect.any(Number),
            })
          );
        });
    });
    test("200: GET /api/reviews responds with reviews data", () => {
      return request(app)
        .get("/api/reviews")
        .expect(200)
        .then(({ body }) => {
          body.revData.forEach((element) =>
            expect(element).toEqual(
              expect.objectContaining({
                owner: expect.any(String),
                title: expect.any(String),
                review_id: expect.any(Number),
                category: expect.any(String),
                review_img_url: expect.any(String),
                created_at: expect.any(String),
                votes: expect.any(Number),
                designer: expect.any(String),
                comment_count: expect.any(Number),
              })
            )
          );
        });
    });

    test("200: GET /api/reviews sorts date by descending order.", () => {
      return request(app)
        .get("/api/reviews")
        .expect(200)
        .then(({ body }) => {
          const copyBody = [...body.revData];
          const sortedReviews = copyBody.sort((reviewA, reviewB) => {
            return reviewB.date - reviewA.date;
          });
          expect(body.revData).toEqual(sortedReviews);
        });
    });
  });
});

("testpush");
