import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import '../static/global.scss';
import '../assets/models/scene.gltf'
import '../assets/models/scene.bin'

let renderer, scene, camera, controls

function init() {
    renderer = new THREE.WebGLRenderer({alpha: true, antialias: true});
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.shadowMap.enabled = true;
    document.body.appendChild( renderer.domElement );
    



    scene = new THREE.Scene();
    scene.background = new THREE.Color('gray');
    
    camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
    camera.position.z = 5;
    camera.position.x = 5;
    camera.position.y = 2;
    camera.lookAt(0, 0, 0);

    controls = new OrbitControls( camera, renderer.domElement );

    var pointLight = new THREE.PointLight('white');
    pointLight.position.set( 15, 10, 10 );
    pointLight.add(new THREE.Mesh(
            new THREE.SphereGeometry(1, 10, 10),
            new THREE.MeshBasicMaterial({
                color: 'white'
            })));
    pointLight.castShadow = true;
    scene.add(pointLight);

    {
        const loader = new GLTFLoader();

        loader.load( 'assets/models/scene.gltf', function ( glft ) {
            glft.scene.position.set(0, -10, 0)
            scene.add( glft.scene);

            controls.update();
            renderer.render(scene, camera)
        }, function ( xhr ) {

            console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
    
        }, function ( error ) {

            console.error( error );

        } );
    }

    renderer.render(scene, camera)
}
function animate() {
    controls.update();
    requestAnimationFrame ( animate );  
    renderer.render (scene, camera);
}
init();
animate();