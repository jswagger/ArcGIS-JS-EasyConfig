describe("WebMap", function () {
	var fakeWebMap;
	beforeEach(function () {
		fakeWebMap = new WebMap;
	});

	describe("when initializing app", function () {
		it("should call createMap", function () {
			fakeWebMap.init();
			expect(fakeWebMap.createMap).toHaveBeenCalled();
		});
		it("should call createScene", function () {
			fakeWebMap.init();
			expect(fakeWebMap.createScene).toHaveBeenCalled();
		});
	});

	describe("when calling createScene", function () {
		it("should return a Scene", function () {


		});
	});


	describe("when calling createBasemap", function () {
		it("should return a Basemap object", function () {


		});
	});


	describe("when calling createSearch", function () {
		it("should return a search object", function () {


		});
	});

	describe("when", function () {
		it("should return", function () {


		});
	});

	describe("when", function () {
		it("should return", function () {


		});
	});

	describe("when", function () {
		it("should return", function () {


		});
	});

	describe("when", function () {
		it("should return", function () {


		});
	});


});
