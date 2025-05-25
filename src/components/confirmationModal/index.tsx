import {
  ButtonCustom,
  ContainerConfirmationModal,
  ContentConfirmationModal,
} from "./styled";

interface IConfirmationModalProps {
  setOpenModal: (status: boolean) => void;
  actionFunc: () => void;
}

export function ConfirmationModal({
  setOpenModal,
  actionFunc,
}: IConfirmationModalProps) {
  function handleButtonSim() {
    actionFunc();
    setOpenModal(false);
  }

  return (
    <ContainerConfirmationModal>
      <h2>Tem certeza que deseja executar essa ação?</h2>
      <ContentConfirmationModal>
        <ButtonCustom onClick={() => setOpenModal(false)} bgColor="red">
          Não
        </ButtonCustom>
        <ButtonCustom onClick={handleButtonSim} bgColor="green">
          Sim
        </ButtonCustom>
      </ContentConfirmationModal>
    </ContainerConfirmationModal>
  );
}
