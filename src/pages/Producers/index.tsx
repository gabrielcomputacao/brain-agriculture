import { useEffect } from "react";
import { ButtonLinkAdd, ContainerCards } from "./styled";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../redux/store";
import { ProducersActionTypes } from "../../redux/producers/actionsTypes";
import { CardProducer } from "../../components/cardProducer";
import { getProducers } from "../../services/getProducers";
import { ContainerContent, Content } from "../../components/shared/styled";

export function Producers() {
  const listProducers = useSelector(
    (rootReducer: RootState) => rootReducer.producersReducer
  );
  const dispatch = useDispatch();

  useEffect(() => {
    getProducers(dispatch, ProducersActionTypes.GET);
  }, []);

  return (
    <ContainerContent>
      <Content>
        <ButtonLinkAdd to={"/producers/add"}>Adicionar produtor</ButtonLinkAdd>

        {listProducers.length > 0 && (
          <ContainerCards>
            {listProducers.map((producer) => {
              return (
                <CardProducer
                  id={producer.id}
                  cpfCnpj={producer.cpfCnpj}
                  nome={producer.nome}
                />
              );
            })}
          </ContainerCards>
        )}
      </Content>
    </ContainerContent>
  );
}
