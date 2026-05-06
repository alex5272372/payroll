import { Dispatch, SetStateAction } from 'react'
import { Field, Input, Label } from '@headlessui/react'

const TextField = ({
  name,
  label,
  value,
  setValue,
  placeholder,
  readonly,
}: {
  name: string
  label?: string
  value?: string
  setValue?: Dispatch<SetStateAction<string>>
  placeholder?: string
  readonly?: boolean
}) => {
  return (
    <Field className="flex items-center my-1 mx-2">
      <Label className="text-gray-900">{label || name}:</Label>
      <Input
        name={name}
        type="text"
        value={value}
        placeholder={placeholder}
        className={`ml-2 py-1 px-2 rounded-md border ${readonly ? 'bg-gray-300' : 'bg-gray-100'}`}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValue && setValue(e.target.value)}
        readOnly={readonly}
      />
    </Field>
  )
}

export default TextField
