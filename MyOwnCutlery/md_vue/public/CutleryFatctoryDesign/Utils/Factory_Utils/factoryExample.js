var scene1, camera, renderer1;

function init() {
    scene1 = new THREE.Scene();
    // scene1.background = new THREE.Color(0xdddddd);
    camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 5000);
    camera.rotation.y = 45 / 180 * Math.PI;
    camera.position.x = 800;
    camera.position.y = 100;
    camera.position.z = 1000;
    hlight = new THREE.AmbientLight(0x404040, 100);
    scene1.add(hlight);

    directionalLight = new THREE.DirectionalLight(0xffffff, 100);
    directionalLight.position.set(0, 1, 0);
    directionalLight.castShadow = true;
    scene1.add(directionalLight);
    light = new THREE.PointLight(0xc4c4c4, 10);
    light.position.set(0, 300, 500);
    scene1.add(light);
    light2 = new THREE.PointLight(0xc4c4c4, 10);
    light2.position.set(500, 100, 0);
    scene1.add(light2);
    light3 = new THREE.PointLight(0xc4c4c4, 10);
    light3.position.set(0, 100, -500);
    scene1.add(light3);
    light4 = new THREE.PointLight(0xc4c4c4, 10);
    light4.position.set(-500, 300, 500);
    scene1.add(light4);

    renderer1 = new THREE.WebGLRenderer({ antialias: true });
    renderer1.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer1.domElement);

    controls = new THREE.OrbitControls(camera, renderer1.domElement);

    /**  let loader = new THREE.GLTFLoader();
     loader.load('/Utils/Factory_3D_Model/scene.gltf', function(gltf) {
         factory = gltf.scene.children[0];
         factory.scale.set(0.5, 0.5, 0.5);
         scene1.add(gltf.scene);
         animate();
     });
 **/
    var loader = new THREE.GLTFLoader();
    loader.load('/Utils/Factory_3D_Model/scene.gltf', function(gltf) {
        scene1.add(gltf.scene);
        animate();
    }, undefined, function(error) {
        console.error(error);
    });


}

function animate() {
    renderer1.render(scene1, camera);
    requestAnimationFrame(animate);
}
init();