
function onKeyDown() {
	switch (event.keyCode) {
		case 83: // up
			forward = true;
			//camera.position.z += 1;
			break;
		case 87: // down
			backward = true;
			//camera.position.z -= 1;
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
			currentPosX += .1;
			var changex = currentPosX;
			camera.position.x = Math.sin(changex) * 5; 

			currentPosY += .1;
			var changey = currentPosY;
			camera.position.z = Math.cos(changey) * 5;

			console.log("x:", changex);
			console.log("y:", changey);
			break;
		case 39: // right
		currentPosX -= .1;
		var changex = currentPosX;
		camera.position.x = Math.sin(changex) * 5; 

		currentPosY -= .1;
		var changey = currentPosY;
		camera.position.z = Math.cos(changey) * 5;
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
	}
}