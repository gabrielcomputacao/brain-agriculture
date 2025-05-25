import { Link } from "react-router-dom";
import styled from "styled-components";

export const ContentFormProducers = styled.div`
  width: 100%;
  height: 100%;
`;

export const ButtonLinkAdd = styled(Link)`
  color: #fff;
  text-decoration: none;
  padding: 15px 25px;
  background-color: #2e7d32;
  border-radius: 4px;
  display: inline-block;
`;

export const ContainerCards = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
  margin-top: 20px;
`;
