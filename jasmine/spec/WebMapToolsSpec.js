describe("WebMap", function () {
	var fakeWebMap;
	beforeEach(function () {
		//fakeWebMap = jasmine.createSpyObj("WebMapTools", ["init"]);
	});

	describe("init", function () {
		it("should call createMap", function () {
			webMap = initializeWebMap();
			expect(createMap).toHaveBeenCalled();
		});
		it("should call createScene", function () {
			webMap = init();
			expect(createScene).toHaveBeenCalled();
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
