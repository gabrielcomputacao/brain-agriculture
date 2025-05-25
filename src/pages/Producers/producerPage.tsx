import { useForm } from "react-hook-form";
import type { Produtor } from "../../types/types";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../redux/store";
import {
  ButtonSubmit,
  ContainerContent,
  ContainerForm,
  Content,
  ContentButton,
  ContentValuesForm,
} from "../../components/shared/styled";

export function ProducerPage() {
  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm<Produtor>();

  const navigate = useNavigate();

  const { id } = useParams();
  const listProducers = useSelector(
    (rootReducer: RootState) => rootReducer.producersReducer
  );

  async function onSubmit(data: Produtor) {
    if (id) {
      try {
        const response = await fetch(`http://localhost:3000/producers/${id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id, ...data }),
        });

        if (response.status === 200) {
          navigate("/producers");
        } else {
        }
      } catch (err) {
        throw new Error(`Algo de errado. Erro: ${err}`);
      }
    } else {
      try {
        const response = await fetch("http://localhost:3000/producers", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        if (response.status === 200 || response.status === 201) {
          navigate("/producers");
        } else {
        }
      } catch (err) {
        throw new Error(`Algo de errado. Erro: ${err}`);
      }
    }
  }

  useEffect(() => {
    if (id) {
      const producer = listProducers.find((prod) => prod.id === id);
      setValue("nome", producer.nome);
      setValue("cpfCnpj", producer.cpfCnpj);
    }
  }, []);

  return (
    <ContainerContent>
      <Content>
        <h2>Cadastrar produtor</h2>
        <ContainerForm onSubmit={handleSubmit(onSubmit)}>
          <ContentValuesForm>
            <label htmlFor="nome">Nome do Produtor</label>
            <input
              type="text"
              {...register("nome", { required: "O nome é obrigatório" })}
            />
            {errors.nome && <span>{`${errors?.nome?.message}.`}</span>}
          </ContentValuesForm>
          <ContentValuesForm>
            <label htmlFor="cpfCnpj">CPF/CNPJ Produtor</label>
            <input
              type="text"
              {...register("cpfCnpj", { required: "O cpfCnpj é obrigatório" })}
            />
            {errors.cpfCnpj && <span>{`${errors?.cpfCnpj?.message}.`}</span>}
          </ContentValuesForm>
          <ContentButton>
            <ButtonSubmit type="submit">
              {id ? "Editar" : "Cadastrar"}
            </ButtonSubmit>
          </ContentButton>
        </ContainerForm>
      </Content>
    </ContainerContent>
  );
}
