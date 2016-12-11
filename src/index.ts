import { OpaqueToken, Inject } from '@angular/core';

export const ENHANCED_COMPONENT_INITIALIZER = new OpaqueToken('Enhanced component initializer');

export function EnhacedComponent<T>(config: T) {
	type enhacedComponentInitializerType = (config: T) => void;

	const reflect: any = (window as any)['Reflect'];
	const getOwnMetadata: Function = reflect.getOwnMetadata;
	const defineMetadata: Function = reflect.defineMetadata;

	return function EnhacedComponentDecorator(targetConstructor: any) {
		const metaInformation = getOwnMetadata('annotations', targetConstructor);
		const designParamtypesInformation = getOwnMetadata('design:paramtypes', targetConstructor);
		const parametersInformation = getOwnMetadata('parameters', targetConstructor);

		function newConstructor(
			enhacedComponentInitializer: enhacedComponentInitializerType,
			...args: any[],
		) {
			enhacedComponentInitializer(config);

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
