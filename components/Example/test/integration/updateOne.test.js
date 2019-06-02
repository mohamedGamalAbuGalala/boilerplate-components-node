/* eslint-disable no-undef */
const { ObjectId } = require('mongoose').Types;
const expect = require('chai').expect;

const ExampleScheme = require('../../ExampleScheme');
const ExampleService = require('../../services/ExampleService');

describe('Integration Example/ UpdateOne', () => {
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
    instance = new ExampleScheme({
      name: 'what an example'
    });
    anotherInstance = new ExampleScheme({
      name: 'what an example 1'
    });
    await Promise.all([anotherInstance.save(), instance.save()]);
    body = {
      name: 'what an example 2'
    };
  };

  beforeEach(async () => {
    await ExampleScheme.deleteMany({});
  });

  it('should should return {error: \'name_is_duplicated\'} if name is duplicated', async () => {
    await beforeExec();

    body.name = anotherInstance.name;

    const { error } = await ExampleService.updateOne(instance._id, body);
    expect(error).to.not.be.undefined;
    expect(error.statusCode).to.equal(400);
  });

  it('should return name trimmed if name en has spaces around', async () => {
    await beforeExec();
    body.name = '    mohamed    ';

    const { data } = await ExampleService.updateOne(instance._id, body);
    expect(data).to.not.be.undefined;
    expect(data.name).to.equal('mohamed');
  });

  it("it should return {error: 'not_found'} if it was not found", async () => {
    await beforeExec();

    const { error } = await ExampleService.updateOne(new ObjectId(), body);
    expect(error).to.not.be.undefined;
    expect(error.statusCode).to.equal(404);
  });

  it('it should return {data: true} if it passes all validations', async () => {
    await beforeExec();

    const { data } = await ExampleService.updateOne(instance._id, body);
    expect(data).to.not.be.undefined;
    expect(data).to.include.all.keys('_id', 'name');
  });
});
