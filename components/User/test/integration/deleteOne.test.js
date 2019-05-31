/* eslint-disable no-undef */
const expect = require('chai').expect;
const { ObjectId } = require('mongoose').Types;

const UserScheme = require('../../UserScheme');
const UserService = require('../../services/UserService');

describe('Integration User/ DeleteOne', () => {
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
    instance = new UserScheme({
      name: 'what an user'
    });
    anotherInstance = new UserScheme({
      name: 'what an user 1',
      isArchived: true
    });
    await Promise.all([anotherInstance.save(), instance.save()]);
  };

  beforeEach(async () => {
    await UserScheme.deleteMany({});
  });

  it("it should return {error: 'not_found'} if it was deleted", async () => {
    await beforeExec();

    const { error } = await UserService.deleteOne(anotherInstance._id);
    expect(error).to.not.be.undefined;
    expect(error.statusCode).to.equal(404);
  });

  it("it should return {error: 'not_found'} if it was not found", async () => {
    await beforeExec();

    const { error } = await UserService.deleteOne(new ObjectId());
    expect(error).to.not.be.undefined;
    expect(error.statusCode).to.equal(404);
  });

  it('it should return {data: true} if it passes all validations', async () => {
    await beforeExec();

    const { data } = await UserService.deleteOne(instance._id);

    const dbInstance = await UserScheme.findById(instance._id);

    expect(dbInstance.isArchived).to.equal(true);

    expect(data).to.not.be.undefined;
    expect(data).to.equal(true);
  });
});
