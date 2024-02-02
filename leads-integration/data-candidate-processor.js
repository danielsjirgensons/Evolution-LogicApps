$(function () {
    /**
     * TEST DATA
    
        "callTime": "Middag (12pm – 4pm)",
        "email": "dariosiebelink1@gmail.com",
        "firstName":"Name Surname",
        "lastName":"Name Surname",
        "firstName": "Dario siebelink",
        "lastName": "Dario siebelink",
        // "firstName": "باشا",
        // "lastName": "باشا",
        "moveToMalta": "Ja",
        "phoneNumber": "+31636043334",
        "speakWriteEnglish": "Ja",
        "speakingDutch": "Ja"

        source: 'meta',
        // source: 'tiktok',
        // source: 'linkedin',
        targetJob: '74262e7f-40c1-4537-bdf7-958f15098b70'
     */
    /**
     * Initialize values
     */
    var this_is_header_output = JSON.parse($('#headOutput')[0].innerText);
    var this_is_body_output = JSON.parse($('#bodyOutput')[0].innerText);

    let outputObject = {};
    const headerOutput = this_is_header_output;
    const bodyOutput = this_is_body_output;

    /**
     * Helpers
     */
    const splitFullName = (name, position) => {
        name = name.replace(/[^a-zA-Z ]/g, ''); // FIXME: 
        name = name.trim();
        let firstName = '';
        let lastName = '';

        if (name !== '') {
            const zeroIndex = name.indexOf(' ') !== -1;
            firstName = zeroIndex ? name.substring(0, name.indexOf(' ')) : name;
            lastName = zeroIndex ? name.substring(name.indexOf(' ')) : name;
        } else {
            firstName = 'Not';
            lastName = 'Set';
        }

        const output = [firstName.trim(), lastName.trim()];

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
                targetSource = '09bd1373-5f90-470d-8baa-c617c82c10e1';
        }

        return targetSource;
    };

    /**
     * Data processor
     */
    const candidateKeys = ['firstName', 'lastName', 'email', 'phoneNumber'];

    for (const key in bodyOutput) {
        if (candidateKeys.includes(key)) {
            if (key === 'firstName') {
                outputObject[key] = splitFullName(bodyOutput[key], 0);
            } else if (key === 'lastName') {
                const lastName = splitFullName(bodyOutput[key], 1);
                outputObject[key] = (lastName === '') ? outputObject.firstName : lastName;
            } else {
                outputObject[key] = bodyOutput[key];
            }
        }
    }

    outputObject.sourceDetails = {
        "sourceTypeId": "PAID",
        "sourceSubTypeId": "PAY_PER_PERFORMANCE",
        "sourceId": getSource(headerOutput.source)
    };

    // Consent decision
    outputObject.consent = true;
    outputObject.consentDecisions = {
        social: true
    };

    /*****************************************
     * Output object for testing
     */
    $('#candidateObject').html(`<pre>${JSON.stringify(outputObject, undefined, 4)}</pre>`);

});