export interface IPokemon {
    id: number;
    nameEn: string;
    nameFr: string;
    candiesToEvolve: number;
}

export interface IBagData {
    pokemon: IPokemon;
    pokemonCount: number;
    candyCount: number;
}

export interface IBagOptimization {
    optimizations: IPokemonOptimization[];
    timeToEvolve: number;
    totalEvolutionCount: number;
}

export interface IPokemonOptimization {
    pokemon: IPokemon;
    transferCount: number;
    candyAfterTransfer: number;
    pokemonAfterTransfer: number;
    evolutionCount: number;
    pokemonLeft: number;
    candyLeft: number;
}

export class LuckyEggService {

    static $inject = [];

    static TIME_TO_EVOLVE = 0.5;
    static XP_PER_EVOLVE = 500;

    constructor() {
        // no default action
    }

    public constructPokemonList(): IPokemon[] {
        let data = <any> require("json!../data/pokemon-data.json");
        return data;
    }

    public optimize(bag: IBagData[]): IBagOptimization {

        let bagOptimization: IBagOptimization = {
            optimizations: [],
            timeToEvolve: 0,
            totalEvolutionCount: 0
        };

        bag.forEach(bagData => {
            let candiesLeft = bagData.candyCount;
            let pokemonLeft = bagData.pokemonCount;
            let evolutions = 0;
            while (Math.floor(candiesLeft / bagData.pokemon.candiesToEvolve) > 0) {
                let possibleEvolutions = Math.floor(candiesLeft / bagData.pokemon.candiesToEvolve);
                if (possibleEvolutions > pokemonLeft) {
                    possibleEvolutions = pokemonLeft;
                }
                evolutions += possibleEvolutions;
                pokemonLeft -= possibleEvolutions;
                // 1 evolution = 1 candy
                candiesLeft -= possibleEvolutions * (bagData.pokemon.candiesToEvolve - 1);
            }

            // not enough candies to evolve, can i have more candies by transfering ?
            let transfers = 0;
            while ( Math.floor((pokemonLeft + candiesLeft) / (bagData.pokemon.candiesToEvolve + 1)) > 0) {
                let possibleSecondEvolutions = Math.floor((pokemonLeft + candiesLeft) / (bagData.pokemon.candiesToEvolve + 1));
                evolutions += possibleSecondEvolutions;
                transfers += possibleSecondEvolutions * bagData.pokemon.candiesToEvolve - candiesLeft;
                pokemonLeft = pokemonLeft + candiesLeft - possibleSecondEvolutions * (bagData.pokemon.candiesToEvolve + 1);
                candiesLeft = possibleSecondEvolutions;
            }

            let pokemonOptimization = {
                pokemon: bagData.pokemon,
                transferCount: transfers,
                candyAfterTransfer: bagData.candyCount + transfers,
                pokemonAfterTransfer: bagData.pokemonCount - transfers,
                evolutionCount: evolutions,
                pokemonLeft: pokemonLeft,
                candyLeft: candiesLeft
            };

            bagOptimization.optimizations.push(pokemonOptimization);
            bagOptimization.timeToEvolve += pokemonOptimization.evolutionCount * LuckyEggService.TIME_TO_EVOLVE;
            bagOptimization.totalEvolutionCount += pokemonOptimization.evolutionCount;
        });

        return bagOptimization;
    }
}
