/* eslint-disable no-undef */
const expect = require('chai').expect;

const { ObjectId } = require('mongoose').Types;
const { ReadOneValidator } = require('../../validations');

describe('Unit Example/ ReadOne', () => {
  /**
   *
   * * Unit
   *
   * @ params.id
   * it should return invalid ObjectId if passed invalid objectId
   *
   */

  let req = {};
  beforeEach(() => {
    req = {
      params: {
        id: new ObjectId()
      }
    };
  });

  it('should return {error: "invalid ObjectId"} if passed invalid objectId', () => {
    req.params.id = 'fd';
    const { error } = ReadOneValidator(req);
    expect(error.paramsId).to.not.be.undefined;
    expect(error.paramsId[0]).to.equal('id must be a valid ObjectId');
  });
});
