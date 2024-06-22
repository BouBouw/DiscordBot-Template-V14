const { readdirSync } = require('node:fs');
const { lstat } = require('node:fs/promises');
const { join } = require('node:path');

const CommandSize = (client) => {
    return client.commands.size
}

const CategorySize = (client) => {
    const categories = [];

    client.commands.map((command, index) => {
        if(categories.includes(command.description)) return;

        categories.push(command.description);
    });

    return categories.length;
}

const GetCategoryByPage = async (client, page) => {
    const categories = [];

    await client.commands.map((command) => {
        if(categories.includes(command.description)) return;

        categories.push(command.description);
    });

    return categories[Number(page - 1)];
}

const GetCommandByCategories = async (client, page) => {
    const categories = [];
    const commands = [];

    await client.commands.map((command) => {
        if(categories.includes(command.description)) return;

        categories.push(command.description);
    });

    await client.commands.map((command) => {
        console.log(categories[Number(page - 1)]);

        if(command.description === categories[Number(page - 1)]) {
            commands.push(`\`${command.name}\``);
        }
    });

    return commands;
}

const GetAllCommands = {
    CommandSize,
    CategorySize,
    GetCategoryByPage,
    GetCommandByCategories
}

module.exports = GetAllCommands;