import { Command } from "commander";
import fs from 'fs/promises';
import dateAndTime from "./date-and-time.js";
import singlePageTemplate from "./src/single-page-template.js";
import multiPageTemplate from "./src/multi-page-template.js";
import multiPageAboutTemplate from "./src/multi-page-about-template.js";
import multiPageContactTemplate from "./src/multi-page-contact-template.js";
import styleTemplateSingle from "./src/style-template-single.js";
import styleTemplateMulti from "./src/style-template-multi.js";
import colorArray from "./src/style-color-array.js";
import lorem from "./src/lorem.js";

const argumentParser = new Command();
argumentParser.option("-b, --build", "Build a site from the template.");
argumentParser.parse();

let pageArgument = argumentParser.args[0];
let titleArgument = argumentParser.args[1];
let colorArgument = argumentParser.args[2];
let pageType = "";
let lowerCaseFolderName = "";
let htmlContentIndex = "";
let styleContent = styleTemplateSingle;
let colorScheme = "random";
let pickedColor = "";
let singleOrMultiMessage = "";

function setPageType() {
	if (pageArgument === "multi" || pageArgument === "-m" || pageArgument === "m") {
		pageType = "multi";
	}
	else if (pageArgument === "single" || pageArgument === "-s" || pageArgument === "s" || pageArgument === undefined) {
		pageType = "single";
	} else {
		return console.log("Did not recognize '" + pageArgument + "'. Try using 'single' or 'multi'.\nFull example: 'npm run start --build single <page title> <color>' More info in the README.md file.");
	};
}
setPageType();

function createFolders() {
	let folderName = `site_${dateAndTime}`;

	if (titleArgument !== undefined) {
		folderName = titleArgument.replace(/ /g, "_");
		lowerCaseFolderName = folderName.toLowerCase();
		lowerCaseFolderName = lowerCaseFolderName.replace(/å/g, "a");
		lowerCaseFolderName = lowerCaseFolderName.replace(/ä/g, "a");
		lowerCaseFolderName = lowerCaseFolderName.replace(/ö/g, "o");
		lowerCaseFolderName = lowerCaseFolderName.replace(/[^a-zA-Z0-9_-]/g, "");
	} else {
		lowerCaseFolderName = folderName;
	}
	
	fs.mkdir(`./public/${lowerCaseFolderName}`, { recursive: true }, (err) => {
		if (err) throw err;
	});

	fs.mkdir(`./public/${lowerCaseFolderName}/styles`, { recursive: true }, (err) => {
		if (err) throw err;
	});

	if (pageType === "multi") {
		fs.mkdir(`./public/${lowerCaseFolderName}/scripts`, { recursive: true }, (err) => {
			if (err) throw err;
		});
	}
}
createFolders();

function setContent() {
	if (pageType === "single") {
		styleContent = styleTemplateSingle;
		htmlContentIndex = singlePageTemplate;
		singleOrMultiMessage = "single"
	}
	else if (pageType === "multi") {
		const multiPageAbout = multiPageAboutTemplate;
		const multiPageContact = multiPageContactTemplate
		const aboutLorem = Math.floor(Math.random() * lorem.length);
		const contactLorem = Math.floor(Math.random() * lorem.length);
		
		styleContent = styleTemplateMulti;
		htmlContentIndex = multiPageTemplate;
		singleOrMultiMessage = "three";

		multiPageAbout = multiPageAbout.replace(/-paragraph-one-to-replace-/, lorem[aboutLorem][0]);
		multiPageAbout = multiPageAbout.replace(/-paragraph-two-to-replace-/, lorem[aboutLorem][1]);
		multiPageContact = multiPageContact.replace(/-paragraph-one-to-replace-/, lorem[contactLorem][0]);
		multiPageContact = multiPageContact.replace(/-paragraph-two-to-replace-/, lorem[contactLorem][1]);
	};
};
setContent();

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

function setStyle() {
	const currentDate = new Date();
	const currentYear = currentDate.getFullYear();
	const randomLorem = Math.floor(Math.random() * lorem.length);

	styleContent = styleContent.replace(/-primary-to-replace-/, colorArray[pickedColor][1]);
	styleContent = styleContent.replace(/-secondary-to-replace-/, colorArray[pickedColor][2]);
	styleContent = styleContent.replace(/-accent-to-replace-/, colorArray[pickedColor][3]);
	
	if (titleArgument === undefined) {
		titleArgument = "Page Title";
	};

	htmlContentIndex = htmlContentIndex.replace(/-title-to-replace-/g, titleArgument);
	htmlContentIndex = htmlContentIndex.replace(/-paragraph-one-to-replace-/, lorem[randomLorem][0]);
	htmlContentIndex = htmlContentIndex.replace(/-paragraph-two-to-replace-/, lorem[randomLorem][1]);
	htmlContentIndex = htmlContentIndex.replace(/-year-to-replace-/, currentYear);

	if (pickedColor === 6 || pickedColor === 9 || pickedColor === 12 || pickedColor === 13 || pickedColor === 15 || pickedColor === 18) {
		styleContent = styleContent.replace(/-header-footer-color-to-replace-/, "#000");
	} else {
		styleContent = styleContent.replace(/-header-footer-color-to-replace-/, "var(--primary-color)");
	}
}
setStyle();

function createPage() {
	const message = `You built a ${singleOrMultiMessage} page website called '${titleArgument}' with the ${colorScheme} color scheme.\nFilepath: public/${lowerCaseFolderName}`;
	
	fs.writeFile("./site/index.html", htmlContentIndex);
	fs.writeFile("./site/styles/style.css", styleContent);

	if (pageType === "multi") {
		fs.writeFile("./site/about.html", multiPageAbout);
		fs.writeFile("./site/contact.html", multiPageContact);
	};

	console.log(message);
}
createPage();