module UserProfile {
    "use strict";

    import IStateProvider = angular.ui.IStateProvider;
    import IQService = angular.IQService;
    import IQResolveReject = angular.IQResolveReject;
    
    export class Router {
        static $inject = ['$stateProvider'];

        constructor($stateProvider: IStateProvider) {
            $stateProvider
                .state('Books', {
                    url: '/books',
                    parent: 'index',
                    views: {
                        'inner-page': {
                            controller: 'BooksController',
                            controllerAs: '$ctrl',
                            template: require('./views/list.html'),
                            resolve: {
                                resolveModule: ['$q', '$loadOnDemand', function($q: IQService, $loadOnDemand) {
                                    return $q(function(resolve: IQResolveReject<void>) {
                                        require.ensure([], function() {
                                            require([
                                                './controllers/booksController',
                                            ], registerModules($q, $loadOnDemand, resolve));
                                        });
                                    });
                                }]
                            }
                        }
                    }
                })
                .state('Books.edit', {
                    url: '/books/edit/:id',
                    parent: 'index',
                    views: {
                        'inner-page': {
                            controller: 'EditBookController',
                            controllerAs: '$ctrl',
                            template: require('./views/edit.html'),
                            resolve: {
                                resolveModule: ['$q', '$loadOnDemand', function($q: IQService, $loadOnDemand) {
                                    return $q(function(resolve: IQResolveReject<void>) {
                                        require.ensure([], function() {
                                            require([
                                                './controllers/editBookController',
                                            ], registerModules($q, $loadOnDemand, resolve));
                                        });
                                    });
                                }]
                            }
                        }
                    }
                })
                .state('Books.add', {
                    url: '^/books/add',
                    parent: 'Books.edit',
                })
            }
    }
}

angular.module('app').config(UserProfile.Router);
