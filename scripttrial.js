const person1Input=document.getElementById("Person1");
const person2Input=document.getElementById("Person2");
const startButton=document.getElementById("Startgame");
function Player(name, marker){
    this.name=name;
    this.marker=marker; 
}
Player.prototype.returnName = function() {
    return (this.name);
};  
startButton.addEventListener('click', () => {
    const person1Name=person1Input.value.trim();
    const person2Name=person2Input.value.trim();
    if (person1Name === '' || person2Name === '') {
        alert('Please enter both names.');
        return;
    }
    const player1 = new Player(person1Name,"X");
    const player2 = new Player(person2Name,"O");
    console.log(player1.returnName());
    console.log(player2.returnName());
    console.log(Object.getPrototypeOf(player2) === Player.prototype); // returns true


})
