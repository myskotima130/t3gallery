import React from "react";

export default function PhotoModal({ params }: { params: { id: string } }) {
  return <div>{params.id}</div>;
}
