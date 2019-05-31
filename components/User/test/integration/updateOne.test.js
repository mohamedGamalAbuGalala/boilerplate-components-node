/* eslint-disable no-undef */
const { ObjectId } = require('mongoose').Types;
const expect = require('chai').expect;

const UserScheme = require('../../UserScheme');
const UserService = require('../../services/UserService');

describe('Integration User/ UpdateOne', () => {
  /**
   *
   * * Integration
   *
   * @ name
   * it should return {error: 'name_is_duplicated'} if name is duplicated ###
   * it should return name trimmed if name has spaces around  ##
   *
   * @ passed
   * it should return {error: 'not_found'} if it was not found
   * it should return {data: true} if it passes all validations ##
   *
   */
  let body = {};
  let instance;
  let anotherInstance;

  const beforeExec = async () => {
    instance = new UserScheme({
      name: 'what an user'
    });
    anotherInstance = new UserScheme({
      name: 'what an user 1'
    });
    await Promise.all([anotherInstance.save(), instance.save()]);
    body = {
      name: 'what an user 2'
    };
  };

  beforeEach(async () => {
    await UserScheme.deleteMany({});
  });

  it('should should return {error: \'name_is_duplicated\'} if name is duplicated', async () => {
    await beforeExec();

    body.name = anotherInstance.name;

    const { error } = await UserService.updateOne(instance._id, body);
    expect(error).to.not.be.undefined;
    expect(error.statusCode).to.equal(400);
  });

  it('should return name trimmed if name en has spaces around', async () => {
    await beforeExec();
    body.name = '    mohamed    ';

    const { data } = await UserService.updateOne(instance._id, body);
    expect(data).to.not.be.undefined;
    expect(data.name).to.equal('mohamed');
  });

  it("it should return {error: 'not_found'} if it was not found", async () => {
    await beforeExec();

    const { error } = await UserService.updateOne(new ObjectId(), body);
    expect(error).to.not.be.undefined;
    expect(error.statusCode).to.equal(404);
  });

  it('it should return {data: true} if it passes all validations', async () => {
    await beforeExec();

    const { data } = await UserService.updateOne(instance._id, body);
    expect(data).to.not.be.undefined;
    expect(data).to.include.all.keys('_id', 'name');
  });
});
