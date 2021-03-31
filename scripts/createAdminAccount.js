/**
 * Creates an admin user account.
 * Usage:
 * ```
 * NODE_ENV=development node scripts/createAdminAccount.js
 * ```
 */

 const inquirer = require('inquirer');
 const chalk = require('chalk');
 
 const db = require('./bootstrap');
 
 const { UsersService } = require('../services');
 const usersService = new UsersService(db);
 
 const run = async () => {
     const questions = [
         {
             type: 'input',
             name: 'name',
             message: 'Name'
         },
         {
             type: 'input',
             name: 'email',
             message: 'Email'
         },
         {
             type: 'input',
             name: 'password',
             message: 'Password'
         },
         {
             type: 'list',
             name: 'role',
             choices: ['admin', 'app', 'user'],
             default: 'admin'
         }
     ];
     const answers = await inquirer.prompt(questions);
     console.log('answers');
     console.log(answers);
     await usersService.createUser(answers);
 };
 
 run()
     .then(process.exit);
 