/* Test values */
// var headerOutput = {
// 	source: 'meta',
// };

// var bodyOutput = {
//     "Do you speak Dutch": "Ja",
//     "Do you speak and write in english": "Ja",
//     "Do you want to move to Malta": "Nee",
//     "Full name": "Younes Amraoui",
//     "Phone number": "+32474012671",
//     "": {
//       "transfer_id": "clezosly6000l3i6oczpklbor"
//     },
//     "ad_id": "6305984181828",
//     "ad_name": "4/1Dutch GP | EVO #2 Tamara.m4v | NL",
//     "adset_id": "6305984181428",
//     "adset_name": "1480 | Malta IG | Dutch GP | w1 | 2 500 EURO | NL + BE | DUTCH - (Malta IG page)",
//     "campaign_id": "6305984177228",
//     "campaign_name": "1480_March_2023_Evolution Malta_€2500_Dutch_Leads",
//     "created_time": "2023-03-08T11:48:39+0000",
//     "email": "amraouiyounes2004@gmail.com",
//     "form_id": "681647620312177",
//     "form_name": "MT GP | Dutch 2023-02-16",
//     "id": "689659912939516",
//     "page_id": "678628832578522",
//     "page_name": "Evolution Malta",
//     "platform": "ig",
//     "raw": {
//       "Do you speak Dutch": "Yes",
//       "Do you speak and write in english": "Yes",
//       "Do you want to move to Malta": "No",
//       "Full name": "Younes Amraoui",
//       "Phone number": "+32474012671",
//       "email": "amraouiyounes2004@gmail.com",
//       "wanneer_wil_je_gebeld_worden?": "avond_(4pm_–_7pm)",
//       "wanneer_wil_je_gebeld_worden?_avond_": "4pm_–_7pm"
//     },
//     "wanneer_wil_je_gebeld_worden?": "Avond (4pm – 7pm)"
//   };

var headerOutput = {
	source: 'tiktok',
};

var bodyOutput = {
	'Ben jij een Nederlandstalig?': 'Ja',
	'Kun jij basis Engels spreken en schrijven?': 'Ja',
	'Onze Live Casinos zijn bevestigd op Malta. Lijkt het jou leuk om naar het zonnige Malta te verhuizen? Wij betalen voor jou vliegticket en verblijf voor de eerste 20 nachten!':
		'Ja',
	'Wanneer wil je gebeld worden?': 'Middag (12pm – 4pm) ',
	ad_id: '1759068153210882',
	ad_name: '4/1_Dutch GP_EVO #3 Celine.m4v_NL-FMEdz-',
	adgroup_id: '1759067747370002',
	adgroup_name: 'Malta_Netherlands/Belgium_A18-34_Dutch',
	campaign_id: '1759067739600914',
	campaign_name: '1480_March_2023_Malta/Madrid_Dutch Leads',
	create_time: '2023-03-03 09:10:57',
	email: 'malone.maria1253@gmail.com',
	lead_id: '7206242199267197190',
	name: 'Mustafoski Malone Maria ',
	page_id: '7200767895226482946',
	phone_number: '+32 468 03 72 65',
};
/* Helpers */
function split_name(name) {
	// var space = name.indexOf(' ');
	var firstName = name.substring(0, name.indexOf(' '));
	var lastName = name.substring(name.indexOf(' '));

	return [firstName.trim(), lastName.trim()];
}

/* Code execution */

var headers = headerOutput;
var body = bodyOutput;
var outputObject = {};

switch (headers.source) {
	case 'tiktok':
		outputObject.firstName = split_name(body.name)[0];
		outputObject.lastName = split_name(body.name)[1];
		outputObject.email = body.email;
		outputObject.phoneNumber = body.phone_number;
		break;
	case 'meta':
		outputObject.firstName = split_name(body['Full name'])[0];
		outputObject.lastName = split_name(body['Full name'])[1];
		outputObject.email = body.email;
		outputObject.phoneNumber = body['Phone number'];
		break;
	case 'snapchat':
		console.log('snap sort');
		break;
	default:
		console.log('STOP EXECUTION');
}

console.log(outputObject);
