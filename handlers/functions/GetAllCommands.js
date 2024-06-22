const { readdirSync } = require('node:fs');
const { lstat } = require('node:fs/promises');
const { join } = require('node:path');

const GetAllCommands = async (client, directory = './src/commands') => {
    readdirSync(directory).flatMap(async (path) => {
        const location = join(directory, path)
        const stat = await lstat(location);

        if (stat.isFile()) {
            const command = await require(join(process.cwd(), location))

            console.log(command)
            return command;
        }
    })
}

module.exports = GetAllCommands;