import React, { useEffect } from "react";
import * as THREE from "three";

const Globe = () => {
  useEffect(() => {
    let targetRotationX = 0.05;
    let targetRotationY = 0.02;
    let mouseX = 0,
      mouseXOnMouseDown = 0,
      mouseY = 0,
      mouseYOnMouseDown = 0;
    const windowHalfX = 150;
    const windowHalfY = 150;
    const slowingFactor = 0.98;
    const dragFactor = 0.0002;

    const onDocumentMouseDown = (event) => {
      event.preventDefault();
      document.addEventListener("mousemove", onDocumentMouseMove, false);
      document.addEventListener("mouseup", onDocumentMouseUp, false);
      mouseXOnMouseDown = event.clientX - windowHalfX;
      mouseYOnMouseDown = event.clientY - windowHalfY;
    };

    const onDocumentMouseMove = (event) => {
      mouseX = event.clientX - windowHalfX;
      targetRotationX = (mouseX - mouseXOnMouseDown) * dragFactor;
      mouseY = event.clientY - windowHalfY;
      targetRotationY = (mouseY - mouseYOnMouseDown) * dragFactor;
    };

    const onDocumentMouseUp = () => {
      document.removeEventListener("mousemove", onDocumentMouseMove, false);
      document.removeEventListener("mouseup", onDocumentMouseUp, false);
    };

    const scene = new THREE.Scene();
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(300, 300);
    renderer.setClearColor(0x000000, 0); // Clear color with alpha 0

    const container = document.getElementById("globe-container");
    container.innerHTML = "";
    container.appendChild(renderer.domElement);

    // Create earthGeometry
    const earthGeometry = new THREE.SphereGeometry(0.5, 64, 64);
    const earthMaterial = new THREE.MeshPhongMaterial({
      map: new THREE.TextureLoader().load("/earthmap.jpeg"),
      bumpMap: new THREE.TextureLoader().load("/earthbump.jpeg"),
      bumpScale: 0.03,
      transparent: true, // Enable transparency
    });
    const earthMesh = new THREE.Mesh(earthGeometry, earthMaterial);
    scene.add(earthMesh);

    // Add a marker icon
    const markerGeometry = new THREE.BufferGeometry();
    const markerVertices = new Float32Array([0, 0, 0]);
    markerGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(markerVertices, 3)
    );
    const markerMaterial = new THREE.PointsMaterial({
      color: 0xff0000,
      size: 0.005,
    });
    const markerMesh = new THREE.Points(markerGeometry, markerMaterial);

    const indiaLatitude = 20.5937;
    const indiaLongitude = 78.9629;
    const indiaPhi = (90 - indiaLatitude) * (Math.PI / 180);
    const indiaTheta = (indiaLongitude + 180) * (Math.PI / 180);

    const earthRadius = 0.5;
    markerMesh.position.set(
      earthRadius * Math.sin(indiaPhi) * Math.cos(indiaTheta),
      earthRadius * Math.cos(indiaPhi),
      earthRadius * Math.sin(indiaPhi) * Math.sin(indiaTheta)
    );
    markerMesh.scale.set(0.05, 0.05, 0.05); // Adjust the scale as needed
    scene.add(markerMesh);

    // Set up lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const pointerLight = new THREE.PointLight(0xffffff, 0.9);
    pointerLight.position.set(5, 3, 5);
    scene.add(pointerLight);

    // Other parts of your scene setup...

    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);
    camera.position.z = 2.5; // Adjust this value as needed
    camera.lookAt(earthMesh.position); // Look at the center of the Earth

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

    document.addEventListener("mousedown", onDocumentMouseDown, false);
  }, []);

  return <div id="globe-container"></div>;
};

export default Globe;
