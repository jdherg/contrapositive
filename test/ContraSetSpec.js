describe("ContraSet", function() {
    var contraSet;

    beforeEach(function() {
        var dancers = [];
        var dance = new Dance(true);
        dance.addMove(new Circle(16, 1, 50)); // dance duration is 16

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

    it("progresses once", function() {
        expect(contraSet.getGroupAndPos(2, 17)).toEqual([0, 0]);
        expect(contraSet.getGroupAndPos(3, 17)).toEqual([0, 1]);
        expect(contraSet.getGroupAndPos(4, 17)).toEqual([1, 3]);
        expect(contraSet.getGroupAndPos(5, 17)).toEqual([1, 2]);
    });

    it("handles being out", function() {
        expect(contraSet.getGroupAndPos(0, 17)).toEqual(["top", 2]);
        expect(contraSet.getGroupAndPos(1, 17)).toEqual(["top", 3]);
        expect(contraSet.getGroupAndPos(6, 17)).toEqual(["bottom", 0]);
        expect(contraSet.getGroupAndPos(7, 17)).toEqual(["bottom", 1]);
    });
});
