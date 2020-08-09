var event = document.querySelector("#btn");
  window.onload =   () => event.click();


  event.addEventListener("click", function(){
    const url = 'https://cricapi.com/api/matches?apikey=0TRPb1tdKkeLnB28Ay1AhuDqTYF3';
    fetch(url)
    .then(
      function(response) {
        if (response.status !== 200) {
          console.log('Looks like there was a problem. Status Code: ' +
            response.status);
          return;
        }

        // Examine the text in the response
        response.json().then(function(data) {
          
          const matches = data.matches;
          for(var i=0;i<matches.length;i++){
            const match = matches[i];
            if(match['team-1'] == 'Bangladesh' || match['team-1'] == 'India' || match['team-1'] == 'Pakistan' 
              || match['team-1'] == 'Australia'  || match['team-1'] == 'South Africa'  || match['team-1'] == 'Sri Lanka'
              || match['team-1'] == 'England' || match['team-1'] == 'West Indies' || match['team-1'] == 'Zimbabwe'
              || match['team-1'] == 'New Zealand'|| match['team-1'] == 'Ireland'|| match['team-1'] == 'Afghanistan'){
              var uqid = match['unique_id'];                        
              break;
            }
          }
          
          var matchUrl = 'https://cricapi.com/api/cricketScore?apikey=0TRPb1tdKkeLnB28Ay1AhuDqTYF3&unique_id='+uqid;
          fetch(matchUrl)
    .then(
      function(response) {
        if (response.status !== 200) {
          console.log('Looks like there was a problem. Status Code: ' +
            response.status);
          return;
        }

        // Examine the text in the response
        response.json().then(function(data) {
          
          var stat = data['stat'];        
          var matchStarted = data['matchStarted'];
          var team1 = data['team-1'];
          var team2 = data['team-2'];

          if(matchStarted == false){
            var heading = document.querySelector('#teams');
            heading.textContent = team1 +' vs '+ team2;
            var team_a_score = document.querySelector('#team_a_score');
            team_a_score.parentNode.removeChild(team_a_score);
            var team_b_score = document.querySelector('#team_b_score');
            team_b_score.parentNode.removeChild(team_b_score);
            var docStat = document.querySelector('#stat');
            docStat.textContent = "The match is about to begin. \n Hold tight."
            
          }else {
            
            var docStat = document.querySelector('#stat');
            docStat.textContent = stat;
            var heading = document.querySelector('#teams');
            heading.textContent = team1 +' vs '+ team2;
            var score = data['score'];
            var indScore = score.split(' v ');
            var score1 = indScore[0];
            var score2 = indScore[1];
            var regScore = score1.match(/\d+\/?\d+/gm);
            var regScore2 = score2.match(/\d+\/?\d+/gm);

            console.log(regScore2.length);
          if(regScore != null && regScore.length == 1)
          {
            var team_1_score = regScore.toString();
          }else{
            var one = regScore[0].toString();
            var two = regScore[1].toString();
            team_1_score = one + ' & ' + two;
          }
          if(regScore2 != null && regScore2.length == 1)
          {
            var team_2_score = regScore2.toString();
          }else{
             one = regScore2[0].toString();
             two = regScore2[1].toString();
            team_2_score = one + ' & ' + two;
          }
          if(team_1_score != undefined)
            document.querySelector('#team_a_score').textContent = team1 +' : ' + team_1_score;
          if(team_2_score != undefined)
            document.querySelector('#team_b_score').textContent = team2 + ' : ' + team_2_score;
            
          }

        });
      }
    )
    .catch(function(err) {
      console.log('Fetch Error :-S', err);
    });


        });
      }
    )
    .catch(function(err) {
      console.log('Fetch Error :-S', err);
    });
  })
