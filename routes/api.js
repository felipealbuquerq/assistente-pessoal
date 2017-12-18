// author.js - Author route module
var express = require('express');
var ibmdb = require('ibm_db');
var router = express.Router();

router.get('/test', function(req, res){

console.log("Test program to access DB2 sample database");

/*Connect to the database server
  param 1: The DSN string which has the details of database name to connect to, user id, password, hostname, portnumber 
  param 2: The Callback function to execute when connection attempt to the specified database is completed
*/
ibmdb.open("DRIVER={DB2};DATABASE=HPD2;UID=nodedb2;PWD=nodedb2;HOSTNAME=9.47.66.219;port=51500", function(err, conn)
{
        if(err) {
		/*
		  On error in connection, log the error message on console 
		*/
          	console.error("error: ", err.message);
        } else {

		/*
			On successful connection issue the SQL query by calling the query() function on Database
			param 1: The SQL query to be issued
			param 2: The callback function to execute when the database server responds
		*/
		conn.query("select * from testschema.feedback", function(err, employees, moreResultSets) {
                        console.log("Column ");
			console.log("----------");

			/*
				Loop through the employees list returned from the select query and print the First name and last name of the employee	
			*/
                        for (var i=0;i<employees.length;i++)
			{
				console.log(employees[i].ORIGINAL_FEEDBACK);
			}
			console.log("-----------------------");

			/*
				Close the connection to the database
				param 1: The callback function to execute on completion of close function.
			*/
			conn.close(function(){
				console.log("Connection Closed");
			});
		});
	}
});

});

//REST API
router.get('/data/', function(req, res){
    const sql = "SELECT * FROM testschema.feedback";

/*Connect to the database server
  param 1: The DSN string which has the details of database name to connect to, user id, password, hostname, portnumber 
  param 2: The Callback function to execute when connection attempt to the specified database is completed
*/
ibmdb.open("DRIVER={DB2};DATABASE=HPD2;UID=nodedb2;PWD=nodedb2;HOSTNAME=9.47.66.219;port=51500", function(err, conn)
{
        if(err) {
		/*
		  On error in connection, log the error message on console 
		*/
          	console.error("error: ", err.message);
        } else {

		/*
			On successful connection issue the SQL query by calling the query() function on Database
			param 1: The SQL query to be issued
			param 2: The callback function to execute when the database server responds
		*/
		conn.query(sql, function(err, employees, moreResultSets) {
                        console.log("Column ");
			console.log("----------");

			/*
				Loop through the employees list returned from the select query and print the First name and last name of the employee	
			*/
                        for (var i=0;i<employees.length;i++)
			{
				console.log(employees[i].ORIGINAL_FEEDBACK);
			}
			console.log("-----------------------");

			/*
				Close the connection to the database
				param 1: The callback function to execute on completion of close function.
			*/
			conn.close(function(){
				console.log("Connection Closed");
			});
		});
	}
});


})

router.post('/data/', function(req, res){
    const sql = "INSERT INTO TESTSCHEMA.TESTTABLE SET () VALUES(?, ?)";
    const params = [req.body.original, req.body.language];


    pool.getConnection('HPD2')
    .then(function(connection) {
        //use connection to access the db
        console.log('I am connected');
        pool.query(connection, sql, params)
        .then(function (result) {
            // do something with the query result
            console.log('here is the result', result);
            res.send(result);
        })
    })
    .catch(function (failure) {
        console.log(failure);
    }) 
})


router.get('/results', function (req, res) {
    let result = [{
     original: 'Eu adoro a Apple', 
     language: 'pt',
     translated: 'I love Apple',
     sentiment: 'Positive',
     anger: 0,
     disgust: 0,
     fear: 0,
     joy: 0.8,
     sadness: 0,
     keywords: 'Apple'
    },
    {
     original: 'Meu ipad está sempre com problemas', 
     language: 'pt',
     translated: 'My Ipad is aways',
     sentiment: 'Negative',
     anger: 0.7,
     disgust: 0.4,
     fear: 0.3,
     joy: 0.2,
     sadness: 0.4,
     keywords: 'iPad'
    },
    {
     original: 'Hola, the tal', 
     language: 'es',
     translated: 'Hello ,how are you',
     sentiment: 'Neutral',
     anger: 0.2,
     disgust: 0.4,
     fear: 0.3,
     joy: 0.7,
     sadness: 0.4,
     keywords: 'testimonial page approachable format testimonials section Codecademy Stories customer quotes case study Q&A format'
    }   
    ];
 
    let avgValues = [];
    let avgAnger = 0;
    let avgDisgust = 0;
    let avgFear = 0;
    let avgJoy = 0;
    let avgSadness = 0;
    let avgSentiment = 0;
    let sentimentPositive = 0;
    let sentimentNegative = 0;
    let sentimentNeutral = 0;
    let rows = result.length;
 
    for (let x=0; x<rows;x++){
     avgAnger = avgAnger + result[x].anger;
     avgDisgust = avgDisgust + result[x].disgust;
     avgFear = avgFear + result[x].fear;
     avgJoy = avgJoy + result[x].joy;
     avgSadness = avgSadness + result[x].sadness;
     switch (result[x].sentiment) {
         case 'Positive': sentimentPositive +=1;
             break;
         case 'Negative': sentimentNegative +=1;
             break;
         case 'Neutral': sentimentNeutral +=1;
             break;
     } 
    }
 
    avgValues.push({
     anger: (avgAnger/rows) * 100, 
     anger_p: "width:" + (avgAnger/rows) * 100 + "%",
     disgust: (avgDisgust/rows) * 100, 
     disgust_p: "width:" + (avgDisgust/rows) * 100 + "%",
     fear: (avgFear/rows) * 100, 
     fear_p: "width:" + (avgFear/rows) * 100 + "%",
     joy: (avgJoy/rows) * 100, 
     joy_p: "width:" + (avgJoy/rows) * 100 + "%",
     sadness: (avgSadness/rows) * 100, 
     sadness_p: "width:" + (avgSadness/rows) * 100 + "%",
     positive: (sentimentPositive/rows) * 100,
     positive_p: "width:" + (sentimentPositive/rows) * 100 + "%",
     negative: (sentimentNegative/rows) * 100,
     negative_p: "width:" + (sentimentNegative/rows) * 100 + "%",
     neutral: (sentimentNeutral/rows) * 100,
     neutral_p: "width:" + (sentimentNeutral/rows) * 100 + "%",
     });
 
    var data = {};
    data.dashboard = avgValues;
    data.detail = result;
 
    res.send(data);  
  });

  module.exports = router;