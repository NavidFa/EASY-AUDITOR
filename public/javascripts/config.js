'use strict';
app.config(function($routeProvider, $locationProvider, plaidProvider) {

    $routeProvider
        .when('/', {
            templateUrl: '../templates/login.html',
            controller:'login'
        })
        .when('/register/', {
          templateUrl: '../templates/register.html',
          controller:'register'
        })
        .when('/addAccount/', {
          templateUrl: '../templates/addAccount.html',
          controller:'addAccount',
        })
        .when('/dashboard/', {
          templateUrl: '../templates/dashboard.html',
          controller:'dashboard'
        })
        plaidProvider.init({
            clientName: 'My App',
            env: 'tartan',
            key:'02458e879bce5785f050d83ddd6320',
            product: 'auth',
        });
})
