import { core } from '../../index';

describe('should test core', () => {
  const instance = core({
    mt: { property: 'margin-top' },
    mb: { property: 'margin-bottom' },
    ml: { property: 'margin-left' },
    mx: { properties: ['margin-left', 'margin-right'] },
  });

  it('should check basic', () => {
    expect(instance({ mt: '10px', mb: '50%', ml: 10 })).toEqual({
      'margin-top': '10px',
      'margin-bottom': '50%',
      'margin-left': '10px',
    });
  });

  it('should check if undefined passed', () => {
    expect(instance({ mt: undefined })).toStrictEqual({});
  });

  it('should check if percentage passed', () => {
    expect(instance({ mt: '50%' })).toStrictEqual({
      'margin-top': '50%',
    });
  });

  it('should check if extra params passed', () => {
    // Ignore is required to test extra prop passed
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    expect(instance({ mt: '50%', pt: '10px' })).toStrictEqual({
      'margin-top': '50%',
    });
  });

  const instanceWithTheme = core({
    mt: { property: 'margin-top', scale: 'spacing' },
    mb: { property: 'margin-bottom', scale: 'spacing' },
    ml: { property: 'margin-left', scale: 'spacing' },
  });
  it('should check if theme value working', () => {
    expect(
      instanceWithTheme({
        mt: 'sp1',
        mb: '10px',
        ml: 'sp2',
        theme: {
          spacing: {
            sp1: '10px',
            sp2: 14,
          },
        },
      }),
    ).toStrictEqual({
      'margin-top': '10px',
      'margin-bottom': '10px',
      'margin-left': '14px',
    });
  });

  it('should check responsive with theme', () => {
    expect(
      instanceWithTheme({
        mb: '50%',
        mt: {
          base: '20px',
          sm: '30px',
          md: '40px',
        },
        ml: {
          base: 'sp2',
          sm: 'sp1',
        },
        theme: {
          spacing: {
            sp1: '10px',
            sp2: 14,
          },
        },
      }),
    ).toEqual({
      'margin-bottom': '50%',
      '@media only screen and (max-width: 600px)': {
        'margin-top': '30px',
        'margin-left': '10px',
      },
      '@media only screen and (min-width: 600px) and (max-width: 992px)': {
        'margin-top': '40px',
      },
      'margin-top': '20px',
      'margin-left': '14px',
    });
  });

  it('should check if properties config', () => {
    expect(instance({ mx: '50px' })).toStrictEqual({
      'margin-left': '50px',
      'margin-right': '50px',
    });
  });
});
