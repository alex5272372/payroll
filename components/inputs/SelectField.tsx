import { Dispatch, SetStateAction } from 'react'
import { Field, Label, Select } from '@headlessui/react'

const SelectField = <T extends string = string>({
  name,
  label,
  value,
  setValue,
  options,
}: {
  name: string
  label?: string
  value?: T | ''
  setValue?: Dispatch<SetStateAction<T | ''>>
  options: { value: T | ''; label: string }[]
}) => {
  return (
    <Field className="flex items-center my-1 mx-2">
      <Label className="text-gray-900">{label || name}:</Label>
      <Select
        name={name}
        value={value}
        className="ml-2 py-1 px-2 rounded-md border bg-gray-100"
        onChange={(e) => setValue && setValue(e.target.value as T | '')}
      >
        <option value="">-- select --</option>
        {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
      </Select>
    </Field>
  )
}

export default SelectField
