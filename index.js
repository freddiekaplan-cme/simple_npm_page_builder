import { Command } from "commander";
import fs from 'fs/promises';
import singlePageTemplate from "./src/single-page-template.js";
import multiPageTemplate from "./src/multi-page-template.js";
import styleTemplateSingle from "./src/style-template-single.js";
import styleTemplateMulti from "./src/style-template-multi.js";
import colorArray from "./src/style-color-array.js";

const argumentParser = new Command();
argumentParser.option("-b, --build", "Build a site from the template.");
argumentParser.parse();
let pageArgument = argumentParser.args[0];
let titleArgument = argumentParser.args[1];
let colorArgument = argumentParser.args[2];
let htmlContentIndex = "";
let styleContent = styleTemplateSingle;
let colorScheme = "random";
let pickedColor = "";
let singleOrMultiMessage = "";

function colorPicker() {
	for (let i = 0; i < colorArray.length; i++) {
		if (colorArgument === colorArray[i][0]) {
			colorScheme = colorArray[i][0];
			return pickedColor = i;
		} else {
			pickedColor = Math.floor(Math.random() * colorArray.length);
			colorScheme = colorArray[pickedColor][0];
		}
	}
}
colorPicker();

function setStyleColor() {
	if (pageArgument === "multi" || pageArgument === "-m" || pageArgument === "m") {
		styleContent = styleTemplateMulti;
		htmlContentIndex = multiPageTemplate;
		singleOrMultiMessage = "three";
	} 
	else if (pageArgument === "single" || pageArgument === "-s" || pageArgument === "s" || pageArgument === undefined) {
		styleContent = styleTemplateSingle;
		htmlContentIndex = singlePageTemplate;
		singleOrMultiMessage = "single"
	};

	if (titleArgument === undefined) {
		titleArgument = "Page Title";
	};

	styleContent = styleContent.replace(/-primary-to-replace-/, colorArray[pickedColor][1]);
	styleContent = styleContent.replace(/-secondary-to-replace-/, colorArray[pickedColor][2]);
	styleContent = styleContent.replace(/-accent-to-replace-/, colorArray[pickedColor][3]);

	if (pickedColor === 6 || pickedColor === 9 || pickedColor === 12 || pickedColor === 13 || pickedColor === 18) {
		styleContent = styleContent.replace(/-header-footer-color-to-replace-/, "#000");
	} else {
		styleContent = styleContent.replace(/-header-footer-color-to-replace-/, "var(--primary-color)");
	}
}
setStyleColor();

function createPage() {
	const message = `You built a ${singleOrMultiMessage} page website with the ${colorScheme} color scheme inside the site folder.`;

	htmlContentIndex = htmlContentIndex.replace(/-title-to-replace-/g, titleArgument);
	fs.writeFile("./site/index.html", htmlContentIndex);
	fs.writeFile("./site/styles/style.css", styleContent);
	console.log(message);
	console.log("Title: " + titleArgument);
}
createPage();