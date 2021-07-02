//import * as THREE from "./Utils/jsTools/three.js";
import * as GLTFLoader from "./Utils/jsTools/GLTFLoader.js";
import * as OrbitControls from "./Utils/jsTools/OrbitControls.js";
//import * as dat from "./Utils/jsTools/dat.gui.min.js";
import { criarFacas } from "./faca.js";
import {  criarGarfos } from "./garfo.js";

var scene, camera, renderer, controls, loader, raycaster, mouse;
var cameraDetails = { height: 3.5, speed: 0.2, turnSpeed: Math.PI * 0.2 };
var productionLines;

const maxProductionLine = 2;
const maxProductionLineMachines = 6;

var numberOfProductionLines = 0;
var prodLinePositionX = 46;
var prodLinePositionZ = -50;
var productionOn = false;

var products = [];
var objects = [];

export function init(lines) {

    productionLines = lines;

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 10000);
    renderer = new THREE.WebGLRenderer({
        antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0xa9a9a9);
    raycaster = new THREE.Raycaster(); // Needed for object intersection
    mouse = new THREE.Vector2(); //Needed for mouse coordinates

    loader = new THREE.GLTFLoader();

    camera.position.set(0, cameraDetails.height, -60);
    camera.lookAt(new THREE.Vector3(0, cameraDetails.height, 0));

    controls = new THREE.OrbitControls(camera, renderer.domElement);

    renderer.setSize(window.innerWidth * 0.95, window.innerHeight * 0.90);
    //renderer.setClearColor(0x4d4b4b);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;

    //const container = document.getElementById('canvas');
    //container.appendChild(renderer.domElement);

    showFloor();
    //showWalls(scene);
    skyBox();
    lights();


    window.addEventListener('mousemove', onDocumentMouseMove, false);

    menu();
    animate();
    console.log(scene);
}

function animate() {
    /*updateCamera();
  //  production();
    controls.update();
    requestAnimationFrame(animate);
    renderer.render(scene, camera);*/
    updateCamera();
    controls.update();
            renderer.render(scene, camera);
            requestAnimationFrame(animate);
}

function onDocumentMouseMove(event) {

    event.preventDefault();

    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    var intersects = raycaster.intersectObjects(scene.children, true);

    var tooltip = document.getElementById('tooltip');

    if (intersects.length > 0) {

        if (intersects[0].object.father != undefined) {
            tooltip.innerHTML = intersects[0].object.father;
            tooltip.style.visibility = 'visible';
            tooltip.style.top = event.clientY + 300 + 'px';
            tooltip.style.left = event.clientX + 5 + 'px';

        } else {
            tooltip.innerHTML = "";
            tooltip.style.visibility = 'hidden';
        }
    }
}

function menu() {

    var gui = new dat.GUI({ height: 5,width: 300 });

    var baseDados = new function () {
        this.baseDados = baseDados;
    }

    var controllerPassadeiras = new function () {
        this.CriarPassadeiras = criarPassadeiras;
    };

    var controllerGarfos = new function () {
        this.CriarGarfos = criarG;
    };

    var controllerFacas = new function () {
        this.CriarFacas = criarF;
    };


    var controllerApagarTudo = new function () {
        this.ApagarTudo = apagarTudo;
    };

    function apagarTudo() {
        location.reload();
    }


    var controllerAnimar = new function () {
        this.Animar = animar;
    };

    var controllerParar = new function () {
        this.Parar = parar;
    };

    var controls = new function () {
        this.nomePassadeira = '';
        this.numeroMaquinas = 1;
        this.novaPassadeira = function () {
            novaPassadeira(this.nomePassadeira, this.numeroMaquinas);
        };
        this.criarF = criarF;
        this.criarG = criarG;
        this.animar = function () {
            productionOn = true;
        }
        this.parar = function () {
            productionOn = false;
        }
        this.deleteAll = deleteAll;
    };

    function deleteAll() {
        location.reload();
    }

    var folder1 = gui.addFolder("Production Lines");
    /*if (productionLines != undefined) {
        folder1.add(controls, "baseDados");
    }*/

    var folder1 = gui.addFolder("Máquinas");
    const params = { maquinas: 0 }

    folder1.add( params, 'maquinas', 0, 10 ).step( 1 ).name( 'CriarMaquinasDentro' ).onChange( function ( value ){
        criarMaquina1(value);
    });
    folder1.add( params, 'maquinas', 0, 8 ).step( 1 ).name( 'CriarMaquinasFora' ).onChange( function ( value ){
        criarMaquina2(value);
    }); 
    var folder2 = gui.addFolder("Passadeiras");
    folder2.add(controllerPassadeiras, "CriarPassadeiras");
    var folder3 = gui.addFolder("Produtos");
    folder3.add(controllerGarfos, "CriarGarfos");
    folder3.add(controllerFacas, "CriarFacas");
    var folder5 = gui.addFolder("Apagar");
    folder5.add(controllerApagarTudo, "ApagarTudo");
    var folder6 = gui.addFolder("Animacao");
    folder6.add(controllerAnimar, "Animar");
    folder6.add(controllerParar, "Parar");
}

function animar(){
    this.productionOn = true;
}
function parar(){
    this.productionOn = false;
}

function seeProducts() {
    showProducts(scene, loader, numberOfProductionLines, products);
}

function criarPassadeiras(){

}

function production() {

    if (productionOn) {
        for (var i = 0; i < products.length; i++) {

            if (products[i].position.x > 16) {
                if (products[i].position.x == 17.875) {
                    products[i].position.x = 46.5;
                } else {
                    products[i].position.x -= 0.125;
                }
            } else if (products[i].position.x > - 26) {
                if (products[i].position.x == -25.125) {
                    products[i].position.x = 3.5;
                } else {
                    products[i].position.x -= 0.125;
                }
            } else {
                if (products[i].position.x == -71.125) {
                    products[i].position.x = -42.5;
                } else {
                    products[i].position.x -= 0.125;
                }
            }
        }
    }
}


function updateCamera() {

    if (camera.position.y > 499) {
        camera.position.y = 499;
    }
    if (camera.position.y < 0) {
        camera.position.y = 0;
    }

    if (camera.position.x > 249) {
        camera.position.x = 249;
    }

    if (camera.position.x < -249) {
        camera.position.x = -249;
    }

    if (camera.position.z > 249) {
        camera.position.z = 249;
    }

    if (camera.position.z < -249) {
        camera.position.z = -249;
    }
}

function baseDados() {

    for (var i = 0; i < productionLines.length; i++) {

        var productionLine = new ProductionLine(productionLines[i].name);
        for (let machine of productionLines[i].machines) {
            var m = new Machine(machine.machineName, machine.machineType.machineTypeDTOName, machine.machinePosition);
            productionLine.machines.push(m);
        }

        showProductionLines(scene, loader, productionLine, prodLinePositionX, prodLinePositionZ, objects);

        if (prodLinePositionZ == 50) {
            prodLinePositionX -= 43;
            prodLinePositionZ = -50;
        } else {
            prodLinePositionZ += 20;
        }

        numberOfProductionLines++;
    }
}

function criarF(){
    criarFacas(scene, loader, numberOfProductionLines);
}

function criarG(){
    criarGarfos(scene, loader, numberOfProductionLines);
}

function novaPassadeira(nomePassadeira, numeroMaquinas) {

    console.log("PRODUCTS: " + products.length);
    if (numberOfProductionLines < maxProductionLine) {

        console.log(productionLineName);

        var productionLine;
        productionLine = new ProductionLine(productionLineName);
        productionLine.name = productionLineName;

        for (var i = 0; i < numberOfMachines; i++) {

            var position = i + 1;
            var machineName = productionLineName + " Machine " + position;
            var machine = new Machine(machineName, " ", position);
            productionLine.machines.push(machine);
        }

        showProductionLines(scene, loader, productionLine, prodLinePositionX, prodLinePositionZ, objects);

        if (prodLinePositionZ == 50) {
            prodLinePositionX -= 43;
            prodLinePositionZ = -50;
        } else {
            prodLinePositionZ += 20;
        }

        numberOfProductionLines++;
    } else {
        console.log("Reached the maximun number of Production Lines");
    }

}


function showFloor() {
    var geometry5 = new THREE.PlaneGeometry(2000, 2000, 2000);
    var texture = new THREE.TextureLoader().load('Utils/Factory_Utils/textures/calcadaPt.jpg');
    var material5 = new THREE.MeshBasicMaterial({
        color: 0xfff2e6,
        side: THREE.DoubleSide
    });
    var plane = new THREE.Mesh(geometry5, material5);

    var geometryLight5 = new THREE.BoxGeometry(2000, 10, 2000);
    var texture2 = new THREE.TextureLoader().load('Utils/Factory_Utils/textures/calcadaPt.jpg');
    var lightMaterial5 = new THREE.MeshBasicMaterial({
        map: texture2,
        side: THREE.DoubleSide
    });
    var cubeLight5 = new THREE.Mesh(geometryLight5, lightMaterial5);
    cubeLight5.position.set(0, -10, 0);
    scene.add(cubeLight5);

    plane.position.set(0, -1, 0);
    plane.rotation.x += 4.715;

    var textureFloor = new THREE.TextureLoader().load('Utils/Factory_Utils/textures/calcadaPt.jpg', function (textureFloor) {
        textureFloor.wrapS = textureFloor.wrapT = THREE.RepeatWrapping;
        textureFloor.offset.set(0, 0);
        textureFloor.repeat.set(14, 14);
    });
    var floor = new THREE.Mesh(
        new THREE.PlaneGeometry(150, 150, 30, 30),
        new THREE.MeshBasicMaterial(new THREE.MeshBasicMaterial({ map: textureFloor, side: THREE.DoubleSide }))
    );
    floor.rotation.x -= Math.PI / 2;
    floor.receiveShadow = true;
    scene.add(floor);
}

function skyBox() {
    var geometry = new THREE.CubeGeometry(2000, 2000, 2000);
    var cubeMaterials = [
        new THREE.MeshBasicMaterial({
            map: new THREE.TextureLoader().load("Utils/Factory_Utils/textures/darkcity_ft.png"),
            side: THREE.DoubleSide
        }),
        new THREE.MeshBasicMaterial({
            map: new THREE.TextureLoader().load("Utils/Factory_Utils/textures/darkcity_bk.png"),
            side: THREE.DoubleSide
        }),
        new THREE.MeshBasicMaterial({
            map: new THREE.TextureLoader().load("Utils/Factory_Utils/textures/darkcity_up.png"),
            side: THREE.DoubleSide
        }),
        new THREE.MeshBasicMaterial({
            map: new THREE.TextureLoader().load("Utils/Factory_Utils/textures/darkcity_dn.png"),
            side: THREE.DoubleSide
        }),
        new THREE.MeshBasicMaterial({
            map: new THREE.TextureLoader().load("Utils/Factory_Utils/textures/darkcity_rt.png"),
            side: THREE.DoubleSide
        }),
        new THREE.MeshBasicMaterial({
            map: new THREE.TextureLoader().load("Utils/Factory_Utils/textures/darkcity_lf.png"),
            side: THREE.DoubleSide
        })
    ];
    var cubeMaterial = new THREE.MeshFaceMaterial(cubeMaterials);
    var cube = new THREE.Mesh(geometry, cubeMaterial);
    cube.position.set(0, 100, 0);
    scene.add(cube);
}

function lights() {
    var light = new THREE.SpotLight(0x404040, 3.5);
    light.position.set(140, 300, 200);
    scene.add(light);

    //Light2
    var light2 = new THREE.SpotLight(0x404040, 3.5);
    light2.position.set(-140, 300, 200);
    scene.add(light2);


    //Light3
    var light3 = new THREE.SpotLight(0x404040, 3.5);
    light3.position.set(-140, 300, -200);
    scene.add(light3);

    //Light4
    var light4 = new THREE.SpotLight(0x404040, 3.5);
    light4.position.set(140, 300, -200);
    scene.add(light4);

    //Verificar se funciona
    light.castShadow = true;
    light.shadow.mapSize.width = 1024;
    light.shadow.mapSize.height = 1024;
    light.shadow.camera.near = 500;
    light.shadow.camera.far = 4000;
    light.shadow.camera.fov = 30;
}

init(0);