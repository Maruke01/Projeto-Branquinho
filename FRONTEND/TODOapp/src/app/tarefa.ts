export class Tarefa {
  id: string | undefined;
  _id: string | undefined;
  descricao: string;
  statusRealizada: boolean;

  constructor(descricao: string, statusRealizada: boolean) {
    this.descricao = descricao;
    this.statusRealizada = statusRealizada;
  }
}