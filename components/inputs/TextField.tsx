import { Dispatch, SetStateAction } from 'react'
import { Field, Input, Label } from '@headlessui/react'

const TextField = ({
  name,
  label,
  value,
  setValue,
  placeholder,
  disabled,
}: {
  name?: string
  label?: string
  value?: string
  setValue: Dispatch<SetStateAction<string>>
  placeholder?: string
  disabled?: boolean
}) => {
  return (
    <Field className="flex items-center my-1 mx-2">
      <Label className="text-gray-900">{label || 'Text'}:</Label>
      <Input
        name={name || 'text'}
        type="text"
        value={value}
        placeholder={placeholder}
        className="ml-2 py-1 px-2 rounded-md border bg-gray-100"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
        disabled={disabled}
      />
    </Field>
  )
}

export default TextField
