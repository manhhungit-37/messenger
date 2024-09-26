import Modal from "@components/Modal";
import Image from "next/image";

interface Props {
  src?: string;
  isOpen: boolean;
  onClose: () => void;
}

function ImageModal({
  src,
  isOpen,
  onClose,
}: Props) {
  if (!src) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="w-80 h-80">
        <Image
          alt="Image"
          className="object-cover"
          fill
          src={src}
        />
      </div>
    </Modal>
  );
}

export default ImageModal;