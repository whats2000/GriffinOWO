export declare namespace Vigilant {
  class VigilantClass {}
  class PropertyCollector {}
  class PropertyValue {}
  class CallablePropertyValue {}
  class PropertyAttributesExt {}
  class SortingBehavior {}
  class PropertyType {
    static readonly SLIDER: string;
    static readonly SELECTOR: string;
    static readonly DECIMAL_SLIDER: string;
    static readonly PERCENT_SLIDER: string;
    static readonly SWITCH: string;
    static readonly CHECKBOX: string;
    static readonly TEXT: string;
    static readonly PARAGRAPH: string;
    static readonly NUMBER: string;
    static readonly COLOR: string;
    static readonly BUTTON: string;
  }
  class PropertyData {
    constructor(
      attributes: PropertyAttributesExt,
      propertyValue: PropertyValue,
      instance: any,
    );
  }
}

declare namespace Kotlin {
  class Unit {
    static readonly INSTANCE: Unit;
  }
}

declare namespace Java {
  function type(className: string): any;
}

interface Config {
  [key: string]: any;
}

interface PropertyAttributesConfig {
  name: string;
  category: string;
  subcategory?: string;
  description?: string;
  min?: number;
  max?: number;
  minF?: number;
  maxF?: number;
  decimalPlaces?: number;
  increment?: number;
  options?: any[];
  allowAlpha?: boolean;
  placeholder?: string;
  protected?: boolean;
  triggerActionOnInitialization?: boolean;
  hidden?: boolean;
}

declare const configs: any[];

declare function JSBackedPropertyValue(
  config: Config,
  propName: string,
  isIntegerDesired: boolean,
  isFloatDesired: boolean,
): {
  getPropName(): string;
  getValue(): any;
  setValue(newValue: any): void;
};

declare function JSFunctionCallableValue(
  config: Config,
  funcName: string,
): {
  invoke(): void;
};

declare function DecoratorCollector(config: Config): {
  collectProperties(instance: any): Vigilant.PropertyData[];
};

export declare function createPropertyAttributesExt(
  propertyType: string,
  configObj: PropertyAttributesConfig,
): Vigilant.PropertyAttributesExt;

/**
 * Vigilant decorator to initialize class configuration properties and methods.
 * @param moduleName - The name of the module.
 * @param guiTitle - The title of the GUI (default is "Settings").
 * @param sortingBehaviorSettings - Sorting behavior settings for the configuration.
 */
export declare function Vigilant(
  moduleName: string,
  guiTitle?: string,
  sortingBehaviorSettings?: object,
): <T extends new (...args: any[]) => {}>(clazz: T) => T;

/**
 * SwitchProperty decorator to define a switch property in the configuration.
 * @param config - The property attributes configuration.
 */
export declare function SwitchProperty(
  config: PropertyAttributesConfig,
): (target: any, propertyKey: string) => void;

/**
 * CheckboxProperty decorator to define a checkbox property in the configuration.
 * @param config - The property attributes configuration.
 */
export declare function CheckboxProperty(
  config: PropertyAttributesConfig,
): (target: any, propertyKey: string) => void;

/**
 * TextProperty decorator to define a text property in the configuration.
 * @param config - The property attributes configuration.
 */
export declare function TextProperty(
  config: PropertyAttributesConfig,
): (target: any, propertyKey: string) => void;

/**
 * ParagraphProperty decorator to define a paragraph property in the configuration.
 * @param config - The property attributes configuration.
 */
export declare function ParagraphProperty(
  config: PropertyAttributesConfig,
): (target: any, propertyKey: string) => void;

/**
 * PercentSliderProperty decorator to define a percent slider property in the configuration.
 * @param config - The property attributes configuration.
 */
export declare function PercentSliderProperty(
  config: PropertyAttributesConfig,
): (target: any, propertyKey: string) => void;

/**
 * SliderProperty decorator to define a slider property in the configuration.
 * @param config - The property attributes configuration.
 */
export declare function SliderProperty(
  config: PropertyAttributesConfig,
): (target: any, propertyKey: string) => void;

/**
 * DecimalSliderProperty decorator to define a decimal slider property in the configuration.
 * @param config - The property attributes configuration.
 */
export declare function DecimalSliderProperty(
  config: PropertyAttributesConfig,
): (target: any, propertyKey: string) => void;

/**
 * NumberProperty decorator to define a number property in the configuration.
 * @param config - The property attributes configuration.
 */
export declare function NumberProperty(
  config: PropertyAttributesConfig,
): (target: any, propertyKey: string) => void;

/**
 * ColorProperty decorator to define a color property in the configuration.
 * @param config - The property attributes configuration.
 */
export declare function ColorProperty(
  config: PropertyAttributesConfig,
): (target: any, propertyKey: string) => void;

/**
 * SelectorProperty decorator to define a selector property in the configuration.
 * @param config - The property attributes configuration.
 */
export declare function SelectorProperty(
  config: PropertyAttributesConfig,
): (target: any, propertyKey: string) => void;

/**
 * ButtonProperty decorator to define a button property in the configuration.
 * @param config - The property attributes configuration.
 */
export declare function ButtonProperty(
  config: PropertyAttributesConfig,
): (target: any, propertyKey: string) => void;

/**
 * Register an event callback.
 * @param event - The name of the event.
 * @param callback - The callback function to be executed when the event occurs.
 */
declare function register(event: string, callback: () => void): void;

declare const Color: any;

/**
 * Ensure that the developer uses `this.initialize(this)` in the constructor.
 * Allows the use of `this.addDependency(property, dependent)` to define the relation of two settings.
 * Example:
 *
 * class Example {
 *     constructor() {
 *         this.initialize(this);
 *     }
 *
 *     someMethod() {
 *         this.addDependency('propertyName', 'dependentPropertyName');
 *     }
 *
 *     sync() {
 *         // Custom sync logic
 *     }
 * }
 */
interface VigilanceSettingsMenu {
  /**
   * Initialize the instance.
   * @param instance
   */
  initialize(instance: any): void;

  /**
   * Add a dependency between two properties.
   * @param property - The property name.
   * @param dependent - The dependent property name.
   */
  addDependency(property: string, dependent: string): void;

  /**
   * Sync the properties.
   */
  sync(): void;

  /**
   * Open the GUI.
   */
  openGUI(): void;
}
