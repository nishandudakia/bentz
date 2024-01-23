const each = require("jest-each").default;
const {selectCountries, split} = require("./init.js")
const testInputArray = require("./testInputArray.json")

describe("selectCountries", () => {

    it("Is a function", () => {
        expect(selectCountries).toBeDefined();
        expect(selectCountries instanceof Function).toEqual(true);
    })

    // it("Returns an empty object when passed an empty array", () => {
    //     const result = selectCountries([{"flags":{"png":"","svg":"","alt":""},"name":{"common":"","official":"","nativeName":{"cat":{"official":"","common":""}}}}])
    //     expect(result instanceof Object).toEqual(true);
    //     expect(Object.keys(result).length).toBe(0);
    // })

    it('should return an array with 40 objects', () => {    
        // Assert
        expect(selectCountries([],testInputArray)).toHaveLength(40);
      });

})

describe("split", () => {

    it("Is a function", () => {
        expect(split).toBeDefined();
        expect(split instanceof Function).toEqual(true);
    })

    // it("Returns an empty object when passed an empty array", () => {
    //     const result = countValues([])
    //     expect(result instanceof Object).toEqual(true);
    //     expect(Object.keys(result).length).toBe(0);
    // })

    // each([
    //     [{ 1: 1, 2: 2, 3: 3 }, [1, 2, 2, 3, 3, 3]],
    //     [{ "a": 2, "b": 1, "c": 1, "d": 2 }, ["a", "b", "c", "d", "d", "a"]],
    //     [{ "a": 1, "A": 1, "cat": 1, 1: 2 }, ["a", "A", 1, 1, "cat"]],
    // ]).test(`Returns %s when passed %s`, (expected, input) => {
    //     expect(countValues(input)).toEqual(expected);
    // })

})