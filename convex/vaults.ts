import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { Doc, Id } from "./_generated/dataModel";
import { threadId } from "worker_threads";

export const archive = mutation({
    args: { id: v.id("vaults") },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();

        if (!identity) {
            throw new Error("NOT LOGGED IN");
        }

        const userId = identity.subject;
        const existingDocument = await ctx.db.get(args.id);
        if (!existingDocument) {
            throw new Error("NOT FOUND..");
        }
        if (existingDocument.userId !== userId) {
            throw new Error("NOT AUTHORIZED")
        }

        const recursiveArchive = async (documentId: Id<"vaults">) => {
            const children = await ctx.db
                .query("vaults")
                .withIndex("by_user_parent", (q) => (
                    q
                        .eq("userId", userId)
                        .eq("parentDocument", documentId)
                ))
                .collect();

            for (const child of children) {
                await ctx.db.patch(child._id, {
                    isArchived: true,
                });

                await recursiveArchive(child._id);
            }

        }

        const vault = await ctx.db.patch(args.id, {
            isArchived: true,
        });

        recursiveArchive(args.id);
        return vault;
    }
});

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
});
export const getTrash = query({
    handler: async (context) => {
        const identity = await context.auth.getUserIdentity()

        if (!identity) {
            throw new Error('Not authenticated')
        }

        const userId = identity.subject

        const vaults = await context.db.query('vaults')
            .withIndex('by_user', q => q.eq('userId', userId))
            .filter(q => q.eq(q.field('isArchived'), true))
            .order('desc')
            .collect()

        return vaults;
    }
});

export const restore = mutation({
    args: { id: v.id('vaults') },
    handler: async (context, args) => {
        const identity = await context.auth.getUserIdentity()

        if (!identity) {
            throw new Error('Not authenticated')
        }

        const userId = identity.subject

        const existingDocument = await context.db.get(args.id)

        if (!existingDocument) {
            throw new Error('Not found')
        }

        if (existingDocument.userId !== userId) {
            throw new Error("Unauthorized")
        }

        const recursiveRestore = async (documentId: Id<'vaults'>) => {
            const children = await context.db.query('vaults')
                .withIndex('by_user_parent', q => (
                    q.eq('userId', userId).eq('parentDocument', documentId)
                ))
                .collect()

            for (const child of children) {
                await context.db.patch(child._id, {
                    isArchived: false
                })

                await recursiveRestore(child._id)
            }
        }

        const options: Partial<Doc<'vaults'>> = {
            isArchived: false
        }

        if (existingDocument.parentDocument) {
            const parent = await context.db.get(existingDocument.parentDocument)
            if (parent?.isArchived) {
                options.parentDocument = undefined
            }
        }

        const vault = await context.db.patch(args.id, options)

        recursiveRestore(args.id)

        return vault;
    }
});
export const remove = mutation({
    args: { id: v.id('vaults') },
    handler: async (context, args) => {

        const identity = await context.auth.getUserIdentity()

        if (!identity) {
            throw new Error('Not authenticated')
        }

        const userId = identity.subject

        const existingDocument = await context.db.get(args.id)

        if (!existingDocument) {
            throw new Error('Not found')
        }

        if (existingDocument.userId !== userId) {
            throw new Error("Unauthorized")
        }

        const vault = await context.db.delete(args.id)

        return vault;
    }
});
export const getSearch = query({
    handler: async (context) => {

        const identity = await context.auth.getUserIdentity()

        if (!identity) {
            throw new Error('Not authenticated')
        }

        const userId = identity.subject

        const vaults = await context.db.query('vaults')
            .withIndex('by_user', q => q.eq('userId', userId))
            .filter(q => q.eq(q.field('isArchived'), false))
            .order('desc')
            .collect()

        return vaults;
    }
})
export const getById = query({
    args: { documentId: v.id('vaults') },
    handler: async (context, args) => {
        const identity = await context.auth.getUserIdentity()

        const document = await context.db.get(args.documentId)

        if (!document) {
            throw new Error("Not found")
        }

        if (document.isPublished && !document.isArchived) {
            return document
        }

        if (!identity) {
            throw new Error("Not authenticated")
        }

        const userId = identity.subject

        if (document.userId !== userId) {
            throw new Error("Unauthorized")
        }

        return document
    }
})


export const update = mutation({
    args: {
        id: v.id('vaults'),
        title: v.optional(v.string()),
        content: v.optional(v.string()),
        coverImage: v.optional(v.string()),
        icon: v.optional(v.string()),
        isPublished: v.optional(v.boolean())
    },
    handler: async (context, args) => {
        const identity = await context.auth.getUserIdentity()

        if (!identity) {
            throw new Error("Unauthenticated")
        }

        const userId = identity.subject

        const { id, ...rest } = args

        const existingDocument = await context.db.get(args.id)

        if (!existingDocument) {
            throw new Error("Not found")
        }

        if (existingDocument.userId !== userId) {
            throw new Error('Unauthorized')
        }

        const document = await context.db.patch(args.id, {
            ...rest
        })

        return document
    }
})
export const removeIcon = mutation({
    args: { id: v.id('vaults') },
    handler: async (context, args) => {
        const identity = await context.auth.getUserIdentity()

        if (!identity) {
            throw new Error("Unauthenticated")
        }

        const userId = identity.subject

        const existingDocument = await context.db.get(args.id)

        if (!existingDocument) {
            throw new Error('Not found')
        }

        if (existingDocument.userId !== userId) {
            throw new Error("Unauthorized")
        }

        const document = await context.db.patch(args.id, {
            icon: undefined
        })

        return document
    }
})
export const removeCoverImage = mutation({
    args: { id: v.id('vaults') },
    handler: async (context, args) => {
        const identity = await context.auth.getUserIdentity()

        if (!identity) {
            throw new Error("Unauthenticated")
        }

        const userId = identity.subject

        const existingDocument = await context.db.get(args.id)

        if (!existingDocument) {
            throw new Error('Not found')
        }

        if (existingDocument.userId !== userId) {
            throw new Error("Unauthorized")
        }

        const document = await context.db.patch(args.id, {
            coverImage: undefined
        })

        return document
    }
})