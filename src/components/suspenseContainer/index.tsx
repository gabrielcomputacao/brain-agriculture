import { ContainerSuspense } from "./styled";

export function SuspenseContainer() {
  return (
    <ContainerSuspense>
      <img src={"/icons8-círculo-de-carga.gif"} alt="Carregando..." />
    </ContainerSuspense>
  );
}
