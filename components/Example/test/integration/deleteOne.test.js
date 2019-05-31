/* eslint-disable no-undef */
const expect = require('chai').expect;
const { ObjectId } = require('mongoose').Types;

const ExampleScheme = require('../../ExampleScheme');
const ExampleService = require('../../services/ExampleService');

describe('Integration Example/ DeleteOne', () => {
  /**
   *
   * * Integration
   *
   * @ passed
   * it should return {error: 'not_found'} if it was already deleted
   * it should return {error: 'not_found'} if it was not found
   * it should return {data: true} if it passes all validations
   *
   */
  let instance; let
    anotherInstance;

  const beforeExec = async () => {
    instance = new ExampleScheme({
      name: 'what an example'
    });
    anotherInstance = new ExampleScheme({
      name: 'what an example 1',
      isArchived: true
    });
    await Promise.all([anotherInstance.save(), instance.save()]);
  };

  beforeEach(async () => {
    await ExampleScheme.deleteMany({});
  });

  it("it should return {error: 'not_found'} if it was deleted", async () => {
    await beforeExec();

    const { error } = await ExampleService.deleteOne(anotherInstance._id);
    expect(error).to.not.be.undefined;
    expect(error.statusCode).to.equal(404);
  });

  it("it should return {error: 'not_found'} if it was not found", async () => {
    await beforeExec();

    const { error } = await ExampleService.deleteOne(new ObjectId());
    expect(error).to.not.be.undefined;
    expect(error.statusCode).to.equal(404);
  });

  it('it should return {data: true} if it passes all validations', async () => {
    await beforeExec();

    const { data } = await ExampleService.deleteOne(instance._id);

    const dbInstance = await ExampleScheme.findById(instance._id);

    expect(dbInstance.isArchived).to.equal(true);

    expect(data).to.not.be.undefined;
    expect(data).to.equal(true);
  });
});
