import request from "supertest";
import app from "../app";

describe("Product End-to-End Tests", () => {
  afterAll((done) => {
    setTimeout(() => {
      app.close();
      done();
    }, 1000);
  });

  test("should successfully store a category via API", async () => {
    const mockCategoryData = {
      title: "New Category",
      description: "Description for the new category",
    };

    const response = await request(app)
      .post("/category")
      .send(mockCategoryData);

    expect(response.status).toBe(200);
    expect(response.body.error).toBeUndefined();
  });

  test("should successfully store a brand via API", async () => {
    const mockBrandData = {
      title: "New Brand",
      description: "Description for the new brand",
    };

    const response = await request(app).post("/brand").send(mockBrandData);

    expect(response.status).toBe(200);
    expect(response.body.error).toBeUndefined();
  });

  test("should successfully store a product via API", async () => {
    const mockProductData = {
      title: "New Product",
      description: "Description for the new product",
    };

    const response = await request(app)
      .post("/product")
      .set("brand_id", "")
      .send(mockProductData);

    expect(response.status).toBe(200);
    expect(response.body.error).toBeUndefined();
  });
});
