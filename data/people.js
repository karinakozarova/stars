var fs = require('fs');
var path = require('path');
var gs = require('github-scraper');

var BASE_DIR = path.resolve('./', 'data') + '/';
var DWYL_DIR = path.resolve(BASE_DIR, 'dwyl')
var UNIQUE = path.resolve(BASE_DIR, 'unique.csv');
var PEOPLE = path.resolve(BASE_DIR, 'people') + '/';

fs.readFile(UNIQUE, 'utf8', function (err, data) {
  if (err) {
    console.log(err);
    return;
  } else {
    var rows = data.split('\n');
    if(rows.length > 0) {

      var i = 0;
      var INTERVAL = setInterval(function() {
        var col = rows[i].split(',')
        gs(col[0], save_profile);

        if(i < rows.length) { i++; }
        else {
          clearInterval(INTERVAL);
          setTimeout(process.exit, 2000);
        }
      }, 500)
    }
  }
});

function save_profile(err, data) {
  if (err) {
    console.log(err);
    return;
  }
  console.log(data);
  var u = data.url.split('/');
  var username = u[u.length-1];
  var filepath = path.normalize(PEOPLE + username + '.json');
  fs.writeFile(filepath, JSON.stringify(data, null, 2), function(e, d){
    if(e) { console.log(e, d) }
  })
}
