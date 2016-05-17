/// <reference path="../angularjs/angular.d.ts" />

import IQService = angular.IQService;
import IQResolveReject = angular.IQResolveReject;
import IPromise = angular.IPromise;

interface IRegisterModulesReturnStatement {
    (): void;
}

interface IRegisterModules {
    <T>($q: IQService, $loadOnDemand, resolve: IQResolveReject<T>): IRegisterModulesReturnStatement;
}


declare var registerModules: IRegisterModules;
declare var API_URL: string;