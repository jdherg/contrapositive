describe("Actions", function() {

  beforeEach(function () {
  });

  it("converts cartesian coordinates to polar", function () {
    var directlyEast = cartesianToPolar([0, 0], [1, 0]);
    expect(directlyEast).toEqual([1, 0]);

    var directlyNortheast = cartesianToPolar([0, 0], [1, 1]);
    expect(directlyNortheast[0]).toBeCloseTo(Math.sqrt(2));
    expect(directlyNortheast[1]).toBeCloseTo(tau / 8);
  });

  it("converts polar coordinates to cartesian", function () {
    var directlyEast = polarToCartesian([1, 0],[0,0]);
    expect(directlyEast).toEqual([1,0]);
    var directlyEast = polarToCartesian([Math.sqrt(2), tau / 8],[0,0]);
    expect(directlyEast[0]).toBeCloseTo(1);
    expect(directlyEast[1]).toBeCloseTo(1);
  });
});
