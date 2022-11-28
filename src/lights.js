import { DirectionalLight, PointLight } from "three";

const directionalLight = new DirectionalLight("#FFF", 10);
const pointLightRight = new PointLight("#FFF", 5);
const pointLightLeft = new PointLight("#FFF", 5);
pointLightRight.position.set(3,5,-2)
pointLightLeft.position.set(-3,5,2)

export const lights = [directionalLight, pointLightRight, pointLightLeft];
