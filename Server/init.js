function selectCountries(shortlist, all) {
    while (shortlist.length < 40) {
        const selected = stripped(all[Math.floor(Math.random() * all.length)]);

        if (!shortlist.includes(selected)) {
            shortlist.push(selected);
        }
    }
    
    return shortlist;
}

function stripped(country) {
    return {
        flag: country["flags"]["svg"],
        name: country["name"]["common"]
    }
}

function split(shortlist) {
    const split = [];
    const chunkSize = 4;
    
    for (let i = 0; i < shortlist.length; i += chunkSize) {
        split.push(shortlist.slice(i, i + chunkSize));
    }
    
    return split;
}

module.exports = { selectCountries, stripped, split }