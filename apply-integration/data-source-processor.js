class Source {
    constructor() {
        this.referralData = 'undefined';
        this.sourceLabel = 'direct';
        this.sourceId = '11bb413e-6c88-459f-84ca-3049cefb1450';
    }

    directSourceMessage() {
        const referralData = JSON.stringify(this.referralData);
        console.log(`DIRECT SOURCE: ${this.sourceLabel} - ${referralData}`);
    }

    getSource(data) {
        if (data !== 'undefined') {
            let source = '';
            this.referralData = this.getReferral(data);
            const notContainWebUrl = (value) => !/evolution\.com/i.test(value);

            if (this.referralData !== null) {
                const keys = Object.keys(this.referralData).reverse(); // Start from server referral

                // Loop through all referrals to find source
                keys.forEach((key) => {
                    if (source === '') {
                        if ((this.referralData[key] !== '' && notContainWebUrl(this.referralData[key]) || key === 'starting')) {
                            source = this.referralData[key];
                        }
                    }
                });
            }

            return this.filterSource(source);
        }

        this.directSourceMessage();
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
        switch (true) {
            case /\b(google|gclid)\b/i.test(source): // Google
                this.sourceLabel = 'google';
                this.sourceId = 'google_source_id';
                break;
            case /\b(facebook|fbclid)\b/i.test(source) && !/instagram/i.test(source): // Facebook
                this.sourceLabel = 'facebook';
                this.sourceId = 'facebook_source_id';
                break;
            // case /\binstagram\b/i.test(source):
            case /instagram/i.test(source) && !/fbclid/i.test(source): // Instagram
                this.sourceLabel = 'instagram';
                this.sourceId = 'instagram_source_id';
                break;
            case /\b(linkedin|lnkd)\b/i.test(source): // Linkedin
                this.sourceLabel = 'linkedin';
                this.sourceId = 'linkedin_source_id';
                break;
            case /\bsnapchat\b/i.test(source): // Snapchat
                this.sourceLabel = 'snapchat';
                this.sourceId = 'snapchat_source_id';
                break;
            case /\btiktok\b/i.test(source): // TikTok
                this.sourceLabel = 'tiktok';
                this.sourceId = 'tiktok_source_id';
                break;
            case /cv\.lv/i.test(source): // cv.lv
                this.sourceLabel = 'cv.lv';
                this.sourceId = 'cv_lv_source_id';
                break;
            case /jobs\.bg/i.test(source): // jobs.bg
                this.sourceLabel = 'jobs.bg';
                this.sourceId = 'jobs_bg_source_id';
                break;
            case /danskespil\.dk/i.test(source): // danskespil.dk
                this.sourceLabel = 'danskespil.dk';
                this.sourceId = 'danskespil_dk_source_id';
                break;
            case /\btvnet\b/i.test(source): // tvnet
                this.sourceLabel = 'tvnet';
                this.sourceId = 'tvnet_source_id';
                break;
            case /\btinder\b/i.test(source): // Tinder
                this.sourceLabel = 'tinder';
                this.sourceId = 'tinder_source_id';
                break;
            default:
                this.directSourceMessage();
        }

        return this;
    }
}