/**
 * Test values
 */

// var query = 'candidate';

// var this_is_body_output = {
//     "callTime": "Middag (12pm – 4pm)",
//     "email": "address@example.com",
//     "firstName": "Name Surname",
//     "lastName": "Name Surname",
//     // "firstName": "باشا",
//     // "lastName": "باشا",
//     "moveToMalta": "Nej",
//     "phoneNumber": "+1234567890",
//     "speakWriteEnglish": "Ja",
//     "speakingDutch": "Ja"
// };

// var this_is_header_output = {
//     // source: 'meta',
//     source: 'fb',
//     // source: 'ig',
//     // source: 'tiktok',
//     // source: 'linkedin',
//     targetJob: '74262e7f-40c1-4537-bdf7-958f15098b70'
// };

$(function(){
    console.log($('#headOutput')[0].innerText);
});

// var this_is_header_output = JSON.parse($('#headOutput')[0].innerText);
// var this_is_body_output = JSON.parse($('#bodyOutput')[0].innerText);

/************************************************************************** */

let outputObject = (query === 'fields') ? [] : {};
const headerOutput = this_is_header_output;
const bodyOutput = this_is_body_output;

/**
 * Helpers
 */
const splitFullName = (name, position) => {
    const zeroIndex = name.indexOf(' ') !== -1;
    const firstName = zeroIndex ? name.substring(0, name.indexOf(' ')) : name;
    const lastName = zeroIndex ? name.substring(name.indexOf(' ')) : name;

    const output = [firstName, lastName];

    return output[position];
};

const getSource = (source) => {
    let targetSource = '';

    switch (source) {
        case 'ig':
            targetSource = 'c23188e7-34b0-48a5-8949-47a636c3b4d3';
            break;
        case 'fb':
            targetSource = 'e04bdc15-b3af-4fe2-9378-f9d3a29b0712';
            break;
        case 'tiktok':
            targetSource = '8a8d6ae2-6471-4abb-a768-d946ec75b0e1';
            break;
        case 'snapchat':
            targetSource = '2d9e647f-ca18-4da7-9fb2-13c3de3641f1';
            break;
        default:
            targetSource = 'other_source_id';
    }

    return targetSource;
};

const setQuestions = (field, value) => {
    let fieldId = '';

    switch (field) {
        case 'speakingDutch':
            fieldId = '7e44f745-f1f3-4d82-86d9-55812f9aa687';
            break;
        case 'speakWriteEnglish':
            fieldId = '5d877757-018b-479e-8d00-e306fabfd2f6';
            break;
        case 'moveToMalta':
            fieldId = '141f9970-ff06-4bc6-a0a1-549073873322';
            break;
        case 'callTime':
            fieldId = '03664aeb-bee6-4d02-8b74-5d90bc4c6636';
            break;
    }

    if (fieldId !== '') {
        return {
            id: fieldId,
            value
        };
    }
};

/**
 * Data processor
 */
const candidateKeys = ['firstName', 'lastName', 'email', 'phoneNumber'];

for (const key in bodyOutput) {
    // Setting up candidate info
    if (query === 'candidate') {
        // outputObject = {};

        if (candidateKeys.includes(key)) {
            if (key === 'firstName') {
                outputObject[key] = splitFullName(bodyOutput[key], 0);
            } else if (key === 'lastName') {
                outputObject[key] = splitFullName(bodyOutput[key], 1);
            } else {
                outputObject[key] = bodyOutput[key];
            }
        }
    }

    // Setting up candidate fields
    if (query === 'fields') {
        if (setQuestions(key, bodyOutput[key]) != null) {
            outputObject.push(setQuestions(key, bodyOutput[key]));
        }
    }
}

// Set source ID
if (query === 'candidate') {
    outputObject.sourceDetails = {
        "sourceTypeId": "PAID",
        "sourceSubTypeId": "SOCIAL",
        "sourceId": getSource(headerOutput.source)
    };
}

/*****************************************
 * Output object for testing
 */
const headerObject = JSON.stringify(this_is_header_output, undefined, 4);
const inputObject = JSON.stringify(this_is_body_output, undefined, 4);

$(() => {
    $('#headerObject').html(`<pre>${headerObject}</pre>`);
    $('#inputObject').html(`<pre>${inputObject}</pre>`);

    console.log(outputObject);

    $('#outputObject').html(`<pre>${JSON.stringify(outputObject, undefined, 4)}</pre>`);
});