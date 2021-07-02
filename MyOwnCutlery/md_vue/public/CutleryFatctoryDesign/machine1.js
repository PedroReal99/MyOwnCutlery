function init() {

    var loader = new THREE.ObjectLoader();

    // Create a material
    var textureLoader = new THREE.TextureLoader();
    var map = textureLoader.load('Utils/Factory_Utils/textures/clearMetal.png');
    var material = new THREE.MeshBasicMaterial({ map: map });

    var groupCilindro;

    var loader = new THREE.ObjectLoader();
    loader.load('Utils/Factory_Utils/ObjectsToImport/machine1.json', function(object) {

        // For any   meshes in the model, add our material.
        object.traverse(function(child) {

            child.objectName = 'NOME';
                child.material = material;
                if (child.name == 'GroupCilindro') {
                    groupCilindro = child;
                }
        });
        //child1.position.x+=40;
        //child1.position.z+=50;
        // Add the model to the scene.
        scene.add(object);
        animate();
    });


    var xSpeed = 0.5;
    var ySpeed = 0.5;

    document.addEventListener("keydown", onDocumentKeyDown, false);

    function onDocumentKeyDown(event) {
        var keyCode = event.which;
        if (keyCode == 87) {
            groupCilindro.rotation.y += 0.5;
            //.position.y += ySpeed;
        } else if (keyCode == 83) {
            groupCilindro.position.y -= ySpeed;
        } else if (keyCode == 65) {
            groupCilindro.position.x -= xSpeed;
        } else if (keyCode == 68) {
            groupCilindro.position.x += xSpeed;
        } else if (keyCode == 32) {
            groupCilindro.position.set(0, 0, 0);
        }
    };

}


function animate() {
    
    renderer.render(scene, camera);
    requestAnimationFrame(animate);

}
init();