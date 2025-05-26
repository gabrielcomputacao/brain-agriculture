import { Link } from "react-router-dom";
import styled from "styled-components";

export const ContainerMenu = styled.div`
  width: 100%;
`;
export const ContentMenu = styled.div`
  width: 99%;
  display: flex;
  flex-direction: column;
  border-top: 1px solid #c3c3c3;
  border-bottom: 1px solid #c3c3c3;
`;

export const ButtonLink = styled(Link)`
  text-decoration: none;
  color: #222;
  font-size: 22px;
  background-color: #ececec;
  padding: 25px;
  border-bottom: 1px solid #c3c3c3;

  &:last-child {
    border-bottom: none;
  }
`;
