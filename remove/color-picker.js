const style = `if (e === "gray") {
	pickedColor = 0;
	colorScheme = "gray";
	}
	else if (e === "mint") {
		pickedColor = 1;
		colorScheme = "mint";
	}
	else if (e === "colorful") {
		pickedColor = 2;
		colorScheme = "colorful";
	}
	else if (e === "purple") {
		pickedColor = 3;
		colorScheme = "purple";
	}
	else if (e === "blue") {
		pickedColor = 4;
		colorScheme = "blue";
	}
	else if (e === "gaudy") {
		pickedColor = 5;
		colorScheme = "gaudy";
	}
	else if (e === "yellow") {
		pickedColor = 6;
		colorScheme = "yellow";
	}
	else if (e === "tricolor") {
		pickedColor = 7;
		colorScheme = "tricolor";
	} 
	else if (e === "green") {
		pickedColor = 8;
		colorScheme = "green";
	}
	else if (e === "ice") {
		pickedColor = 9;
		colorScheme = "ice";
	}
	else if (e === "peach") {
		pickedColor = 10;
		colorScheme = "peach";
	}
	else if (e === "brown") {
		pickedColor = 11;
		colorScheme = "brown";
	}
	else if (e === "orange") {
		pickedColor = 12;
		colorScheme = "orange";
	}
	else if (e === "pink") {
		pickedColor = 13;
		colorScheme = "pink";
	}
	else if (e === "red") {
		pickedColor = 14;
		colorScheme = "red";
	}
	else if (e === "turqoise") {
		pickedColor = 15;
		colorScheme = "turqoise";
	}
	else if (e === "moody") {
		pickedColor = 16;
		colorScheme = "moody";
	}
	else if (e === "sunset") {
		pickedColor = 17;
		colorScheme = "sunset";
	}
	else if (e === "paper") {
		pickedColor = 18;
		colorScheme = "paper";
	}
	else {
		pickedColor = Math.floor(Math.random() * colorArray.length);
	}`

	export default style