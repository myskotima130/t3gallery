import { db } from "~/server/db";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const images = await db.query.images.findMany({
    orderBy: (model, { desc }) => desc(model.createdAt),
  });

  return (
    <main className="">
      <div className="flex flex-wrap gap-4">
        {images.map((image) => (
          <div className="flex w-48 flex-col" key={image.id}>
            <img src={image.url} alt={image.name} width={200} height={200} />
            <div>{image.name}</div>
          </div>
        ))}
      </div>
    </main>
  );
}
