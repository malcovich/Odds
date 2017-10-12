angular.module('MyApp')
.controller('MatchDetailsController', ['$scope', '$state', 'user', 'OddFactory','$rootScope', '$http','$filter', function($scope, $state, user, OddFactory, $rootScope, $http, $filter){
    var $ctrl = this;
    $ctrl.user = user.data;
   
    $ctrl.homeTeamResults = [];
    $ctrl.awayTeamResults = [];
    $ctrl.totalOv1 = [];

    $ctrl.deltaPoint = 0;

    $http.post('/api/fixture/getItem', {'id' : $state.params.id}).then(function(res){
       $ctrl.match = res.data;
  
        $http.post('/api/fixture/getListPrevMatch', {'matchday' :$ctrl.match.matchday, 'names': [$ctrl.match.homeTeamName, $ctrl.match.awayTeamName]}).then(function(res){
            $ctrl.list = res.data;

            $ctrl.homeMatches = $ctrl.list.filter(function(match){
                return match.homeTeamName == $ctrl.match.homeTeamName ||  match.awayTeamName == $ctrl.match.homeTeamName;
            });
            $ctrl.homeMatches = $filter('orderBy')($ctrl.homeMatches, 'date');

            $ctrl.awayMatches = $ctrl.list.filter(function(match){
                return match.homeTeamName == $ctrl.match.awayTeamName ||  match.awayTeamName == $ctrl.match.awayTeamName;
            });
            $ctrl.awayMatches = $filter('orderBy')($ctrl.awayMatches, 'date');

            $ctrl.homeMatches.forEach(function(m){
                $ctrl.homeTeamResults.push(checkMatch(m, $ctrl.match.homeTeamName));
                $ctrl.totalOv1.push(checkTotalOv1(m));
            });

            $ctrl.awayMatches.forEach(function(m){
                $ctrl.awayTeamResults.push(checkMatch(m, $ctrl.match.awayTeamName));
                $ctrl.totalOv1.push(checkTotalOv1(m));
            });

            $ctrl.matchStatus = calculateDeltaPoint($ctrl.homeTeamResults, $ctrl.awayTeamResults)

        });
    })

    function checkMatch (match, team) {
        if (match.homeTeamName == team) {
            if (match.result.goalsHomeTeam > match.result.goalsAwayTeam) {
                return { "r":"W", 'color' : ' u-label-success'}
            }else if (match.result.goalsHomeTeam < match.result.goalsAwayTeam){
                return { "r":"L", 'color' : ' u-label-danger '}
            }else {
                return { "r":"D", 'color' : ' u-label-warning '}
            }
        }else {
            if (match.result.goalsHomeTeam > match.result.goalsAwayTeam) {
                return { "r":"L", 'color' : ' u-label-danger '}
            }else if (match.result.goalsHomeTeam < match.result.goalsAwayTeam){
                return { "r":"W", 'color' : ' u-label-success'}
            }else {
                return { "r":"D", 'color' : ' u-label-warning '}
            }
        }
    } 

    function checkTotalOv1 (m){
        if (m.result.goalsHomeTeam + m.result.goalsAwayTeam > 1){
            return { "text":"+", 'color' : ' u-label-success '}
        }else {
            return { "text":"-", 'color' : ' u-label-danger '}
        }
    }

    function calculateDeltaPoint(h, a){
        var hP = 0;
        var aP = 0;
        h.forEach(function(h1){
            if (h1.r == "W"){
                hP+=3;
            }
            if (h1.r == "D"){
                hP+=1;
            }
        });
        a.forEach(function(a1){
            if (a1.r == "W"){
                aP+=3;
            }
            if (a1.r == "D"){
                aP+=1;
            }
        });

        if ((hP-aP >= 5) && (hP >= 10) ){
            return {
                delta : hP-aP,
                'status': "Интересен, вероятна победа домашней команды"
            }
        }
        if ((aP -hP >= 5) && (aP >= 10) ){
            return {
                delta : aP-hP,
                'status': "Интересен, вероятна победа гостевой команды"
            }
        }


    }
}]);
