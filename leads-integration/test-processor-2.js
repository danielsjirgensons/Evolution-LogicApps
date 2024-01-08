/**
 * Test values
 */

var bodyOutput = {
    "callTime": "Middag (12pm – 4pm)",
    "email": "address@example.com",
    "firstName": "Name Surname",
    "lastName": "Name Surname",
    // "firstName": "باشا",
    // "lastName": "باشا",
    "moveToMalta": "Nej",
    "phoneNumber": "+1234567890",
    "speakWriteEnglish": "Ja",
    "speakingDutch": "Ja"
};

var headerOutput = {
    // source: 'meta',
    source: 'fb',
    // source: 'ig',
    // source: 'tiktok',
    // source: 'linkedin',
    targetJob: '74262e7f-40c1-4537-bdf7-958f15098b70'
};

let outputObject = {};
let candidateFields = [];
const headerObject = JSON.stringify(headerOutput, undefined, 4);
const inputObject = JSON.stringify(bodyOutput, undefined, 4);
$(() => { $('#headerObject').html(`<pre>${headerObject}</pre>`); });
$(() => { $('#inputObject').html(`<pre>${inputObject}</pre>`); });

/**
 * Helpers
 */
// Set source ...
function get_source(source) {
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
}

// Set question fields
function set_questions(field, value) {
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
}

/**
 * Data processor
 */
for (const key in bodyOutput) {
    if (key === 'firstName') {
        const firstName = bodyOutput[key];
        outputObject[key] = firstName.substring(0, firstName.indexOf(' ')).trim();
    }

    if (key === 'lastName') {
        const lastName = bodyOutput[key];
        outputObject[key] = lastName.substring(lastName.indexOf(' ')).trim();
    }

    if (key === 'email' || key === 'phoneNumber') {
        outputObject[key] = bodyOutput[key];
    }

    if (set_questions(key, bodyOutput[key]) != null) {
        candidateFields.push(set_questions(key, bodyOutput[key]));
    }
}

// Set source ID
outputObject.sourceDetails = {
    "sourceTypeId": "PAID",
    "sourceSubTypeId": "SOCIAL",
    "sourceId": get_source(headerOutput.source)
};

/**
 * Output object for testing
 */
outputObject = JSON.stringify(outputObject, undefined, 4);
const candidateObject = JSON.stringify(candidateFields, undefined, 4);
$(() => { $('#outputObject').html(`<pre>${outputObject}</pre>`); });
$(() => { $('#candidateObject').html(`<pre>${candidateObject}</pre>`); });