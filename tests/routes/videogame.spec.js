/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require("chai");
const session = require("supertest-session");
const app = require("../../src/app.js");
const { Videogame, conn } = require("../../src/db.js");

const agent = session(app);
const videogame = {
  name: "Super Mario Bros",
  description: "my bio",
  image: "mario.jpg",
  release_date: "2024-05-10",
  rating: 10,
  genres: "[10,2]",
  platforms: "xbox",
};

describe("Videogame routes", () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error("Unable to connect to the database:", err);
    })
  );
  beforeEach(() =>
    Videogame.sync({ force: true }).then(() => Videogame.create(videogame))
  );

  describe("GET /videogames", () => {
    it("should get 200", () => agent.get("/videogames").expect(200));
  });

  describe("GET /videogames?name=name", () => {
    it("should get 200", () => agent.get("/videogames?name=super").expect(200));
  });
});
