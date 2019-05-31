/* eslint-disable no-undef */
const expect = require('chai').expect;

const ExampleScheme = require('../../ExampleScheme');
const ExampleService = require('../../services/ExampleService');

describe('Integration Example/ CreateOne', () => {
  /**
   *
   * * Integration
   *
   * @ name
   * it should return {error: 'name_is_duplicated'} if name is duplicated ###
   * it should return name trimmed if name has spaces around  ##
   *
   * @ passed
   * it should return {data: true} if it passes all validations ##
   *
   */
  let body = {};

  const beforeExec = async () => {
    body = {
      name: 'what an example'
    };
  };

  beforeEach(async () => {
    await ExampleScheme.deleteMany({});
  });

  it("should should return {error: 'name_is_duplicated'} if name is duplicated", async () => {
    await beforeExec();

    await ExampleService.addOne(body);
    const { error } = await ExampleService.addOne(body);
    expect(error).to.not.be.undefined;
    expect(error.statusCode).to.equal(400);
  });

  it('should return name trimmed if name en has spaces around', async () => {
    await beforeExec();
    body.name = '    mohamed    ';

    const { data } = await ExampleService.addOne(body);
    expect(data).to.not.be.undefined;
    expect(data.name).to.equal('mohamed');
  });

  it('it should return {data: true} if it passes all validations', async () => {
    await beforeExec();

    const { data } = await ExampleService.addOne(body);
    expect(data).to.not.be.undefined;
    expect(data).to.include.all.keys('_id', 'name', 'createdAt', 'updatedAt');
  });
});
