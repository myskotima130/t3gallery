import { auth, clerkClient } from "@clerk/nextjs/server";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { db } from "~/server/db";
import { images } from "~/server/db/schema";
import { ratelimit } from "../../../server/ratelimit";

const f = createUploadthing();

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  imageUploader: f({ image: { maxFileSize: "4MB", maxFileCount: 20 } })
    // Set permissions and file types for this FileRoute
    .middleware(async ({ req }) => {
      const user = auth();
      // eslint-disable-next-line @typescript-eslint/only-throw-error
      if (!user.userId) throw new UploadThingError("Unauthorized");

      const fullUserData = await clerkClient.users.getUser(user.userId);

      if (fullUserData?.privateMetadata?.["can-upload"] !== true) {
        // eslint-disable-next-line @typescript-eslint/only-throw-error
        throw new UploadThingError("Useer doesn't have uplaod permission");
      }

      const { success } = await ratelimit.limit(user.userId);
      // eslint-disable-next-line @typescript-eslint/only-throw-error
      if (!success) throw new UploadThingError("Rate limit exceeded");

      return { userId: user.userId };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // This code RUNS ON YOUR SERVER after upload
      console.log("Upload complete for userId:", metadata.userId);

      await db.insert(images).values({
        name: file.name,
        url: file.url,
        userId: metadata.userId,
      });

      return { uploadedBy: metadata.userId };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
