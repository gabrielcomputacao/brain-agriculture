import { useForm } from "react-hook-form";
import { Message } from "../../components/message";
import {
  Container,
  ContainerContent,
  Content,
  ContainerForm,
  ContentValuesForm,
  SelectCustom,
  ContentButton,
  ButtonSubmit,
} from "../../components/shared/styled";
import { useEffect, useState } from "react";
import type { CulturasPlantadas, Safra } from "../../types/types";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../redux/store";
import { getFarms } from "../../services/getFarms";
import { FarmsActionTypes } from "../../redux/farms/actionsTypes";
import { PlantedCultureActionTypes } from "../../redux/plantedCulture/actionsTypes";

export default function PlantedCulture() {
  const {
    register,
    handleSubmit,
    watch,
    resetField,
    formState: { errors },
  } = useForm<CulturasPlantadas & { idFazenda: string }>();
  const dispatch = useDispatch();
  const [selectSafra, setSelectSafra] = useState<Safra[]>([]);

  const listFarms = useSelector(
    (rootReducer: RootState) => rootReducer.farmsReducer
  );
  const idFarm = watch("idFazenda");

  const [openObjectMessage, setOpenObjectMessage] = useState({
    isOpen: false,
    text: "",
    status: "success",
  });

  async function getHarvest() {
    try {
      const response = await fetch(
        `http://localhost:3000/safra?idFazenda=${idFarm}`
      );
      const dataObject = await response.json();
      setSelectSafra(dataObject);
    } catch (error) {}
  }

  async function onSubmit(data: CulturasPlantadas) {
    const response = await fetch("http://localhost:3000/cultura", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const dataResponse = await response.json();

    if (response.status === 200 || response.status === 201) {
      setOpenObjectMessage({
        isOpen: true,
        text: "Cadastrado com sucesso!",
        status: "success",
      });

      dispatch({
        type: PlantedCultureActionTypes.ADD,
        payload: dataResponse,
      });

      resetField("cultura");
    }
  }

  useEffect(() => {
    if (idFarm) {
      getHarvest();
      try {
      } catch (error) {}
    }
  }, [idFarm]);

  useEffect(() => {
    if (listFarms.length === 0) {
      getFarms(dispatch, FarmsActionTypes.POST);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setOpenObjectMessage({ isOpen: false, text: "", status: "" });
    }, 4000);

    return () => {
      clearTimeout(timer);
    };
  }, [openObjectMessage.isOpen]);

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
          <h2>Cadastre a Cultura plantada</h2>
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
                  <option key={`${index}_farms`} value={value.id}>
                    {value.nome}
                  </option>
                ))}
              </SelectCustom>
              {errors.idFazenda && (
                <span>{`${errors?.idFazenda?.message}.`}</span>
              )}
            </ContentValuesForm>

            {selectSafra.length > 0 && (
              <>
                <ContentValuesForm>
                  <label htmlFor="idSafra">Selecione uma Safra</label>
                  <SelectCustom
                    {...register("idSafra", {
                      required: "A Safra é obrigatória",
                    })}
                  >
                    <option value=""></option>
                    {selectSafra.map((value, index) => (
                      <option key={`${index}_safra`} value={value.id}>
                        {value.anoSafra}
                      </option>
                    ))}
                  </SelectCustom>
                  {errors.idSafra && (
                    <span>{`${errors?.idSafra?.message}.`}</span>
                  )}
                </ContentValuesForm>
                <ContentValuesForm>
                  <label htmlFor="cultura">Nome da cultura plantada</label>
                  <input
                    type="text"
                    {...register("cultura", {
                      required: "O nome da cultura plantada é obrigatório",
                    })}
                  />
                  {errors.cultura && (
                    <span>{`${errors?.cultura?.message}.`}</span>
                  )}
                </ContentValuesForm>
              </>
            )}
            <ContentButton>
              <ButtonSubmit
                disabled={selectSafra.length === 0 ? true : false}
                type="submit"
              >
                Cadastrar
              </ButtonSubmit>
            </ContentButton>
          </ContainerForm>
        </Content>
      </ContainerContent>
    </Container>
  );
}
