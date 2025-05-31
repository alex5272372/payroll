import { Dispatch, SetStateAction, useState } from 'react'
import { Field, Input, Label } from '@headlessui/react'
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'

const PasswordField = ({
  name,
  label,
  setPassword
}: {
  name?: string
  label?: string
  setPassword: Dispatch<SetStateAction<string>>
}) => {
  const [showPassword, setShowPassword] = useState(false)

  return <Field className="flex items-center">
    <Label className="text-gray-100">{label || 'Password'}:</Label>
    <Input
      name={name || 'password'}
      type={showPassword ? 'text' : 'password'}
      className="ml-2 py-1 px-2 rounded-md bg-gray-100"
      onChange={(e) => setPassword(e.target.value)}
    />
    {!showPassword && <EyeIcon
      className="h-6 ml-2 cursor-pointer bg-gray-700 text-gray-300 hover:bg-gray-500"
      onClick={() => setShowPassword(true)}
    />}
    {showPassword && <EyeSlashIcon
      className="h-6 ml-2 cursor-pointer bg-gray-700 text-gray-300 hover:bg-gray-500"
      onClick={() => setShowPassword(false)}
    />}
  </Field>
}

export default PasswordField
