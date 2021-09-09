
let canvas;
let engine;

if (BABYLON.Engine.isSupported()) {
    canvas = document.getElementById("renderCanvas");
    engine = new BABYLON.Engine(canvas, true, { stencil: true });
} 

let createScene = () => {

// ===========================
// Scene/Environment Creation
// ===========================

    const scene = new BABYLON.Scene(engine);
    scene.clearColor = new BABYLON.Color3(0, 0, 0);

    // This creates and initially positions a follow camera 
    let camDefaultPos = new BABYLON.Mesh("camDefaultPos", scene);
    camDefaultPos.position = new BABYLON.Vector3(0, 0, -410);	
    let camera = new BABYLON.FollowCamera("FollowCam", camDefaultPos.position, scene);

	// The goal height of camera above local origin (centre) of target
	camera.heightOffset = 0;

	// The goal rotation of camera around local origin (centre) of target in x y plane
	camera.rotationOffset = 0;

	//Acceleration of camera in moving from current to goal position
	camera.cameraAcceleration = 0.05;

	//The speed at which acceleration is halted 
	camera.maxCameraSpeed = 10;

	// camera.target is set after the target's creation
	// This attaches the camera to the canvas
    camera.attachControl(canvas, true);

    const sun = new BABYLON.DirectionalLight("sun", new BABYLON.Vector3(-1000, 0, 10), scene);
    sun.intensity = 2;
    let shadowGen = new BABYLON.ShadowGenerator(1024, sun);
    shadowGen.usePoissonSampling = true;


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

    sun.parent = skybox;

// ===========================
// Mesh Creation
// ===========================
    
    // Verbose, but easier to read than functions with excessive parameters

    // Jupiter
    let jup_mat = new BABYLON.StandardMaterial("jup_mat", scene);
    jup_mat.specularColor = new BABYLON.Color3(0, 0, 0);
    jup_mat.diffuseTexture = new BABYLON.Texture("textures/jup.jpg", scene);
    jup_mat.emissiveTexture = new BABYLON.Texture("textures/jup.jpg", scene);
    jup_mat.ambientTexture = new BABYLON.Texture("textures/jup.jpg", scene);
    let jup_p = new BABYLON.Mesh("jup_p", scene);
    let jup = BABYLON.Mesh.CreateSphere("JUPITER", 32, 130, scene);
    jup.id = "jup";
    jup.parent = jup_p;
    jup.position = new BABYLON.Vector3(0, 0, 0);
    jup.material = jup_mat;
    jup.receivesShadows = true;
    let jup_l = new BABYLON.Mesh("jup_l", scene);
    jup_l.parent = jup;
    jup_l.position = new BABYLON.Vector3(0, 85, 0);
    let jup_target = new BABYLON.Mesh("jup_target", scene);
    jup_target.position = new BABYLON.Vector3(100, 0, 0);
    jup_target.title = jup.name;
    jup_target.info = `Jupiter is more than twice as massive than the other planets of our solar system combined. 
    The giant planet's Great Red spot is a centuries-old storm bigger than Earth.`;

    // Europa
    let eur_p = new BABYLON.Mesh("eur_p",scene);
    eur_p.parent = jup;
    let eur_mat = new BABYLON.StandardMaterial("eur_mat", scene);
    eur_mat.emissiveTexture = new BABYLON.Texture("textures/eur.png", scene);
    eur_mat.ambientTexture = new BABYLON.Texture("textures/eur.png", scene);
    eur_mat.specularColor = new BABYLON.Color3(0.05, 0.05, 0.05);
    let eur = BABYLON.Mesh.CreateSphere("EUROPA", 16, 5, scene);
    eur.id = "eur";
    eur.parent = eur_p;
    eur.material = eur_mat;
    eur.receivesShadows = true;
    let eur_l = new BABYLON.Mesh("eur_l", scene);
    eur_l.parent = eur;
    eur_l.position = new BABYLON.Vector3(0, 15, 0);
    let eur_target = new BABYLON.Mesh("eur_target", scene);
    eur_target.parent = eur_p;
    eur_target.position = new BABYLON.Vector3(10, 0, 0);
    eur_target.title = eur.name;
    eur_target.info = `Europa is perhaps the most promising place to look for present-day environments suitable for life. 
    Europa is thought to have an ocean of salty water below its frozen outer shell of ice.`;
    
    // Ganymede
    let gan_p = new BABYLON.Mesh("gan_p",scene);
    gan_p.parent = jup;
    let gan_mat = new BABYLON.StandardMaterial("gan_mat", scene);
    gan_mat.emissiveTexture = new BABYLON.Texture("textures/gan.png", scene);
    gan_mat.ambientTexture = new BABYLON.Texture("textures/gan.png", scene);
    gan_mat.specularColor = new BABYLON.Color3(0.05, 0.05, 0.05);
    let gan = BABYLON.Mesh.CreateSphere("GANYMEDE", 16, 5, scene);
    gan.id = "gan";
    gan.parent = gan_p;
    gan.material = gan_mat;
    gan.receivesShadows = true;
    let gan_l = new BABYLON.Mesh("gan_l", scene);
    gan_l.parent = gan;
    gan_l.position = new BABYLON.Vector3(0, 15, 0);
    let gan_target = new BABYLON.Mesh("gan_target", scene);
    gan_target.parent = gan_p;
    gan_target.position = new BABYLON.Vector3(10, 0, 0);
    gan_target.title = gan.name;
    gan_target.info = `Ganymede is the largest moon in our solar system and the only moon known to create its own magnetic field. 
    Scientists have also found strong evidence of an underground ocean on Ganymede.`;
    
    // Io
    let io_p = new BABYLON.Mesh('io_p', scene);
    io_p.parent = jup;
    let io_mat = new BABYLON.StandardMaterial("io_mat", scene);
    io_mat.emissiveTexture = new BABYLON.Texture("textures/io.png", scene);
    io_mat.ambientTexture = new BABYLON.Texture("textures/io.png", scene);
    io_mat.specularColor = new BABYLON.Color3(0.05, 0.05, 0.05);
    let io = BABYLON.Mesh.CreateSphere("IO", 16, 5, scene);
    io.id = "io";
    io.parent = io_p;
    io.material = io_mat;
    io.receivesShadows = true;
    let io_l = new BABYLON.Mesh("io_l", scene);
    io_l.parent = io;
    io_l.position = new BABYLON.Vector3(0, 15, 0);
    let io_target = new BABYLON.Mesh("io_target", scene);
    io_target.parent = io_p;
    io_target.position = new BABYLON.Vector3(12, 0, 0);
    io_target.title = io.name;
    io_target.info = `Io is the most volcanically active world in the solar system, with hundreds of volcanoes, some erupting lava fountains dozens of miles high. 
    Io is caught in a tug-of-war between Jupiter and neighboring moons.`;
    
    // Calisto
    let cal_p = new BABYLON.Mesh('cal_p', scene);
    cal_p.parent = jup;
    let cal_mat = new BABYLON.StandardMaterial("cal_mat", scene);
    cal_mat.emissiveTexture = new BABYLON.Texture("textures/cal.png", scene);
    cal_mat.ambientTexture = new BABYLON.Texture("textures/cal.png", scene);
    cal_mat.specularColor = new BABYLON.Color3(0.05, 0.05, 0.05);
    let cal = BABYLON.Mesh.CreateSphere("CALLISTO", 16, 5, scene);
    cal.id = "cal";
    cal.parent = cal_p;
    cal.material = cal_mat;
    cal.receivesShadows = true;
    let cal_l = new BABYLON.Mesh("cal_l", scene);
    cal_l.parent = cal;
    cal_l.position = new BABYLON.Vector3(0, 15, 0);
    let cal_target = new BABYLON.Mesh("cal_target", scene);
    cal_target.parent = cal_p;
    cal_target.position = new BABYLON.Vector3(12, 0, 0);
    cal_target.title = cal.name;
    cal_target.info = `Callisto is among the most heavily cratered objects that orbit the Sun. 
    It is thought to be a long-dead world, with hardly any geologic activity on its surface—among the oldest landscapes in our solar system.`

    let moons = [eur, gan, io, cal];

    // Add occlusion query to each moon

    moons.forEach((element) => {
        element.occlusionQueryAlgorithmType = BABYLON.AbstractMesh.OCCLUSION_ALGORITHM_TYPE_CONSERVATIVE;
        element.isOccluded = true;
        element.occlusionType = BABYLON.AbstractMesh.OCCLUSION_TYPE_STRICT;
    });

// ===========================
// GUI
// ===========================

    let advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");

    // Button creation 

    let buttons = [];

    let eur_but = BABYLON.GUI.Button.CreateImageOnlyButton("eur_but", "textures/buttons/eur_off.svg");
    let io_but = BABYLON.GUI.Button.CreateImageOnlyButton("io_but", "textures/buttons/io_off.svg");
    let jup_but = BABYLON.GUI.Button.CreateImageOnlyButton("jup_but", "textures/buttons/jup_off.svg");
    let gan_but = BABYLON.GUI.Button.CreateImageOnlyButton("gan_but", "textures/buttons/gan_off.svg");
    let cal_but = BABYLON.GUI.Button.CreateImageOnlyButton("cal_but", "textures/buttons/cal_off.svg");

    buttons.push(
        eur_but,
        io_but,
        jup_but,
        gan_but,
        cal_but,
    );

    buttons.forEach(createButtons)

    function createButtons(item) {
        item.state = "off";
        item.image.stretch = BABYLON.GUI.Image.STRETCH_UNIFORM;
        item.color = "transparent";
        item.width = 0.095;
        item.height = 0.095;
        item.top = "38.5%"
        item.isPointerBlocker = true;
        item.isSelected = false;

        //
        let mobile = window.matchMedia("(max-width: 500px)");
        if (mobile.matches) {
            switch (item) {
                case eur_but:
                    eur_but.left = '-30%';
                    break;
                case io_but:
                    io_but.left = '-15%';
                    break;
                case jup_but:
                    jup_but.left = '0%';
                    break;
                case gan_but:
                    gan_but.left = '15%';
                    break;
                case cal_but:
                    cal_but.left = '30%';
                    break;
                default:
                    throw new Error(item + " is not defined");
            }
        } else {
            switch (item) {
                case eur_but:
                    eur_but.left = '-20%';
                    break;
                case io_but:
                    io_but.left = '-10%';
                    break;
                case jup_but:
                    jup_but.left = '0%';
                    break;
                case gan_but:
                    gan_but.left = '10%';
                    break;
                case cal_but:
                    cal_but.left = '20%';
                    break;
                default:
                    throw new Error(item + " is not defined");
            }  
        }

        let planetName = item.name.split("_").shift();
        let meshTarget = planetName + '_target';

        // Button click states

        item.onPointerUpObservable.add(function () {

            if (item.state === 'on') {
                
            // Turn button off

            item.image.source = "textures/buttons/" + planetName + "_off.svg";
            item.state = "off";
            item.isSelected = false;
            scene.activeCamera.lockedTarget = undefined;

            // Remove panel

            if (document.getElementById("info-panel")) {
                let infoPanel = document.getElementById("info-panel");
                infoPanel.classList.add("collapsed");
                document.querySelector(".collapsed").addEventListener("animationend", () => {
                    infoPanel.parentNode.removeChild(infoPanel);
                })
            }

            // Return camera to default position

            let ease = new BABYLON.CubicEase();
            ease.setEasingMode(BABYLON.EasingFunction.EASINGMODE_EASEINOUT);
            BABYLON.Animation.CreateAndStartAnimation('camDefaultPos', camera, "position", 60, 120, camera.position, new BABYLON.Vector3(0,0,-410), 0, ease);
            BABYLON.Animation.CreateAndStartAnimation('camDefaultRot', camera, "rotation", 60, 120, camera.rotation, new BABYLON.Vector3(0,0,0), 0, ease);
            } else {

                // De-select all buttons and remove label

                buttons.forEach(function(item) {
                    if (item.isSelected == true) {
                        item.image.source = "textures/buttons/" + item.name.split("_").shift() + "_off.svg";
                        item.isSelected = false;
                    }
                });

                if (document.getElementById("label")) {
                    let label = document.getElementById("label");
                    label.parentNode.removeChild(document.getElementById("label"));
                }

                if (document.getElementById("info-panel")) {
                    let infoPanel = document.getElementById("info-panel");
                    infoPanel.classList.add("collapsed");
                    document.querySelector(".collapsed").addEventListener("animationend", () => {
                        infoPanel.parentNode.removeChild(infoPanel);
                    });
                }

                // Turn button on

                item.state = "on";
                item.isSelected = true;
                item.image.source = "textures/buttons/" + planetName + "_on.svg";
                (meshTarget == "jup_target") ? camera.radius = -275 : camera.radius = -30;
                scene.activeCamera.lockedTarget = scene.getMeshByName(meshTarget);

                // Create and open panel

                let infoPanel = document.createElement("div");
                let title = document.createElement("div");
                let close = document.createElement("div");
                let info = document.createElement("div");
                let hr = document.createElement("hr");
                
                title.innerHTML = scene.getMeshByName(meshTarget).title;
                title.classList.add("title");
                close.innerHTML = "&#x2715";
                close.classList.add("close");
                title.appendChild(close);
                info.innerHTML = scene.getMeshByName(meshTarget).info;
                info.classList.add("info");
                infoPanel.appendChild(title);
                infoPanel.appendChild(hr);
                infoPanel.appendChild(info);
                infoPanel.setAttribute("id", "info-panel");
                infoPanel.classList.add("info-panel")
                document.body.appendChild(infoPanel);
                infoPanel.classList.add("open");

                close.addEventListener("click", () => {
                    
                    // Note: Some code is re-used from above, but only works in anonymous functions
                    // Possible bug with BabylonJS, or possible scope issue
                    
                    // Turn all buttons off
                    buttons.forEach(function(item) {
                        if (item.isSelected == true) {
                            item.image.source = "textures/buttons/" + item.name.split("_").shift() + "_off.svg";
                            item.isSelected = false;
                            item.state = "off"; 
                        }
                    });

                    // Remove panel

                    if (document.getElementById("info-panel")) {
                        let infoPanel = document.getElementById("info-panel");
                        infoPanel.classList.add("collapsed");
                        document.querySelector(".collapsed").addEventListener("animationend", () => {
                            infoPanel.parentNode.removeChild(infoPanel);
                        })
                    }

                    // Return camera to default position

                    scene.activeCamera.lockedTarget = undefined;
                    let ease = new BABYLON.CubicEase();
                    ease.setEasingMode(BABYLON.EasingFunction.EASINGMODE_EASEINOUT);
                    BABYLON.Animation.CreateAndStartAnimation('camDefaultPos', camera, "position", 60, 120, camera.position, new BABYLON.Vector3(0,0,-410), 0, ease);
                    BABYLON.Animation.CreateAndStartAnimation('camDefaultRot', camera, "rotation", 60, 120, camera.rotation, new BABYLON.Vector3(0,0,0), 0, ease);

                }, false);
            }
        });
        
        // Button hover states

        item.onPointerEnterObservable.add(function () {
            
            document.body.style.cursor = "pointer";

            if (document.getElementById("info-panel"))
                return;

            if (!document.getElementById("label")) {
                
                let label = document.createElement("span");
                label.setAttribute("id", "label");
                label.zIndex = 1;
                label.textContent = scene.getMeshByID(planetName).name;
                let sty = label.style;
                sty.position = "absolute";
                sty.color = "#ffffff";
                sty.backgroundColor = "none";
                sty.fontSize = "15pt";
                sty.top = "0";
                sty.left = "0";
                sty.fontFamily = "'Questrial', sans-serif";
                sty.letterSpacing = "8px";
                sty.transform = "translate3d(50vw, 50px, 0px)";
                
                document.body.appendChild(label);
                label.classList.add("label-anim");
                
                document.querySelector(".label-anim").addEventListener("animationend", () => {
                    label.classList.remove("label-anim");  
                });
            } 
        });

        item.onPointerOutObservable.add(function () {

            document.body.style.cursor = "default";

            if (document.getElementById("info-panel"))
                return;

            let label = document.getElementById("label");

            if (document.getElementById("label")) {
                label.classList.add("fade-out");
                
                document.querySelector(".fade-out").addEventListener("animationend", () => {
                    label.parentNode.removeChild(document.getElementById("label"));
                });
            }

        });

        advancedTexture.addControl(item);
    }

    // Planet movement & rotation

    let alpha = 0;

    scene.registerBeforeRender(function() {
        
        skybox.rotation.y += 0.0001;
        
        jup_p.rotation.y += 0.003;
     
        eur_p.position = new BABYLON.Vector3(150 * Math.sin(alpha), eur_p.parent.position.y, 150 * Math.cos(alpha));
        eur.rotation.y += .03;
        
        gan_p.position = new BABYLON.Vector3(183.333 * Math.sin(alpha+2), gan_p.parent.position.y, 183.333 * Math.cos(alpha+2));
        gan.rotation.y += .03;
        
        io_p.position = new BABYLON.Vector3(216.666 * Math.sin(alpha+4), io_p.parent.position.y, 216.666 * Math.cos(alpha+4));
        io.rotation.y += .03; 
        
        cal_p.position = new BABYLON.Vector3(250 * Math.sin(alpha+6), cal_p.parent.position.y, 250 * Math.cos(alpha+6));
        cal.rotation.y += .03; 
        
        alpha += 0.0025;
           
    });

    // Label animation and behavior

    scene.onAfterRenderObservable.add(() => {

        if(document.getElementById("label") != undefined) {

            var planet;

            switch(document.getElementById("label").innerHTML) {
                case "EUROPA":
                    planet = eur_l;
                    break;
                case "IO":
                    planet = io_l;
                    break;
                case "JUPITER":
                    planet = jup_l;
                    break;
                case "GANYMEDE":
                    planet = gan_l;
                    break;
                case "CALLISTO":
                    planet = cal_l;
                    break;
                default:
                    planet = undefined;
                    break;
            }

            // Update label position to follow mesh

            vertexScreenCoords = BABYLON.Vector3.Project(
            BABYLON.Vector3.Zero(), planet.getWorldMatrix(),
            scene.getTransformMatrix(),
            camera.viewport.toGlobal(engine.getRenderWidth(true), engine.getRenderHeight(true))
            );

            ofstX = canvas.offsetLeft,
            ofstY = canvas.offsetTop;

            let label = document.getElementById("label");
            label.style.transform = "translate3d(calc(" + (vertexScreenCoords.x + ofstX) + "px - 50%), calc(" + (vertexScreenCoords.y + ofstY) + "px - 90%), 0px)";

            // If mesh is occluded, change opacity

            if(planet.parent.isOccluded && !label.classList.contains("is-occluded")) {
                label.classList.add("is-occluded");
            }

            if(!planet.parent.isOccluded && label.classList.contains("is-occluded")){
                label.classList.add("fade-in");
                label.classList.remove("is-occluded");
            }
            
        }
    });

    return scene;
}

let scene = createScene();

engine.runRenderLoop(function() {
    scene.render()
});
//
window.addEventListener("resize", function() {
    engine.resize()
});