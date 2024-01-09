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
        if (typeof value === 'string' || value instanceof String) {
            // Remove HTML entities
            var withoutHtmlEntities = value.replace(/&[a-zA-Z]+;/g, " ");

            // Remove specified characters
            var withoutSpecialChars = withoutHtmlEntities.replace(/[~^|}{><;`]/g, "");

            // Remove emojis
            var withoutEmojis = withoutSpecialChars.replace(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g, "");

            // Remove ASCII symbols
            var withoutAsciiSymbols = withoutEmojis.replace(/[^\w\s,.;?]/g, "");

            return withoutAsciiSymbols.trim();
        }

        return false;
    };

    const setQuestions = (field, value) => {
        let fieldId = '';
        const outputValue = cleanValue(value);

        switch (field) {
            case 'opportunitySource':
                fieldId = 'opportunitySource_field_id';
                break;
            case 'shortDescription':
                fieldId = '2e8cb5be-ced8-45cf-aec4-951b7ae8def7';
                break;
            case 'languageSkills':
                fieldId = '9c3a97e9-ee3a-4a8b-a65e-faeab7d1a9f0';
                break;
            case 'speakWriteEnglish':
                fieldId = 'speakWriteEnglish_field_id';
                break;
            case 'preferableContact':
                fieldId = 'preferableContact_field_id';
                break;
            case 'reasonAbroad':
                fieldId = 'ebd8e046-3e5f-43ea-a88c-67c9d1a321a8';
                break;
            case 'timeToStart':
                fieldId = 'timeToStart_field_id';
                break;
        }

        if (fieldId !== '' && outputValue !== '') {
            return {
                id: fieldId,
                outputValue
            };
        }
    };

    /**
     * Data processor
     */
    const body = Object.keys(bodyOutput);
    body.forEach((key, index) => {
        const question = setQuestions(key, bodyOutput[key]);

        if (question != null) {
            outputObject.push(question);
        }
    });

    // for (const key in bodyOutput) {
    //     // Setting up candidate fields
    //     if (setQuestions(key, bodyOutput[key]) != null) {
    //         console.log(key);
    //         outputObject.push(setQuestions(key, bodyOutput[key]));
    //     }
    // }

    /*****************************************
     * Output object for testing
     */
    $('#fieldsObject').html(`<pre>${JSON.stringify(outputObject, undefined, 4)}</pre>`);

});