import { expect } from 'chai';
import { StringType } from './StringType';
import { ListType } from './ListType';
import { FloatType } from './FloatType';

//TODO increase coverage of permutations of min/max/required

describe('ListType', () => {

  // it('should fail to create a type with missing minValues property', () => {
  //   try {
  //     new ListType({name: 'type'});
  //   } catch (err) {
  //     expect(err.message).to.contain('minEntries is required');
  //   }
  // });
  //
  // it('should fail to create a type with invalid types property', () => {
  //   try {
  //     new ListType({name: 'type', minEntries: 0, types: 'hello'});
  //   } catch (err) {
  //     expect(err.message).to.contain('listType must be an instance of a Type');
  //   }
  // });

  function testFailure(type: ListType<any>, val: any, errMessage: string) {
    try {
      type.getValue(val);
      expect.fail('Should not get here');
    } catch (err) {
      if (err instanceof Error) {
        expect(err.message).to.contain(errMessage);
      } else {
        expect.fail('Expected error is not an instance of Error');
      }
    }
  }


  describe('#getValue()', () => {

    describe('list of strings', () => {

      describe('optional with minEntries = 0', () => {
        let type: ListType<string>;

        before(() => {
          type = new ListType<string>({
            name: 'string list',
            optional: true,
            minEntries: 0,
            entryType: new StringType({name: 'stringEntry', optional: true})
          });
        });


        it('should process null', () => {
          expect(type.getValue(null)).to.be.null;
        });

        it('should process undefined', () => {
          expect(type.getValue(undefined)).to.be.null;
        });

        it('should process a string value', () => {
          expect(type.getValue('hello')).to.have.members(['hello']);
        });

        it('should process a string array', () => {
          const members = ['a', 'b', 'c', '1'];
          expect(type.getValue(members)).to.have.members(members);
        });

        it('should process integers into string array', () => {
          const values = [1, 2, 3]
            , strings = values.map(val => `${val}`)
          ;
          expect(type.getValue(values)).to.have.members(strings);
        });
      });


      describe('optional with minEntries = 1', () => {
        let type: ListType<string>;

        before(() => {
          type = new ListType({
            name: 'string list',
            optional: true,
            minEntries: 1,
            entryType: new StringType({name: 'stringEntry', optional: true})
          });
        });


        it('should fail on null', () => {
          testFailure(type, null, 'minEntries requirement not satisfied');
        });

        it('should fail on undefined', () => {
          testFailure(type, undefined, 'minEntries requirement not satisfied');
        });

        it('should process a string value', () => {
          expect(type.getValue('hello')).to.have.members(['hello']);
        });

        it('should process a string array', () => {
          const members = ['a', 'b', 'c', '1'];
          expect(type.getValue(members)).to.have.members(members);
        });

        it('should process integers into string array', () => {
          const values = [1, 2, 3]
            , strings = values.map(val => `${val}`)
          ;
          expect(type.getValue(values)).to.have.members(strings);
        });
      });


      describe('not optional with minEntries = 0', () => {
        let type: ListType<string>;

        before(() => {
          type = new ListType({
            name: 'string list',
            optional: false,
            minEntries: 0,
            entryType: new StringType({name: 'stringEntry', optional: true})
          });
        });


        it('should fail on null', () => {
          testFailure(type, null, 'is not optional');
        });

        it('should fail on undefined', () => {
          testFailure(type, undefined, 'is not optional');
        });

        it('should process a string value', () => {
          expect(type.getValue('hello')).to.have.members(['hello']);
        });

        it('should process a string array', () => {
          const members = ['a', 'b', 'c', '1'];
          expect(type.getValue(members)).to.have.members(members);
        });

        it('should process integers into string array', () => {
          const values = [1, 2, 3]
            , strings = values.map(val => `${val}`)
          ;
          expect(type.getValue(values)).to.have.members(strings);
        });
      });


      describe('not optional with minEntries = 1', () => {
        let type: ListType<string>;

        before(() => {
          type = new ListType({
            name: 'string list',
            optional: false,
            minEntries: 1,
            entryType: new StringType({name: 'stringEntry', optional: true})
          });
        });


        it('should fail on null', () => {
          testFailure(type, null, 'is not optional');
        });

        it('should fail on undefined', () => {
          testFailure(type, undefined, 'is not optional');
        });

        it('should process a string value', () => {
          expect(type.getValue('hello')).to.have.members(['hello']);
        });

        it('should process a string array', () => {
          const members = ['a', 'b', 'c', '1'];
          expect(type.getValue(members)).to.have.members(members);
        });

        it('should process integers into string array', () => {
          const values = [1, 2, 3]
            , strings = values.map(val => `${val}`)
          ;
          expect(type.getValue(values)).to.have.members(strings);
        });
      });
    });


    describe('list of floats', () => {

      describe('not optional with minEntries = 0', () => {
        let type: ListType<number>;

        before(() => {
          type = new ListType({
            name: 'float list',
            optional: false,
            minEntries: 0,
            entryType: new FloatType({name: 'floatEntry', optional: true})
          });
        });


        it('should fail on null', () => {
          testFailure(type, null, 'is not optional');
        });

        it('should fail on undefined', () => {
          testFailure(type, undefined, 'is not optional');
        });

        it('should fail on a string value', () => {
          testFailure(type, 'hello', 'not a parsable number');
        });

        it('should process a string integer value', () => {
          expect(type.getValue('1')).to.have.members([1]);
        });

        it('should process a string float value', () => {
          expect(type.getValue('1.5')).to.have.members([1.5]);
        });

        it('should process a string array of floats', () => {
          const members = ['1', '2', '3.5']
            , expected = members.map(val => Number(val))
            , result = type.getValue(members)
          ;
          expect(result).to.have.members(expected);
        });

        it('should process an array of floats', () => {
          const members = [1, 2.1, 0.5]
            , result = type.getValue(members)
          ;
          expect(result).to.have.members(members);
        });

        it('should process a mixed array of floats as numbers and strings', () => {
          const members = [1, 2.1, 0.5, '3', '12.67']
            , expected = members.map(val => Number(val))
            , result = type.getValue(members)
          ;
          expect(result).to.have.members(expected);
        });

        it('should fail with invalid values', () => {
          testFailure(type, [1.1, 'abc'], '\'abc\' is not a parsable number');
        });
      });


      describe('max entries', () => {

        let type: ListType<number>;

        before(() => {
          type = new ListType({
            name: 'float list',
            optional: false,
            minEntries: 0,
            maxEntries: 2,
            entryType: new FloatType({name: 'floatEntry', optional: true})
          });
        });

        it('should fail on null', () => {
          testFailure(type, null, 'is not optional');
        });

        it('should fail on undefined', () => {
          testFailure(type, undefined, 'is not optional');
        });

        it('should fail on a string value', () => {
          testFailure(type, 'hello', 'not a parsable number');
        });

        it('should process a string integer value', () => {
          expect(type.getValue('1')).to.have.members([1]);
        });

        it('should process a string float value', () => {
          expect(type.getValue('1.5')).to.have.members([1.5]);
        });

        it('should process an array of floats within limits', () => {
          const members = [1, 2.1]
            , result = type.getValue(members)
          ;
          expect(result).to.have.members(members);
        });

        it('should fail on too many entries', () => {
          testFailure(type, [1, 2.1, 1.5], 'greater than required maximum');
        });
      });

    });
  });
});