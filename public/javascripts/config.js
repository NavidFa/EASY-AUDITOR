'use strict';
app.config(function($routeProvider, $locationProvider, plaidProvider, ChartJsProvider) {

    $routeProvider
        .when('/', {
            templateUrl: '../templates/home.html',
            controller: 'home'

        })
        .when('/login', {
            templateUrl: '../templates/login.html',
            controller: 'login'
        })
        .when('/register/', {
            templateUrl: '../templates/register.html',
            controller: 'register'
        })
        .when('/addAccount/', {
            templateUrl: '../templates/addAccount.html',
            controller: 'addAccount',
        })
        .when('/dashboard/', {
            templateUrl: '../templates/dashboard.html',
            controller: 'dashboard'
        })
        .when('/chart/', {
            templateUrl: '../templates/chart.html',
            controller: 'dashboard'
        })
    plaidProvider.init({
        clientName: 'My App',
        env: 'tartan',
        key: '02458e879bce5785f050d83ddd6320',
        product: 'auth',
    });
    ChartJsProvider.setOptions({
        colors: ['red','green','blue','black']
    });

})
