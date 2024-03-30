export interface IBreakpoint<T> {
  base?: T;
  sm?: T;
  md?: T;
  lg?: T;
}
type IResponsiveValue<T> = IBreakpoint<T> | T;

export default IResponsiveValue;
