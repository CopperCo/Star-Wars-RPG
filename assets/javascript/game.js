function createCharacterObject(name, imagePath, hp, attack, defAttack) {
  return {
    name: name,
    image: imagePath,
    hp: hp,
    attackScore: attack,
    baseAttack: attack,
    defenderAttack: defAttack,
    className: "character",
    location: "selectCharacter"
  };
}

function clickerContent(name, imagePath, hp, divClass) {
  return (
    "<div class='col-md-3 " +
    divClass +
    "' id='" +
    name +
    "'>" +
    "<p> " +
    name +
    "</p>" +
    "<img src=" +
    imagePath +
    ">" +
    "<p>" +
    hp +
    "</p></div>"
  );
}

function selectCharacter() {
  yourCharacterName = this.id;
  yourCharacter = characters[yourCharacterName];
  yourCharacter.location = "yourCharacter";
  for (characterName in characters) {
    if (yourCharacterName != characterName) {
      characters[characterName].location = "enemies";
    }
  }
  updateUI();
}

function selectDefender() {
  defenderCharacterName = this.id;
  defenderCharacter = characters[defenderCharacterName];
  defenderCharacter.location = "defender";
  updateUI();
}

function fight() {
  if (yourCharacterName && defenderCharacterName) {
    yourCharacter = characters[yourCharacterName];
    defenderCharacter = characters[defenderCharacterName];
    defenderCharacter.hp -= yourCharacter.attackScore;
    yourCharacter.attackScore += yourCharacter.baseAttack;
    if (defenderCharacter.hp > 0) {
      yourCharacter.hp -= defenderCharacter.defenderAttack;
      if (yourCharacter.hp <= 0) {
        yourCharacterName = null;
        $("#resetBtn").show();
        alert("Game Over");
      }
    } else {
      defenderCharacterName = null;
      enemiesLeft -= 1;
      if (enemiesLeft == 0) {
        $("#resetBtn").show();
        alert("You won");
      }
    }
    updateUI();
  }
}

function cleanScreen() {
  for (var index in areas) {
    $("." + areas[index]).html("");
  }
}

function updateUI() {
  cleanScreen();
  for (var characterName in characters) {
    var character = characters[characterName];
    if (character.hp > 0) {
      $("." + character.location).append(
        clickerContent(
          character.name,
          character.image,
          character.hp,
          character.className
        )
      );
      if (character.location == "selectCharacter") {
        $("#" + character.name).click(selectCharacter);
      } else if (
        character.location == "enemies" &&
        !defenderCharacterName &&
        yourCharacterName
      ) {
        $("#" + character.name).click(selectDefender);
      }
    }
  }
}

function newGame() {
  characters = {
    Rey: createCharacterObject("Rey", "assets/images/Rey.jpg", 120, 8, 15),
    Luke: createCharacterObject(
      "Luke",
      "assets/images/Luke-Skywalker.jpg",
      100,
      14,
      5
    ),
    "Kylo-Ren": createCharacterObject(
      "Kylo-Ren",
      "assets/images/Kylo-Ren.jpg",
      150,
      8,
      20
    ),
    Snoke: createCharacterObject("Snoke", "assets/images/Snoke.jpg", 180, 7, 20)
  };
  yourCharacterName = null;
  defenderCharacterName = null;
  enemiesLeft = 3;
  $("#resetBtn").hide();
  $("#resetBtn").click(newGame);
  $("#attackBtn").click(fight);
  updateUI();
}

var areas = ["selectCharacter", "yourCharacter", "enemies", "defender"];
var characters;
var yourCharacterName;
var defenderCharacterName;
var enemiesLeft;

$(document).ready(function() {
  newGame();
});
