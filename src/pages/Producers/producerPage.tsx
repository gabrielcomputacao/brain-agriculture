import { useForm } from "react-hook-form";
import type { Produtor } from "../../types/types";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../redux/store";
import {
  ButtonSubmit,
  ContainerContent,
  ContainerForm,
  Content,
  ContentButton,
  ContentValuesForm,
} from "../../components/shared/styled";
import { formatCpfCnpj, validateCpfCnpj } from "../../utils/validationCpfCnpj";
import { ProducersActionTypes } from "../../redux/producers/actionsTypes";

export default function ProducerPage() {
  const {
    handleSubmit,
    register,
    setValue,
    setError,
    formState: { errors },
    watch,
  } = useForm<Produtor>();

  const [firstRender, setFirstRender] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const dataCpfCnpj = watch("cpfCnpj");
  const { id } = useParams();
  const listProducers = useSelector(
    (rootReducer: RootState) => rootReducer.producersReducer
  );

  async function onSubmit(data: Produtor) {
    const isValidCpfCnpj = validateCpfCnpj(data.cpfCnpj);

    if (!isValidCpfCnpj) {
      setError("cpfCnpj", {
        message: "Cpf/Cnpj inválido",
      });

      return;
    }

    if (id) {
      try {
        const response = await fetch(`http://localhost:3000/producers/${id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id, ...data }),
        });

        const objectData = await response.json();

        if (response.status === 200) {
          dispatch({
            type: ProducersActionTypes.PATCH,
            payload: objectData,
          });

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

        const dataResponse = await response.json();

        if (response.status === 200 || response.status === 201) {
          dispatch({
            type: ProducersActionTypes.ADD,
            payload: dataResponse,
          });

          navigate("/producers");
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

  useEffect(() => {
    if (!firstRender) {
      const formatValue = formatCpfCnpj(dataCpfCnpj ?? "");
      setValue("cpfCnpj", formatValue);
    }

    setFirstRender(false);
  }, [dataCpfCnpj]);

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
              maxLength={18}
              {...register("cpfCnpj", {
                required: "O cpfCnpj é obrigatório",
              })}
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
