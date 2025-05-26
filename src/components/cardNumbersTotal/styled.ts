import styled from "styled-components";

export const ContainerCardNumbersTotal = styled.div`
  padding: 20px;
  border: 1px solid #c3c3c3;
  border-radius: 4px;
  min-width: 300px;
  min-height: 100px;
  display: flex;
  flex-direction: column;
  gap: 20px;

  @media (max-width: 768px) {
    width: 100%;
  }
  @media (max-width: 400px) {
    min-width: 0;
  }
`;
export const ContentCardNumber = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;

  h4 {
    font-weight: 700;
    font-size: 20px;
    color: green;
  }

  p {
    font-size: 50px;
  }

  span {
    font-size: 28px;
  }
`;
