import { FieldErrors, FieldValues, Path, UseFormRegister } from "react-hook-form";

interface Props<T extends FieldValues>  {
  id: Path<T>;
  placeholder?: string;
  type?: string;
  required?: boolean;
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
}

function MessageInput<T extends FieldValues> ({
  id,
  placeholder,
  type,
  required,
  register,
  errors,
}: Props<T>) {
  return (
    <div className="relative w-full">
      <input
        id={id}
        type={type}
        autoComplete={id}
        {...register(id, { required })}
        placeholder={placeholder}
        className="text-black font-light px-4 py-2 bg-neutral-100 w-full rounded-full focus:outline-none"
      />
    </div>
  );
}

export default MessageInput;