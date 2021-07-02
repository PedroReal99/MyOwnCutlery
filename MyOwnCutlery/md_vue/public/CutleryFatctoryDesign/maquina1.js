
function criarMaquina1(nmaquina) {

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
                    node.father = 'Nome' +i+1;
                }
            });
            const mixer2 = new THREE.AnimationMixer(clonee);
            mixers.push(mixer2);
    
            const action2 = mixer2.clipAction(animation);
            action2.play();
            scene.add(clonee);
            a += 100;}else{
                if (i == 5) {
                    gltf.scene.rotation.y += 3.2;
                    a = 0;
                } 
                var clonee = gltf.scene.clone();
                clonee.position.set(-68, 15, 200 - a);
                const mixer2 = new THREE.AnimationMixer(clonee);
                mixers.push(mixer2);
        
                const action2 = mixer2.clipAction(animation);
                action2.play();
                scene.add(clonee);
                a += 100;
            }
            nMaquinas1global.push(clonee);
        }
       

        //var mixer = new THREE.AnimationMixer(model);
        //mixers.push(mixer);

        //const action = mixer.clipAction(animation);
        //action.play();

        //scene.add(gltf.scene);
        animate();
    }, undefined, function(error) {
        console.error(error);
    });


}

function animate() {
    //child1.position.x++;
    renderer.render(scene, camera);
    requestAnimationFrame(animate);

}
//criarMaquina1();