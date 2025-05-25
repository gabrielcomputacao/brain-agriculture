import styled from "styled-components";

export const ContainerCard = styled.div`
  padding: 20px;
  border: 1px solid #c3c3c3;
  border-radius: 4px;
  min-width: 300px;
  min-height: 100px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
export const ContentCard = styled.div`
  display: flex;

  span {
    font-weight: 700;
    font-size: 20px;
  }

  p {
    font-size: 20px;
    margin-left: 10px;
  }
`;
export const ContentCardButtons = styled.div`
  display: flex;
  justify-content: end;
  gap: 20px;
`;
export const ButtonTrash = styled.button`
  all: unset;
  cursor: pointer;
`;
