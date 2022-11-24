import createPath, { CreatePathProps } from "../../src/utility/createPath";

const baseUrl = "http://api-entity.com";

type Expectation = {
  input: CreatePathProps<any>;
  url: string;
};

const expectations: Expectation[] = [
  {
    input: {
      entity: "",
      path: "",
      baseUrl: "",
    },
    url: "/",
  },
  {
    input: {
      entity: "",
      path: "",
      baseUrl,
    },
    url: `${baseUrl}/`,
  },
  {
    input: {
      entity: "posts",
      path: "",
      baseUrl,
    },
    url: `${baseUrl}/posts`,
  },
  {
    input: {
      entity: "posts",
      path: "/top",
      baseUrl,
    },
    url: `${baseUrl}/posts/top`,
  },
  {
    input: {
      entity: "posts",
      path: "/top",
      baseUrl,
      params: {
        id: 1,
      },
    },
    url: `${baseUrl}/posts/top`,
  },
  {
    input: {
      entity: "posts",
      path: "/:id",
      baseUrl,
      params: {
        id: 1,
      },
    },
    url: `${baseUrl}/posts/1`,
  },
  {
    input: {
      entity: "posts",
      path: "/:id/comments/:commentId",
      baseUrl,
      params: {
        id: 1,
        commentId: 50,
      },
    },
    url: `${baseUrl}/posts/1/comments/50`,
  },
];

describe("createPath", () => {
  test.each(expectations)("Should get url: $url", ({ input, url }) => {
    const createNewPath = createPath(input);
    expect(createNewPath).toBe(url);
  });
});
