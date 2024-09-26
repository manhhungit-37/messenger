'use client';

import Input from "@components/Input";
import Modal from "@components/Modal";
import Select from "@components/Select";
import { User } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

interface SelectOption {
  value: string;
  label: string;
}

interface Props {
  users: User[];
  isOpen: boolean;
  onClose: () => void;
}

interface IGroupChatForm {
  name: string;
  members: SelectOption[];
}

function GroupChatModal({
  users,
  isOpen,
  onClose,
}: Props) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    watch,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<IGroupChatForm>({
    defaultValues: {
      name: '',
      members: [],
    }
  });

  const members = watch('members');

  const onSubmit = useCallback((data: IGroupChatForm) => {
    setIsLoading(true);
    axios.post('/api/conversations', {
      ...data,
      isGroup: true,
      members: data.members.map(member => member.value),
    })
    .then(() => {
      router.refresh();
      onClose();
    })
    .catch(() => toast.error('Something went wrong!'))
    .finally(() => setIsLoading(false));
  }, [router, onClose]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Create a group chat
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              Create a chat with more than 2 people.
            </p>
            <div className="mt-10 flex flex-col gap-y-8">
              <Input
                register={register}
                label="Name"
                id="name"
                disabled={isLoading}
                required
                errors={errors}
              />
              <Select
                disabled={isLoading}
                label="Members"
                options={users.map((user) => ({
                  value: user.id,
                  label: user.name ?? '',
                }))}
                onChange={(value) => setValue('members',  [...value], {
                  shouldValidate: true,
                })}
                value={members}
              />
            </div>
          </div>
        </div>
        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            disabled={isLoading}
            onClick={onClose}
            type="button"
            className="flex justify-center rounded-md px-3 py-2 text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 text-black bg-white w-full sm:w-auto"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="flex justify-center rounded-md px-3 py-2 text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 w-full sm:w-auto text-white bg-sky-500"
          >
            Create
          </button>
        </div>
      </form>
    </Modal>
  );
}

export default GroupChatModal;
