import {LuckyEggService} from "./lucky-egg-service";
import {IPokemon} from "./lucky-egg-service";

export class LuckyEggController {

    pokemonList: IPokemon[];

    static $inject = ["LuckyEggService"];

    constructor(private luckyEggService: LuckyEggService) {
        this.pokemonList = luckyEggService.constructPokemonList();
    }
}
