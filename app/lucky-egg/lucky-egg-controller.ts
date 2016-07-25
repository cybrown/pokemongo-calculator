import {LuckyEggService, IPokemon, IBagData, IBagOptimization} from "./lucky-egg-service";

export class LuckyEggController {

    pokemonNameLang: string;

    pokemonList: IPokemon[];

    bagDataList: IBagData[];

    bagInput: IBagData;

    bagOptimization: IBagOptimization;

    static $inject = ["LuckyEggService"];

    constructor(private luckyEggService: LuckyEggService) {
        this.pokemonList = luckyEggService.constructPokemonList();
        this.bagDataList = localStorage.getItem("data") ? JSON.parse(localStorage.getItem("data")) : [];
        this.pokemonNameLang = localStorage.getItem("lang") ? localStorage.getItem("lang") : "En";
        this.initInput();
    }

    addInputToBag() {
        if (this.bagInput.pokemon && this.bagInput.pokemonCount && this.bagInput.pokemonCount) {
            this.bagDataList.push(this.bagInput);
            this.initInput();
        }
    }

    removeFromBag(data: IBagData) {
        this.bagDataList = this.bagDataList.filter((value: IBagData) => value !== data);
    }

    initInput() {
        this.bagInput = {
            pokemon: null,
            pokemonCount: null,
            candyCount: null
        };
    }

    optimizeBag() {
        localStorage.setItem("data", JSON.stringify(this.bagDataList));
        this.bagOptimization = this.luckyEggService.optimize(this.bagDataList);
    }

    resetData() {
        this.bagDataList = [];
        localStorage.removeItem("data");
        this.bagOptimization = null;
    }

    setPokemonNameLang(lang: string) {
        localStorage.setItem("lang", lang);
        this.pokemonNameLang = lang;
    }

    getPokemonName(pokemon: IPokemon): string {
        if (this.pokemonNameLang === "Fr") {
            return pokemon.nameFr;
        } else {
            return pokemon.nameEn;
        }
    }
}
