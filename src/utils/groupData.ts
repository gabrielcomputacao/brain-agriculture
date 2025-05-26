import type { CulturasPlantadas, Propriedade } from "../types/types";

export function groupDataHectaresByState(array: Propriedade[]) {
  return array.reduce((acc: any, item) => {
    const state = item.estado;

    if (acc[state]) {
      acc[state] += item.areaTotal;
    } else {
      acc[state] = item.areaTotal ?? 0;
    }

    return acc;
  }, {});
}

export function groupDataFarmsByState(array: Propriedade[]) {
  return array.reduce((acc: any, item) => {
    const state = item.estado;

    if (acc[state]) {
      acc[state] += acc[state]++;
    } else {
      acc[state] = 1;
    }

    return acc;
  }, {});
}

export function groupDataFarmsByGround(array: Propriedade[]) {
  return array.reduce((acc: any, item) => {
    const ground = Number(item.areaVegetacao) + Number(item.areaAgricultavel);

    if (ground <= 10) {
      if (acc["Menor ou igual a 10"]) {
        acc["Menor ou igual a 10"] += acc["Menor ou igual a 10"]++;
      } else {
        acc["Menor ou igual a 10"] = 1;
      }
    } else if (ground > 10 && ground <= 20) {
      if (acc["Menor ou igual a 20"]) {
        acc["Menor ou igual a 20"] += acc["Menor ou igual a 20"]++;
      } else {
        acc["Menor ou igual a 20"] = 1;
      }
    } else if (ground > 20 && ground <= 30) {
      if (acc["Menor ou igual a 30"]) {
        acc["Menor ou igual a 30"] += acc["Menor ou igual a 30"]++;
      } else {
        acc["Menor ou igual a 30"] = 1;
      }
    } else if (ground > 30 && ground <= 40) {
      if (acc["Menor ou igual a 40"]) {
        acc["Menor ou igual a 40"] += acc["Menor ou igual a 40"]++;
      } else {
        acc["Menor ou igual a 40"] = 1;
      }
    } else if (ground > 40 && ground <= 50) {
      if (acc["Menor ou igual a 50"]) {
        acc["Menor ou igual a 50"] += acc["Menor ou igual a 50"]++;
      } else {
        acc["Menor ou igual a 50"] = 1;
      }
    } else {
      if (acc["Maior que 50"]) {
        acc["Maior que 50"] += acc["Maior que 50"]++;
      } else {
        acc["Maior que 50"] = 1;
      }
    }

    return acc;
  }, {});
}
export function groupDataHectaresByGround(array: Propriedade[]) {
  return array.reduce((acc: any, item) => {
    const ground = Number(item.areaVegetacao) + Number(item.areaAgricultavel);

    if (ground <= 10) {
      if (acc["Menor ou igual a 10"]) {
        acc["Menor ou igual a 10"] += Number(item.areaTotal);
      } else {
        acc["Menor ou igual a 10"] = Number(item.areaTotal) ?? 0;
      }
    } else if (ground > 10 && ground <= 20) {
      if (acc["Menor ou igual a 20"]) {
        acc["Menor ou igual a 20"] += Number(item.areaTotal);
      } else {
        acc["Menor ou igual a 20"] = Number(item.areaTotal) ?? 0;
      }
    } else if (ground > 20 && ground <= 30) {
      if (acc["Menor ou igual a 30"]) {
        acc["Menor ou igual a 30"] += Number(item.areaTotal);
      } else {
        acc["Menor ou igual a 30"] = Number(item.areaTotal) ?? 0;
      }
    } else if (ground > 30 && ground <= 40) {
      if (acc["Menor ou igual a 40"]) {
        acc["Menor ou igual a 40"] += Number(item.areaTotal);
      } else {
        acc["Menor ou igual a 40"] = Number(item.areaTotal) ?? 0;
      }
    } else if (ground > 40 && ground <= 50) {
      if (acc["Menor ou igual a 50"]) {
        acc["Menor ou igual a 50"] += Number(item.areaTotal);
      } else {
        acc["Menor ou igual a 50"] = Number(item.areaTotal) ?? 0;
      }
    } else {
      if (acc["Maior que 50"]) {
        acc["Maior que 50"] += Number(item.areaTotal);
      } else {
        acc["Maior que 50"] = Number(item.areaTotal) ?? 0;
      }
    }

    return acc;
  }, {});
}

export function groupDataFarmsByPlantedCulture(
  array: Propriedade[],
  arrayCulture: CulturasPlantadas[]
) {
  return array.reduce((acc: any, item) => {
    const filterFarmsWithCulture = arrayCulture.filter(
      (value) => value.idFazenda === item.nome
    );

    filterFarmsWithCulture.map((data) => {
      if (acc[data.cultura]) {
        acc[data.cultura] += acc[data.cultura]++;
      } else {
        acc[data.cultura] = 1;
      }
    });

    return acc;
  }, {});
}

export function groupDataHectaresByPlantedCulture(
  array: Propriedade[],
  arrayCulture: CulturasPlantadas[]
) {
  return array.reduce((acc: any, item) => {
    const filterFarmsWithCulture = arrayCulture.filter(
      (value) => value.idFazenda === item.nome
    );

    filterFarmsWithCulture.map((data) => {
      if (acc[data.cultura]) {
        acc[data.cultura] += item.areaTotal;
      } else {
        acc[data.cultura] = item.areaTotal ?? 0;
      }
    });

    return acc;
  }, {});
}
