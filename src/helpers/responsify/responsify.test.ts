import { responsify } from './index';

const bgColors = {
  red: '#ef0505',
  green: '#32d205',
  blue: '#161e80',
};

describe('should test responsify', () => {
  it('should return result', () => {
    expect(responsify('width', '100px')).toEqual([['width', '100px']]);
  });

  it('should accept property as number', () => {
    expect(responsify('flex-grow', 1)).toEqual([['flex-grow', 1]]);
  });

  it('should accept property for all devices', () => {
    expect(
      responsify('flex-grow', {
        sm: 2,
        base: 1,
        md: 3,
        lg: 4,
      }),
    ).toEqual([
      [
        '@media (min-width: 640px)',
        {
          'flex-grow': 2,
        },
      ],
      [
        '@media (min-width: 768px)',
        {
          'flex-grow': 3,
        },
      ],
      [
        '@media (min-width: 1024px)',
        {
          'flex-grow': 4,
        },
      ],
      ['flex-grow', 1],
    ]);
  });

  it('should return empty response', () => {
    expect(responsify('flex-grow')).toEqual([]);
  });

  it('should test responsive modify callback', () => {
    expect(
      responsify(
        'background-color',
        {
          base: 'red',
          sm: 'green',
          md: 'blue',
        },
        (property) => bgColors[property],
      ),
    ).toEqual([
      [
        '@media (min-width: 640px)',
        {
          'background-color': '#32d205',
        },
      ],
      [
        '@media (min-width: 768px)',
        {
          'background-color': '#161e80',
        },
      ],
      ['background-color', '#ef0505'],
    ]);
  });

  it('should test modify callback', () => {
    expect(
      responsify('background-color', 'red', (property) => bgColors[property]),
    ).toEqual([['background-color', '#ef0505']]);
  });
});
