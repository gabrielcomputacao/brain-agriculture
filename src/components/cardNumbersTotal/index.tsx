import { ContainerCardNumbersTotal, ContentCardNumber } from "./styled";

interface ICardNUmbersTotalPops {
  textNumber: number;
  type: "farms" | "hectare";
}

export function CardNumbersTotal({ textNumber, type }: ICardNUmbersTotalPops) {
  return (
    <ContainerCardNumbersTotal>
      <ContentCardNumber>
        <h4>
          {type === "farms"
            ? "Total de fazendas cadastradas no sistema"
            : "Total de hectares cadastradas no sistema"}
        </h4>
        <p>
          {textNumber} <span>{type === "farms" ? "Fazendas" : "Hectares"}</span>{" "}
        </p>
      </ContentCardNumber>
    </ContainerCardNumbersTotal>
  );
}
