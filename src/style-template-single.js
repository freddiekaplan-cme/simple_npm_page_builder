let styleTemplateSingle = `:root {
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
	color: #000;
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
	height: 20vh;
	justify-content: center;
}

.header {
	background-color: var(--secondary-color);
}

.content {
	line-height: 1.5;
	margin: 0 auto;
	max-width: 600px;
	min-height: 60vh;
	padding: 56px 16px;
	}

.content-item {
	font-size: 20px;
	margin-bottom: 12px;
}

.results {
	font-weight: 700;
}

.footer {
	background-color: var(--accent-color);
}`;

export default styleTemplateSingle