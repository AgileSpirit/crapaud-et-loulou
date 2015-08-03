'use strict';

angular.module('app', ['ngRoute', 'prismic.io', 'app.controllers', 'app.services', 'ngSanitize'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/', {templateUrl: 'partials/home.html', controller: 'HomeCtrl'});
        $routeProvider.when('/document/:id/:slug', {templateUrl: 'partials/document.html', controller: 'DocumentCtrl'});
        $routeProvider.otherwise({redirectTo: '/'});
    }])

    .config(['PrismicProvider', function (PrismicProvider) {
        PrismicProvider.setApiEndpoint('https://crapaud-et-loulou.cdn.prismic.io/api');
        PrismicProvider.setAccessToken('');
        PrismicProvider.setClientId('');
        PrismicProvider.setClientSecret('');
        PrismicProvider.setLinkResolver(function (ctx, doc) {
            return '#/document/' + doc.id + '/' + doc.slug + ctx.maybeRefParam;
        });
    }]);