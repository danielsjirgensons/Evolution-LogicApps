$(function () {
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
    const cleanValue = (value) => {
        return value.replace(/[^\p{L}\s]/ug, '');
    };

    // const getSource = (source) => {
    //     let targetSource = '';

    //     switch (source) {
    //         case 'Google':
    //             targetSource = 'google_source_id';
    //             break;
    //         case 'Facebook':
    //             targetSource = 'facebook_source_id';
    //             break;
    //         case 'Instagram':
    //             targetSource = 'instagram_source_id';
    //             break;
    //         default:
    //             targetSource = 'other_source_id';
    //     }

    //     return targetSource;
    // };

    /**
     * Data processor
     */
    const candidateKeys = ['firstName', 'lastName', 'email', 'phoneNumber', 'avatar', 'resume'];

    for (const key in bodyOutput) {
        if (candidateKeys.includes(key)) {
            // Attachment worker
            if (key === 'avatar' || key === 'resume') {
                const value = bodyOutput[key];

                if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
                    if (Object.keys(value).length !== 0) {
                        if (value.fileName !== '' && value.mimeType !== '' && value.fileContent !== '') {
                            outputObject[key] = bodyOutput[key];
                        }
                    }
                }
            } else {
                outputObject[key] = bodyOutput[key];
            }
        }

        if (key === 'firstName') {
            let name = cleanValue(outputObject[key]);
            name = (name !== '') ? name : 'Unknown';

            outputObject[key] = name;
        }

        if (key === 'lastName') {
            let surname = cleanValue(outputObject[key]);

            if (surname === '') {
                surname = 'Unknown';
            }

            outputObject[key] = surname;
        }

        if (key === 'country') {
            outputObject['location'] = {
                'country': bodyOutput[key]
            };
        }
    }

    const sourceType = new Source();
    const getSource = sourceType.getSource(headerOutput.referrer);

    outputObject.sourceDetails = {
        "sourceTypeId": "PAID",
        "sourceSubTypeId": "BOARD",
        "sourceId": getSource.sourceId ?? '11bb413e-6c88-459f-84ca-3049cefb1450'
    };

    // Consent decision
    outputObject.consent = true;

    /*****************************************
     * Output object for testing
     */
    $('#candidateObject').html(`<pre>${JSON.stringify(outputObject, undefined, 4)}</pre>`);

});