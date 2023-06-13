import { Text , css , Navbar , Spacer  } from "@nextui-org/react";
import Image from 'next/image'
export default function Layout({ children }) {
  return (
    <>
      {/* <header className="w-full mb-5 p-5">
        <Text
          h1
          size={45}
          css={{
            textGradient: "45deg, $blue600 -20%, $pink600 50%",
          }}
          weight="bold"
        >
        Dashboard
        </Text>
      </header> */}
      <Navbar isBordered >
        <Navbar.Brand>
          {/* <Text
            h1
            size={25}
            css={{
              textGradient: "45deg, $blue600 -20%, $pink600 50%",
            }}
            weight="bold"
          >
          Dashboard
          </Text> */}
          <Image 
              className='w-1/3 h-auto'
              width={384} 
              height={86} 
              src='/images/logo.png'
              alt='LOGO'
            />
        </Navbar.Brand>
        <Navbar.Content hideIn="xs">
          <Navbar.Link href="/dashboard/event">Event</Navbar.Link>
          <Navbar.Link href="/dashboard/contest">Contest</Navbar.Link>
          <Navbar.Link href="/dashboard/user">User</Navbar.Link>
        </Navbar.Content>
      </Navbar>
      <Spacer y={2} />
    </>
  );
}