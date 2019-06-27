import * as Phaser from 'phaser-ce'
import * as WebFont from 'webfontloader'

export class BootState extends Phaser.State {
  
  init () {
    this.stage.backgroundColor = '#EDEEC9'
    this.fontsLoaded = this.fontsLoaded.bind(this)
  }

  preload () {
    this.game.stage.disableVisibilityChange = true; 
    WebFont.load({
      google: {
        families: ['Bangers']
      },
      active: this.fontsLoaded
    })

    let text = this.add.text(this.world.centerX, this.world.centerY, 'loading fonts', { font: '16px Arial', fill: '#dddddd', align: 'center' })
    text.anchor.setTo(0.5, 0.5)

    this.load.image('loaderBg', './assets/images/loader-bg.png')
    this.load.image('loaderBar', './assets/images/loader-bar.png')
  }

  render () {

  }

  fontsLoaded () {
    this.state.start('Splash')
  }
}
