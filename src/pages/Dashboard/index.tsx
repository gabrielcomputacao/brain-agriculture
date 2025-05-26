import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FarmsActionTypes } from "../../redux/farms/actionsTypes";
import type { RootState } from "../../redux/store";
import { getFarms } from "../../services/getFarms";
import { CardNumbersTotal } from "../../components/cardNumbersTotal";
import {
  ContainerCards,
  ContainerChart,
  ContainerCharts,
  ContainerDashboard,
} from "./styled";
import type { Propriedade } from "../../types/types";
import { StateCharts } from "../../components/charts/StateChart";
import {
  groupDataFarmsByGround,
  groupDataFarmsByPlantedCulture,
  groupDataFarmsByState,
  groupDataHectaresByGround,
  groupDataHectaresByPlantedCulture,
  groupDataHectaresByState,
} from "../../utils/groupData";
import { getPlantedCulture } from "../../services/getPlantedCulture";
import { PlantedCultureActionTypes } from "../../redux/plantedCulture/actionsTypes";

export function Dashboard() {
  const dispatch = useDispatch();
  const listFarms = useSelector(
    (rootReducer: RootState) => rootReducer.farmsReducer
  );
  const listPlantedCulture = useSelector(
    (rootReducer: RootState) => rootReducer.plantedCultureReducer
  );

  const totalHectates = useMemo(() => {
    let total = 0;

    listFarms.forEach((farm: Propriedade) => {
      total += Number(farm.areaTotal);
    });

    return total;
  }, [listFarms]);

  const groupHectaresFarmsByState = useMemo(() => {
    return groupDataHectaresByState(listFarms);
  }, [listFarms]);

  const groupFarmsByState = useMemo(() => {
    return groupDataFarmsByState(listFarms);
  }, [listFarms]);

  const groupHectaresByGround = useMemo(() => {
    return groupDataHectaresByGround(listFarms);
  }, [listFarms]);
  const groupFarmsByGround = useMemo(() => {
    return groupDataFarmsByGround(listFarms);
  }, [listFarms]);
  const groupFarmsByPlantedCulture = useMemo(() => {
    return groupDataFarmsByPlantedCulture(listFarms, listPlantedCulture);
  }, [listFarms, listPlantedCulture]);
  const groupHectaresByPlantedCulture = useMemo(() => {
    return groupDataHectaresByPlantedCulture(listFarms, listPlantedCulture);
  }, [listFarms, listPlantedCulture]);

  useEffect(() => {
    if (listFarms.length === 0) {
      getFarms(dispatch, FarmsActionTypes.GET);
    }
  }, []);
  useEffect(() => {
    if (listPlantedCulture.length === 0) {
      getPlantedCulture(dispatch, PlantedCultureActionTypes.GET);
    }
  }, []);

  return (
    <ContainerDashboard>
      <ContainerCards>
        <CardNumbersTotal type="farms" textNumber={listFarms.length} />
        <CardNumbersTotal type="hectare" textNumber={totalHectates} />
      </ContainerCards>

      {listFarms.length > 0 ? (
        <>
          <ContainerChart>
            <h3>Gráficos com filtros por Estado</h3>
            <ContainerCharts>
              <div>
                <h4>Total de Fazendas por estado</h4>
                <StateCharts list={groupFarmsByState} />
              </div>
              <div>
                <h4>Total de Hectares por estado</h4>
                <StateCharts list={groupHectaresFarmsByState} />
              </div>
            </ContainerCharts>
          </ContainerChart>
          {listPlantedCulture.length > 0 && (
            <ContainerChart>
              <h3>Gráficos com filtros por cultura plantada</h3>
              <ContainerCharts>
                <div>
                  <h4>Total de Fazendas por cultura plantada</h4>
                  <StateCharts list={groupFarmsByPlantedCulture} />
                </div>
                <div>
                  <h4>Total de Hectares por cultura plantada</h4>
                  <StateCharts list={groupHectaresByPlantedCulture} />
                </div>
              </ContainerCharts>
            </ContainerChart>
          )}
          <ContainerChart>
            <h3>Gráficos com filtros por Uso do solo</h3>
            <ContainerCharts>
              <div>
                <h4>Total de Fazendas por uso do solo</h4>
                <StateCharts list={groupFarmsByGround} />
              </div>
              <div>
                <h4>Total de Hectares por uso do solo</h4>
                <StateCharts list={groupHectaresByGround} />
              </div>
            </ContainerCharts>
          </ContainerChart>
        </>
      ) : (
        <div>
          <p>
            Ainda não tem dados para mostrar os gráficos.Cadastre um produtor
            depois cadastre uma fazenda.
          </p>
        </div>
      )}
    </ContainerDashboard>
  );
}
