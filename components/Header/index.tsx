import SignIn from '../auth/signin-button'
import SignOut from '../auth/signout-button'

const Header = () => {
  return (
    <header className='flex  flex-row'>
      <SignIn />
      <SignOut />
    </header>
  )
}

export default Header
