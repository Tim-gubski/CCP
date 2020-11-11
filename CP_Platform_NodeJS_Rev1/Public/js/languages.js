var unirest = require("unirest");

var req = unirest("GET", "https://rapidapi.p.rapidapi.com/languages");

req.headers({
	"x-rapidapi-key": 'fb0e781148msh89f403588aab478p199540jsn84ef056e595a',
	"x-rapidapi-host": 'judge0.p.rapidapi.com',
	"useQueryString": true
});


req.end(function (res) {
	if (res.error) throw new Error(res.error);

	console.log(res.body);
});

