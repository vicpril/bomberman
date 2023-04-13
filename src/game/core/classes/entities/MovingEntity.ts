import { GRID, NUM_COLS, NUM_ROWS } from '../../config'
import { DIRECTIONS, Movements } from '../../types/DirectionsType'
import { EntitiesTypes } from '../../types/EntitiesTypes'
import { Position } from '../../types/PositionType'
import { AbstractEntity, AbstractEntityOptions } from './AbstractEntity'

function isPosInFrame(pos: Position): boolean {
  return pos.x > 0 && pos.x < NUM_COLS - 1 && pos.y > 0 && pos.y < NUM_ROWS - 1
}

export type MovingEntityOptions = AbstractEntityOptions & {
  speed: number,
}

export abstract class MovingEntity extends AbstractEntity {
  abstract type: EntitiesTypes

  abstract coords: Position

  private isStoping: boolean = false

  nextPos: Position | null = null

  speed: number

  protected direction: Movements = Movements.NONE

  // eslint-disable-next-line no-undef
  private intervalID: ReturnType<typeof setTimeout>

  constructor({ speed, BF, pos }: MovingEntityOptions) {
    super({ BF, pos })
    this.speed = speed
    this.intervalID = setInterval(() => {
      this.refresh(1000 / 50)
    }, 1000 / 50)
  }

  protected getNextPos(direction: Movements): Position {
    return {
      x: this.pos.x + DIRECTIONS[direction].x,
      y: this.pos.y + DIRECTIONS[direction].y,
    }
  }

  destroy() {
    clearInterval(this.intervalID)
  }

  protected abstract isMovingAvailable: (direction: Movements) => boolean

  moveOn(direction: Movements): void {
    if (direction === Movements.NONE) {
      this.moveOff()
      return
    }
    if (this.direction === Movements.NONE) {
      if (!this.isMovingAvailable(direction)) return
      this.isStoping = false
      this.direction = direction
    }
  }

  moveOff(): void {
    this.isStoping = true
  }

  refresh(dt: number) {
    if (this.direction !== Movements.NONE) {
      this.nextPos = this.nextPos ?? this.getNextPos(this.direction)

      if (!isPosInFrame(this.nextPos)) {
        this.moveOff()
        this.replacePosition()
        return
      }

      switch (this.direction) {
        case Movements.UP:
        case Movements.DOWN:
          this.coords.y = this.calculateCoords('y', dt)
          break

        case Movements.RIGHT:
        case Movements.LEFT:
          this.coords.x = this.calculateCoords('x', dt)
          break

        default:
          break
      }

      // replace if coords on next CELL
      if (
        Math.abs(this.coords.x - (this.pos.x + 0.5) * GRID) > GRID
      || Math.abs(this.coords.y - (this.pos.y + 0.5) * GRID) > GRID
      ) {
        this.replacePosition()
      }
    }
  }

  private calculateCoords(i: 'x'|'y', dt: number): number {
    if (this.nextPos) {
      // eslint-disable-next-line no-mixed-operators
      const increment = (this.nextPos[i] - this.pos[i]) * GRID / this.speed * dt

      const coord = this.coords[i] + increment

      const offFrameX = (coord + 0.5 * GRID > NUM_COLS * GRID) || (coord - 0.5 * GRID < 0)

      const offFrameY = (coord + 0.5 * GRID > NUM_ROWS * GRID) || (coord - 0.5 * GRID < 0)

      if ((i === 'x' && offFrameX) || (i === 'y' && offFrameY)) {
        return this.coords[i]
      }

      return coord
    }

    return this.coords[i]
  }

  private replacePosition() {
    // replace position and check next moving available
    if (this.nextPos && isPosInFrame(this.nextPos)) {
      if (this.BF.getCell(this.pos) === this.type) {
        this.BF.clearCell(this.pos)
      }
      this.pos = this.nextPos
      this.BF.setCell(this.pos, this.type)
      this.nextPos = null

      if (!this.isMovingAvailable(this.direction)) {
        this.direction = Movements.NONE
      }
    }

    // if Entity is stopping clear direction after replacePosition
    if (this.isStoping) {
      this.direction = Movements.NONE
      this.isStoping = false
      this.coords = {
        x: (this.pos.x + 0.5) * GRID,
        y: (this.pos.y + 0.5) * GRID,
      }
      this.nextPos = null
    }
  }
}
