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
  test("200: GET /api/reviews responds with reviews data", () => {
    return request(app)
      .get("/api/reviews")
      .expect(200)
      .then(({ body }) => {
        body.revData.length > 0;
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

describe("get /api/reviews/4", () => {
  test("200: /api/reviews/4 responds with review data of id=4", () => {
    return request(app)
      .get("/api/reviews/4")
      .expect(200)
      .then(({ body }) => {
        expect(body.revData.length).toBe(1);
        expect(body.revData[0].review_id).toBe(4);
      });
  });
  test("200: GET /api/reviews responds with reviews data", () => {
    return request(app)
      .get("/api/reviews/4")
      .expect(200)
      .then(({ body }) => {
        expect(body.revData[0]).toEqual(
          expect.objectContaining({
            review_id: expect.any(Number),
            title: expect.any(String),
            review_body: expect.any(String),
            designer: expect.any(String),
            review_img_url: expect.any(String),
            votes: expect.any(Number),
            category: expect.any(String),
            owner: expect.any(String),
            created_at: expect.any(String),
          })
        );
      });
  });
  test("404: /api/reviews/999 responds with err since it does not exist", () => {
    return request(app)
      .get("/api/reviews/999")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("review_id not found");
      });
  });
  test("400: /api/reviews/banana responds with err since it does not exist", () => {
    return request(app)
      .get("/api/reviews/banana")
      .expect(400)
      .then(({ body }) => {
        expect(body).toHaveProperty("msg", "Bad Request");
      });
  });
});

describe("get /api/reviews/2/comments", () => {
  test("200: /api/reviews/2/comments responds with an array of comments data of id=2", () => {
    return request(app)
      .get("/api/reviews/2/comments")
      .expect(200)
      .then(({ body }) => {
        expect(body.revData.length).toBe(3);
        console.log(body);
        expect(body.revData[0].review_id).toBe(2);
      });
  });
  test("200: /api/reviews/2/comments responds with an array of comments data of id=2", () => {
    return request(app)
      .get("/api/reviews/2/comments")
      .expect(200)
      .then(({ body }) => {
        expect(body.revData[0]).toEqual(
          expect.objectContaining({
            comment_id: expect.any(Number),
            votes: expect.any(Number),
            created_at: expect.any(String),
            author: expect.any(String),
            body: expect.any(String),
            review_id: expect.any(Number),
          })
        );
      });
  });
  test("200: GET /api/reviews/2/comments sorts date by ascending order.", () => {
    return request(app)
      .get("/api/reviews/2/comments")
      .expect(200)
      .then(({ body }) => {
        const copyBody = [...body.revData];
        const sortedComments = copyBody.sort((commentA, commentB) => {
          return commentA.date - commentB.date;
        });
        console.log(sortedComments);
        console.log(body.revData);
        expect(body.revData).toEqual(sortedComments);
      });
  });
  test("200: /api/reviews/4/comments responds with an empty array of comments data of id=4", () => {
    return request(app)
      .get("/api/reviews/4/comments")
      .expect(200)
      .then(({ body }) => {
        expect(body.revData.length).toBe(0);
      });
  });
  test("404: /api/reviews/999 responds with err since it does not exist", () => {
    return request(app)
      .get("/api/reviews/999")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("review_id not found");
      });
  });
  test("400: /api/reviews/banana responds with err since it does not exist", () => {
    return request(app)
      .get("/api/reviews/banana")
      .expect(400)
      .then(({ body }) => {
        expect(body).toHaveProperty("msg", "Bad Request");
      });
  });
});

// no comments test review_id=4 has no comments adjust the test for ittt
