import { Dispatch, SetStateAction } from 'react'
import { CheckIcon, XMarkIcon } from '@heroicons/react/24/outline'

const PasswordPolicyItem = ({
  children,
  isValid
}: {
  children: React.ReactNode
  isValid: boolean
}) => {
  return (
    <li className={`flex ${isValid? 'text-gray-100' : 'text-yellow-300'}`}>
      {!isValid && <XMarkIcon className="h-6 mr-2 " />}
      {isValid && <CheckIcon className="h-6 mr-2" />}
      <p>{children}</p>
    </li>
  )
}

const PasswordPolicy = ({
  password,
  confirmPassword,
  setPasswordValid
}: {
  password: string
  confirmPassword: string
  setPasswordValid: Dispatch<SetStateAction<boolean>>
}) => {
  const confirmPasswordCheck = () => password === confirmPassword
  const minLengthCheck = () => password.length >= 8
  const lowercaseCheck = () => /[a-z]/.test(password)
  const uppercaseCheck = () => /[A-Z]/.test(password)
  const numberCheck = () => /\d/.test(password)

  setPasswordValid(
    confirmPasswordCheck()
    && minLengthCheck()
    && lowercaseCheck()
    && uppercaseCheck()
    && numberCheck()
  )

  return <ul>
    <PasswordPolicyItem isValid={confirmPasswordCheck()}>
      Password and confirmation must match
    </PasswordPolicyItem>

    <PasswordPolicyItem isValid={minLengthCheck()}>
      Minimum length: 8 characters
    </PasswordPolicyItem>

    <PasswordPolicyItem isValid={lowercaseCheck()}>
      Must include at least one lowercase letter
    </PasswordPolicyItem>

    <PasswordPolicyItem isValid={uppercaseCheck()}>
      Must include at least one uppercase letter
    </PasswordPolicyItem>

    <PasswordPolicyItem isValid={numberCheck()}>
      Must include at least one number
    </PasswordPolicyItem>
  </ul>
}

export default PasswordPolicy
