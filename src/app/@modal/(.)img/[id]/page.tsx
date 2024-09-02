import React from "react";
import { getImage } from "~/server/queries";

export default async function PhotoModal({
  params,
}: {
  params: { id: string };
}) {
  const idAsNumber = Number(params.id);
  if (isNaN(idAsNumber)) throw new Error("Invalid id");

  const image = await getImage(idAsNumber);

  return (
    <div>
      <img src={image.url} alt={image.name} className="w-96" />
    </div>
  );
}
