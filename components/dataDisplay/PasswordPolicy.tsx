import { Dispatch, SetStateAction, useCallback, useEffect } from 'react'
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

  const confirmPasswordCheck = useCallback(
    () => password === confirmPassword,
    [password, confirmPassword]
  )
  const minLengthCheck = useCallback(
    () => password.length >= 8,
    [password]
  )
  const lowercaseCheck = useCallback(
    () => /[a-z]/.test(password),
    [password]
  )
  const uppercaseCheck = useCallback(
    () => /[A-Z]/.test(password),
    [password]
  )
  const numberCheck = useCallback(
    () => /\d/.test(password),
    [password]
  )

  useEffect(() => {
    setPasswordValid(
      confirmPasswordCheck()
      && minLengthCheck()
      && lowercaseCheck()
      && uppercaseCheck()
      && numberCheck()
    )
  }, [confirmPasswordCheck, minLengthCheck, lowercaseCheck, uppercaseCheck, numberCheck, setPasswordValid])

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
