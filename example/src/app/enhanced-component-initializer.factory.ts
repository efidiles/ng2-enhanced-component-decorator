import { LayoutManagerService } from './layout-manager.service';
import { EnhancedComponentConfig } from './layout-type.enum';

export function enhancedComponentInitializerFactory(layoutManagerService: LayoutManagerService) {
  return (enhancedComponentMetadata: EnhancedComponentConfig) => {
    layoutManagerService.setLayout(enhancedComponentMetadata.layout);
  };
}
