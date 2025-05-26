import { useForm } from "react-hook-form";
import { ContainerFarms } from "./styled";
import type { Propriedade } from "../../types/types";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../redux/store";
import { useEffect, useState } from "react";
import { getProducers } from "../../services/getProducers";
import { ProducersActionTypes } from "../../redux/producers/actionsTypes";
import { FarmsActionTypes } from "../../redux/farms/actionsTypes";
import { Message } from "../../components/message";
import {
  ButtonSubmit,
  ContainerForm,
  Content,
  ContentButton,
  ContentValuesForm,
  SelectCustom,
} from "../../components/shared/styled";

export function Farms() {
  const {
    register,
    formState: { errors },
    handleSubmit,
    setError,
    reset,
  } = useForm<Propriedade>();

  const listProducers = useSelector(
    (rootReducer: RootState) => rootReducer.producersReducer
  );
  const [openObjectMessage, setOpenObjectMessage] = useState({
    isOpen: false,
    text: "",
    status: "success",
  });
  const dispatch = useDispatch();

  useEffect(() => {
    if (listProducers.length === 0) {
      getProducers(dispatch, ProducersActionTypes.GET);
    }
  }, []);

  async function onSubmit(data: Propriedade) {
    const isValidArea =
      Number(data.areaAgricultavel) + Number(data.areaVegetacao) >
      Number(data.areaTotal)
        ? false
        : true;

    if (!isValidArea) {
      setError("areaTotal", {
        message:
          "Área total não pode ser menor que a soma da área agricultável mais a área de vegetação",
      });
      return;
    }

    const response = await fetch("http://localhost:3000/farms", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.status === 200 || response.status === 201) {
      setOpenObjectMessage({
        isOpen: true,
        text: "Cadastrado com sucesso!",
        status: "success",
      });

      dispatch({
        type: FarmsActionTypes.ADD,
        payload: data,
      });

      reset();
    } else {
      setOpenObjectMessage({
        isOpen: true,
        text: "Algo deu errado!",
        status: "error",
      });
    }
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setOpenObjectMessage({ isOpen: false, text: "", status: "" });
    }, 4000);

    return () => {
      clearTimeout(timer);
    };
  }, [openObjectMessage.isOpen]);

  return (
    <ContainerFarms>
      {openObjectMessage.isOpen && (
        <Message
          status={openObjectMessage.status}
          text={openObjectMessage.text}
        />
      )}
      <Content>
        <h2>Cadastre uma fazenda</h2>
        <ContainerForm onSubmit={handleSubmit(onSubmit)}>
          <ContentValuesForm>
            <label htmlFor="idProdutor">Selecione o Produtor</label>
            <SelectCustom
              {...register("idProdutor", {
                required: "O Produtor é obrigatório",
              })}
            >
              <option value=""></option>
              {listProducers.map((value, index) => (
                <option key={index} value={value.id}>
                  {value.nome}
                </option>
              ))}
            </SelectCustom>
            {errors.idProdutor && (
              <span>{`${errors?.idProdutor?.message}.`}</span>
            )}
          </ContentValuesForm>

          <ContentValuesForm>
            <label htmlFor="nome">Nome da Propriedade</label>
            <input
              type="text"
              {...register("nome", { required: "O nome é obrigatório" })}
            />
            {errors.nome && <span>{`${errors?.nome?.message}.`}</span>}
          </ContentValuesForm>

          <ContentValuesForm>
            <label htmlFor="cidade">Cidade</label>
            <input
              type="text"
              {...register("cidade", { required: "A cidade é obrigatória" })}
            />
            {errors.cidade && <span>{`${errors?.cidade?.message}.`}</span>}
          </ContentValuesForm>

          <ContentValuesForm>
            <label htmlFor="estado">Estado</label>
            <SelectCustom
              {...register("estado", { required: "O estado é obrigatório" })}
            >
              <option value="">Selecione um estado</option>
              <option value="AC">Acre</option>
              <option value="AL">Alagoas</option>
              <option value="AP">Amapá</option>
              <option value="AM">Amazonas</option>
              <option value="BA">Bahia</option>
              <option value="CE">Ceará</option>
              <option value="DF">Distrito Federal</option>
              <option value="ES">Espírito Santo</option>
              <option value="GO">Goiás</option>
              <option value="MA">Maranhão</option>
              <option value="MT">Mato Grosso</option>
              <option value="MS">Mato Grosso do Sul</option>
              <option value="MG">Minas Gerais</option>
              <option value="PA">Pará</option>
              <option value="PB">Paraíba</option>
              <option value="PR">Paraná</option>
              <option value="PE">Pernambuco</option>
              <option value="PI">Piauí</option>
              <option value="RJ">Rio de Janeiro</option>
              <option value="RN">Rio Grande do Norte</option>
              <option value="RS">Rio Grande do Sul</option>
              <option value="RO">Rondônia</option>
              <option value="RR">Roraima</option>
              <option value="SC">Santa Catarina</option>
              <option value="SP">São Paulo</option>
              <option value="SE">Sergipe</option>
              <option value="TO">Tocantins</option>
            </SelectCustom>

            {errors.estado && <span>{`${errors?.estado?.message}.`}</span>}
          </ContentValuesForm>

          <ContentValuesForm>
            <label htmlFor="areaTotal">Área Total</label>
            <input
              type="text"
              {...register("areaTotal", {
                required: "A área total é obrigatória",
                pattern: {
                  value: /^[0-9]*[.]?[0-9]+$/,
                  message: "Digite um número válido",
                },
              })}
              placeholder="Digite a área em hectares."
            />
            {errors.areaTotal && (
              <span>{`${errors?.areaTotal?.message}.`}</span>
            )}
          </ContentValuesForm>

          <ContentValuesForm>
            <label htmlFor="areaAgricultavel">Área Agricultável</label>
            <input
              type="text"
              {...register("areaAgricultavel", {
                required: "A área agricultável é obrigatória",
                pattern: {
                  value: /^[0-9]*[.]?[0-9]+$/,
                  message: "Digite um número válido",
                },
              })}
              placeholder="Digite a área em hectares."
            />
            {errors.areaAgricultavel && (
              <span>{`${errors?.areaAgricultavel?.message}.`}</span>
            )}
          </ContentValuesForm>

          <ContentValuesForm>
            <label htmlFor="areaVegetacao">Área de Vegetação</label>
            <input
              type="text"
              {...register("areaVegetacao", {
                required: "A área de vegetação é obrigatória",
                pattern: {
                  value: /^[0-9]*[.]?[0-9]+$/,
                  message: "Digite um número válido",
                },
              })}
              placeholder="Digite a área em hectares."
            />
            {errors.areaVegetacao && (
              <span>{`${errors?.areaVegetacao?.message}.`}</span>
            )}
          </ContentValuesForm>
          <ContentButton>
            <ButtonSubmit type="submit">Cadastrar</ButtonSubmit>
          </ContentButton>
        </ContainerForm>
      </Content>
    </ContainerFarms>
  );
}
