let styleTemplateMulti = `:root {
	--primary-color: #-primary-to-replace-;
	--secondary-color: #-secondary-to-replace-;
	--accent-color: #-accent-to-replace-;
	--black-color: #000;
}

html {
	font-size: 14px; 
	height: 100vh;
	scroll-behavior: smooth;
  }
  
body {	
	background-color: var(--primary-color);
	color: var(--black-color);
	font-family: sans-serif;
	font-size: 14px;
	height: 100%;
	margin: 0;
 }
  
 * {
	box-sizing: border-box;
}

.header,
.footer {
	align-items: center;
	color: -alternative-color-to-replace-;
	display: flex;
	flex-direction: column;
	justify-content: center;
}

.header {
	background-color: var(--secondary-color);
	height: 15vh;
	position: relative;
	z-index: 20;
}

#nav {
	-webkit-box-align: center;
	    -ms-flex-align: center;
	        align-items: center;
	cursor: pointer;
	display: -webkit-box;
	display: -ms-flexbox;
	display: flex;
	left: 24px;
	position: absolute;
	width: 48px;
}

svg path {
	fill: red;
}

.menu {
	display: -webkit-box;
	display: -ms-flexbox;
	display: flex;
	-webkit-box-orient: horizontal;
	-webkit-box-direction: normal;
	    -ms-flex-direction: row;
	        flex-direction: row;
	left: 0;
	position: absolute;
	top: calc(0px - 25vh);
	-webkit-transition: top	0.5s;
	transition: top	0.5s;
	width: 100vw;
	z-index: 10;
}

.menu.active {
	top: 15vh;
}

.menu-item {
	-webkit-box-align: center;
	    -ms-flex-align: center;
	        align-items: center;
	border: 1px solid #301d04;
	color: -alternative-color-to-replace-;
	display: -webkit-box;
	display: -ms-flexbox;
	display: flex;
	background-color: var(--secondary-color);
	font-size: 18px;
	-webkit-box-flex: 1;
	    -ms-flex-positive: 1;
	        flex-grow: 1;
	-webkit-box-pack: center;
	    -ms-flex-pack: center;
	        justify-content: center;
	padding: 16px;
	width: 15ch;
}

a:link,
a:active,
a:visited {
	color: inherit;
}

.menu-item:hover {
	background-color: var(--accent-color);
}

.menu-link a:hover {
	text-decoration: none;
}

.menu-link,
.menu-link a,
.menu-link a:link,
.menu-link a:active,
.menu-link a:visited {
	color: inherit;
	display: -webkit-box;
	display: -ms-flexbox;
	display: flex;
	-webkit-box-flex: 1;
	    -ms-flex-positive: 1;
	        flex-grow: 1;
			font-weight: 700;
	text-decoration: none;
}

.current {
	filter: brightness(120%);
}

.current:hover {
	filter: brightness(100%);
}

.content {
	line-height: 1.5;
	margin: 0 auto;
	max-width: 600px;
	min-height: 65vh;
	padding: 56px 16px;
}

.footer {
	background-color: var(--accent-color);
	height: 20vh;
}

@media screen and (max-width: 620px) {
	.menu {
		-webkit-box-orient: vertical;
		-webkit-box-direction: normal;
		    -ms-flex-direction: column;
		        flex-direction: column;
	}

	.menu-item {
		width: 100vw;
	}
}`;

export default styleTemplateMulti