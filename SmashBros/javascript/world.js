
var currentPosX = 0;
var currentPosY = 1;

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

var texture = new THREE.TextureLoader().load('./textures/Torchie.png');
var geometry = new THREE.BoxGeometry();
var material = new THREE.MeshBasicMaterial({ map: texture, side: THREE.DoubleSide });
var cube = new THREE.Mesh(geometry, material);
scene.add(cube);

//-------------------------------------------------------------
var light = new THREE.PointLight(0xff0000, 1, 100);
light.position.set(1, 1, 1);
scene.add(light);

camera.position.z = 3;
camera.position.y = 3;
//new THREE.OrbitControls( camera, renderer.domElement );
camera.lookAt(cube.position);
//-------------------------------------------------------------------

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

var enemyO = world.add({
	type: 'box', // type of shape : sphere, box, cylinder 
	size: [1, 1, 1], // size of shape
	pos: [0, .1, -10], // start position in degree
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
	size: [5, .1, 25],
	pos: [0, 0, 0],
	rot: [0, 0, 0],
	move: false,
	density: 1,
	friction: .2,
	restitution: .2,
	belongsTo: 1
});

var battleGroundTwo = world.add({
	type: 'box',
	size: [30, .1, 5],
	pos: [12.5, 0, 15],
	rot: [0, 0, 0],
	move: false,
	density: 1,
	friction: .2,
	restitution: .2,
	belongsTo: 1
});

var battleGroundThree = world.add({
	type: 'box',
	size: [5, .1, 25],
	pos: [25, 0, 0],
	rot: [0, 0, 0],
	move: false,
	density: 1,
	friction: .2,
	restitution: .2,
	belongsTo: 1
});

var battleGroundFour = world.add({
	type: 'box',
	size: [30, .1, 5],
	pos: [12.5, 0, -15],
	rot: [0, 0, 0],
	move: false,
	density: 1,
	friction: .2,
	restitution: .2,
	belongsTo: 1
});

var texture = new THREE.TextureLoader().load('./textures/goose.png');
var geometry = new THREE.BoxGeometry();
var material = new THREE.MeshBasicMaterial({ map: texture, side: THREE.DoubleSide });
var enemy = new THREE.Mesh(geometry, material);
scene.add(enemy);
///


//This is the battle Ground!!!!!

var texture = new THREE.TextureLoader().load('./textures/grass.jpg');
var geometry = new THREE.BoxGeometry(5, .1, 25);
var material = new THREE.MeshBasicMaterial({ map: texture, side: THREE.DoubleSide });
var plane = new THREE.Mesh(geometry, material);
scene.add(plane);
plane.position.set(0, 0, 0);

var texture = new THREE.TextureLoader().load('./textures/grass.jpg');
var geometry = new THREE.BoxGeometry(30, .1, 5);
var material = new THREE.MeshBasicMaterial({ map: texture, side: THREE.DoubleSide });
var plane = new THREE.Mesh(geometry, material);
scene.add(plane);
plane.position.set(12.5,0, 15);


var texture = new THREE.TextureLoader().load('./textures/grass.jpg');
var geometry = new THREE.BoxGeometry(5, .1, 25);
var material = new THREE.MeshBasicMaterial({ map: texture, side: THREE.DoubleSide });
var plane = new THREE.Mesh(geometry, material);
scene.add(plane);
plane.position.set(25,0, 0);

var texture = new THREE.TextureLoader().load('./textures/grass.jpg');
var geometry = new THREE.BoxGeometry(30, .1, 5);
var material = new THREE.MeshBasicMaterial({ map: texture, side: THREE.DoubleSide });
var plane = new THREE.Mesh(geometry, material);
scene.add(plane);
plane.position.set(12.5,0, -15);
//----------------------------------------------------------------------------------------------

var texture = new THREE.TextureLoader().load('./textures/Instruct.png');
var geometry = new THREE.BoxGeometry(30, 10, 1);
var material = new THREE.MeshBasicMaterial({ map: texture, side: THREE.DoubleSide });
var plane = new THREE.Mesh(geometry, material);
scene.add(plane);
plane.position.set(15,5, -20);


//--------------------------------------------------------------------------

var animate = function () {
	requestAnimationFrame(animate);

	// update world
	world.step();
	// and copy position and rotation to three mesh
	cube.position.copy(body.getPosition());
	cube.quaternion.copy(body.getQuaternion());

	
enemy.position.copy(enemyO.getPosition());
enemy.quaternion.copy(enemyO.getQuaternion());


	updateCharacter();
	ai();
	camera.position.z = cube.position.z + 3;
	camera.position.x = cube.position.x - 3;
	camera.lookAt(cube.position);
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

function ai()
{
	var attackZ = enemy.position.z - cube.position.z;
	var attackX = enemy.position.x - cube.position.x;
	if (enemy.position.y < -4)
	{
		enemy.position = cube.position;
	}

	if ( attackZ < 0)
	{
		enemyO.linearVelocity.z +=6;
	}
	else
	{
		enemyO.linearVelocity.z -=6;
	}

	if ( attackX < 0)
	{
		enemyO.linearVelocity.x +=6;
	}
	else
	{
		enemyO.linearVelocity.x -=6;
	}
}