
function onKeyDown() {
	switch (event.keyCode) {
		case 83: // up
			forward = true;
			break;
		case 87: // down
			backward = true;
			break;
		case 65: // up
			rightward = true;
			break;
		case 68: // down
			leftward = true;
			break;

		//camera code
		case 38: // up
			camera.position.y += 1;
			break;
		case 40: // down
			camera.position.y -= 1;
			break;
		case 37: // left
			camera.position.x -= 1;
			break;
		case 39: // right
			camera.position.x += 1;
			break;
	}
}

function onKeyUp() {
	switch (event.keyCode) {
		case 83: // w
			forward = false;
			break;
		case 87: // s
			backward = false;
			break;
		case 65: // a
			rightward = false;
			break;
		case 68: // d
			leftward = false;
			break;


		//camera code
		case 38: // up
			camera.position.y += 1;
			break;
		case 40: // down
			camera.position.y -= 1;
			break;
		case 37: // left
			camera.position.x -= 1;
			break;
		case 39: // right
			camera.position.x += 1;
			break;
	}
}