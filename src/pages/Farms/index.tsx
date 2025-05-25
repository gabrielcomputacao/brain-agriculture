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
              {listProducers.map((value) => (
                <option value={value.id}>{value.nome}</option>
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
            <input
              type="text"
              {...register("estado", { required: "O estado é obrigatório" })}
            />
            {errors.estado && <span>{`${errors?.estado?.message}.`}</span>}
          </ContentValuesForm>

          <ContentValuesForm>
            <label htmlFor="areaTotal">Área Total</label>
            <input
              type="text"
              {...register("areaTotal", {
                required: "A área total é obrigatória",
              })}
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
              })}
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
              })}
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
