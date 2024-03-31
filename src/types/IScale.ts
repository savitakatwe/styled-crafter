import type { DefaultCrafter } from 'styled-crafter';
import type IResponsiveValue from './IResponsiveValue';

export type IRadii = keyof DefaultCrafter['radii'];
export type IBorderThickness = keyof DefaultCrafter['borderThickness'];
export type IColor = keyof DefaultCrafter['colors'];
export type ISpacing = IResponsiveValue<keyof DefaultCrafter['spacing']>;
export type ISize = keyof DefaultCrafter['sizes'];
