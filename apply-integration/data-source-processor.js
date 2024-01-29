class Source {
    constructor() {
        this.sourceTypeId = 'ORGANIC';
        this.sourceSubTypeId = 'CAREER_SITE';
        this.sourceId = 'default_source_id';
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

    getSource(data) {
        if (data !== 'undefined') {
            let source = '';
            const referral = this.getReferral(data);

            if (referral !== null) {
                if (referral.server !== '') {
                    source = referral.server;
                } else if (referral.referrer !== '') {
                    source = referral.referrer;
                } else {
                    source = referral.starting;
                }
            }

            return this.filterSource(source);
        }

        return this;
    }

    filterSource(source) {
        console.log('filterSource');
        console.log(source);
    }
}