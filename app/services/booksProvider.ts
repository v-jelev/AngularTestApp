import IResourceService = angular.resource.IResourceService;
import IActionDescriptor = angular.resource.IActionDescriptor;
import IInjectorService = angular.auto.IInjectorService;

class booksProvider {
    static $inject = ['$resource', '$injector'];

    constructor($resource: IResourceService) {
        return $resource(API_URL + '/api/books/:id', {id: '@_id'}, {
            'update': {method: 'PUT'}
        });
    }
}

export = angular
    .module('services.booksProvider', [])
    .factory('booksProvider', booksProvider);