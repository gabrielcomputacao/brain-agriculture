import styled from "styled-components";

interface ContainerMessageProps {
  bgColor?: string;
}

export const ContainerMessage = styled.button.withConfig({
  shouldForwardProp: (prop) => prop !== "bgColor",
})<ContainerMessageProps>`
  display: flex;
  position: absolute;
  top: 10%;
  right: 5%;
  width: 300px;
  border: 1px solid #c3c3c3;
  border-radius: 4px;
  padding: 20px;
  background-color: ${(props) => props.bgColor || "#222"};

  p {
    font-size: 20px;
    color: #fff;
  }
`;
