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
