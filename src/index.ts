import { OpaqueToken, Inject } from '@angular/core';

export const ENHANCED_COMPONENT_INITIALIZER = new OpaqueToken('Enhanced component initializer');

export function EnhancedComponent<T>(config: T) {
	type enhancedComponentInitializerType = (config: T) => void;

	const reflect: any = (window as any)['Reflect'];
	const getOwnMetadata: Function = reflect.getOwnMetadata;
	const defineMetadata: Function = reflect.defineMetadata;

	return function EnhancedComponentDecorator(targetConstructor: any) {
		const metaInformation = getOwnMetadata('annotations', targetConstructor);
		const designParamtypesInformation = getOwnMetadata('design:paramtypes', targetConstructor);
		const parametersInformation = getOwnMetadata('parameters', targetConstructor);

		function newConstructor(
			enhancedComponentInitializer: enhancedComponentInitializerType,
			...args: any[],
		) {
			enhancedComponentInitializer(config);

			// tslint:disable-next-line:no-invalid-this
			return targetConstructor.apply(this, args);
		}

		defineMetadata('annotations', metaInformation, newConstructor);
		defineMetadata('parameters', parametersInformation, newConstructor);
		defineMetadata(
			'design:paramtypes',
			[
				new Inject(ENHANCED_COMPONENT_INITIALIZER),
				...designParamtypesInformation,
			],
			newConstructor,
		);

		newConstructor.prototype = targetConstructor.prototype;

		return newConstructor as typeof targetConstructor;
	};
}
