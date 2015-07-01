describe("ContraSet", function() {
    var contraSet;

    beforeEach(function() {
        var dancers = [];
        var dance = new Dance(true);
        dance.addMove(new Circle(4, 1, 50)); // dance duration is 4

        for (var i = 0; i < 8; i++) {
            dancers.push(new Dancer(i));
        }
        contraSet = new ContraSet(dance, dancers);
    });

    it("knows what group a dancer belongs to initially", function () {
        expect(contraSet.getGroupAndPos(0, 0)).toEqual([0, 0]);
        expect(contraSet.getGroupAndPos(1, 0)).toEqual([0, 1]);
        expect(contraSet.getGroupAndPos(2, 0)).toEqual([0, 2]);
        expect(contraSet.getGroupAndPos(3, 0)).toEqual([0, 3]);
        expect(contraSet.getGroupAndPos(4, 0)).toEqual([1, 0]);
        expect(contraSet.getGroupAndPos(5, 0)).toEqual([1, 1]);
        expect(contraSet.getGroupAndPos(6, 0)).toEqual([1, 2]);
        expect(contraSet.getGroupAndPos(7, 0)).toEqual([1, 3]);
    });

    it("handles being out", function() {
        expect(contraSet.getGroupAndPos(0, 4)).toEqual(["top", 2]);
        expect(contraSet.getGroupAndPos(1, 4)).toEqual(["top", 3]);
        expect(contraSet.getGroupAndPos(2, 4)).toEqual([0, 2]);
        expect(contraSet.getGroupAndPos(3, 4)).toEqual([0, 3]);
        expect(contraSet.getGroupAndPos(4, 4)).toEqual([0, 0]);
        expect(contraSet.getGroupAndPos(5, 4)).toEqual([0, 1]);
        expect(contraSet.getGroupAndPos(6, 4)).toEqual(["bottom", 0]);
        expect(contraSet.getGroupAndPos(7, 4)).toEqual(["bottom", 1]);
    });

    it("knows what group a dancer belongs to after two progressions", function () {
        expect(contraSet.getGroupAndPos(0, 8)).toEqual([0, 2]);
        expect(contraSet.getGroupAndPos(1, 8)).toEqual([0, 3]);
        expect(contraSet.getGroupAndPos(2, 8)).toEqual([1, 2]);
        expect(contraSet.getGroupAndPos(3, 8)).toEqual([1, 3]);
        expect(contraSet.getGroupAndPos(4, 8)).toEqual([0, 0]);
        expect(contraSet.getGroupAndPos(5, 8)).toEqual([0, 1]);
        expect(contraSet.getGroupAndPos(6, 8)).toEqual([1, 0]);
        expect(contraSet.getGroupAndPos(7, 8)).toEqual([1, 1]);
    });

    it("knows what group a dancer belongs to after three progressions", function () {
        expect(contraSet.getGroupAndPos(0, 12)).toEqual([0, 2]);
        expect(contraSet.getGroupAndPos(1, 12)).toEqual([0, 3]);
        expect(contraSet.getGroupAndPos(2, 12)).toEqual(["bottom", 0]);
        expect(contraSet.getGroupAndPos(3, 12)).toEqual(["bottom", 1]);
        expect(contraSet.getGroupAndPos(4, 12)).toEqual(["top", 2]);
        expect(contraSet.getGroupAndPos(5, 12)).toEqual(["top", 3]);
        expect(contraSet.getGroupAndPos(6, 12)).toEqual([0, 0]);
        expect(contraSet.getGroupAndPos(7, 12)).toEqual([0, 1]);
    });

    it("knows what group a dancer belongs to after four progressions", function () {
        expect(contraSet.getGroupAndPos(0, 16)).toEqual([1, 2]);
        expect(contraSet.getGroupAndPos(1, 16)).toEqual([1, 3]);
        expect(contraSet.getGroupAndPos(2, 16)).toEqual([1, 0]);
        expect(contraSet.getGroupAndPos(3, 16)).toEqual([1, 1]);
        expect(contraSet.getGroupAndPos(4, 16)).toEqual([0, 2]);
        expect(contraSet.getGroupAndPos(5, 16)).toEqual([0, 3]);
        expect(contraSet.getGroupAndPos(6, 16)).toEqual([0, 0]);
        expect(contraSet.getGroupAndPos(7, 16)).toEqual([0, 1]);
    });

    it("knows what group a dancer belongs to after five progressions", function () {
        expect(contraSet.getGroupAndPos(0, 20)).toEqual(["bottom", 0]);
        expect(contraSet.getGroupAndPos(1, 20)).toEqual(["bottom", 1]);
        expect(contraSet.getGroupAndPos(2, 20)).toEqual([0, 0]);
        expect(contraSet.getGroupAndPos(3, 20)).toEqual([0, 1]);
        expect(contraSet.getGroupAndPos(4, 20)).toEqual([0, 2]);
        expect(contraSet.getGroupAndPos(5, 20)).toEqual([0, 3]);
        expect(contraSet.getGroupAndPos(6, 20)).toEqual(["top", 2]);
        expect(contraSet.getGroupAndPos(7, 20)).toEqual(["top", 3]);
    });

    it("knows what group a dancer belongs to after six progressions", function () {
        expect(contraSet.getGroupAndPos(0, 24)).toEqual([1, 0]);
        expect(contraSet.getGroupAndPos(1, 24)).toEqual([1, 1]);
        expect(contraSet.getGroupAndPos(2, 24)).toEqual([0, 0]);
        expect(contraSet.getGroupAndPos(3, 24)).toEqual([0, 1]);
        expect(contraSet.getGroupAndPos(4, 24)).toEqual([1, 2]);
        expect(contraSet.getGroupAndPos(5, 24)).toEqual([1, 3]);
        expect(contraSet.getGroupAndPos(6, 24)).toEqual([0, 2]);
        expect(contraSet.getGroupAndPos(7, 24)).toEqual([0, 3]);
    });

    it("knows what group a dancer belongs to after seven progressions", function () {
        expect(contraSet.getGroupAndPos(0, 28)).toEqual([0, 0]);
        expect(contraSet.getGroupAndPos(1, 28)).toEqual([0, 1]);
        expect(contraSet.getGroupAndPos(2, 28)).toEqual(["top", 2]);
        expect(contraSet.getGroupAndPos(3, 28)).toEqual(["top", 3]);
        expect(contraSet.getGroupAndPos(4, 28)).toEqual(["bottom", 0]);
        expect(contraSet.getGroupAndPos(5, 28)).toEqual(["bottom", 1]);
        expect(contraSet.getGroupAndPos(6, 28)).toEqual([0, 2]);
        expect(contraSet.getGroupAndPos(7, 28)).toEqual([0, 3]);
    });


});
