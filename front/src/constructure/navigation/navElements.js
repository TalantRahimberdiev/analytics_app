import { Box, NavLink, Text, useMantineColorScheme } from "@mantine/core";
import navData from "./navData";
import { useSelector, useDispatch } from "react-redux";
import { changeBurger } from "../../rtk/slice_1";
import uuid from "react-uuid";
import { useLocation } from "react-router-dom";

export default function NavElements() {
  const location = useLocation();
  const { colorScheme } = useMantineColorScheme();
  const dark = colorScheme === "dark";
  const dispatch = useDispatch();
  const language = useSelector((state) => state.reducer_1.language);

  const navElements = navData[language].map((item, index) => (
    <div key={uuid()}>
      <NavLink
        variant="subtle"
        component={"a"}
        href={`/${item.link}`}
        label={item.label}
        style={
          location.pathname === `/${item.link}`
            ? {
                fontStyle: "italic",
                textDecoration: "underline",
                color: "tomato",
              }
            : { fontStyle: "italic", textDecoration: "underline" }
        }
      >
        {item.children &&
          item.children.map((child) => (
            <NavLink
              component="a"
              href={`/${child.link}`}
              key={uuid()}
              label={child.label}
              onClick={() => dispatch(changeBurger())}
              variant={"subtle"}
              style={{ fontStyle: "italic", textDecoration: "underline" }}
            />
          ))}
      </NavLink>
      {index === 4 && (
        <Text
          weight={700}
          color={dark ? "cyan.3" : "cyan.9"}
          size="sm"
          key={uuid()}
        >
          {language === "eng" ? `Иные данные:` : `Rest data:`}
        </Text>
      )}
    </div>
  ));

  return <Box>{navElements}</Box>;
}
