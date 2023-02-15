import { Command } from "commander";
import fs from 'fs/promises';
import dateAndTime from "./date-and-time.js";
import singlePageTemplate from "./src/single-page-template.js";
//import multiPageTemplate from "./src/multi-page-template.js";
import multiPageAboutTemplate from "./src/multi-page-about-template.js";
import multiPageContactTemplate from "./src/multi-page-contact-template.js";
import { headerTemplate, menuHeaderTemplate, menuIndex, menuAbout, menuContact } from "./src/menu-template.js";
import styleTemplateSingle from "./src/style-template-single.js";
import styleTemplateMulti from "./src/style-template-multi.js";
//import scriptTemplate from "./src/script-template.js";
import colorArray from "./src/style-color-array.js";
import lorem from "./src/lorem.js";
//import { format } from "path";

const argumentParser = new Command();
argumentParser.option("-b, --build", "Build a site from the template.");
argumentParser.parse();

let pageArgument = argumentParser.args[0];
let titleArgument = argumentParser.args[1];
let colorArgument = argumentParser.args[2];
let pageType = "";
let lowerCaseFolderName = "";
let htmlContentIndex = singlePageTemplate;
let htmlContentAbout = singlePageTemplate;
let htmlContentContact = singlePageTemplate;
let styleContent = styleTemplateSingle;
let colorScheme = "";
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
	
	fs.mkdir(`./sites/${lowerCaseFolderName}`, { recursive: true }, (err) => {
		if (err) throw err;
	});

	fs.mkdir(`./sites/${lowerCaseFolderName}/styles`, { recursive: true }, (err) => {
		if (err) throw err;
	});

	if (pageType === "multi") {
		fs.mkdir(`./sites/${lowerCaseFolderName}/scripts`, { recursive: true }, (err) => {
			if (err) throw err;
		});
	}
}
createFolders();

function setContent() {
	const currentDate = new Date();
	const currentYear = currentDate.getFullYear();
	const indexLorem = Math.floor(Math.random() * lorem.length);

	if (titleArgument === undefined) {
		titleArgument = "Page Title";
	};

	htmlContentIndex = htmlContentIndex.replace(/-title-to-replace-/g, titleArgument);
	htmlContentIndex = htmlContentIndex.replace(/-paragraph-one-to-replace-/, lorem[indexLorem][0]);
	htmlContentIndex = htmlContentIndex.replace(/-paragraph-two-to-replace-/, lorem[indexLorem][1]);
	htmlContentIndex = htmlContentIndex.replace(/-year-to-replace-/, currentYear);

	if (pageType === "single") {
		htmlContentIndex = htmlContentIndex.replace(/-header-to-replace-/, headerTemplate);
		htmlContentIndex = htmlContentIndex.replace(/-menu-to-replace-/, "");
		styleContent = styleTemplateSingle;
		singleOrMultiMessage = "single"
	}
	else if (pageType === "multi") {
		const aboutLorem = Math.floor(Math.random() * lorem.length);
		const contactLorem = Math.floor(Math.random() * lorem.length);
		
		styleContent = styleTemplateMulti;
		singleOrMultiMessage = "three";

		htmlContentIndex = htmlContentIndex.replace(/-header-to-replace-/, menuHeaderTemplate);
		htmlContentIndex = htmlContentIndex.replace(/-menu-to-replace-/, menuIndex);
		htmlContentAbout = htmlContentAbout.replace(/-title-to-replace-/g, "About");
		htmlContentAbout = htmlContentAbout.replace(/-header-to-replace-/, menuHeaderTemplate);
		htmlContentAbout = htmlContentAbout.replace(/-menu-to-replace-/, menuAbout);
		htmlContentAbout = htmlContentAbout.replace(/-paragraph-one-to-replace-/, lorem[aboutLorem][0]);
		htmlContentAbout = htmlContentAbout.replace(/-paragraph-two-to-replace-/, lorem[aboutLorem][1]);
		htmlContentAbout = htmlContentAbout.replace(/-year-to-replace-/, currentYear);
		htmlContentContact = htmlContentContact.replace(/-title-to-replace-/g, "Contact");
		htmlContentContact = htmlContentContact.replace(/-menu-to-replace-/, menuContact);
		htmlContentContact = htmlContentContact.replace(/-header-to-replace-/, menuHeaderTemplate);
		htmlContentContact = htmlContentContact.replace(/-paragraph-one-to-replace-/, lorem[contactLorem][0]);
		htmlContentContact = htmlContentContact.replace(/-paragraph-two-to-replace-/, lorem[contactLorem][1]);
		htmlContentContact = htmlContentContact.replace(/-year-to-replace-/, currentYear);
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
	styleContent = styleContent.replace(/-primary-to-replace-/, colorArray[pickedColor][1]);
	styleContent = styleContent.replace(/-secondary-to-replace-/, colorArray[pickedColor][2]);
	styleContent = styleContent.replace(/-accent-to-replace-/, colorArray[pickedColor][3]);

	if (pickedColor === 6 || pickedColor === 9 || pickedColor === 12 || pickedColor === 13 || pickedColor === 15 || pickedColor === 18) {
		styleContent = styleContent.replace(/-header-footer-color-to-replace-/, "#000");
	} else {
		styleContent = styleContent.replace(/-header-footer-color-to-replace-/, "var(--primary-color)");
	}
}
setStyle();

function createPage() {
	const message = `You built a ${singleOrMultiMessage} page website called '${titleArgument}' with the ${colorScheme} color scheme.\nFilepath: sites/${lowerCaseFolderName}`;
	
	fs.writeFile(`./sites/${lowerCaseFolderName}/index.html`, htmlContentIndex);
	fs.writeFile(`./sites/${lowerCaseFolderName}/styles/style.css`, styleContent);

	if (pageType === "multi") {
		fs.writeFile(`./sites/${lowerCaseFolderName}/about.html`, htmlContentAbout);
		fs.writeFile(`./sites/${lowerCaseFolderName}/contact.html`, htmlContentContact);
		//fs.writeFile(`./sites/${lowerCaseFolderName}/scripts/script.js`, scriptTemplate);
	};

	console.log(message);
}
createPage();