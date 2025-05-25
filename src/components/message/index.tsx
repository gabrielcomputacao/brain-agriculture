import { ContainerMessage } from "./styled";

interface IMessageProps {
  text: string;
  status: string;
}

export function Message({ text, status }: IMessageProps) {
  return (
    <ContainerMessage bgColor={status === "success" ? "green" : "red"}>
      <p>{text}</p>
    </ContainerMessage>
  );
}
