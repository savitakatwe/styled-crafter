import { type IPropertyMap, type IStylingProps } from './core.types';
import type ICssValue from '../../types/ICssValue';
import type IPropertyKey from '../../types/IPropertyKey';
import type IPropertyConfig from '../../types/IPropertyConfig';
import { responsify } from '../responsify';

const transformValue = (
  propertyConfig: IPropertyConfig,
  value: ICssValue,
): ICssValue => {
  if (typeof value === 'number' && !propertyConfig.isNumber) {
    return value + 'px';
  }
  return value;
};

const getValueFromTheme = <T>(
  propertyConfig: IPropertyConfig,
  stylingProps: IStylingProps<T>,
  value: ICssValue,
): ICssValue => {
  const themeObj = stylingProps.theme;
  if (themeObj && propertyConfig.scale) {
    return themeObj[propertyConfig.scale]?.[value] ?? value;
  }
  return value;
};

const core =
  <T>(propertyConfigs: IPropertyMap<T>) =>
  (stylingProps: IStylingProps<T>) => {
    const propKeys = Object.keys(stylingProps) as Array<IPropertyKey<T>>;
    let cssValuesList: Array<[string, ICssValue | Record<string, ICssValue>]> =
      [];
    propKeys
      .filter((value) => value !== 'theme')
      .forEach((value) => {
        const propertyValue = stylingProps[value];
        const propertyConfig = propertyConfigs[value];

        const processPropertyToValue = (property: string): void => {
          const responsiveVal = responsify(
            property,
            stylingProps[value],
            (property) => {
              const themePropertyValue = getValueFromTheme(
                propertyConfig,
                stylingProps,
                property,
              );
              return transformValue(propertyConfig, themePropertyValue);
            },
          );
          cssValuesList = [...cssValuesList, ...responsiveVal];
        };

        if (propertyValue && propertyConfig) {
          if (propertyConfig?.property !== undefined) {
            processPropertyToValue(propertyConfig.property);
          }

          if (propertyConfig.properties) {
            propertyConfig.properties.forEach((property) => {
              processPropertyToValue(property);
            });
          }
        }
      });

    const cssValues: Record<string, ICssValue | Record<string, ICssValue>> = {};

    cssValuesList.forEach((value) => {
      if (typeof value[1] === 'string' || typeof value[1] === 'number') {
        cssValues[value[0]] = value[1];
      } else {
        const responsiveCssValue = cssValues[value[0]] as Record<
          string,
          ICssValue
        >;
        cssValues[value[0]] = {
          ...responsiveCssValue,
          ...value[1],
        };
      }
    });

    return cssValues;
  };
export default core;
