/**
 * Test values
 */

var bodyOutput = {
    "callTime": "Middag (12pm – 4pm)",
    "email": "dariosiebelink1@gmail.com",
    "firstName": "Dario siebelink",
    "lastName": "Dario siebelink",
    // "firstName": "باشا",
    // "lastName": "باشا",
    "moveToMalta": "Ja",
    "phoneNumber": "+31636043334",
    "speakWriteEnglish": "Ja",
    "speakingDutch": "Ja"
};

var headerOutput = {
    source: 'meta',
    // source: 'tiktok',
    // source: 'linkedin',
    targetJob: '74262e7f-40c1-4537-bdf7-958f15098b70'
};

const inputObject = JSON.stringify(bodyOutput, undefined, 4);

/**
 * ? Idea to loop through all keys and in expressions set data
 */

/**
 * Helpers
 */
function split_name(name) {
    const zeroIndex = name.indexOf(' ') !== -1;
    const firstName = zeroIndex ? name.substring(0, name.indexOf(' ')) : name;
    const lastName = zeroIndex ? name.substring(name.indexOf(' ')) : name;

    return {
        first: firstName.trim(),
        last: lastName.trim()
    };
}

function get_source(source) {
    let targetSource = '';

    switch (source) {
        case 'meta':
            targetSource = 'meta_source_id';
            break;
        case 'tiktok':
            targetSource = 'tiktok_source_id';
            break;
        case 'snapchat':
            targetSource = 'snapchat_source_id';
            break;
        default:
            targetSource = 'other_source_id';
    }

    return targetSource;
}

function set_questions(object) {
    let fields = [];



    return fields;
}

/**
 * Object updating with values
 */
// Split name
bodyOutput.firstName = split_name(bodyOutput.firstName).first;
bodyOutput.lastName = split_name(bodyOutput.lastName).last;
// Set source ID
bodyOutput.sourceDetails = {
    "sourceTypeId": "PAID",
    "sourceSubTypeId": "SOCIAL",
    "sourceId": get_source(headerOutput.source)
};
// Candidate fields
const candidateFields = set_questions(bodyOutput);

/**
 * Output object for testing
 */
const outputObject = JSON.stringify(bodyOutput, undefined, 4);
const candidateObject = JSON.stringify(candidateFields, undefined, 4);

console.log(bodyOutput);
$(function () {
    $('#inputObject').html(`<pre>${inputObject}</pre>`);
    $('#outputObject').html(`<pre>${outputObject}</pre>`);
    $('#candidateObject').html(`<pre>${candidateObject}</pre>`);
});