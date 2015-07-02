describe("Actions", function() {
  function expectAllCloseTo(actuals, expecteds) {
    expect(actuals.length).toEqual(expecteds.length);
    for(var i = 0; i < actuals.length; i++) {
      if(Array.isArray(expecteds[i])) {
        expectAllCloseTo(actuals[i], expecteds[i]);
      } else {
        expect(actuals[i]).toBeCloseTo(expecteds[i]);
      }
    }
  }

  it("converts cartesian coordinates to polar", function () {
    var directlyEast = cartesianToPolar([0, 0], [1, 0]);
    expect(directlyEast).toEqual([1, 0]);

    var directlyNortheast = cartesianToPolar([0, 0], [1, 1]);
    expectAllCloseTo(directlyNortheast, [Math.sqrt(2), tau/8]);

    var directlyNorthwest = cartesianToPolar([0,0], [-1, 1]);
    expectAllCloseTo(directlyNorthwest, [Math.sqrt(2), 3 * tau / 8]);

    var directlySouthwest = cartesianToPolar([0,0], [-1, -1]);
    expectAllCloseTo(directlySouthwest, [Math.sqrt(2), -3 * tau / 8]);

    var directlySoutheast = cartesianToPolar([0,0], [1, -1]);
    expectAllCloseTo(directlySoutheast, [Math.sqrt(2), -1 * tau / 8])


  });

  it("converts polar coordinates to cartesian", function () {
    var directlyEast = polarToCartesian([1, 0],[0,0]);
    expect(directlyEast).toEqual([1,0]);

    var directlyNortheast = polarToCartesian([Math.sqrt(2), tau / 8],[0,0]);
    expectAllCloseTo(directlyNortheast, [1,1]);
  });

  it("converts polar coordinates to cartesian with theta > tau", function () {
    var directlyNortheast = polarToCartesian([Math.sqrt(2), 9 * tau / 8], [0,0]);
    expectAllCloseTo(directlyNortheast, [1,1]);
  });

  it("has appropriate Wait starting position defaults", function() {
    var wait = new Wait(1,100 / Math.sqrt(2));
    wait.calculateEndingPositions();
    var startingPositions = [];
    for(var i = 0; i < 4; i++) {
      startingPositions.push(wait.getCoords(0,i));
    }
    expectAllCloseTo(wait.endingPositions, startingPositions)
  })
});

