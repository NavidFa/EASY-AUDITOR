app.controller('login', function($scope, $http, $location, $routeParams) {
  $scope.home = function() {
      $location.path('/')
  }
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
app.controller('home', function($scope, $http, $location, $routeParams){
  $scope.loginPage = function() {
      $location.path('/login/')
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

  $scope.userId
  $scope.arrToken
  $scope.dashinfo = function() {
      $location.path('/chart/')
  }
  $scope.wells = function() {
      $location.path('/wells/')
  }
  $scope.wellspage = function() {
      $location.path('/wellspage/')
  }
  $scope.labels = ['a','Balance','Available Credit','b'];
    $scope.data = [0,400,800,1];
    $scope.data1 = [0,500,500,1];
    $scope.data2 = [0,100,900,1];
    $scope.data3 = [0,200,600,1];


    $scope.color = ['#ffa726','#afb42b','#00e5f','#e57373']

    login.getuser().then(function(data) {
      console.log(data.data);
        $scope.user = data.data
        $scope.userId =  $scope.user.id
        $scope.arrToken = $scope.user.tokens.public_token
        console.log(data.data.tokens.token);

      //  $http.post("https://tartan.plaid.com/balance?client_id=58434421fbfa997d87acb4f7&secret=0f4e383243a3c5282dfb9c89143521&access_token="+data.data.tokens.token).then(function(data){
      //    console.log(data);
       //
      //  })
    })
    verified.verified().then(function(data) {
        $scope.verified = data.data
    })

    $scope.logout = function() {
        $http.get('/logout').then(function() {
            $location.path('/')

        })
    }


    $scope.token = '';
    $scope.plaidIsLoaded = plaid.isLoaded();

    plaid.create({
        onSuccess: function(token, meta) {
            console.log(token);
            console.log(meta);
            $scope.BankName = meta.institution.name
            if(meta.public_token != null || meta.public_token != undefined || meta.institution.name != undefined ){
              console.log($scope.userId,meta.institution.name,meta.public_token);
              $http.post('/AddToken/'+$scope.userId+'/'+meta.institution.name+'/'+meta.public_token)
            }

        },
        onExit: function() {
            console.log('user closed');
        }
    })
    $scope.openPlaid = function() {
        plaid.open();
    };

})
