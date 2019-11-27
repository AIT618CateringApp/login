let cheerio = require('cheerio');
let jsonframe = require('jsonframe-cheerio');

let $ = cheerio.load('customer.ejs');
jsonframe($); // initializes the plugin

var nodemailer = require('nodemailer');

var frame = {
	"place order": {           
		"selector": ".card card body",  
		"data": [{         
			"menu": ".header [select id=menu]",   
            "first name": ".header [id=first name]", 
            "last name": ".header [id=last name]",
            "address": ".header [id=address]",
            "city": ".header [id=city]",
            "state": ".header [id=state]",
            "zip code": ".header [id=zip code]",
            "phone number": ".header [id=phone number]",
            "email": ".header [id=email]",
            "card type": ".header [id=card type]",
            "expiration month": ".header [id=expiration month]",
            "expiration year": ".header [id=expiration year]",
            "card #": ".header [id=card #]",
            "cvv": ".header [id=cvv]",


		}]

    }
};

var placeorderList = $('.list.items').scrape(frame);
console.log(companiesList); // Output the data in the terminal

var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'atyourserviceorders22@gmail.com',
        pass: 'ait618'
    }
});

var mailOptions = {
    from: 'atyourserviceorders22@gmail.com',
    to: 'atyourservicevendor@gmail.com',
    subject: 'Order 1 ',
    text: 'New Order Coming your way! See details below:'
};

transporter.sendMail(mailOptions, function(error, info){
    if (error) {
        console.log (error);
    } else {
        console.log('Email sent: ' + info.placeorderList);
    }

});

