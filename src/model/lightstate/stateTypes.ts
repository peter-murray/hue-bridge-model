import {
  BooleanType,
  ChoiceType,
  FloatType,
  Int16Type,
  Int8Type,
  ListType,
  StringType,
  UInt16Type,
  UInt8Type
} from '../../types';


export default {
  on: new BooleanType({
    name: 'on',
    optional: true
  }),

  bri: new UInt8Type({
    name: 'bri',
    min: 1,
    max: 254,
    optional: true
  }),

  hue: new UInt16Type({
    name: 'hue',
    optional: true
  }),

  sat: new UInt8Type({
    name: 'sat',
    min: 0,
    max: 254,
    optional: true
  }),

  xy: new ListType({
    name: 'xy',
    minEntries: 2,
    maxEntries: 2,
    entryType: new FloatType({
      name: 'xyValue',
      min: 0,
      max: 1,
      optional: false
    }),
    optional: true
  }),

  ct: new UInt16Type({
    name: 'ct',
    min: 153,
    max: 500,
    optional: true
  }),

  alert: new ChoiceType({
    name: 'alert',
    defaultValue: 'none',
    validValues: ['none', 'select', 'lselect'],
    optional: true
  }),

  effect: new ChoiceType({
    name: 'effect',
    defaultValue: 'none',
    validValues: ['none', 'colorloop'],
    optional: true
  }),

  transitiontime: new UInt16Type({
    name: 'transitiontime',
    defaultValue: 4,
    optional: true
  }),

  bri_inc: new Int8Type({
    name: 'bri_inc',
    min: -254,
    max: 254,
    optional: true
  }),

  sat_inc: new Int8Type({
    name: 'sat_inc',
    min: -254,
    max: 254,
    optional: true
  }),

  hue_inc: new Int16Type({
    name: 'hue_inc',
    min: -65534,
    max: 65534,
    optional: true
  }),

  ct_inc: new Int16Type({
    name: 'ct_inc',
    min: -65534,
    max: 65534,
    optional: true
  }),

  xy_inc: new ListType({
    name: 'xy_inc',
    minEntries: 2,
    maxEntries: 2,
    entryType: new FloatType({
      name: 'xyValue',
      min: -0.5,
      max: 0.5,
      optional: false,
    }),
    optional: true
  }),

  scene: new StringType({
    name: 'scene',
    optional: true
  }),

  // RGB
  // This is a custom state, and can only be applied we we know the light details, so is stored like a normal state
  rgb: new ListType({
    name: 'rgb',
    minEntries: 3,
    maxEntries: 3,
    entryType: new UInt8Type({
      name: 'rgbValue'
    })
  })
};


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//
// Types that are not part of the Hue Bridge, but provide useful helpers
//
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//
// // Brightness Percentage
// brightness: parameterTypes.int8({
//   name: 'brightness',
//   min: 0,
//   max: 100
// }),
//
// // Saturation Percentage
// saturation: parameterTypes.int8({
//   name: 'saturation',
//   min: 0,
//   max: 100
// }),


// // RGB
// // This is a custom state, and can only be applied we we know the light details, so is stored like a normal state
//   export const rgb = new ListType({
//     name: 'rgb',
//     minEntries: 3,
//     maxEntries: 3,
//     entryType: new UInt8Type({
//       name: 'rgbValue'
//     }),
//   });

//TODO HSB, HSL, although these are conversions to the normal attributes which are done in code currently