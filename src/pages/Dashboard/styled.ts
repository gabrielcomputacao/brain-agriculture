import styled from "styled-components";

export const ContainerDashboard = styled.div`
  width: 100%;
`;

export const ContainerCards = styled.div`
  width: 100%;
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
`;

export const ContainerCharts = styled.div`
  width: 100%;
  display: flex;
  gap: 100px;
  flex-wrap: wrap;
`;

export const ContainerChart = styled.div`
  padding: 20px;
  border: 1px solid #c3c3c3;
  border-radius: 4px;
  max-width: 70%;
  margin-top: 40px;

  @media (max-width: 1050px) {
    max-width: 100%;
  }

  h3 {
    font-size: 26px;
    color: green;
    margin-bottom: 40px;
  }

  h4 {
    margin-bottom: 20px;
    font-size: 22px;
    color: rgb(207, 58, 58);
  }
`;

export const ContainerMessageNotData = styled.div`
  display: flex;

  margin-top: 40px;

  p {
    font-size: 18px;
  }
`;
