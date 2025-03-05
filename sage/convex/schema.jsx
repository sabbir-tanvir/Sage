import { defineSchema, defineTable } from "convex/schema";
import { v } from "convex/server";

export default defineSchema({
    users: defineTable({
        name: v.string(),
        email: v.string(),
        picture: v.string(),
        uid: v.string(),
    })
})