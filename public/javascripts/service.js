app.service("login", function($http) {
    return {
        getuser:function(){
            return $http.get("/addAccount")
        }
    }
})
app.service("logout", function($http) {
    return {
        logout:function(){
          console.log("out");
           return $http.get("/logout")
        }
    }
})
app.service("verified", function($http) {
    return {
        verified:function(){
            return $http.get("/verified")
        }
    }
})
