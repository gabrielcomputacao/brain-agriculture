import { useEffect } from "react";
import {
  ButtonLinkAdd,
  ContainerCards,
  ContainerProducers,
  ContentFormProducers,
} from "./styled";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../redux/store";
import { ProducersActionTypes } from "../../redux/producers/actionsTypes";
import { Card } from "../../components/card";

export function Producers() {
  const listProducers = useSelector(
    (rootReducer: RootState) => rootReducer.producersReducer
  );
  const dispatch = useDispatch();

  async function getProducers() {
    try {
      const response = await fetch("http://localhost:3000/producers");
      const dataObject = await response.json();

      dispatch({
        type: ProducersActionTypes.GET,
        payload: dataObject,
      });
    } catch (error) {}
  }

  useEffect(() => {
    getProducers();
  }, []);

  return (
    <ContainerProducers>
      <ContentFormProducers>
        <ButtonLinkAdd to={"/producers/add"}>Adicionar produtor</ButtonLinkAdd>

        {listProducers.length > 0 && (
          <ContainerCards>
            {listProducers.map((producer) => {
              return (
                <Card
                  id={producer.id}
                  cpfCnpj={producer.cpfCnpj}
                  nome={producer.nome}
                />
              );
            })}
          </ContainerCards>
        )}
      </ContentFormProducers>
    </ContainerProducers>
  );
}
