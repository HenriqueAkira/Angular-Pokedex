import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-pokemon-item',
  templateUrl: './pokemon-item.component.html',
  styleUrls: ['./pokemon-item.component.css']
})
export class PokemonItemComponent implements OnInit {

  @Input("pokemon") pokemon

  constructor() { }

  ngOnInit(): void {
  }

  switchClass(a: string): string{
    const rExp = new RegExp("(?<=img/)(.*)(?=.svg)")
    const classType = rExp.exec(a)[1]
    // document.getElementById("iconType").setAttribute("alt", "alfafaft")
    
    return classType

  }

}
