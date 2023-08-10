import { AnyObject } from "@/interface";
import { useMemo, useState } from "react";

interface Rule<KeyType> {
  key: KeyType;
  name?: string;
  allowEmpty?: boolean;
  validator?: (value: any) => void;
}

interface UserFormProps<
  ValueKeys extends string | number | symbol = string,
  FormValue extends Record<ValueKeys, any> = Record<ValueKeys, any>
> {
  initialValue: FormValue;
  rules?: Rule<ValueKeys>[];
  onSubmit?: (formValue: FormValue) => void;
}

export const useForm = <ValueType extends AnyObject = AnyObject>({
  initialValue,
  onSubmit,
  rules
}: UserFormProps<keyof ValueType, ValueType>) => {
  const [formValue, setFormValue] = useState<ValueType>(initialValue);

  const initialHint = useMemo(
    () =>
      Object.keys(initialValue).reduce<Record<keyof ValueType, string>>(
        (acc, initialValueKey) => ({ ...acc, [initialValueKey]: "" }),
        {} as Record<keyof ValueType, string>
      ),
    [initialValue]
  );
  const [formHint, setFormHint] =
    useState<Record<keyof ValueType, string>>(initialHint);

  const handleSubmit = () => {
    let validateResult = rules?.reduce<Record<keyof ValueType, string>>(
      (currentError, { key, name, allowEmpty = true, validator }) => {
        try {
          if (!allowEmpty && formValue[key] === "") {
            throw new Error(`${name ?? String(key)}不能為空白喔！`);
          }
          if (validator) {
            validator(formValue[key]);
          }
          return currentError;
        } catch (error) {
          return {
            ...currentError,
            [key]: (error as { message: string }).message
          };
        }
      },
      {} as Record<keyof ValueType, string>
    );

    if (!validateResult || Object.keys(validateResult).length === 0) {
      onSubmit?.(formValue);
    } else {
      setFormHint(validateResult);
    }
  };

  return {
    formValue,
    onFromChange: ({ key, value }: { key: keyof ValueType; value: any }) =>
      setFormValue((previousFrom) => ({ ...previousFrom, [key]: value })),

    formHint,
    resetFromHint: (key?: keyof ValueType) => {
      setFormHint((prevHint) =>
        key ? { ...prevHint, [key]: "" } : initialHint
      );
    },

    onSubmit: handleSubmit
  };
};
