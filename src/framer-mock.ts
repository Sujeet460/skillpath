/**
 * Mock file for the Framer library to enable local development and compilation
 * of Framer Code Components.
 */
export const ControlType = {
  String: "string",
  Number: "number",
  Boolean: "boolean",
  Enum: "enum",
  Color: "color",
} as const;

export function addPropertyControls(component: any, controls: any) {
  // No-op in local development environment.
  // Framer will intercept and use this configuration in the Framer canvas.
  (component as any).propertyControls = controls;
}
