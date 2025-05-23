import { ButtonLink, ContainerMenu, ContentMenu } from "./styled";
import type { ItemMenu } from "./utils";

interface IPropsMenu {
  listItemMenu: ItemMenu[];
}

export function Menu({ listItemMenu = [] }: IPropsMenu) {
  return (
    <ContainerMenu>
      <ContentMenu>
        {listItemMenu.length > 0 &&
          listItemMenu.map((item, index) => {
            return (
              <ButtonLink key={index} to={item.link}>
                {" "}
                {item.text}{" "}
              </ButtonLink>
            );
          })}
      </ContentMenu>
    </ContainerMenu>
  );
}
