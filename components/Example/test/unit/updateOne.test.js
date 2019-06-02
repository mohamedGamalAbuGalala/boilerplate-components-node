/* eslint-disable no-undef */
const expect = require('chai').expect;
const { ObjectId } = require('mongoose').Types;

const { UpdateOneValidator } = require('../../validations');

describe('Unit Example/ UpdateOne', () => {
  /**
   *
   * * Unit
   *
   * @ name
   * it should return {error: "This field is required"} if no name is passed
   * it should return {error: 'name_must_be_between 2 ~ 200'} if passing name less than 2
   * it should return {error: 'name_must_be_between 2 ~ 200'} if passing name more than 200
   *
   */

  const req = { body: null };
  beforeEach(() => {
    req.params = { id: new ObjectId() };
    req.body = {
      name: 'what an example'
    };
  });

  it('should return {error: "This field is required"} if no name is passed', () => {
    req.body.name = '';
    const { error } = UpdateOneValidator(req);
    expect(error.name).to.not.be.undefined;
    expect(error.name[0]).to.equal('name is required');
  });

  it("should return {error: 'name_must_be_between 2 ~ 200'} if passing name ar less than 2", () => {
    req.body.name = 'd';
    const { error } = UpdateOneValidator(req);
    expect(error.name).to.not.be.undefined;
    expect(error.name[0]).to.equal('name must be at least 2 characters');
  });

  it("should return {error: 'name_must_be_between 2 ~ 200'} if passing name ar more than 200", () => {
    req.body.name = 'd'.repeat(201);
    const { error } = UpdateOneValidator(req);
    expect(error.name).to.not.be.undefined;
    expect(error.name[0]).to.equal('name must be at max 200 characters');
  });
});
