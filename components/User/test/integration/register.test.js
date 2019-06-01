/* eslint-disable no-undef */
const expect = require('chai').expect;

const UserScheme = require('../../UserScheme');
const UserService = require('../../services/UserService');

// TODO: should be implemented
describe('Integration User/ CreateOne', () => {
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
      name: 'what an user'
    };
  };

  beforeEach(async () => {
    await UserScheme.deleteMany({});
  });

  it("should should return {error: 'name_is_duplicated'} if name is duplicated", async () => {
    await beforeExec();

    await UserService.register(body);
    const { error } = await UserService.register(body);
    expect(error).to.not.be.undefined;
    expect(error.statusCode).to.equal(400);
  });

  it('should return name trimmed if name en has spaces around', async () => {
    await beforeExec();
    body.name = '    mohamed    ';

    const { data } = await UserService.register(body);
    expect(data).to.not.be.undefined;
    expect(data.name).to.equal('mohamed');
  });

  it('it should return {data: true} if it passes all validations', async () => {
    await beforeExec();

    const { data } = await UserService.register(body);
    expect(data).to.not.be.undefined;
    expect(data).to.include.all.keys('_id', 'name', 'createdAt', 'updatedAt');
  });
});
