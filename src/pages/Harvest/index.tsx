import { useForm } from "react-hook-form";
import {
  ButtonSubmit,
  Container,
  ContainerContent,
  ContainerForm,
  Content,
  ContentButton,
  ContentValuesForm,
  SelectCustom,
} from "../../components/shared/styled";
import type { Safra } from "../../types/types";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../redux/store";
import { useEffect, useState } from "react";
import { getFarms } from "../../services/getFarms";
import { FarmsActionTypes } from "../../redux/farms/actionsTypes";
import { Message } from "../../components/message";

export default function Harvest() {
  const {
    register,
    handleSubmit,
    resetField,
    formState: { errors },
  } = useForm<Safra>();
  const dispatch = useDispatch();
  const listFarms = useSelector(
    (rootReducer: RootState) => rootReducer.farmsReducer
  );

  const [openObjectMessage, setOpenObjectMessage] = useState({
    isOpen: false,
    text: "",
    status: "success",
  });

  async function onSubmit(data: Safra) {
    const response = await fetch("http://localhost:3000/safra", {
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

      resetField("anoSafra");
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

  useEffect(() => {
    if (listFarms.length === 0) {
      getFarms(dispatch, FarmsActionTypes.POST);
    }
  }, []);

  return (
    <Container>
      {openObjectMessage.isOpen && (
        <Message
          status={openObjectMessage.status}
          text={openObjectMessage.text}
        />
      )}
      <ContainerContent>
        <Content>
          <h2>Cadastre a Safra</h2>
          <ContainerForm onSubmit={handleSubmit(onSubmit)}>
            <ContentValuesForm>
              <label htmlFor="idFazenda">Selecione uma fazenda</label>
              <SelectCustom
                {...register("idFazenda", {
                  required: "A fazenda é obrigatória",
                })}
              >
                <option value=""></option>
                {listFarms.map((value, index) => (
                  <option key={`${index}_farm_safra`} value={value.id}>
                    {value.nome}
                  </option>
                ))}
              </SelectCustom>
              {errors.idFazenda && (
                <span>{`${errors?.idFazenda?.message}.`}</span>
              )}
            </ContentValuesForm>
            <ContentValuesForm>
              <label htmlFor="anoSafra">Nome da safra</label>
              <input
                type="text"
                {...register("anoSafra", {
                  required: "O nome da safra é obrigatório",
                })}
              />
              {errors.anoSafra && (
                <span>{`${errors?.anoSafra?.message}.`}</span>
              )}
            </ContentValuesForm>
            <ContentButton>
              <ButtonSubmit type="submit">Cadastrar</ButtonSubmit>
            </ContentButton>
          </ContainerForm>
        </Content>
      </ContainerContent>
    </Container>
  );
}
