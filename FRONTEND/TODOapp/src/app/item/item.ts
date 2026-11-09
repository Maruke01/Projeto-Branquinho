import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Tarefa } from "../tarefa";

@Component({
  selector: 'app-item',
  standalone: false,
  templateUrl: './item.html',
  styleUrl: './item.css'
})
export class ItemComponent {
  emEdicao = false;
  @Input() tarefa: Tarefa = new Tarefa("", false);

  @Output() remover = new EventEmitter<void>();
  @Output() atualizar = new EventEmitter<Tarefa>();

  salvarEdicao(descricao: string) {
    this.tarefa.descricao = descricao;
    this.emEdicao = false;
    this.atualizar.emit(this.tarefa);
  }

  alterarStatus(statusRealizada: boolean) {
    this.tarefa.statusRealizada = statusRealizada;
    this.atualizar.emit(this.tarefa);
  }
}
