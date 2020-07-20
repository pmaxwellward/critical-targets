
if (BABYLON.Engine.isSupported()) {
    var canvas = document.getElementById("renderCanvas");
    var engine = new BABYLON.Engine(canvas, true, { stencil: true });
}   
let createScene = () => {
    const scene = new BABYLON.Scene(engine);

// Main Screen
//----------------------------------------------------------------------------------------------------
    /*
    const camera = new BABYLON.ArcRotateCamera("Camera", 0, 0, 10, new BABYLON.Vector3(0, 0, 0), scene);
    camera.setPosition(new BABYLON.Vector3(-34, 0, 410));
    camera.attachControl(canvas, false);
    camera.lowerRadiusLimit = 50;
    camera.upperRadiusLimit = 500;
    */
   	/********** FOLLOW CAMERA EXAMPLE **************************/
    // This creates and initially positions a follow camera 
    let camDefaultPos = new BABYLON.Mesh("camDefaultPos", scene);
    camDefaultPos.position = new BABYLON.Vector3(0, 0, -410);	
    let camera = new BABYLON.FollowCamera("FollowCam", camDefaultPos.position, scene);
	//The goal distance of camera from target
	camera.radius = 30;
	// The goal height of camera above local origin (centre) of target
	camera.heightOffset = 0;
	// The goal rotation of camera around local origin (centre) of target in x y plane
	camera.rotationOffset = 0;
	//Acceleration of camera in moving from current to goal position
	camera.cameraAcceleration = 0.05;
	//The speed at which acceleration is halted 
	camera.maxCameraSpeed = 10;
	//camera.target is set after the target's creation
	// This attaches the camera to the canvas
    camera.attachControl(canvas, true);
    //
    const sun = new BABYLON.PointLight("sun", new BABYLON.Vector3(50, 50, 30), scene);
    scene.clearColor = new BABYLON.Color3(0, 0, 0);
    // Load the sound and play it automatically once ready
    const music = new BABYLON.Sound("planetsounds", "./sounds/01 - Jupiter.mp3", scene, null, {
        loop: true,
        autoplay: true
    });
    
    // Skybox
    let skybox = BABYLON.Mesh.CreateBox("skyBox", 1e4, scene);
    skybox.isPickable = false 
    let skyboxMaterial = new BABYLON.StandardMaterial("skyBox",scene);
    skyboxMaterial.backFaceCulling = false;
    let files = [
        "textures/skybox/right.png", 
        "textures/skybox/top.png", 
        "textures/skybox/front.png", 
        "textures/skybox/left.png", 
        "textures/skybox/bottom.png", 
        "textures/skybox/back.png"
    ];
    skyboxMaterial.reflectionTexture = BABYLON.CubeTexture.CreateFromImages(files, scene);
    skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
    skyboxMaterial.diffuseColor = new BABYLON.Color3(0,0,0);
    skyboxMaterial.specularColor = new BABYLON.Color3(0,0,0);
    skyboxMaterial.disableLighting = true;
    skybox.material = skyboxMaterial;

    // Jupiter
    let jup_mat = new BABYLON.StandardMaterial("jup_mat", scene);
    jup_mat.specularColor = new BABYLON.Color3(0.05, 0.05, 0.05);
    jup_mat.emissiveTexture = new BABYLON.Texture("textures/jup.jpg", scene);
    jup_mat.ambientTexture = new BABYLON.Texture("textures/jup.jpg", scene);
    let jup = BABYLON.Mesh.CreateSphere("JUPITER", 32, 130, scene);
    jup.position = new BABYLON.Vector3(0, 0, 0);
    jup.material = jup_mat;

    // Europa
    let eur_p = new BABYLON.Mesh("eur_p",scene);
    eur_p.parent = jup;
    let eur_mat = new BABYLON.StandardMaterial("eur_mat", scene);
    eur_mat.emissiveTexture = new BABYLON.Texture("textures/eur.png", scene);
    eur_mat.ambientTexture = new BABYLON.Texture("textures/eur.png", scene);
    eur_mat.specularColor = new BABYLON.Color3(0.05, 0.05, 0.05);
    let eur = BABYLON.Mesh.CreateSphere("EUROPA", 16, 5, scene);
    eur.parent = eur_p;
    eur.material = eur_mat;
    
    // Ganymede
    let gan_p = new BABYLON.Mesh("gan_p",scene);
    gan_p.parent = jup;
    let gan_mat = new BABYLON.StandardMaterial("gan_mat", scene);
    gan_mat.emissiveTexture = new BABYLON.Texture("textures/gan.png", scene);
    gan_mat.ambientTexture = new BABYLON.Texture("textures/gan.png", scene);
    gan_mat.specularColor = new BABYLON.Color3(0.05, 0.05, 0.05);
    let gan = BABYLON.Mesh.CreateSphere("GANYMEDE", 16, 5, scene);
    gan.parent = gan_p;
    gan.material = gan_mat;
    
    // Io
    let io_p = new BABYLON.Mesh('io_p', scene);
    io_p.parent = jup;
    let io_mat = new BABYLON.StandardMaterial("io_mat", scene);
    io_mat.emissiveTexture = new BABYLON.Texture("textures/io.png", scene);
    io_mat.ambientTexture = new BABYLON.Texture("textures/io.png", scene);
    io_mat.specularColor = new BABYLON.Color3(0.05, 0.05, 0.05);
    let io = BABYLON.Mesh.CreateSphere("IO", 16, 5, scene);
    io.parent = io_p;
    io.material = io_mat;
    
    // Calisto
    let cal_p = new BABYLON.Mesh('cal_p', scene);
    cal_p.parent = jup;
    let cal_mat = new BABYLON.StandardMaterial("cal_mat", scene);
    cal_mat.emissiveTexture = new BABYLON.Texture("textures/cal.png", scene);
    cal_mat.ambientTexture = new BABYLON.Texture("textures/cal.png", scene);
    cal_mat.specularColor = new BABYLON.Color3(0.05, 0.05, 0.05);
    let cal = BABYLON.Mesh.CreateSphere("CALISTO", 16, 5, scene);
    cal.parent = cal_p;
    cal.material = cal_mat;

    // GUI
    let advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");
    //
    let buttons = [];
    //
    let eur_on = BABYLON.GUI.Button.CreateImageOnlyButton("eur_on", "textures/buttons/eur_on.svg");
    let eur_off = BABYLON.GUI.Button.CreateImageOnlyButton("eur_off", "textures/buttons/eur_off.svg");
    let io_on = BABYLON.GUI.Button.CreateImageOnlyButton("io_on", "textures/buttons/io_on.svg");
    let io_off = BABYLON.GUI.Button.CreateImageOnlyButton("io_off", "textures/buttons/io_off.svg");
    let jup_on = BABYLON.GUI.Button.CreateImageOnlyButton("jup_on", "textures/buttons/jup_on.svg");
    let jup_off = BABYLON.GUI.Button.CreateImageOnlyButton("jup_off", "textures/buttons/jup_off.svg");
    let gan_on = BABYLON.GUI.Button.CreateImageOnlyButton("gan_on", "textures/buttons/gan_on.svg");
    let gan_off = BABYLON.GUI.Button.CreateImageOnlyButton("gan_off", "textures/buttons/gan_off.svg");
    let cal_on = BABYLON.GUI.Button.CreateImageOnlyButton("cal_on", "textures/buttons/cal_on.svg");
    let cal_off = BABYLON.GUI.Button.CreateImageOnlyButton("cal_off", "textures/buttons/cal_off.svg");

    buttons.push(
        eur_on, 
        eur_off,
        io_on,
        io_off, 
        jup_on,
        jup_off,
        gan_on,
        gan_off,
        cal_on,
        cal_off
    );

    let labels = [];

    let eur_label = new BABYLON.GUI.TextBlock('eur_label','EUROPA');
    let io_label = new BABYLON.GUI.TextBlock('io_label','IO');
    let jup_label = new BABYLON.GUI.TextBlock('jup_label','JUPITER');
    let gan_label = new BABYLON.GUI.TextBlock('gan_label','GANYMEDE');
    let cal_label = new BABYLON.GUI.TextBlock('cal_label','CALISTO');

    labels.push(
        eur_label,
        io_label,
        jup_label,
        gan_label,
        cal_label
    );

    setLabel(labels);

    function setLabel(array) {
        for(let i = 0; i < array.length; i++) {   
            array[i].fontFamily = 'arial';
            array[i].color = 'white';
            array[i].textHorizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
            array[i].fontSize = 20;
            array[i].isVisible = false;
            advancedTexture.addControl(array[i]);
            //
            let mesh = scene.getMeshByName(array[i].text);
            array[i].linkWithMesh(mesh);   
            array[i].linkOffsetY = -100;
        }
    }

    function createButtons(array) {
        for(let i = 0; i < array.length; i++) {
            array[i].image.stretch = BABYLON.GUI.Image.STRETCH_UNIFORM;
            array[i].color = "transparent";
            array[i].width = 0.1;
            array[i].height = 0.1;
            array[i].top = "38.5%"
            array[i].isPointerBlocker = true;
            array[i].isSelected = false;

            let state = array[i].name.split('_').pop();
            //
            if(state === 'on') {
                let off = buttons.find(o => o.name === array[i].name.split('_').shift() + '_off');
                array[i].isVisible = false;
                array[i].onPointerUpObservable.add(function () {
                    array[i].isVisible = false;
                    off.isVisible = true;
                    advancedTexture.removeControl(array[i]);
                    if(!advancedTexture.rootContainer.children.includes(off))
                        advancedTexture.addControl(off);
                    scene.activeCamera.lockedTarget = undefined;
                    let ease = new BABYLON.CubicEase();
                    ease.setEasingMode(BABYLON.EasingFunction.EASINGMODE_EASEINOUT);
                    BABYLON.Animation.CreateAndStartAnimation('camDefaultPos', camera, "position", 60, 120, camera.position, new BABYLON.Vector3(0,0,-410), 0, ease);
                    BABYLON.Animation.CreateAndStartAnimation('camDefaultRot', camera, "rotation", 60, 120, camera.rotation, new BABYLON.Vector3(0,0,0), 0, ease);
                });
            }
            if(state === 'off') {
                let planet = array[i].name.split('_').shift();
                let on = buttons.find(o => o.name === planet + '_on');
                let meshParent = planet + '_p';
                let labelName = planet + '_label';
                let label = labels.find(o => o.name === labelName);

                array[i].onPointerUpObservable.add(function () {
                    scene.activeCamera.lockedTarget = scene.getMeshByName(meshParent);
                    array.forEach((element) => {
                        if(element.isSelected == true) {
                            let elementOff = buttons.find(o => o.name === element.name.split('_').shift() + '_off');
                            element.isVisible = false;
                            element.isSelected = false;
                            elementOff.isVisible = true;
                            if(!advancedTexture.rootContainer.children.includes(elementOff))
                                advancedTexture.addControl(elementOff);
                        }
                    });
                    on.isVisible = true;
                    on.isSelected = true;
                    if(label.isVisible)
                        label.isVisible = false;
                    advancedTexture.removeControl(array[i]);
                    if(!advancedTexture.rootContainer.children.includes(on))
                        advancedTexture.addControl(on);
                });
                array[i].onPointerEnterObservable.add(function () {
                    label.isVisible = true;
                });
                array[i].onPointerOutObservable.add(function () {
                    label.isVisible = false;
                });
            }
            switch (array[i]) {
                case eur_on:
                    eur_on.left = '-20%';
                case eur_off:
                    eur_off.left = '-20%';
                case io_on:
                    io_on.left = '-10%';
                case io_off:
                    io_off.left = '-10%';
                case jup_on:
                    jup_on.left = '0%';
                case jup_off:
                    jup_off.left = '0%';
                case gan_on:
                    gan_on.left = '10%';
                case gan_off:
                    gan_off.left = '10%';
                case cal_on:
                    cal_on.left = '20%';
                case cal_off:
                    cal_off.left = '20%';
                default:
                    break;
            }
            advancedTexture.addControl(array[i]);
        }
    }
    createButtons(buttons);

    // Planet movement & rotation
    let alphaSkybox = 0;
    let alphaJupiter = 0;
    let alphaEuropa = Math.PI;
    let alphaGanymede = Math.PI;
    let alphaIo = Math.PI;
    let alphaCalisto = Math.PI;

    scene.registerBeforeRender(function() {
        skybox.rotation.y = alphaSkybox;
        //
        jup.rotation.y = alphaJupiter;
        //
        eur_p.position = new BABYLON.Vector3(150 * Math.sin(alphaEuropa), eur_p.parent.position.y, 150 * Math.cos(alphaEuropa));
        eur.rotation.y += .03;
        //
        gan_p.position = new BABYLON.Vector3(175 * Math.sin(alphaGanymede+2), gan_p.parent.position.y, 175 * Math.cos(alphaGanymede+2));
        gan.rotation.y += .03;
        //
        io_p.position = new BABYLON.Vector3(200 * Math.sin(alphaIo+3), io_p.parent.position.y, 200 * Math.cos(alphaIo+3));
        io.rotation.y += .03; 
        //
        cal_p.position = new BABYLON.Vector3(200 * Math.sin(alphaCalisto+4), cal_p.parent.position.y, 200 * Math.cos(alphaCalisto+4));
        cal.rotation.y += .03; 
        //
        alphaJupiter += 0.004;
        alphaSkybox += 0.0001;
        alphaEuropa += 0.0005;
        alphaGanymede += 0.0001;
        alphaIo += 0.0003;
        alphaCalisto += 0.0004;
        //
    });

//----------------------------------------------------------------------------------------------------
    return scene;
}
var scene = createScene();

engine.runRenderLoop(function() {
    scene.render()
});
//
window.addEventListener("resize", function() {
    engine.resize()
});