import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common'; // Adicione esta linha
import { Tarefa } from './tarefa';
import { HttpClient } from '@angular/common/http';
import { ItemComponent } from './item/item'; // Ajustado para o nome real do arquivo do item
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  standalone: false, // Ou verifique se o seu projeto usa NgModule (AppModule)
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})

export class AppComponent {
  title = 'TODOapp';
  
  arrayDeTarefas = signal<Tarefa[]>([]);
  apiURL: string;

  constructor(private http: HttpClient) {
    this.apiURL = environment.apiURL;
    this.READ_tarefas();
  }

  CREATE_tarefa(descricaoNovaTarefa: string) {
    var novaTarefa = new Tarefa(descricaoNovaTarefa, false);
    this.http.post<Tarefa>(`${this.apiURL}/api/post`, novaTarefa).subscribe(
      resultado => {
        console.log(resultado);
        this.READ_tarefas();
      }
    );
  }

  READ_tarefas() {
    this.http.get<Tarefa[]>(`${this.apiURL}/api/getAll`).subscribe(
      resultado => this.arrayDeTarefas.set(resultado)
    );
  }

  DELETE_tarefa(tarefaAserRemovida: Tarefa) {
    var indice = this.arrayDeTarefas().indexOf(tarefaAserRemovida);
    var id = this.arrayDeTarefas()[indice]._id || this.arrayDeTarefas()[indice].id;
    this.http.delete<Tarefa>(`${this.apiURL}/api/delete/${id}`).subscribe(
      resultado => {
        console.log(resultado);
        this.READ_tarefas();
      }
    );
  }

  UPDATE_tarefa(tarefaAserModificada: Tarefa) {
    var indice = this.arrayDeTarefas().indexOf(tarefaAserModificada);
    var id = this.arrayDeTarefas()[indice]._id || this.arrayDeTarefas()[indice].id;
    this.http.patch<Tarefa>(`${this.apiURL}/api/update/${id}`, tarefaAserModificada).subscribe(
      resultado => {
        console.log(resultado);
        this.READ_tarefas();
      }
    );
  }
}
