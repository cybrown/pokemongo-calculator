export interface IPokemon {
    id: number;
    nameEn: string;
    nameFr: string;
    candiesToEvolve: number;
}

export interface IBagData {
    pokemon: IPokemon;
    pokemonnCount: number;
    candyCount: number;
}

export class LuckyEggService {

    static $inject = [];

    constructor() {
        // no default action
    }



    public constructPokemonList(): IPokemon[] {
        let data = <any> require("json!../data/pokemon-data.json");
        return data;
    }


}
