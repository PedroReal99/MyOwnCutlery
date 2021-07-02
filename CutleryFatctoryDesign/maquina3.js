function criarMaquina2(nmaquina) {

    for(var j=0;j<nMaquinas2global.length;j++){
        scene.remove(nMaquinas2global[j]);
        
    }
    nMaquinas2global=[];


    var loader = new THREE.GLTFLoader();
    loader.load('../CutleryFatctoryDesign/Utils/ImportObjects/maquina4.gltf', function (gltf) {
        //var nmaquina = 4;
        var a = 0;
        maquina = new THREE.Group();
        maquina2 = new THREE.Group();
        gltf.scene.scale.set(20, 20, 20);
        //gltf.scene.position.set(0, -20, 200);
        gltf.scene.rotation.y += 3.15;
        gltf.scene.castShadow = true;
        //var model=gltf.scene.children[0];
        var animation = gltf.animations[0];
        for (var i = 0; i < nmaquina; i++) {
            var clonee = gltf.scene.clone();
            if (i <= 3) {
                
                clonee.traverse(function(node2){
                    if(node2 instanceof THREE.Mesh){
                        node2.father="Maquina Y"+i;
                        node2.castShadow = true;
                        node2.receiveShadow = true;
                    }
                });
                clonee.position.set(180, 0, 150 - a);
                a += 100;
                scene.add(maquina)
                maquina.add(clonee);
                scene.add(clonee);
                
            } else {
                if (i == 4) {
                    gltf.scene.rotation.y += 3.15;
                    a = 0;
                }
               clonee.traverse(function(node2){
                    if(node2 instanceof THREE.Mesh){
                        node2.father="Maquina x "+i;
                        node2.castShadow = true;
                        node2.receiveShadow = true;
                    }
                });
                clonee.position.set(-170, 0, 150 - a);
                a += 100;
                scene.add(maquina)
                maquina.add(clonee);
                scene.add(clonee);
                
            }
            
            clonee.position.set(180, 0, 150 - a);
            a += 100;
            scene.add(maquina)
            maquina.add(clonee);
            nMaquinas2global.push(clonee);
        }

    }, undefined, function (error) {
        console.error(error);
    });


}
