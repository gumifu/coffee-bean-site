// Three.js Scene for Coffee Bean 3D Model
import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js';
import { GLTFLoader } from 'https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/loaders/GLTFLoader.js';

let scene, camera, renderer, coffeeBean, coffeeCup;
let animationId;

// Initialize Three.js scene
function initThreeJS() {
  // Scene setup
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0xf5e6d3);

  // Camera setup
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.z = 5;

  // Renderer setup
  const container = document.getElementById('canvas-container');
  if (!container) return;

  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  container.appendChild(renderer.domElement);

  // Lighting
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
  directionalLight.position.set(5, 5, 5);
  scene.add(directionalLight);

  const pointLight = new THREE.PointLight(0xffaa44, 0.5);
  pointLight.position.set(-5, 3, 5);
  scene.add(pointLight);

  // Load GLB models
  loadModels();

  // Handle window resize
  window.addEventListener('resize', onWindowResize);

  // Start animation loop
  animate();
}

// Load GLB models
function loadModels() {
  const loader = new GLTFLoader();

  // Load coffee bean model
  loader.load(
    'assets/models/coffee_bean.glb',
    (gltf) => {
      coffeeBean = gltf.scene;
      coffeeBean.scale.set(1, 1, 1);
      coffeeBean.position.set(-2, 0, 0);
      scene.add(coffeeBean);
    },
    (progress) => {
      console.log('Coffee bean loading progress:', progress);
    },
    (error) => {
      console.error('Error loading coffee bean:', error);
      // Fallback: create a simple coffee bean if model fails to load
      createCoffeeBeanFallback();
    }
  );

  // Load coffee cup model
  loader.load(
    'assets/models/coffee_cup.glb',
    (gltf) => {
      coffeeCup = gltf.scene;
      coffeeCup.scale.set(1, 1, 1);
      coffeeCup.position.set(2, 0, 0);
      scene.add(coffeeCup);
    },
    (progress) => {
      console.log('Coffee cup loading progress:', progress);
    },
    (error) => {
      console.error('Error loading coffee cup:', error);
      // Fallback: create a simple coffee cup if model fails to load
      createCoffeeCupFallback();
    }
  );
}

// Fallback: Create a simple coffee bean shape
function createCoffeeBeanFallback() {
  const geometry = new THREE.SphereGeometry(1, 16, 12);
  geometry.scale(1.5, 0.8, 1);

  const material = new THREE.MeshStandardMaterial({
    color: 0x6f4e37,
    roughness: 0.7,
    metalness: 0.1,
  });

  coffeeBean = new THREE.Mesh(geometry, material);
  coffeeBean.position.set(-2, 0, 0);

  const creaseGeometry = new THREE.TorusGeometry(0.95, 0.02, 8, 16);
  const creaseMaterial = new THREE.MeshStandardMaterial({
    color: 0x4a2c1a,
  });
  const crease = new THREE.Mesh(creaseGeometry, creaseMaterial);
  crease.rotation.x = Math.PI / 2;
  coffeeBean.add(crease);

  scene.add(coffeeBean);
}

// Fallback: Create a simple coffee cup shape
function createCoffeeCupFallback() {
  const cupGroup = new THREE.Group();

  // Cup body (cylinder)
  const cupGeometry = new THREE.CylinderGeometry(0.8, 0.6, 1.2, 32);
  const cupMaterial = new THREE.MeshStandardMaterial({
    color: 0x8b4513,
    roughness: 0.5,
    metalness: 0.2,
  });
  const cup = new THREE.Mesh(cupGeometry, cupMaterial);
  cupGroup.add(cup);

  // Handle
  const handleGeometry = new THREE.TorusGeometry(0.3, 0.05, 16, 32);
  const handleMaterial = new THREE.MeshStandardMaterial({
    color: 0x8b4513,
  });
  const handle = new THREE.Mesh(handleGeometry, handleMaterial);
  handle.position.set(0.8, 0, 0);
  handle.rotation.z = Math.PI / 2;
  cupGroup.add(handle);

  coffeeCup = cupGroup;
  coffeeCup.position.set(2, 0, 0);
  scene.add(coffeeCup);
}

// Animation loop
function animate() {
  animationId = requestAnimationFrame(animate);

  if (coffeeBean) {
    // Slow idle rotation
    coffeeBean.rotation.y += 0.005;
    coffeeBean.rotation.x = Math.sin(Date.now() * 0.001) * 0.1;
  }

  if (coffeeCup) {
    // Slow idle rotation
    coffeeCup.rotation.y += 0.003;
  }

  renderer.render(scene, camera);
}

// Handle window resize
function onWindowResize() {
  const container = document.getElementById('canvas-container');
  if (!container || !camera || !renderer) return;

  camera.aspect = container.clientWidth / container.clientHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(container.clientWidth, container.clientHeight);
}

// Cleanup function
function cleanup() {
  if (animationId) {
    cancelAnimationFrame(animationId);
  }

  window.removeEventListener('resize', onWindowResize);

  if (renderer) {
    const container = document.getElementById('canvas-container');
    if (container && renderer.domElement) {
      container.removeChild(renderer.domElement);
    }
    renderer.dispose();
  }

  if (coffeeBean) {
    coffeeBean.traverse((child) => {
      if (child.geometry) child.geometry.dispose();
      if (child.material) {
        if (Array.isArray(child.material)) {
          child.material.forEach(mat => mat.dispose());
        } else {
          child.material.dispose();
        }
      }
    });
  }

  if (coffeeCup) {
    coffeeCup.traverse((child) => {
      if (child.geometry) child.geometry.dispose();
      if (child.material) {
        if (Array.isArray(child.material)) {
          child.material.forEach(mat => mat.dispose());
        } else {
          child.material.dispose();
        }
      }
    });
  }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initThreeJS);
} else {
  initThreeJS();
}

// Cleanup on page unload
window.addEventListener('beforeunload', cleanup);
