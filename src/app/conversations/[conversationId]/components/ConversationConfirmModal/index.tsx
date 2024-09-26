'use client';

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import useConversation from "@hooks/useConversation";
import axios from "axios";
import toast from "react-hot-toast";
import Modal from "@components/Modal";
import { FiAlertTriangle } from "react-icons/fi";
import { DialogTitle } from "@headlessui/react";

interface Props {
  isOpen?: boolean;
  onClose: () => void;
}

function ConversationConfirmModal({
  isOpen,
  onClose,
}: Props) {
  const router = useRouter();

  const { conversationId } = useConversation();
  const [isLoading, setIsLoading] = useState(false);

  const onDelete = useCallback(() => {
    setIsLoading(true);
    axios.delete(`/api/conversations/${conversationId}`)
    .then(() => {
      onClose();
      router.push('/conversations');
      router.refresh();
    })
    .catch(() => {
      toast.error('Something went error!')
    })
    .finally(() => setIsLoading(false));
  }, [conversationId, onClose, router]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="sm:flex sm:items-start">
        <div className="mx-auto flex w-12 h-12 flex-shrink-0 justify-center items-center rounded-full bg-red-100 sm:mx-0 sm:w-10 sm:h-10">
          <FiAlertTriangle className="w-6 h-6 text-red-600" />
        </div>
        <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
          <DialogTitle
            as="h3"
            className="text-base font-semibold leading-6 text-gray-900"
          >
            Delete Conversation
          </DialogTitle>
          <div className="mt-2">
            <div className="text-sm text-gray-500">
              Are you sure to delete this conversation? This action can&apos;t be undone.
            </div>
          </div>
        </div>
      </div>
      <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
        <button
          disabled={isLoading}
          onClick={onDelete}
          className="flex justify-center rounded-md px-3 py-2 text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 text-white bg-red-500 w-full sm:w-auto"
        >
          Delete
        </button>
        <button
          type="button"
          onClick={onClose}
          className="flex justify-center rounded-md px-3 py-2 text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 text-black bg-white w-full sm:w-auto"
        >
          Cancel
        </button>
      </div>
    </Modal>
  );
}

export default ConversationConfirmModal;