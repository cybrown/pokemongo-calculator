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
            let pokemonOptimization: IPokemonOptimization = null;
            let possibleEvolutionCount = Math.floor(bagData.candyCount / bagData.pokemon.candiesToEvolve);
            if (possibleEvolutionCount > bagData.pokemonCount) {
                pokemonOptimization = {
                    pokemon: bagData.pokemon,
                    transferCount: 0,
                    candyAfterTransfer: bagData.candyCount,
                    pokemonAfterTransfer: bagData.pokemonCount,
                    evolutionCount: bagData.pokemonCount,
                    pokemonLeft: 0,
                    candyLeft: bagData.candyCount - bagData.pokemonCount * bagData.pokemon.candiesToEvolve
                };
            } else {
                let candiesLeftAfterFirstEvolution = bagData.candyCount % bagData.pokemon.candiesToEvolve;
                let possibleTransferCount = bagData.pokemonCount - possibleEvolutionCount;

                let supplementEvolutionCount = Math.floor((possibleTransferCount + candiesLeftAfterFirstEvolution) / (bagData.pokemon.candiesToEvolve + 1));

                let transferCount = Math.max(supplementEvolutionCount * bagData.pokemon.candiesToEvolve - candiesLeftAfterFirstEvolution, 0);
                let evolutionCount = possibleEvolutionCount + supplementEvolutionCount;

                let pokemonLeft = bagData.pokemonCount - transferCount - evolutionCount;
                let candyLeft = bagData.candyCount + transferCount - (bagData.pokemon.candiesToEvolve * evolutionCount);

                pokemonOptimization = {
                    pokemon: bagData.pokemon,
                    transferCount: transferCount,
                    candyAfterTransfer: bagData.candyCount + transferCount,
                    pokemonAfterTransfer: bagData.pokemonCount - transferCount,
                    evolutionCount: evolutionCount,
                    pokemonLeft: pokemonLeft,
                    candyLeft: candyLeft
                };
            }

            bagOptimization.optimizations.push(pokemonOptimization);
            bagOptimization.timeToEvolve += pokemonOptimization.evolutionCount * LuckyEggService.TIME_TO_EVOLVE;
            bagOptimization.totalEvolutionCount += pokemonOptimization.evolutionCount;
        });

        return bagOptimization;
    }
}
