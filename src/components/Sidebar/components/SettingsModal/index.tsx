'use client';

import Input from "@components/Input";
import Modal from "@components/Modal";
import Spinner from "@icons/Spinner";
import { User } from "@prisma/client";
import axios from "axios";
import { CldUploadButton, CloudinaryUploadWidgetInfo } from "next-cloudinary";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

interface Props {
  currentUser: User;
  isOpen?: boolean;
  onClose: () => void;
}

interface ISettingsForm {
  name: string;
  image: string;
}

function SettingsModal({
  currentUser,
  isOpen,
  onClose,
}: Props) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors }
  } = useForm<ISettingsForm>({
    defaultValues: {
      name: currentUser?.name ?? '',
      image: currentUser?.image ?? ''
    }
  });

  const image = watch('image');

  const handleUpload = useCallback((result: CloudinaryUploadWidgetInfo) => {
    const imageUrl = result.secure_url;
    if (imageUrl) {
      setValue('image', imageUrl);
    }
  }, [setValue]);

  const onSubmit = useCallback(async (values: ISettingsForm) => {
    setIsLoading(true);
    axios.post('/api/settings', values)
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
              Profile
            </h2>
            <div className="mt-1 text-sm leading-6 text-gray-600">
              Edit your public information.
            </div>
            <div className="mt-10 flex flex-col gap-y-8">
              <Input
                type="text"
                label="Name"
                id="name"
                required
                register={register}
                errors={errors}
                disabled={isLoading}
              />
              <div>
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  Photo
                </label>
                <div className="mt-2 flex items-center gap-x-3">
                  <Image
                    width={48}
                    height={48}
                    className="rounded-full object-cover max-h-12"
                    src={image || currentUser?.image || '/images/placeholder.png'}
                    alt="Avatar"
                  />
                  <CldUploadButton
                    options={{ maxFiles: 1 }}
                    uploadPreset="s8uqnooa"
                    onSuccess={(result) => {
                      if (typeof result.info === 'string') {
                        console.warn('Expected CloudinaryUploadWidgetInfo, but got a string:', result);
                        return;
                      }
              
                      if (result.info) {
                        handleUpload(result.info);
                      } else {
                        console.warn('Upload result does not contain expected info:', result);
                      }
                    }}
                  >
                    <div
                      className="flex justify-center rounded-md px-3 py-2 text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 text-black bg-white w-full sm:w-auto"
                    >
                      Change
                    </div>
                  </CldUploadButton>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-6 flex justify-end items-center gap-x-6">
            <button
              onClick={onClose}
              type="button"
              className="flex justify-center rounded-md px-3 py-2 text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 text-black bg-white w-full sm:w-auto"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex justify-center rounded-md px-3 py-2 text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 text-white bg-sky-500 w-full sm:w-auto"
            >
              {isLoading ? (
                <Spinner />
              ) : (
                <div>Save</div>
              )}
            </button>
        
          </div>
        </div>
      </form>
    </Modal>
  );
}

export default SettingsModal;