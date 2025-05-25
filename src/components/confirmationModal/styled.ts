import styled from "styled-components";

interface BotaoProps {
  bgColor?: string;
}

export const ContainerConfirmationModal = styled.div`
  display: flex;
  position: absolute;
  min-width: 400px;
  background-color: #f0f0f0;
  padding: 20px;
  border-radius: 8px;
  flex-direction: column;
  gap: 20px;
  justify-content: center;
  align-items: center;
  top: 30%;
  left: 50%;
  transform: translateX(-50%);
`;

export const ContentConfirmationModal = styled.div`
  display: flex;
  gap: 40px;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

export const ButtonCustom = styled.button.withConfig({
  shouldForwardProp: (prop) => prop !== "bgColor",
})<BotaoProps>`
  all: unset;
  cursor: pointer;
  padding: 15px 20px;
  font-weight: 700;
  border-radius: 4px;
  font-size: 18px;
  background-color: ${(props) => props.bgColor || "#222"};
  color: #fff;
`;
