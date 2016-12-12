import { FactoryProvider } from '@angular/core';
import { ENHANCED_COMPONENT_INITIALIZER } from 'ng2-enhanced-component-decorator';

import { LayoutManagerService } from './layout-manager.service';
import { EnhancedComponentConfig } from './layout-type.enum';
import { enhancedComponentInitializerFactory } from './enhanced-component-initializer.factory';

export const enhancedComponentInitializer: FactoryProvider = {
  provide: ENHANCED_COMPONENT_INITIALIZER,
  deps: [LayoutManagerService],
  useFactory: enhancedComponentInitializerFactory,
};
