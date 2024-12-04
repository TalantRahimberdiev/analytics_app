import { Navbar, Text, ScrollArea } from "@mantine/core";
import NavElements from "./navElements";
import { useSelector } from "react-redux";

export default function MainNav() {
  const opened = useSelector((state) => state.burger.opened);
  return (
    <Navbar
      p="md"
      hiddenBreakpoint="sm"
      hidden={!opened}
      width={{ sm: 250, lg: 250 }}
    >
      <ScrollArea mx="-xs" px="xs" scrollbarSize={5} scrollHideDelay={0}>
        <Text weight={700} color={"cyan.9"} size={"sm"}>
          {`Данные конкурентов:`}
        </Text>
        <NavElements />
      </ScrollArea>
    </Navbar>
  );
}
