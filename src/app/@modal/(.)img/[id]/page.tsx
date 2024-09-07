import { Modal } from "./modal";
import FullPageImageView from "~/components/full-image-page";

export default function PhotoModal({ params }: { params: { id: string } }) {
  const idAsNumber = Number(params.id);
  if (isNaN(idAsNumber)) throw new Error("Invalid id");

  return (
    <Modal>
      <FullPageImageView id={idAsNumber} />
    </Modal>
  );
}
