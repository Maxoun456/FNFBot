module.exports = {
    commands: 'fact',
    description: "Sends a random Friday Night Funkin' fact",
    minArgs: 0,
    maxArgs: 0,
    callback: (message, arguments, text) => {
        var facts = ['Boyfriend is canonically 19 years old', "The friday night funkin' boyfriend name is Cam",'Pico has untreated schizophrenia, which is why he never goes anywhere without a gun','Confirmed in a livestream by PhantomArcade, Pico was hired by Daddy Dearest as a mercenary to kill Boyfriend after the events of Week 1, but he does not go through with it.',`Only two songs are playable during Week 2 due to the week's third song, titled "Monster", having been scrapped due to issues pertaining to the song's beatmap`,"The game was originally created for Ludum Dare 47, a game jam event with the theme being 'Stuck in a Loop'.","There is a really small chance that when you lose a battle you get a special game over screen. The chance of getting that screen is 0.1% or 1 in 1000.","Monster and Dadbattle are only 2 songs to use double notes in the entire game","Confirmed by ninjamuffin99, the Mall Santa in week 5 died"]
        const random = Math.floor(Math.random() * facts.length);
        message.channel.send(facts[random]);
    },
}