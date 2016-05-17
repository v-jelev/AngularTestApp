class EditBookController {
    static $inject = [
        '$state',
        'booksProvider'
    ];

    public book;

    constructor(public $state, booksProvider) {
        this.book = ($state.params.id) ?
            booksProvider.get({id: $state.params.id}) :
            new booksProvider()
    }

    save() {
        var method = this.book['_id'] ? '$update' : '$save';

        this.book[method]().then(() => {
            this.$state.go('Books');
        });
    }
}

export = angular
    .module('modules.books.controllers.editBookController', [
        require('services/booksProvider').name
    ])
    .controller('EditBookController', EditBookController);
