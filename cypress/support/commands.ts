/// <reference types="cypress" />

import * as commonCommands from './commands/common'
import * as profileCommands from './commands/profile'
import * as articleCommands from './commands/article'
import * as commentCommands from './commands/comment'
import * as ratingCommands from './commands/rating'

// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

Cypress.Commands.addAll(commonCommands)
Cypress.Commands.addAll(profileCommands)
Cypress.Commands.addAll(articleCommands)
Cypress.Commands.addAll(commentCommands)
Cypress.Commands.addAll(ratingCommands)
