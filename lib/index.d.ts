import { OpaqueToken } from '@angular/core';
export declare const ENHANCED_COMPONENT_INITIALIZER: OpaqueToken;
export declare function EnhancedComponent<T>(config: T): (targetConstructor: any) => any;
