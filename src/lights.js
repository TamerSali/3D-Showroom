import { DirectionalLight, HemisphereLight } from "three";

const directionalLight = new DirectionalLight(0xffffff, 15);
const hemisphereLight = new HemisphereLight(0xffeeb1, 0x080820, 5);

directionalLight.castShadow = true;
directionalLight.shadow.mapSize.set(1024, 1024)
directionalLight.shadow.normalBias = 0.05
directionalLight.shadow.camera.near = 1;
directionalLight.shadow.camera.far = 5;
directionalLight.position.set(0, 7, 0)

export const lights = [hemisphereLight, directionalLight];