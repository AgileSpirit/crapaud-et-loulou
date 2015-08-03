'use strict';

angular.module('app.controllers', [])

    .controller('HomeCtrl', ['$scope', 'Prismic', function($scope, Prismic) {

        Prismic.document("Vb6DviAAAB4A1fb4").then(function (document) {
            $scope.document = document;
        });

    }])

    .controller('DocumentCtrl', ['$scope', '$routeParams', 'Prismic', '$location', function ($scope, $routeParams, Prismic, $location) {
        Prismic.document($routeParams.id).then(function (document) {
            if (document.slug === $routeParams.slug) {
                Prismic.ctx().then(function (ctx) {
                    $scope.documentHtml = document.asHtml(ctx);
                })
            }
            else if (document.slugs.indexOf($routeParams.slug) >= 0) {
                $location.path('/document/' + document.id + '/' + document.slug);
            }
            else {
                // Should display some kind of error; will just redirect to / for now
                $location.path('/');
            }
        });
    }]);
