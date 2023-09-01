import React, { useEffect } from "react";
import * as THREE from "three";

const Globe = () => {
  useEffect(() => {
    let targetRotationX = 0;
    let targetRotationY = 0;
    let isMouseDown = false;
    const windowHalfX = 150;
    const windowHalfY = 150;
    const slowingFactor = 0.98;
    const dragFactor = 0.002; // Adjust this value for rotation speed

    const container = document.getElementById("globe-container");
    const scene = new THREE.Scene();
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(300, 300);
    renderer.setClearColor(0x000000, 0); // Clear color with alpha 0
    container.innerHTML = "";
    container.appendChild(renderer.domElement);

    // Create earthGeometry
    const earthGeometry = new THREE.SphereGeometry(0.5, 32, 32);
    const earthMaterial = new THREE.MeshPhongMaterial({
      map: new THREE.TextureLoader().load("/earthmap.jpeg"),
      bumpMap: new THREE.TextureLoader().load("/earthbump.jpeg"),
      bumpScale: 0.01,
      transparent: true, // Enable transparency
    });
    const earthMesh = new THREE.Mesh(earthGeometry, earthMaterial);
    scene.add(earthMesh);

    // Add a marker icon
    const markerTexture = new THREE.TextureLoader().load("/arr.jpg");
    const markerMaterial = new THREE.SpriteMaterial({ map: markerTexture });
    const markerSprite = new THREE.Sprite(markerMaterial);

    const markerLat = 20.5937;
    const markerLon = 78.9629;
    const markerPhi = (90 - markerLat) * (Math.PI / 180);
    const markerTheta = (markerLon + 180) * (Math.PI / 180);

    const earthRadius = 0.5; // Radius of the Earth sphere

    // Calculate the position of the marker on the Earth's surface
    markerSprite.position.set(
      earthRadius * Math.sin(markerPhi) * Math.cos(markerTheta),
      earthRadius * Math.cos(markerPhi),
      earthRadius * Math.sin(markerPhi) * Math.sin(markerTheta)
    );

    const markerSize = 0.1; // Adjust the size of the marker
    markerSprite.scale.set(markerSize, markerSize, 1);

    scene.add(markerSprite);

    // Set up lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const pointerLight = new THREE.PointLight(0xffffff, 0.9);
    pointerLight.position.set(5, 3, 5);
    scene.add(pointerLight);

    // Other parts of your scene setup...

    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);
    camera.position.z = 1.7;

    const updateRotation = (event) => {
      if (isMouseDown) {
        const rect = container.getBoundingClientRect();
        const mouseX = event.clientX - rect.left;
        const mouseY = event.clientY - rect.top;

        targetRotationX = (mouseX - windowHalfX) * dragFactor;
        targetRotationY = (mouseY - windowHalfY) * dragFactor;
      }
    };

    const render = () => {
      earthMesh.rotation.y += targetRotationX;
      earthMesh.rotation.x += targetRotationY;
      targetRotationY *= slowingFactor;
      targetRotationX *= slowingFactor;
      renderer.render(scene, camera);
    };

    const animate = () => {
      requestAnimationFrame(animate);
      render();
    };
    animate();

    container.addEventListener("mousedown", (event) => {
      isMouseDown = true;
    });

    document.addEventListener("mousemove", updateRotation);

    document.addEventListener("mouseup", () => {
      isMouseDown = false;
    });
  }, []);

  return <div id="globe-container"></div>;
};

export default Globe;
