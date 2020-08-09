var i=0;
var event = document.querySelector('#btn');
window.onload = () => event.click();
  event.addEventListener('click', function(){
  var url = 'https://cricapi.com/api/matchCalendar?apikey=0TRPb1tdKkeLnB28Ay1AhuDqTYF3';
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
        
        var info = data.data[i];
        var teams = info['name'];
        var date = info['date'];
        var teamSplit = teams.split(" v ");
        var teamA = teamSplit[0];
        var tmB = teamSplit[1];
        
        var tmb = tmB.split(" at ");        
        var teamB = tmb[0];
        var venue = tmb[1]; 
             
        var tableData = document.querySelectorAll('#score td');
        tableData[0].textContent = teamA;
        tableData[1].textContent = teamB;
        tableData[2].textContent = date + " - " +venue;
        i++;
        
      });
    }
  )
  .catch(function(err) {
    console.log('Fetch Error :-S', err);
  });
});
