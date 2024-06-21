const LanguageDetector = async (interaction, con) => {
    con.query(`SELECT * FROM users WHERE discord_id = '${interaction.user.id}'`, function(err, result) {
        const lang = result[0].language;

        switch(lang) {
            case 'EN_en': {
                break;
            }

            case 'FR_fr': {
                break;
            }

            // add some langages (IT_it, ES_es, AR_ar, DE_de, ...)
        }
    });
};

module.exports = LanguageDetector;