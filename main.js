import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { lights } from "./src/lights";
import { render3dModel } from "./src/models";
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
const texture = new THREE.TextureLoader().load("./assets/garage.jpeg");
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

const updateCursor = (event) => {
	x = event.clientX / width - 0.5;
	y = -(event.clientY / height - 0.5);
};

const tick = () => {
	controls.update();
	renderer.render(scene, camera);
	window.requestAnimationFrame(tick);
};

camera.position.set(4, 1.5, 5);

scene.position.set(0, -1.6, 0);
scene.background = texture;
scene.add(camera);

lights.forEach((light) => scene.add(light));

controls.minPolarAngle = 1.35
controls.maxPolarAngle = 1.35
controls.autoRotate = true;

updateRenderer();

// Events
window.addEventListener("resize", updateCameraSize);
canvas.addEventListener("mousemove", updateCursor);
modelNavigators.forEach((navigator) => {
	navigator.addEventListener("click", () => {
		currentModelIndex += +navigator.dataset.navigate;
		render3dModel(currentModelIndex, scene);
	});
});
render3dModel(currentModelIndex, scene);
tick();