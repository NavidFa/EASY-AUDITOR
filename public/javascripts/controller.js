app.controller('login', function($scope, $http, $location, $routeParams) {
    $scope.registerPage = function() {
        $location.path('/register/')
    }
    $scope.login = function() {
        $http.post('/login', $scope.fields).then(function() {
                $location.path('/addAccount')
            })
            .catch(function() {
                $location.path('/register/')
            })
    }
})
app.controller('register', function($scope, $http, $location, $routeParams) {
    $scope.home = function() {
        $location.path('/')
    }
    $scope.register = function() {
        $http.post('/register', $scope.fields).then(function() {
                $location.path('/')

            })
            .catch(function() {
                $location.path('/register/')
            })

    }
})
app.controller('addAccount', function($scope, $http, $location, $routeParams) {
    $location.path('/dashboard/')
})

app.controller('dashboard', function($scope, $http, $location, $routeParams, login, logout, verified, plaid) {
    login.getuser().then(function(data) {
        $scope.user = data.data
    })
    verified.verified().then(function(data) {
        console.log(data.data);
        $scope.verified = data.data
    })

    $scope.logout = function() {
        $http.get('/logout').then(function() {
            $location.path('/')

        })
    }


    $scope.token = '';
    $scope.plaidIsLoaded = plaid.isLoaded;

    plaid.create({
        onSuccess: function(token) {
            $scope.token = token;
        },
        onExit: function() {
            console.log('user closed');
        }
    })
    $scope.openPlaid = function() {
       plaidLink.open();
     };

})
