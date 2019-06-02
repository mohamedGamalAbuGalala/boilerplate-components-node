/* eslint-disable no-undef */
const expect = require('chai').expect;

const ExampleScheme = require('../../ExampleScheme');
const defaults = require('../../../../shared/constants/defaults');
const ExampleService = require('../../services/ExampleService');

describe('Integration Example/ ReadAll', () => {
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
        new ExampleScheme({
          name: `what an example ${i}`
        })
      );

    await Promise.all(instances.map(ins => ins.save()));
  };

  beforeEach(async () => {
    await ExampleScheme.deleteMany({});
  });

  it("it should return {data: 'with respect to pagination'} if it passes all validations", async () => {
    await beforeExec();

    const { data } = await ExampleService.getAll(instances[12]._id);
    expect(data).to.not.be.undefined;
    expect(data[0]).to.include.all.keys('_id', 'name');
    expect(data.length).to.equal(defaults.Pagination.LIMIT);
  });

  it('it should return {data: true} if it passes all validations', async () => {
    await beforeExec();

    const { data } = await ExampleService.getAll();
    expect(data).to.not.be.undefined;
    expect(data[0]).to.include.all.keys('_id', 'name');
    expect(data.length).to.equal(defaults.Pagination.LIMIT);
  });
});
