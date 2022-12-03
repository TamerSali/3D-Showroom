import { DirectionalLight, HemisphereLight } from "three";

const directionalLight = new DirectionalLight(0xffffff, 15);
const hemisphereLight = new HemisphereLight(0xffeeb1, 0x080820, 5);
directionalLight.position.set(0, 3.5, 0)

export const lights = [hemisphereLight, directionalLight];
