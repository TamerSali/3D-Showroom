import { DirectionalLight, PointLight, HemisphereLight } from "three";

const directionalLight = new DirectionalLight(0xffeeb1, 10);
const pointLightRight = new PointLight(0xffeeb1, 2);
const pointLightLeft = new PointLight(0xffeeb1, 2);
const hemisphereLight = new HemisphereLight(0xffeeb1, 0x080820, 5);
directionalLight.position.set(0, 3, 0)
pointLightRight.position.set(0.5, 3, 2);
pointLightLeft.position.set(-0.5, 3, -2);

export const lights = [hemisphereLight, directionalLight, pointLightLeft, pointLightRight];
