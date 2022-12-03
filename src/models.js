import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

const loader = new GLTFLoader();

const models = [
	{
		name: "Nissan 350z",
		asset_url: "./assets/n_350z.glb",
		scale: [1.6, 1.6, 1.6],
		position: [0, 0.25, 0],
	},
	{
		name: "Skyline R34",
		asset_url: "./assets/s_r34.glb",
		scale: [1.4, 1.45, 1.6],
		position: [0, 0.5, 0],
	},
	{
		name: "BMW M3",
		asset_url: "./assets/b_m3.glb",
		scale: [1.5, 1.5, 1.6],
		position: [0, 0.25, -0.1],
	},
];
const toggleSceneObjects = (scene, name) => {
	scene.children.forEach((object) => {
		if (object?.name) {
			object.name != name ? (object.visible = false) : (object.visible = true);
		}
	});
};
const render3dModel = (index, scene) => {
	if (models[index] === undefined) return;
	const { name, asset_url, scale, position } = models[index];
	const alreadyAdded = scene.children.find((element) => element?.name === name);
	if (alreadyAdded) {
		alreadyAdded.visible = true;
		toggleSceneObjects(scene, alreadyAdded.name);
		return;
	}

	loader.load(asset_url, function (gltf) {
		const model = gltf.scene.children[0];
		model.scale.set(...scale);
		model.position.set(...position);
		model.name = name;
		model.castShadow = true;
		scene.add(model);
		toggleSceneObjects(scene, model.name);
	});
};

export { models, render3dModel };
