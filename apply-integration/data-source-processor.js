class Source {
    constructor() {
        this.sourceTypeId = 'PAID';
        this.sourceSubTypeId = 'BOARD';
        this.sourceId = '11bb413e-6c88-459f-84ca-3049cefb1450';
    }

    getSource(data) {
        if (data !== 'undefined') {
            let source = '';
            const referral = this.getReferral(data);
            const notContainWebUrl = (value) => !/evolution\.com/i.test(value);

            // TODO: check all urls - loop through (if server empty or return direct, check document referral etc.)

            if (referral !== null) {
                if (referral.server !== '' && notContainWebUrl(referral.server)) {
                    source = referral.server;
                } else if (referral.referrer !== '' && notContainWebUrl(referral.referrer)) {
                    source = referral.referrer;
                } else {
                    source = referral.starting;
                }
            }

            return this.filterSource(source);
        }

        console.log(data); // TODO: logging
        return this;
    }

    getReferral(data) {
        let referral = '';

        try {
            referral = JSON.parse(data);
        } catch (e) {
            referral = null;
        }

        return referral;
    }

    filterSource(source) {
        // console.log('filterSource');
        // console.log(source);

        switch (true) {
            case /\b(google|gclid)\b/i.test(source): // Google
                this.sourceId = 'google_source_id';
                break;
            case /\b(facebook|fbclid)\b/i.test(source) && !/instagram/i.test(source): // Facebook
                this.sourceId = 'facebook_source_id';
                break;
            // case /\binstagram\b/i.test(source):
            case /instagram/i.test(source) && !/fbclid/i.test(source): // Instagram
                this.sourceId = 'instagram_source_id';
                break;
            case /\b(linkedin|lnkd)\b/i.test(source): // Linkedin
                this.sourceId = 'linkedin_source_id';
                break;
            case /\bsnapchat\b/i.test(source): // Snapchat
                this.sourceId = 'snapchat_source_id';
                break;
            case /\btiktok\b/i.test(source): // TikTok
                this.sourceId = 'tiktok_source_id';
                break;
            case /cv\.lv/i.test(source): // cv.lv
                this.sourceId = 'cv_lv_source_id';
                break;
            case /jobs\.bg/i.test(source): // jobs.bg
                this.sourceId = 'jobs_bg_source_id';
                break;
            case /danskespil\.dk/i.test(source): // danskespil.dk
                this.sourceId = 'danskespil_dk_source_id';
                break;
            case /\btvnet\b/i.test(source): // tvnet
                this.sourceId = 'tvnet_source_id';
                break;
            case /\btinder\b/i.test(source): // Tinder
                this.sourceId = 'tinder_source_id';
                break;
            default:
                console.log(source); // TODO: logging
        }

        return this;
    }
}