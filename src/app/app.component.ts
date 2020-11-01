import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'gene-motif';
  dataFile : any;
  gene: string;
  motif: string;
  motifArr : any;
  geneArr : any;
  geneFlag = false;
  motifFlag = false;

  private _jsonURL = 'assets/all_genes.json';
  constructor(private http: HttpClient) {
    this.getJSON().subscribe(data => {
      this.dataFile = data;
     });
  }
  public getJSON(): Observable<any> {
    return this.http.get(this._jsonURL);
  }

  ngOnInit() {}

  fetchmotif() {
    this.motifArr = [];
    if(this.gene == undefined || this.gene == "") {
      alert("Enter Gene!");
    }
    for(let val of this.dataFile) {
      if(val.gene == this.gene) {
        this.motifArr.push(val.nearest_motifs);
        this.motifFlag = true;
      }
    }
  }

  fetchgene() {
    this.geneArr = [];
    if(this.motif == undefined || this.motif == "") {
      alert("Enter Motif!");
    }
    for(let val of this.dataFile) {
      for(let motif_val of val.nearest_motifs) {
        if(motif_val == this.motif) {
          this.geneArr.push(val.gene);
          this.geneFlag = true;
        }
      }
    }
  }

}
