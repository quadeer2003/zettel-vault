import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { Doc, Id } from "./_generated/dataModel";
import { threadId } from "worker_threads";

export const archive = mutation({
    args:{id: v.id("vaults")},
    handler:async(ctx,args)=>{
        const identity = await ctx.auth.getUserIdentity();

        if (!identity) {
            throw new Error("NOT LOGGED IN");
        }

        const userId = identity.subject;
        const existingDocument = await ctx.db.get(args.id);
        if(!existingDocument){
            throw new Error("NOT FOUND..");
        }
        if(existingDocument.userId!== userId){
            throw new Error("NOT AUTHORIZED")
        }
        const vault = await ctx.db.patch(args.id,{
            isArchived: true,
        });
        return vault;
    }
})

export const getSidebar = query({
    args: {
        parentDocument: v.optional(v.id("vaults"))
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();

        if (!identity) {
            throw new Error("NOT LOGGED IN");
        }

        const userId = identity.subject;
        const vaults = await ctx.db
            .query("vaults")
            .withIndex("by_user_parent", (q) =>
                q
                    .eq("userId", userId)
                    .eq("parentDocument", args.parentDocument)

            )
            .filter((q) =>
                q.eq(q.field("isArchived"), false)
            )
            .order("desc")
            .collect();
            return vaults;
    },
});
export const create = mutation({
    args: {
        title: v.string(),
        parentDocument: v.optional(v.id("vaults"))
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();

        if (!identity) {
            throw new Error("Not allowed");
        }
        const userId = identity.subject;
        const vault = await ctx.db.insert("vaults", {
            title: args.title,
            parentDocument: args.parentDocument,
            userId,
            isArchived: false,
            isPublished: false,
        });
        return vault;
    }
})