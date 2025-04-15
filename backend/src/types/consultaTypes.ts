export interface Consulta {
  tipoDeVinculo: string;
  dataDeInicio: Date | null;
  dataDeTermino?: Date | null;
  localizacao: string;
  lotacao: string;
  cargo: string;
}
