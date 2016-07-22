/// <reference path="../typings/index.d.ts" />
/// <reference path="app.d.ts" />

import "../node_modules/bootstrap/dist/css/bootstrap.css";
import "../node_modules/font-awesome/css/font-awesome.css";
import "./app.less";
import "./home/home.less";
import "./lucky-egg/lucky-egg.less";

import "angular";
import "angular-ui-router";
import "angular-ui-bootstrap";

import {HomeController} from "./home/home-controller";
import {LuckyEggController} from "./lucky-egg/lucky-egg-controller";
import {LuckyEggService} from "./lucky-egg/lucky-egg-service";
import {NavController} from "./components/nav/nav-controller";

const pokemonGoCalculator = angular.module("pokemonGoCalculator", ["ui.bootstrap", "ui.router"]);

pokemonGoCalculator.config(["$stateProvider", "$urlRouterProvider", function ($stateProvider: ng.ui.IStateProvider, $urlRouterProvider: ng.ui.IUrlRouterProvider) {
    // For any unmatched url, redirect to /
    $urlRouterProvider.otherwise("/luckyEgg");
    $stateProvider
    .state("luckyEgg", {
        url: "/luckyEgg",
        controller: "LuckyEggController",
        controllerAs: "ctrl",
        template: require("./lucky-egg/lucky-egg.html")
    });
}]);

pokemonGoCalculator.controller("HomeController", HomeController);
pokemonGoCalculator.controller("LuckyEggController", LuckyEggController);
pokemonGoCalculator.controller("NavController", NavController);

pokemonGoCalculator.service("LuckyEggService", LuckyEggService);
