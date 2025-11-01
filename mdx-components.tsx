import { useMDXComponents as getThemeComponents } from 'nextra-theme-docs';
import { Callout, FileTree } from 'nextra/components';
import { ImageWithCaption } from './components/ImageWithCaption';
import { DefinitionTooltip } from './components/DefinitionTooltip';

// Get the default MDX components
const themeComponents = getThemeComponents();

// Merge components
export function useMDXComponents() {
  return {
    ...themeComponents,
    Callout: Callout,
    FileTree: FileTree,
    ImageWithCaption: ImageWithCaption,
    DefinitionTooltip: DefinitionTooltip,
  };
}
