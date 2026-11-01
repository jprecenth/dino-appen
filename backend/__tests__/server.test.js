import request from "supertest";
import app from "../server.js"
import { test, expect } from "vitest";

test("Healthy endpoint gives correct response", async () => {
    const response = await request(app).get("/healthy");
    expect(response.status).toBe(200);
    expect(response.text).toBe("Port up and running.");
})

test("Can create account", async () => {
    const data = {username: "testusername", password: "testpassword"}
    const response = await request(app).post("/users").send(data);
    
    expect(response.status).toBe(201)

})