/* eslint-disable no-undef */
const expect = require('chai').expect;

const UserScheme = require('../../UserScheme');
const defaults = require('../../../../shared/constants/defaults');
const UserService = require('../../services/UserService');

describe('Integration User/ ReadAll', () => {
  /**
   *
   * * Integration
   *
   * @ passed
   * it should return {data: 'with respect to pagination'} if it passes all validations
   * it should return {data: true} if it passes all validations
   *
   */
  const instances = [];

  const beforeExec = async () => {
    for (let i = 0; i < 50; i++)
      instances.push(
        new UserScheme({
          name: `what an user ${i}`
        })
      );

    await Promise.all(instances.map(ins => ins.save()));
  };

  beforeEach(async () => {
    await UserScheme.deleteMany({});
  });

  it("it should return {data: 'with respect to pagination'} if it passes all validations", async () => {
    await beforeExec();

    const { data } = await UserService.getAll(instances[12]._id);
    expect(data).to.not.be.undefined;
    expect(data[0]).to.include.all.keys('_id', 'name');
    expect(data.length).to.equal(defaults.Pagination.LIMIT);
  });

  it('it should return {data: true} if it passes all validations', async () => {
    await beforeExec();

    const { data } = await UserService.getAll();
    expect(data).to.not.be.undefined;
    expect(data[0]).to.include.all.keys('_id', 'name');
    expect(data.length).to.equal(defaults.Pagination.LIMIT);
  });
});
