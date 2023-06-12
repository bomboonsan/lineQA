import { Text , css , Navbar , Spacer  } from "@nextui-org/react";

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
          <Text
            h1
            size={25}
            css={{
              textGradient: "45deg, $blue600 -20%, $pink600 50%",
            }}
            weight="bold"
          >
          Dashboard
          </Text>
        </Navbar.Brand>
      </Navbar>
      <Spacer y={2} />
    </>
  );
}