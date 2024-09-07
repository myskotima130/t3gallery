import React from "react";
import { getImage } from "~/server/queries";

export default async function FullPageImageView(props: { id: number }) {
  const image = await getImage(props.id);

  return (
    <div className="flex h-full w-full min-w-0">
      <div className="flex min-w-[80%] flex-shrink items-center justify-center">
        <img
          src={image.url}
          alt={image.name}
          className="max-h-96 flex-shrink-0 object-contain"
        />
      </div>

      <div className="flex w-48 flex-col border-l">
        <div className="text-xl font-bold">{image.name}</div>
      </div>
    </div>
  );
}
