import type IResponsiveValue from '../../types/IResponsiveValue';
import type ICssValue from '../../types/ICssValue';

function responsify<T extends string | number>(
  property: string,
  value?: IResponsiveValue<T>,
  modifyVal?: (property: T) => string | number,
): Array<[string, ICssValue | Record<string, ICssValue>]> {
  const finalStyle: Array<[string, ICssValue | Record<string, ICssValue>]> = [];
  if (typeof value === 'string' || typeof value === 'number') {
    finalStyle.push([property, modifyVal?.(value) ?? value]);
  } else if (value) {
    if (value.sm) {
      finalStyle.push([
        '@media (min-width: 640px)',
        {
          [property]: modifyVal?.(value.sm) ?? value.sm,
        },
      ]);
    }
    if (value.md) {
      finalStyle.push([
        '@media (min-width: 768px)',
        {
          [property]: modifyVal?.(value.md) ?? value.md,
        },
      ]);
    }
    if (value.lg) {
      finalStyle.push([
        '@media (min-width: 1024px)',
        {
          [property]: modifyVal?.(value.lg) ?? value.lg,
        },
      ]);
    }
    if (value.base) {
      finalStyle.push([property, modifyVal?.(value.base) ?? value.base]);
    }
  }
  return finalStyle;
}
export default responsify;
