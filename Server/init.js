function selectCountries(shortlist, all) {
  while (shortlist.length < 40) {
    const selected = all[Math.floor(Math.random() * all.length)];

    if (selected["flags"]["svg"] && selected["name"]["common"]) {
      const country = {
        flag: selected["flags"]["svg"],
        name: selected["name"]["common"],
      };

      if (shortlist.filter(c => c["name"] === country["name"]).length === 0) {
        shortlist.push(country);
      }
    }
  }

  return shortlist;
}

function split(shortlist) {
  const split = [];
  const chunkSize = 4;

  for (let i = 0; i < shortlist.length; i += chunkSize) {
    split.push(shortlist.slice(i, i + chunkSize));
  }

  return split;
}

module.exports = { selectCountries, split };
