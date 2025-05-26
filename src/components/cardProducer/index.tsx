import { Link } from "react-router-dom";
import { FaRegTrashAlt, FaEdit } from "react-icons/fa";
import {
  ButtonTrash,
  ContainerCard,
  ContentCard,
  ContentCardButtons,
} from "./styled";
import { useState } from "react";
import { ConfirmationModal } from "../confirmationModal";
import { useDispatch } from "react-redux";
import { ProducersActionTypes } from "../../redux/producers/actionsTypes";
import { FarmsActionTypes } from "../../redux/farms/actionsTypes";
import { PlantedCultureActionTypes } from "../../redux/plantedCulture/actionsTypes";

interface ICardProps {
  nome: string;
  cpfCnpj: string;
  id: string;
}

export function CardProducer({ nome, cpfCnpj, id }: ICardProps) {
  const [onModalConfirmaiton, setOnModalConfirmaiton] = useState(false);

  const dispatch = useDispatch();

  async function deleteProducer() {
    const response = await fetch(`http://localhost:3000/producers/${id}`, {
      method: "DELETE",
    });

    if (response.status === 200 || response.status === 201) {
      dispatch({
        type: ProducersActionTypes.DELETE,
        payload: id,
      });

      const allFarmsWithIdProducer = await fetch(
        `http://localhost:3000/farms?idProdutor=${id}`
      );
      const data = await allFarmsWithIdProducer.json();

      for (const item of data) {
        const responseFarms = await fetch(
          `http://localhost:3000/farms/${item.id}`,
          {
            method: "DELETE",
          }
        );

        if (responseFarms.status === 200 || responseFarms.status === 201) {
          dispatch({
            type: FarmsActionTypes.DELETE,
            payload: id,
          });

          const responseSafra = await fetch(
            `http://localhost:3000/safra?idFazenda=${item.nome}`
          );

          const dataSafra = await responseSafra.json();

          for (const safra of dataSafra) {
            const responseDeleteSafra = await fetch(
              `http://localhost:3000/safra/${safra.id}`,
              {
                method: "DELETE",
              }
            );

            if (
              responseDeleteSafra.status === 200 ||
              responseDeleteSafra.status === 201
            ) {
              const responseCulture = await fetch(
                `http://localhost:3000/cultura?idSafra=${safra.id}`
              );

              const dataCulture = await responseCulture.json();

              for (const culture of dataCulture) {
                const responseCulture = await fetch(
                  `http://localhost:3000/cultura/${culture.id}`,
                  {
                    method: "DELETE",
                  }
                );

                if (
                  responseCulture.status === 200 ||
                  responseCulture.status === 201
                ) {
                  dispatch({
                    type: PlantedCultureActionTypes.DELETE,
                    payload: id,
                  });
                }
              }
            }
          }
        }
      }
    } else {
    }
  }

  function handleSetOnModalConfirmaiton(status: boolean) {
    setOnModalConfirmaiton(status);
  }

  return (
    <>
      <ContainerCard>
        <ContentCard>
          <span>Nome:</span>
          <p>{nome}</p>
        </ContentCard>
        <ContentCard>
          <span>CPF/CNPJ:</span>
          <p>{cpfCnpj}</p>
        </ContentCard>
        <ContentCardButtons>
          <Link to={`/producers/edit/${id}`}>
            <FaEdit title="Editar" size="32px" color="green" />
          </Link>
          <ButtonTrash onClick={() => handleSetOnModalConfirmaiton(true)}>
            <FaRegTrashAlt title="Excluir" size="32px" color="red" />
          </ButtonTrash>
        </ContentCardButtons>
      </ContainerCard>
      {onModalConfirmaiton && (
        <ConfirmationModal
          actionFunc={deleteProducer}
          setOpenModal={handleSetOnModalConfirmaiton}
        />
      )}
    </>
  );
}
