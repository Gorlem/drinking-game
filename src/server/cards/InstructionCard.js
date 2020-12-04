import _ from 'lodash';
import fs from 'fs';

import Card from './Card.js';

const instructions = JSON.parse(fs.readFileSync('src/server/data/instructions.json'));

export default class InstructionCard extends Card {
  constructor(room) {
    super(room, 'InstructionCard');

    const instruction = _.sample(instructions);
    const players = _.chain(room.users)
      .map('name')
      .shuffle()
      .value();

    this.data.title = _.template(instruction.title)({ players });
    this.data.message = _.template(instruction.message)({ players });
  }
}
