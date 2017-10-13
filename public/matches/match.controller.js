angular.module('MyApp')
.controller('MatchDetailsController', ['$scope', '$state', 'user', 'OddFactory','$rootScope', '$http','$filter', function($scope, $state, user, OddFactory, $rootScope, $http, $filter){
    var $ctrl = this;
    $ctrl.user = user.data;
   
    $ctrl.homeTeamResults = [];
    $ctrl.awayTeamResults = [];
    $ctrl.totalOv1 = [];
    $ctrl.totalOv2 = [];

    $ctrl.deltaPoint = 0;

    $http.post('/api/fixture/getItem', {'id' : $state.params.id}).then(function(res){
       $ctrl.match = res.data;
  
        $http.post('/api/fixture/getListPrevMatch', {'matchday' :$ctrl.match.matchday, 'names': [$ctrl.match.homeTeamName, $ctrl.match.awayTeamName]}).then(function(res){
            $ctrl.list = res.data;
            $ctrl.homeMatches = $ctrl.list.filter(function(match){
                return match.homeTeamName == $ctrl.match.homeTeamName 
                // return match.homeTeamName == $ctrl.match.homeTeamName ||  match.awayTeamName == $ctrl.match.homeTeamName;
            });
            $ctrl.homeMatches = $filter('orderBy')($ctrl.homeMatches, 'date');
            if ( $ctrl.homeMatches.length > 5) {
                $ctrl.homeMatches.shift();
            }
            if ( $ctrl.homeMatches.length > 5) {
                $ctrl.homeMatches.shift();
            }
            if ( $ctrl.homeMatches.length > 5) {
                $ctrl.homeMatches.shift();
            }
            console.log($ctrl.homeMatches, $ctrl.list)
            $ctrl.awayMatches = $ctrl.list.filter(function(match){
                return  match.awayTeamName == $ctrl.match.awayTeamName;
                // return match.homeTeamName == $ctrl.match.awayTeamName ||  match.awayTeamName == $ctrl.match.awayTeamName;
            });
            
            $ctrl.awayMatches = $filter('orderBy')($ctrl.awayMatches, 'date');
            if ( $ctrl.awayMatches.length > 5) {
               $ctrl.awayMatches.shift();
            }
            if ( $ctrl.awayMatches.length > 5) {
                $ctrl.awayMatches.shift();
             }
             if ( $ctrl.awayMatches.length > 5) {
                $ctrl.awayMatches.shift();
             }
            $ctrl.homeMatches.forEach(function(m){
                $ctrl.homeTeamResults.push(checkMatch(m, $ctrl.match.homeTeamName));
                $ctrl.totalOv1.push(checkTotalOv1(m));
                $ctrl.totalOv2.push(checkTotalOv2(m));
            });

            $ctrl.awayMatches.forEach(function(m){
                $ctrl.awayTeamResults.push(checkMatch(m, $ctrl.match.awayTeamName));
                $ctrl.totalOv1.push(checkTotalOv1(m));
                $ctrl.totalOv2.push(checkTotalOv2(m));
            });

            $ctrl.matchStatus = calculateDeltaPoint($ctrl.homeTeamResults, $ctrl.awayTeamResults);

            // getInfoPreviusMatch();
            checkOver2()
            // calculateAvarage()

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

    function checkTotalOv2 (m){
        if (m.result.goalsHomeTeam + m.result.goalsAwayTeam > 2){
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

        if ((hP-aP >= 7) && (hP >= 11) ){
            return {
                delta : hP-aP,
                'status': "Интересен, вероятна победа домашней команды"
            }
        }
        if ((aP -hP >= 7) && (aP >= 11) ){
            return {
                delta : aP-hP,
                'status': "Интересен, вероятна победа гостевой команды"
            }
        }
    }

    function getInfoPreviusMatch () {
        var arrTeams = ['Tottenham Hotspur FC','Manchester United FC','Manchester City FC', 'Arsenal FC','Liverpool FC','Chelsea FC'];

        if (arrTeams.indexOf($ctrl.match.homeTeamName) > -1) {
            var previusMatch = $ctrl.homeMatches.filter(function(match){
                if (match.matchday == $ctrl.match.matchday - 1) {
                    return match;
                }
            })[0];
            console.log(previusMatch,previusMatch.result.goalsHomeTeam > previusMatch.result.goalsAwayTeam)
            if ((previusMatch.awayTeamName == $ctrl.match.homeTeamName) && (previusMatch.result.goalsHomeTeam > previusMatch.result.goalsAwayTeam)){
                $ctrl.status2 = "Возможна победа домашней команды"
            }
        }
    }
    

    function checkOver2 () {
        if (($ctrl.totalOv2[0].text == "+")&& ($ctrl.totalOv2[1].text == "+") && ($ctrl.totalOv2[2].text == "+")
        && ($ctrl.totalOv2[3].text == "+")&& ($ctrl.totalOv2[5].text == "+")
        && ($ctrl.totalOv2[6].text == "+")&& ($ctrl.totalOv2[7].text == "+") && ($ctrl.totalOv2[8].text == "+") ){
            if (($ctrl.totalOv2[4].text == "-") || ($ctrl.totalOv2[9].text == "-")){
                $ctrl.aletOver = "Over 2.5";
            }
        }
    }

    function calculateAvarage(){
        var homeGS = 0;
        var homeGL = 0;
        var awayGS = 0;
        var awayGL = 0;
        $ctrl.homeMatches.forEach(function(i){
            homeGS += i.result.goalsHomeTeam;
            homeGL += i.result.goalsAwayTeam;
        })
        $ctrl.awayMatches.forEach(function(i){
            awayGS += i.result.goalsAwayTeam;
            awayGS += i.result.goalsHomeTeam;
        })
        homeGS = (homeGS / $ctrl.homeMatches.length).toFixed(2);
        homeGL = (homeGL / $ctrl.homeMatches.length).toFixed(2);
        awayGS = (awayGS / $ctrl.awayMatches.length).toFixed(2);
        awayGL = (awayGL / $ctrl.awayMatches.length).toFixed(2);
        $ctrl.matchT  =  0
        if (homeGS >= awayGL) {
            $ctrl.matchT += +homeGS;
        }else {
            $ctrl.matchT += +awayGL;
        }
        if (homeGL >= awayGS) {
            $ctrl.matchT += +awayGS;
        }else {
            $ctrl.matchT += +homeGL;
        }
    }
}]);
