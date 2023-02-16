Simple Page Builder

WHERE TO START
Build a simple site with a few commands in the terminal, starting with "npm run start" or "npm run build". Sites are built in the "sites" folder.

COMMAND OPTIONS ARE ... OPTIONAL
There is only one command option: "--build" or "-b". It's not mandatory to use, the script will still run the build command without it.

ARGUMENTS
Here's where the fun starts, you can put in your own arguments in a specific order to create your simple website:

"Type" "Name" "Color"

Make sure to specify each argument going up to the one you are interested in, you can't leave an earlier argument blank. So to be able to choose a color scheme you will need to specify both the type of page you want and the name.

1. Page type. Single is the defualt.

	Choose between a single page website or a multiple page site, including three pages and responsive menu.

	Single page website
	"single", "-s" or "s"

	Ex. npm run start single

	Multiple page website
	"multiple", "multi", "-m" or "m"

	Ex. npm run start m

2. Site name. "Page Title" is the default.

	The chosen site name will appear as the title of the page and in the header, as well as the name of created folder. Names with spaces needs to be inside single or double quotes.

	Ex. npm run build single "My Page"

3. Color scheme. The default is a random color scheme.

	The current version of the Simple page builder includes 19 different color schemes:

	"gray"
	"mint"
	"colorful"
	"purple"
	"blue"
	"gaudy"
	"yellow"
	"tricolor"
	"green"
	"ice"
	"peach"
	"brown"
	"orange"
	"pink"
	"red"
	"turqoise"
	"moody"
	"sunset"
	"paper"

	Ex. npm run start multi "Office Supplies For You" paper