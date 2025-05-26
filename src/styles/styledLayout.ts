import styled from "styled-components";

export const ContainerLayout = styled.div`
  display: flex;
  width: 100%;
  min-height: 100vh;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;
export const ContainerChildren = styled.div`
  width: 80%;
  padding: 20px;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const ContainerMenu = styled.div`
  width: 20%;

  border-right: 1px solid #292929;
  display: flex;
  flex-direction: column;
  background-color: #ececec;

  @media (max-width: 768px) {
    width: 100%;
  }

  h2 {
    text-align: center;
    padding: 20px;
    font-size: 32px;

    @media (max-width: 1050px) {
      font-size: 26px;
    }
  }
`;
