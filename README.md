# stunning-octo-waddle

## Description

This application is a command-line exclusive program that allows users to create and enter various departments, roles, and employees into a database in order to be
viewed whenever needed. Using node.js for operating and handling the input and database queries, and mySQL in order to handle the backend database storage and requests.
This project was a fantastic exercise and look into just how one can impliment a combination of user inputs into proper storage without relying on filesystems to do so.

## Installation

After downloading or cloning the repository, you will first want to make sure all required modules have been installed through the command 'npm install', afterwards you
will want to create your own .env file with your credentials to access your mysql interface. Once both of those have been done, launch mysql and be sure to set up the
schema with 'source ./db/schema.sql', you may then optionally run the seed with 'source ./db/seed.sql' if you wish to pre-seed the database, otherwise the application
should be good to run from bash with 'node index.js'

## Usage

Once the project has been installed correctly, initialize it from git bash with 'node index.js', from there, a console menu will appear that one can navigate with the arrow keys and the enter key. After choosing any given prompt labelled 'View', you will have the contents of the respective mysql table be printed to the console in a table format (You may need to expand your console a bit if it cuts off) and be brought back to choose another menu option. After choosing the add or update related options, you be prompted with more inputs based on how many columns are in a given table, the project as it stands uses ID's predominately in reference to manager, department, and role ID inquiries, so be sure to put the appropriate ID number in, instead of a string! Once you are done with all the inputs and viewing of the respective tables, use control+C to exit and terminate the application.

[Link to a demo video](https://drive.google.com/file/d/1eveOGeOvrZBkXv6McEM0fRtTGyZqDaal/view)

## Credits

[Node.js](https://nodejs.org/en/)

[mysql2](https://www.npmjs.com/package/mysql2)

[Inquirer](https://www.npmjs.com/package/inquirer)

[console.table package](https://www.npmjs.com/package/console.table)

## License

This project is licensed by MIT: Do as you will, don't blame me if it breaks.
