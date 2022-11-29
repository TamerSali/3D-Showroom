import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

const loader = new GLTFLoader();

const models = [
	{
		name: "Nissan 350z",
		asset_url: "./assets/n_350z.glb",
		scale: [1.5, 1.5, 1.5],
	},
	{
		name: "Skyline R34",
		asset_url: "./assets/s_r34.glb",
		scale: [1.2, 1.3, 1.2],
	},
    {
		name: "BMW M3",
		asset_url: "./assets/b_m3.glb",
		scale: [1.25, 1.25, 1.25],
	},
];
const toggleSceneObjects = (scene, name) => {
	scene.children.forEach((object) => {
		if (object?.name) {
			object.name != name ? (object.visible = false) : (object.visible = true);
		}
	});
};
export const render3dModel = (index, scene) => {
	if (models[index] === undefined) return;
	const { name, asset_url, scale } = models[index];
	const alreadyAdded = scene.children.find((element) => element?.name === name);
	if (alreadyAdded) {
		alreadyAdded.visible = true;
		toggleSceneObjects(scene, alreadyAdded.name);
		return;
	}

	loader.load(asset_url, function (gltf) {
		const model = gltf.scene;
		model.scale.set(...scale);
		model.name = name;
		model.castShadow = true;
		model.receiveShadow = true;
		console.log(model)
		scene.add(model);
		toggleSceneObjects(scene, model.name);
	});
};
