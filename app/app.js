angular
    .module('app', [
        'ngSanitize',
        'ngResource',
        'ui.router',
        require('vendors/load-on-demand')
    ])
    .config(configureApp)
    .filter('truncate', ['$filter', function($filter) {
    return function(text, limit) {
        if (text) {
            return ($filter('limitTo')(text, limit)) + (limit && text.length > limit ? '...' : '');
        }

        return text;
    };
}]);

window.registerModules = function ($q, $loadOnDemand, resolve) {
    return function() {
        var defered = [];
        angular.forEach(arguments, function(module) {
            defered.push($q(function(resolve) {
                module.name ?
                    $loadOnDemand.load(module.name, function() {
                        resolve();
                    }) :
                    resolve();
            }));
        });

        $q.all(defered).then(function() {
            resolve();
        });
    }
};

configureApp.$inject = ['$httpProvider', '$compileProvider', '$locationProvider', '$stateProvider', '$urlRouterProvider'];
function configureApp($httpProvider, $compileProvider, $locationProvider, $stateProvider, $urlRouterProvider) {
    console.log(API_URL);
    $httpProvider.useApplyAsync(true);
    $compileProvider.debugInfoEnabled(false);
    $locationProvider.html5Mode(true).hashPrefix('!');

    $stateProvider
        .state('index', {
            abstract: true,
            views: {layout: {template: require('./view/Layout/default.html')}}
        });

    $urlRouterProvider.otherwise('/books');


}

require('./modules/books/routes');
