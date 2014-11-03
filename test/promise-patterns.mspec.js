/* jshint es5: true, -W030 */
/* globals describe: true, it: true, chai: true, sinon: true */
describe('Promise Patterns', function () {
	var expect = chai.expect;
	
	function createPassThruStub() {
		var stub = sinon.stub();
		stub.returnsArg(0);
		return stub;
	}

	describe('one level deep', function () {
		var promise, then1, then2, catch1, catch2, finallly1, finally2;

		beforeEach(function () {
			then1 = createPassThruStub();
			then2 = createPassThruStub();

			catch1 = createPassThruStub();
			catch2 = createPassThruStub();

			finally1 = createPassThruStub();

			finally2 = sinon.stub(); // do not return a value or done will fail...
		});

		describe('resolved', function () {

			beforeEach(function (done) {
				promise = new Promise(function (res) { res('resolved'); });
				promise.then(then1).then(then2).catch(catch1).catch(catch2).then(finally1).then(finally2).then(done);
			});

			it('should have called then1', function () {
				expect(then1.called).to.be.true;
			});

			it('should have called then1 with resolved value', function () {
				expect(then1.args[0][0]).to.equal('resolved');
			});

			it('should have called then2', function () {
				expect(then2.called).to.be.true;
			});

			it('should have called then2 with resolved value', function () {
				expect(then2.args[0][0]).to.equal('resolved');
			});

			it('should not have called catch1', function () {
				expect(catch1.called).to.be.false;
			});

			it('should not have called catch2', function () {
				expect(catch2.called).to.be.false;
			});

			it('should have called finally1', function () {
				expect(finally1.called).to.be.true;
			});

			it('should have called finally1 with resolved value', function () {
				expect(finally1.args[0][0]).to.equal('resolved');
			});

			it('should have called finally2', function () {
				expect(finally2.called).to.be.true;
			});

			it('should have called finally2 with resolved value', function () {
				expect(finally2.args[0][0]).to.equal('resolved');
			});
		});

		describe('rejected', function () {

			beforeEach(function (done) {
				promise = new Promise(function (res, rej) { rej('rejected'); });
				promise.then(then1).then(then2).catch(catch1).catch(catch2).then(finally1).then(finally2).then(done);
			});

			it('should not have called then1', function () {
				expect(then1.called).to.be.false;
			});

			it('should not have called then2', function () {
				expect(then2.called).to.be.false;
			});

			it('should have called catch1', function () {
				expect(catch1.called).to.be.true;
			});

			it('should have called catch1 with rejected value', function () {
				expect(catch1.args[0][0]).to.equal('rejected');
			});

			it('should not have called catch2', function () {
				expect(catch2.called).to.be.false;
			});

			it('should have called finally1', function () {
				expect(finally1.called).to.be.true;
			});

			it('should have called finally1 with rejected value', function () {
				expect(finally1.args[0][0]).to.equal('rejected');
			});

			it('should have called finally2', function () {
				expect(finally2.called).to.be.true;
			});

			it('should have called finally2 with rejected value', function () {
				expect(finally2.args[0][0]).to.equal('rejected');
			});
		});

		describe('rejected that throws', function () {
			var rethrownError;

			beforeEach(function (done) {
				rethrownError = new Error('rethrown');
				catch1.throws(rethrownError);

				promise = new Promise(function (res, rej) { rej('rejected'); });
				promise.then(then1).then(then2).catch(catch1).catch(catch2).then(finally1).then(finally2).then(done);
			});

			it('should not have called then1', function () {
				expect(then1.called).to.be.false;
			});

			it('should not have called then2', function () {
				expect(then2.called).to.be.false;
			});

			it('should have called catch1', function () {
				expect(catch1.called).to.be.true;
			});

			it('should have called catch1 with rejected value', function () {
				expect(catch1.args[0][0]).to.equal('rejected');
			});

			it('should have called catch2', function () {
				expect(catch2.called).to.be.true;
			});

			it('should have called catch2 with rethrown value', function () {
				expect(catch2.args[0][0]).to.equal(rethrownError);
			});

			it('should have called finally1', function () {
				expect(finally1.called).to.be.true;
			});

			it('should have called finally1 with rethrown value', function () {
				expect(finally1.args[0][0]).to.equal(rethrownError);
			});

			it('should have called finally2', function () {
				expect(finally2.called).to.be.true;
			});

			it('should have called finally2 with rethrown value', function () {
				expect(finally2.args[0][0]).to.equal(rethrownError);
			});
		});
	});
});
