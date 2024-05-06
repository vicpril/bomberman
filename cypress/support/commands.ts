/// <reference types="cypress" />

import * as commonCommands from './commands/common'
import * as profileCommands from './commands/profile'

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
