const {
    Client,
    GatewayIntentBits,
    REST,
    Routes,
    SlashCommandBuilder,
    PermissionFlagsBits
} = require("discord.js");

const client = new Client({
    intents: [GatewayIntentBits.Guilds]
});

client.once("ready", async () => {

    console.log(`${client.user.tag} est connecté.`);

    const commands = [

        new SlashCommandBuilder()
            .setName("say")
            .setDescription("Envoie un message (admin uniquement)")
            .addStringOption(option =>
                option
                    .setName("texte")
                    .setDescription("Le texte à envoyer")
                    .setRequired(true)
            )
            .addIntegerOption(option =>
                option
                    .setName("nombre")
                    .setDescription("Nombre de répétitions (1 à 100)")
                    .setRequired(true)
                    .setMinValue(1)
                    .setMaxValue(100)
            )
            .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)

    ].map(cmd => cmd.toJSON());

    const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);

    try {

        await rest.put(
            Routes.applicationGuildCommands(
                "1519768361163161700",
                "1519767349312487575"
            ),
            { body: commands }
        );

        console.log("Commande /say enregistrée.");

    } catch (err) {
        console.error(err);
    }

});

client.on("interactionCreate", async interaction => {

    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName !== "say") return;

    if (!interaction.member.permissions.has(PermissionFlagsBits.Administrator)) {
        return interaction.reply({
            content: "❌ Cette commande est réservée aux administrateurs.",
            ephemeral: true
        });
    }

    const texte = interaction.options.getString("texte");
    const nombre = interaction.options.getInteger("nombre");

    await interaction.reply({
        content: `✅ Envoi du message ${nombre} fois.`,
        ephemeral: true
    });

    for (let i = 0; i < nombre; i++) {

        await interaction.channel.send(texte);

        if (i < nombre - 1) {
            await new Promise(resolve => setTimeout(resolve, 10));
        }
    }

});

client.login(process.env.TOKEN);
