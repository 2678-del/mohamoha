if (!interaction.member.permissions.has(PermissionFlagsBits.Administrator)) {
    return interaction.reply({
        content: "❌ Seuls les administrateurs peuvent utiliser cette commande.",
        ephemeral: true
    });
}const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

client.once('ready', () => {
  console.log(`Connecté en tant que ${client.user.tag}`);
});

client.on('messageCreate', message => {

  if(message.author.bot) return;

  if(message.content === "!ping"){
      message.reply("Pong !");
    
  }

});

client.login(process.env.TOKEN);
