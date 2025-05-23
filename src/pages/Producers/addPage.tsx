import { useForm } from "react-hook-form";
import {
  ButtonSubmit,
  ContainerProducersAdd,
  ContentButton,
  ContentFormProducersAdd,
  ContentValuesForm,
  FormProducersAdd,
} from "./styled";
import type { Produtor } from "../../types/types";

export function AddPage() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<Produtor>();

  async function onSubmit(data: any) {
    const response = await fetch("http://localhost:3000/producers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    console.log(response);
  }

  return (
    <ContainerProducersAdd>
      <ContentFormProducersAdd>
        <h2>Cadastrar produtor</h2>
        <FormProducersAdd onSubmit={handleSubmit(onSubmit)}>
          <ContentValuesForm>
            <label htmlFor="">Nome do Produtor</label>
            <input
              type="text"
              {...register("nome", { required: "O nome é obrigatório" })}
            />
            {errors.nome && <span>{`${errors?.nome?.message}.`}</span>}
          </ContentValuesForm>
          <ContentValuesForm>
            <label htmlFor="">CPF/CNPJ Produtor</label>
            <input
              type="text"
              {...register("cpfCnpj", { required: "O cpfCnpj é obrigatório" })}
            />
            {errors.cpfCnpj && <span>{`${errors?.cpfCnpj?.message}.`}</span>}
          </ContentValuesForm>
          <ContentButton>
            <ButtonSubmit type="submit">Cadastrar</ButtonSubmit>
          </ContentButton>
        </FormProducersAdd>
      </ContentFormProducersAdd>
    </ContainerProducersAdd>
  );
}
