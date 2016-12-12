## Jump to

* [Overview](#overview)
* [Installation](#installation)

## Overview 
[[jump to TOC](#jump-to)]

A decorator for angular2 components to allow passing arbitrary data to 
a custom defined proxy service.

Examples of real world use cases:
- define a specific layout arrangement when multiple router outlets are used
- set the active main menu item when the same item is shared by multiple routes


## Installation
[[jump to TOC](#jump-to)]

1. Install the package:  
```sh
$ npm install ng2-enhanced-component-decorator --save
```

then in a top router component (feature component) do:

**app.component.ts**

```js
import { EnhancedComponent } from 'ng2-enhanced-component-decorator';

// this is the important bit
@EnhancedComponent<any>({
  layout: 'someLayout',
  mainMenuItem: 'someItem',
  someOtherData: 'someOtherValue',
})
// this is the normal Component decorator
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    ...
``` 
This decorator will invoke the service created by the 
`ENHANCED_COMPONENT_INITIALIZER` provider (defined in the 
`ng2-enhanced-component-decorator` package).

This provider needs to be defined and it will receive the config 
object passed to the decorator:

Eg: 

**app.module.ts**

```js
import { ENHANCED_COMPONENT_INITIALIZER } from 'ng2-enhanced-component-decorator';

const enhancedComponentInitializer: FactoryProvider = {
  provide: ENHANCED_COMPONENT_INITIALIZER,
  deps: [LayoutManagerService],
  useFactory: (layoutManagerService: LayoutManagerService) => {
    return (enhancedComponentMetadata: any) => {
      // enhancedComponentMetadata is the object passed to the decorator
      layoutManagerService.setLayout(enhancedComponentMetadata.layout)
    };
  },
};

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    ...
  ],
  providers: [
    enhancedComponentInitializer,
    ...
  ],
```
From this point onwards we can use this factory service as a proxy to invoke 
other specialised services (such as a LayoutManagerService, a MainMenuService etc).

For a full working example check the `./example` folder.  
The example show how to statically type the decorator.

## Author 
[[jump to TOC](#jump-to)]

**Eduard Fidiles**

* [github/efidiles](https://github.com/efidiles)  
* [twitter/efidiles](http://twitter.com/efidiles)  

## License 
[[jump to TOC](#jump-to)]  
[https://www.npmjs.com/package/ng2-enhanced-component-decorator](https://www.npmjs.com/package/ng2-enhanced-component-decorator)  
[https://github.com/efidiles/ng2-enhanced-component-decorator.git](https://github.com/efidiles/ng2-enhanced-component-decorator.git)  
Copyright © 2016, [Eduard Fidiles](https://github.com/efidiles).  
Released under the [MIT license](https://github.com/ng2-enhanced-component-decorator/ng2-enhanced-component-decorator/blob/master/LICENSE).
