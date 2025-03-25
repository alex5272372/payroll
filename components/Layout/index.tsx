import React from 'react'
import Image from 'next/image'
import { Disclosure, DisclosureButton } from '@headlessui/react'
import { auth } from '@/auth'
import { MenuItem, TabItem } from '@/types'
import Navbar from './Navbar'
import Header from './Header'
import MainMenuDropdown from './MainMenuDropdown'
import ProfileDropdown from './ProfileDropdown'
import MobileMenuPanel from './MobileMenuPanel'
import { navigation } from '@/lib'

const tabs: TabItem[] = [
  { id: 'calendar', name: 'Calendar', active: true },
  { id: 'users', name: 'Users' },
]

const Layout = async ({ children }: { children: React.ReactNode; }) => {
  const session = await auth()
  const authUserNavigation = navigation.filter(item =>
    item.align === 'right' && (session?.user ? item.auth !== false : !item.auth))
  const authNavigation = navigation.filter(item =>
    item.align === 'left' && (session?.user ? item.auth !== false : !item.auth))

  return <>
    <Navbar isMobile={false}>
      {authNavigation.map((item: MenuItem) => <MainMenuDropdown key={item.id} item={item}></MainMenuDropdown>)}

      <ProfileDropdown
        navigation={authUserNavigation[0].items || []}
        user={session?.user}
      ></ProfileDropdown>
    </Navbar>

    <Disclosure>
      <Navbar isMobile={true}>
        {authNavigation.map((item: MenuItem) =>
          <DisclosureButton
            key={item.id}
            className="py-1 px-2 rounded-md bg-gray-900 text-gray-300 hover:bg-gray-700 hover:text-white"
          >
            <item.icon className='h-6'></item.icon>
          </DisclosureButton>
        )}
        <div className="grow flex justify-end rounded-full">
          <DisclosureButton className="rounded-full">
            <Image
              alt="Avatar"
              src={session?.user && session.user.image ? session.user.image : '/user.png'}
              className="rounded-full"
              height={32}
              width={32}
            />
          </DisclosureButton>
        </div>
      </Navbar>

      {authNavigation.map((item: MenuItem) =>
        item.items && <MobileMenuPanel key={item.id} item={item}></MobileMenuPanel>)}
      <MobileMenuPanel item={authUserNavigation[0]}></MobileMenuPanel>
    </Disclosure>

    <Header tabs={tabs} />
    {children}
  </>
}

export default Layout

// export default function MyAccordion({ data }) {

//   const [activeDisclosurePanel, setActiveDisclosurePanel] = useState(null);

//   function togglePanels(newPanel) {

//     if (activeDisclosurePanel) {
//       if (activeDisclosurePanel.key !== newPanel.key && activeDisclosurePanel.open) {
//         activeDisclosurePanel.close();
//       }
//     }

//     setActiveDisclosurePanel({
//       ...newPanel,
//       open: !newPanel.open
//     });
//   }

//   return (
//     <ul>
//       {
//         data.map((item, index) => (
//           <Disclosure as="li" key={ index }>
//             {
//               (panel) => {
//                 const { open, close } = panel
//                 return (<>
//                   <Disclosure.Button onClick={ () => {
//                     if (!open) {
//                       // On the first click, the panel is opened but the "open" prop's value is still false.
//                       // Therefore the falsey verification
//                       // This will make so the panel close itself when we click it while open
//                       close();
//                     }

//                     // Now we call the function to close the other opened panels (if any)
//                     togglePanels({ ...panel, key: index });
//                   }}>
//                   </Disclosure.Button>
//                   <Disclosure.Panel>
//                     { item }
//                   </Disclosure.Panel>
//                 </>)
//               }
//             }
//           </Disclosure>
//         ))
//       }
//     </ul>
//   );
// }
