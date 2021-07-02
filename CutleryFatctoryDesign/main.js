var scene, camera, renderer, controls, loader, raycaster, mouse,mesh, clock;
var meshFactoryFloor,meshFloor,ambientLight;

var productionLines;

const maxProductionLine = 2;
const maxProductionLineMachines = 6;

var numberOfProductionLines = 0;
var productionOn = false;
var numeromaquina =1;
var products = [];
var objects = [];
var mixers = [];

var objectDrag = [];

var nMaquinas1global = [];
var nMaquinas2global = [];
var kkk;

var keyboard = {};
var player = {
    height: 1.9,
    speed: 0.4,
    turnSpeed: Math.PI * 0.03
};
var USE_WIREFRAME = false;
var factory;

const garfos1 = [];
const garfos2 = [];
const facas1 = [];
const facas2 = [];

var productionOn = false;

init();

function init() {

    clock = new THREE.Clock();
    const mixers = [];

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 10000);
    raycaster = new THREE.Raycaster(); // Needed for object intersection
    mouse = new THREE.Vector2();
    renderer = new THREE.WebGLRenderer({
        antialias: true
    });
    meshFloor=new THREE.Mesh(
        new THREE.PlaneGeometry(10,10,10,10),
        new THREE.MeshPhongMaterial({color:0xffffff,wireframe:USE_WIREFRAME})
    )
    meshFloor.rotation.x=Math.PI/2;
    meshFloor.receiveShadow = true;
    scene.add(meshFloor);
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0xa9a9a9);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    document.body.appendChild(renderer.domElement);

    camera.position.y = 300;
    camera.position.x = 0;
    camera.position.z = 400;

    controls = new THREE.OrbitControls(camera, renderer.domElement);

    var dragControls = new THREE.DragControls(objectDrag,camera,renderer.domElement);
    
    /*dragControls.addEventListener('start',function(event){
        //var p=getParent(event);
        var aux=p.object.position.x;
        var auy=p.object.position.y;
        var auz=p.object.position.z;

    })*/

    dragControls.addEventListener('dragstart', function (event) {
        controls.enabled = false;
    });

    dragControls.addEventListener('drag', function (event) {
        event.object.position.y = 0;
    });

    dragControls.addEventListener('dragend', function (event) {
        controls.enabled = true;
    });
   
    lights();
    walls();

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
    plane.receiveShadow=true

    var box1 = new THREE.Mesh(new THREE.BoxGeometry(25, 25, 25), new THREE.MeshBasicMaterial({color:0x000019}));
    box1.position.set(-110, 5, 220);
    scene.add(box1);
    objectDrag.push(box1)
    var box2 = new THREE.Mesh(new THREE.BoxGeometry(25, 25, 25), new THREE.MeshBasicMaterial({color:0x000019}));
    box2.position.set(120,5, 220);
    scene.add(box2);
    objectDrag.push(box2)
    window.addEventListener('resize', () => {
        renderer.setSize(window.innerWidth, window.innerHeight);
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
    });
    window.addEventListener('mousemove', onMouseMove, false);



    animate();
    menu();
    console.log(scene);
}




function SpotLightShadow() {

	LightShadow.call( this, new PerspectiveCamera( 50, 1, 0.5, 500 ) );

}

function onMouseMove(event) {
    event.preventDefault();

     mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
     mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;

     raycaster.setFromCamera(mouse, camera);
     var intersects = raycaster.intersectObjects(scene.children, true);

     var tooltip = document.getElementById('tooltip');

     if (intersects.length > 0) {

         console.log("1");
     if (intersects[0].object.father != undefined) {
         console.log("2");
         console.log(intersects[0].object.father);
         tooltip.innerHTML = intersects[0].object.father;
         tooltip.style.visibility = 'visible';
         tooltip.style.top = event.clientY +100 + 'px';
         tooltip.style.left = event.clientX + 5 + 'px';

     } else {
         tooltip.innerHTML = "";
         tooltip.style.visibility = 'hidden';
 }
 }
}

function animate() {
    updateCamera();
    update();
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}

function update() {
    const delta = clock.getDelta();

    for (const mixer of mixers) {
        mixer.update(delta);
    }

    var i = 0;
    for (i = 0; i < garfos1.length; i++) {
        var x = garfos1[i].position.x;
        var y = garfos1[i].position.y;
        var z = garfos1[i].position.z;
        if (z < 200) {
            garfos1[i].position.set(x, y, z + 0.3);
        } else {
            garfos1[i].position.set(x, y, -175);
        }
    }


    for (i = 0; i < garfos2.length; i++) {
        var x = garfos2[i].position.x;
        var y = garfos2[i].position.y;
        var z = garfos2[i].position.z;
        if (z < 200) {
            garfos2[i].position.set(x, y, z + 0.3);
        } else {
            garfos2[i].position.set(x, y, -175);
        }
    }

    for (i = 0; i < facas1.length; i++) {
        var x = facas1[i].position.x;
        var y = facas1[i].position.y;
        var z = facas1[i].position.z;
        if (z < 200) {
            facas1[i].position.set(x, y, z + 0.3);
        } else {
            facas1[i].position.set(x, y, -175);
        }
    }

    for (i = 0; i < facas2.length; i++) {
        var x = facas2[i].position.x;
        var y = facas2[i].position.y;
        var z = facas2[i].position.z;
        if (z < 200) {
            facas2[i].position.set(x, y, z + 0.3);
        } else {
            facas2[i].position.set(x, y, -175);
        }
    }
}

function walls() {
    //Floor geometry and texture creation
    var texture = new THREE.TextureLoader().load('Utils/Factory_Utils/textures/chaoFabrica.jpg');
    meshFactoryFloor = new THREE.Mesh(new THREE.PlaneGeometry(500, 500, 70, 70), new THREE.MeshBasicMaterial({ map: texture, side: THREE.DoubleSide }));
    meshFactoryFloor.rotation.x -= Math.PI / 2;
    meshFactoryFloor.receiveShadow=true;
    scene.add(meshFactoryFloor);

    //wall back geometry and texture creation
    var texture1 = new THREE.TextureLoader().load('Utils/Factory_Utils/textures/tentativa2.jpg');
    meshWall = new THREE.Mesh(new THREE.PlaneGeometry(500, 150, 90, 40), new THREE.MeshBasicMaterial({ map: texture1, side: THREE.DoubleSide }));
    meshWall.position.x = 250;
    meshWall.position.y = 75;
    meshWall.position.z = 0;
    meshWall.rotation.y = Math.PI / 2;
    scene.add(meshWall);

    //wall front geometry and texture creation
    var texture2 = new THREE.TextureLoader().load('Utils/Factory_Utils/textures/tentativa2.jpg');
    meshWall2 = new THREE.Mesh(new THREE.PlaneGeometry(500, 150, 70, 40), new THREE.MeshBasicMaterial({ map: texture2, side: THREE.DoubleSide }));
    meshWall2.position.x = 0;
    meshWall2.position.y = 75;
    meshWall2.position.z = -250;
    scene.add(meshWall2);

    //wall side geometry and texture creation
    var texture3 = new THREE.TextureLoader().load('Utils/Factory_Utils/textures/tentativa2.jpg');
    meshWall3 = new THREE.Mesh(new THREE.PlaneGeometry(500, 150, 70, 40), new THREE.MeshBasicMaterial({ map: texture3, side: THREE.DoubleSide }));
    meshWall3.position.x = -250;
    meshWall3.position.y = 75;
    meshWall3.rotation.y = Math.PI / 2;
    meshWall3.position.z = 0;
    scene.add(meshWall3);
}

function lights() {

    //Light1- ver o target
    var light = new THREE.SpotLight(0x404040, 2.5);
    light.castShadow = true;
    scene.add(light);

    //Light2
    var light2 = new THREE.SpotLight(0x404040, 2.5);
    light2.position.set(-140, 300, 200);
    light2.castShadow = true;
    scene.add(light2);

    //Light3
    var light3 = new THREE.SpotLight(0x404040, 2.5);
    light3.position.set(-140, 300, -200);
    light3.castShadow = true;
    scene.add(light3);

    //Light4
    var light4 = new THREE.SpotLight(0x404040, 2.5);
    light4.position.set(140, 300, -200);
    light4.castShadow = true;
    scene.add(light4);

    

    
}



function updateCamera() {
    if (camera.position.y > 700) {
        camera.position.y = 700;
    }
    if (camera.position.y < 0) {
        camera.position.y = 0;
    }

    if (camera.position.x > 800) {
        camera.position.x = 800;
    }

    if (camera.position.x < -800) {
        camera.position.x = -800;
    }

    if (camera.position.z > 800) {
        camera.position.z = 800;
    }

    if (camera.position.z < -800) {
        camera.position.z = -800;
    }
}

/*SpotLightShadow.prototype = Object.assign( Object.create( LightShadow.prototype ), {

	constructor: SpotLightShadow,

	isSpotLightShadow: true,

	updateMatrices: function ( light ) {

		var camera = this.camera;

		var fov = _Math.RAD2DEG * 2 * light.angle;
		var aspect = this.mapSize.width / this.mapSize.height;
		var far = light.distance || camera.far;

		if ( fov !== camera.fov || aspect !== camera.aspect || far !== camera.far ) {

			camera.fov = fov;
			camera.aspect = aspect;
			camera.far = far;
			camera.updateProjectionMatrix();

		}

		LightShadow.prototype.updateMatrices.call( this, light );

	}

} );*/


function menu(){    

    var controllerPassadeiras = new function () {
        this.CriarPassadeiras = criarPassadeiras;
    };
    var controllerGarfos = new function () {
        this.CriarGarfos = criarGarfos;
    };
    var controllerFacas = new function () {
        this.CriarFacas = criarFacas;
    };
    var controllerApagarTudo = new function () {
        this.ApagarTudo = apagarTudo;
    };
    function apagarTudo() {
        location.reload();
    }
    var controllerAnimar = new function () {
        this.start = function(){
            this.productionOn = true;
        };
        this.stop = function(){
            this.productionOn = false;
        }
    };

        var gui = new dat.GUI({
            height: 5,
            width: 300
        });
    var folder1 = gui.addFolder("Máquinas");
    const params = { maquinas: 0 }

    folder1.add( params, 'maquinas', 0, 10 ).step( 1 ).name( 'CriarMaquinasDentro' ).onChange( function ( value ){
        criarMaquina4(value);
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
    folder6.add(controllerAnimar, "start");
    folder6.add(controllerAnimar, "stop");
}


function criarMaquina2(nmaquina) {

    for(var j=0;j<nMaquinas2global.length;j++){
        scene.remove(nMaquinas2global[j]);
        
    }
    nMaquinas2global=[];
    

    var loader = new THREE.GLTFLoader();
    loader.load('../CutleryFatctoryDesign/Utils/ImportObjects/maquina4.gltf', function (gltf) {
        var a = 0;
        gltf.scene.scale.set(20, 20, 20);
        gltf.scene.rotation.y += 3.15;
        var animation = gltf.animations[0];
        for (var i = 0; i < nmaquina; i++) {
            maquina = new THREE.Group();
            
            
            if (i <= 3) {
                var clonee = gltf.scene.clone();
                
                clonee.traverse(function(node2){
                    if(node2 instanceof THREE.Mesh){
                        node2.father="Maquina H "+i;
                        node2.castShadow = true;
                        node2.receiveShadow = true;
                    }
                });
                clonee.position.set(180, 0, 150 - a);
                scene.add(maquina)
                maquina.add(clonee);
                scene.add(clonee);
                
                a += 100;
            } else {
                if (i == 4) {
                    gltf.scene.rotation.y += 3.15;
                    a = 0;
                }
                var clonee = gltf.scene.clone();
                clonee.traverse(function(node2){
                    if(node2 instanceof THREE.Mesh){
                        node2.father="Maquina H "+i;
                        node2.castShadow = true;
                        node2.receiveShadow = true;
                    }
                });
                clonee.position.set(-170, 0, 150 - a);
                scene.add(maquina)
                maquina.add(clonee);
                scene.add(clonee);
                a += 100;
            }
            objectDrag.push(clonee)
            nMaquinas2global.push(clonee);
        }

    }, undefined, function (error) {
        console.error(error);
    });


}


function criarMaquina4(nmaquina) {

    for(var j=0;j<nMaquinas1global.length;j++){
        scene.remove(nMaquinas1global[j]);
        
    }
    nMaquinas1global=[];

    var loader = new THREE.GLTFLoader();

    loader.load('../CutleryFatctoryDesign/Utils/ImportObjects/maquinaanimada.gltf', function(gltf) {
        const animation=gltf.animations[0];
        const mixer = new THREE.AnimationMixer(gltf.scene);
        mixers.push(mixer);

        const action = mixer.clipAction(animation);
        action.play();
        var clonee = gltf.scene.clone();
        nMaquinas1global.push(clonee);


        var a = 0;
        gltf.scene.scale.set(0.1, 0.1, 0.1);
        gltf.scene.position.set(87, 15, 200);
        gltf.scene.rotation.y += 3;
        gltf.scene.traverse(function (node) {

            if (node instanceof THREE.Mesh) {
                node.father = "Maquina";
            }
        });

        //scene.add(gltf.scene);
        //var animation = gltf.animations[0];
        for (var i = 0; i < nmaquina; i++) {
            if(i<=4){
            var clonee = gltf.scene.clone();
            clonee.position.set(87, 15, 200 - a);
            clonee.traverse(function (node) {

                if (node instanceof THREE.Mesh) {
                    node.father = 'Maquina Y' +i+1;
                    node.castShadow = true;
                    node.receiveShadow = true;
                }
            });
            const mixer2 = new THREE.AnimationMixer(clonee);
            mixers.push(mixer2);
    
            const action2 = mixer2.clipAction(animation);
            action2.play();
            scene.add(clonee);
            a += 100;
        }else{
                if (i == 5) {
                    gltf.scene.rotation.y += 3.2;
                    a = 0;
                } 
                var clonee = gltf.scene.clone();
                clonee.traverse(function(node){
                    if(node instanceof THREE.Mesh){
                        node.father="Maquina x "+i;
                        node.castShadow = true;
                        node.receiveShadow = true;
                    }
                });
                clonee.position.set(-68, 15, 200 - a);
                const mixer2 = new THREE.AnimationMixer(clonee);
                mixers.push(mixer2);
        
                const action2 = mixer2.clipAction(animation);
                action2.play();
                scene.add(clonee);
                a += 100;
            }
            nMaquinas1global.push(clonee);
            objectDrag.push(clonee)
        }
       
    }, undefined, function(error) {
        console.error(error);
    });


}


function criarPassadeiras() {
    var loader = new THREE.GLTFLoader();
    loader.load('../CutleryFatctoryDesign/Utils/ImportObjects/passadeira.gltf', function(gltf) {
        //loader.load('../CutleryFatctoryDesign/Utils/ImportObjects/passadeiraJoin.glb', function(gltf) {

        passadeira = new THREE.Group();
        passadeira2 = new THREE.Group();

        gltf.scene.scale.set(40, 40, 215);
        gltf.scene.position.set(120, 0, 0);

        gltf.scene.traverse(function(node){
            if(node instanceof THREE.Mesh){
                node.father="Passadeira"
                node.castShadow = true;
                node.receiveShadow = true;
            }
        });
        
        //passadeira.name="Passadeira"
        //var animation = gltf.animations[0];

        scene.add(passadeira);

        passadeira.add(gltf.scene);
        var clonee = gltf.scene.clone();
        clonee.position.set(-110, 0, 0);
       
        gltf.scene.scale.set(40, 40, 215);
        gltf.scene.position.set(120, 0, 0);

        clonee.traverse(function(node2){
            if(node2 instanceof THREE.Mesh){
                node2.father="Passadeira 2"
                node2.castShadow = true;
                node2.receiveShadow = true;
            }
        });
        
        passadeira2.add(clonee);
        scene.add(passadeira2);
        objectDrag.push(passadeira)
        objectDrag.push(passadeira2)
        console.log(passadeira2);
        console.log(passadeira);
    }, undefined, function(error) {
        console.error(error);
    });
}

function criarFacas() {
    var loader = new THREE.GLTFLoader();
    loader.load('../CutleryFatctoryDesign/Utils/ImportObjects/faca.gltf', function(gltf) {
        var nfaca = 5;
        var a = 0;
        gltf.scene.scale.set(10, 10, 10);
        gltf.scene.position.set(120, 30, 195);
        gltf.scene.rotation.y += 1.6;
        //var model=gltf.scene.children[0];

        for (var i = 0; i < nfaca; i++) {
            var clonee = gltf.scene.clone();
            clonee.position.set(120, 30, 195 - a);
            facas1.push(clonee);
            scene.add(clonee);
            a += 100;
        }
        i = 0;
        a = 0;
        for (var i = 0; i < nfaca; i++) {
            var clonee = gltf.scene.clone();
            clonee.position.set(-110, 30, 195 - a);
            facas2.push(clonee);
            scene.add(clonee);
            a += 100;
        }


        //var mixer = new THREE.AnimationMixer(model);
        //mixers.push(mixer);

        //const action = mixer.clipAction(animation);
        //action.play();

        //scene.add(gltf.scene);
    }, undefined, function(error) {
        console.error(error);
    });
}

function criarGarfos() {
    var loader = new THREE.GLTFLoader();
    loader.load('../CutleryFatctoryDesign/Utils/ImportObjects/garfo.gltf', function(gltf) {
        var ngarfo = 4;
        var a = 0;
        gltf.scene.scale.set(3, 3, 3);
        gltf.scene.position.set(120, 30, 150);
        gltf.scene.rotation.y += 0;
        //var model=gltf.scene.children[0];
        for (var i = 0; i < ngarfo; i++) {
            var clonee = gltf.scene.clone();
            clonee.position.set(120, 30, 150 - a);
            garfos1.push(clonee); 
            scene.add(clonee);
            a += 100;
        }
        i = 0;
        a = 0;
        for (var i = 0; i < ngarfo; i++) {
            var clonee = gltf.scene.clone();
            clonee.position.set(-110, 30, 150 - a);
            garfos2.push(clonee);
            scene.add(clonee);
            a += 100;
        }


        //var mixer = new THREE.AnimationMixer(model);
        //mixers.push(mixer);

        //const action = mixer.clipAction(animation);
        //action.play();

        //scene.add(gltf.scene);
    }, undefined, function(error) {
        console.error(error);
    });


}