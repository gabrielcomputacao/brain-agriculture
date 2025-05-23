import { Outlet } from "react-router-dom";
import { Menu } from "./components/menu";
import { GlobalStyle } from "./styles/global";
import {
  ContainerChildren,
  ContainerLayout,
  ContainerMenu,
} from "./styles/styledLayout";
import { itensMenu } from "./utils/utils";

export function Layout() {
  return (
    <>
      <GlobalStyle />
      <ContainerLayout>
        <ContainerMenu>
          <h2>Brain Agriculture</h2>
          <Menu listItemMenu={itensMenu} />
        </ContainerMenu>
        <ContainerChildren>
          <Outlet />
        </ContainerChildren>
      </ContainerLayout>
    </>
  );
}
