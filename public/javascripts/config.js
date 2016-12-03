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
            key:'f2a3a01ca9184c3bfe675e8ccc2247',
            product: 'auth',
        });
})
