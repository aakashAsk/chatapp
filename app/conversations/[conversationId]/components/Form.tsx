'use client';

import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import useConversation from "../../../hooks/useConversation";
import axios from "axios";
import { HiPhoto } from "react-icons/hi2";
import MessageInput  from './MessageInput';
import { HiPaperAirplane } from "react-icons/hi";
import { CldUploadButton } from "next-cloudinary";

const Form = () => {
    const { conversationId } = useConversation();
    
    const { register, handleSubmit, setValue, formState: {errors} } = useForm<FieldValues>({
        defaultValues: {
            message: ""
        }
    });

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setValue("message", "", { shouldValidate: true });
        axios.post("/api/messages", {...data, conversationId})
    }

    const handleUpload = (result: any) => {
        console.log(result);
        axios.post('/api/messages', {
            image: result?.info?.secure_url,
            conversationId
        });
    }

    return (
        <div className="py-4 px-4 bg-white border-t flex items-center gap-2 lg:gap-4 w-full"
        >
            <CldUploadButton options={{maxFiles: 1}}  uploadPreset="ntpqf0ct">
                <HiPhoto size={30} className="text-sky-500 cursor-pointer" />
            </CldUploadButton>
            <form onSubmit={handleSubmit(onSubmit)} className="flex w-full items-center gap-2 lg:gap-4 ">
                <MessageInput  placeholder="Enter Here"
                                id="message"
                                type="text"
                                required
                                register={register}
                                errors={errors} />
                <button type="submit" className="rounded-full p-2  bg-sky-500 cursor-pointer hover:bg-sky-600 transition" >
                    <HiPaperAirplane  className="text-white rotate-90" size={18}/>
                </button>
            </form>
        </div>
    )
}

export default Form;