const each = require("jest-each").default;
const {selectCountries, split} = require("./init.js")
const testInputArray = require("./testInputArray.json")

describe("selectCountries", () => {

    it("Is a function", () => {
        expect(selectCountries).toBeDefined();
        expect(selectCountries instanceof Function).toEqual(true);
    })

    it('should return an array with 40 objects', () => {    
        expect(selectCountries([],testInputArray)).toHaveLength(40);
      });

    it('should only contain flag and name key value pairs', () => {    
        expect(selectCountries([],testInputArray).every(obj => {
            const keys = Object.keys(obj);
            return keys.length === 2 && keys.includes('flag') && keys.includes('name');
          })).toBe(true);;
      });

    it('should not add duplicate countries', () => {
        const uniqueCountries = new Set(selectCountries([],testInputArray));
        expect(uniqueCountries.size).toBe(40);
      });

})

describe("split", () => {

    it("Is a function", () => {
        expect(split).toBeDefined();
        expect(split instanceof Function).toEqual(true);
    })

})