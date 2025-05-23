import { Link } from "react-router-dom";
import { FaRegTrashAlt, FaEdit } from "react-icons/fa";
import {
  ButtonTrash,
  ContainerCard,
  ContentCard,
  ContentCardButtons,
} from "./styled";

interface ICardProps {
  nome: string;
  cpfCnpj: string;
  id: string;
}

export function Card({ nome, cpfCnpj, id }: ICardProps) {
  return (
    <ContainerCard>
      <ContentCard>
        <span>Nome:</span>
        <span>{nome}</span>
      </ContentCard>
      <ContentCard>
        <span>cpfCnpj:</span>
        <span>{cpfCnpj}</span>
      </ContentCard>
      <ContentCardButtons>
        <Link to={""}>
          <FaEdit title="Editar" size="32px" color="green" />
        </Link>
        <ButtonTrash>
          <FaRegTrashAlt title="Excluir" size="32px" color="red" />
        </ButtonTrash>
      </ContentCardButtons>
    </ContainerCard>
  );
}
