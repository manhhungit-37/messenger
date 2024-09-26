'use client';

import useConversation from "@hooks/useConversation";
import axios from "axios";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { HiPaperAirplane, HiPhoto } from "react-icons/hi2";
import MessageInput from "../../../components/MessageInput";
import { CldUploadButton, CloudinaryUploadWidgetInfo } from "next-cloudinary";

interface IFormConversation {
  message: string;
}

function ConversationForm() {
  const { conversationId } = useConversation();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      message: '',
    }
  });

  const onSubmit = useCallback((data: IFormConversation) => {
    setValue('message', '', { shouldValidate: true });
    axios.post('/api/messages', {
      ...data,
      conversationId,
    })
  }, [conversationId, setValue]);

  const handleUpload = useCallback((result: CloudinaryUploadWidgetInfo) => {
    const imageUrl = result.secure_url;
    if (imageUrl) {
      axios.post('/api/messages', {
        image: imageUrl,
        conversationId,
      });
    }
  }, [conversationId]);

  return (
    <div className="px-4 py-4 bg-white border-t flex items-center gap-2 lg:gap-4 w-full">
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
        <HiPhoto size={30} className="text-sky-500" />
      </CldUploadButton>
      <form
        className="flex items-center gap-2 lg:gap-4 w-full"
        onSubmit={handleSubmit(onSubmit)}
      >
        <MessageInput
          id="message"
          register={register}
          errors={errors}
          required
          placeholder="Write a message"
        />
        <button
          type="submit"
          className="rounded-full p-2 bg-sky-500 cursor-pointer hover:bg-sky-600 transition"
        >
          <HiPaperAirplane size={18} className="text-white" />
        </button>
      </form>
    </div>
  );
}

export default ConversationForm;