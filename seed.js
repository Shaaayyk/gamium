const { Games } = require('./models');

const main = async () => {
  await Games.destroy({
    where: {},
  });

  await Games.bulkCreate([
    {
      name: 'Stay-Wild',
      image_url: 'https://github.com/mtswaim/Stay-Wild-Game/blob/master/Pokeball2.png',
      description: 'Choose any Pokemon your heart desires. Once you have selected a Pokemon you enter the game at one of three different difficulties. The objective of the game is to surivive for as long a possible without being caught by a trainer. Good Luck!',
      reviews: '',
    },
    {
      name: 'Pokemon-Master',
      image_url: 'https://hips.hearstapps.com/digitalspyuk.cdnds.net/16/30/1469435925-maxresdefault-3.jpg?resize=480:*',
      description: 'Battle it out with Pikachu against the dreadful mewtwo. Can you become the next Pokemon Master? Find out now!',
      reviews: '',

    },
  ])
  process.exit()
}

main()