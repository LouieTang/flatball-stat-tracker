import Player from "../models/mongodbModels.js";

export const createPlayer = async (req, res) => {
    try{
        const player = new Player(req.body);
        await player.save();
        res.send(`Player with name ${player.firstName} added to the database.`);
    } catch (error){
        console.error(error);
        res.status(500).send('Error adding user to the database.');
    }
}

export const getPlayers = async (req, res) => {
    try{
        const players = await Player.find({});
        res.send(players);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error getting players from the database.');
    }
}

export const getSinglePlayer = async (req, res) => {
    try{
        const {_id} = req.params;
        const player = await Player.findById(_id);
        res.send(player);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error getting player from the database.');
    }
}

export const deleteSinglePlayer = async (req, res) => {
    try{
        const {_id} = req.params;
        await Player.findByIdAndRemove(_id);
        res.send(`Player with id ${_id} has been deleted.`);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error deleting player from the database.');
    }
}

export const patchSinglePlayer = async (req, res) => {
    try{
        const {_id} = req.params;
        const {firstName, lastName, number, genderMatch, age} = req.body;
        const player = await Player.findById(_id);

        if (firstName) player.firstName = firstName;
        if (lastName) player.lastName = lastName;
        if (number) player.number = number;
        if (genderMatch) player.genderMatch = genderMatch;
        if (age) player.age = age;

        await player.save();
        res.send(`Player with id ${_id} has been updated.`);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error updating player in the database.');
    }
}