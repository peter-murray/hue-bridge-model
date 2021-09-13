import { expect } from 'chai';
import { FloatType } from './FloatType';

const MAX_VALUE = Number.MAX_VALUE
  , MIN_VALUE = -Number.MAX_VALUE
  , OVER_MAX_VALUE = Number.POSITIVE_INFINITY
  , UNDER_MIN_VALUE = Number.NEGATIVE_INFINITY
;


describe('FloatType', () => {

  describe('constructor', () => {

    it('should create a type', () => {
      const name = 'my_type_of_float'
        , type = new FloatType({name: name})
      ;

      expect(type).to.have.property('name').to.equal(name);
      expect(type).to.have.property('type').to.equal('float');
    });
  });


  function testFailure(type: FloatType, value: any, message: string) {
    try {
      type.getValue(value);
      expect.fail('should not get here');
    } catch (err) {
      if (err instanceof Error) {
        expect(err.message).to.contain(message);
      } else {
        expect.fail('Expected error is not an instance of Error');
      }
    }
  }

  describe('#getValue()', () => {

    describe('optional, no default', () => {
      let floatType = new FloatType({
        name: 'floatType',
        optional: true
      });


      it('should process 0', () => {
        expect(floatType.getValue(0)).to.equal(0);
      });

      it('should process 1', () => {
        expect(floatType.getValue(1)).to.equal(1);
      });

      it('should process -1', () => {
        expect(floatType.getValue(-1)).to.equal(-1);
      });

      it('should process max value', () => {
        expect(floatType.getValue(MAX_VALUE)).to.equal(MAX_VALUE);
      });

      it('should process -255', () => {
        expect(floatType.getValue(MIN_VALUE)).to.equal(MIN_VALUE);
      });

      it('should fail on over max value', () => {
        testFailure(floatType, OVER_MAX_VALUE, 'not within allowed limits');
      });

      it('should fail on under min value', () => {
        testFailure(floatType, UNDER_MIN_VALUE, 'not within allowed limits');
      });

      it('should process null', () => {
        expect(floatType.getValue(null)).to.equal(null);
      });

      it('should process undefined', () => {
        expect(floatType.getValue(undefined)).to.equal(null);
      });

      it('should fail to parse abc', () => {
        testFailure(floatType, 'abc', 'is not a parsable number');
      });

      it('should parse 1.1.1', () => {
        expect(floatType.getValue('1.1.1')).to.equal(1.1);
      });
    });
  });


  describe('not optional, no default', () => {

    let intType = new FloatType({
      name: 'int8Type',
      optional: false
    });


    it('should process 0', () => {
      expect(intType.getValue(0)).to.equal(0);
    });

    it('should process 1', () => {
      expect(intType.getValue(1)).to.equal(1);
    });

    it('should process -1', () => {
      expect(intType.getValue(-1)).to.equal(-1);
    });

    it('should process max value', () => {
      expect(intType.getValue(MAX_VALUE)).to.equal(MAX_VALUE);
    });

    it('should process min value', () => {
      expect(intType.getValue(MIN_VALUE)).to.equal(MIN_VALUE);
    });

    it('should fail on over max value', () => {
      testFailure(intType, OVER_MAX_VALUE, 'not within allowed limits');
    });

    it('should fail on under min value', () => {
      testFailure(intType, UNDER_MIN_VALUE, 'not within allowed limits');
    });

    it('should fail on null', () => {
      testFailure(intType, null, 'is not optional');
    });

    it('should fail on undefined', () => {
      testFailure(intType, null, 'is not optional');
    });
  });


  describe('not optional, with default', () => {

    const DEFAULT_VALUE = 10;

    let intType = new FloatType({
      name: 'int8Type',
      optional: false,
      defaultValue: DEFAULT_VALUE
    });


    it('should process 0', () => {
      expect(intType.getValue(0)).to.equal(0);
    });

    it('should process 1', () => {
      expect(intType.getValue(1)).to.equal(1);
    });

    it('should process -1', () => {
      expect(intType.getValue(-1)).to.equal(-1);
    });

    it('should process max value', () => {
      expect(intType.getValue(MAX_VALUE)).to.equal(MAX_VALUE);
    });

    it('should process min value', () => {
      expect(intType.getValue(MIN_VALUE)).to.equal(MIN_VALUE);
    });

    it('should fail on over max value', () => {
      testFailure(intType, OVER_MAX_VALUE, 'not within allowed limits');
    });

    it('should fail on under max value', () => {
      testFailure(intType, UNDER_MIN_VALUE, 'not within allowed limits');
    });

    it('should process null', () => {
      expect(intType.getValue(null)).to.equal(DEFAULT_VALUE);
    });

    it('should process undefined', () => {
      expect(intType.getValue(undefined)).to.equal(DEFAULT_VALUE);
    });
  });


  describe('not optional, with default and different max/min values', () => {

    const DEFAULT_VALUE = 10;

    let intType = new FloatType({
      name: 'int8Type',
      optional: false,
      defaultValue: DEFAULT_VALUE,
      min: 10,
      max: 15
    });


    it('should fail on 0', () => {
      testFailure(intType, 0, 'not within allowed limits');
    });

    it('should process 10', () => {
      expect(intType.getValue(10)).to.equal(10);
    });

    it('should process 15', () => {
      expect(intType.getValue(15)).to.equal(15);
    });

    it('should fail on 16', () => {
      testFailure(intType, 16, 'not within allowed limits');
    });

    it('should process null', () => {
      expect(intType.getValue(null)).to.equal(DEFAULT_VALUE);
    });

    it('should process undefined', () => {
      expect(intType.getValue(undefined)).to.equal(DEFAULT_VALUE);
    });
  });
});


