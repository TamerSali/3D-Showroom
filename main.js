import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { lights } from "./src/lights";
import { render3dModel, models } from "./src/models";
import * as dat from "dat.gui";

const showroom = {
	sizes: {
		width: window.innerWidth,
		height: window.innerHeight,
	},
	cursor: {
		x: 0,
		y: 0,
	},
};

let {
	sizes: { width, height },
	cursor: { x, y },
} = showroom;

let currentModelIndex = 0;
const canvas = document.querySelector("#showroom");
const modelNavigators = document.querySelectorAll("[data-navigate]");
const scene = new THREE.Scene();
const backgroundTexture = new THREE.TextureLoader().load("./assets/street.jpeg");
const platform = new THREE.TextureLoader().load("./assets/platform.jpg");
backgroundTexture.minFilter = THREE.NearestFilter;
platform.minFilter = THREE.NearestFilter;

const geometry = new THREE.CircleGeometry(4.5, 100);
const material = new THREE.MeshBasicMaterial({
	color: 0xffffff,
	side: THREE.DoubleSide,
	map: platform
});
const circle = new THREE.Mesh(geometry, material);
const camera = new THREE.PerspectiveCamera(60, width / height);
const controls = new OrbitControls(camera, canvas);

const renderer = new THREE.WebGLRenderer({
	canvas: canvas,
});

const updateRenderer = () => {
	renderer.setSize(width, height);
	renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
};

const updateCameraSize = () => {
	// Update sizes.
	width = window.innerWidth;
	height = window.innerHeight;
	camera.aspect = width / height;
	camera.updateProjectionMatrix();

	updateRenderer();
};

const tick = () => {
	controls.update();
	renderer.render(scene, camera);
	window.requestAnimationFrame(tick);
};

camera.position.set(0, 1.5, 6.5);
scene.position.set(0, -1.6, 0);
scene.background = backgroundTexture;
circle.rotation.x = Math.PI / 2;
circle.receiveShadow = true;
circle.castShadow = true;

scene.add(circle);
scene.add(camera);

lights.forEach((light) => scene.add(light));

controls.minPolarAngle = 1.25;
controls.maxPolarAngle = 1.25;
// controls.enableZoom = false;
controls.autoRotate = true;

updateRenderer();

// Events
window.addEventListener("resize", updateCameraSize);
modelNavigators.forEach((navigator) => {
	navigator.addEventListener("click", () => {
		currentModelIndex += +navigator.dataset.navigate;
		if (models[currentModelIndex] === undefined) {
			currentModelIndex -= +navigator.dataset.navigate;
			return;
		}
		render3dModel(currentModelIndex, scene);
	});
});
render3dModel(currentModelIndex, scene);
tick();
