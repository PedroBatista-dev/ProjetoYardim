import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { observable } from 'rxjs';

@Component({
  selector: 'app-converter',
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.css']
})
export class ConverterComponent implements OnInit {

  textoJson: string = ""
  textoCsv: string = ""
  displayedColumns: Array<string>
    

  constructor(private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  validarJSON(): Boolean {
    try {
      const objJSON: any = JSON.parse(this.textoJson)
    } catch (error) {
      this.showMessage("Arquivo JSON inválido!")
      return false
    }
    return true
  }


  converterJson(): void {

    let validator: Boolean = this.validarJSON()
    
    if (validator) {

      const objJSON: any = JSON.parse(this.textoJson)
      
      let array: any
      
      if (Object.keys(objJSON)[0] != "0") {
        if (typeof Object.values(objJSON)[0] == 'object'){
          if (typeof Object.values(objJSON)[0][0] == 'object'){
            array = Object.values(objJSON)[0]
          } else {
            array = [Object.values(objJSON)[0]]
          }
            
        } else {
          array = [objJSON]
        }
        
      } else {
        array = Array.from(objJSON)
      }
      

      let csv: string = ''
      let header: string = ''
      for (let i in array) {
        let line: string = '';
        for (let j in array[i]) {
          if (parseInt(i) == 0) header += j + ','
          if (line != '') line += ','

          line += array[i][j]
        }

        csv += line + '\r\n'
      }
      header = header.substring(0, header.length - 1)
      csv = header + '\r\n' + csv
      this.textoCsv = csv
      this.showMessage("JSON convertido com sucesso!")
      this.displayedColumns = []
      this.displayedColumns = header.split(",");
      this.removerCorpoTabela()
      this.criarLinhaTabela(array)
    }

  }

  criarLinhaTabela(array: any): void {
    let tabela = document.querySelector("table")
    let corpo_tabela = document.createElement("tbody")

    for (let i in array) {
      let linha: HTMLTableRowElement = document.createElement("tr")
      for (let j in array[i]) {

        let coluna: HTMLTableDataCellElement = document.createElement("td")
        let texto = document.createTextNode(array[i][j])
        coluna.appendChild(texto)
        linha.appendChild(coluna)
      }
      
      corpo_tabela.appendChild(linha)
      tabela.appendChild(corpo_tabela)
    }
  }

  removerCorpoTabela(): void {
    try {
      let corpo_tabela = document.querySelector("tbody")
      let tabela = document.querySelector("table")
      tabela.removeChild(corpo_tabela)
    } catch (error) {

    }
  }

  limpar(): void {
    this.textoJson = ""
    this.textoCsv = ""
    this.displayedColumns = []
    this.removerCorpoTabela()
    this.showMessage("Campos apagados com sucesso!")

  }

  showMessage(msg: string): void {
    this._snackBar.open(msg, '', {
      duration: 1000,
      horizontalPosition: "right",
      verticalPosition: "top"
    });
  }

}
