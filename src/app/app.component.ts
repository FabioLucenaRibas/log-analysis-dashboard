import { Component } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'log-analysis-dashboard';

  constructor(private config: PrimeNGConfig) { }

  ngOnInit() {
    this.config.setTranslation(
      {
        "startsWith": "Começa com",
        "contains": "Contém",
        "notContains": "Não contém",
        "endsWith": "Termina com",
        "equals": "É igual a",
        "notEquals": "Não é igual a",
        "noFilter": "Sem filtro",
        "lt": "Menor que",
        "lte": "Menos que ou igual a",
        "gt": "Maior que",
        "gte": "Melhor que ou igual a",
        "is": "É",
        "isNot": "Não é",
        "before": "Antes",
        "after": "Depois",
        "dateIs": "A data é",
        "dateIsNot": "A data não é",
        "dateBefore": "A data é anterior a",
        "dateAfter": "A data é depois de",
        "clear": "Limpar",
        "apply": "Aplicar",
        "matchAll": "Match All",
        "matchAny": "Match Any",
        "addRule": "Adicionar regra",
        "removeRule": "Remover regra",
        "accept": "Sim",
        "reject": "Não",
        "choose": "Escolher",
        "upload": "Enviar",
        "cancel": "Cancelar",
        "dayNames": ["Domingo ", "Segunda-feira", "Terça-feira", "Quarta-feira ", "Quarta-feira ", "Sexta-feira ", "Sábado"],
        "dayNamesShort": ["Dom", "Seg", "Terç", "Qua", "Qui", "Sex", "Sáb"],
        "dayNamesMin": ["Do", "Se", "Te", "Qa", "Qi", "Sx", "Sa"],
        "monthNames": ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Junho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"],
        "monthNamesShort": ["Jan", "Fev", "Mar", "Abr", "Maio", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"],
        "dateFormat": "dd/mm/yy",
        "firstDayOfWeek": 0,
        "today": "Hoje",
        "weekHeader": "Cabeçalho da semana",
        "weak": 'Weak',
        "medium": 'Medium',
        "strong": 'Strong',
        "passwordPrompt": 'Insira uma senha',
        "emptyMessage": 'Nenhum resultado encontrado',
        "emptyFilterMessage": 'Nenhum resultado encontrado'
      });
  }
}
