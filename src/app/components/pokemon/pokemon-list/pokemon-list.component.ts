import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { PokemonApiHttpServiceComponent } from 'src/app/core/services/pokemon-api-http-service/pokemon-api-http-service.component';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css']
})
export class PokemonListComponent implements OnInit, OnDestroy{

  readonly PADRONIZED_ID_POKEMON = "#0000"

  title = 'AngularPokedex';
  pokemonList : Subscription;
  pokemonStatus : Subscription;

  urlTypeSvg = "../../../../assets/img/"

  constructor(private pokemonApi : PokemonApiHttpServiceComponent) {
  }

  ngOnDestroy(): void {
    this.pokemonList.unsubscribe()
    this.pokemonStatus.unsubscribe()
  }

  ngOnInit(): void {
    this.listPokemon()
  }

  padronizeIdPokemon(id : String) : String{
    return this.PADRONIZED_ID_POKEMON.slice(0,-id.toString().length) + id 
  }
  
  firstLetterCapitalized(name : String) : String {
    return 
  }

  updatePokemonApi(pokemon : any, status : any){
    let tempTypes: string[] = []
    status.types.map((types) => {
      tempTypes.push(this.urlTypeSvg.concat(JSON.stringify(types.type.name).replace(/"/g, '').concat(".svg")))
    })

    pokemon.name = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
    pokemon.id = this.padronizeIdPokemon(status.id)
    pokemon.types = tempTypes
    pokemon.sprite = status.sprites.front_default
    pokemon.gif = status.sprites.versions["generation-v"]["black-white"].animated.front_default
    return pokemon
  }

  listPokemon(){
    this.pokemonApi.getAllPokemons().subscribe((pokemonList) => {
      pokemonList.results.map((pokemon) => { 
        this.pokemonStatus = this.pokemonApi.getPokemonByUrl(pokemon.url)
          .subscribe((status) => {
            pokemon = this.updatePokemonApi(pokemon, status)
          })
        })

      this.pokemonList = pokemonList.results
    }
    )
  }

  

}
