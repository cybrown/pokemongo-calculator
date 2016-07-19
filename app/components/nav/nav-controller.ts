export class NavController {

    static $inject = ["$location"];

    constructor( private $location: ng.ILocationService) {
        // no default action
    }

    isActive(path: string): boolean {
        return this.$location.path() === path;
    }
}
