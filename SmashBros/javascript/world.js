var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const canvas = document.querySelector('#c');
renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);
document.body.addEventListener('keydown', onKeyDown, false);
document.body.addEventListener('keyup', onKeyUp, false);

var forward, backward, leftward, rightward;
forward = backward = leftward = rightward = false;

var geometry = new THREE.BoxGeometry();
var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
var cube = new THREE.Mesh(geometry, material);
scene.add(cube);

var world = new OIMO.World({
	timestep: 1 / 60,
	iterations: 8,
	broadphase: 2, // 1 brute force, 2 sweep and prune, 3 volume tree
	worldscale: 1, // scale full world 
	random: true,  // randomize sample
	info: false,   // calculate statistic or not
	gravity: [0, -9.8, 0]
});

var body = world.add({
	type: 'box', // type of shape : sphere, box, cylinder 
	size: [1, 1, 1], // size of shape
	pos: [0, .1, 0], // start position in degree
	rot: [0, 0, 90], // start rotation in degree
	move: true, // dynamic or statique
	density: 1,
	friction: 1,
	restitution: 0.2,
	belongsTo: 1, // The bits of the collision groups to which the shape belongs.
	collidesWith: 0xffffffff // The bits of the collision groups with which the shape collides.
});

var battleGround = world.add({
	type: 'box',
	size: [20, .1, 32],
	pos: [0, 0, 0],
	rot: [0, 0, 0],
	move: false,
	density: 1,
	friction: .2,
	restitution: .2,
	belongsTo: 1
});

///
//var battleGroundgeometry = new THREE.BoxGeometry();
//var battleGroundmaterial = new THREE.MeshBasicMaterial( { color: 0xff0000 } );
//var battleGround = new THREE.Mesh(battleGroundgeometry, battleGroundmaterial );
//scene.add( battleGround );

var texture = new THREE.TextureLoader().load('Ocean.png');
var geometry = new THREE.BoxGeometry(20, .1, 32);
var material = new THREE.MeshBasicMaterial({ map: texture, side: THREE.DoubleSide });
var plane = new THREE.Mesh(geometry, material);
scene.add(plane);
plane.position.set(0, 0, 0);
//plane.rotation.x += 90;

var light = new THREE.PointLight(0xff0000, 1, 100);
light.position.set(1, 1, 1);
scene.add(light);


camera.position.z = 5;
camera.position.y = 1;

var animate = function () {
	requestAnimationFrame(animate);

	// update world
	world.step();
	// and copy position and rotation to three mesh
	cube.position.copy(body.getPosition());
	cube.quaternion.copy(body.getQuaternion());

	updateCharacter();

	renderer.render(scene, camera);
};

animate();

function updateCharacter(){
	var vx = 0;
	var vz = 0;
	if(forward){
		vz += 6;
	}
	if(backward){
		vz += -6;
	}
	if(leftward){
		vx += 6;
	}
	if(rightward){
		vx += -6;
	}

	body.linearVelocity.z = vz;
	body.linearVelocity.x = vx;
}