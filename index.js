
//TODO add a feature to prevent multiple players under same token
//FIXME need to fix all the code

// mimicking the video but putting in my own little spin on the menue app. 
// I wanted to create tokens with 'power' to play the game. 

//ANCHOR https://github.com/Masheen88/GitHub-Cheat-Sheet
//1. git add .
//2. git commit -m "message"
//3. git push


//NOTE i created the player class to make the object of 'Player', the player gets to put in their name. 

class Player {
    constructor(nameValue, powerValue){
        this.name = nameValue;
        this.power = powerValue;
    }

    describe(){
        return `${this.name} plays ${this.power}.`;
    }
}

// The token class allow the players to make tokens with a name attached to it.
// players can claim the tokens by adding their names to it. i also added on 
//that the token can have a power that the player can 
//utilize. 

class Token {
    constructor(name, power){
        this.name = name;
        this.power = power
        this.players = [];
    }
    
    addPlayer(player){
        if (player instanceof Player){
            const playerNamesTaken = this.players.some(existingPlayer => existingPlayer.name
            === player.name);
            if (playerNamesTaken){
                throw new Error(`Player '${player.name} has already claimed this token.`);
            } else {
            this.players.push(player);
        } 
        }    else{
            throw new Error(`You can only add an instance of Player. 
            Your aurgument is not a player: ${player}`);
        }
    }

    describe(){
        let playerNames = this.players.map(player => player.name).join(', ');
        return `${this.name} has ${this.players.length} player(s): ${playerNames}`;
        //return `${this.name} has ${this.players.length} tokens.`;
    }
}

class Menu{
    constructor() {
        this.tokens = [];
        this.selectedToken = null; 
    }
//NOTE Was having issues with how the menu worked, as certain elements wasn't working for 
//some odd reason, but adding the 's' for the last two cases, somehow made the code work
//my only explanation is that it wasn't connecting well. 
    start(){
        let selection = this.showMainMenuOptions();

        while (selection !=0){
            switch (selection){
                case '1' :
                    this.createToken();
                    break;
                case '2' :
                   this.viewToken(); 
                   break;
                case '3' :
                    this.deleteToken();
                    break;
                case '4' :
                    this.displayTokens();
                    break;
                default :
                    selection  = 0; 
            }
            selection = this.showMainMenuOptions();
        }

        alert(`See you Next Time!`)
    }

    showMainMenuOptions(){
        return prompt(`
            0) Exit
            1) Create Your Token
            2) View Token
            3) Delete Tokens
            4) Display all Tokens
        `);
    }

    showTokenMenuOptions(tokenInfo){
        return prompt(`
            0) Back
            1) Create Player
            2) Delete Player
            3) View Players
            ----------------------
            ${tokenInfo}
            `);

    }

    displayTokens(){
        let tokenString = '';
        for (let i = 0; i < this.tokens.length; i++){
            tokenString += `${i}) Token: ${this.tokens[i].name}\n}`;
            if (this.tokens[i].players.length > 0){
                tokenString += "    Players:  ";
                tokenString += this.tokens[i].players.map(player => player.name).join(', '
            + '\n')
            }else {
                tokenString += "   No Players has this token.\n  ";
            }
        }
        if (tokenString !== ''){
            alert(tokenString);
        } else {
            alert ('No tokens have been created.')
        }
        
    }
    createToken(){
        //returns various prompts for Token name, player name and power
        let name = prompt('Enter What token you want to create: ')
        let playerName = prompt('Enter Your Name: ');
        let playerPower = prompt('Enter your Power: ');

        //ANCHOR creates a new token class taking the token name and player power
        let token = new Token(name, playerPower);

        console.log("Token Class:", token);
        let player = new Player(playerName, playerPower);
        token.addPlayer(player);
        this.tokens.push(token);
    }
    viewToken(){
        let index = prompt("Enter the index of what Token you want to view:");
        if (index > -1 && index < this.tokens.length){
            this.selectedToken = this.tokens[index];
            let description = 'Token Name: ' +  this.selectedToken.name  + '\n';
           console.log("Description?", description);
           
            for (let i = 0; i < this.selectedToken.players.length; i++){
                description += i + ' )  ' + this.selectedToken.players[i].power + '\n';
            }
            
            let selected1 = this.showTokenMenuOptions(description);
            switch (selected1) {
                case '1':
                    this.createPlayer();
                    break;
                case '2': 
                    this.deletePlayer();
                case '3':
                    this.viewPlayer();    
            }   
        }
    }

    deleteToken(){
        let index = prompt('Enter the Index of the Token you want to delete: ');
        if (index > -1 && index < this.tokens.length){
            this.tokens.splice(index,1);
        }
    }

    createPlayer(){
        let name = prompt('Enter names for new player: ');
        let power = prompt('Enter power for new Player: ');
        this.selectedToken.addPlayer(new Player(name,power));
    }

    deletePlayer(){
        let index = prompt('Enter the index of the player you want to delete: ');
        if (index > -1 && index <this.selectedToken.players.length){
            this.selectedToken.players.splice(index,1);
        }
    }

    //NOTE View all the players
    viewPlayer(){
        let playerString = '';
        for (let i = 0; i < this.tokens.length; i++){
            if (this.tokens[i].players.length > 0){
                playerString += `Players for Token '${this.tokens[i].name}' : \n`;
                for (let x = 0; x < this.tokens[i].players.length; x++){
                    playerString += `${x + 1}. ${this.tokens[i].players[x].name}\n`;
//NOTE - What player string?
                    console.log("String for player?!?!", playerString);
                    console.log("this token:", this.tokens[i]);
                }

                playerString +='\n';
            }
        }

        if (playerString !== ''){
            alert(playerString);
        } else {
            alert('No Players has claimed any tokens.')
        }
    }
}

let menu = new Menu();
menu.start();
