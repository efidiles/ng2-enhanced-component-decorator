"use strict";
var core_1 = require("@angular/core");
exports.ENHANCED_COMPONENT_INITIALIZER = new core_1.OpaqueToken('Enhanced component initializer');
function EnhacedComponent(config) {
    var reflect = window['Reflect'];
    var getOwnMetadata = reflect.getOwnMetadata;
    var defineMetadata = reflect.defineMetadata;
    return function EnhacedComponentDecorator(targetConstructor) {
        var metaInformation = getOwnMetadata('annotations', targetConstructor);
        var designParamtypesInformation = getOwnMetadata('design:paramtypes', targetConstructor);
        var parametersInformation = getOwnMetadata('parameters', targetConstructor);
        function newConstructor(enhacedComponentInitializer) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            enhacedComponentInitializer(config);
            return targetConstructor.apply(this, args);
        }
        defineMetadata('annotations', metaInformation, newConstructor);
        defineMetadata('parameters', parametersInformation, newConstructor);
        defineMetadata('design:paramtypes', [
            new core_1.Inject(exports.ENHANCED_COMPONENT_INITIALIZER)
        ].concat(designParamtypesInformation), newConstructor);
        newConstructor.prototype = targetConstructor.prototype;
        return newConstructor;
    };
}
exports.EnhacedComponent = EnhacedComponent;
//# sourceMappingURL=index.js.map