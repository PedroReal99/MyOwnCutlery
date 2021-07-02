function criarMaquina2(nmaquina) {

    for(var j=0;j<nMaquinas2global.length;j++){
        scene.remove(nMaquinas2global[j]);
        
    }
    nMaquinas2global=[];


    var loader = new THREE.GLTFLoader();
    loader.load('../CutleryFatctoryDesign/Utils/ImportObjects/maquina4.gltf', function (gltf) {
        //var nmaquina = 4;
        var a = 0;
        gltf.scene.scale.set(20, 20, 20);
        //gltf.scene.position.set(0, -20, 200);
        gltf.scene.rotation.y += 3.15;
        //var model=gltf.scene.children[0];
        var animation = gltf.animations[0];
        for (var i = 0; i < nmaquina; i++) {
            if (i <= 3) {
                var clonee = gltf.scene.clone();
                clonee.position.set(180, 0, 150 - a);
                scene.add(clonee);
                a += 100;
            } else {
                if (i == 4) {
                    gltf.scene.rotation.y += 3.15;
                    a = 0;
                }
                var clonee = gltf.scene.clone();
                clonee.position.set(-170, 0, 150 - a);
                scene.add(clonee);
                a += 100;
            }
            nMaquinas2global.push(clonee);
        }

        //var mixer = new THREE.AnimationMixer(model);
        //mixers.push(mixer);

        //const action = mixer.clipAction(animation);
        //action.play();

        //scene.add(gltf.scene);
        animate();
    }, undefined, function (error) {
        console.error(error);
    });


}

function animate() {
    //child1.position.x++;
    renderer.render(scene, camera);
    requestAnimationFrame(animate);

}
//criarMaquina2();