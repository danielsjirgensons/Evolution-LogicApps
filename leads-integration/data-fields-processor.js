$(function () {
    /**
     * Initialize values
     */
    // var this_is_header_output = JSON.parse($('#headOutput')[0].innerText);
    var this_is_body_output = JSON.parse($('#bodyOutput')[0].innerText);

    let outputObject = [];
    // const headerOutput = this_is_header_output;
    const bodyOutput = this_is_body_output;

    /**
     * Helpers
     */
    const cleanValue = (value) => {
        // Remove specified characters
        var withoutSpecialChars = value.replace(/[~^|}{><;`]/g, "");

        // Remove emojis
        var withoutEmojis = withoutSpecialChars.replace(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g, "");

        return withoutEmojis.trim();
    };

    const setQuestions = (field, value) => {
        let fieldId = '';
        const outputValue = cleanValue(value);

        switch (field) {
            case 'languageSkills':
                fieldId = '9c3a97e9-ee3a-4a8b-a65e-faeab7d1a9f0';
                break;
            case 'speakWriteEnglish':
                fieldId = 'a8ef332a-33b0-4eef-84c9-221f7d47685b';
                break;
            case 'preferableContact':
                fieldId = 'fc8e2eca-4fa9-49a1-90cb-e9a458e9fe3f';
                break;
            case 'reasonAbroad':
                fieldId = 'ebd8e046-3e5f-43ea-a88c-67c9d1a321a8';
                break;
            case 'timeToStart':
                fieldId = '9bbd7c94-48a5-4e01-b6d5-1639296a152b';
                break;
            // case 'speakingDutch':
            //     fieldId = 'db234576-73a1-4a65-9c48-f2a33feb17b8';
            //     break;
            // case 'speakWriteEnglish':
            //     fieldId = '2e8cb5be-ced8-45cf-aec4-951b7ae8def7';
            //     break;
            // case 'moveToMalta':
            //     fieldId = '5840a5de-bf22-4f55-a6de-701f0fa7a73c';
            //     break;
            // case 'callTime':
            //     fieldId = '59e2613b-f2f6-4ada-b3ab-341966024fcf';
            //     break;
            // case 'preferableContact':
            //     fieldId = 'b22def21-4384-4a9d-8d2a-7e260c5c640c';
            //     break;
            // case 'reasonWhyEvolution':
            //     fieldId = '357ced0f-1fe7-4b2d-a453-326aaf4190c4';
            //     break;
        }

        if (fieldId !== '') {
            return {
                id: fieldId,
                outputValue
            };
        }
    };

    /**
     * Data processor
     */
    for (const key in bodyOutput) {
        // Setting up candidate fields
        if (setQuestions(key, bodyOutput[key]) != null) {
            // console.log(key);
            outputObject.push(setQuestions(key, bodyOutput[key]));
        }
    }

    /*****************************************
     * Output object for testing
     */
    $('#fieldsObject').html(`<pre>${JSON.stringify(outputObject, undefined, 4)}</pre>`);

});