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
                        // Check if current page referral contains source
                        if (!notContainWebUrl(this.referralData[key]) && this.filterSource(this.referralData[key]).sourceLabel !== 'direct') {
                            source = this.referralData[key];
                            return;
                        }

                        if ((this.referralData[key] !== '' && notContainWebUrl(this.referralData[key]) || key === 'starting')) {
                            source = this.referralData[key];

                            // Double filter for facebook
                            if (this.filterSource(source).sourceLabel === 'facebook') {
                                if (key !== 'starting') {
                                    source = '';
                                }
                            }
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
            case /\b(google|googleads|gclid|adsensecustomsearchads|googlesyndication)\b/i.test(source): // Google
                this.sourceLabel = 'google';
                this.sourceId = 'd74ccbf5-53b2-4024-b5f1-475643dd2e14';
                break;
            case /\b(facebook|fbclid)\b/i.test(source) && !/instagram/i.test(source): // Facebook
                this.sourceLabel = 'facebook';
                this.sourceId = '2e635be6-2d38-414f-90d5-9bb99f86c908';
                break;
            case /\binstagram\b/i.test(source):
                // case /instagram/i.test(source) && !/fbclid/i.test(source): // Instagram
                this.sourceLabel = 'instagram';
                this.sourceId = '115b0cb6-efac-4c5e-b039-6bcdf8bc1fd3';
                break;
            case /\b(linkedin|lnkd)\b/i.test(source): // Linkedin
                this.sourceLabel = 'linkedin';
                this.sourceId = 'f923cfa8-7b2c-4bc8-ab49-d37c9144a345';
                break;
            case /\bsnapchat\b/i.test(source): // Snapchat
                this.sourceLabel = 'snapchat';
                this.sourceId = '0414e2d1-3462-442d-9780-7ed4532a8879';
                break;
            case /\btiktok\b/i.test(source): // TikTok
                this.sourceLabel = 'tiktok';
                this.sourceId = '3af3457e-f119-4f1d-927b-c6935e52f03d';
                break;
            case /cv\.lv/i.test(source): // cv.lv
                this.sourceLabel = 'cv.lv';
                this.sourceId = '91fa9219-4fd1-47af-aa8b-dc985fd2c5fd';
                break;
            case /jobs\.bg/i.test(source): // jobs.bg
                this.sourceLabel = 'jobs.bg';
                this.sourceId = '6ca364f5-eae7-4b7d-986f-b364fef1bf5a';
                break;
            case /danskespil\.dk/i.test(source): // danskespil.dk
                this.sourceLabel = 'danskespil.dk';
                this.sourceId = '08f9e2ff-e5b5-4358-bbd9-37923cd63216';
                break;
            case /\btvnet\b/i.test(source): // tvnet
                this.sourceLabel = 'tvnet';
                this.sourceId = '4ee60b9a-d6ad-4f57-aa6b-701eb6ed1e9e';
                break;
            case /\btinder\b/i.test(source): // Tinder
                this.sourceLabel = 'tinder';
                this.sourceId = '34818d35-c638-4c8c-b880-0b1553ebf9f2';
                break;
            case /\byoutube\b/i.test(source): // YouTube
                this.sourceLabel = 'youtube';
                this.sourceId = '45c74c79-9e64-44e7-a7d2-e2ecdfaa6d25';
                break;
            // TEST: could be ?utm_source=studentjob
            case /\bstudentjob.se\b/i.test(source): // studentjob.se
                this.sourceLabel = 'studentjob.se';
                this.sourceId = 'c71c4475-cd3f-406b-8120-a11da9ccbd94';
                break;
            case /\bvisidarbi\b/i.test(source): // visidarbi.lv
                this.sourceLabel = 'visidarbi.lv';
                this.sourceId = 'e9f93478-6492-4267-bb2f-78149705b880';
                break;
            case /ejobs\.ro/i.test(source): // ejobs.ro
                this.sourceLabel = 'ejobs.ro';
                this.sourceId = '872ca014-f86f-4790-8999-4a1cfb4bf686';
                break;
        }

        return this;
    }
}