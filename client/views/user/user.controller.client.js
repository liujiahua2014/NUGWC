(function(){
    angular
        .module("nugwc")
        .controller("LoginController", LoginController);

    function LoginController($location, UserService) {
        var vm = this;
        vm.login = login;

        function login(user) {
            UserService
                .login(user)
                .success(function(user){
                    if(user === '0') {
                        vm.alert = "No such user";
                    } else {
                        $location.url("/event");
                    }
                })
                .error(function(msg){
                    vm.alert = msg;
                });
        }
    }
})();