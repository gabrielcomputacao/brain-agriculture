import { useEffect } from "react";
import {
  ButtonLinkAdd,
  ContainerProducers,
  ContentFormProducers,
} from "./styled";

export function Producers() {
  async function getProducers() {
    const response = await fetch("http://localhost:3000/producers");
    console.log(await response.json());
  }

  useEffect(() => {
    getProducers();
  }, []);

  return (
    <ContainerProducers>
      <ContentFormProducers>
        <ButtonLinkAdd to={"/producers/add"}>Adicionar produtor</ButtonLinkAdd>
      </ContentFormProducers>
    </ContainerProducers>
  );
}
