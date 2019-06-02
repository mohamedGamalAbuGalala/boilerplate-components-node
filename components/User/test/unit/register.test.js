/* eslint-disable no-undef */
const expect = require('chai').expect;

const { RegisterValidator } = require('../../validations');

// TODO: should be implemented
describe.only('Unit User/ CreateOne', () => {
  /**
   *
   * * Unit
   *
   * @ firstName
   * it should return {error: "blank"} if no firstName is passed
   * it should return {error: 'too_short'} if passing firstName less than 2
   * it should return {error: 'too_long'} if passing firstName more than 200
   *
   *
   * @ lastName
   * it should return {error: "blank"} if no lastName is passed
   * it should return {error: 'too_short'} if passing lastName less than 2
   * it should return {error: 'too_long'} if passing lastName more than 200
   *
   * @ countryCode
   * it should return {error: "blank"} if no countryCode is passed
   * it should return {error: "inclusion"} if countryCode not valid one
   *
   * @ phoneNumber
   * it should return {error: "blank"} if no phoneNumber is passed
   * it should return {error: 'too_short'} if passing phoneNumber less than 10
   * it should return {error: 'too_long'} if passing phoneNumber more than 15
   * it should return {error: 'not_a_number'} if passing phoneNumber with non digit character
   * it should return {error: 'invalid'} if passing invalid phoneNumber
   *
   * @ gender
   * it should return {error: "blank"} if no gender is passed
   * it should return {error: "inclusion"} if gender not valid one
   *
   * @ birthDate
   * it should return {error: "blank"} if no birthDate is passed
   * it should return {error: "invalid - YYYY-MM-DD"} if passing birthDate with invalid format
   *
   * @ avatar
   * it should return {error: "blank"} if no avatar is passed
   *
   * @ email
   * it should return {error: "invalid"} if passing invalid email
   *
   * @ password
   * it should return {error: "blank"} if no password is passed
   * it should return {error: 'too_short'} if passing password less than 4
   * it should return {error: 'too_long'} if passing password more than 50
   *
   */

  const req = { body: null };

  beforeEach(() => {
    req.body = {
      firstName: 'Mohamed',
      lastName: 'Gamal',
      countryCode: 'EG',
      phoneNumber: '+201550178854',
      gender: 'male',
      birthDate: '1996-04-09',
      email: 'mohamed.abugalala@gmail.com',
      password: '1234'
    };
    req.file = {
      path: 'placeholder for image'
    };
  });

  it('should return {error: "blank"} if no firstName is passed', () => {
    req.body.firstName = '';
    const { error } = RegisterValidator(req);
    expect(error.firstName).to.not.be.undefined;
    expect(error.firstName[0]).to.equal('blank');
  });

  it("should return {error: 'too_short'} if passing firstName less than 2", () => {
    req.body.firstName = 'd';
    const { error } = RegisterValidator(req);
    expect(error.firstName).to.not.be.undefined;
    expect(error.firstName[0]).to.equal('too_short');
  });

  it("should return {error: 'too_long'} if passing firstName more than 200", () => {
    req.body.firstName = 'd'.repeat(201);
    const { error } = RegisterValidator(req);
    expect(error.firstName).to.not.be.undefined;
    expect(error.firstName[0]).to.equal('too_long');
  });

  it('should return {error: "blank"} if no lastName is passed', () => {
    req.body.lastName = '';
    const { error } = RegisterValidator(req);
    expect(error.lastName).to.not.be.undefined;
    expect(error.lastName[0]).to.equal('blank');
  });

  it("should return {error: 'too_short'} if passing lastName less than 2", () => {
    req.body.lastName = 'd';
    const { error } = RegisterValidator(req);
    expect(error.lastName).to.not.be.undefined;
    expect(error.lastName[0]).to.equal('too_short');
  });

  it("should return {error: 'too_long'} if passing lastName more than 200", () => {
    req.body.lastName = 'd'.repeat(201);
    const { error } = RegisterValidator(req);
    expect(error.lastName).to.not.be.undefined;
    expect(error.lastName[0]).to.equal('too_long');
  });

  it('should return {error: "blank"} if no countryCode is passed', () => {
    req.body.countryCode = '';
    const { error } = RegisterValidator(req);
    expect(error.countryCode).to.not.be.undefined;
    expect(error.countryCode[0]).to.equal('blank');
  });

  it('should return {error: "inclusion"} if countryCode not valid one', () => {
    req.body.countryCode = 'not in the list';
    const { error } = RegisterValidator(req);
    expect(error.countryCode).to.not.be.undefined;
    expect(error.countryCode[0]).to.equal('inclusion');
  });

  it('should return {error: "blank"} if no phoneNumber is passed', () => {
    req.body.phoneNumber = '';
    const { error } = RegisterValidator(req);
    expect(error.phoneNumber).to.not.be.undefined;
    expect(error.phoneNumber[0]).to.equal('blank');
  });

  it("should return {error: 'too_short'} if passing phoneNumber less than 10", () => {
    req.body.phoneNumber = '1'.repeat(9);
    const { error } = RegisterValidator(req);
    expect(error.phoneNumber).to.not.be.undefined;
    expect(error.phoneNumber[0]).to.equal('too_short');
  });

  it("should return {error: 'too_long'} if passing phoneNumber more than 15", () => {
    req.body.phoneNumber = '1'.repeat(16);
    const { error } = RegisterValidator(req);
    expect(error.phoneNumber).to.not.be.undefined;
    expect(error.phoneNumber[0]).to.equal('too_long');
  });

  it("should return {error: 'not_a_number'} if passing phoneNumber with non digit character", () => {
    req.body.phoneNumber = `${'1'.repeat(11)}a`;
    const { error } = RegisterValidator(req);
    expect(error.phoneNumber).to.not.be.undefined;
    expect(error.phoneNumber[0]).to.equal('not_a_number');
  });

  it("should return {error: 'invalid'} if passing invalid phoneNumber", () => {
    req.body.phoneNumber = '01550178856666';
    const { error } = RegisterValidator(req);
    expect(error.phoneNumber).to.not.be.undefined;
    expect(error.phoneNumber[0]).to.equal('invalid');
  });

  it('should return {error: "blank"} if no gender is passed', () => {
    req.body.gender = '';
    const { error } = RegisterValidator(req);
    expect(error.gender).to.not.be.undefined;
    expect(error.gender[0]).to.equal('blank');
  });

  it('should return {error: "inclusion"} if gender not valid one', () => {
    req.body.gender = 'not in the list';
    const { error } = RegisterValidator(req);
    expect(error.gender).to.not.be.undefined;
    expect(error.gender[0]).to.equal('inclusion');
  });

  it('should return {error: "blank"} if no birthDate is passed', () => {
    req.body.birthDate = '';
    const { error } = RegisterValidator(req);
    expect(error.birthDate).to.not.be.undefined;
    expect(error.birthDate[0]).to.equal('blank');
  });

  it('should return {error: "invalid - YYYY-MM-DD"} if passing birthDate with invalid format', () => {
    req.body.birthDate = '1996-4-09';
    const { error } = RegisterValidator(req);
    expect(error.birthDate).to.not.be.undefined;
    expect(error.birthDate[0]).to.equal('invalid - YYYY-MM-DD');
  });

  it('should return {error: "blank"} if no avatar is passed', () => {
    req.file.path = '';
    const { error } = RegisterValidator(req);
    expect(error.avatar).to.not.be.undefined;
    expect(error.avatar[0]).to.equal('blank');
  });

  it('should return {error: "invalid"} if passing invalid email', () => {
    req.body.email = 'mgamal@gmail.c';
    const { error } = RegisterValidator(req);
    expect(error.email).to.not.be.undefined;
    expect(error.email[0]).to.equal('invalid');
  });

  it('should return {error: "blank"} if no password is passed', () => {
    req.body.password = '';
    const { error } = RegisterValidator(req);
    expect(error.password).to.not.be.undefined;
    expect(error.password[0]).to.equal('blank');
  });

  it("should return {error: 'too_short'} if passing password less than 2", () => {
    req.body.password = 'd';
    const { error } = RegisterValidator(req);
    expect(error.password).to.not.be.undefined;
    expect(error.password[0]).to.equal('too_short');
  });

  it("should return {error: 'too_long'} if passing password more than 200", () => {
    req.body.password = 'd'.repeat(201);
    const { error } = RegisterValidator(req);
    expect(error.password).to.not.be.undefined;
    expect(error.password[0]).to.equal('too_long');
  });
});
