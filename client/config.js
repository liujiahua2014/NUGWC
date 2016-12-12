(function(){
    angular
        .module("nugwc")
        .config(Config);

    function Config($routeProvider) {
        $routeProvider
            .when("/", {
                redirectTo: "/login"
            })
            .when("/login", {
                templateUrl: "views/user/login.view.client.html",
                controller: "LoginController",
                controllerAs: "model"
            })
            .when("/login/client", {
                templateUrl: "views/user-client/login.view.client.html",
                controller: "LoginController",
                controllerAs: "model"
            })
            .when("/event", {
                templateUrl: "views/event/event-list.view.client.html",
                controller: "EventListController",
                controllerAs: "model",
                resolve: {checkLogin: checkLogin}
            })
            .when("/event/new", {
                templateUrl: "views/event/event-new.view.client.html",
                controller: "NewEventController",
                controllerAs: "model",
                resolve: {checkLogin: checkLogin}
            })
            .when("/event/readonly", {
                templateUrl: "views/event-readonly/event-list-readonly.view.client.html",
                controller: "EventListReadonlyController",
                controllerAs: "model"
            })
            .when("/event/:eventID", {
                templateUrl: "views/event/event-edit.view.client.html",
                controller: "EditEventController",
                controllerAs: "model",
                resolve: {checkLogin: checkLogin}
            })
            .when("/event/readonly/:eventID", {
                templateUrl: "views/event-readonly/event-detail-readonly.view.client.html",
                controller: "EventDetailReadonlyController",
                controllerAs: "model"
            })

            // .when("/user/:uid", {
            //     templateUrl: "views/user/profile.view.client.html",
            //     controller: "ProfileController",
            //     controllerAs: "model",
            //     resolve: { loggedin: checkLogin }
            // })

            .otherwise({
                redirectTo: "/login"
            });

        function checkLogin($q, $http, $location) {
            var deferred = $q.defer();
            $http.post('/api/checkLogin')
                .success(
                    function (user) {
                        if(user != '0') {
                            deferred.resolve();
                        } else {
                            deferred.reject();
                            $location.url("/login");
                        }
                    }
                );
            return deferred.promise;
        }
    }
})();