export interface ColorGamut {
  red: {x: number, y: number}
  green: {x: number, y: number}
  blue: {x: number, y: number}
}

export const COLOR_GAMUTS: {[key: string]: ColorGamut} = {
  'A': {
    red: {x: 0.704, y: 0.296},
    green: {x: 0.2151, y: 0.7106},
    blue: {x: 0.138, y: 0.08},
  },

  'B': {
    red: {x: 0.675, y: 0.322},
    green: {x: 0.409, y: 0.518},
    blue: {x: 0.167, y: 0.04},
  },

  'C': {
    red: {x: 0.6915, y: 0.3083},
    green: {x: 0.17, y: 0.7},
    blue: {x: 0.1532, y: 0.0475},
  },
};

export function getColorGamut(value: string): ColorGamut {
  return COLOR_GAMUTS[value];
}