import {expect} from 'chai';
import { CommonStates } from './CommonStates';

const RANGE_ERROR_STRING = 'is not within allowed limits'
  , CHOICES_ERROR_MESSAGE = 'is not one of the allowed values'
;

describe('Hue API #lightState', () => {


  describe('#create()', () => {

    it('should create an empty state', () => {
      const state = new CommonStates()
        , payload = state.getPayload()
      ;

      expect(Object.keys(payload)).to.be.empty;
    });
  });


  describe('single states', () => {

    let state: CommonStates<CommonStates<any>>;

    beforeEach(() => {
      state = new CommonStates<CommonStates<any>>();
    });

    describe('state: on', () => {

      describe('#on()', () => {
        it('should set on with no value', () => {
          state.on();
          validateOnState(true);
        });

        it('should set on with "false" value', () => {
          state.on(false);
          validateOnState(false);
        });

        it('should set on with "true" value', () => {
          state.on(true);
          validateOnState(true);
        });
      });


      describe('#off()', () => {
        it('should set on state', () => {
          state.off(false);
          validateOnState(true);
        });
      });
    });


    describe('state: bri', () => {

      function test(functionName: string, value: number, expectedValue: number) {
        // @ts-ignore
        state[functionName](value);
        validateBriState(expectedValue);
      }

      function testFailure(functionName: string, value: number, errorString: string) {
        try {
          // @ts-ignore
          state[functionName](value);
          expect.fail('Should have thrown an error');
        } catch (err) {
          expect(err).to.exist;
          if (err instanceof Error) {
            expect(err.message).to.contain(errorString);
          } else {
            expect.fail('Expected error is not an instance of Error');
          }
        }
      }

      describe('#bri()', () => {

        function testBri(value: number) {
          test('bri', value, value);
        }

        function testFailureBri(value: number) {
          testFailure('bri', value, RANGE_ERROR_STRING);
        }

        it('should set brightness to 254', () => {
          testBri(254);
        });

        it('should set brightness to 1', () => {
          testBri(1);
        });

        it('should set brightness to 10', () => {
          testBri(10);
        });

        it('should respect min boundary', () => {
          testFailureBri(-100);
        });

        it('should fail to set brightness to 0', () => {
          testFailureBri(0);
        });

        it('should respect max boundary', () => {
          testFailureBri(1000);
        });
      });


      describe('#brighness', () => {

        function testBrightness(value: number, expectedValue: number) {
          test('brightness', value, expectedValue);
        }

        function testFailureBrightness(value: number) {
          testFailure('brightness', value, RANGE_ERROR_STRING);
        }

        it('100% should set brightness to 254', () => {
          testBrightness(100, 254);
        });

        it('0% should set brightness to 1', () => {
          testBrightness(0, 1);
        });

        it('50% should set brightness to 155', () => {
          testBrightness(50, 127);
        });

        it('should fail on negative number', () => {
          testFailureBrightness(-10);
        });

        it('should fail on number higher than 100', () => {
          testFailureBrightness(101);
        });
      });
    });


    describe('state: hue', () => {

      describe('#hue()', () => {

        function test(value: number, expected: number) {
          state.hue(value);
          validateHueState(expected);
        }

        function testFailure(value: number, errorString: string) {
          try {
            state.hue(value);
            expect.fail('Should have thrown an error');
          } catch (err) {
            expect(err).to.exist;
            if (err instanceof Error) {
              expect(err.message).to.contain(errorString);
            } else {
              expect.fail('Expected error is not an instance of Error');
            }
          }
        }

        it('should set to 0', () => {
          test(0, 0);
        });

        it('should set to 1', () => {
          test(1, 1);
        });

        it('should set to 15000', () => {
          test(15000, 15000);
        });

        it('should set to 65535', () => {
          test(65535, 65535);
        });

        it('should fail on -1', () => {
          testFailure(-1, RANGE_ERROR_STRING);
        });

        it('should fail on 65536', () => {
          testFailure(65536, RANGE_ERROR_STRING);
        });

        // THis is optional so it will not fail
        // it('should fail if nothing specified', () => {
        //   testFailure(null, RANGE_ERROR_STRING);
        //   testFailure(undefined, RANGE_ERROR_STRING);
        // });
      });
    });


    describe('state: sat', () => {

      function test(functionName: string, value: number, expected: number) {
        // @ts-ignore
        state[functionName](value);
        validateSatState(expected);
      }

      function testFailure(functionName: string, value: number, errorString: string) {
        try {
          // @ts-ignore
          state[functionName](value);
          expect.fail('Should have thrown an error');
        } catch (err) {
          expect(err).to.exist;
          if (err instanceof Error) {
            expect(err.message).to.contain(errorString);
          } else {
            expect.fail('Expected error is not an instance of Error');
          }
        }
      }

      describe('#sat()', () => {

        function testSat(value: number) {
          test('sat', value, value);
        }

        function testFailureSat(value: number, errorString: string) {
          testFailure('sat', value, errorString);
        }

        it('should set to 0', () => {
          testSat(0);
        });

        it('should set to 254', () => {
          testSat(254);
        });

        it('should set to 125', () => {
          testSat(125);
        });


        it('should fail on -1', () => {
          testFailureSat(-1, RANGE_ERROR_STRING);
        });

        it('should fail on 255', () => {
          testFailureSat(255, RANGE_ERROR_STRING);
        });

        // THis is optional so it will not fail
        // it('fail if nothing specified', () => {
        //   testFailureSat(null);
        //   testFailureSat(undefined);
        // });
      });

      describe('#saturation()', () => {

        function testSaturation(value: number, expected: number) {
          test('saturation', value, expected);
        }

        function testFailureSaturation(value: number) {
          testFailure('saturation', value, RANGE_ERROR_STRING);
        }

        it('should set 0%', () => {
          testSaturation(0, 0);
        });

        it('should set 100%', () => {
          testSaturation(100, 254);
        });

        it('should set 50%', () => {
          testSaturation(50, 127);
        });

        it('should fail on negative number', () => {
          testFailureSaturation(-100);
        });

        it('should fail on over 100', () => {
          testFailureSaturation(101);
        });
      });
    });

    describe('state: xy', () => {
      describe('#xy', () => {

        function test(x: number| number[], y: number | null | undefined, expected: number[]) {
          state.xy(x, y);
          validateXYState(expected);
        }

        function testFailure(x: number, y: number, expected: string) {
          try {
            state.xy(x, y);
            expect.fail('Should have thrown an error');
          } catch (err) {
            expect(err).to.exist;
            if (err instanceof Error) {
              expect(err.message).to.contain(expected);
            } else {
              expect.fail('Expected error is not an instance of Error');
            }
          }
        }

        it('should set (0,0)', () => {
          test(0, 0, [0, 0]);
        });

        it('should set (0, 1)', () => {
          test(0, 1, [0, 1]);
        });

        it('should set (1, 1)', () => {
          test(1, 1, [1, 1]);
        });

        it('should set (0.254, 0.5)', () => {
          test(0.254, 0.5, [0.254, 0.5]);
        });

        it('should support an array of [x, y]', () => {
          test([0.5, 0.6], null, [0.5, 0.6]);
        });

        describe('x value boundaries', () => {

          it('should fail on -1', () => {
            testFailure(-1, 0, RANGE_ERROR_STRING);
          });

          it('should fail on 1.1', () => {
            testFailure(1.1, 0, RANGE_ERROR_STRING);
          });
        });

        describe('y value boundaries', () => {

          it('should convert -10.5 to 0', () => {
            testFailure(0, -10.5, RANGE_ERROR_STRING);
          });

          it('should fail on 10.581', () => {
            testFailure(0, 10.5, RANGE_ERROR_STRING);
          });
        });
      });
    });


    describe('state: ct', () => {

      describe('#ct()', () => {

        function test(value: number, expected: number) {
          state.ct(value);
          validateCTState(expected);
        }

        function testFailure(ct: number, expected: string) {
          try {
            state.ct(ct);
            expect.fail('Should have thrown an error');
          } catch (err) {
            expect(err).to.exist;
            if (err instanceof Error) {
              expect(err.message).to.contain(expected);
            } else {
              expect.fail('Expected error is not an instance of Error');
            }
          }
        }

        it('should set 153 (6500K)', () => {
          test(153, 153);
        });

        it('should set 500 (2000K)', () => {
          test(500, 500);
        });

        it('should set 212', () => {
          test(212, 212);
        });

        it('should fail on 0', () => {
          testFailure(0, RANGE_ERROR_STRING);
        });

        it('should fail on 501', () => {
          testFailure(501., RANGE_ERROR_STRING);
        });

        // This is optional so it will not fail
        // it('should fail if nothing provided', () => {
        //   testFailure(null, RANGE_ERROR_STRING);
        // });
      });

      // describe("#colorTemperature", () => {
      //
      //   function test(value, expected) {
      //     state.colorTemperature(value);
      //     validateCTState(expected);
      //   }
      //
      //   it("should set 153", () => {
      //     test(153, 153);describe("#xy", () => {
      //
      //       function test(x, y, expected) {
      //         var payload;
      //
      //         state.xy(x, y);
      //         payload = state.payload();
      //
      //         validateXYState(expected);
      //       }
      //
      //       it("should set (0,0)", () => {
      //         test(0, 0, [0, 0]);
      //       });
      //
      //       it("should set (0, 1)", () => {
      //         test(0, 1, [0, 1]);
      //       });
      //
      //       it("should set (1, 1)", () => {
      //         test(1, 1, [1, 1]);
      //       });
      //
      //       it("should set (0.254, 0.5)", () => {
      //         test(0.254, 0.5, [0.254, 0.5]);
      //       });
      //
      //       it("should support an array of [x, y]", () => {
      //         test([0.5, 0.6], null, [0.5, 0.6]);
      //       });
      //
      //       describe("x value boundaries", () => {
      //
      //         it("should convert -1 to 0", () => {
      //           test(-1, 0.5, [0, 0.5]);
      //         });
      //
      //         it("should convert 1.1 to 1", () => {
      //           test(1.1, 0.5, [1, 0.5]);
      //         });
      //       });
      //
      //       describe("y value boundaries", () => {
      //
      //         it("should convert -10.5 to 0", () => {
      //           test(-10.5, 0.675, [0, 0.675]);
      //         });
      //
      //         it("should convert 10.581 to 1", () => {
      //           test(10.581, 0.1, [1, 0.1]);
      //         });
      //       });
      //     });
      //   });
      // });
      //
      // describe("#colourTemperature", () => {
      //
      //   function test(value, expected) {
      //     state.colourTemperature(value);
      //     validateCTState(expected);
      //   }
      //
      //   it("should set 153", () => {
      //     test(153, 153);
      //   });
      // });
      //
      // describe("#colorTemp", () => {
      //
      //   function test(value, expected) {
      //     state.colorTemp(value);
      //     validateCTState(expected);
      //   }
      //
      //   it("should set 153", () => {
      //     test(153, 153);
      //   });
      //
      //   it("should set 300", () => {
      //     test(300, 300);
      //   });
      // });
      //
      // describe("#colourTemp", () => {
      //
      //   function test(value, expected) {
      //     state.colourTemp(value);
      //     validateCTState(expected);
      //   }
      //
      //   it("should set 153", () => {
      //     test(153, 153);
      //   });
      //
      //   it("should set 220", () => {
      //     test(220, 220);
      //   });
      // });
    });


    describe('state: alert', () => {

      function testAlert(functionName: string, value: string) {
        // @ts-ignore
        state[functionName](value);
        validateAlertState(value);
      }

      function testFailureAlert(functionName:string, value: string) {
        try {
          // @ts-ignore
          state[functionName](value);
          expect.fail('Should have thrown an error');
        } catch (err) {
          expect(err).to.exist;
          if (err instanceof Error) {
            expect(err.message).to.contain(CHOICES_ERROR_MESSAGE);
          } else {
            expect.fail('Expected error is not an instance of Error');
          }
          
        }
      }


      describe('#alert()', () => {

        function test(value: string) {
          testAlert('alert', value);
        }

        it('should set none', () => {
          test('none');
        });

        it('should set select', () => {
          test('select');
        });

        it('should set lselect', () => {
          test('lselect');
        });

        it('should fail on invalid values', () => {
          testFailureAlert('alert', 'invalid');
          testFailureAlert('alert', 'other');
          testFailureAlert('alert', 'stop');
        });
      });


      describe('#alertLong', () => {

        it('should set a long alert', () => {
          testAlert('alertLong', 'lselect');
        });
      });

      describe('#alertShort()', () => {

        it('should set a short alert', () => {
          state.alertShort();
          validateAlertState('select');
        });
      });

      describe('#alertNone()', () => {

        it('should clear alert', () => {
          state.alertNone();
          validateAlertState('none');
        });
      });
    });


    describe('state: effect', () => {

      function test(value: string) {
        state.effect(value);
        validateEffectState(value);
      }

      function testFailure(value: string, expected: string) {
        try {
          state.effect(value);
          expect.fail('Should have thrown an error');
        } catch (err) {
          expect(err).to.exist;
          if (err instanceof Error) {
            expect(err.message).to.contain(expected);
          } else {
            expect.fail('Expected error is not an instance of Error');
          }
        }
      }

      describe('#effect()', () => {

        it('should accept \'none\'', () => {
          test('none');
        });

        it('should accept \'colorloop\'', () => {
          test('colorloop');
        });

        it('should fail on colorLoop\'', () => {
          testFailure('colorLoop', CHOICES_ERROR_MESSAGE);
        });

        it('should fail on invalid value', () => {
          testFailure('disco', CHOICES_ERROR_MESSAGE);
        });

        it('should set effect to none if no parameter provided', () => {
          state.effect();
          validateEffectState('none');
        });
      });

      describe('#effectColorLoop', () => {

        it('should', () => {
          state.effectColorLoop();
          validateEffectState('colorloop');
        });
      });

      describe('#effectNone', () => {

        it('should', () => {
          state.effectNone();
          validateEffectState('none');
        });
      });
    });


    describe('state: transitiontime', () => {

      function test(functionName: string, value: number) {
        // @ts-ignore
        state[functionName](value);
        validateTransitionTimeState(value);
      }

      function testFailure(functionName: string, value: number, expected: string) {
        try {
          // @ts-ignore
          state[functionName](value);
          expect.fail('Should have thrown an error');
        } catch (err) {
          expect(err).to.exist;
          if (err instanceof Error) {
            expect(err.message).to.contain(expected);
          } else {
            expect.fail('Expected error is not an instance of Error');
          }
        }
      }

      describe('#transitiontime()', () => {

        function testTransitiontime(value: number) {
          test('transitiontime', value);
        }

        function testFailureTransistiontime(value: number) {
          testFailure('transitiontime', value, RANGE_ERROR_STRING);
        }

        it('should set 0', () => {
          testTransitiontime(0);
        });

        it('should set 4', () => {
          testTransitiontime(4);
        });

        it('should set 10', () => {
          testTransitiontime(10);
        });

        it('should set 36000', () => {
          testTransitiontime(36000);
        });

        it('should set 65535', () => {
          testTransitiontime(65535);
        });

        it('should fail on 65536', () => {
          testFailureTransistiontime(65536);
        });

        it('should set default of 4 if no parameter provided', () => {
          state.transitiontime();
          validateTransitionTimeState(4);
        });
      });


      describe('#transitionTime()', () => {

        function testTransitionTime(value: number) {
          test('transitiontime', value);
        }

        it('should set 0', () => {
          testTransitionTime(0);
        });

        it('should set 10', () => {
          testTransitionTime(10);
        });

        it('should set 65535', () => {
          testTransitionTime(65535);
        });
      });


      describe('#transitionSlow()', () => {

        it('should set 8', () => {
          state.transitionSlow();
          validateTransitionTimeState(8);
        });
      });


      describe('#transitionInstant()', () => {

        it('should set 0', () => {
          state.transitionInstant();
          validateTransitionTimeState(0);
        });
      });


      describe('#transitionDefault()', () => {

        it('should set 4', () => {
          state.transitionDefault();
          validateTransitionTimeState(4);
        });
      });


      describe('#transitionFast()', () => {

        it('should set 2', () => {
          state.transitionFast();
          validateTransitionTimeState(2);
        });
      });


      describe('#transition()', () => {

        function test(value: number, expected: number) {
          // @ts-ignore
          state.transition(value);
          validateTransitionTimeState(expected);
        }

        it('should set 100ms', () => {
          test(100, 1);
        });

        it('should set 1000ms', () => {
          test(1000, 10);
        });

        it('should set 20000ms', () => {
          test(20000, 200);
        });
      });

      describe('#transitionInMillis()', () => {

        function test(value: number, expected: number) {
          state.transitionInMillis(value);
          validateTransitionTimeState(expected);
        }

        it('should set 100ms', () => {
          test(100, 1);
        });

        it('should set 1000ms', () => {
          test(1000, 10);
        });
      });
    });


    describe('state: bri_inc', () => {

      function testBrightnessIncrement(functionName: string, value: number, expected: number) {
        // @ts-ignore
        state[functionName](value);
        validateBrightnessIncrement(expected);
      }

      function testFailureBrightnessIncrement(functionName: string, value: number, expected: string) {
        try {
          // @ts-ignore
          state[functionName](value);
          expect.fail('Should have thrown an error');
        } catch (err) {
          expect(err).to.exist;
          if (err instanceof Error) {
            expect(err.message).to.contain(expected);
          } else {
            expect.fail('Expected error is not an instance of Error');
          }
        }
      }

      describe('#bri_inc()', () => {

        function test(value: number, expected?: number) {
          const expectedValue = (expected === undefined) ? value : expected;
          testBrightnessIncrement('bri_inc', value, expectedValue);
        }

        function testFailure(value: number) {
          testFailureBrightnessIncrement('bri_inc', value, RANGE_ERROR_STRING);
        }

        it('should set -254', () => {
          test(-254);
        });

        it('should set 254', () => {
          test(254);
        });

        it('should set 0', () => {
          test(0);
        });

        it('should set 1.5 as 1', () => {
          test(1.5, 1);
        });

        it('should fail on -300', () => {
          testFailure(-300);
        });

        it('should fail on 255', () => {
          testFailure(255);
        });
      });


      describe('#incrementBrightness()', () => {

        function test(value: number) {
          testBrightnessIncrement('incrementBrightness', value, value);
        }

        function testFailure(value: number) {
          testFailureBrightnessIncrement('incrementBrightness', value, RANGE_ERROR_STRING);
        }

        it('should set -254', () => {
          test(-254);
        });

        it('should set 254', () => {
          test(254);
        });

        it('should set 0', () => {
          test(0);
        });

        it('should fail on -255', () => {
          testFailure(-255);
        });

        it('should fail on 256', () => {
          testFailure(256);
        });
      });
    });


    describe('state: sat_inc', () => {

      function testSaturationIncrement(functionName: string, value: number, expected: number) {
        // @ts-ignore
        state[functionName](value);
        validateSaturationIncrement(expected);
      }

      function testFailureSaturationIncrement(functionName: string, value: number, expected: string) {
        try {
          // @ts-ignore
          state[functionName](value);
          expect.fail('Should have thrown an error');
        } catch (err) {
          expect(err).to.exist;
          if (err instanceof Error) {
            expect(err.message).to.contain(expected);
          } else {
            expect.fail('Expected error is not an instance of Error');
          }
        }
      }

      describe('#sat_inc()', () => {

        function test(value: number, expected?: number) {
          const expectedValue = (expected === undefined) ? value : expected;
          testSaturationIncrement('sat_inc', value, expectedValue);
        }

        function testFailure(value: number) {
          testFailureSaturationIncrement('sat_inc', value, RANGE_ERROR_STRING);
        }

        it('should set -254', () => {
          test(-254);
        });

        it('should set 254', () => {
          test(254);
        });

        it('should set 0', () => {
          test(0);
        });

        it('should set 1.5 as 1', () => {
          test(1.5, 1);
        });

        it('should fail on -300', () => {
          testFailure(-300);
        });

        it('should fail on 255', () => {
          testFailure(255);
        });
      });


      describe('#incrementSaturation()', () => {

        function test(value: number) {
          testSaturationIncrement('incrementSaturation', value, value);
        }

        function testFailure(value: number) {
          testFailureSaturationIncrement('incrementSaturation', value, RANGE_ERROR_STRING);
        }


        it('should set 254', () => {
          test(254);
        });

        it('should set 0', () => {
          test(0);
        });

        it('should set -254', () => {
          test(-254);
        });

        it('should set -1', () => {
          test(-1);
        });

        it('should fail on -255', () => {
          testFailure(-255);
        });

        it('should fail on 256', () => {
          testFailure(256);
        });
      });
    });


    describe('state: hue_inc', () => {

      function testHueIncrement(functionName: string, value: number, expected: number) {
        // @ts-ignore
        state[functionName](value);
        validateHueIncrement(expected);
      }

      function testFailureHueIncrement(functionName: string, value: number, expected: string) {
        try {
          // @ts-ignore
          state[functionName](value);
          expect.fail('Should have thrown an error');
        } catch (err) {
          expect(err).to.exist;
          if (err instanceof Error) {
            expect(err.message).to.contain(expected);
          } else {
            expect.fail('Expected error is not an instance of Error');
          }
        }
      }

      describe('#sat_inc()', () => {

        function test(value: number, expected?: number) {
          const expectedValue = (expected === undefined) ? value : expected;
          testHueIncrement('hue_inc', value, expectedValue);
        }

        function testFailure(value: number) {
          testFailureHueIncrement('hue_inc', value, RANGE_ERROR_STRING);
        }

        it('should set -65534', () => {
          test(-65534);
        });

        it('should set 65534', () => {
          test(65534);
        });

        it('should set 0', () => {
          test(0);
        });

        it('should set 1.5 as 1', () => {
          test(1.5, 1);
        });

        it('should fail on -65535', () => {
          testFailure(-65535);
        });

        it('should fail on 65535', () => {
          testFailure(65535);
        });
      });


      describe('#incrementHue()', () => {

        function test(value: number, expected?: number) {
          const expectedValue = (expected === undefined) ? value : expected;
          testHueIncrement('incrementHue', value, expectedValue);
        }

        function testFailure(value: number) {
          testFailureHueIncrement('incrementHue', value, RANGE_ERROR_STRING);
        }

        it('should set -65534', () => {
          test(-65534);
        });

        it('should set 65534', () => {
          test(65534);
        });

        it('should set 0', () => {
          test(0);
        });

        it('should set 1.5 as 1', () => {
          test(1.5, 1);
        });

        it('should fail on -65535', () => {
          testFailure(-65535);
        });

        it('should fail on 65535', () => {
          testFailure(65535);
        });
      });
    });


    describe('state: ct_inc', () => {

      function testCtIncrement(functionName: string, value: number, expectedValue: number) {
        // @ts-ignore
        state[functionName](value);
        validateCtIncrement(expectedValue);
      }

      function testFailureCtIncrement(functionName: string, value: number, expected: string) {
        try {
          // @ts-ignore
          state[functionName](value);
          expect.fail('Should have thrown an error');
        } catch (err) {
          expect(err).to.exist;
          if (err instanceof Error) {
            expect(err.message).to.contain(expected);
          } else {
            expect.fail('Expected error is not an instance of Error');
          }
        }
      }

      describe('#ct_inc()', () => {

        function test(value: number, expected? : number) {
          const expectedValue = (expected === undefined) ? value : expected;
          testCtIncrement('ct_inc', value, expectedValue);
        }

        function testFailure(value: number) {
          testFailureCtIncrement('ct_inc', value, RANGE_ERROR_STRING);
        }

        it('should set -65534', () => {
          test(-65534);
        });

        it('should set 65534', () => {
          test(65534);
        });

        it('should set 0', () => {
          test(0);
        });

        it('should set 1.5 as 1', () => {
          test(1.5, 1);
        });

        it('should fail on -65535', () => {
          testFailure(-65535);
        });

        it('should fail on 65535', () => {
          testFailure(65535);
        });
      });


      describe('#incrementCt()', () => {

        function test(value: number, expected?: number) {
          const expectedValue = (expected === undefined) ? value : expected;
          testCtIncrement('incrementCt', value, expectedValue);
        }

        function testFailure(value: number) {
          testFailureCtIncrement('incrementCt', value, RANGE_ERROR_STRING);
        }

        it('should set -65534', () => {
          test(-65534);
        });

        it('should set 65534', () => {
          test(65534);
        });

        it('should set 0', () => {
          test(0);
        });

        it('should set 1.5 as 1', () => {
          test(1.5, 1);
        });

        it('should fail on -65535', () => {
          testFailure(-65535);
        });

        it('should fail on 65535', () => {
          testFailure(65535);
        });
      });

      describe('#incrementColorTemp()', () => {

        function test(value: number, expected?: number) {
          const expectedValue = (expected === undefined) ? value : expected;
          testCtIncrement('incrementColorTemp', value, expectedValue);
        }

        function testFailure(value: number) {
          testFailureCtIncrement('incrementColorTemp', value, RANGE_ERROR_STRING);
        }

        it('should set -65534', () => {
          test(-65534);
        });

        it('should set 65534', () => {
          test(65534);
        });

        it('should set 0', () => {
          test(0);
        });

        it('should set 1.5 as 1', () => {
          test(1.5, 1);
        });

        it('should fail on -65535', () => {
          testFailure(-65535);
        });

        it('should fail on 65535', () => {
          testFailure(65535);
        });
      });

      describe('#incrementColourTemp()', () => {

        function test(value: number, expected?: number) {
          const expectedValue = (expected === undefined) ? value : expected;
          testCtIncrement('incrementColorTemp', value, expectedValue);
        }

        function testFailure(value: number) {
          testFailureCtIncrement('incrementColorTemp', value, RANGE_ERROR_STRING);
        }

        it('should set -65534', () => {
          test(-65534);
        });

        it('should set 65534', () => {
          test(65534);
        });

        it('should set 0', () => {
          test(0);
        });

        it('should set 1.5 as 1', () => {
          test(1.5, 1);
        });

        it('should fail on -65535', () => {
          testFailure(-65535);
        });

        it('should fail on 65535', () => {
          testFailure(65535);
        });
      });
    });


    describe('state: xy_inc', () => {

      function testXYIncrementWithArray(functionName: string, value: number[]) {
        // @ts-ignore
        state[functionName](value);
        validateXYIncrement(value);
      }

      function testXYIncrementWithValues(functionName: string, x: number, y: number) {
        // @ts-ignore
        state[functionName](x, y);
        validateXYIncrement([x, y]);
      }

      function testFailureXYIncrement(functionName: string, value: number[], expected: string) {
        try {
          // @ts-ignore
          state[functionName](value);
          expect.fail('Should have thrown an error');
        } catch (err) {
          expect(err).to.exist;
          if (err instanceof Error) {
            expect(err.message).to.contain(expected);
          } else {
            expect.fail('Expected error is not an instance of Error');
          }
        }
      }


      describe('#xy_inc()', () => {

        function testWithArray(value: number[]) {
          testXYIncrementWithArray('xy_inc', value);
        }

        function testWithValues(x: number, y: number) {
          testXYIncrementWithValues('xy_inc', x, y);
        }

        function testFailure(x: number, y: number) {
          testFailureXYIncrement('xy_inc', [x, y], RANGE_ERROR_STRING);
        }

        it('should set [-0.5, -0.5]', () => {
          testWithArray([-0.5, -0.5]);
        });

        it('should set (-0.5, -0.5)', () => {
          testWithValues(-0.5, -0.5);
        });

        it('should set [0.5, 0.5]', () => {
          testWithArray([0.5, 0.5]);
        });

        it('should set 0', () => {
          testWithValues(0, 0);
        });

        it('should fail on (-0.6, -0.5)', () => {
          testFailure(-0.6, -0.5);
        });
      });


      describe('#incrementXY', () => {

        function testWithArray(value: number[]) {
          testXYIncrementWithArray('xy_inc', value);
        }

        function testWithValues(x: number, y: number) {
          testXYIncrementWithValues('xy_inc', x, y);
        }

        function testFailure(value: number[]) {
          testFailureXYIncrement('xy_inc', value, RANGE_ERROR_STRING);
        }

        it('should set (-0.5, -0.5)', () => {
          testWithValues(-0.5, -0.5);
        });

        it('should set [0.5, 0.5]', () => {
          testWithArray([0.5, 0.5]);
        });

        it('should set [0, 0]', () => {
          testWithArray([0, 0]);
        });

        it('should fail with invalid values', () => {
          testFailure([0, 1]);
        });
      });
    });


    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


    function validateOnState(expected: boolean) {
      expect(state.getPayload()).to.have.property('on', expected);
    }

    function validateBriState(expected: number) {
      expect(state.getPayload()).to.have.property('bri', expected);
    }

    function validateHueState(expected: number) {
      expect(state.getPayload()).to.have.property('hue', expected);
    }

    function validateSatState(expected: number) {
      expect(state.getPayload()).to.have.property('sat', expected);
    }

    function validateXYState(expected: number[]) {
      const payload = state.getPayload();

      expect(payload).to.have.property('xy');
      // @ts-ignore
      expect(payload.xy).to.be.an.instanceOf(Array);
      // @ts-ignore
      expect(payload.xy).to.have.members(expected);
    }

    function validateCTState(expected: number) {
      expect(state.getPayload()).to.have.property('ct', expected);
    }

    function validateEffectState(expected: string) {
      expect(state.getPayload()).to.have.property('effect', expected);
    }

    function validateAlertState(expected: string) {
      expect(state.getPayload()).to.have.property('alert', expected);
    }

    function validateTransitionTimeState(expected: number) {
      expect(state.getPayload()).to.have.property('transitiontime', expected);
    }

    function validateBrightnessIncrement(expected: number) {
      expect(state.getPayload()).to.have.property('bri_inc', expected);
    }

    function validateSaturationIncrement(expected: number) {
      expect(state.getPayload()).to.have.property('sat_inc', expected);
    }

    function validateHueIncrement(expected: number) {
      expect(state.getPayload()).to.have.property('hue_inc', expected);
    }

    function validateCtIncrement(expected: number) {
      expect(state.getPayload()).to.have.property('ct_inc', expected);
    }

    function validateXYIncrement(expected: number[]) {
      const payload = state.getPayload();

      expect(payload).to.have.property('xy_inc');
      // @ts-ignore
      expect(payload.xy_inc).to.be.an.instanceOf(Array);
      // @ts-ignore
      expect(payload.xy_inc).to.have.members(expected);
    }
  });
});



