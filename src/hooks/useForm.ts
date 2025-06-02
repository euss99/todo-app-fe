import { type ChangeEvent, useState } from "react";

type UseFormReturn<T> = {
  form: T;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  setForm: React.Dispatch<React.SetStateAction<T>>;
};

export function useForm<T>(initialValues: T): UseFormReturn<T> {
  const [form, setForm] = useState<T>(initialValues);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return { form, handleChange, setForm };
}