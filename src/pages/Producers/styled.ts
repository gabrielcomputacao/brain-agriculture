import { Link } from "react-router-dom";
import styled from "styled-components";

export const ContainerProducers = styled.div`
  width: 100%;
  height: 100%;
`;

export const ContainerProducersAdd = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 40px;
`;
export const ContentFormProducers = styled.div`
  width: 100%;
  height: 100%;
`;
export const ContentFormProducersAdd = styled.div`
  padding: 20px;
  border: 1px solid #c3c3c3;
  min-width: 800px;
  border-radius: 4px;

  h2 {
    text-align: center;
    font-size: 28px;
  }
`;

export const FormProducersAdd = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const ContentValuesForm = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;

  label {
    font-size: 15px;
  }

  input {
    border-radius: 2px;
    padding: 3px;
  }

  span {
    color: red;
  }
`;

export const ButtonSubmit = styled.button`
  color: #fff;
  text-decoration: none;
  padding: 15px 25px;
  background-color: #2e7d32;
  border-radius: 4px;
  display: inline-block;
  font-size: 16px;
`;

export const ContentButton = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
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
