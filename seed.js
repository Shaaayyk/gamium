const { User, Game } = require('./models');

const main = async () => {

  await Game.destroy({
    where: {},
  });
  await User.destroy({
    where: {},
  })

  const admin = await User.create({
    username: 'admin',
    password_digest: '$2b$11$.nYwXq1np8noZ.0GMQAb5ebyYVFQpaRQrs4.G4SapO5iQhFaScDwe'
  })

  const stayWild = await Game.create({
    name: 'Stay-Wild',
    image_url: 'https://i.imgur.com/k4XRxjk.png',
    description: 'Choose any Pokemon your heart desires. Once you have selected a Pokemon you enter the game at one of three different difficulties. The objective of the game is to surivive for as long a possible without being caught by a trainer. Good Luck!',
  });
  const pokemonMaster = await Game.create({
    name: 'Pokemon-Master',
    image_url: 'https://i.imgur.com/hpwiNCS.png',
    description: 'Battle it out with Pikachu against the dreadful mewtwo. Can you become the next Pokemon Master? Find out now!',
  });
  const deckBuilder = await Game.create({
    name: 'Deck-Builder',
    image_url: 'https://i.imgur.com/yEnXMek.png',
    description: 'Choose your cards wisely! Discover hundreds of cards to add to your deck with each attempt at climbing the Spire. Select cards that work together to efficiently dispatch foes and reach the top.',
  });
  const horrorGallery = await Game.create({
    name: 'Angies Horror Gallery',
    image_url: 'https://i.imgur.com/gmns0sR.png',
    description: 'This will be a web app where the user will play games the purpose of this app is for horror fans to stop by and have a little fun. the first three game ideas are:',
  });

  await admin.addGame([stayWild, pokemonMaster, deckBuilder, horrorGallery])


  process.exit()
}

main()