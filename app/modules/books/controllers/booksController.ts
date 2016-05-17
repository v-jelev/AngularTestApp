class BooksController {
    static $inject = [
        '$q',
        '$http',
        'booksProvider'
    ];

    public books: any[] = [];
    public loading: boolean = false;

    constructor(public $q, public $http, booksProvider) {
        this.books = booksProvider.query();
        this.loading = true;

        this.books.$promise.then(() => {
            this.loading = false;
        })
    }

    remove(book, index) {
        book.$delete().then(() => {
            this.books.splice(index, 1);
        });
    }
}

export = angular
    .module('modules.books.controllers.booksController', [
        <string>require('services/booksProvider').name
    ])
    .controller('BooksController', BooksController);
