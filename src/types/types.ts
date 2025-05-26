export type Propriedade = {
  id?: string;
  idProdutor: string;
  nome: string;
  cidade: string;
  estado: string;
  areaTotal: number;
  areaAgricultavel: number;
  areaVegetacao: number;
  safra: Safra;
};

export type Produtor = {
  id?: string;
  cpfCnpj: string;
  nome: string;
};

export type Safra = {
  id?: string;
  idFazenda: string;
  anoSafra: string;
};
export type CulturasPlantadas = {
  id?: string;
  idFazenda: string;
  idSafra: string;
  cultura: string;
};

export type ActionRedux = {
  type: string;
  payload: any;
};
